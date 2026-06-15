(() => {
  // src/js/main.js
  var link = document.querySelector(".main__scroll-link");
  link.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth"
    });
  });
  var langCurrent = document.querySelector(".lang-current");
  var langSwitcher = document.querySelector(".lang-switcher");
  var langButtons = langSwitcher?.querySelectorAll("a[data-lang]");
  var langCurrentLabel = langCurrent?.querySelector("span");
  var body = document.body;
  var LANGUAGE_STORAGE_KEY = "bet4everLang";
  var closeLangSwitcher = () => {
    langSwitcher?.classList.remove("open");
  };
  var getSavedLanguage = () => {
    try {
      return localStorage.getItem(LANGUAGE_STORAGE_KEY);
    } catch (e) {
      return null;
    }
  };
  var saveLanguage = (code) => {
    try {
      if (code)
        localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
    } catch (e) {
    }
  };
  var setActiveLanguage = (button) => {
    if (!button)
      return;
    langButtons?.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const langCode = button.dataset.lang?.toLowerCase();
    if (langCurrentLabel) {
      langCurrentLabel.textContent = button.dataset.lang || "";
    }
    if (langCode) {
      body.dataset.lang = langCode;
      saveLanguage(langCode);
    }
  };
  var i18nCache = {};
  var applyTranslations = (translations) => {
    const nodes = document.querySelectorAll("[data-i18n]");
    nodes.forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (!key)
        return;
      const parts = key.split(".");
      let val = translations;
      for (let p of parts) {
        if (val && typeof val === "object" && p in val)
          val = val[p];
        else {
          val = null;
          break;
        }
      }
      if (val === null || val === void 0)
        return;
      if (node.tagName === "INPUT" || node.tagName === "TEXTAREA") {
        node.setAttribute("placeholder", val);
      } else {
        node.innerHTML = val;
      }
    });
  };
  var loadAndApply = async (code) => {
    const lang = code.toLowerCase();
    if (i18nCache[lang]) {
      applyTranslations(i18nCache[lang]);
      return;
    }
    try {
      const res = await fetch(`./i18n/${lang}.json`);
      if (!res.ok)
        return;
      const json = await res.json();
      i18nCache[lang] = json;
      applyTranslations(json);
    } catch (e) {
      console.warn("i18n load error", e);
    }
  };
  langCurrent?.addEventListener("click", (event) => {
    event.preventDefault();
    langCurrent.classList.toggle("open");
    langSwitcher?.classList.toggle("open");
  });
  langButtons?.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      langCurrent.classList.remove("open");
      setActiveLanguage(button);
      closeLangSwitcher();
      const code = button.dataset.lang?.toLowerCase();
      if (code) {
        loadAndApply(code);
        document.documentElement.dir = code === "ar" ? "rtl" : "ltr";
      }
    });
  });
  window.addEventListener("click", (event) => {
    if (!langSwitcher || !langCurrent)
      return;
    if (langCurrent.contains(event.target) || langSwitcher.contains(event.target))
      return;
    langCurrent.classList.remove("open");
    closeLangSwitcher();
  });
  document.addEventListener("DOMContentLoaded", () => {
    const saved = getSavedLanguage();
    const initial = saved || document.body.dataset.lang || document.documentElement.lang || "ar";
    const upper = (initial || "ar").toUpperCase();
    if (langCurrentLabel)
      langCurrentLabel.textContent = upper;
    const btn = Array.from(langButtons || []).find((b) => (b.dataset.lang || "").toLowerCase() === initial);
    if (btn)
      btn.classList.add("active");
    document.documentElement.dir = initial === "ar" ? "rtl" : "ltr";
    loadAndApply(initial);
  });
})();
