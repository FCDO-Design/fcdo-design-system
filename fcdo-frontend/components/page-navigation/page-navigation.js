document.addEventListener('DOMContentLoaded', () => {
  const togglePageNavigation = document.getElementById('togglePageNavigation');
  const pageNavigation = document.getElementById('pageNavigation');

  if (!togglePageNavigation || !pageNavigation) return;

  const mediaQuery = window.matchMedia('(min-width: 768px)');

  function updateSidebarState(e) {
    const isDesktop = e.matches;

    if (isDesktop) {
      // Open on desktop
      togglePageNavigation.setAttribute('aria-expanded', 'true');
      pageNavigation.classList.add('fcdo-application-layout__sidebar--open');
    } else {
      // Closed on mobile
      togglePageNavigation.setAttribute('aria-expanded', 'false');
      pageNavigation.classList.remove('fcdo-application-layout__sidebar--open');
    }
  }

  // Set initial state
  updateSidebarState(mediaQuery);

  // Listen for viewport changes
  mediaQuery.addEventListener('change', updateSidebarState);

  // Toggle on click
  togglePageNavigation.addEventListener('click', () => {
    const isExpanded =
      togglePageNavigation.getAttribute('aria-expanded') === 'true';

    togglePageNavigation.setAttribute(
      'aria-expanded',
      String(!isExpanded)
    );

    pageNavigation.classList.toggle(
      'fcdo-application-layout__sidebar--open',
      !isExpanded
    );
  });
});