/* BIRD 2026–2035 · Shared site chrome behaviour.
   The menu is a native <details>, so it works without JavaScript; this only
   adds closing on Escape, outside click and link click, and locks page scroll
   while the full-screen mobile menu is open. */
(function () {
  'use strict';
  var menus = document.querySelectorAll('details.bc-menu');
  if (!menus.length) return;
  var mq = window.matchMedia('(min-width: 1100px)');

  function lock(on) {
    var full = !mq.matches || document.querySelector('.bc-embedded details.bc-menu[open]');
    document.documentElement.style.overflow = on && full ? 'hidden' : '';
  }
  function closeAll(except) {
    menus.forEach(function (d) { if (d !== except && d.open) d.open = false; });
  }

  menus.forEach(function (d) {
    var summary = d.querySelector('summary');
    d.addEventListener('toggle', function () {
      if (d.open) closeAll(d);
      summary.setAttribute('aria-expanded', String(d.open));
      lock(d.open);
    });
    d.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { d.open = false; });
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    menus.forEach(function (d) {
      if (d.open) { d.open = false; d.querySelector('summary').focus(); }
    });
  });
  document.addEventListener('click', function (e) {
    menus.forEach(function (d) { if (d.open && !d.contains(e.target)) d.open = false; });
  });
  mq.addEventListener && mq.addEventListener('change', function () {
    lock(Array.prototype.some.call(menus, function (d) { return d.open; }));
  });

  // Embedded mode: open the panel just below whatever bar hosts the menu.
  var host = document.querySelector('.bc-embedded');
  if (host) {
    var bar = host.closest('header, .topbar, .top, .bar') || host.parentElement;
    var setTop = function () {
      document.documentElement.style.setProperty('--bc-embed-top', Math.round(bar.getBoundingClientRect().bottom) + 'px');
    };
    setTop();
    window.addEventListener('resize', setTop, { passive: true });
    window.addEventListener('scroll', setTop, { passive: true });
  }
})();
