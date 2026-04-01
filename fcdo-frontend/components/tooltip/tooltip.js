document.querySelectorAll('.fcdo-tooltip').forEach(module => {
    const trigger = module.querySelector('.fcdo-tooltip__trigger');
    const tooltip = module.querySelector('.fcdo-tooltip__content');

    if (!trigger || !tooltip) return;

    const show = () => {
        tooltip.setAttribute('data-visible', 'true');
        tooltip.setAttribute('aria-hidden', 'false');
    };

    const hide = () => {
        tooltip.setAttribute('data-visible', 'false');
        tooltip.setAttribute('aria-hidden', 'true');
    };

    // Mouse + keyboard
    trigger.addEventListener('mouseenter', show);
    trigger.addEventListener('mouseleave', hide);
    trigger.addEventListener('focus', show);
    trigger.addEventListener('blur', hide);

    // Escape closes tooltip
    trigger.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            hide();
            trigger.blur();
        }
    });

    // Initialise state
    tooltip.setAttribute('aria-hidden', 'true');
});