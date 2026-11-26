/* Hekaya inline SVG icon layer: swaps UI emoji/glyphs for crisp icons (original line icons, free). */
(function(){
var P={
home:'M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z',
map:'M9 4L3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14',
feed:'M4 4h13a1 1 0 0 1 1 1v14a2 2 0 0 0 2 2H6a2 2 0 0 1-2-2zM8 8h6M8 12h6M8 16h4M18 9h2v10',
chat:'M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-5.6A8 8 0 1 1 21 12z',
user:'M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM4 21a8 8 0 0 1 16 0',
users:'M9 4.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM2 20a7 7 0 0 1 14 0M17 6.5a2.5 2.5 0 1 1 0 5M18 14a5 5 0 0 1 4 5',
cam:'M4 8h3l2-3h6l2 3h3v11H4zM12 10a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z',
pin:'M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11zM12 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z',
lock:'M5 11h14v10H5zM8 11V8a4 4 0 0 1 8 0v3',
check:'M5 12.5l4.5 4.5L19 7.5',
flame:'M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z',
star:'M12 3l2.8 5.8 6.2.9-4.5 4.4 1 6.2-5.5-3-5.5 3 1-6.2L3 9.7l6.2-.9z',
cup:'M8 4h8v6a4 4 0 0 1-8 0zM8 6H4v2a3 3 0 0 0 4 3M16 6h4v2a3 3 0 0 1-4 3M12 14v4M8 21h8M10 18h4',
compass:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM15.5 8.5l-2 5-5 2 2-5z',
trash:'M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14',
search:'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4',
x:'M6 6l12 12M18 6L6 18',
send:'M3 11l18-8-8 18-2-8z',
pen:'M4 20l4-1 11-11-3-3L5 16z',
book:'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 5v16',
menu:'M4 7h16M4 12h16M4 17h16',
ban:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM5.6 5.6l12.8 12.8',
eye:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
heart:'M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z',
music:'M9 18V5l11-2v13M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
anchor:'M12 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM12 7v14M5 12H3a9 9 0 0 0 18 0h-2M8 11h8',
flag:'M5 21V4M5 4h11l-2 4 2 4H5',
puzzle:'M10 4a2 2 0 1 1 4 0v2h4v4h-2a2 2 0 1 0 0 4h2v4H4V6h6z',
spark:'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z',
bell:'M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4',
warn:'M12 3l10 18H2zM12 10v5M12 18v.5',
down:'M12 4v12M6 11l6 6 6-6M5 20h14',
pause:'M8 5v14M16 5v14',cards:'M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM12 9l1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.3-2.4 1.3.5-2.6-1.9-1.8 2.6-.4z',mic:'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3',play:'M7 4l13 8-13 8z',bag:'M5 8h14l1 13H4zM9 8V6a3 3 0 0 1 6 0v2',gear:'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2',ship:'M3 17l2 4h14l2-4zM6 17v-7h12v7M12 10V4M9 6h6',crown:'M3 8l4 4 5-7 5 7 4-4-2 11H5zM5 21h14',moon:'M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10z'
};
var M={'🏠':'home','🗺':'map','📰':'feed','💬':'chat','👤':'user','👥':'users','📷':'cam','📍':'pin','🔒':'lock','✓':'check','✅':'check','🔥':'flame','⭐':'star','🏅':'cup','🏆':'cup','🧭':'compass','🗑':'trash','🔎':'search','✕':'x','❌':'x','✖':'x','➤':'send','✏️':'pen','✏':'pen','📜':'book','☰':'menu','🚫':'ban','👁':'eye','♥':'heart','♡':'heart','🎵':'music','⚓':'anchor','⚑':'flag','🧩':'puzzle','✨':'spark','📣':'bell','⚠':'warn','⬇':'down','❚':'pause','🃏':'cards','🎤':'mic','▶':'play','🧳':'user','🚢':'ship','👑':'crown','⚙':'gear','🧪':'gear','🌙':'moon','👨‍👩‍👧':'users','👨':'user','👩':'user','👧':'user','🏛':'cup','🕊':'spark','🗼':'flag','⛴':'ship','🌅':'moon','🎉':'spark','👻':'user','🌳':'flag','🚶':'user','📱':'cam','🔄':'spark','🙂':'user','🌊':'anchor','🐚':'anchor','☕':'cup'};
var F={'♥':1,'⭐':1,'▶':1};
var keys=Object.keys(M).sort(function(a,b){return b.length-a.length}).map(function(k){return k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')});
var RE=new RegExp('('+keys.join('|')+')\uFE0F?','g');
function svg(k){var n=M[k];return '<svg class="ic'+(F[k]?' f':'')+'" viewBox="0 0 24 24" aria-hidden="true"><path d="'+P[n]+'"/></svg>'}
var SKIP={TEXTAREA:1,INPUT:1,OPTION:1,SCRIPT:1,STYLE:1,TITLE:1,SELECT:1};
function fix(t){
 var p=t.parentNode;if(!p||SKIP[p.nodeName]||(p.isContentEditable))return;
 var s=t.nodeValue;if(!s||s.length>400)return;RE.lastIndex=0;if(!RE.test(s))return;
 var h=s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(RE,function(m,g){return svg(g)});
 var sp=document.createElement('span');sp.className='icw';sp.innerHTML=h;p.replaceChild(sp,t)}
function scan(r){
 if(r.nodeType==3){fix(r);return}
 if(r.nodeType!=1||SKIP[r.nodeName])return;
 var w=document.createTreeWalker(r,4,null),a=[],n;while(n=w.nextNode())a.push(n);a.forEach(fix)}
var st=document.createElement('style');
st.textContent='svg.ic{width:1.15em;height:1.15em;vertical-align:-.2em;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round;flex:none}svg.ic.f{fill:currentColor}.icw{display:inline}#tb button span svg.ic{width:24px;height:24px;stroke-width:1.7}#tb button.on span svg.ic{stroke-width:2.1;fill:#e2b44c22}button,.btn,[onclick]{-webkit-tap-highlight-color:transparent}button:active:not(:disabled){transform:scale(.97)}button{transition:transform .12s,background .18s,opacity .18s}';
document.head.appendChild(st);
var busy=false;
new MutationObserver(function(ms){if(busy)return;busy=true;ms.forEach(function(m){m.addedNodes.forEach(scan);if(m.type=='characterData')fix(m.target)});busy=false}).observe(document.documentElement,{childList:true,subtree:true,characterData:true});
scan(document.body);
window.HkIc=scan;
})();
/* UI sounds: synthesized with WebAudio, no audio files. Off by default. */
(function(){
var C=null,scan=window.HkIc||function(){};function ctx(){if(!C){var A=window.AudioContext||window.webkitAudioContext;if(!A)return null;C=new A()}if(C.state=='suspended')C.resume();return C}
function on(){return localStorage.getItem('hk_snd')==='1'}
function tone(f,t0,d,v,ty){var c=ctx();if(!c)return;var o=c.createOscillator(),g=c.createGain();o.type=ty||'sine';o.frequency.value=f;var T=c.currentTime+t0;g.gain.setValueAtTime(0,T);g.gain.linearRampToValueAtTime(v,T+.01);g.gain.exponentialRampToValueAtTime(.0001,T+d);o.connect(g);g.connect(c.destination);o.start(T);o.stop(T+d+.02)}
var S={tick:function(){tone(880,0,.05,.05)},tab:function(){tone(520,0,.07,.06);tone(780,.05,.08,.05)},chime:function(){[523,659,784,1047].forEach(function(f,i){tone(f,i*.09,.35,.09,'triangle')})},ok:function(){tone(660,0,.1,.07);tone(990,.08,.18,.07)}};
function play(k){if(on()&&S[k])try{S[k]()}catch(e){}}
function lab(){var b=document.getElementById('sndb');if(!b)return;var t=(window.EN?(on()?'Sounds: on':'Sounds: off'):(on()?'الأصوات: شغالة':'الأصوات: مقفولة')),k=(on()?'on':'off')+t;if(b.dataset.s===k)return;b.dataset.s=k;b.innerHTML=(on()?'🎵 ':'🔇 ')+t;scan(b)}
window.Snd={play:play,tog:function(){localStorage.setItem('hk_snd',on()?'0':'1');lab();play('ok')},lab:lab};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('button,.city,.sd');if(b)play(b.closest('#tb')?'tab':'tick')},true);
var w=window.showCard;if(typeof w=='function')window.showCard=function(n,f){if(f)play('chime');return w.apply(this,arguments)};
new MutationObserver(lab).observe(document.body,{childList:true,subtree:true});
})();
/* Polish layer: palette (gold/cream/teal), hierarchy, motion, tap states. */
(function(){var st=document.createElement('style');st.id='polish';st.textContent=`
#tb{box-shadow:0 -8px 28px #0006;padding-left:max(6px,env(safe-area-inset-left));padding-right:max(6px,env(safe-area-inset-right))}
#tb button{position:relative;letter-spacing:.2px}
#tb button.on::after{content:'';position:absolute;bottom:2px;width:16px;height:3px;border-radius:3px;background:linear-gradient(90deg,#2fb6a0,#7fe0d4)}
#hm .city,#hm .sd,#hm .pl{box-shadow:0 6px 18px #0004;transition:transform .15s ease,box-shadow .2s ease,border-color .2s}
#hm .city:active,#hm .sd:active{transform:scale(.985)}
#hm .city:not(.soon){border:1px solid #2fb6a055}
#hm h3{letter-spacing:.2px;font-weight:800;color:#f2e3b3}
#hm .hd b{font-weight:800;letter-spacing:.3px}
.pb i,.sc-sr.new{filter:saturate(1.1)}
.sc-card,.card,.box{box-shadow:0 8px 24px #0004}
.sc-sbi small,#tb button{font-feature-settings:'kern'}
.sc-sbi{transition:transform .15s}.sc-sbi:active{transform:scale(.94)}
.sc-sr{transition:transform .2s}.sc-sr.new{box-shadow:0 0 0 2px #2fb6a033}
button.o,button.sec{border-color:#2fb6a0aa;color:#7fe0d4}
@keyframes hkfade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
#hm.on>*,.sc-card,.sc-po{animation:hkfade .35s ease both}
input,textarea{font-size:16px}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
`;document.head.appendChild(st)})();

/* Version badge + stale-cache self heal */
(function(){var V='v61';window.HKV=V;
function lab(){var e=document.getElementById('hm');if(!e||!e.classList.contains('on'))return;var hd=e.querySelector('.hd');if(hd&&!hd.querySelector('.hv')){var s=document.createElement('small');s.className='hv';s.textContent=V;hd.querySelector('b').appendChild(s)}if(!document.getElementById('hkv')){var d=document.createElement('div');d.id='hkv';d.textContent='حكاية '+V;e.appendChild(d)}}
var st=document.createElement('style');st.textContent='#hm .hd .hv{color:#6f86aa;font-size:10px;margin-inline-start:6px;font-weight:600}#hkv{text-align:center;color:#6f86aa;font-size:11px;padding:14px 0 90px;letter-spacing:.4px}';document.head.appendChild(st);
setInterval(lab,1500);
try{fetch('sw.js',{cache:'no-store'}).then(function(r){return r.text()}).then(function(t){var m=/const C='(hk-v\d+)'/.exec(t);if(!m)return;var live=m[1].replace('hk-','');if(live!==V&&!sessionStorage.getItem('hk_rl')){sessionStorage.setItem('hk_rl','1');(navigator.serviceWorker&&navigator.serviceWorker.getRegistrations?navigator.serviceWorker.getRegistrations():Promise.resolve([])).then(function(rs){return Promise.all(rs.map(function(r){return r.unregister()}))}).then(function(){return window.caches?caches.keys().then(function(ks){return Promise.all(ks.map(function(k){return caches.delete(k)}))}):0}).then(function(){location.reload()})}}).catch(function(){})}catch(e){}
})();
