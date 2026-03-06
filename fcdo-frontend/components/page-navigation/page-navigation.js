document.addEventListener('DOMContentLoaded', () => {
  const togglePageNavigation = document.getElementById('togglePageNavigation');
  const pageNavigation = document.getElementById('pageNavigation');

  if (!togglePageNavigation || !pageNavigation) return;

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