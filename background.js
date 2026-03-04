const YAHOO_SYMBOLS = {
  'USD': 'USD', 
  'EGP': 'EGP=X', 'SAR': 'SAR=X', 'AED': 'AED=X', 'KWD': 'KWD=X', 'QAR': 'QAR=X', 
  'BHD': 'BHD=X', 'OMR': 'OMR=X', 'JOD': 'JOD=X', 'PAL': 'JOD=X', 
  'LBP': 'LBP=X', 'MAD': 'MAD=X', 'TND': 'TND=X', 'DZD': 'DZD=X', 
  'IQD': 'IQD=X', 'LYD': 'LYD=X', 'YER': 'YER=X',
  'EUR': 'EUR=X', 'GBP': 'GBP=X', 'JPY': 'JPY=X', 'CAD': 'CAD=X', 'AUD': 'AUD=X',
  'CHF': 'CHF=X', 'CNY': 'CNY=X', 'HKD': 'HKD=X', 'NZD': 'NZD=X', 'SEK': 'SEK=X',
  'KRW': 'KRW=X', 'SGD': 'SGD=X', 'NOK': 'NOK=X', 'MXN': 'MXN=X', 'INR': 'INR=X',
  'RUB': 'RUB=X', 'ZAR': 'ZAR=X', 'TRY': 'TRY=X', 'BRL': 'BRL=X',
  'IDR': 'IDR=X', 'MYR': 'MYR=X', 'PHP': 'PHP=X', 'THB': 'THB=X', 'VND': 'VND=X',
  'PKR': 'PKR=X', 'BDT': 'BDT=X', 'NGN': 'NGN=X', 'ILS': 'ILS=X',
  'BTC': 'BTC-USD', 'ETH': 'ETH-USD', 'ADA': 'ADA-USD', 'SOL': 'SOL-USD', 'XRP': 'XRP-USD'
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // 1. Single Mode
  if (request.action === "convert") {
    handleConversion(request.amount, request.fromCurrency, request.targetCurrency)
      .then(response => {
         if (request.saveState) {
             chrome.storage.sync.set({ 
                 lastAmount: request.amount,
                 fromCurrency: request.fromCurrency
             });
         }
         sendResponse(response);
      });
    return true; 
  }

  // 2. Multi Mode
  if (request.action === "convertMulti") {
    // --- هنا: نحفظ المبلغ والعملة الأصلية حتى في وضع المالتي ---
    chrome.storage.sync.set({ 
        lastAmount: request.amount,
        fromCurrency: request.fromCurrency
    });

    convertMultiCurrency(request.amount, request.fromCurrency)
      .then(data => sendResponse({ success: true, data: data, symbol: request.fromCurrency }))
      .catch(err => sendResponse({ success: false, error: err.message }));
    return true;
  }
});

async function handleConversion(amount, from, to) {
  try {
    if (from === to) return { success: true, result: amount, rate: 1, symbol: to };
    
    let rateFrom = await getRate(from);
    let rateTo = await getRate(to);

    const finalResult = (amount / rateFrom) * rateTo;
    return { success: true, result: finalResult, rate: (rateTo/rateFrom), symbol: to };
  } catch (error) { return { success: false, error: error.message }; }
}

async function getRate(currency) {
  if (currency === 'USD') return 1;
  const symbol = YAHOO_SYMBOLS[currency];
  if (!symbol) throw new Error("Currency not supported");
  
  try {
      const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`);
      const data = await response.json();
      if(!data.chart.result || data.chart.result.length === 0) throw new Error("API Error");
      return data.chart.result[0].meta.regularMarketPrice;
  } catch (e) {
      console.error(e);
      throw e;
  }
}

async function convertMultiCurrency(amount, from) {
  const settings = await chrome.storage.sync.get(['selectedCurrencies']);
  const targets = (settings.selectedCurrencies && settings.selectedCurrencies.length > 0) ? settings.selectedCurrencies : ['EGP']; 
  
  const promises = targets.map(async (currency) => {
      try {
          const res = await handleConversion(amount, from, currency);
          return { currency: currency, value: res.result };
      } catch (e) { return { currency: currency, value: 0 }; }
  });
  
  return Promise.all(promises);
}