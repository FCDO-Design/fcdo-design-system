'use strict';

(function (global) {
  const KeyCode = {
    ESC: 27,
  };

  const state = {
    openDialogList: [],
    ignoreFocusChanges: false,
    dialogOpenClass: 'fcdo-has-dialog',
  };

  function getCurrentDialog() {
    return state.openDialogList[state.openDialogList.length - 1];
  }

  function isFocusable(el) {
    if (!el || el.tabIndex < 0 || el.disabled) return false;

    switch (el.nodeName) {
      case 'A':
        return !!el.href && el.rel !== 'ignore';
      case 'INPUT':
        return el.type !== 'hidden';
      case 'BUTTON':
      case 'SELECT':
      case 'TEXTAREA':
        return true;
      default:
        return false;
    }
  }

  function attemptFocus(el) {
    if (!isFocusable(el)) return false;

    state.ignoreFocusChanges = true;
    try {
      el.focus();
    } catch {}
    state.ignoreFocusChanges = false;

    return document.activeElement === el;
  }

  function focusFirstDescendant(el) {
    for (let i = 0; i < el.childNodes.length; i++) {
      const child = el.childNodes[i];
      if (attemptFocus(child) || focusFirstDescendant(child)) return true;
    }
    return false;
  }

  function focusLastDescendant(el) {
    for (let i = el.childNodes.length - 1; i >= 0; i--) {
      const child = el.childNodes[i];
      if (attemptFocus(child) || focusLastDescendant(child)) return true;
    }
    return false;
  }

  function Dialog(dialogId, focusAfterClosed, focusFirst) {
    this.dialogNode = document.getElementById(dialogId);

    if (!this.dialogNode) {
      throw new Error('No dialog found with id="' + dialogId + '"');
    }

    const role = (this.dialogNode.getAttribute('role') || '').trim();
    if (role !== 'dialog' && role !== 'alertdialog') {
      throw new Error('Dialog must have role="dialog" or "alertdialog"');
    }

    this.focusAfterClosed =
      typeof focusAfterClosed === 'string'
        ? document.getElementById(focusAfterClosed)
        : focusAfterClosed;

    this.focusFirst =
      typeof focusFirst === 'string'
        ? document.getElementById(focusFirst)
        : focusFirst || null;

    this.backdropNode = ensureBackdrop(this.dialogNode);

    this.open();
  }

  function ensureBackdrop(dialogNode) {
    const backdropClass = 'fcdo-dialog-backdrop';

    if (dialogNode.parentNode.classList.contains(backdropClass)) {
      return dialogNode.parentNode;
    }

    const backdrop = document.createElement('div');
    backdrop.className = backdropClass;

    dialogNode.parentNode.insertBefore(backdrop, dialogNode);
    backdrop.appendChild(dialogNode);

    return backdrop;
  }

  Dialog.prototype.open = function () {
    document.body.classList.add(state.dialogOpenClass);
    this.backdropNode.classList.add('fcdo-dialog-backdrop--active');

    this.preNode = document.createElement('div');
    this.postNode = document.createElement('div');

    this.preNode.tabIndex = 0;
    this.postNode.tabIndex = 0;

    this.dialogNode.parentNode.insertBefore(this.preNode, this.dialogNode);
    this.dialogNode.parentNode.insertBefore(
      this.postNode,
      this.dialogNode.nextSibling
    );

    if (state.openDialogList.length > 0) {
      getCurrentDialog().removeListeners();
    }

    this.addListeners();

    state.openDialogList.push(this);

    this.clear();

    this.dialogNode.className = 'fcdo-dialog';

    if (this.focusFirst) {
      this.focusFirst.focus();
    } else {
      focusFirstDescendant(this.dialogNode);
    }

    this.lastFocus = document.activeElement;
  };

  Dialog.prototype.close = function () {
    state.openDialogList.pop();

    this.removeListeners();

    this.preNode && this.preNode.remove();
    this.postNode && this.postNode.remove();

    this.dialogNode.className = 'fcdo-display-none';
    this.backdropNode.classList.remove('fcdo-dialog-backdrop--active');

    if (this.focusAfterClosed) {
      this.focusAfterClosed.focus();
    }

    if (state.openDialogList.length === 0) {
      document.body.classList.remove(state.dialogOpenClass);
    } else {
      getCurrentDialog().addListeners();
    }
  };

  Dialog.prototype.clear = function () {
    var inputs = this.dialogNode.querySelectorAll('input');
    Array.prototype.forEach.call(inputs, function (i) {
      i.value = '';
    });
  };

  Dialog.prototype.addListeners = function () {
    document.addEventListener('focus', this.trapFocus, true);
  };

  Dialog.prototype.removeListeners = function () {
    document.removeEventListener('focus', this.trapFocus, true);
  };

  Dialog.prototype.trapFocus = function (event) {
    if (state.ignoreFocusChanges) return;

    var current = getCurrentDialog();

    if (current.dialogNode.contains(event.target)) {
      current.lastFocus = event.target;
      return;
    }

    focusFirstDescendant(current.dialogNode);

    if (current.lastFocus === document.activeElement) {
      focusLastDescendant(current.dialogNode);
    }

    current.lastFocus = document.activeElement;
  };

  // -----------------------------
  // Event delegation (internal only)
  // -----------------------------

 document.addEventListener('click', function (event) {
  var closeBtn = event.target.closest('[data-dialog-close]');
  if (closeBtn) {
    DialogController.closeCurrent();
    return;
  }

  var openBtn = event.target.closest('[data-dialog-open]');
  if (!openBtn) return;

  var id = openBtn.getAttribute('data-dialog-open');

  DialogController.open(id, openBtn);
});

document.addEventListener('keyup', function (event) {
  if (event.keyCode === KeyCode.ESC) {
    DialogController.closeCurrent();
    event.stopPropagation();
  }
});

  // -----------------------------
  // Single exposed API only
  // -----------------------------

  global.DialogController = {
    open: function (id, focusAfterClosed, focusFirst) {
      var d = new Dialog(id, focusAfterClosed, focusFirst);
      return d;
    },

    closeCurrent: function () {
      var current = getCurrentDialog();
      if (current) current.close();
    },

    getCurrent: function () {
      return getCurrentDialog();
    },
  };
})(window);