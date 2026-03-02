document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("theme-toggle");
    const root = document.documentElement;

    // Get saved theme (if any)
    let theme = localStorage.getItem("theme");

    // Apply saved theme only — no default fallback
    if (theme) {
        applyTheme(theme);
    }

    toggle.addEventListener("click", (e) => {
        e.preventDefault();

        // If no theme yet, start with dark
        if (!theme) {
            theme = "dark";
        } else {
            theme = theme === "dark" ? "highContrast" : "dark";
        }

        applyTheme(theme);
        localStorage.setItem("theme", theme);
    });

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);

        if (theme === "dark") {
            toggle.textContent = "Toggle High Contrast";
        } else {
            toggle.textContent = "Toggle Dark Mode";
        }
    }
});