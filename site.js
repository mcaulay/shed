(function () {
  var KEY = 'shed_cookie_consent';
  var GA_ID = 'G-WN09HDJW0V';
  var consent = localStorage.getItem(KEY);

  function loadGA() {
    if (window.__shedGALoaded) return;
    window.__shedGALoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function showBanner() {
    var b = document.getElementById('cookie-banner');
    if (b) b.classList.add('visible');
  }

  if (consent === 'accepted') {
    loadGA();
  } else if (consent !== 'declined') {
    showBanner();
  }

  var acceptBtn = document.querySelector('.cookie-accept');
  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      localStorage.setItem(KEY, 'accepted');
      loadGA();
      document.getElementById('cookie-banner').classList.remove('visible');
    });
  }

  var declineBtn = document.querySelector('.cookie-decline');
  if (declineBtn) {
    declineBtn.addEventListener('click', function () {
      localStorage.setItem(KEY, 'declined');
      document.getElementById('cookie-banner').classList.remove('visible');
    });
  }

  var manageBtn = document.getElementById('manage-cookies');
  if (manageBtn) {
    manageBtn.addEventListener('click', function () {
      localStorage.removeItem(KEY);
      window.location.reload();
    });
  }

  var navToggle = document.querySelector('.nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      this.nextElementSibling.classList.toggle('open');
    });
  }
})();
