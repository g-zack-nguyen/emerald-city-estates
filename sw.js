/*! Emerald City Estates offline copy - made by tools/build/build_pages.js, do not edit */
/*! build 1b6d8b1be4be65c7: 9 files, each checked against its sha256 */
(function eceServiceWorker(BUILD, FILES) {
  'use strict';
  var PREFIX = 'emeraldcityestates-';
  var CACHE = PREFIX + BUILD;
  var MSG_SKIP = 'emeraldcityestates-skip-waiting';
  var MSG_READY = 'emeraldcityestates-update-ready';
  var SCOPE = new URL('./', self.location.href);
  var INDEX = new URL('index.html', SCOPE).href;
  var INDEX_PATH = new URL(INDEX).pathname;

  function hex(buf) {
    var b = new Uint8Array(buf), s = '';
    for (var i = 0; i < b.length; i++) s += (b[i] < 16 ? '0' : '') + b[i].toString(16);
    return s;
  }

  async function fill() {
    var fresh = !(await caches.has(CACHE));
    var cache = await caches.open(CACHE);
    try {
      await Promise.all(FILES.map(async function (entry) {
        var url = new URL(entry[0], SCOPE).href;
        var res = await fetch(new Request(url, { cache: 'reload', credentials: 'same-origin' }));
        if (!res.ok) throw new Error('offline copy: ' + entry[0] + ' answered HTTP ' + res.status);
        var got = hex(await crypto.subtle.digest('SHA-256', await res.clone().arrayBuffer()));
        if (got !== entry[1]) throw new Error('offline copy: ' + entry[0] + ' is not the file of build ' + BUILD);
        if (res.redirected) res = new Response(await res.blob(), { status: res.status, statusText: res.statusText, headers: res.headers });
        await cache.put(url, res);
      }));
    } catch (e) {
      if (fresh) await caches.delete(CACHE);
      throw e;
    }
    if (self.registration && self.registration.active) {
      var pages = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      for (var i = 0; i < pages.length; i++) pages[i].postMessage({ type: MSG_READY, build: BUILD });
    }
  }

  self.addEventListener('install', function (event) {
    event.waitUntil(fill());
  });

  var healing = null;
  var SHA = {};
  for (var f = 0; f < FILES.length; f++) SHA[new URL(FILES[f][0], SCOPE).href] = FILES[f][1];
  function heal() {
    if (healing) return healing;
    healing = (async function () {
      var cache = await caches.open(CACHE);
      var have = {};
      var keys = await cache.keys();
      for (var k = 0; k < keys.length; k++) have[keys[k].url] = true;
      await Promise.all(FILES.map(async function (entry) {
        var url = new URL(entry[0], SCOPE).href;
        if (have[url]) return;
        try {
          var res = await fetch(new Request(url, { cache: 'reload', credentials: 'same-origin' }));
          if (!res.ok) return;
          var got = hex(await crypto.subtle.digest('SHA-256', await res.clone().arrayBuffer()));
          if (got !== entry[1]) return;
          if (res.redirected) res = new Response(await res.blob(), { status: res.status, statusText: res.statusText, headers: res.headers });
          await cache.put(url, res);
        } catch (e) { }
      }));
    })().catch(function () { }).then(function () { healing = null; });
    return healing;
  }

  self.addEventListener('message', function (event) {
    var d = event.data;
    if (d && d.type === MSG_SKIP) self.skipWaiting();
  });

  self.addEventListener('activate', function (event) {
    event.waitUntil(caches.keys().then(function (names) {
      return Promise.all(names.filter(function (n) { return n.indexOf(PREFIX) === 0 && n !== CACHE; })
        .map(function (n) { return caches.delete(n); }));
    }).then(function () { return self.clients.claim(); }));
  });

  self.addEventListener('fetch', function (event) {
    var req = event.request;
    if (req.method !== 'GET' || (req.cache === 'only-if-cached' && req.mode !== 'same-origin')) return;
    var url = new URL(req.url);
    if (url.origin !== SCOPE.origin || url.pathname.indexOf(SCOPE.pathname) !== 0) return;
    var nav = req.mode === 'navigate';
    var page = nav && (url.pathname === SCOPE.pathname || url.pathname === INDEX_PATH);
    var mine = page || Object.prototype.hasOwnProperty.call(SHA, url.origin + url.pathname);
    event.respondWith((async function () {
      var cache = await caches.open(CACHE);
      var hit = page ? await cache.match(INDEX, { ignoreSearch: true, ignoreVary: true }) : await cache.match(req, { ignoreVary: true });
      if (hit) return hit;
      if (mine) { try { event.waitUntil(heal()); } catch (e) { heal(); } }
      try {
        return await fetch(req);
      } catch (e) {
        if (nav && !page && await cache.match(INDEX, { ignoreSearch: true, ignoreVary: true })) return Response.redirect(SCOPE.href, 302);
        throw e;
      }
    })());
  });
})("1b6d8b1be4be65c7", [
  ["apple-touch-icon.png","2af8619f42f2f1123a6affbf045a2f3f44f1aeaa71ea636fccd979ae15908125"],
  ["favicon.png","afd1e2ffb2ced43f21777b2ed1f4bdf250b5126dfc1942b918f5d3a6f1ceaf44"],
  ["game.css","8eb4f2ef85ba22fe779a6dad25cdef1346de8027e06d139a1ba89b53982480f8"],
  ["game.js","8603c2b7c2cd4e2fa7e9415284104a2f6ca467e86ff9105f74f4497e4ca7ae98"],
  ["icon-192.png","872a332a8f032cc886dc36e6eacf91c4f640ddc11774811223b6df58b0a32cfc"],
  ["icon-512.png","f97b78b1bf833a2af70bbbd723098d69cc2fe86671226755534014c7e16277ae"],
  ["icon-maskable-512.png","def84231d3d65377363ef0293652826bd974d7db457c25ea8c6078c0182e4659"],
  ["index.html","a7a1eff079812e89ccf67521f06ab33b41924e1e15aba790afd387a2294dce4e"],
  ["manifest.webmanifest","023598acf61fc4fbc82f87c3703b3b85e082c7fdbc69a7b6b9f2346bcd61bb64"]
]);
