/* GitHub Pages: use browser navigation instead of Framer SPA routing. */
(function () {
  'use strict';
  function onNavigate(event) {
    if (event.type !== 'click' || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    var path = typeof event.composedPath === 'function' ? event.composedPath() : [];
    var link = path.find(function(node){return node && node.tagName === 'A' && node.hasAttribute('href');});
    if (!link && event.target && event.target.closest) link = event.target.closest('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    var address;
    try { address = new URL(link.getAttribute('href'), document.baseURI); } catch (_) { return; }
    if (address.origin !== location.origin || !(/\.html$/i.test(address.pathname) || address.pathname.endsWith('/'))) return;
    // Run at WINDOW capture phase, ahead of Framer's document/root handlers.
    // Never wait for the Framer route transition (which can swallow the first click).
    event.preventDefault();
    event.stopImmediatePropagation();
    if (address.href === location.href) return;
    if (address.pathname === location.pathname && address.search === location.search && address.hash) {
      history.pushState(null, '', address.href);
      document.getElementById(decodeURIComponent(address.hash.slice(1)))?.scrollIntoView({behavior:'smooth'});
      return;
    }
    location.assign(address.href);
  }
  window.addEventListener('click', onNavigate, true);
  window.addEventListener('pageshow', function(event){
    if (event.persisted) document.querySelectorAll('img[loading="lazy"]').forEach(function(img){if (img.complete && !img.naturalWidth) img.loading='eager';});
  });
  document.addEventListener('submit', function(event){
    var form=event.target;
    if (form.matches && form.matches('form[data-contact-form]')) {
      form.action='https://formspree.io/f/mqpeygld'; form.method='POST';
    }
  }, true);
})();
