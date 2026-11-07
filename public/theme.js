// Apply the saved theme before paint; initialize controls once the body is ready.
// Keep this external to respect the site's Content Security Policy.
(function () {
  var root = document.documentElement;
  var savedTheme;

  try {
    savedTheme = localStorage.getItem('theme');
  } catch (_) {
    // Theme controls still work when browser storage is unavailable.
  }

  root.dataset.theme = savedTheme === 'dark' ? 'dark' : 'light';

  function syncThemeControl() {
    var button = document.querySelector('[data-theme-toggle]');
    if (button) {
      button.setAttribute('aria-pressed', String(root.dataset.theme === 'light'));
    }
  }

  function syncLanguageLink() {
    var link = document.querySelector('[data-language-switch]');
    if (link) link.hash = window.location.hash;
  }

  function initializeControls() {
    syncThemeControl();
    syncLanguageLink();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeControls, { once: true });
  } else {
    initializeControls();
  }

  window.addEventListener('hashchange', syncLanguageLink);

  document.addEventListener('click', function (event) {
    if (!(event.target instanceof Element)) return;

    var menu = document.querySelector('[data-section-menu]');
    if (menu && (event.target.closest('[data-section-menu] a') || !menu.contains(event.target))) {
      menu.open = false;
    }

    var button = event.target.closest('[data-theme-toggle]');
    if (!button) return;

    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch (_) {
      // Retain the selected theme for this visit without persistent storage.
    }
    syncThemeControl();
  });

  document.addEventListener('keydown', function (event) {
    var menu = document.querySelector('[data-section-menu]');
    if (event.key === 'Escape' && menu && menu.open) {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
})();
