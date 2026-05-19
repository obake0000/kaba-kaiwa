// 最小限のService Worker — PWA インストール可能化のため
const CACHE_NAME = 'kaba-v1';
const ESSENTIAL = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ESSENTIAL).catch(()=>{})));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', e => {
  // ネットワーク優先、失敗時キャッシュ
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
