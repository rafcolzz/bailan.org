// Theme toggle with system preference detection
(function() {
  const toggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // Get saved theme or detect system preference
  function getInitialTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Apply theme to document
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateToggleIcon(theme);
  }

  // Update button icon (monochrome, inherits text color)
  function updateToggleIcon(theme) {
    if (toggle) {
      toggle.textContent = theme === 'dark' ? '☀' : '☾';
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      toggle.title = theme === 'dark' ? 'Light mode' : 'Dark mode';
    }
  }

  // Toggle handler
  function toggleTheme() {
    const current = root.getAttribute('data-theme') || getInitialTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  }

  // Initialize
  const theme = getInitialTheme();
  applyTheme(theme);

  // Listen for system preference changes (only if no user preference saved)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Click handler
  if (toggle) {
    toggle.addEventListener('click', function() {
      toggleTheme();
      toggle.blur();
    });
  }
})();