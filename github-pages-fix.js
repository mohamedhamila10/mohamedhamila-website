/* GitHub Pages compatibility: preserve Framer styling and animation assets. */
(function(){
 const isLocal=(url)=>url.origin===location.origin && /(?:\.html|\/$)/i.test(url.pathname);
 document.addEventListener('click',function(e){
  const a=e.target.closest?.('a[href]');
  if(!a || e.defaultPrevented || e.button!==0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.hasAttribute('download') || (a.target && a.target!=='_self')) return;
  let u;try{u=new URL(a.getAttribute('href'),document.baseURI)}catch{return}
  if(!isLocal(u))return;
  // Framer's SPA router expects the original hosted site's routing. Use normal
  // document navigation instead, ensuring every static page re-initializes.
  e.preventDefault();e.stopImmediatePropagation();
  if(u.href===location.href){if(u.hash){document.getElementById(decodeURIComponent(u.hash.slice(1)))?.scrollIntoView({behavior:'smooth'})}return}
  location.assign(u.href);
 },true);
 // Framer scroll effects sometimes leave a page partially invisible after back navigation.
 window.addEventListener('pageshow',function(e){if(e.persisted)document.querySelectorAll('img[loading="lazy"]').forEach(i=>{if(i.complete&&i.naturalWidth===0)i.loading='eager'})});
 document.addEventListener('submit',function(e){
  const f=e.target;if(!f.matches?.('form[data-contact-form]'))return;
  f.action='https://formspree.io/f/mqpeygld';f.method='POST';
 },true);
})();