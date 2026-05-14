document.addEventListener('DOMContentLoaded', () => {
  const togglePageNavigation = document.getElementById('togglePageNavigation');
  const pageNavigation = document.getElementById('pageNavigation');

  if (!togglePageNavigation || !pageNavigation) return;

  const mediaQuery = window.matchMedia('(min-width: 768px)');

  function closeAllDetails() {
    const detailMenus = pageNavigation.querySelectorAll(
      '.fcdo-page-navigation__details'
    );

    detailMenus.forEach((details) => {
      details.open = false;
    });
  }

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

    /*
     * When sidebar collapses,
     * close all open submenus
     */
    if (!isOpen) {
      closeAllDetails();
    }
  }

  function updateSidebarState(e) {
    const isDesktop = e.matches;

    // open on desktop, closed on mobile
    setMenuState(isDesktop);
  }

  // Initial state
  updateSidebarState(mediaQuery);

  // Listen for viewport changes
  mediaQuery.addEventListener('change', updateSidebarState);

  // Toggle sidebar button
  togglePageNavigation.addEventListener('click', () => {
    const isExpanded =
      togglePageNavigation.getAttribute('aria-expanded') === 'true';

    setMenuState(!isExpanded);
  });

  /*
   * Auto-open sidebar when submenu opens
   */
  const detailMenus = pageNavigation.querySelectorAll(
    '.fcdo-page-navigation__details'
  );

  detailMenus.forEach((details) => {
    details.addEventListener('toggle', () => {
      const isSidebarOpen = pageNavigation.classList.contains(
        'fcdo-application-layout__sidebar--open'
      );

      // Open sidebar if submenu opens while collapsed
      if (details.open && !isSidebarOpen) {
        setMenuState(true);
      }
    });
  });
});