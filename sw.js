const C='hk-v60';
const SHELL=['./','social.js','ui.js','daily.js','biz.js','biz.json','index.html','leaflet.js','leaflet.css','riddles.js','photos.js','stories1.json','stories2.json','en_stories.json','en_riddles.json','en_cards.json'];
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(C);await Promise.all(SHELL.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})));self.skipWaiting()})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==C)await caches.delete(k);await self.clients.claim();try{const cs=await self.clients.matchAll({type:'window'});cs.forEach(c=>{try{c.navigate(c.url)}catch(x){}})}catch(x){}})())});
async function ranged(m,r){const b=await m.blob(),mm=/bytes=(\d*)-(\d*)/.exec(r.headers.get('range')||'');if(!mm)return m;let s=mm[1]===''?0:+mm[1],e=mm[2]===''?b.size-1:Math.min(+mm[2],b.size-1);if(s>e||s>=b.size)return new Response(null,{status:416,headers:{'Content-Range':'bytes */'+b.size}});return new Response(b.slice(s,e+1),{status:206,headers:{'Content-Type':m.headers.get('Content-Type')||'audio/mpeg','Content-Range':`bytes ${s}-${e}/${b.size}`,'Content-Length':String(e-s+1),'Accept-Ranges':'bytes'}})}
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
e.respondWith((async()=>{const c=await caches.open(C);const nav=r.mode==='navigate';const key=nav?'index.html':r.url;const au=u.pathname.includes('/audio/');
 if(!au&&!r.headers.get('range')){try{const n=await Promise.race([fetch(r,{cache:'no-cache'}),new Promise((_,j)=>setTimeout(j,9000))]);if(n&&n.ok&&n.status===200){c.put(key,n.clone());return n}}catch(x){}}
 const m=await c.match(key,{ignoreSearch:nav});if(m){if(r.headers.get('range'))return ranged(m,r);return m}
 try{const n=await fetch(r);if(n.ok&&n.status===200&&!au)c.put(key,n.clone());return n}catch(x){return Response.error()}})())});
