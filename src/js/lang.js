// src/js/lang.js

const translations = {
  en: {
    header: {
      title: "Welcome to our site!",
      menuHome: "Home",
      menuAbout: "About",
      menuContact: "Contact"
    },
    footer: {
      copyright: "All rights reserved."
    },
   main: {
        greeting: { html: "<span>Hello, user!</span> Welcome to the site." },
        description: "This is the main content area.",
        button: "Get Bonus",
        bonus: "Your bonus is active!",
        erroreSpan: "Test",
        erroreSpan2: "Test"
      },
    xbet: {
      title: "Strong Partnerships with a Strong Brand",
      description: "1xBet is a trusted sponsor and business partner of world-renowned clubs, athletes, and technology brands."
    },
    players: {
      title: "Top Türkiye players",
      digit1: "Player 1",
      digit2: "Player 2",
      digit3: "Player 3",
    },
    secondary: {
      button: "Bet Now"
    },
    infographics: {
      title: "Fast, Easy, Secure — we're ready for your win",
      item1: "Fast",
      item2: "Easy",
      item3: "Secure",
      desc1: "Create your bet slip in 3 clicks. Live odds update in milliseconds; pages open in < 1 sec.",
      desc2: "60+ payment methods, instant TL deposit/withdrawal. Find thousands of matches and markets in seconds with smart filters.",
      desc3: "Curacao licensed certified betting site. 256-bit SSL, independent audits and responsible gaming policy keep your data safe."
    },
    banners: {
      title: "Start winning now!"
    },
  }, 
  tr: {
    header: {
      title: "Sitemize hoş geldiniz!",
      menuHome: "Ana Sayfa",
      menuAbout: "Hakkımızda",
      menuContact: "İletişim"
    },
    footer: {
      copyright: "Tüm hakları saklıdır."
    },
    main: {
        greeting: { html: "<span>Site engellendi,</span> ama kuponun güvende" },
        description: "Çalışan bağlantıyı senin için bulduk — üstelik hesabına özel bir bonus hazırladık.",
        button: "Bonusu Al",
        bonus: "+100 ₺ bonus",
        erroreSpan: "Engellendi",
        erroreSpan2: "BTK kararına göre hizmete erişim"
      },
    xbet: {
      title: "Güçlü Markayla Güçlü Ortaklıklar",
      description: "1xBet, dünya çapında tanınan kulüplerin, sporcuların ve teknoloji markalarının güvenilir sponsoru ve iş ortağıdır."
    },
    players: {
      title: "Top Türkiye oyuncuları",
      digit1: "Oyuncu 1",
      digit2: "Oyuncu 2",
      digit3: "Oyuncu 3",
    },
    secondary: {
      button: "Bahis Yap"
    },
    infographics: {
      title: "Hızlı, Kolay, Güvenli — kazanmanız için hazırız",
      item1: "Hızlı",
      item2: "Kolay",
      item3: "Güvenli",
      desc1: "Bahis kuponunuzu 3 tıkta oluşturun. Canlı oranlar milisaniyeler içinde güncellenir; sayfalar < 1 sn’de açılır.",
      desc2: "60+ ödeme yöntemi, anında TL yatırma / çekme. Binlerce maç ve marketi akıllı filtrelerle saniyeler içinde bulun.",
      desc3: "Curaçao lisanslı sertifikalı bahis sitesi. 256-bit SSL, bağımsız denetimler ve sorumlu oyun politikasıyla verileriniz güvende."
    },
    banners: {
      title: "Kazanmaya Şimdi Başla!"
    },
  }
};



function setLanguage(lang) {
  localStorage.setItem('lang', lang);
  applyTranslations(lang);
  setDirection(lang);
}


function setDirection(lang) {
  document.documentElement.dir = 'ltr';
  document.body.style.textAlign = '';
}


function getLanguage() {
  return localStorage.getItem('lang') || 'en';
}

function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;
  // Players
  document.querySelectorAll('[data-i18n="players.title"]').forEach(el => el.textContent = t.players.title);
  document.querySelectorAll('[data-i18n="players.digit1"]').forEach(el => el.textContent = t.players.digit1);
  document.querySelectorAll('[data-i18n="players.digit2"]').forEach(el => el.textContent = t.players.digit2);
  document.querySelectorAll('[data-i18n="players.digit3"]').forEach(el => el.textContent = t.players.digit3);
  document.querySelectorAll('[data-i18n="secondary.button"]').forEach(el => el.textContent = t.secondary.button);
  // Header
  document.querySelectorAll('[data-i18n="header.title"]').forEach(el => el.textContent = t.header.title);
  document.querySelectorAll('[data-i18n="header.menuHome"]').forEach(el => el.textContent = t.header.menuHome);
  document.querySelectorAll('[data-i18n="header.menuAbout"]').forEach(el => el.textContent = t.header.menuAbout);
  document.querySelectorAll('[data-i18n="header.menuContact"]').forEach(el => el.textContent = t.header.menuContact);
  // Footer
  document.querySelectorAll('[data-i18n="footer.copyright"]').forEach(el => el.textContent = t.footer.copyright);
  // Main
  document.querySelectorAll('[data-i18n="main.greeting"]').forEach(el => {
    if (typeof t.main.greeting === 'object' && t.main.greeting.html) {
      el.innerHTML = t.main.greeting.html;
    } else {
      el.textContent = t.main.greeting;
    }
  });
  document.querySelectorAll('[data-i18n="main.description"]').forEach(el => el.textContent = t.main.description);
  document.querySelectorAll('[data-i18n="main.button"]').forEach(el => el.textContent = t.main.button);
  document.querySelectorAll('[data-i18n="main.bonus"]').forEach(el => el.textContent = t.main.bonus);
  document.querySelectorAll('[data-i18n="main.erroreSpan"]').forEach(el => el.textContent = t.main.erroreSpan);
  document.querySelectorAll('[data-i18n="main.erroreSpan2"]').forEach(el => el.textContent = t.main.erroreSpan2);

  // Infographics
  document.querySelectorAll('[data-i18n="infographics.title"]').forEach(el => el.textContent = t.infographics.title);
  document.querySelectorAll('[data-i18n="infographics.item1"]').forEach(el => el.textContent = t.infographics.item1);
  document.querySelectorAll('[data-i18n="infographics.item2"]').forEach(el => el.textContent = t.infographics.item2);
  document.querySelectorAll('[data-i18n="infographics.item3"]').forEach(el => el.textContent = t.infographics.item3);
  document.querySelectorAll('[data-i18n="infographics.desc1"]').forEach(el => el.textContent = t.infographics.desc1);
  document.querySelectorAll('[data-i18n="infographics.desc2"]').forEach(el => el.textContent = t.infographics.desc2);
  document.querySelectorAll('[data-i18n="infographics.desc3"]').forEach(el => el.textContent = t.infographics.desc3);
  // Banners
  document.querySelectorAll('[data-i18n="banners.title"]').forEach(el => el.textContent = t.banners.title);
  // XBet
  document.querySelectorAll('[data-i18n="xbet.title"]').forEach(el => el.textContent = t.xbet.title);
  document.querySelectorAll('[data-i18n="xbet.description"]').forEach(el => el.textContent = t.xbet.description);
} 


document.addEventListener('DOMContentLoaded', function() {
  const lang = getLanguage();
  applyTranslations(lang);
  setDirection(lang);
});

// Экспортируем функцию для глобального доступа (кастомный дропдаун)
window.setLanguage = setLanguage;
