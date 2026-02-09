document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("theme-toggle");
    const root = document.documentElement;

    // Load saved preference or detect system default
    let theme = localStorage.getItem("theme");
    if (!theme) {
        theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "highContrast";
    }
    applyTheme(theme);

    toggle.addEventListener("click", (e) => {
        e.preventDefault(); // prevent page jump
        theme = theme === "dark" ? "highContrast" : "dark";
        applyTheme(theme);
        localStorage.setItem("theme", theme);
        toggle.textContent = theme === "dark" ? "Toggle High Contrast" : "Toggle Dark Mode";
    });

    function applyTheme(theme) {
        if (theme === "dark") {
            root.setAttribute("data-theme", "dark");
        } else {
            root.setAttribute("data-theme", "highContrast");
        }
        toggle.textContent = theme === "dark" ? "Toggle High Contrast" : "Toggle Dark Mode";
    }
});
