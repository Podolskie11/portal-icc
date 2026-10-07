// Service worker: simpan rangka Portal supaya ia dibuka pantas & boleh dipasang sebagai app.
// Naikkan VERSI setiap kali index.html dikemas kini supaya telefon pengguna dapat versi baharu.
const VERSI = 'portal-icc-v3';
const FAIL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSI).then(c => c.addAll(FAIL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSI).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  // Rangkaian dahulu (supaya pautan sentiasa terkini), cache jika luar talian.
  // Halaman utama disemak semula dengan pelayan (abaikan cache HTTP 10 minit GitHub Pages).
  e.respondWith(
    (req.mode === 'navigate' ? fetch(req.url, { cache: 'no-cache' }) : fetch(req))
      .then(res => {
        const salinan = res.clone();
        caches.open(VERSI).then(c => c.put(req, salinan));
        return res;
      })
      .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
  );
});
