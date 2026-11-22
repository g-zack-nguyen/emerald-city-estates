/*! Emerald City Estates offline copy - made by tools/build/build_pages.js, do not edit */
/*! build 44e827e818ace394: 9 files, each checked against its sha256 */
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
})("44e827e818ace394", [
  ["apple-touch-icon.png","b0c13fb5a7a82426834ad1c02300f25f096b1e48bfc2b48b887a89df78d37c94"],
  ["favicon.png","92e54593d2bc300e509c98bbbd11548c1da90f339ffa630ab21ba1b33caa8c86"],
  ["game.css","4f3262b9e83585ed3b89e07991d247672c7bf3452d4d90baf9fbd150e360e79b"],
  ["game.js","d29878f0c4b2022fd5e6758a84200bc36c1f0800ff5c120a2c704d0307554b91"],
  ["icon-192.png","f21f5c9e8c438a9592f3375365bf16048b8828b4bb596bd87bd78473112c1751"],
  ["icon-512.png","10ab7b508e393e6af47e61981e37ace4f44efd9236968d60348c57aa6aca691a"],
  ["icon-maskable-512.png","6bf1f8eb367f0ca304e5d41da751a7b7b3b06fe94ab6de179e18168309ef4148"],
  ["index.html","d6f87d9d123110325b74eddfa713a84120a0c02f8b59a9b78b6db47a973f538d"],
  ["manifest.webmanifest","6f71010eed820062f9d975ba2846a11c59b4bc282c03dea5ef4615d9c0527f5a"]
]);
