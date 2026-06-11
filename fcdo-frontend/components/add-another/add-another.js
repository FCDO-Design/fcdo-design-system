(function (window, document) {
  'use strict';

  class FcdoAddAnother {
    constructor(root) {
      this.root = root;

      this.container = root.querySelector('[data-add-container]');
      this.button = root.querySelector('[data-add-button]');
      this.itemSelector = root.getAttribute('data-item-selector');

      if (!this.container || !this.button || !this.itemSelector) return;

      this.bindEvents();

      requestAnimationFrame(() => this.updateAll());
    }

    bindEvents() {
      this.button.addEventListener('click', () => {
        this.addItem();
      });

      this.container.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('[data-remove-button]');
        if (!removeBtn) return;

        const item = removeBtn.closest(this.itemSelector);
        if (!item) return;

        item.remove();
        this.updateAll();
      });
    }

    addItem() {
      const template = this.container.querySelector(this.itemSelector);
      if (!template) return;

      const clone = template.cloneNode(true);

      this.resetFields(clone);
      this.container.appendChild(clone);

      this.updateAll();
    }

    resetFields(element) {
      element.querySelectorAll('input, select, textarea').forEach((field) => {
        if (field.type === 'checkbox' || field.type === 'radio') {
          field.checked = false;
        } else {
          field.value = '';
        }
      });
    }

    updateAll() {
      this.updateIndexes();
      this.updateState();
    }

    updateIndexes() {
      const items = Array.from(this.container.querySelectorAll(this.itemSelector));

      items.forEach((item, index) => {

        item.querySelectorAll('input, select, textarea').forEach((field) => {

          // -------------------------
          // ID (countries-0, countries-1)
          // -------------------------
          const baseId = this.getBaseId(field);

          if (baseId) {
            const newId = `${baseId}-${index}`;
            field.id = newId;

            const label = item.querySelector(`label[for^="${baseId}"]`);
            if (label) {
              label.setAttribute('for', newId);
            }
          }

          // -------------------------
          // NAME (countries[0], countries[1])
          // -------------------------
          const baseName = this.getBaseName(field);

          if (baseName) {
            field.name = `${baseName}[${index}]`;
          }
        });
      });
    }

    getBaseId(field) {
      const id = field.getAttribute('data-base-id') || field.id;
      if (!id) return null;

      return id.replace(/-\d+$/, '');
    }

    getBaseName(field) {
      const name = field.getAttribute('data-base-name') || field.name;
      if (!name) return null;

      return name.replace(/\[\d+\]$/, '').replace(/\[\]$/, '');
    }

    updateState() {
      const items = Array.from(this.container.querySelectorAll(this.itemSelector));

      const showRemove = items.length > 1;

      items.forEach((item) => {
        const removeBtn = item.querySelector('[data-remove-button]');
        if (!removeBtn) return;

        removeBtn.classList.toggle('fcdo-display-none', !showRemove);
      });
    }
  }

  function initAll() {
    document
      .querySelectorAll('[data-module="fcdo-add-another"]')
      .forEach((root) => new FcdoAddAnother(root));
  }

  document.addEventListener('DOMContentLoaded', initAll);

  window.FcdoAddAnother = FcdoAddAnother;

})(window, document);