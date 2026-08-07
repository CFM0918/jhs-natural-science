// 國中自然科加值教材 - Service Worker
// 策略：app shell 安裝時預先快取；其餘同源資源「訪問過的頁面」在 fetch 時動態快取（cache-first + 背景更新），
// 讓學生在教室網路不穩或無網路時，仍可開啟已瀏覽過的頁面/模擬/圖片繼續使用。
const CACHE_NAME = 'jhs-natsci-v1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './02_加值成品/sims.js',
  './02_加值成品/progress.js',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(APP_SHELL).catch(function() { /* 個別檔案失敗不阻擋安裝 */ });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(names.filter(function(n) { return n !== CACHE_NAME; }).map(function(n) { return caches.delete(n); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  var req = event.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // 只處理同源(Google Fonts等外部資源不攔截)

  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    // 頁面：網路優先(確保內容最新)，離線時退回快取
    event.respondWith(
      fetch(req).then(function(res) {
        var copy = res.clone();
        caches.open(CACHE_NAME).then(function(cache) { cache.put(req, copy); });
        return res;
      }).catch(function() { return caches.match(req).then(function(c) { return c || caches.match('./index.html'); }); })
    );
    return;
  }

  // 其餘資源(圖片/js/xlsx等)：快取優先，背景更新
  event.respondWith(
    caches.match(req).then(function(cached) {
      var fetchPromise = fetch(req).then(function(res) {
        if (res && res.status === 200) {
          var copy = res.clone();
          caches.open(CACHE_NAME).then(function(cache) { cache.put(req, copy); });
        }
        return res;
      }).catch(function() { return cached; });
      return cached || fetchPromise;
    })
  );
});
