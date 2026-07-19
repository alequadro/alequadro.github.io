// Runs synchronously in <head> before paint: applies saved theme, no FOUC.
// CSP allows only self-hosted scripts, so this must stay external (no inline JS).
(function () {
  var theme = localStorage.getItem('theme');
  document.documentElement.dataset.theme = theme === 'light' ? 'light' : 'dark';
})();

document.addEventListener('click', function (e) {
  var btn = e.target.closest('[data-theme-toggle]');
  if (!btn) return;
  var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
  btn.setAttribute('aria-pressed', String(next === 'light'));
});
