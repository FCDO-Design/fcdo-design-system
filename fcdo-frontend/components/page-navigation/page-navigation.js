document.addEventListener('DOMContentLoaded', () => {
  const togglePageNavigation = document.getElementById('togglePageNavigation');
  const pageNavigation = document.getElementById('pageNavigation');

  if (!togglePageNavigation || !pageNavigation) return;

  const mediaQuery = window.matchMedia('(min-width: 768px)');

  function setMenuState(isOpen) {
    togglePageNavigation.setAttribute('aria-expanded', String(isOpen));
    togglePageNavigation.setAttribute(
      'aria-label',
      isOpen ? 'Close menu' : 'Open menu'
    );

    pageNavigation.classList.toggle(
      'fcdo-application-layout__sidebar--open',
      isOpen
    );
  }

  function updateSidebarState(e) {
    const isDesktop = e.matches;

    setMenuState(isDesktop); // open on desktop, closed on mobile
  }

  // Initial state
  updateSidebarState(mediaQuery);

  // Listen for viewport changes
  mediaQuery.addEventListener('change', updateSidebarState);

  // Toggle on click
  togglePageNavigation.addEventListener('click', () => {
    const isExpanded =
      togglePageNavigation.getAttribute('aria-expanded') === 'true';

    setMenuState(!isExpanded);
  });
});