(function () {
  const toggle = document.getElementById('navToggle');
  const overlay = document.getElementById('mobileMenuOverlay');
  const closeBtn = document.getElementById('mobileMenuClose');

  if (!toggle || !overlay || !closeBtn) return;

  function openMenu() {
    overlay.classList.add('is-open');
    overlay.removeAttribute('hidden');
    toggle.setAttribute('aria-expanded', 'true');
    document.addEventListener('keydown', handleKeydown);
  }

  function closeMenu() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('hidden', '');
    toggle.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', handleKeydown);
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') closeMenu();
  }

  toggle.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', function (event) {
    if (event.target === overlay) closeMenu();
  });
  overlay.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
})();
