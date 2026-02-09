document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("navigationToggle");
  const navMenu = document.getElementById("navigationMenu");

  if (!menuButton || !navMenu) {
    console.error("menuButton or navMenu not found");
    return;
  }

  menuButton.addEventListener("click", () => {
    const isOpen = navMenu.hasAttribute("hidden") === false;

    if (isOpen) {
      navMenu.setAttribute("hidden", "");
      menuButton.setAttribute("aria-expanded", "false");
    } else {
      navMenu.removeAttribute("hidden");
      menuButton.setAttribute("aria-expanded", "true");
    }
  });
});
