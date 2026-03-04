const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', nameAr: 'دولار أمريكي', country: 'us' },
  { code: 'EUR', name: 'Euro', nameAr: 'يورو', country: 'eu' },
  { code: 'GBP', name: 'British Pound', nameAr: 'جنيه إسترليني', country: 'gb' },
  { code: 'EGP', name: 'Egyptian Pound', nameAr: 'جنيه مصري', country: 'eg' },
  { code: 'SAR', name: 'Saudi Riyal', nameAr: 'ريال سعودي', country: 'sa' },
  { code: 'AED', name: 'UAE Dirham', nameAr: 'درهم إماراتي', country: 'ae' },
  { code: 'KWD', name: 'Kuwaiti Dinar', nameAr: 'دينار كويتي', country: 'kw' },
  { code: 'QAR', name: 'Qatari Riyal', nameAr: 'ريال قطري', country: 'qa' },
  { code: 'BHD', name: 'Bahraini Dinar', nameAr: 'دينار بحريني', country: 'bh' },
  { code: 'OMR', name: 'Omani Rial', nameAr: 'ريال عماني', country: 'om' },
  { code: 'JOD', name: 'Jordanian Dinar', nameAr: 'دينار أردني', country: 'jo' },
  { code: 'PAL', name: 'Jordanian Dinar', nameAr: 'دينار أردني', country: 'ps' }, 
  { code: 'LBP', name: 'Lebanese Pound', nameAr: 'ليرة لبنانية', country: 'lb' },
  { code: 'MAD', name: 'Moroccan Dirham', nameAr: 'درهم مغربي', country: 'ma' },
  { code: 'TND', name: 'Tunisian Dinar', nameAr: 'دينار تونسي', country: 'tn' },
  { code: 'DZD', name: 'Algerian Dinar', nameAr: 'دينار جزائري', country: 'dz' },
  { code: 'IQD', name: 'Iraqi Dinar', nameAr: 'دينار عراقي', country: 'iq' },
  { code: 'LYD', name: 'Libyan Dinar', nameAr: 'دينار ليبي', country: 'ly' },
  { code: 'YER', name: 'Yemeni Rial', nameAr: 'ريال يمني', country: 'ye' },
  { code: 'JPY', name: 'Japanese Yen', nameAr: 'ين ياباني', country: 'jp' },
  { code: 'CAD', name: 'Canadian Dollar', nameAr: 'دولار كندي', country: 'ca' },
  { code: 'AUD', name: 'Australian Dollar', nameAr: 'دولار أسترالي', country: 'au' },
  { code: 'CHF', name: 'Swiss Franc', nameAr: 'فرنك سويسري', country: 'ch' },
  { code: 'CNY', name: 'Chinese Yuan', nameAr: 'يوان صيني', country: 'cn' },
  { code: 'HKD', name: 'Hong Kong Dollar', nameAr: 'دولار هونج كونج', country: 'hk' },
  { code: 'NZD', name: 'New Zealand Dollar', nameAr: 'دولار نيوزيلندي', country: 'nz' },
  { code: 'SEK', name: 'Swedish Krona', nameAr: 'كرونة سويدية', country: 'se' },
  { code: 'NOK', name: 'Norwegian Krone', nameAr: 'كرونة نرويجية', country: 'no' },
  { code: 'KRW', name: 'South Korean Won', nameAr: 'وون كوري', country: 'kr' },
  { code: 'SGD', name: 'Singapore Dollar', nameAr: 'دولار سنغافوري', country: 'sg' },
  { code: 'MXN', name: 'Mexican Peso', nameAr: 'بيزو مكسيكي', country: 'mx' },
  { code: 'INR', name: 'Indian Rupee', nameAr: 'روبية هندية', country: 'in' },
  { code: 'RUB', name: 'Russian Ruble', nameAr: 'روبل روسي', country: 'ru' },
  { code: 'TRY', name: 'Turkish Lira', nameAr: 'ليرة تركية', country: 'tr' },
  { code: 'BRL', name: 'Brazilian Real', nameAr: 'ريال برازيلي', country: 'br' },
  { code: 'ZAR', name: 'South African Rand', nameAr: 'راند جنوب أفريقيا', country: 'za' },
  { code: 'IDR', name: 'Indonesian Rupiah', nameAr: 'روبية إندونيسية', country: 'id' },
  { code: 'MYR', name: 'Malaysian Ringgit', nameAr: 'رينغيت ماليزي', country: 'my' },
  { code: 'PHP', name: 'Philippine Peso', nameAr: 'بيزو فلبيني', country: 'ph' },
  { code: 'THB', name: 'Thai Baht', nameAr: 'بات تايلاندي', country: 'th' },
  { code: 'VND', name: 'Vietnamese Dong', nameAr: 'دونغ فيتنامي', country: 'vn' },
  { code: 'PKR', name: 'Pakistani Rupee', nameAr: 'روبية باكستانية', country: 'pk' },
  { code: 'BDT', name: 'Bangladeshi Taka', nameAr: 'تاكا بنغلاديشي', country: 'bd' },
  { code: 'NGN', name: 'Nigerian Naira', nameAr: 'نايرا نيجيري', country: 'ng' },
  { code: 'BTC', name: 'Bitcoin', nameAr: 'بيتكوين', country: 'sv' },
  { code: 'ETH', name: 'Ethereum', nameAr: 'إيثيريوم', country: 'sv' },
  { code: 'ADA', name: 'Cardano', nameAr: 'كاردانو', country: 'ada' },
  { code: 'SOL', name: 'Solana', nameAr: 'سولانا', country: 'sv' },
  { code: 'XRP', name: 'XRP', nameAr: 'ريبل', country: 'sv' }
];

const TRANSLATIONS = {
  en: { appTitle: "Convertly", lblAmount: "Amount", onPageToggle: "On-page Conversion", settingsTitle: "Settings", secAppearance: "Appearance", themeLight: "Light", themeDark: "Dark", secNumFormat: "Number Format", secDecDigits: "Decimal digits", secOnPage: "On-page Conversion", optDisabled: "Disabled", optSingle: "Single Currency", optMulti: "Multiple Currencies", subOnPage: "Convert selected amount in single or multiple currencies.", btnEditList: "Edit Currency List", secLang: "Language", secShortcut: "Shortcut", selectCurrTitle: "Select Currencies", secShare: "Contact & Share" },
  ar: { appTitle: "Convertly", lblAmount: "المبلغ", onPageToggle: "التحويل داخل الصفحة", settingsTitle: "الإعدادات", secAppearance: "المظهر", themeLight: "فاتح", themeDark: "داكن", secNumFormat: "تنسيق الأرقام", secDecDigits: "الأرقام العشرية", secOnPage: "وضع التحويل", optDisabled: "معطل", optSingle: "عملة واحدة", optMulti: "عملات متعددة", subOnPage: "تحويل المبلغ المحدد لعملة واحدة أو عدة عملات.", btnEditList: "تعديل قائمة العملات", secLang: "اللغة", secShortcut: "الاختصار", selectCurrTitle: "اختر العملات", secShare: "تواصل وشارك" }
};

document.addEventListener('DOMContentLoaded', () => {
  let selectedFrom = 'USD', selectedTo = 'EGP';
  let prefs = { decimalDigits: 2, decimalSep: '.', thousandSep: ',', onPageMode: 'single', theme: 'dark', lang: 'en' };

  const views = { calc: document.getElementById('view-calc'), settings: document.getElementById('view-settings'), multi: document.getElementById('view-multi') };
  const tabs = { calc: document.getElementById('tab-calc'), multi: document.getElementById('tab-multi') };
  const amountInput = document.getElementById('amount');
  const resultText = document.getElementById('resultText');
  const btnSwap = document.getElementById('btn-swap');
  const checklistContainer = document.querySelector('.checklist-container');
  const multiSearch = document.getElementById('multi-search');
  
  const inpDigits = document.getElementById('decimal-digits');
  const inpOnPageMode = document.getElementById('on-page-mode-select');
  const inpLang = document.getElementById('lang-select');
  const checkboxOnPage = document.getElementById('onPageToggleCheckbox');
  const btnTheme = document.getElementById('btn-theme');
  const formatPreview = document.getElementById('format-preview');

  if(!checklistContainer) return;

  function init() {
    populateChecklist();
    setupDropdown('from', (code) => { selectedFrom = code; saveState(); calculate(); });
    setupDropdown('to', (code) => { selectedTo = code; saveState(); calculate(); });

    // --- التعديل هنا: جلب selectedCurrencies أيضاً لحل مشكلة التشابه ---
    chrome.storage.sync.get(['fromCurrency', 'targetCurrency', 'prefs', 'onPageEnabled', 'lastAmount', 'selectedCurrencies'], (data) => {
      if(data.fromCurrency) selectedFrom = data.fromCurrency;
      if(data.targetCurrency) selectedTo = data.targetCurrency;
      if(data.lastAmount) amountInput.value = data.lastAmount;
      if(data.prefs) prefs = { ...prefs, ...data.prefs };
      checkboxOnPage.checked = data.onPageEnabled || false;

      // --- كود حل المشكلة: لو العملة الأصلية هي هي المستهدفة (مثلاً جنيه -> جنيه) ---
      if (selectedFrom === selectedTo) {
          // هات قائمة العملات المختارة (أو استخدم الدولار كاحتياطي)
          const preferredList = data.selectedCurrencies || ['USD'];
          
          // دور على أول عملة في القائمة دي *مختلفة* عن العملة الحالية
          const alternative = preferredList.find(c => c !== selectedFrom);
          
          if (alternative) {
              selectedTo = alternative; // لقينا بديل من القائمة، استخدمه
          } else {
              // لو القائمة فاضية أو مفهاش غير الجنيه، حول للدولار (أو لليورو لو الدولار هو اللي مستخدم)
              selectedTo = (selectedFrom === 'USD') ? 'EGP' : 'USD';
          }
      }
      // -----------------------------------------------------------------------

      applyTheme(prefs.theme);
      applyLanguage(prefs.lang);
      if(inpDigits) inpDigits.value = prefs.decimalDigits;
      if(inpOnPageMode) inpOnPageMode.value = prefs.onPageMode;
      if(inpLang) inpLang.value = prefs.lang;
      
      updateTriggerUI('from', selectedFrom);
      updateTriggerUI('to', selectedTo);
      calculate();
      updateFormatPreview();
    });
  }
  init();

  if(tabs.calc) tabs.calc.addEventListener('click', () => switchTab('calc'));
  if(tabs.multi) tabs.multi.addEventListener('click', () => switchTab('multi'));

  function switchTab(name) {
      if(tabs.calc) tabs.calc.classList.remove('active');
      if(tabs.multi) tabs.multi.classList.remove('active');
      if(tabs[name]) tabs[name].classList.add('active');
      Object.values(views).forEach(v => { if(v) v.classList.remove('active'); });
      if(views[name]) views[name].classList.add('active');
  }

  const btnSettings = document.getElementById('btn-settings');
  if(btnSettings) btnSettings.addEventListener('click', () => { 
      if (views.settings.classList.contains('active')) {
          views.settings.classList.remove('active');
          switchTab('calc'); 
      } else {
          views.settings.classList.add('active'); 
          views.calc.classList.remove('active'); 
          views.multi.classList.remove('active');
      }
  });

  const btnCloseSettings = document.getElementById('btn-close-settings');
  if(btnCloseSettings) btnCloseSettings.addEventListener('click', () => {
      views.settings.classList.remove('active');
      switchTab('calc'); 
  });

  const btnBackMulti = document.getElementById('btn-back-multi');
  if(btnBackMulti) btnBackMulti.addEventListener('click', () => switchTab('calc'));

  const btnEmail = document.getElementById('btn-email');
  if(btnEmail) btnEmail.addEventListener('click', (e) => {
      e.preventDefault();
      chrome.tabs.create({ url: "mailto:rayansultan59@gmail.com" });
  });

  // --- MATH SOLVER & CALC ---
  if(amountInput) {
      amountInput.addEventListener('input', calculate);
      
      amountInput.addEventListener('change', () => {
          const val = amountInput.value;
          if (val.match(/[+\-*/]/)) {
              const res = solveMath(val);
              if (res !== null) {
                  amountInput.value = res;
                  amountInput.classList.add('pop-effect');
                  setTimeout(() => amountInput.classList.remove('pop-effect'), 400);
                  calculate();
              }
          }
      });
  }
  
  function solveMath(str) {
      try {
          str = str.replace(/\s/g, '');
          if (!/^[0-9+\-*/.]+$/.test(str)) return null;
          const nums = str.split(/[+\-*/]/).map(Number);
          const ops = str.split(/[0-9.]+/).filter(x => x);
          if(nums.length === 0 || nums.some(isNaN)) return null;
          let total = nums[0];
          for(let i=0; i<ops.length; i++) {
              const nextNum = nums[i+1];
              const op = ops[i];
              if(op === '+') total += nextNum;
              else if(op === '-') total -= nextNum;
              else if(op === '*') total *= nextNum;
              else if(op === '/') total /= nextNum;
          }
          return total;
      } catch (e) { return null; }
  }

  if(btnSwap) btnSwap.addEventListener('click', () => { 
      let t=selectedFrom; selectedFrom=selectedTo; selectedTo=t; 
      updateTriggerUI('from',selectedFrom); updateTriggerUI('to',selectedTo); 
      saveState(); calculate(); 
  });

  if(inpDigits) inpDigits.addEventListener('change', savePrefs);
  if(inpOnPageMode) inpOnPageMode.addEventListener('change', savePrefs);
  if(inpLang) inpLang.addEventListener('change', () => { prefs.lang = inpLang.value; applyLanguage(prefs.lang); savePrefs(); populateChecklist(); });
  if(checkboxOnPage) checkboxOnPage.addEventListener('change', (e) => chrome.storage.sync.set({ onPageEnabled: e.target.checked }));
  
  if(btnTheme) btnTheme.addEventListener('click', () => {
      prefs.theme = (prefs.theme === 'dark') ? 'light' : 'dark';
      applyTheme(prefs.theme);
      savePrefs();
  });

  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && (changes.fromCurrency || changes.targetCurrency || changes.lastAmount)) {
       chrome.storage.sync.get(['fromCurrency', 'targetCurrency', 'lastAmount'], (d) => {
           if(d.fromCurrency) { selectedFrom = d.fromCurrency; updateTriggerUI('from', selectedFrom); }
           if(d.targetCurrency) { selectedTo = d.targetCurrency; updateTriggerUI('to', selectedTo); }
           if(d.lastAmount && amountInput) { amountInput.value = d.lastAmount; }
           calculate();
       });
    }
  });

  function setupDropdown(type, cb) {
    const trigger = document.getElementById(`${type}-trigger`);
    const menu = document.getElementById(`${type}-menu`);
    const list = document.getElementById(`${type}-list`);
    const search = document.getElementById(`${type}-search`);
    
    if(!trigger || !menu || !list || !search) return;

    function build(filter='') {
      list.innerHTML = '';
      const f = filter.toLowerCase();
      CURRENCIES.forEach(c => {
        const displayName = (prefs.lang === 'ar' && c.nameAr) ? c.nameAr : c.name;
        if(c.code.toLowerCase().includes(f) || displayName.toLowerCase().includes(f)) {
           const el = document.createElement('div'); el.className = 'option-item';
           let flag = `https://flagcdn.com/w40/${c.country}.png`;
           if(c.code==='ADA') flag='https://cryptologos.cc/logos/cardano-ada-logo.png?v=024';
           if(c.code==='BTC') flag='https://cryptologos.cc/logos/bitcoin-btc-logo.png';
           if(c.code==='ETH') flag='https://cryptologos.cc/logos/ethereum-eth-logo.png';
           if(c.code==='SOL') flag='https://cryptologos.cc/logos/solana-sol-logo.png';
           if(c.code==='XRP') flag='https://cryptologos.cc/logos/xrp-xrp-logo.png';
           
           el.innerHTML = `<img src="${flag}" class="option-flag"> <div><div style="font-weight:700;font-size:13px">${c.code}</div><div style="font-size:11px;color:#9ca3af">${displayName}</div></div>`;
           el.addEventListener('click', (e) => {
               e.stopPropagation();
               updateTriggerUI(type, c.code);
               menu.classList.remove('active');
               cb(c.code);
           });
           list.appendChild(el);
        }
      });
    }
    build();

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.dropdown-menu').forEach(m => { if(m !== menu) m.classList.remove('active'); });
        menu.classList.toggle('active');
        if(menu.classList.contains('active')) { 
            search.value = ''; 
            build(); 
            search.focus(); 
        }
    });

    search.addEventListener('input', (e) => build(e.target.value));
    document.addEventListener('click', (e) => {
        if(!trigger.contains(e.target) && !menu.contains(e.target)) menu.classList.remove('active');
    });
  }

  function updateTriggerUI(type, code) {
    const c = CURRENCIES.find(x=>x.code===code) || {code, country:'us'};
    let flag = `https://flagcdn.com/w40/${c.country}.png`;
    if(c.code==='ADA') flag='https://cryptologos.cc/logos/cardano-ada-logo.png?v=024';
    if(c.code==='BTC') flag='https://cryptologos.cc/logos/bitcoin-btc-logo.png';
    if(c.code==='ETH') flag='https://cryptologos.cc/logos/ethereum-eth-logo.png';
    if(c.code==='SOL') flag='https://cryptologos.cc/logos/solana-sol-logo.png';
    if(c.code==='XRP') flag='https://cryptologos.cc/logos/xrp-xrp-logo.png';

    const t = document.getElementById(`${type}-trigger`);
    if(t) {
        t.querySelector('.trigger-flag').src = flag;
        t.querySelector('.trigger-code').innerText = code;
    }
  }

  function populateChecklist() {
      if(!checklistContainer) return;
      checklistContainer.innerHTML = '';
      chrome.storage.sync.get(['selectedCurrencies'], (d) => {
          const sel = d.selectedCurrencies || ['EGP'];
          CURRENCIES.forEach(c => {
              const displayName = (prefs.lang === 'ar' && c.nameAr) ? c.nameAr : c.name;
              const l = document.createElement('label'); l.className='check-item';
              let flag = `https://flagcdn.com/w40/${c.country}.png`;
              if(c.code==='ADA') flag='https://cryptologos.cc/logos/cardano-ada-logo.png?v=024';
              if(c.code==='BTC') flag='https://cryptologos.cc/logos/bitcoin-btc-logo.png';
              if(c.code==='ETH') flag='https://cryptologos.cc/logos/ethereum-eth-logo.png';
              if(c.code==='SOL') flag='https://cryptologos.cc/logos/solana-sol-logo.png';
              if(c.code==='XRP') flag='https://cryptologos.cc/logos/xrp-xrp-logo.png';

              l.innerHTML = `
                <div class="check-info">
                    <img src="${flag}">
                    <b>${c.code}</b>
                    <span style="font-size:11px;color:var(--text-muted)">${displayName}</span>
                </div>
                <input type="checkbox" value="${c.code}" ${sel.includes(c.code)?'checked':''}>
                <div class="custom-checkbox">
                    <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
              `;
              
              l.querySelector('input').addEventListener('change', () => {
                  const all = Array.from(checklistContainer.querySelectorAll('input:checked')).map(x=>x.value);
                  if(all.length === 0) all.push('EGP');
                  
                  prefs.onPageMode = 'multi';
                  if(inpOnPageMode) inpOnPageMode.value = 'multi';
                  chrome.storage.sync.set({ selectedCurrencies: all, prefs: prefs });
              });
              checklistContainer.appendChild(l);
          });
      });
  }

  if(multiSearch) {
      multiSearch.addEventListener('input', (e) => {
          const filter = e.target.value.toLowerCase();
          const items = checklistContainer.querySelectorAll('.check-item');
          items.forEach(item => {
              const text = item.innerText.toLowerCase();
              item.style.display = text.includes(filter) ? 'flex' : 'none';
          });
      });
  }

  function calculate() {
    if(!amountInput || !resultText) return;
    const val = amountInput.value;
    const safeVal = val.replace(/[^0-9.+-/*]/g, ''); 
    const amt = parseFloat(safeVal);

    if(!amt || isNaN(amt)) { resultText.innerText = '...'; return; }
    
    resultText.style.opacity = 0.5;
    chrome.runtime.sendMessage({ action: "convert", amount: amt, fromCurrency: selectedFrom, targetCurrency: selectedTo }, (res) => {
        resultText.style.opacity = 1;
        if(res && res.success) {
            const digits = parseInt(prefs.decimalDigits);
            const fmt = new Intl.NumberFormat('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(res.result);
            
            let targetName = selectedTo;
            if (prefs.lang === 'ar') {
               const cObj = CURRENCIES.find(c => c.code === selectedTo);
               if(cObj && cObj.nameAr) targetName = cObj.nameAr;
            }
            
            resultText.innerText = fmt + " " + targetName;
        } else resultText.innerText = "Error";
    });
  }
  
  function updateFormatPreview() {
      if (!formatPreview) return;
      const digits = parseInt(prefs.decimalDigits);
      const sampleNum = 12345.6789;
      const fmt = new Intl.NumberFormat('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(sampleNum);
      formatPreview.value = fmt;
  }

  function savePrefs() {
    if(inpDigits) prefs.decimalDigits = parseInt(inpDigits.value);
    if(inpOnPageMode) prefs.onPageMode = inpOnPageMode.value;
    if(inpLang) prefs.lang = inpLang.value;
    chrome.storage.sync.set({ prefs });
    
    calculate();
    updateFormatPreview();
  }
  
  function saveState() { 
      chrome.storage.sync.set({ fromCurrency: selectedFrom, targetCurrency: selectedTo }); 
  }

  function applyTheme(t) {
    document.body.setAttribute('data-theme', t);
    const moon = document.getElementById('icon-moon');
    const sun = document.getElementById('icon-sun');
    if(moon && sun) {
        if(t === 'light') {
            moon.style.display = 'block';
            sun.style.display = 'none';
        } else {
            moon.style.display = 'none';
            sun.style.display = 'block';
        }
    }
  }

  function applyLanguage(lang) {
    const t = TRANSLATIONS[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if(t[key]) el.textContent = t[key];
    });
    if(lang === 'ar') document.body.classList.add('rtl'); else document.body.classList.remove('rtl');
    const fs = document.getElementById('from-search');
    const ts = document.getElementById('to-search');
    if(fs) fs.placeholder = lang==='ar'?'بحث...':'Search...';
    if(ts) ts.placeholder = lang==='ar'?'بحث...':'Search...';
  }
});