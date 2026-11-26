/* Hekaya Daily Card: one hidden card a day near you, streak, badges, lost-card feeling. Local only (localStorage). */
(function(){
var K='hk_dc',BD=[[3,'مواظب','Steady','flame'],[7,'حكّاي الأسبوع','Weekly teller','star'],[14,'ضيف الحكاية','Story regular','cup'],[30,'حكواتي الشهر','Month teller','crown']];
function ld(){try{return JSON.parse(localStorage.getItem(K))||{}}catch(e){return{}}}
function sv(o){try{localStorage.setItem(K,JSON.stringify(o))}catch(e){}}
function dk(t){var d=new Date(t);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function today(){return dk(Date.now())}
function addD(k,n){var p=k.split('-'),d=new Date(+p[0],+p[1]-1,+p[2]+n);return dk(d)}
function h(s){var x=2166136261;for(var i=0;i<s.length;i++){x^=s.charCodeAt(i);x=Math.imul(x,16777619)}return x>>>0}
function dist(a,b,c,d){var R=6371000,r=Math.PI/180,x=(c-a)*r,y=(d-b)*r,q=Math.sin(x/2)*Math.sin(x/2)+Math.cos(a*r)*Math.cos(c*r)*Math.sin(y/2)*Math.sin(y/2);return 2*R*Math.asin(Math.sqrt(q))}
function pool(){return (S||[]).filter(function(s){return AV(s.n)})}
function pure(k){var P=pool();if(!P.length)return 0;return P[h(k)%P.length].n}
function pick(k){var o=ld();o.picks=o.picks||{};
 if(o.picks[k]&&(o.picks[k].loc||!me||k!==today()))return o.picks[k].n;
 var P=pool();if(!P.length)return 0;var un=P.filter(function(s){return !unlocked.includes(s.n)});if(un.length)P=un;
 var loc=!!(me&&k===today());
 if(loc){P=P.slice().sort(function(a,b){return dist(me.lat,me.lon,a.lat,a.lon)-dist(me.lat,me.lon,b.lat,b.lon)}).slice(0,8)}
 var n=P[h(k)%P.length].n;o.picks[k]={n:n,loc:loc};sv(o);return n}
function sync(){var o=ld();o.picks=o.picks||{};o.done=o.done||{};o.first=o.first||today();
 (EV||[]).forEach(function(e){var k=dk(e.t);var p=o.picks[k];var n=p?p.n:(k<today()&&k>=o.first?pure(k):0);if(n&&e.n==n)o.done[k]=n});sv(o);return o}
function streak(o){var k=today();if(!o.done[k])k=addD(k,-1);var c=0;while(o.done[k]){c++;k=addD(k,-1)}return c}
function best(o,c){var f=ld();f.best=Math.max(f.best||0,c);sv(f);o.best=f.best;return f.best}
function lost(o){var L=[],k=addD(today(),-1);for(var i=0;i<6;i++){if(k<o.first)break;if(!o.done[k]){var p=o.picks[k];L.push({k:k,n:p?p.n:pure(k)})}k=addD(k,-1)}return L}
function left(){var d=new Date(),e=new Date(d.getFullYear(),d.getMonth(),d.getDate()+1),m=Math.floor((e-d)/60000);return Math.floor(m/60)+'|'+(m%60)}
function nm(n){var c=CARDS&&CARDS[n];return c?c.name:''}
function p2(n){return String(n).padStart(2,'0')}
function ic(n){return '<svg class="ic" viewBox="0 0 24 24"><path d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z"/></svg>'}
function render(){
 var e=document.getElementById('hm');if(!e||document.getElementById('dc'))return;var pl=e.querySelector('.pl');if(!pl||!S||!S.length)return;
 var A=ar||String,k=today(),n=pick(k),o=sync();if(!n)return;var s=S.find(function(x){return x.n==n}),got=!!o.done[k],st=streak(o),b=best(o,st),L=lost(o);
 var d=me&&s?Math.round(dist(me.lat,me.lon,s.lat,s.lon)):null,ds=d==null?(EN?'Turn on location to see how far it is':'شغّل اللوكيشن علشان تعرف المسافة'):(d<1000?A(Math.round(d/10)*10)+(EN?' m away':' متر منك'):A((d/1000).toFixed(1))+(EN?' km away':' كم منك')),t=left().split('|');
 var nb=BD.filter(function(x){return st>=x[0]}).length,nx=BD.find(function(x){return st<x[0]});
 var html='<div id="dc" class="dc'+(got?' got':'')+'"><div class="dch"><b>'+(EN?'Daily card':'كارت النهارده')+'</b><span class="dcs">'+ic()+' '+A(st)+' '+(EN?'day streak':'يوم ورا بعض')+'</span></div>'+
 '<div class="dcb"><div class="dcc"><div class="dcbg" style="background-image:url(cardimg/bg'+p2(n)+'.webp)"></div><img class="dcim" alt="" src="cardimg/ch'+p2(n)+'.webp">'+(got?'':'<div class="dclk"><svg class="ic" viewBox="0 0 24 24"><path d="M5 11h14v10H5zM8 11V8a4 4 0 0 1 8 0v3"/></svg></div>')+'</div>'+
 '<div class="dct"><h4>'+(got?nm(n):(EN?'A hidden card':'كارت مخفي'))+'</h4><p>'+(got?(EN?'Collected today. See you tomorrow.':'جمعته النهارده. نشوفك بكرة بكارت جديد.'):(EN?'Somewhere near you. Go to the place and open its story to collect it.':'في مكان قريب منك. روح المكان وافتح حكايته علشان تجمعه.'))+'</p>'+
 (got?'':'<small>'+ds+'</small><small>'+(EN?'Ends in ':'بيروح بعد ')+A(t[0])+(EN?'h ':' س ')+A(t[1])+(EN?'m':' د')+'</small><button class="dcg" onclick="Daily.go()">'+(EN?'Show on map':'وريني على الخريطة')+'</button>')+'</div></div>'+
 '<div class="dcbd">'+BD.map(function(x,i){return '<span class="'+(st>=x[0]||b>=x[0]?'on':'')+'" title="'+x[0]+'">'+ic()+(EN?x[2]:x[1])+' · '+A(x[0])+'</span>'}).join('')+'</div>'+
 (nx&&!got?'<div class="dcn">'+(EN?A(nx[0]-st)+' day(s) to the "'+nx[2]+'" badge':'فاضل '+A(nx[0]-st)+' يوم على شارة «'+nx[1]+'»')+'</div>':'')+
 (L.length?'<div class="dcl"><b>'+(EN?'Lost cards':'كروت فاتتك')+'</b><div>'+L.map(function(x){return '<span class="dcx"><img alt="" src="cardimg/ch'+p2(x.n)+'.webp"><i>'+(EN?'Lost':'فاتك')+'</i></span>'}).join('')+'</div></div>':'')+'</div>';
 pl.insertAdjacentHTML('afterend',html);if(window.HkIc)HkIc(document.getElementById('dc'))}
function go(){var k=today(),n=pick(k),s=S.find(function(x){return x.n==n});if(!s)return;tbGo('map');setTimeout(function(){map.flyTo([s.lat,s.lon],15)},200)}
function toast(msg,sub){if(document.getElementById('dtoast'))return;var d=document.createElement('div');d.id='dtoast';d.className='sc-mnt dt';d.innerHTML='<b>★</b> '+msg+(sub?'<small>'+sub+'</small>':'');d.onclick=function(){d.remove();window.tbGo&&tbGo('home')};document.body.appendChild(d);setTimeout(function(){d.remove()},9000)}
function prompt_(){var k=today(),n0=pick(k),o=sync();if(typeof S==='undefined'||!S.length||o.seenP===k)return;var n=n0;if(!n)return;o.seenP=k;sv(o);
 var L=lost(o),y=addD(k,-1);
 if(o.done[k])return;
 if(L.length&&L[0].k===y&&(o.best||0)>=2&&!o.lostMsg){}
 if(L.length&&L[0].k===y&&o.seenL!==k){o.seenL=k;sv(o);toast(EN?'You missed yesterday\'s card':'فاتك كارت امبارح','«'+nm(L[0].n)+'» '+(EN?'is gone. Today\'s is waiting.':'راح. كارت النهارده مستنيك.'))}
 else toast(EN?'Today\'s hidden card is waiting':'كارت النهارده مستنيك',EN?'Find it near you':'دوّر عليه قريب منك');
 try{if(window.Notification&&Notification.permission==='granted'&&document.hidden)new Notification('حكاية',{body:EN?'Today\'s hidden card is waiting':'كارت النهارده مستنيك'})}catch(e){}}
function ask(){try{if(window.Notification&&Notification.permission==='default')Notification.requestPermission()}catch(e){}}
var st=document.createElement('style');st.textContent=`
.dc{margin:14px 0;background:linear-gradient(160deg,#10274d,#0c1c38);border:1px solid #2fb6a055;border-radius:20px;padding:14px;box-shadow:0 8px 24px #0005;animation:hkfade .4s ease both}
.dch{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}.dch b{color:#f2e3b3;font-size:16px;font-weight:800}
.dcs{background:#e0652a22;color:#f7bf3a;border:1px solid #e0652a66;border-radius:999px;padding:3px 10px;font-size:12px;font-weight:800}.dcs svg{color:#e0652a;fill:#e0652a55}
.dcb{display:flex;gap:12px;align-items:stretch}.dct{flex:1;min-width:0;display:flex;flex-direction:column;gap:4px}.dct h4{margin:0;font-size:17px;color:#fbefd0}.dct p{margin:0;font-size:13px;color:#b9c8de;line-height:1.5}.dct small{color:#7fe0d4;font-size:12px}
.dcc{position:relative;flex:none;width:104px;height:140px;border-radius:14px;overflow:hidden;border:2px solid #e2b44c;background:#0b1a33}.dcbg{position:absolute;inset:0;background-size:cover;background-position:center;filter:saturate(.8) brightness(.55) blur(2px)}.dcim{position:absolute;left:0;right:0;bottom:0;width:100%;height:100%;object-fit:contain;object-position:bottom}
.dc:not(.got) .dcim{filter:brightness(0) blur(1px);opacity:.75}.dc:not(.got) .dcbg{filter:blur(6px) brightness(.4)}.dc.got .dcbg{filter:none}.dc.got .dcc{box-shadow:0 0 22px #f7bf3a77}
.dclk{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#f7bf3a}.dclk svg{width:34px;height:34px;filter:drop-shadow(0 2px 6px #000a)}
.dcg{align-self:flex-start;margin-top:4px;background:linear-gradient(90deg,#2fb6a0,#7fe0d4);color:#07222a;border:0;border-radius:12px;padding:8px 14px;font-weight:800;font-size:13px;font-family:inherit}
.dcbd{display:flex;gap:6px;flex-wrap:wrap;margin-top:12px}.dcbd span{font-size:11px;font-weight:700;padding:4px 9px;border-radius:999px;background:#ffffff0d;color:#7f93b3;border:1px solid #ffffff14}.dcbd span.on{background:#e2b44c22;color:#f7bf3a;border-color:#e2b44c88}
.dcn{margin-top:8px;font-size:12px;color:#9fb4d0}.dcl{margin-top:12px;border-top:1px dashed #ffffff22;padding-top:10px}.dcl b{font-size:12px;color:#e08a7a}.dcl>div{display:flex;gap:8px;margin-top:8px}
.dcx{position:relative;width:46px;height:62px;border-radius:8px;overflow:hidden;background:#0b1a33;border:1px solid #ffffff22}.dcx img{width:100%;height:100%;object-fit:contain;filter:grayscale(1) brightness(.35)}.dcx i{position:absolute;inset:auto 0 3px;text-align:center;font-style:normal;font-size:10px;color:#e08a7a;font-weight:800}
.dt small{display:block;font-weight:500;opacity:.9;margin-top:3px}`;document.head.appendChild(st);
window.Daily={go:go,ask:ask,render:render,sync:sync,prompt:prompt_};
setInterval(function(){var e=document.getElementById('hm');if(!e||!e.classList.contains('on'))return;var d=document.getElementById('dc');if(d){var g=!!sync().done[today()];if(g!==d.classList.contains('got')){d.remove();render()}}else render()},500);
var oe=window.evAdd;if(oe)window.evAdd=function(){var r=oe.apply(this,arguments);sync();var d=document.getElementById('dc');if(d){d.remove();render()}return r};
setTimeout(function(){render();prompt_()},2500);
})();
