/**
 * Convertly — Popup Script (Extension Popup UI)
 *
 * Storage strategy:
 *  - Lightweight config → chrome.storage.sync (cross-device)
 *  - Heavy payload (history) → chrome.storage.local (avoids 8KB sync quota)
 */

const CURRENCIES = [
  { code:'USD',name:'US Dollar',nameAr:'دولار أمريكي',country:'us' },
  { code:'EUR',name:'Euro',nameAr:'يورو',country:'eu' },
  { code:'GBP',name:'British Pound',nameAr:'جنيه إسترليني',country:'gb' },
  { code:'EGP',name:'Egyptian Pound',nameAr:'جنيه مصري',country:'eg' },
  { code:'SAR',name:'Saudi Riyal',nameAr:'ريال سعودي',country:'sa' },
  { code:'AED',name:'UAE Dirham',nameAr:'درهم إماراتي',country:'ae' },
  { code:'KWD',name:'Kuwaiti Dinar',nameAr:'دينار كويتي',country:'kw' },
  { code:'QAR',name:'Qatari Riyal',nameAr:'ريال قطري',country:'qa' },
  { code:'BHD',name:'Bahraini Dinar',nameAr:'دينار بحريني',country:'bh' },
  { code:'OMR',name:'Omani Rial',nameAr:'ريال عماني',country:'om' },
  { code:'JOD',name:'Jordanian Dinar',nameAr:'دينار أردني',country:'jo' },
  { code:'PAL',name:'Jordanian Dinar',nameAr:'دينار أردني',country:'ps' },
  { code:'LBP',name:'Lebanese Pound',nameAr:'ليرة لبنانية',country:'lb' },
  { code:'MAD',name:'Moroccan Dirham',nameAr:'درهم مغربي',country:'ma' },
  { code:'TND',name:'Tunisian Dinar',nameAr:'دينار تونسي',country:'tn' },
  { code:'DZD',name:'Algerian Dinar',nameAr:'دينار جزائري',country:'dz' },
  { code:'IQD',name:'Iraqi Dinar',nameAr:'دينار عراقي',country:'iq' },
  { code:'LYD',name:'Libyan Dinar',nameAr:'دينار ليبي',country:'ly' },
  { code:'YER',name:'Yemeni Rial',nameAr:'ريال يمني',country:'ye' },
  { code:'JPY',name:'Japanese Yen',nameAr:'ين ياباني',country:'jp' },
  { code:'CAD',name:'Canadian Dollar',nameAr:'دولار كندي',country:'ca' },
  { code:'AUD',name:'Australian Dollar',nameAr:'دولار أسترالي',country:'au' },
  { code:'CHF',name:'Swiss Franc',nameAr:'فرنك سويسري',country:'ch' },
  { code:'CNY',name:'Chinese Yuan',nameAr:'يوان صيني',country:'cn' },
  { code:'HKD',name:'Hong Kong Dollar',nameAr:'دولار هونج كونج',country:'hk' },
  { code:'NZD',name:'New Zealand Dollar',nameAr:'دولار نيوزيلندي',country:'nz' },
  { code:'SEK',name:'Swedish Krona',nameAr:'كرونة سويدية',country:'se' },
  { code:'NOK',name:'Norwegian Krone',nameAr:'كرونة نرويجية',country:'no' },
  { code:'KRW',name:'South Korean Won',nameAr:'وون كوري',country:'kr' },
  { code:'SGD',name:'Singapore Dollar',nameAr:'دولار سنغافوري',country:'sg' },
  { code:'MXN',name:'Mexican Peso',nameAr:'بيزو مكسيكي',country:'mx' },
  { code:'INR',name:'Indian Rupee',nameAr:'روبية هندية',country:'in' },
  { code:'RUB',name:'Russian Ruble',nameAr:'روبل روسي',country:'ru' },
  { code:'TRY',name:'Turkish Lira',nameAr:'ليرة تركية',country:'tr' },
  { code:'BRL',name:'Brazilian Real',nameAr:'ريال برازيلي',country:'br' },
  { code:'ZAR',name:'South African Rand',nameAr:'راند جنوب أفريقيا',country:'za' },
  { code:'IDR',name:'Indonesian Rupiah',nameAr:'روبية إندونيسية',country:'id' },
  { code:'MYR',name:'Malaysian Ringgit',nameAr:'رينغيت ماليزي',country:'my' },
  { code:'PHP',name:'Philippine Peso',nameAr:'بيزو فلبيني',country:'ph' },
  { code:'THB',name:'Thai Baht',nameAr:'بات تايلاندي',country:'th' },
  { code:'VND',name:'Vietnamese Dong',nameAr:'دونغ فيتنامي',country:'vn' },
  { code:'PKR',name:'Pakistani Rupee',nameAr:'روبية باكستانية',country:'pk' },
  { code:'BDT',name:'Bangladeshi Taka',nameAr:'تاكا بنغلاديشي',country:'bd' },
  { code:'NGN',name:'Nigerian Naira',nameAr:'نايرا نيجيري',country:'ng' },
  { code:'BTC',name:'Bitcoin',nameAr:'بيتكوين',country:'sv' },
  { code:'ETH',name:'Ethereum',nameAr:'إيثيريوم',country:'sv' },
  { code:'ADA',name:'Cardano',nameAr:'كاردانو',country:'ada' },
  { code:'SOL',name:'Solana',nameAr:'سولانا',country:'sv' },
  { code:'XRP',name:'XRP',nameAr:'ريبل',country:'sv' }
];

const TRANSLATIONS = {
  en: { appTitle:'Convertly', lblAmount:'Amount', onPageToggle:'On-page Conversion', settingsTitle:'Settings', secNumFormat:'Number Format', secDecDigits:'Decimal digits', secOnPage:'On-page Conversion', optDisabled:'Disabled', optSingle:'Single Currency', optMulti:'Multiple Currencies', subOnPage:'Convert selected amount in single or multiple currencies.', btnEditList:'Edit Currency List', secLang:'Language', secShortcut:'Shortcut', selectCurrTitle:'Select Currencies', secShare:'Contact & Share', historyTitle:'History', clearHistory:'Clear' },
  ar: { appTitle:'Convertly', lblAmount:'المبلغ', onPageToggle:'التحويل داخل الصفحة', settingsTitle:'الإعدادات', secNumFormat:'تنسيق الأرقام', secDecDigits:'الأرقام العشرية', secOnPage:'وضع التحويل', optDisabled:'معطل', optSingle:'عملة واحدة', optMulti:'عملات متعددة', subOnPage:'تحويل المبلغ المحدد لعملة واحدة أو عدة عملات.', btnEditList:'تعديل قائمة العملات', secLang:'اللغة', secShortcut:'الاختصار', selectCurrTitle:'اختر العملات', secShare:'تواصل وشارك', historyTitle:'السجل', clearHistory:'مسح' }
};

function guessLocalCurrency() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const m = { 'Cairo':'EGP','Riyadh':'SAR','Dubai':'AED','Kuwait':'KWD','Qatar':'QAR','Bahrain':'BHD','Muscat':'OMR','Amman':'JOD','Beirut':'LBP','Casablanca':'MAD','Tunis':'TND','Algiers':'DZD','Baghdad':'IQD','Tripoli':'LYD','Aden':'YER','Istanbul':'TRY','Jerusalem':'ILS','Gaza':'ILS','London':'GBP','Tokyo':'JPY','Toronto':'CAD','Vancouver':'CAD','Sydney':'AUD','Melbourne':'AUD','Zurich':'CHF','Shanghai':'CNY','Hong_Kong':'HKD','Auckland':'NZD','Stockholm':'SEK','Oslo':'NOK','Seoul':'KRW','Singapore':'SGD','Mexico_City':'MXN','Kolkata':'INR','Moscow':'RUB','Sao_Paulo':'BRL','Johannesburg':'ZAR','Jakarta':'IDR','Kuala_Lumpur':'MYR','Manila':'PHP','Bangkok':'THB','Ho_Chi_Minh':'VND','Karachi':'PKR','Dhaka':'BDT','Lagos':'NGN' };
    for (const [k,v] of Object.entries(m)) if (tz.includes(k)) return v;
    if (tz.startsWith('Europe/')) return 'EUR';
    if (tz.startsWith('America/')) return 'USD';
  } catch(_){}
  return 'EUR';
}

function getFlagUrl(code, country) {
  const logos = { 'ADA':'https://cryptologos.cc/logos/cardano-ada-logo.png?v=024','BTC':'https://cryptologos.cc/logos/bitcoin-btc-logo.png','ETH':'https://cryptologos.cc/logos/ethereum-eth-logo.png','SOL':'https://cryptologos.cc/logos/solana-sol-logo.png','XRP':'https://cryptologos.cc/logos/xrp-xrp-logo.png' };
  return logos[code] || `https://flagcdn.com/w80/${country}.png`;
}
const CRYPTO_CODES = new Set(['BTC','ETH','ADA','SOL','XRP']);

// ===========================================================================
document.addEventListener('DOMContentLoaded', () => {
  let selectedFrom = 'USD', selectedTo = guessLocalCurrency();
  let prefs = { decimalDigits:2, onPageMode:'single', theme:'dark', lang:'en', apiProvider:'yahoo' };
  let currentHistory = [];

  // Track which accordion groups are collapsed (persists across re-renders)
  const collapsedGroups = new Set();

  const views = { calc: document.getElementById('view-calc'), settings: document.getElementById('view-settings'), multi: document.getElementById('view-multi'), history: document.getElementById('view-history') };
  const tabs = { calc: document.getElementById('tab-calc'), multi: document.getElementById('tab-multi'), history: document.getElementById('tab-history') };

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
  const btnClearHistory = document.getElementById('btn-clear-history');
  const apiDot = document.getElementById('api-dot');
  const apiStatusText = document.getElementById('api-status-text');
  const versionFooter = document.getElementById('version-footer');

  // --- Dynamic versioning from manifest (strict: only "v{version}") ---
  if (versionFooter) {
    const ver = chrome.runtime.getManifest().version;
    versionFooter.textContent = `v${ver}`;
  }

  function init() {
    populateChecklist();
    setupDropdown('from', (code) => { selectedFrom = code; saveState(); calculate(); });
    setupDropdown('to', (code) => { selectedTo = code; saveState(); calculate(); });

    // --- Instant Hydration: read cached rates from local storage ---
    // Populates the status indicator immediately, avoiding the "Fetching..." flash.
    chrome.storage.local.get(['ratesCache'], (localData) => {
      if (localData.ratesCache) {
        let latest = 0, provTs = null;
        for (const key of Object.keys(localData.ratesCache)) {
          const entry = localData.ratesCache[key];
          if (entry.timestamp > latest) {
            latest = entry.timestamp;
            provTs = entry.providerTimestamp || null;
          }
        }
        if (provTs) updateApiStatus(provTs);
      }
    });

    chrome.storage.sync.get(['fromCurrency','targetCurrency','prefs','onPageEnabled','lastAmount','selectedCurrencies'], (data) => {
      if (data.fromCurrency) selectedFrom = data.fromCurrency;
      if (data.targetCurrency) selectedTo = data.targetCurrency;
      if (data.lastAmount) amountInput.value = data.lastAmount;
      if (data.prefs) prefs = { ...prefs, ...data.prefs };
      checkboxOnPage.checked = data.onPageEnabled || false;

      if (selectedFrom === selectedTo) {
        const pList = data.selectedCurrencies || ['USD'];
        const alt = pList.find(c => c !== selectedFrom);
        selectedTo = alt || ((selectedFrom === 'USD') ? guessLocalCurrency() : 'USD');
      }

      applyTheme(prefs.theme);
      applyLanguage(prefs.lang);
      if (inpDigits) inpDigits.value = prefs.decimalDigits;
      if (inpOnPageMode) inpOnPageMode.value = prefs.onPageMode;
      if (inpLang) inpLang.value = prefs.lang;
      updateTriggerUI('from', selectedFrom);
      updateTriggerUI('to', selectedTo);
      calculate();
      updateFormatPreview();
      // Refresh from background script to get the latest data
      refreshApiStatus();
    });

    chrome.storage.local.get(['history'], (data) => {
      if (data.history) { currentHistory = data.history; renderHistory(currentHistory); }
    });
  }
  init();

  // --- Tab Navigation ---
  if (tabs.calc) tabs.calc.addEventListener('click', () => switchTab('calc'));
  if (tabs.multi) tabs.multi.addEventListener('click', () => switchTab('multi'));
  if (tabs.history) tabs.history.addEventListener('click', () => switchTab('history'));

  function switchTab(name) {
    Object.values(tabs).forEach(t => { if (t) t.classList.remove('active'); });
    if (tabs[name]) tabs[name].classList.add('active');
    Object.values(views).forEach(v => { if (v) v.classList.remove('active'); });
    if (views[name]) views[name].classList.add('active');
  }

  // --- Settings Panel ---
  const btnSettings = document.getElementById('btn-settings');
  if (btnSettings) btnSettings.addEventListener('click', () => {
    if (views.settings.classList.contains('active')) { views.settings.classList.remove('active'); switchTab('calc'); }
    else { views.settings.classList.add('active'); views.calc.classList.remove('active'); views.multi.classList.remove('active'); if (views.history) views.history.classList.remove('active'); }
  });
  const btnCloseSettings = document.getElementById('btn-close-settings');
  if (btnCloseSettings) btnCloseSettings.addEventListener('click', () => { views.settings.classList.remove('active'); switchTab('calc'); });

  // --- Amount Input & Math Solver ---
  if (amountInput) {
    amountInput.addEventListener('input', () => {
      calculate();
      // Persist lastAmount on every keystroke so popup state survives close/reopen
      chrome.storage.sync.set({ lastAmount: amountInput.value });
    });
    amountInput.addEventListener('change', () => {
      const val = amountInput.value;
      if (val.match(/[+\-*/]/)) {
        const res = solveMath(val);
        if (res !== null) { amountInput.value = res; amountInput.classList.add('pop-effect'); setTimeout(() => amountInput.classList.remove('pop-effect'), 400); calculate(); chrome.storage.sync.set({ lastAmount: String(res) }); }
      }
    });
  }
  function solveMath(str) {
    try {
      str = str.replace(/\s/g, '');
      if (!/^[0-9+\-*/.]+$/.test(str)) return null;
      const nums = str.split(/[+\-*/]/).map(Number);
      const ops = str.split(/[0-9.]+/).filter(x => x);
      if (!nums.length || nums.some(isNaN)) return null;
      let t = nums[0];
      for (let i = 0; i < ops.length; i++) { const n = nums[i+1]; if (ops[i]==='+') t+=n; else if (ops[i]==='-') t-=n; else if (ops[i]==='*') t*=n; else if (ops[i]==='/') t/=n; }
      return t;
    } catch(_){ return null; }
  }

  // --- Controls ---
  if (btnSwap) btnSwap.addEventListener('click', () => { const t = selectedFrom; selectedFrom = selectedTo; selectedTo = t; updateTriggerUI('from', selectedFrom); updateTriggerUI('to', selectedTo); saveState(); calculate(); });
  if (inpLang) inpLang.addEventListener('change', () => { prefs.lang = inpLang.value; applyLanguage(prefs.lang); savePrefs(); populateChecklist(); renderHistory(currentHistory); updateApiStatus(_lastProviderTimestamp); });
  if (inpDigits) inpDigits.addEventListener('change', savePrefs);
  if (inpOnPageMode) inpOnPageMode.addEventListener('change', savePrefs);
  if (checkboxOnPage) checkboxOnPage.addEventListener('change', (e) => chrome.storage.sync.set({ onPageEnabled: e.target.checked }));
  if (btnTheme) btnTheme.addEventListener('click', () => { prefs.theme = (prefs.theme === 'dark') ? 'light' : 'dark'; applyTheme(prefs.theme); savePrefs(); });
  if (btnClearHistory) btnClearHistory.addEventListener('click', () => { chrome.storage.local.set({ history: [] }, () => { currentHistory = []; renderHistory([]); }); });

  // --- API Status (Yahoo Finance only) ---
  let _lastProviderTimestamp = null;

  function updateApiStatus(providerTimestamp) {
    if (providerTimestamp) _lastProviderTimestamp = providerTimestamp;
    if (apiDot) apiDot.className = 'api-status-dot online';
    if (apiStatusText) {
      const isArabic = prefs.lang === 'ar';
      const label = isArabic ? 'آخر تحديث:' : 'Last update:';
      let timeString = '';
      if (_lastProviderTimestamp) {
        timeString = new Date(_lastProviderTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      apiStatusText.textContent = '';
      const lblSpan = document.createElement('span');
      lblSpan.className = 'api-label';
      lblSpan.textContent = label;
      const timeSpan = document.createElement('span');
      timeSpan.className = 'api-time';
      timeSpan.dir = 'ltr';
      timeSpan.style.cssText = 'display:inline-block;unicode-bidi:isolate;margin:0 2px;';
      timeSpan.textContent = timeString;
      apiStatusText.appendChild(lblSpan);
      apiStatusText.appendChild(document.createTextNode(' '));
      apiStatusText.appendChild(timeSpan);
    }
  }

  function refreshApiStatus() {
    chrome.runtime.sendMessage({ action: 'getCacheStatus' }, (res) => {
      if (chrome.runtime.lastError || !res) {
        if (apiDot) apiDot.className = 'api-status-dot offline';
        if (apiStatusText) apiStatusText.textContent = prefs.lang === 'ar' ? 'غير متصل' : 'Offline';
        return;
      }
      if (res.providerTimestamp) {
        updateApiStatus(res.providerTimestamp);
      } else if (res.lastUpdated) {
        if (apiDot) apiDot.className = 'api-status-dot online';
        if (apiStatusText) apiStatusText.textContent = prefs.lang === 'ar' ? 'متصل' : 'Online';
      }
    });
  }

  // --- Storage Listener ---
  chrome.storage.onChanged.addListener((changes, ns) => {
    if (ns === 'sync' && (changes.fromCurrency || changes.targetCurrency || changes.lastAmount)) {
      chrome.storage.sync.get(['fromCurrency','targetCurrency','lastAmount'], (d) => {
        if (d.fromCurrency) { selectedFrom = d.fromCurrency; updateTriggerUI('from', selectedFrom); }
        if (d.targetCurrency) { selectedTo = d.targetCurrency; updateTriggerUI('to', selectedTo); }
        if (d.lastAmount && amountInput) amountInput.value = d.lastAmount;
        calculate();
      });
    }
    if (ns === 'local' && changes.history) { currentHistory = changes.history.newValue || []; renderHistory(currentHistory); }
  });

  // --- History Rendering — Collapsible Accordion Groups ---
  function renderHistory(arr) {
    const list = document.getElementById('history-list');
    if (!list) return;
    list.textContent = '';
    const parseSVG = (svgStr) => new DOMParser().parseFromString(svgStr, 'image/svg+xml').documentElement;

    if (!arr.length) {
      const msgDiv = document.createElement('div');
      msgDiv.style.cssText = 'text-align:center; padding:20px; font-size:12px; color:var(--text-muted);';
      msgDiv.textContent = prefs.lang === 'ar' ? 'لا يوجد سجل حالياً' : 'No history yet';
      list.appendChild(msgDiv);
      return;
    }

    const groups = new Map();
    arr.forEach(item => { const k = item.domain || 'Unknown Website'; if (!groups.has(k)) groups.set(k, []); groups.get(k).push(item); });

    const globeIcon = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
    const calcIcon = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M12 14h.01"/></svg>';
    const chevronSvg = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="6 9 12 15 18 9"/></svg>';

    groups.forEach((items, domain) => {
      const isManual = domain === 'Manual Entry';
      const label = isManual ? (prefs.lang === 'ar' ? 'الآلة الحاسبة' : 'Calculator') : domain;
      const icon = isManual ? calcIcon : globeIcon;
      const isCollapsed = collapsedGroups.has(domain);

      // Accordion header
      const header = document.createElement('div');
      header.className = 'history-group-header' + (isCollapsed ? ' collapsed' : '');
      header.appendChild(parseSVG(icon));
      header.appendChild(document.createTextNode(' '));
      const spanLabel = document.createElement('span');
      spanLabel.textContent = label;
      header.appendChild(spanLabel);
      header.appendChild(document.createTextNode(' '));
      const countSpan = document.createElement('span');
      countSpan.style.cssText = 'font-size:9px;color:var(--accent);margin:0 4px;';
      countSpan.textContent = items.length;
      header.appendChild(countSpan);
      header.appendChild(document.createTextNode(' '));
      const chevronSpan = document.createElement('span');
      chevronSpan.className = 'chevron';
      chevronSpan.appendChild(parseSVG(chevronSvg));
      header.appendChild(chevronSpan);

      // Items container — uses display:none for robust collapse
      const container = document.createElement('div');
      container.className = 'history-group-items';
      if (isCollapsed) container.style.display = 'none';

      // Toggle accordion on header click
      header.addEventListener('click', () => {
        const willCollapse = !header.classList.contains('collapsed');
        header.classList.toggle('collapsed', willCollapse);
        if (willCollapse) {
          collapsedGroups.add(domain);
          container.style.display = 'none';
        } else {
          collapsedGroups.delete(domain);
          container.style.display = 'flex';
        }
      });

      items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'history-item';
        const d = new Date(item.timestamp);
        const timeStr = d.toLocaleDateString() + ' - ' + d.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });

        // --- Build history item via safe DOM APIs ---
        const mainWrapper = document.createElement('div');
        mainWrapper.style.cssText = 'display:flex;justify-content:space-between;align-items:flex-start;';

        const flexDiv = document.createElement('div');
        flexDiv.style.cssText = 'display:flex;align-items:center;gap:6px;direction:ltr;font-weight:700;font-size:15px;';
        const spanAmt = document.createElement('span'); spanAmt.textContent = item.amount;
        const spanFrom = document.createElement('span'); spanFrom.textContent = item.from;
        const spanArrow = document.createElement('span'); spanArrow.style.cssText = 'color:var(--text-muted);font-size:12px;'; spanArrow.textContent = '→';
        const spanTo = document.createElement('span'); spanTo.textContent = item.to;
        flexDiv.append(spanAmt, document.createTextNode(' '), spanFrom, document.createTextNode(' '), spanArrow, document.createTextNode(' '), spanTo);

        const histTime = document.createElement('div'); histTime.className = 'history-time'; histTime.textContent = timeStr;
        mainWrapper.appendChild(flexDiv);
        mainWrapper.appendChild(histTime);
        el.appendChild(mainWrapper);

        if (!isManual) {
          let dt = item.title;
          if (prefs.lang === 'ar') { const tl = dt.toLowerCase(); if (tl.includes('subscrip')||tl.includes('plan')||tl.includes('premium')||tl.includes('upgrade')) dt='اشتراك / خطة'; else if (tl.includes('checkout')||tl.includes('bill')||tl.includes('pay')) dt='صفحة الدفع'; else if (tl.includes('cart')||tl.includes('bag')) dt='سلة التسوق'; }

          const ctxBox = document.createElement('div');
          ctxBox.style.cssText = 'margin-top:6px;padding:6px 10px;background:var(--bg);border-radius:8px;border:1px solid var(--border);';

          const titleDiv = document.createElement('div');
          titleDiv.style.cssText = 'font-size:12px;color:var(--text);font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
          titleDiv.title = item.title;
          titleDiv.textContent = dt + ' ';

          if (item.billingCycle) {
            const cycleMap = { monthly: prefs.lang==='ar'?'شهرياً':'Monthly', annually: prefs.lang==='ar'?'سنوياً':'Annually', weekly: prefs.lang==='ar'?'أسبوعياً':'Weekly', daily: prefs.lang==='ar'?'يومياً':'Daily' };
            const badge = document.createElement('span');
            badge.style.cssText = 'font-size:9px;background:var(--accent);color:#fff;padding:2px 6px;border-radius:4px;margin:0 6px;display:inline-block;vertical-align:middle;font-weight:bold;';
            badge.textContent = cycleMap[item.billingCycle];
            titleDiv.appendChild(badge);
          }
          ctxBox.appendChild(titleDiv);

          if (item.url) {
            const lnkWrap = document.createElement('div');
            lnkWrap.style.cssText = 'font-size:10px;color:var(--accent);margin-top:4px;font-weight:600;';
            const lnkSpan = document.createElement('span');
            lnkSpan.className = 'history-link';
            lnkSpan.dataset.url = item.url;
            lnkSpan.style.cssText = 'display:inline-flex;align-items:center;gap:4px;';
            lnkSpan.appendChild(parseSVG(globeIcon));
            lnkSpan.appendChild(document.createTextNode(' ' + (prefs.lang==='ar'?'فتح الصفحة':'Open page')));
            lnkWrap.appendChild(lnkSpan);
            ctxBox.appendChild(lnkWrap);
          }
          el.appendChild(ctxBox);
        }

        el.onclick = () => { selectedFrom = item.from; selectedTo = item.to; amountInput.value = item.amount; updateTriggerUI('from', selectedFrom); updateTriggerUI('to', selectedTo); saveState(); calculate(); switchTab('calc'); };
        container.appendChild(el);

        const lnkEl = el.querySelector('.history-link');
        if (lnkEl) lnkEl.onclick = (e) => { e.stopPropagation(); chrome.tabs.create({ url: lnkEl.getAttribute('data-url') }); };
      });

      list.appendChild(header);
      list.appendChild(container);
    });
  }

  // --- Dropdown Selectors ---
  function setupDropdown(type, cb) {
    const trigger = document.getElementById(`${type}-trigger`);
    const menu = document.getElementById(`${type}-menu`);
    const list = document.getElementById(`${type}-list`);
    const search = document.getElementById(`${type}-search`);
    if (!trigger || !menu || !list || !search) return;
    function build(filter = '') {
      list.textContent = '';
      const f = filter.toLowerCase();
      CURRENCIES.forEach(c => {
        const dn = (prefs.lang === 'ar' && c.nameAr) ? c.nameAr : c.name;
        if (c.code.toLowerCase().includes(f) || dn.toLowerCase().includes(f)) {
          const isCrypto = CRYPTO_CODES.has(c.code);
          const el = document.createElement('div'); el.className = 'option-item';
          const img = document.createElement('img'); img.src = getFlagUrl(c.code, c.country); img.className = 'option-flag' + (isCrypto ? ' crypto-logo' : '');
          const infoDiv = document.createElement('div');
          const codeDiv = document.createElement('div'); codeDiv.style.cssText = 'font-weight:700;font-size:13px'; codeDiv.textContent = c.code;
          const nameDiv = document.createElement('div'); nameDiv.style.cssText = 'font-size:11px;color:#9ca3af'; nameDiv.textContent = dn;
          infoDiv.appendChild(codeDiv); infoDiv.appendChild(nameDiv);
          el.appendChild(img); el.appendChild(document.createTextNode(' ')); el.appendChild(infoDiv);
          el.addEventListener('click', (e) => { e.stopPropagation(); updateTriggerUI(type, c.code); menu.classList.remove('active'); cb(c.code); });
          list.appendChild(el);
        }
      });
    }
    build();
    trigger.addEventListener('click', (e) => { e.stopPropagation(); document.querySelectorAll('.dropdown-menu').forEach(m => { if (m !== menu) m.classList.remove('active'); }); menu.classList.toggle('active'); if (menu.classList.contains('active')){ search.value=''; build(); search.focus(); }});
    search.addEventListener('input', (e) => build(e.target.value));
    document.addEventListener('click', (e) => { if (!trigger.contains(e.target) && !menu.contains(e.target)) menu.classList.remove('active'); });
  }

  function updateTriggerUI(type, code) {
    const c = CURRENCIES.find(x => x.code === code) || { code, country:'us' };
    const t = document.getElementById(`${type}-trigger`);
    if (t) {
      const flag = t.querySelector('.trigger-flag');
      flag.src = getFlagUrl(c.code, c.country);
      if (CRYPTO_CODES.has(code)) flag.classList.add('crypto-logo');
      else flag.classList.remove('crypto-logo');
      t.querySelector('.trigger-code').innerText = code;
    }
  }

  // --- Multi-Currency Checklist ---
  function populateChecklist() {
    if (!checklistContainer) return;
    checklistContainer.textContent = '';
    chrome.storage.sync.get(['selectedCurrencies'], (d) => {
      const sel = d.selectedCurrencies || [guessLocalCurrency()];
      CURRENCIES.forEach(c => {
        const dn = (prefs.lang === 'ar' && c.nameAr) ? c.nameAr : c.name;
        const l = document.createElement('label'); l.className = 'check-item';
        const checkInfo = document.createElement('div'); checkInfo.className = 'check-info';
        const cImg = document.createElement('img'); cImg.src = getFlagUrl(c.code, c.country);
        const bCode = document.createElement('b'); bCode.textContent = c.code;
        const spanDn = document.createElement('span'); spanDn.style.cssText = 'font-size:11px;color:var(--text-muted)'; spanDn.textContent = dn;
        checkInfo.appendChild(cImg); checkInfo.appendChild(bCode); checkInfo.appendChild(spanDn);
        const inp = document.createElement('input'); inp.type = 'checkbox'; inp.value = c.code; if (sel.includes(c.code)) inp.checked = true;
        const customCb = document.createElement('div'); customCb.className = 'custom-checkbox';
        const cbSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); cbSvg.setAttribute('viewBox', '0 0 24 24');
        const cbPoly = document.createElementNS('http://www.w3.org/2000/svg', 'polyline'); cbPoly.setAttribute('points', '20 6 9 17 4 12');
        cbSvg.appendChild(cbPoly); customCb.appendChild(cbSvg);
        l.appendChild(checkInfo); l.appendChild(inp); l.appendChild(customCb);
        l.querySelector('input').addEventListener('change', () => {
          const all = Array.from(checklistContainer.querySelectorAll('input:checked')).map(x => x.value);
          if (!all.length) all.push(guessLocalCurrency());
          prefs.onPageMode = 'multi'; if (inpOnPageMode) inpOnPageMode.value = 'multi';
          chrome.storage.sync.set({ selectedCurrencies: all, prefs });
        });
        checklistContainer.appendChild(l);
      });
    });
  }
  if (multiSearch) multiSearch.addEventListener('input', (e) => { const f = e.target.value.toLowerCase(); checklistContainer.querySelectorAll('.check-item').forEach(i => { i.style.display = i.innerText.toLowerCase().includes(f) ? 'flex' : 'none'; }); });

  // --- Calculator ---
  function calculate() {
    if (!amountInput || !resultText) return;
    const safeVal = amountInput.value.replace(/[^0-9.+-/*]/g, '');
    const amt = parseFloat(safeVal);
    if (!amt || isNaN(amt)) { resultText.innerText = '...'; return; }
    resultText.style.opacity = 0.5;
    chrome.runtime.sendMessage({ action:'convert', amount:amt, fromCurrency:selectedFrom, targetCurrency:selectedTo }, (res) => {
      resultText.style.opacity = 1;
      if (res?.success) {
        const isCrypto = ['BTC','ETH','ADA','SOL','XRP'].includes(selectedTo);
        const digits = isCrypto ? 6 : parseInt(prefs.decimalDigits);
        const fmt = new Intl.NumberFormat('en-US', { minimumFractionDigits:digits, maximumFractionDigits: isCrypto ? 8 : digits }).format(res.result);
        let tn = selectedTo;
        if (prefs.lang === 'ar') { const obj = CURRENCIES.find(c => c.code === selectedTo); if (obj?.nameAr) tn = obj.nameAr; }
        resultText.innerText = fmt + ' ' + tn;
        // Refresh status dot after a successful conversion (cache was likely populated)
        refreshApiStatus();
      } else resultText.innerText = 'Error';
    });
  }

  function updateFormatPreview() { if (!formatPreview) return; const d = parseInt(prefs.decimalDigits); formatPreview.value = new Intl.NumberFormat('en-US', { minimumFractionDigits:d, maximumFractionDigits:d }).format(12345.6789); }

  // --- Persistence ---
  function savePrefs() {
    if (inpDigits) prefs.decimalDigits = parseInt(inpDigits.value);
    if (inpOnPageMode) prefs.onPageMode = inpOnPageMode.value;
    if (inpLang) prefs.lang = inpLang.value;
    chrome.storage.sync.set({ prefs });
    calculate(); updateFormatPreview();
  }
  function saveState() { chrome.storage.sync.set({ fromCurrency: selectedFrom, targetCurrency: selectedTo }); }

  // --- Theme & Language ---
  function applyTheme(t) {
    document.body.setAttribute('data-theme', t);
    const moon = document.getElementById('icon-moon'), sun = document.getElementById('icon-sun');
    if (moon && sun) { moon.style.display = t === 'light' ? 'block' : 'none'; sun.style.display = t === 'light' ? 'none' : 'block'; }
  }
  function applyLanguage(lang) {
    const t = TRANSLATIONS[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => { const k = el.getAttribute('data-i18n'); if (t[k]) el.textContent = t[k]; });
    if (lang === 'ar') document.body.classList.add('rtl'); else document.body.classList.remove('rtl');
    const fs = document.getElementById('from-search'), ts = document.getElementById('to-search');
    if (fs) fs.placeholder = lang === 'ar' ? 'بحث...' : 'Search...';
    if (ts) ts.placeholder = lang === 'ar' ? 'بحث...' : 'Search...';
  }
});