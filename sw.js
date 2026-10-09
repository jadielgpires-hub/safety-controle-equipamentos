const CACHE='safety-controle-equipamentos-v1.0.2';
const ASSETS=['./','./index.html','./styles.css','./app.js','./firebase-config.js','./manifest.webmanifest','./assets/logo-safety-equipamentos.jpeg','./assets/icon-192.png','./assets/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{const clone=r.clone();caches.open(CACHE).then(c=>c.put(e.request,clone)).catch(()=>{});return r}).catch(()=>caches.match(e.request)));
});
