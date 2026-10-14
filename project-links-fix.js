/* GitHub Pages one-click project navigation. Keep Framer visual effects intact. */
(function () {
  'use strict';
  var lastTouch = 0;
  function targetLink(event) {
    var path = typeof event.composedPath === 'function' ? event.composedPath() : [];
    for (var i = 0; i < path.length; i++) {
      var node = path[i];
      if (node && node.nodeType === 1 && node.matches && node.matches('a[href]')) return node;
    }
    return event.target && event.target.closest ? event.target.closest('a[href]') : null;
  }
  function navigate(event) {
    if (event.defaultPrevented && event.type !== 'pointerdown') return;
    if (event.button !== undefined && event.button !== 0) return;
    if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
    if (event.type === 'pointerdown' && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    if (event.type === 'click' && Date.now() - lastTouch < 450) return;
    var a = targetLink(event);
    if (!a || a.hasAttribute('download') || (a.target && a.target !== '_self')) return;
    var url;
    try { url = new URL(a.getAttribute('href'), document.baseURI); } catch (_) { return; }
    if (url.origin !== location.origin || !/\.html$/i.test(url.pathname)) return;
    if (url.href === location.href) return;
    // Only override project links; leave contact forms, menus and anchor scrolling alone.
    if (!/\/projects\/[^/]+\.html$/i.test(url.pathname)) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    window.location.assign(url.href);
  }
  // Capture before Framer's React click handlers; pointerdown also handles cards
  // whose first click is swallowed by animated hover/transition layers.
  window.addEventListener('pointerdown', navigate, true);
  window.addEventListener('click', navigate, true);
})();
