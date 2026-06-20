const CACHE='bci-hub-v1.0.1';
const ASSETS=['/','/index.html','/css/style.css','/js/chapters.js','/js/glossary.js','/js/hardware.js','/js/projects.js','/js/app.js','/glossary.html','/overview.html','/hardware.html','/projects.html','/manifest.json'];

self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(CACHE).then(cache=>
      Promise.allSettled(ASSETS.map(url=>
        cache.add(url).catch(err=>{
          console.warn('SW: failed to cache',url,err);
        })
      ))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(keys=>
      Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch',e=>{
  e.respondWith(
    caches.match(e.request).then(cached=>{
      if(cached) return cached;
      return fetch(e.request).then(res=>{
        if(res.ok){
          const clone=res.clone();
          caches.open(CACHE).then(c=>c.put(e.request,clone));
        }
        return res;
      }).catch(()=>{
        if(e.request.mode==='navigate'){
          return caches.match('/index.html');
        }
        return caches.match('/index.html');
      });
    })
  );
});
