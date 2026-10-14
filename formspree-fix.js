/* GitHub Pages contact form: intercept Framer handlers without changing the design. */
(function () {
  'use strict';
  var ENDPOINT = 'https://formspree.io/f/mqpeygld';
  var pending = new WeakSet();

  function statusElement(form) {
    var element = form.querySelector('.github-form-status');
    if (!element) {
      element = document.createElement('p');
      element.className = 'github-form-status';
      element.setAttribute('role', 'status');
      element.setAttribute('aria-live', 'polite');
      element.style.cssText = 'margin:14px 0 0;font-size:14px;line-height:1.5;';
      form.appendChild(element);
    }
    return element;
  }

  async function send(form) {
    if (pending.has(form) || !form.reportValidity()) return;
    pending.add(form);
    var button = form.querySelector('button[type="submit"],input[type="submit"]');
    var status = statusElement(form);
    if (button) { button.disabled = true; button.setAttribute('aria-busy', 'true'); }
    status.textContent = 'Sending your message…';
    status.style.color = 'inherit';
    try {
      var data = new FormData(form);
      // Formspree uses 'email' as the reply-to address.
      var email = data.get('Email');
      if (email && !data.has('email')) data.append('email', email);
      var response = await fetch(ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) {
        var detail = '';
        try { var result = await response.json(); detail = (result.errors || []).map(function(e){return e.message;}).filter(Boolean).join(' '); } catch (_) {}
        throw new Error(detail || 'Formspree HTTP ' + response.status);
      }
      status.textContent = 'Thank you! Your message has been sent successfully.';
      status.style.color = '#20804a';
      form.reset();
    } catch (error) {
      console.error('Formspree submission error:', error);
      status.textContent = 'Your message could not be sent. Please try again. ' + (error.message || '');
      status.style.color = '#d12245';
    } finally {
      pending.delete(form);
      if (button) { button.disabled = false; button.removeAttribute('aria-busy'); }
    }
  }

  // Register at window capture phase before Framer hydrates the page.
  window.addEventListener('click', function (event) {
    if (event.defaultPrevented || event.button !== 0) return;
    var button = event.target && event.target.closest && event.target.closest('button[type="submit"],input[type="submit"]');
    var form = button && button.form;
    if (!form || !form.matches('form[data-contact-form]')) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    send(form);
  }, true);

  window.addEventListener('submit', function (event) {
    var form = event.target;
    if (!form || !form.matches || !form.matches('form[data-contact-form]')) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    send(form);
  }, true);
})();
