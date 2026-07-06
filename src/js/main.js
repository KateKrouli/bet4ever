const link = document.querySelector('.main__scroll-link');

link.addEventListener('click', (e) => {
  e.preventDefault(); 
  window.scrollBy({
    top: window.innerHeight,
    behavior: 'smooth',   
  });
});

const langCurrent = document.querySelector('.lang-current');
const langSwitcher = document.querySelector('.lang-switcher');
const langButtons = langSwitcher?.querySelectorAll('a[data-lang]');
const langCurrentLabel = langCurrent?.querySelector('span');
const body = document.body;
const LANGUAGE_STORAGE_KEY = 'bet4everLang';

const closeLangSwitcher = () => {
  langSwitcher?.classList.remove('open');
};

const getSavedLanguage = () => {
  try {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY);
  } catch (e) {
    return null;
  }
};

const saveLanguage = (code) => {
  try {
    if (code) localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
  } catch (e) {
    // ignore storage errors
  }
};

const setActiveLanguage = (button) => {
  if (!button) return;

  langButtons?.forEach((item) => item.classList.remove('active'));
  button.classList.add('active');

  const langCode = button.dataset.lang?.toLowerCase();
  if (langCurrentLabel) {
    langCurrentLabel.textContent = button.dataset.lang || '';
  }
  if (langCode) {
    body.dataset.lang = langCode;
    saveLanguage(langCode);
  }
};

// i18n: apply translations to elements with data-i18n
const i18nCache = {};

const applyTranslations = (translations) => {
  const nodes = document.querySelectorAll('[data-i18n]');
  nodes.forEach((node) => {
    const key = node.getAttribute('data-i18n');
    if (!key) return;
    const parts = key.split('.');
    let val = translations;
    for (let p of parts) {
      if (val && typeof val === 'object' && p in val) val = val[p]; else { val = null; break; }
    }
    if (val === null || val === undefined) return;
    if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
      node.setAttribute('placeholder', val);
    } else {
      node.innerHTML = val;
    }
  });
};

const loadAndApply = async (code) => {
  const lang = code.toLowerCase();
  if (i18nCache[lang]) { applyTranslations(i18nCache[lang]); return; }
  try {
    const res = await fetch(`./i18n/${lang}.json`);
    if (!res.ok) return;
    const json = await res.json();
    i18nCache[lang] = json;
    applyTranslations(json);
  } catch (e) {
    console.warn('i18n load error', e);
  }
};

langCurrent?.addEventListener('click', (event) => {
  event.preventDefault();
  langCurrent.classList.toggle('open');
  langSwitcher?.classList.toggle('open');
});

langButtons?.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    langCurrent.classList.remove('open');
    setActiveLanguage(button);
    closeLangSwitcher();
    // apply translations and set direction
    const code = button.dataset.lang?.toLowerCase();
    if (code) {
      loadAndApply(code);
      document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr';
      // reinitialize persons swiper if available, otherwise try to update any Swiper instances
      setTimeout(() => {
        if (typeof window.reinitPersonsSwiper === 'function') {
          window.reinitPersonsSwiper();
        } else if (window.Swiper && window.Swiper.instances) {
          window.Swiper.instances.forEach(swiper => {
            if (swiper && typeof swiper.update === 'function') swiper.update();
          });
        }
      }, 120);
    }
  });
});

window.addEventListener('click', (event) => {
  if (!langSwitcher || !langCurrent) return;
  if (langCurrent.contains(event.target) || langSwitcher.contains(event.target)) return;
  langCurrent.classList.remove('open');
  closeLangSwitcher();
});

// initialize from saved language or body[data-lang]
document.addEventListener('DOMContentLoaded', () => {
  const saved = getSavedLanguage();
  const initial = saved || document.body.dataset.lang || document.documentElement.lang || 'ar';
  // set lang-current label and active button
  const upper = (initial || 'ar').toUpperCase();
  if (langCurrentLabel) langCurrentLabel.textContent = upper;
  const btn = Array.from(langButtons || []).find(b => (b.dataset.lang||'').toLowerCase() === initial);
  if (btn) btn.classList.add('active');
  document.documentElement.dir = initial === 'ar' ? 'rtl' : 'ltr';
  loadAndApply(initial);
});
