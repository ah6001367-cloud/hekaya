/* Hekaya social layer: accounts, friends, chat, friends-only location, leaderboard, place suggestions.
   Firebase is loaded lazily from the CDN. If it cannot load (offline), the rest of the app is unaffected. */
const Soc=(()=>{
const CFG={apiKey:"AIzaSyCCHIO-bY1zgpt39XSXOXSOkpEzTXiv2OI",authDomain:"hekaya-122d3.firebaseapp.com",projectId:"hekaya-122d3",storageBucket:"hekaya-122d3.firebasestorage.app",messagingSenderId:"835981529763"};
const V='10.12.2',BASE='https://www.gstatic.com/firebasejs/'+V+'/';
const EMU=location.hostname==='localhost'&&new URLSearchParams(location.search).get('emu')==='1';
const t=(a,e)=>EN?e:a;

(function(){const c=document.createElement('style');c.textContent=`
.sc-hero{text-align:center;padding:14px 0 6px}.sc-logo{width:76px;height:76px;border-radius:24px;background:linear-gradient(135deg,#f1cf7a,#c28a2b);display:flex;align-items:center;justify-content:center;font-size:40px;margin:0 auto 10px;box-shadow:0 10px 28px #0007}
.sc-h{font-size:24px;font-weight:800;color:#f4e9c8;margin:4px 0}.sc-sub{color:#9fb4d0;font-size:14px;margin:0 8px}
.sc-card{background:#0e2142;border:1px solid #1c3a6b;border-radius:20px;padding:16px;margin:14px 0}
.sc-seg{display:flex;background:#0b1a33;border-radius:14px;padding:4px;margin-bottom:10px}.sc-seg button{flex:1;margin:0;background:transparent;color:#9fb4d0;border-radius:11px;min-height:40px;padding:8px}.sc-seg button.on{background:#e2b44c;color:#0b2a52}
.sc-f{position:relative;margin:12px 0 4px}.sc-f label{display:block;font-size:13px;color:#9fb4d0;margin:0 4px 5px}
.sc-f input,.sc-f textarea{width:100%;box-sizing:border-box;font:inherit;font-size:16px;padding:13px 44px;border-radius:14px;border:1.5px solid #2a4a80;background:#0b1a33;color:#f4e9c8;margin:0}
.sc-f input:focus,.sc-f textarea:focus{border-color:#e2b44c;box-shadow:0 0 0 3px #e2b44c33;outline:none}.sc-f input.bad{border-color:#ff8a8a}
.sc-i{position:absolute;inset-inline-start:14px;bottom:13px;font-size:18px;opacity:.8}.sc-eye{position:absolute;inset-inline-end:6px;bottom:3px;width:40px;min-height:38px;padding:0;background:transparent;color:#9fb4d0;font-size:18px;flex:none}
.sc-e{color:#ff9b9b;font-size:13px;min-height:18px;margin:2px 6px 0}
.sc-btn{width:100%;margin-top:10px;position:relative}.sc-btn.ld{opacity:.75;pointer-events:none}.sc-btn.ld::after{content:'';display:inline-block;width:14px;height:14px;border:2px solid #0b2a52;border-top-color:transparent;border-radius:50%;margin-inline-start:8px;vertical-align:-2px;animation:sp .7s linear infinite}@keyframes sp{to{transform:rotate(360deg)}}
.sc-link{background:transparent;color:#e2b44c;text-decoration:underline;min-height:36px;font-weight:600}
.sc-cov{height:96px;border-radius:20px 20px 0 0;margin:-16px -16px 0}.sc-av{width:84px;height:84px;border-radius:50%;background:#0b1a33;border:4px solid #0e2142;display:flex;align-items:center;justify-content:center;font-size:42px;margin:-42px auto 6px;position:relative}
.sc-st{display:flex;gap:6px;margin:12px 0}.sc-st div{flex:1;text-align:center;background:#0b1a33;border-radius:14px;padding:8px 2px}.sc-st b{display:block;font-size:19px;color:#e2b44c}.sc-st small{font-size:11px;color:#9fb4d0}
.sc-chips{display:flex;flex-wrap:wrap;gap:6px}.sc-chips span{background:#0b1a33;border:1px solid #2a4a80;border-radius:20px;padding:5px 10px;font-size:12px}
.sc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:4px}.sc-grid div{aspect-ratio:1;border-radius:10px;background:#0b1a33 center/cover;display:flex;align-items:center;justify-content:center;font-size:24px;cursor:pointer;overflow:hidden}
.sc-pi,.sc-bp{position:relative;margin:10px 0;border-radius:14px;overflow:hidden;user-select:none}.sc-pi img{width:100%;display:block}.sc-bp{background:linear-gradient(135deg,#1c5fa8,#16507a);text-align:center;padding:26px 14px}.sc-hrt{position:absolute;left:50%;top:50%;font-style:normal;font-size:84px;color:#fff;transform:translate(-50%,-50%) scale(0);opacity:0;pointer-events:none;text-shadow:0 4px 20px #0008}.sc-hrt.go{animation:hp .8s ease-out}@keyframes hp{0%{transform:translate(-50%,-50%) scale(0);opacity:0}25%{transform:translate(-50%,-50%) scale(1.25);opacity:1}55%{transform:translate(-50%,-50%) scale(.95);opacity:1}100%{transform:translate(-50%,-70%) scale(1.1);opacity:0}}.sc-act{display:flex;gap:6px;align-items:center}.sc-act button{width:auto;flex:none;background:transparent;color:#f4e9c8;font-size:20px;padding:6px 10px;min-height:40px;transition:transform .12s}.sc-act button:active{transform:scale(.85)}.sc-act button.lk{color:#ff5a7e}.sc-post{animation:rise .35s ease both}@keyframes rise{from{opacity:0;transform:translateY(12px)}}
.sc-chh{display:flex;align-items:center;gap:10px;padding:6px 2px 10px}.sc-cm{height:52vh;overflow:auto;background:#0b1a33;border-radius:18px;padding:10px;scroll-behavior:smooth}.cb-r{display:flex;margin:3px 0}.cb-r.mi{justify-content:flex-end}.cb-b{max-width:78%;padding:8px 12px 6px;border-radius:18px 18px 18px 4px;background:#1c3a6b;color:#fff;white-space:pre-wrap;word-break:break-word;animation:pop .18s ease}.cb-b.mi{background:linear-gradient(135deg,#f1cf7a,#e2b44c);color:#0b1a33;border-radius:18px 18px 4px 18px}@keyframes pop{from{transform:scale(.9);opacity:0}}.sc-t{display:block;font-size:10px;opacity:.7;text-align:end;margin-top:2px}.sc-ds{text-align:center;font-size:11px;color:#9fb4d0;margin:10px 0 4px}.sc-cin{display:flex;gap:8px;margin-top:10px}.sc-cin input{flex:1;box-sizing:border-box;font:inherit;padding:12px 16px;border-radius:24px;border:1.5px solid #2a4a80;background:#0b1a33;color:#f4e9c8}.sc-cin input:focus{border-color:#e2b44c;outline:none}.sc-send{width:46px;flex:none;border-radius:50%;padding:0}
.sc-ring{width:92px;height:92px;border-radius:50%;padding:3px;background:conic-gradient(#f9ce34,#ee2a7b,#6228d7,#f9ce34);margin:-46px auto 6px;position:relative}.sc-av2{width:100%;height:100%;border-radius:50%;background:#0b1a33;border:3px solid #0e2142;box-sizing:border-box;display:flex;align-items:center;justify-content:center;font-size:44px}.sc-a{display:inline-flex;align-items:center;justify-content:center;border-radius:50%;background-size:cover;background-position:center;color:#fff;font-weight:800;vertical-align:middle;margin-inline-end:6px;flex:none;overflow:hidden}.sc-av2 .sc-a{margin:0}.sc-up{flex:1;text-align:center;background:#e2b44c;color:#0b2a52;font-weight:700;border-radius:12px;padding:12px 14px;min-height:20px;cursor:pointer}.sc-sb{display:flex;gap:12px;overflow-x:auto;padding:4px 2px 10px;scrollbar-width:none}.sc-sbi{flex:none;text-align:center;width:68px;cursor:pointer}.sc-sbi small{display:block;font-size:11px;margin-top:4px;color:#cfd9ea;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.sc-sr{width:68px;height:68px;border-radius:50%;padding:3px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;position:relative}.sc-sr.new{background:conic-gradient(#f9ce34,#ee2a7b,#6228d7,#f9ce34)}.sc-sr.old{background:#3b4f73}.sc-sr.add{background:#1c3a6b}.sc-sr .sc-a{border:3px solid #0b2a52;box-sizing:content-box;margin:0}.sc-sr i{position:absolute;right:-2px;bottom:-2px;background:#e2b44c;color:#0b2a52;border-radius:50%;width:20px;height:20px;font-style:normal;font-weight:800;text-align:center;line-height:20px}
.sc-sv{position:fixed;inset:0;z-index:100001;background:#000;display:flex;flex-direction:column;animation:fi .2s}@keyframes fi{from{opacity:0;transform:scale(.98)}}.sc-sv img{flex:1;min-height:0;object-fit:contain;width:100%}.sc-sp{display:flex;gap:4px;padding:10px 10px 4px}.sc-sp i{flex:1;height:3px;border-radius:2px;background:#ffffff44;position:relative;overflow:hidden}.sc-sp i.d{background:#fff}.sc-sp i u{position:absolute;inset:0;background:#fff;transform-origin:left;animation:sg 5s linear forwards}@keyframes sg{from{transform:scaleX(0)}to{transform:scaleX(1)}}.sc-sh{display:flex;align-items:center;gap:8px;padding:6px 12px;color:#fff}.sc-sh b{flex:1}.sc-sh button{width:auto;flex:none;background:transparent;color:#fff;min-height:36px;padding:4px 10px}.sc-sc{position:absolute;bottom:70px;left:0;right:0;text-align:center;color:#fff;padding:10px 16px;background:linear-gradient(transparent,#000a);font-size:16px}.sc-nv{position:absolute;inset:90px 0 70px;display:flex}.sc-nv div{flex:1}.sc-sf{display:flex;gap:8px;padding:10px 12px;position:relative;z-index:2}.sc-sf button{background:#ffffff22;color:#fff}
.sk{background:linear-gradient(90deg,#13305e,#1c3a6b,#13305e);background-size:200% 100%;animation:skm 1.2s infinite}@keyframes skm{to{background-position:-200% 0}}
.sc-ed{position:fixed;inset:0;z-index:100002;background:#050c1a;display:flex;flex-direction:column;animation:fi .2s;color:#fff}.sc-edh{display:flex;align-items:center;justify-content:space-between;padding:10px 12px}.sc-edh button{width:auto;flex:none;min-height:38px;background:#ffffff22;color:#fff}.sc-edh .sc-go{background:#e2b44c;color:#0b2a52}.sc-edp{text-align:center;max-width:300px}#edc{max-height:100%;max-width:100%;aspect-ratio:9/16;height:100%;border-radius:14px;touch-action:none;background:#000}.sc-edt{display:flex;justify-content:space-around;padding:4px 4px}.sc-edt button{background:transparent;color:#fff;font-size:11px;display:flex;flex-direction:column;gap:2px;align-items:center;min-height:46px;padding:2px 0;flex:1}.sc-edt button span,.sc-edt button i{font-size:20px;font-style:normal}.sc-edx{padding:4px 10px 12px;min-height:70px}.sc-edr{display:flex;gap:8px;align-items:center;margin:6px 0;overflow-x:auto}.sc-edr button{width:auto;flex:none;min-height:36px;padding:6px 12px;background:#ffffff22;color:#fff}.sc-edr button.on{background:#e2b44c;color:#0b2a52}.sw{width:28px;height:28px;border-radius:50%;flex:none;border:2px solid #fff6}.sw.on{border-color:#e2b44c;box-shadow:0 0 0 2px #e2b44c}.sc-pk{display:inline-flex;align-items:center;gap:4px;padding:4px 10px 4px 4px;border:1.5px solid #ffffff33;border-radius:20px;margin:3px;font-size:13px}.sc-pk.on{border-color:#e2b44c;background:#e2b44c33}.sc-pi,.sc-bp{position:relative;margin:10px 0;border-radius:14px;overflow:hidden;user-select:none}.sc-pi img{width:100%;display:block}.sc-bp{background:linear-gradient(135deg,#1c5fa8,#16507a);text-align:center;padding:26px 14px}.sc-hrt{position:absolute;left:50%;top:50%;font-style:normal;font-size:84px;color:#fff;transform:translate(-50%,-50%) scale(0);opacity:0;pointer-events:none;text-shadow:0 4px 20px #0008}.sc-hrt.go{animation:hp .8s ease-out}@keyframes hp{0%{transform:translate(-50%,-50%) scale(0);opacity:0}25%{transform:translate(-50%,-50%) scale(1.25);opacity:1}55%{transform:translate(-50%,-50%) scale(.95);opacity:1}100%{transform:translate(-50%,-70%) scale(1.1);opacity:0}}.sc-act{display:flex;gap:6px;align-items:center}.sc-act button{width:auto;flex:none;background:transparent;color:#f4e9c8;font-size:20px;padding:6px 10px;min-height:40px;transition:transform .12s}.sc-act button:active{transform:scale(.85)}.sc-act button.lk{color:#ff5a7e}.sc-post{animation:rise .35s ease both}@keyframes rise{from{opacity:0;transform:translateY(12px)}}.sc-chh{display:flex;align-items:center;gap:10px;padding:6px 2px 10px}.sc-cm{height:52vh;overflow:auto;background:#0b1a33;border-radius:18px;padding:10px;scroll-behavior:smooth}.cb-r{display:flex;margin:3px 0}.cb-r.mi{justify-content:flex-end}.cb-b{max-width:78%;padding:8px 12px 6px;border-radius:18px 18px 18px 4px;background:#1c3a6b;color:#fff;white-space:pre-wrap;word-break:break-word;animation:pop .18s ease}.cb-b.mi{background:linear-gradient(135deg,#f1cf7a,#e2b44c);color:#0b1a33;border-radius:18px 18px 4px 18px}@keyframes pop{from{transform:scale(.9);opacity:0}}.sc-t{display:block;font-size:10px;opacity:.7;text-align:end;margin-top:2px}.sc-ds{text-align:center;font-size:11px;color:#9fb4d0;margin:10px 0 4px}.sc-cin{display:flex;gap:8px;margin-top:10px}.sc-cin input{flex:1;box-sizing:border-box;font:inherit;padding:12px 16px;border-radius:24px;border:1.5px solid #2a4a80;background:#0b1a33;color:#f4e9c8}.sc-cin input:focus{border-color:#e2b44c;outline:none}.sc-send{width:46px;flex:none;border-radius:50%;padding:0}.sc-emo{display:flex;flex-wrap:wrap;gap:6px;justify-content:center}.sc-emo button{width:48px;flex:none;min-height:48px;font-size:24px;padding:0;background:#0b1a33}.sc-emo button.on{background:#e2b44c}
`;document.head.appendChild(c)})();
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let FB=null,me=null,prof=null,unsubs=[],view=null;
const cache={prof:{},stat:{}};
const S0=k=>localStorage.getItem(k);
const flag=k=>S0(k)==='1';
const setFlag=(k,v)=>localStorage.setItem(k,v?'1':'0');
async function fb(){if(FB)return FB;
 const [a,au,fs]=await Promise.all([import(BASE+'firebase-app.js'),import(BASE+'firebase-auth.js'),import(BASE+'firebase-firestore.js')]);
 const app=a.initializeApp(CFG),auth=au.getAuth(app),db=fs.getFirestore(app);
 if(EMU){au.connectAuthEmulator(auth,'http://localhost:9199',{disableWarnings:true});fs.connectFirestoreEmulator(db,'localhost',8185)}
 FB={a,au,fs,auth,db};
 au.onAuthStateChanged(auth,async u=>{me=u;prof=null;if(u){try{prof=await getProf(u.uid,true)}catch(e){}afterLogin()}else{stopLoc();clearMarkers()}if(view)view()});
 return FB}
function panel(){return document.getElementById('mn')}
function scr(html,v){unsubs.forEach(f=>{try{f()}catch(e){}});unsubs=[];view=v||null;const e=panel();e.innerHTML=html;e.classList.add('on');e.scrollTop=0;return e}
function err(e){const m=(e&&e.code||e&&e.message||String(e));const map={'auth/invalid-email':t('الإيميل مش صحيح','Invalid email'),'auth/email-already-in-use':t('الإيميل ده مسجل قبل كده','This email is already registered'),'auth/weak-password':t('كلمة السر ضعيفة (٦ حروف على الأقل)','Password too weak (at least 6 characters)'),'auth/invalid-credential':t('الإيميل أو كلمة السر غلط','Wrong email or password'),'auth/invalid-login-credentials':t('الإيميل أو كلمة السر غلط','Wrong email or password'),'auth/network-request-failed':t('محتاج إنترنت','Internet needed'),'permission-denied':t('مش مسموح. القواعد على Firebase لسه ما اتنشرتش؟','Not allowed. Are the Firebase rules published yet?'),'auth/too-many-requests':t('محاولات كتير. جرب بعد شوية','Too many attempts. Try later'),'auth/requires-recent-login':t('سجّل دخول تاني الأول وبعدين جرب','Sign in again first, then retry')};return map[m]||m}
const bad=m=>`<div class="msg bad" id="smsg">${esc(m||'')}</div>`;

const back=(fn)=>`<div class="row"><button class="o" onclick="${fn}">${t('رجوع','Back')}</button></div>`;
async function getProf(uid,force){if(!force&&cache.prof[uid])return cache.prof[uid];const {fs,db}=FB;const d=await fs.getDoc(fs.doc(db,'profiles',uid));const p=d.exists()?d.data():null;if(p)cache.prof[uid]=p;return p}
async function getStat(uid){const {fs,db}=FB;try{const d=await fs.getDoc(fs.doc(db,'stats',uid));return d.exists()?d.data():null}catch(e){return null}}

// ---------- entry ----------
async function open(){
 scr(`<h2>👥 ${t('الأصدقاء','Friends')}</h2><p>${t('بنحمّل...','Loading...')}</p>`);
 try{await fb()}catch(e){scr(`<h2>👥 ${t('الأصدقاء','Friends')}</h2><div class="box"><p>${t('الميزة دي محتاجة إنترنت.','This feature needs internet.')}</p></div>${back('openMenu()')}`);return}
 await new Promise(r=>setTimeout(r,400));
 home()}
function home(){
 if(!FB)return open();
 if(!me)return authScreen();
 if(!prof)return setupScreen();
 hub()}

// ---------- auth ----------
function authScreen(mode){mode=mode||'in';const up=mode=='up';
 scr(`<div class="sc-hero"><div class="sc-logo">📜</div><div class="sc-h">${t('حكاية بورسعيد','Hekaya Port Said')}</div><p class="sc-sub">${t('اعمل حسابك عشان تضيف أصدقاء، تتشات، وتشارك ذكرياتك. الحكايات نفسها من غير حساب.','Create an account to add friends, chat and share your memories. The stories themselves need no account.')}</p></div>
 <div class="sc-card"><div class="sc-seg"><button class="${up?'':'on'}" onclick="Soc.authScreen('in')">${t('دخول','Sign in')}</button><button class="${up?'on':''}" onclick="Soc.authScreen('up')">${t('حساب جديد','New account')}</button></div>
 <div class="sc-f"><label for="se">${t('الإيميل','Email')}</label><span class="sc-i">✉️</span><input id="se" type="email" inputmode="email" autocomplete="email" placeholder="name@example.com" dir="ltr" oninput="Soc.vf()"></div><div class="sc-e" id="see"></div>
 <div class="sc-f"><label for="sp">${t('كلمة السر','Password')}</label><span class="sc-i">🔒</span><input id="sp" type="password" autocomplete="${up?'new-password':'current-password'}" placeholder="${up?t('٦ حروف على الأقل','At least 6 characters'):'••••••••'}" dir="ltr" oninput="Soc.vf()" onkeydown="if(event.key=='Enter')Soc.doAuth('${mode}')"><button type="button" class="sc-eye" aria-label="show" onclick="var i=document.getElementById('sp');i.type=i.type=='password'?'text':'password';this.textContent=i.type=='password'?'👁':'🙈'">👁</button></div><div class="sc-e" id="spe"></div>
 <div class="msg bad" id="smsg" style="display:none"></div>
 <button class="sc-btn" id="sab" onclick="Soc.doAuth('${mode}')">${up?t('إنشاء الحساب','Create account'):t('دخول','Sign in')}</button>
 ${up?'':`<div style="text-align:center"><button class="sc-link" onclick="Soc.reset()">${t('نسيت كلمة السر؟','Forgot password?')}</button></div>`}</div>
 ${back('openMenu()')}`,()=>home())}
function vf(){const e=document.getElementById('se'),p=document.getElementById('sp');if(!e)return true;let ok=true;const em=e.value.trim();
 const se=document.getElementById('see'),sp=document.getElementById('spe'),up=document.getElementById('sab')&&/إنشاء|Create/.test(document.getElementById('sab').textContent);
 if(em&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)){se.textContent=t('الإيميل مش مكتوب صح','That email does not look right');e.classList.add('bad');ok=false}else{se.textContent='';e.classList.remove('bad')}
 if(up&&p.value&&p.value.length<6){sp.textContent=t('كلمة السر لازم ٦ حروف على الأقل','Password needs at least 6 characters');p.classList.add('bad');ok=false}else{sp.textContent='';p.classList.remove('bad')}return ok}
function busy(id,on,txt){const b=document.getElementById(id);if(!b)return;if(on){b._t=b.textContent;b.classList.add('ld');b.textContent=txt||'...'}else{b.classList.remove('ld');if(b._t)b.textContent=b._t}}
function say(m,ok){const e=document.getElementById('smsg');if(e){e.style.display=m?'block':'none';e.className='msg '+(ok?'ok':'bad');e.textContent=m}}
async function doAuth(mode){const e=document.getElementById('se').value.trim(),p=document.getElementById('sp').value;
 if(!e)return (document.getElementById('see').textContent=t('اكتب الإيميل','Enter your email')),0;if(!p)return (document.getElementById('spe').textContent=t('اكتب كلمة السر','Enter your password')),0;if(!vf())return;
 busy('sab',true,mode=='up'?t('بنعمل الحساب','Creating'):t('بندخل','Signing in'));say('');
 try{const {au,auth}=FB;if(mode=='up')await au.createUserWithEmailAndPassword(auth,e,p);else await au.signInWithEmailAndPassword(auth,e,p)}catch(x){busy('sab',false);say(err(x))}}
async function reset(){const e=document.getElementById('se').value.trim();if(!e)return say(t('اكتب الإيميل الأول','Enter your email first'));try{await FB.au.sendPasswordResetEmail(FB.auth,e);say(t('بعتنا لينك تغيير كلمة السر على الإيميل','Password reset link sent to your email'),1)}catch(x){say(err(x))}}
async function signOut(){await stopLoc(true);await nearStop();nearClear();await FB.au.signOut(FB.auth);cache.prof={};cache.stat={}}

// ---------- profile ----------


const GRS=['linear-gradient(135deg,#1c5fa8,#2fb6a0)','linear-gradient(135deg,#e0527a,#f0a04b)','linear-gradient(135deg,#8e4ec6,#3a6fd8)','linear-gradient(135deg,#3a9d5d,#c9b43a)','linear-gradient(135deg,#d9632b,#a8323e)'];
function av(p,sz){p=p||{};sz=sz||28;const nm=String(p.name||p.handle||'?').trim(),ini=esc(([...nm][0]||'?').toUpperCase());
 if(typeof p.ph==='string'&&/^data:image\/jpeg;base64,/.test(p.ph))return `<span class="sc-a" style="width:${sz}px;height:${sz}px;background-image:url(${p.ph})"></span>`;
 let h=0;for(const c of String(p.handle||nm))h=(h*31+c.charCodeAt(0))>>>0;
 return `<span class="sc-a" style="width:${sz}px;height:${sz}px;background:${GRS[h%GRS.length]};font-size:${Math.round(sz*.48)}px">${ini}</span>`}
let _ph='';
function cropAvatar(file){return new Promise(ok=>{const im=new Image(),u=URL.createObjectURL(file);im.onload=()=>{let sz=192,q=.8,out='';const m=Math.min(im.width,im.height),sx=(im.width-m)/2,sy=(im.height-m)/2;
  for(let i=0;i<6;i++){const c=document.createElement('canvas');c.width=c.height=sz;c.getContext('2d').drawImage(im,sx,sy,m,m,0,0,sz,sz);out=c.toDataURL('image/jpeg',q);if(out.length<=30000)break;if(q>.5)q-=.1;else sz-=24}
  URL.revokeObjectURL(u);ok(out.length<=34000?out:'')};im.onerror=()=>ok('');im.src=u})}
async function pickPhoto(inp){const f=inp.files&&inp.files[0];if(!f)return;const d=await cropAvatar(f);if(!d)return say(t('الصورة مش شغالة','Could not use this photo'));_ph=d;photoPrev()}
function photoPrev(){const e=document.getElementById('sphp');if(e)e.innerHTML=av({ph:_ph,name:(document.getElementById('sn')||{}).value||'?',handle:(document.getElementById('sh')||{}).value||''},96);const r=document.getElementById('sphr');if(r)r.style.display=_ph?'inline-block':'none'}
function photoRow(){return `<div style="text-align:center;margin:6px 0"><div id="sphp" style="display:inline-block;border-radius:50%;padding:3px;background:conic-gradient(#f9ce34,#ee2a7b,#6228d7,#f9ce34)"></div>
 <div class="row" style="justify-content:center;margin-top:8px"><label class="sc-up">📷 ${t('اختار صورة','Choose photo')}<input type="file" accept="image/*" style="display:none" onchange="Soc.pickPhoto(this)"></label><button type="button" class="o" id="sphr" style="width:auto;flex:none;display:none" onclick="Soc.rmPhoto()">${t('شيل الصورة','Remove')}</button></div>
 <p style="margin:4px 0 0"><small style="color:#9fb4d0">${t('من الكاميرا أو المعرض. بتتقص مربعة وبتتضغط تلقائي.','Camera or gallery. Auto-cropped square and compressed.')}</small></p></div><input id="sem" type="hidden" value="🙂">`}
function rmPhoto(){_ph='';photoPrev()}
const EMOJIS=['🙂','😎','🧭','⚓','🐚','🌊','🦩','🚢','🎩','🌙'];
function pickEmo(x,btn){document.getElementById('sem').value=x;btn.parentNode.querySelectorAll('button').forEach(b=>b.classList.remove('on'));btn.classList.add('on')}
function emoRow(cur){return `<div class="sc-emo">${EMOJIS.map(x=>`<button type="button" class="${x==cur?'on':''}" onclick="Soc.pickEmo('${x}',this)">${x}</button>`).join('')}</div><input id="sem" type="hidden" value="${cur}">`}
function hv(){const h=document.getElementById('sh'),e=document.getElementById('she');if(!h)return;const v=h.value.trim().replace(/^@/,'');if(v&&!/^[a-zA-Z0-9_]{3,20}$/.test(v)){e.textContent=t('٣ لـ ٢٠ حرف إنجليزي أو رقم أو _','3-20 letters a-z, digits or _');h.classList.add('bad')}else{e.textContent='';h.classList.remove('bad')}}
function setupScreen(){
 scr(`<div class="sc-hero"><div class="sc-logo">${t('👋','👋')}</div><div class="sc-h">${t('اعمل بروفايلك','Set up your profile')}</div><p class="sc-sub">${t('الاسم والـ@يوزر بيظهروا لأي حد يدوّر عليك. الإيميل والموبايل عمرهم ما بيظهروا.','Your name and @handle are visible to people who search for you. Your email and phone are never shown.')}</p></div>
 <div class="sc-card"><div class="sc-f"><label for="sh">${t('اليوزر','Handle')}</label><span class="sc-i">@</span><input id="sh" placeholder="${t('مثال: ahmed_ps','e.g. ahmed_ps')}" dir="ltr" maxlength="20" autocapitalize="none" oninput="Soc.hv()"></div><div class="sc-e" id="she"></div>
 <div class="sc-f"><label for="sn">${t('الاسم اللي يظهر','Display name')}</label><span class="sc-i">🙂</span><input id="sn" maxlength="30" placeholder="${t('اسمك','Your name')}"></div><div class="sc-e"></div>
 ${photoRow()}
 <div class="msg bad" id="smsg" style="display:none"></div><button class="sc-btn" id="ssb" onclick="Soc.saveProf()">${t('حفظ وابدأ','Save and start')}</button></div>
 <div style="text-align:center"><button class="sc-link" onclick="Soc.signOut()">${t('تسجيل خروج','Sign out')}</button></div>`,()=>home());_ph='';photoPrev()}
async function saveProf(){const h=document.getElementById('sh').value.trim().toLowerCase().replace(/^@/,''),n=document.getElementById('sn').value.trim(),em=document.getElementById('sem').value;
 if(!/^[a-z0-9_]{3,20}$/.test(h))return say(t('اليوزر ٣ لـ ٢٠ حرف إنجليزي أو رقم أو _','Handle: 3-20 letters a-z, digits or _'));if(!n)return say(t('اكتب اسم','Enter a name'));
 busy('ssb',true,t('بنحفظ','Saving'));try{const {fs,db}=FB,uid=me.uid;
  await fs.runTransaction(db,async tx=>{const hd=await tx.get(fs.doc(db,'handles',h));if(hd.exists()&&hd.data().uid!==uid)throw new Error(t('اليوزر ده واخده حد','That handle is taken'));tx.set(fs.doc(db,'handles',h),{uid});tx.set(fs.doc(db,'profiles',uid),Object.assign({handle:h,name:n,emoji:em,ts:Date.now()},_ph?{ph:_ph}:{}))});
  prof=await getProf(uid,true);afterLogin();hub()}catch(x){busy('ssb',false);say(err(x))}}
async function editName(){const n=prompt(t('الاسم الجديد','New display name'),prof.name);if(!n||!n.trim())return;try{const {fs,db}=FB;await fs.setDoc(fs.doc(db,'profiles',me.uid),{handle:prof.handle,name:n.trim().slice(0,30),emoji:prof.emoji,ts:Date.now()});prof=await getProf(me.uid,true);hub()}catch(x){alert(err(x))}}

// ---------- hub ----------
function stats(){const A=(typeof achs==='function'?achs():[]);return{stories:unlocked.length,riddles:SOL.length,badges:A.filter(x=>x.ok).length,ts:Date.now()}}
let syncT=0;
async function sync(){if(!FB||!me||!prof)return;if(flag('hk_soc_stats_off'))return;const now=Date.now();if(now-syncT<5000)return;syncT=now;try{const {fs,db}=FB;await fs.setDoc(fs.doc(db,'stats',me.uid),stats())}catch(e){}}
function afterLogin(){sync();if(flag('hk_soc_loc'))startLoc();if(flag('hk_soc_map'))startMap()}
async function hub(){
 const st=flag('hk_soc_loc'),sm=flag('hk_soc_map'),so=!flag('hk_soc_stats_off');
 scr(`<h2>👥 ${t('الأصدقاء','Friends')}</h2>
 <div id="sbar"></div>
 <div id="myhead">${head(prof,[[unlocked.length,t('حكايات','Stories')],[(typeof achs==='function'?achs().filter(x=>x.ok).length:0),t('بادجات','Badges')],[FR.length,t('أصدقاء','Friends')],['…',t('بوستات','Posts')]],`<div class="row"><button onclick="Soc.editScreen()">✏️ ${t('تعديل البروفايل','Edit profile')}</button><button class="o" onclick="Soc.signOut()">${t('خروج','Sign out')}</button></div><h3 style="margin:10px 0 6px">🏅 ${t('البادجات','Badges')}</h3>${badgeChips()}<h3 style="margin:14px 0 6px">📷 ${t('بوستاتي','My posts')}</h3><div id="mypg"><p>…</p></div>`)}</div>
 <div class="row"><button onclick="Soc.searchScreen()">🔎 ${t('دوّر على صديق','Find a friend')}</button><button onclick="Soc.sugScreen()">📍 ${t('اقترح مكان','Suggest a place')}</button></div>
 <div class="row"><button onclick="Soc.nearScreen()">👀 ${t('ناس قريبة','People nearby')}</button><button class="o" onclick="Soc.blockedScreen()">🚫 ${t('المحجوبين','Blocked')}</button></div>
 <div class="row"><button onclick="Soc.feedScreen()">📰 ${t('الفيد','Feed')}</button><button class="o" onclick="Soc.feedScreen(Soc.user.uid)">${t('بوستاتي','My posts')}</button></div>
 <div class="box"><h3>📣 ${t('انشر إنجاز','Share an achievement')}</h3>${(typeof achs==='function'?achs().filter(x=>x.ok):[]).map((a,i)=>`<div class="row"><button class="o" onclick="Soc.postBadge(${i})">🏅 ${esc(a.n)}</button></div>`).join('')||`<p><small>${t('لسه معندكش إنجازات.','No achievements yet.')}</small></p>`}<p><small>${t('البوستات بتظهر لأصدقائك بس. الصور من ☰ ثم ذكرياتي.','Posts are visible to friends only. Photos: ☰ then Memories.')}</small></p></div>
 <div id="sreq"></div>
 <div class="box"><h3>${t('أصدقائي','My friends')}</h3><div id="sfr"><p>…</p></div></div>
 <div class="box"><h3>🏆 ${t('ترتيب الأصدقاء','Friends leaderboard')}</h3><div id="slb"><p>…</p></div><p><small>${t('بيظهر عدد الحكايات والألغاز والبادجات بس. مفيش مواقع.','Shows story, riddle and badge counts only. Never locations.')}</small></p>
 <button class="${so?'':'o'}" onclick="Soc.togStats()">${so?t('تقدمي ظاهر لأصدقائي ✓','My progress is visible to friends ✓'):t('تقدمي مخفي (اضغط للإظهار)','My progress is hidden (tap to show)')}</button></div>
 <div class="box"><h3>📍 ${t('مشاركة موقعي','Share my location')}</h3>
 <p>${t('مقفولة بشكل افتراضي. لما تفتحها، أصدقاءك المقبولين بس هيشوفوا مكانك الحالي (مش المسار). تقدر تخفي نفسك في أي وقت.','Off by default. When on, only your accepted friends see your current position (never your trail). You can hide at any time.')}</p>
 <button class="${st?'':'o'}" onclick="Soc.togLoc()">${st?t('بشارك مكاني مع الأصدقاء ✓','Sharing my location with friends ✓'):t('شارك مكاني مع الأصدقاء','Share my location with friends')}</button>
 ${st?`<button class="o" style="margin-top:8px" onclick="Soc.hideNow()">🙈 ${t('اخفي نفسي دلوقتي','Hide me now')}</button>`:''}
 <button class="${sm?'':'o'}" style="margin-top:8px" onclick="Soc.togMap()">${sm?t('أصدقائي ظاهرين على الخريطة ✓','Friends are shown on the map ✓'):t('اظهر أصدقائي على الخريطة','Show friends on the map')}</button>
 <div class="row"><button class="o" onclick="closeP('mn')">🗺 ${t('افتح الخريطة','Open map')}</button></div></div>
 <div class="box"><button class="o" onclick="Soc.delAcct()">🗑 ${t('احذف حسابي وبياناتي','Delete my account and data')}</button></div>
 ${back('openMenu()')}`,hub);
 const {fs,db}=FB,uid=me.uid;postCount(uid).then(n=>{const el=document.querySelector('#myhead .sc-st div:last-child b');if(el)el.textContent=n});postGrid(uid,'mypg');
 unsubs.push(fs.onSnapshot(fs.collection(db,'requests',uid,'from'),async snap=>{const ids=snap.docs.map(d=>d.id);const el=document.getElementById('sreq');if(!el)return;
  if(!ids.length){el.innerHTML='';return}
  const ps=await Promise.all(ids.map(i=>getProf(i).catch(()=>null)));
  el.innerHTML=`<div class="box" style="border:1px solid #e2b44c"><h3>${t('طلبات صداقة','Friend requests')}</h3>`+ids.map((i,k)=>`<p>${av((ps[k]||{}))} <b>${esc((ps[k]||{}).name||'?')}</b> <small dir="ltr">@${esc((ps[k]||{}).handle||'')}</small></p><div class="row"><button onclick="Soc.accept('${i}')">${t('قبول','Accept')}</button><button class="o" onclick="Soc.decline('${i}')">${t('رفض','Decline')}</button></div>`).join('')+`</div>`},e=>{}));
 unsubs.push(fs.onSnapshot(fs.collection(db,'friends',uid,'list'),async snap=>{FR=snap.docs.map(d=>d.id);await renderFriends();if(document.getElementById('sbar'))storyBar('sbar');if(flag('hk_soc_map'))startMap()},e=>{}))}
let FR=[];
async function renderFriends(){const el=document.getElementById('sfr'),lb=document.getElementById('slb');if(!el)return;
 if(!FR.length){el.innerHTML=`<p>${t('لسه مفيش أصدقاء. دوّر على حد بالـ@يوزر.','No friends yet. Search by @handle.')}</p>`;lb.innerHTML=`<p>${t('ضيف أصدقاء الأول.','Add friends first.')}</p>`;return}
 const ps=await Promise.all(FR.map(i=>getProf(i).catch(()=>null))),ss=await Promise.all(FR.map(getStat));
 el.innerHTML=FR.map((i,k)=>`<div style="display:flex;align-items:center;gap:8px;margin:8px 0"><div style="flex:1;cursor:pointer" onclick="Soc.profileScreen('${i}')">${av((ps[k]||{}))} <b>${esc((ps[k]||{}).name||'?')}</b><br><small dir="ltr">@${esc((ps[k]||{}).handle||'')}</small></div><button class="o" style="width:auto;margin:0" onclick="Soc.feedScreen('${i}')">📰</button><button class="o" style="width:auto;margin:0" onclick="Soc.blockUser('${i}')">🚫</button><button style="width:auto;margin:0" onclick="Soc.chat('${i}')">💬</button><button class="o" style="width:auto;margin:0" onclick="Soc.unfriend('${i}')">✖</button></div>`).join('');
 const rows=[{n:prof.name,e:av(prof),me:1,s:flag('hk_soc_stats_off')?null:stats()}].concat(FR.map((i,k)=>({n:(ps[k]||{}).name||'?',e:av(ps[k]||{}),s:ss[k]})));
 rows.sort((a,b)=>((b.s&&b.s.stories)||-1)-((a.s&&a.s.stories)||-1)||((b.s&&b.s.riddles)||0)-((a.s&&a.s.riddles)||0));
 lb.innerHTML=rows.map((r,k)=>`<p style="margin:6px 0;${r.me?'color:#e2b44c;font-weight:700':''}">${k+1}. ${r.e} ${esc(r.n)}${r.me?' ('+t('أنا','me')+')':''} · ${r.s?`${t('حكايات','stories')} ${r.s.stories} · ${t('ألغاز','riddles')} ${r.s.riddles} · 🏅${r.s.badges}`:`<small>${t('مخفي','hidden')}</small>`}</p>`).join('')}
async function togStats(){const off=!flag('hk_soc_stats_off');setFlag('hk_soc_stats_off',off);const {fs,db}=FB;try{if(off)await fs.deleteDoc(fs.doc(db,'stats',me.uid));else{syncT=0;await sync()}}catch(e){}hub()}

// ---------- search / requests ----------
function searchScreen(){scr(`<h2>🔎 ${t('دوّر على صديق','Find a friend')}</h2><div class="box"><input id="sq" placeholder="@${t('يوزر الصديق','friend handle')}" dir="ltr" onkeydown="if(event.key=='Enter')Soc.doSearch()"><div class="row"><button onclick="Soc.doSearch()">${t('بحث','Search')}</button></div><div id="sres"></div>${bad('')}</div>${back('Soc.home()')}`,()=>{})}
async function doSearch(){const q=document.getElementById('sq').value.trim().toLowerCase().replace(/^@/,'');if(q.length<2)return say(t('اكتب حرفين على الأقل','Type at least 2 characters'));
 try{const {fs,db}=FB;const r=await fs.getDocs(fs.query(fs.collection(db,'profiles'),fs.orderBy('handle'),fs.startAt(q),fs.endAt(q+'\uf8ff'),fs.limit(10)));
  const L=r.docs.filter(d=>d.id!==me.uid);document.getElementById('sres').innerHTML=L.length?L.map(d=>{const p=d.data(),isF=FR.includes(d.id);cache.prof[d.id]=p;return `<div style="display:flex;align-items:center;gap:8px;margin:8px 0"><div style="flex:1">${av(p)} <b>${esc(p.name)}</b><br><small dir="ltr">@${esc(p.handle)}</small></div>${isF?`<small>${t('صديق','Friend')}</small>`:`<button style="width:auto;margin:0" onclick="Soc.addFriend('${d.id}',this)">${t('أضف','Add')}</button>`}</div>`}).join(''):`<p>${t('مفيش نتيجة','No results')}</p>`;say('',1)}catch(x){say(err(x))}}
async function addFriend(uid,btn){try{const {fs,db}=FB;await fs.setDoc(fs.doc(db,'requests',uid,'from',me.uid),{ts:Date.now()});btn.textContent=t('اتبعت ✓','Sent ✓');btn.disabled=true}catch(x){say(err(x))}}
async function accept(uid){try{const {fs,db}=FB,b=fs.writeBatch(db);b.set(fs.doc(db,'friends',me.uid,'list',uid),{ts:Date.now()});b.set(fs.doc(db,'friends',uid,'list',me.uid),{ts:Date.now()});b.delete(fs.doc(db,'requests',me.uid,'from',uid));await b.commit()}catch(x){alert(err(x))}}
async function decline(uid){try{const {fs,db}=FB;await fs.deleteDoc(fs.doc(db,'requests',me.uid,'from',uid))}catch(x){alert(err(x))}}
async function unfriend(uid){if(!confirm(t('تشيل الصديق ده؟','Remove this friend?')))return;try{const {fs,db}=FB,b=fs.writeBatch(db);b.delete(fs.doc(db,'friends',me.uid,'list',uid));b.delete(fs.doc(db,'friends',uid,'list',me.uid));await b.commit()}catch(x){alert(err(x))}}

// ---------- chat ----------
let tpT=0;
async function chat(uid){const p=await getProf(uid).catch(()=>null),cid=[me.uid,uid].sort().join('_');
 scr(`<div class="sc-chh">${av(p||{},40)}<div style="flex:1;cursor:pointer" onclick="Soc.profileScreen('${uid}')"><b>${esc((p||{}).name||'')}</b><br><small id="cty" style="color:#9fb4d0">@${esc((p||{}).handle||'')}</small></div></div>
 <div id="cmsgs" class="sc-cm"></div><div class="sc-cin"><input id="ct" maxlength="1000" autocomplete="off" placeholder="${t('اكتب رسالة...','Message...')}" oninput="Soc.typing('${uid}')" onkeydown="if(event.key=='Enter')Soc.send('${uid}')"><button class="sc-send" onclick="Soc.send('${uid}')">➤</button></div><p><small style="color:#9fb4d0">🛡 ${t('متشاركش بياناتك الشخصية، وأول لقاء يكون في مكان عام.','Never share personal details, and meet first in a public place.')}</small></p>${bad('')}<div class="row"><button class="o" onclick="Soc.tab('chat')">${t('رجوع','Back')}</button></div>`,()=>{});
 const {fs,db}=FB;let other=0,docs=[];
 const draw=()=>{const el=document.getElementById('cmsgs');if(!el)return;let day='';
  el.innerHTML=docs.map(d=>{const m=d.data(),mine=m.from===me.uid,ms=m.ts&&m.ts.toMillis?m.ts.toMillis():Date.now(),dt=new Date(ms),dk=dt.toDateString();let sep='';if(dk!==day){day=dk;sep=`<div class="sc-ds">${dt.toLocaleDateString(EN?'en-GB':'ar-EG',{day:'numeric',month:'short'})}</div>`}
   const tm=dt.toLocaleTimeString(EN?'en-GB':'ar-EG',{hour:'2-digit',minute:'2-digit'}),tick=mine?(d.metadata.hasPendingWrites?'…':(other>=ms?'<b style="color:#3ad1b8">✓✓</b>':'✓')):'';
   return sep+`<div class="cb-r ${mine?'mi':''}"><div class="cb-b ${mine?'mi':''}" dir="auto">${esc(m.text)}<span class="sc-t">${tm} ${tick}</span></div></div>`}).join('')||`<div style="text-align:center;opacity:.8;margin-top:30px"><div style="font-size:40px">👋</div>${t('ابدأ الكلام','Say hi')}</div>`;el.scrollTop=el.scrollHeight};
 const mark=()=>{try{fs.setDoc(fs.doc(db,'chats',cid,'reads',me.uid),{ts:Date.now()}).catch(()=>{})}catch(e){}};
 unsubs.push(fs.onSnapshot(fs.query(fs.collection(db,'chats',cid,'messages'),fs.orderBy('ts'),fs.limitToLast(100)),{includeMetadataChanges:true},snap=>{docs=snap.docs;draw();if(docs.length&&docs[docs.length-1].data().from!==me.uid)mark()},e=>say(err(e))));
 mark();
 unsubs.push(fs.onSnapshot(fs.doc(db,'chats',cid,'reads',uid),d=>{other=d.exists()?d.data().ts:0;draw()},e=>{}));
 unsubs.push(fs.onSnapshot(fs.doc(db,'chats',cid,'typing',uid),d=>{const el=document.getElementById('cty');if(!el)return;const on=d.exists()&&Date.now()-d.data().ts<5000;el.textContent=on?t('بيكتب...','typing...'):'@'+((p||{}).handle||'');el.style.color=on?'#3ad1b8':'#9fb4d0';if(on)setTimeout(()=>{if(el.textContent!=='@'+((p||{}).handle||''))el.textContent='@'+((p||{}).handle||'')},5200)},e=>{}))}
function typing(uid){const n=Date.now();if(n-tpT<2500)return;tpT=n;const cid=[me.uid,uid].sort().join('_'),{fs,db}=FB;try{fs.setDoc(fs.doc(db,'chats',cid,'typing',me.uid),{ts:n}).catch(()=>{})}catch(e){}}
async function send(uid){const i=document.getElementById('ct'),x=i.value.trim();if(!x)return;const cid=[me.uid,uid].sort().join('_');i.value='';try{const {fs,db}=FB;await fs.addDoc(fs.collection(db,'chats',cid,'messages'),{from:me.uid,text:x,ts:fs.serverTimestamp()});tpT=0}catch(e){say(err(e))}}

// ---------- location sharing (opt-in, friends only) ----------
let lastLoc=0,mapUnsubs=[],markers={};
function startLoc(){/* positions are pushed from onPos */}
async function stopLoc(quiet){if(!FB||!me)return;try{const {fs,db}=FB;await fs.deleteDoc(fs.doc(db,'loc',me.uid))}catch(e){}}
async function onPos(lat,lon){myPos={lat,lon};if(!FB||!me||!prof)return;if(flag('hk_soc_near')&&!FAKE)nearPush(lat,lon);if(!flag('hk_soc_loc'))return;const now=Date.now();if(now-lastLoc<20000)return;lastLoc=now;try{const {fs,db}=FB;await fs.setDoc(fs.doc(db,'loc',me.uid),{lat:Math.round(lat*1e5)/1e5,lon:Math.round(lon*1e5)/1e5,ts:now})}catch(e){}}
async function togLoc(){if(flag('hk_soc_loc')){setFlag('hk_soc_loc',false);await stopLoc()}else{if(!confirm(t('أصدقاءك المقبولين بس هيشوفوا مكانك الحالي طول ما الخاصية شغالة. تقدر تخفي نفسك في أي وقت. تفتحها؟','Only your accepted friends will see your current position while this is on. You can hide at any time. Turn it on?')))return;setFlag('hk_soc_loc',true);lastLoc=0;if(typeof SPOS==='function'&&SPOS()&&!FAKE)onPos(SPOS().lat,SPOS().lon)}hub()}
async function hideNow(){setFlag('hk_soc_loc',false);await stopLoc();hub()}
function clearMarkers(){mapUnsubs.forEach(f=>{try{f()}catch(e){}});mapUnsubs=[];Object.values(markers).forEach(m=>map.removeLayer(m));markers={}}
function startMap(){if(!FB||!me)return;clearMarkers();const {fs,db}=FB;
 FR.forEach(async uid=>{const p=await getProf(uid).catch(()=>null);
  mapUnsubs.push(fs.onSnapshot(fs.doc(db,'loc',uid),d=>{if(markers[uid]){map.removeLayer(markers[uid]);delete markers[uid]}
   if(!flag('hk_soc_map')||!d.exists())return;const x=d.data();if(Date.now()-x.ts>30*60000)return;
   const ago=Math.max(1,Math.round((Date.now()-x.ts)/60000));
   markers[uid]=L.marker([x.lat,x.lon],{icon:L.divIcon({className:'',html:`<div class="fmk">${av((p||{}))}<span>${esc((p||{}).name||'')}</span></div>`,iconSize:[1,1]}),zIndexOffset:800}).addTo(map).bindTooltip(ago+' '+t('د','min'),{direction:'top'})},e=>{}))})}
async function togMap(){const on=!flag('hk_soc_map');setFlag('hk_soc_map',on);if(on)startMap();else clearMarkers();hub()}

// ---------- suggested places ----------
function sugScreen(){const p=(typeof SPOS==='function'&&SPOS())||map.getCenter&&{lat:map.getCenter().lat,lon:map.getCenter().lng}||{lat:31.265,lon:32.305};
 scr(`<h2>📍 ${t('اقترح مكان','Suggest a place')}</h2><div class="box"><p><small>${t('اقتراحك بيتراجع قبل ما يتحوّل لحكاية. لازم مصدر موثق.','Suggestions are reviewed before they become a story. A documented source is required.')}</small></p>
 <input id="gn" placeholder="${t('اسم المكان','Place name')}" maxlength="80"><textarea id="gt" rows="4" maxlength="1000" placeholder="${t('الحكاية أو المعلومة اللي تعرفها','The story or fact you know')}" style="width:100%;margin-top:8px"></textarea>
 <input id="gs" placeholder="${t('لينك المصدر (ويكيبيديا، خبر، كتاب)','Source link (Wikipedia, news, book)')}" dir="ltr" style="margin-top:8px">
 <p><small>${t('الموقع','Location')}: <span id="gl">${p.lat.toFixed(5)}, ${p.lon.toFixed(5)}</span></small></p><div class="row"><button class="o" onclick="Soc.sugHere()">${t('استخدم موقعي الحالي','Use my current location')}</button></div>
 <label style="display:block;margin:8px 0"><input type="checkbox" id="gc" style="width:auto"> ${t('المعلومات دي من مصدر عام أو بتاعتي، ومش منسوخة من مكان محمي.','This info is from a public source or my own, not copied from a protected work.')}</label>
 ${bad('')}<div class="row"><button onclick="Soc.sugSend(${p.lat},${p.lon})">${t('ابعت الاقتراح','Send suggestion')}</button></div></div>${back('Soc.home()')}`,()=>{});window._sg={lat:p.lat,lon:p.lon}}
function sugHere(){const p=typeof SPOS==='function'&&SPOS();if(!p)return say(t('الموقع مش متاح','Location not available'));window._sg={lat:p.lat,lon:p.lon};document.getElementById('gl').textContent=p.lat.toFixed(5)+', '+p.lon.toFixed(5)}
async function sugSend(){const n=document.getElementById('gn').value.trim(),x=document.getElementById('gt').value.trim(),s=document.getElementById('gs').value.trim(),c=document.getElementById('gc').checked;
 if(n.length<2)return say(t('اكتب اسم المكان','Enter a place name'));if(!s)return say(t('لازم مصدر','A source is required'));if(!c)return say(t('وافق على الإقرار الأول','Tick the confirmation first'));
 try{const {fs,db}=FB;await fs.addDoc(fs.collection(db,'placeSuggestions'),{uid:me.uid,name:n,note:x,lat:window._sg.lat,lon:window._sg.lon,src:s.slice(0,300),lic:true,ts:fs.serverTimestamp()});scr(`<h2>✅ ${t('وصلنا اقتراحك','Suggestion sent')}</h2><div class="box"><p>${t('هنراجعه ولو اتقبل هيتحول لحكاية.','We will review it. If accepted it becomes a story.')}</p></div>${back('Soc.home()')}`,()=>{})}catch(e){say(err(e))}}


// ---------- feed: posts with photos / achievements, friends-only ----------
function compress(blobOrFile){return new Promise(ok=>{const im=new Image(),u=URL.createObjectURL(blobOrFile);im.onload=()=>{let w=720,q=.6,out='';const k=Math.min(1,w/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);for(let i=0;i<5;i++){out=c.toDataURL('image/jpeg',q);if(out.length<=240000)break;q-=.1}URL.revokeObjectURL(u);ok(out)};im.onerror=()=>ok('');im.src=u})}
async function publish(o){const {fs,db}=FB;await fs.addDoc(fs.collection(db,'userPosts',me.uid,'items'),Object.assign({uid:me.uid,ts:fs.serverTimestamp()},o))}
async function postMemory(id){if(!FB||!me||!prof){alert(t('سجّل دخول من الأصدقاء الأول','Sign in from Friends first'));return open()}
 const x=(await mall()).find(y=>y.id==id);if(!x)return;const txt=prompt(t('اكتب تعليق (اختياري). البوست هيظهر لأصدقائك بس.','Add a caption (optional). This post is visible to your friends only.'),'');if(txt===null)return;
 const img=await compress(x.b);if(!img)return alert(t('الصورة مش شغالة','Could not read the photo'));
 try{const st=(typeof S!=='undefined'&&S.find(s=>s.n==x.n))||{};await publish({kind:'photo',text:(txt||'').trim().slice(0,500),img,n:x.n,title:String(st.t||'').slice(0,120)});closeP('cd');alert(t('اتنشر لأصدقائك','Posted to your friends'));}catch(e){alert(err(e))}}
async function postBadge(i){const A=achs().filter(x=>x.ok);const a=A[i];if(!a)return;try{await publish({kind:'badge',text:String(a.n).slice(0,200),img:'',n:0,title:''});alert(t('اتنشر لأصدقائك','Posted to your friends'))}catch(e){alert(err(e))}}
async function feedScreen(who){
 scr(`<h2>📰 ${who?t('بوستاته','Posts'):t('الفيد','Feed')}</h2>${who?'':'<div id="fsb"></div>'}<div id="fd">${[1,2].map(()=>`<div class="sc-card"><div style="display:flex;gap:10px;align-items:center"><div class="sk" style="width:36px;height:36px;border-radius:50%"></div><div class="sk" style="height:14px;width:40%;border-radius:7px"></div></div><div class="sk" style="height:220px;border-radius:14px;margin-top:10px"></div></div>`).join('')}</div>${bad('')}${back('Soc.home()')}`,()=>feedScreen(who));if(!who)storyBar('fsb');
 try{const {fs,db}=FB;const ids=who?[who]:[me.uid].concat(FR);
  const all=[];await Promise.all(ids.map(async u=>{try{const r=await fs.getDocs(fs.query(fs.collection(db,'userPosts',u,'items'),fs.orderBy('ts','desc'),fs.limit(8)));r.docs.forEach(d=>all.push({id:d.id,u,d:d.data()}))}catch(e){}}));
  all.sort((a,b)=>((b.d.ts&&b.d.ts.toMillis&&b.d.ts.toMillis())||Date.now())-((a.d.ts&&a.d.ts.toMillis&&a.d.ts.toMillis())||Date.now()));
  const top=all.slice(0,20),ps={};await Promise.all([...new Set(top.map(p=>p.u))].map(async u=>{ps[u]=await getProf(u).catch(()=>null)}));
  const el=document.getElementById('fd');if(!el)return;
  el.innerHTML=top.length?top.map(p=>postCard(p,ps[p.u])).join(''):`<div class="sc-card" style="text-align:center"><div style="font-size:46px">📷</div><p>${t('الفيد فاضي. انشر أول صورة من ذكرياتك أو شارك إنجاز، وضيف أصدقاء يظهروا هنا.','Your feed is empty. Post your first memory or an achievement, and add friends to see theirs here.')}</p><div class="row"><button onclick="Soc.searchScreen()">🔎 ${t('دوّر على أصدقاء','Find friends')}</button></div></div>`;
  top.forEach(p=>loadLikes(p))}catch(e){say(err(e))}}
const LK={},tapT={};
function postCard(p,pr){const d=p.d,mine=p.u===me.uid,ms=d.ts&&d.ts.toMillis?d.ts.toMillis():Date.now();const k=p.u+'_'+p.id;
 return `<div class="sc-card sc-post" id="p_${k}" style="padding:12px"><div style="display:flex;align-items:center;gap:10px;cursor:pointer" onclick="Soc.profileScreen('${p.u}')">${av(pr||{},40)}<div style="flex:1"><b>${esc((pr||{}).name||'?')}</b><br><small style="color:#9fb4d0">${d.title?'📍 '+esc(d.title)+' · ':''}${ago(ms)}</small></div></div>
 ${d.kind==='badge'?`<div class="sc-bp" ondblclick="Soc.dbl('${p.u}','${p.id}')" onclick="Soc.dbl('${p.u}','${p.id}',1)"><div style="font-size:54px">🏅</div><div style="font-size:19px;font-weight:700" dir="auto">${esc(d.text)}</div><i class="sc-hrt" id="h_${k}">♥</i></div>`:`${/^data:image\/jpeg;base64,/.test(d.img||'')?`<div class="sc-pi" ondblclick="Soc.dbl('${p.u}','${p.id}')" onclick="Soc.dbl('${p.u}','${p.id}',1)"><img alt="" src="${d.img}"><i class="sc-hrt" id="h_${k}">♥</i></div>`:''}`}
 <div class="sc-act"><button id="lk_${k}" onclick="Soc.like('${p.u}','${p.id}')">♡ …</button><button onclick="Soc.comments('${p.u}','${p.id}')">💬</button><span style="flex:1"></span>${mine?`<button onclick="Soc.delPost('${p.id}')">🗑</button>`:`<button onclick="Soc.report('${p.u}','${p.id}')">⚑</button>`}</div>${d.kind!=='badge'&&d.text?`<p dir="auto" style="margin:6px 2px"><b>${esc((pr||{}).name||'')}</b> ${esc(d.text)}</p>`:''}<div id="cm_${k}"></div></div>`}
function dbl(u,id,single){const k=u+'_'+id,n=Date.now();if(single){if(tapT[k]&&n-tapT[k]<350){delete tapT[k];dbl(u,id)}else tapT[k]=n;return}
 const h=document.getElementById('h_'+k);if(h){h.classList.remove('go');void h.offsetWidth;h.classList.add('go')}if(!LK[k])like(u,id)}
async function loadLikes(p){const {fs,db}=FB,k=p.u+'_'+p.id;try{const r=await fs.getDocs(fs.collection(db,'userPosts',p.u,'items',p.id,'likes'));const mine=r.docs.some(d=>d.id===me.uid),b=document.getElementById('lk_'+k);LK[k]=mine;if(b){b.textContent=(mine?'♥ ':'♡ ')+r.size;b.classList.toggle('lk',mine)}}catch(e){}}
async function like(u,id){const {fs,db}=FB,ref=fs.doc(db,'userPosts',u,'items',id,'likes',me.uid);try{const d=await fs.getDoc(ref);if(d.exists())await fs.deleteDoc(ref);else await fs.setDoc(ref,{ts:Date.now()});loadLikes({u,id})}catch(e){alert(err(e))}}
async function comments(u,id){const k=u+'_'+id,el=document.getElementById('cm_'+k);if(!el)return;if(el.innerHTML){el.innerHTML='';return}const {fs,db}=FB;
 try{const r=await fs.getDocs(fs.query(fs.collection(db,'userPosts',u,'items',id,'comments'),fs.orderBy('ts'),fs.limit(50)));const ps={};await Promise.all([...new Set(r.docs.map(d=>d.data().uid))].map(async x=>{ps[x]=await getProf(x).catch(()=>null)}));
  el.innerHTML=r.docs.map(d=>{const c=d.data();return `<p style="margin:6px 0"><b>${esc((ps[c.uid]||{}).name||'?')}</b>: <span dir="auto">${esc(c.text)}</span>${(c.uid===me.uid||u===me.uid)?` <a href="#" onclick="Soc.delComment('${u}','${id}','${d.id}');return false">🗑</a>`:''}</p>`}).join('')+`<div class="row"><input id="ci_${k}" maxlength="300" placeholder="${t('اكتب تعليق','Write a comment')}" style="flex:1"><button style="width:auto" onclick="Soc.addComment('${u}','${id}')">➤</button></div>`}catch(e){el.innerHTML=esc(err(e))}}
async function addComment(u,id){const k=u+'_'+id,i=document.getElementById('ci_'+k),x=i.value.trim();if(!x)return;const {fs,db}=FB;try{await fs.addDoc(fs.collection(db,'userPosts',u,'items',id,'comments'),{uid:me.uid,text:x,ts:fs.serverTimestamp()});document.getElementById('cm_'+k).innerHTML='';comments(u,id)}catch(e){alert(err(e))}}
async function delComment(u,id,c){const {fs,db}=FB;try{await fs.deleteDoc(fs.doc(db,'userPosts',u,'items',id,'comments',c));const k=u+'_'+id;document.getElementById('cm_'+k).innerHTML='';comments(u,id)}catch(e){alert(err(e))}}
async function delPost(id){if(!confirm(t('تمسح البوست؟','Delete this post?')))return;const {fs,db}=FB;try{for(const sub of ['likes','comments']){const r=await fs.getDocs(fs.collection(db,'userPosts',me.uid,'items',id,sub));await Promise.all(r.docs.map(d=>fs.deleteDoc(d.ref)))}await fs.deleteDoc(fs.doc(db,'userPosts',me.uid,'items',id));const e=document.getElementById('p_'+me.uid+'_'+id);if(e)e.remove()}catch(e){alert(err(e))}}
async function report(u,id){const why=prompt(t('سبب الإبلاغ؟ (اختياري)','Why are you reporting this? (optional)'),'');if(why===null)return;const {fs,db}=FB;try{await fs.addDoc(fs.collection(db,'reports'),{by:me.uid,postUid:u,postId:id,reason:String(why).slice(0,300),ts:fs.serverTimestamp()});alert(t('وصلنا البلاغ. شكرا.','Report sent. Thank you.'))}catch(e){alert(err(e))}}



// ---------- profile ----------
const COVERS=['linear-gradient(135deg,#1c5fa8,#0b2a52)','linear-gradient(135deg,#e2b44c,#b9522a)','linear-gradient(135deg,#2fb6a0,#16507a)','linear-gradient(135deg,#8e4ec6,#2a2d7a)','linear-gradient(135deg,#e0527a,#f0a04b)','linear-gradient(135deg,#3a9d5d,#0b3d2e)'];
function head(p,sts,extra){const cv=COVERS[(p.cv|0)%COVERS.length];
 return `<div class="sc-card" style="padding-top:16px"><div class="sc-cov" style="background:${cv}"></div><div class="sc-ring"><div class="sc-av2">${av(p,80)}</div></div>
 <div style="text-align:center"><div class="sc-h" style="font-size:21px">${esc(p.name||'?')}</div><div dir="ltr" style="color:#9fb4d0">@${esc(p.handle||'')}</div>${p.bio?`<p dir="auto" style="margin:8px 6px;color:#f4e9c8;font-size:14px">${esc(p.bio)}</p>`:''}</div>
 <div class="sc-st">${sts.map(x=>`<div><b>${x[0]}</b><small>${x[1]}</small></div>`).join('')}</div>${extra||''}</div>`}
async function postCount(uid){const {fs,db}=FB;try{const r=await fs.getCountFromServer(fs.collection(db,'userPosts',uid,'items'));return r.data().count}catch(e){try{return (await fs.getDocs(fs.collection(db,'userPosts',uid,'items'))).size}catch(x){return 0}}}
async function postGrid(uid,elId){const {fs,db}=FB,el=document.getElementById(elId);if(!el)return;
 try{const r=await fs.getDocs(fs.query(fs.collection(db,'userPosts',uid,'items'),fs.orderBy('ts','desc'),fs.limit(9)));if(!document.getElementById(elId))return;
  el.innerHTML=r.docs.length?`<div class="sc-grid">${r.docs.map(d=>{const x=d.data();return /^data:image\/jpeg;base64,/.test(x.img||'')?`<div style="background-image:url(${x.img})" onclick="Soc.feedScreen('${uid}')"></div>`:`<div onclick="Soc.feedScreen('${uid}')" style="background:#13305e;font-size:30px">🏅</div>`}).join('')}</div>`:`<p style="text-align:center;opacity:.8">📷 ${t('لسه مفيش بوستات.','No posts yet.')}</p>`}catch(e){el.innerHTML=''}}
function badgeChips(){const A=(typeof achs==='function'?achs():[]).filter(x=>x.ok);return A.length?`<div class="sc-chips">${A.map(a=>`<span>🏅 ${esc(a.n)}</span>`).join('')}</div>`:`<p style="text-align:center;opacity:.8;margin:0">🔒 ${t('لسه مفيش بادجات. افتح حكايات!','No badges yet. Unlock some stories!')}</p>`}
async function profileScreen(uid){
 if(!uid||uid===me.uid)return hub();
 scr(`<div id="pf"><div class="sc-card"><p>…</p></div></div>${back('Soc.home()')}`,()=>profileScreen(uid));
 try{const p=await getProf(uid,true),st=await getStat(uid),pc=await postCount(uid).catch(()=>0),isF=FR.includes(uid),el=document.getElementById('pf');if(!el||!p)return;
  const nf=null;
  el.innerHTML=head(p,[[st?st.stories:'–',t('حكايات','Stories')],[st?st.badges:'–',t('بادجات','Badges')],[st?st.riddles:'–',t('ألغاز','Riddles')],[isF?pc:'–',t('بوستات','Posts')]],
   `<div class="row">${isF?`<button onclick="Soc.chat('${uid}')">💬 ${t('شات','Chat')}</button><button class="o" onclick="Soc.unfriend('${uid}')">${t('إزالة','Remove')}</button>`:`<button onclick="Soc.addFriend('${uid}',this)">${t('ابعت طلب تعارف','Send connection request')}</button>`}</div><div class="row"><button class="o" onclick="Soc.blockUser('${uid}')">🚫 ${t('حجب','Block')}</button><button class="o" onclick="Soc.reportUser('${uid}')">⚑ ${t('إبلاغ','Report')}</button></div>`)+(isF?`<div class="sc-card"><h3 style="margin-top:0">${t('البوستات','Posts')}</h3><div id="pg"></div></div>`:`<div class="sc-card"><p style="text-align:center;margin:0">🔒 ${t('البوستات بتظهر للأصدقاء بس.','Posts are visible to friends only.')}</p></div>`);
  if(isF)postGrid(uid,'pg')}catch(e){const el=document.getElementById('pf');if(el)el.innerHTML=`<div class="sc-card"><p>${esc(err(e))}</p></div>`}}
function editScreen(){const cv=prof.cv|0;
 scr(`<div class="sc-hero"><div class="sc-h">${t('تعديل البروفايل','Edit profile')}</div></div><div class="sc-card">
 <div class="sc-f"><label for="sn">${t('الاسم','Name')}</label><span class="sc-i">🙂</span><input id="sn" maxlength="30" value="${esc(prof.name)}"></div><div class="sc-e"></div>
 <div class="sc-f"><label for="sb">${t('نبذة عنك','Bio')}</label><textarea id="sb" rows="3" maxlength="160" style="padding:13px 14px" placeholder="${t('جملة عنك (اختياري)','A line about you (optional)')}">${esc(prof.bio||'')}</textarea></div>
 ${photoRow()}
 <div class="sc-f"><label>${t('لون الغلاف','Cover colour')}</label></div><div class="sc-emo">${COVERS.map((c,i)=>`<button type="button" class="${i==cv?'on':''}" style="background:${c};border:3px solid ${i==cv?'#e2b44c':'transparent'}" onclick="document.getElementById('scv').value=${i};this.parentNode.querySelectorAll('button').forEach(b=>b.style.borderColor='transparent');this.style.borderColor='#e2b44c'"></button>`).join('')}</div><input id="scv" type="hidden" value="${cv}">
 <div class="msg bad" id="smsg" style="display:none"></div><button class="sc-btn" id="seb" onclick="Soc.saveEdit()">${t('حفظ','Save')}</button></div>${back('Soc.home()')}`,()=>{});_ph=prof.ph||'';photoPrev()}
async function saveEdit(){const n=document.getElementById('sn').value.trim(),b=document.getElementById('sb').value.trim().slice(0,160),em=document.getElementById('sem').value,cv=+document.getElementById('scv').value|0;if(!n)return say(t('اكتب اسم','Enter a name'));
 busy('seb',true,t('بنحفظ','Saving'));try{const {fs,db}=FB;await fs.setDoc(fs.doc(db,'profiles',me.uid),Object.assign({handle:prof.handle,name:n.slice(0,30),emoji:em,bio:b,cv,ts:Date.now()},_ph?{ph:_ph}:{}));prof=await getProf(me.uid,true);hub()}catch(x){busy('seb',false);say(err(x))}}


// ---------- 24h stories (friends-only, photos in Firestore, expire after 24 hours) ----------
const DAY=864e5;let STO={},stoView=null;
const seenK=()=>JSON.parse(S0('hk_seen')||'{}');
async function loadStories(){const {fs,db}=FB,out={},cut=Date.now()-DAY;
 try{const r=await fs.getDocs(fs.query(fs.collection(db,'stories',me.uid,'items'),fs.orderBy('ts','desc'),fs.limit(10)));
  const L=r.docs.map(d=>({id:d.id,u:me.uid,d:d.data()})).filter(x=>x.d.ts&&x.d.ts.toMillis&&x.d.ts.toMillis()>cut).reverse();if(L.length)out[me.uid]=L;
  r.docs.forEach(d=>{const x=d.data();if(x.ts&&x.ts.toMillis&&x.ts.toMillis()<=cut)fs.deleteDoc(d.ref).catch(()=>{})})}catch(e){}
 try{const f=await fs.getDocs(fs.collection(db,'storyFeed',me.uid,'items'));
  await Promise.all(f.docs.map(async k=>{const m=k.data();if(m.ts<cut){fs.deleteDoc(k.ref).catch(()=>{});return}
   try{const d=await fs.getDoc(fs.doc(db,'stories',m.o,'items',m.id));if(!d.exists()){fs.deleteDoc(k.ref).catch(()=>{});return}const x=d.data();if(!x.ts||x.ts.toMillis()<=cut)return;(out[m.o]=out[m.o]||[]).push({id:m.id,u:m.o,d:x})}catch(e){}}));
  Object.keys(out).forEach(u=>out[u].sort((p,q)=>p.d.ts.toMillis()-q.d.ts.toMillis()))}catch(e){}
 STO=out;return out}
async function storyBar(elId){const el=document.getElementById(elId);if(!el)return;
 el.innerHTML=`<div class="sc-sb"><div class="sc-sbi"><div class="sk" style="width:62px;height:62px;border-radius:50%"></div></div></div>`;
 const st=await loadStories().catch(()=>({}));const e2=document.getElementById(elId);if(!e2)return;const seen=seenK();
 const ids=[me.uid].concat(FR.filter(u=>st[u])),ps=await Promise.all(ids.map(u=>u===me.uid?prof:getProf(u).catch(()=>null)));
 e2.innerHTML=`<div class="sc-sb">`+ids.map((u,i)=>{const L=st[u],mine=u===me.uid,last=L&&L[L.length-1],un=L&&!mine&&(!seen[u]||seen[u]<last.d.ts.toMillis());
  return `<div class="sc-sbi" onclick="${L?`Soc.openStory('${u}')`:`Soc.addStory()`}"><div class="sc-sr ${L?(un?'new':'old'):'add'}">${av(ps[i]||{},56)}${mine&&!L?'<i>+</i>':''}</div><small>${mine?t('قصتي','Your story'):esc((ps[i]||{}).name||'')}</small></div>`}).join('')+`</div>`}

// ---------- story editor ----------
const FILT=[['Original','none'],['Warm','sepia(.25) saturate(1.3) hue-rotate(-10deg)'],['Cool','saturate(1.1) hue-rotate(15deg) brightness(1.05)'],['B&W','grayscale(1) contrast(1.1)'],['Sepia','sepia(.9)'],['Vivid','saturate(1.8) contrast(1.1)'],['Fade','contrast(.85) brightness(1.15) saturate(.8)'],['Vintage','sepia(.4) contrast(.9) saturate(1.2) brightness(.95)']];
const BGS=[['#e2b44c','#b9522a'],['#1c5fa8','#0b2a52'],['#2fb6a0','#16507a'],['#8e4ec6','#2a2d7a'],['#e0527a','#f0a04b'],['#222','#000']];
const FONTS=['800 {s}px system-ui,sans-serif','700 {s}px Georgia,serif','700 {s}px "Noto Naskh Arabic",serif','900 {s}px Impact,"Arial Black",sans-serif'];
const COLS=['#ffffff','#000000','#e2b44c','#ee2a7b','#3ad1b8','#4d8dff'];
const EMOS=['😀','😍','😂','🔥','❤️','✨','👏','🎉','🌊','⚓','🚢','🐚','🦩','🌅','🏛','☕','🙌','😎','🥳','📍'];
let E=null;const EW=540,EH=960;
function edDraw(sel){if(!E)return;const c=E.c,x=c.getContext('2d');x.clearRect(0,0,EW,EH);
 if(E.img){tfClamp();x.save();x.filter=FILT[E.f][1];const g=tfGeo();x.translate(EW/2+E.ox,EH/2+E.oy);x.rotate(E.rot*Math.PI/2);x.drawImage(E.img,-E.img.width*g.r/2,-E.img.height*g.r/2,E.img.width*g.r,E.img.height*g.r);x.restore()}
 else{const g=x.createLinearGradient(0,0,EW,EH);g.addColorStop(0,BGS[E.bg][0]);g.addColorStop(1,BGS[E.bg][1]);x.fillStyle=g;x.fillRect(0,0,EW,EH)}
 x.drawImage(E.pen,0,0);
 E.items.forEach((it,i)=>{x.save();x.translate(it.x,it.y);x.textAlign='center';x.textBaseline='middle';
  if(it.k=='e'){x.font=it.s+'px serif';x.fillText(it.txt,0,0)}else{x.font=FONTS[it.font].replace('{s}',it.s);x.lineJoin='round';x.lineWidth=Math.max(3,it.s/8);x.strokeStyle=it.col=='#000000'?'#fff':'#000';x.strokeText(it.txt,0,0);x.fillStyle=it.col;x.fillText(it.txt,0,0)}
  if(sel&&i==E.sel){const w=Math.max(it.s,x.measureText(it.txt).width)/2+10,h=it.s*.7;x.setLineDash([8,6]);x.strokeStyle='#e2b44c';x.lineWidth=2;x.strokeRect(-w,-h,w*2,h*2)}x.restore()})}
function tfGeo(){const sw=E.rot%2,w=sw?E.img.height:E.img.width,h=sw?E.img.width:E.img.height,r=Math.max(EW/w,EH/h)*E.z;return{r,w:w*r,h:h*r}}
function tfClamp(){if(!E.img)return;const g=tfGeo(),mx=Math.max(0,(g.w-EW)/2),my=Math.max(0,(g.h-EH)/2);E.ox=Math.max(-mx,Math.min(mx,E.ox));E.oy=Math.max(-my,Math.min(my,E.oy))}
function edZoom(v){E.z=Math.max(1,Math.min(5,+v));edDraw(E.sel>=0)}
function edRot(){E.rot=(E.rot+1)%4;E.ox=E.oy=0;edDraw();edPanel()}
function edTfReset(){E.z=1;E.ox=E.oy=0;E.rot=0;edDraw();edPanel()}
function edPt(ev){const r=E.c.getBoundingClientRect();return{x:(ev.clientX-r.left)*EW/r.width,y:(ev.clientY-r.top)*EH/r.height}}
function edHit(p){for(let i=E.items.length-1;i>=0;i--){const it=E.items[i],w=Math.max(it.s,it.txt.length*it.s*.5)/2+14,h=it.s*.7+8;if(Math.abs(p.x-it.x)<w&&Math.abs(p.y-it.y)<h)return i}return -1}
async function addStory(){if(!FB||!me||!prof)return;
 const e=document.createElement('div');e.className='sc-ed';e.id='sced';e.innerHTML=`<div class="sc-edh"><button onclick="Soc.edClose()">✕</button><b>${t('قصة جديدة','New story')}</b><span></span></div>
 <div style="flex:1;display:flex;align-items:center;justify-content:center;padding:10px"><div class="sc-edp"><div style="font-size:48px">📸</div><p>${t('اختار صورة أو اعمل قصة نص بس','Pick a photo or make a text-only story')}</p>
 <label class="sc-up">📷 ${t('صورة','Photo')}<input type="file" accept="image/*" style="display:none" onchange="Soc.edPick(this)"></label><button class="o" style="margin-top:10px" onclick="Soc.edStart(null)">Aa ${t('قصة نص','Text story')}</button></div></div>`;document.body.appendChild(e)}
function edPick(inp){const f=inp.files&&inp.files[0];if(!f)return;const im=new Image(),u=URL.createObjectURL(f);im.onload=()=>{edStart(im)};im.onerror=()=>alert(t('الصورة مش شغالة','Could not read the photo'));im.src=u}
function edStart(im){const e=document.getElementById('sced');if(!e)return;E={img:im,f:0,bg:0,z:1,ox:0,oy:0,rot:0,items:[],sel:-1,tool:'move',dur:30,aud:'all',except:[],pc:'#ffffff',pw:8,c:null,pen:document.createElement('canvas')};E.pen.width=EW;E.pen.height=EH;
 e.innerHTML=`<div class="sc-edh"><button onclick="Soc.edClose()">✕</button><b>${t('قصة جديدة','New story')}</b><button class="sc-go" id="edsh" onclick="Soc.edShare()">${t('نشر','Share')}</button></div>
 <div style="flex:1;min-height:0;display:flex;align-items:center;justify-content:center"><canvas id="edc" width="${EW}" height="${EH}"></canvas></div>
 <div class="sc-edt">${im?`<button onclick="Soc.edTool('c')"><span>⛶</span>${t('قص','Crop')}</button>`:''}<button onclick="Soc.edTool('f')"><span>🎨</span>${t('فلتر','Filter')}</button><button onclick="Soc.edText()"><span>Aa</span>${t('نص','Text')}</button><button onclick="Soc.edTool('e')"><span>😀</span>${t('استيكر','Sticker')}</button><button onclick="Soc.edTool('p')"><span>✏️</span>${t('رسم','Draw')}</button><button onclick="Soc.edTool('d')"><span>⏱</span><i id="edd">30s</i></button><button onclick="Soc.edTool('a')"><span>👥</span>${t('الجمهور','Audience')}</button></div><div class="sc-edx" id="edx"></div>`;
 E.c=document.getElementById('edc');let drag=null,last=null;
 const ptrs={};let pin=null,pan=null;
 E.c.onpointerdown=ev=>{const p=edPt(ev);try{E.c.setPointerCapture(ev.pointerId)}catch(e){}ptrs[ev.pointerId]=p;const ks=Object.keys(ptrs);if(E.tool=='p'){last=p;drag='pen';return}
  if(ks.length==2&&E.img){const a=ptrs[ks[0]],b=ptrs[ks[1]];pin={d:Math.hypot(a.x-b.x,a.y-b.y)||1,z:E.z};drag=null;pan=null;return}
  const i=E.tool=='c'?-1:edHit(p);E.sel=i;if(i>=0){drag={i,dx:E.items[i].x-p.x,dy:E.items[i].y-p.y};edPanel()}else{drag=null;if(E.img)pan={x:p.x,y:p.y,ox:E.ox,oy:E.oy}}edDraw(1)};
 E.c.onpointermove=ev=>{const p=edPt(ev);if(ptrs[ev.pointerId])ptrs[ev.pointerId]=p;if(pin){const ks=Object.keys(ptrs);if(ks.length>=2){const a=ptrs[ks[0]],b=ptrs[ks[1]];E.z=Math.max(1,Math.min(5,pin.z*Math.hypot(a.x-b.x,a.y-b.y)/pin.d));edDraw(E.sel>=0)}return}
  if(drag=='pen'){const x=E.pen.getContext('2d');x.strokeStyle=E.pc;x.lineWidth=E.pw;x.lineCap='round';x.beginPath();x.moveTo(last.x,last.y);x.lineTo(p.x,p.y);x.stroke();last=p;edDraw();return}if(drag&&drag.i>=0){E.items[drag.i].x=p.x+drag.dx;E.items[drag.i].y=p.y+drag.dy;edDraw(1);return}
  if(pan&&ptrs[ev.pointerId]){E.ox=pan.ox+(p.x-pan.x);E.oy=pan.oy+(p.y-pan.y);edDraw(E.sel>=0)}};
 E.c.onwheel=ev=>{if(!E.img)return;ev.preventDefault();edZoom(E.z*(ev.deltaY<0?1.1:.9));edPanel()};
 E.c.onpointerup=E.c.onpointercancel=ev=>{delete ptrs[ev.pointerId];if(Object.keys(ptrs).length<2)pin=null;drag=null;pan=null;edPanel()};
 edDraw();edTool(im?'f':'b')}
function edTool(k){if(!E)return;E.tool=k=='p'?'p':'move';E.pt=k;edPanel()}
function edPanel(){const el=document.getElementById('edx');if(!el||!E)return;const k=E.pt,it=E.items[E.sel];let h='';
 if(it&&E.tool!='p'){h+=`<div class="sc-edr"><input type="range" min="${it.k=='e'?40:20}" max="${it.k=='e'?260:140}" value="${it.s}" oninput="Soc.edSize(this.value)" style="flex:1"><button onclick="Soc.edDel()">🗑</button></div>`;
  if(it.k=='t')h+=`<div class="sc-edr">${FONTS.map((f,i)=>`<button class="${it.font==i?'on':''}" onclick="Soc.edFont(${i})">Aa${i+1}</button>`).join('')}</div><div class="sc-edr">${COLS.map(c=>`<i class="sw ${it.col==c?'on':''}" style="background:${c}" onclick="Soc.edCol('${c}')"></i>`).join('')}</div>`}
 if(k=='c'&&E.img)h+=`<div class="sc-edr"><button onclick="Soc.edRot()">⟳ ${t('لف','Rotate')}</button><span>🔍</span><input type="range" id="edz" min="1" max="5" step="0.01" value="${E.z}" oninput="Soc.edZoom(this.value)" style="flex:1"><button onclick="Soc.edTfReset()">↺</button></div><small style="color:#9fb4d0">${t('اسحب الصورة عشان تحركها، وافتح صباعين للتكبير.','Drag to move the photo, pinch with two fingers to zoom.')}</small>`;
 if(k=='f')h+=`<div class="sc-edr sc-sc2">${FILT.map((f,i)=>`<button class="${E.f==i?'on':''}" onclick="Soc.edFilt(${i})">${f[0]}</button>`).join('')}</div>`;
 if(k=='b')h+=`<div class="sc-edr">${BGS.map((g,i)=>`<i class="sw ${E.bg==i?'on':''}" style="background:linear-gradient(135deg,${g[0]},${g[1]})" onclick="Soc.edBg(${i})"></i>`).join('')}</div>`;
 if(k=='e')h+=`<div class="sc-edr sc-sc2">${EMOS.map(x=>`<button onclick="Soc.edEmo('${x}')" style="font-size:26px">${x}</button>`).join('')}</div>`;
 if(k=='p')h+=`<div class="sc-edr">${COLS.map(c=>`<i class="sw ${E.pc==c?'on':''}" style="background:${c}" onclick="Soc.edPen('${c}')"></i>`).join('')}<input type="range" min="3" max="30" value="${E.pw}" oninput="Soc.edPw(this.value)" style="flex:1"><button onclick="Soc.edClr()">↺</button></div>`;
 if(k=='d')h+=`<div class="sc-edr">${[30,45,60].map(d=>`<button class="${E.dur==d?'on':''}" onclick="Soc.edDur(${d})">${d}s</button>`).join('')}<small style="flex:1;color:#9fb4d0">${t('مدة ظهور القصة. الصلاحية ٢٤ ساعة.','Display time per viewer. It lasts 24 h.')}</small></div>`;
 if(k=='a')h+=`<div class="sc-edr">${[['all',t('كل الأصدقاء','All friends')],['close',t('المقربين','Close friends')],['except',t('إلا ناس','All except')]].map(a=>`<button class="${E.aud==a[0]?'on':''}" onclick="Soc.edAud('${a[0]}')">${a[1]}</button>`).join('')}</div><div id="edl"></div>`;
 el.innerHTML=h;if(k=='a')edList()}
async function edList(){const el=document.getElementById('edl');if(!el||E.aud=='all')return;el.innerHTML='…';if(!E.close){try{const {fs,db}=FB,d=await fs.getDoc(fs.doc(db,'closeFriends',me.uid));E.close=d.exists()?d.data().list:[]}catch(e){E.close=[]}}
 const ids=FR,ps=await Promise.all(ids.map(u=>getProf(u).catch(()=>null)));if(!document.getElementById('edl'))return;const set=E.aud=='close'?E.close:E.except;
 document.getElementById('edl').innerHTML=ids.length?`<div class="sc-edr" style="flex-wrap:wrap;max-height:120px;overflow:auto">`+ids.map((u,i)=>`<label class="sc-pk ${set.includes(u)?'on':''}" onclick="Soc.edPk('${u}')">${av(ps[i],24)} ${esc((ps[i]||{}).name||'?')}</label>`).join('')+`</div><small style="color:#9fb4d0">${E.aud=='close'?t('المقربين بس هيشوفوها.','Only the people you pick will see it.'):t('الناس دي مش هتشوفها.','The people you pick will not see it.')}</small>`:`<small>${t('ضيف أصدقاء الأول.','Add friends first.')}</small>`}
function edPk(u){const set=E.aud=='close'?E.close:E.except,i=set.indexOf(u);if(i>=0)set.splice(i,1);else set.push(u);edList()}
function edAud(a){E.aud=a;edPanel()}
function edFilt(i){E.f=i;edDraw();edPanel()}
function edBg(i){E.bg=i;edDraw();edPanel()}
function edDur(d){E.dur=d;document.getElementById('edd').textContent=d+'s';edPanel()}
function edText(){const v=prompt(t('اكتب النص','Type your text'),'');if(!v||!v.trim())return;E.items.push({k:'t',x:EW/2,y:EH/2,s:64,txt:v.trim().slice(0,60),font:0,col:'#ffffff'});E.sel=E.items.length-1;E.tool='move';E.pt='t';edDraw(1);edPanel()}
function edEmo(x){E.items.push({k:'e',x:EW/2,y:EH/2,s:120,txt:x});E.sel=E.items.length-1;edDraw(1);edPanel()}
function edSize(v){const it=E.items[E.sel];if(it){it.s=+v;edDraw(1)}}
function edFont(i){const it=E.items[E.sel];if(it){it.font=i;edDraw(1);edPanel()}}
function edCol(c){const it=E.items[E.sel];if(it){it.col=c;edDraw(1);edPanel()}}
function edDel(){E.items.splice(E.sel,1);E.sel=-1;edDraw();edPanel()}
function edPen(c){E.pc=c;edPanel()}function edPw(v){E.pw=+v}function edClr(){E.pen.getContext('2d').clearRect(0,0,EW,EH);edDraw()}
function edClose(){const e=document.getElementById('sced');if(e)e.remove();E=null}
async function edShare(){if(!E)return;if(!E.img&&!E.items.length&&!confirm(t('القصة فاضية. تنشر؟','The story is empty. Post anyway?')))return;
 const cap=''; E.sel=-1;edDraw();let q=.82,img='';for(let i=0;i<6;i++){img=E.c.toDataURL('image/jpeg',q);if(img.length<=250000)break;q-=.12}
 if(img.length>255000)return alert(t('الصورة تقيلة. جرب صورة تانية.','Image too large. Try another photo.'));
 const {fs,db}=FB;let rec=FR.slice();if(E.aud=='close'){if(!E.close)await edList();rec=rec.filter(u=>(E.close||[]).includes(u))}else if(E.aud=='except')rec=rec.filter(u=>!E.except.includes(u));
 if(E.aud=='close'&&!rec.length)return alert(t('اختار ناس من المقربين الأول.','Pick some close friends first.'));
 const b=document.getElementById('edsh');busy('edsh',true,t('بننشر','Posting'));
 try{if(E.aud=='close'&&E.close)await fs.setDoc(fs.doc(db,'closeFriends',me.uid),{list:E.close});
  const ref=fs.doc(fs.collection(db,'stories',me.uid,'items')),mk=async dur=>{const bt=fs.writeBatch(db);bt.set(ref,{uid:me.uid,img,cap,ts:fs.serverTimestamp(),dur,aud:E.aud});
  rec.forEach(u=>bt.set(fs.doc(db,'storyFeed',u,'items',me.uid+'_'+ref.id),{o:me.uid,id:ref.id,ts:Date.now()}));await bt.commit()};try{await mk(E.dur)}catch(e){if(E.dur>15&&/permission/i.test(String(e&&(e.code||e.message))))await mk(15);else throw e}
  const n=rec.length;edClose();alert(t('اتنشرت قصتك لـ ','Your story is live for ')+n+t(' صديق لمدة ٢٤ ساعة',' friend(s) for 24 hours'));if(view)view()}catch(e){busy('edsh',false);alert(err(e))}}
function closeStory(){if(stoView){clearTimeout(stoView.t);stoView.el.remove();stoView=null}}
async function openStory(u){const L=STO[u];if(!L||!L.length)return;closeStory();const el=document.createElement('div');el.className='sc-sv';document.body.appendChild(el);stoView={el,u,i:0,t:null};showStory()}
async function showStory(){const v=stoView;if(!v)return;const L=STO[v.u];if(v.i>=L.length){closeStory();return}const x=L[v.i],p=v.u===me.uid?prof:await getProf(v.u).catch(()=>({})),mine=v.u===me.uid;
 v.el.innerHTML=`<div class="sc-sp">${L.map((_,k)=>`<i class="${k<v.i?'d':k==v.i?'a':''}">${k==v.i?`<u style="animation-duration:${(x.d.dur||30)}s"></u>`:''}</i>`).join('')}</div><div class="sc-sh">${av(p,34)}<b>${esc((p||{}).name||'')}</b><small>${esc(x.d.ts.toDate().toLocaleTimeString(EN?'en-GB':'ar-EG',{hour:'2-digit',minute:'2-digit'}))}</small><button onclick="Soc.closeStory()">✕</button></div>
 <img src="${/^data:image\/jpeg;base64,/.test(x.d.img||'')?x.d.img:''}" alt=""><div class="sc-sc">${esc(x.d.cap||'')}</div><div class="sc-nv"><div onclick="Soc.stepStory(-1)"></div><div onclick="Soc.stepStory(1)"></div></div>
 ${mine?`<div class="sc-sf"><button onclick="Soc.storyViews('${x.id}')">👁 ${t('المشاهدات','Viewers')}</button><button onclick="Soc.delStory('${x.id}')">🗑</button></div>`:''}`;
 clearTimeout(v.t);v.t=setTimeout(()=>stepStory(1),(x.d.dur||30)*1000);
 const sn=seenK();sn[v.u]=x.d.ts.toMillis();localStorage.setItem('hk_seen',JSON.stringify(sn));
 if(!mine){try{const {fs,db}=FB;fs.setDoc(fs.doc(db,'stories',v.u,'items',x.id,'views',me.uid),{ts:Date.now()}).catch(()=>{})}catch(e){}}}
function stepStory(d){const v=stoView;if(!v)return;v.i+=d;if(v.i<0)v.i=0;showStory()}
async function storyViews(id){const v=stoView;if(!v)return;clearTimeout(v.t);const {fs,db}=FB;try{const r=await fs.getDocs(fs.collection(db,'stories',me.uid,'items',id,'views')),ps=await Promise.all(r.docs.map(d=>getProf(d.id).catch(()=>null)));
 alert(t('شافوها: ','Viewed by: ')+(ps.length?ps.map(p=>(p||{}).name||'?').join('، '):t('لسه محدش','nobody yet')))}catch(e){alert(err(e))}}
async function delStory(id){if(!confirm(t('تمسح القصة؟','Delete this story?')))return;const {fs,db}=FB;try{await fs.deleteDoc(fs.doc(db,'stories',me.uid,'items',id));closeStory();if(view)view()}catch(e){alert(err(e))}}


// ---------- tabs ----------
async function tab(k){if(!FB||!me||!prof){await open();if(!me||!prof)return}
 if(k=='feed')feedScreen();else if(k=='chat')chatsScreen();else home()}
function ago(ms){const m=Math.round((Date.now()-ms)/60000);if(m<1)return t('دلوقتي','now');if(m<60)return m+t(' د',' m');const h=Math.round(m/60);if(h<24)return h+t(' س',' h');return Math.round(h/24)+t(' يوم',' d')}
async function chatsScreen(){scr(`<h2>💬 ${t('الشات','Chats')}</h2><div id="cl"><div class="sc-card"><div class="sk" style="height:48px;border-radius:12px;margin:6px 0"></div><div class="sk" style="height:48px;border-radius:12px;margin:6px 0"></div></div></div>${back('Soc.home()')}`,()=>chatsScreen());
 try{const {fs,db}=FB,rows=await Promise.all(FR.map(async u=>{const p=await getProf(u).catch(()=>null);let m=null;try{const r=await fs.getDocs(fs.query(fs.collection(db,'chats',[me.uid,u].sort().join('_'),'messages'),fs.orderBy('ts','desc'),fs.limit(1)));if(r.docs.length)m=r.docs[0].data()}catch(e){}return{u,p,m}}));
  rows.sort((a,b)=>((b.m&&b.m.ts&&b.m.ts.toMillis&&b.m.ts.toMillis())||0)-((a.m&&a.m.ts&&a.m.ts.toMillis&&a.m.ts.toMillis())||0));
  const el=document.getElementById('cl');if(!el)return;
  el.innerHTML=rows.length?`<div class="sc-card" style="padding:6px 12px">`+rows.map(r=>`<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #1c3a6b;cursor:pointer" onclick="Soc.chat('${r.u}')">${av(r.p,46)}<div style="flex:1;min-width:0"><b>${esc((r.p||{}).name||'?')}</b><br><small style="color:#9fb4d0;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" dir="auto">${r.m?(r.m.from===me.uid?t('إنت: ','You: '):'')+esc(r.m.text):t('ابدأ المحادثة 👋','Say hi 👋')}</small></div><small style="color:#9fb4d0">${r.m&&r.m.ts&&r.m.ts.toMillis?ago(r.m.ts.toMillis()):''}</small></div>`).join('')+`</div>`:`<div class="sc-card" style="text-align:center"><div style="font-size:44px">💬</div><p>${t('لسه معندكش أصدقاء تتكلم معاهم. دوّر على ناس أو شوف مين قريب منك.','No friends to chat with yet. Find people or see who is nearby.')}</p><div class="row"><button onclick="Soc.searchScreen()">🔎 ${t('دوّر','Find')}</button><button class="o" onclick="Soc.nearScreen()">👀 ${t('قريبين','Nearby')}</button></div></div>`}catch(e){say(err(e))}}

// ---------- block / report people ----------
async function getBlocks(){const {fs,db}=FB;const r=await fs.getDocs(fs.collection(db,'blocks',me.uid,'list'));return r.docs.map(d=>d.id)}
async function blockUser(uid){if(!confirm(t('تحجب الشخص ده؟ هيتشال من أصدقائك ومش هيقدر يبعتلك طلب أو رسالة ولا يشوفك قريب منه.','Block this person? They are removed from your friends and can no longer send you requests or messages, or see you nearby.')))return;
 try{const {fs,db}=FB,b=fs.writeBatch(db);b.set(fs.doc(db,'blocks',me.uid,'list',uid),{ts:Date.now()});b.delete(fs.doc(db,'friends',me.uid,'list',uid));b.delete(fs.doc(db,'friends',uid,'list',me.uid));b.delete(fs.doc(db,'requests',me.uid,'from',uid));b.delete(fs.doc(db,'requests',uid,'from',me.uid));await b.commit();alert(t('اتحجب.','Blocked.'));if(view)view()}catch(e){alert(err(e))}}
async function unblock(uid){try{const {fs,db}=FB;await fs.deleteDoc(fs.doc(db,'blocks',me.uid,'list',uid));blockedScreen()}catch(e){alert(err(e))}}
async function reportUser(uid){const why=prompt(t('سبب الإبلاغ عن الشخص ده؟','Why are you reporting this person?'),'');if(why===null)return;const {fs,db}=FB;try{await fs.addDoc(fs.collection(db,'reports'),{by:me.uid,postUid:uid,postId:'profile',reason:String(why).slice(0,300),ts:fs.serverTimestamp()});alert(t('وصلنا البلاغ. شكرا.','Report sent. Thank you.'))}catch(e){alert(err(e))}}
async function blockedScreen(){scr(`<h2>🚫 ${t('المحجوبين','Blocked people')}</h2><div id="bl" class="box"><p>…</p></div>${back('Soc.home()')}`,()=>{});
 try{const ids=await getBlocks(),ps=await Promise.all(ids.map(i=>getProf(i).catch(()=>null)));const el=document.getElementById('bl');if(!el)return;
  el.innerHTML=ids.length?ids.map((i,k)=>`<div style="display:flex;align-items:center;gap:8px;margin:8px 0"><div style="flex:1">${av((ps[k]||{}))} <b>${esc((ps[k]||{}).name||'?')}</b><br><small dir="ltr">@${esc((ps[k]||{}).handle||'')}</small></div><button class="o" style="width:auto;margin:0" onclick="Soc.unblock('${i}')">${t('إلغاء الحجب','Unblock')}</button></div>`).join(''):`<p>${t('محدش محجوب.','Nobody is blocked.')}</p>`}catch(e){say(err(e))}}

// ---------- people nearby (opt-in, approximate, only while the app is open) ----------
let lastNear=0,nearMk={},nearT=null,myPos=null;
const rnd2=x=>Math.round(x*100)/100;
async function nearPush(lat,lon){if(!FB||!me||!prof||!flag('hk_soc_near'))return;const now=Date.now();if(now-lastNear<60000)return;lastNear=now;try{const {fs,db}=FB;await fs.setDoc(fs.doc(db,'nearby',me.uid),{lat:rnd2(lat),lon:rnd2(lon),ts:now})}catch(e){}}
async function nearStop(){if(!FB||!me)return;lastNear=0;try{const {fs,db}=FB;await fs.deleteDoc(fs.doc(db,'nearby',me.uid))}catch(e){}}
function nearClear(){Object.values(nearMk).forEach(m=>map.removeLayer(m));nearMk={}}
document.addEventListener('visibilitychange',()=>{if(document.hidden)nearStop()});window.addEventListener('pagehide',()=>{nearStop()});
function myP(){const p=typeof SPOS==='function'&&SPOS();return p||myPos}
async function loadNear(){const p=myP();if(!p)return{err:t('الموقع مش متاح. افتح الـGPS.','Location not available. Turn on GPS.')};myPos=p;
 const {fs,db}=FB,la=rnd2(p.lat),lo=rnd2(p.lon);
 const r=await fs.getDocs(fs.query(fs.collection(db,'nearby'),fs.where('lat','>=',la-0.06),fs.where('lat','<=',la+0.06),fs.limit(60)));
 const blocked=new Set(await getBlocks()),out=[];
 for(const d of r.docs){const x=d.data(),u=d.id;if(u===me.uid||blocked.has(u)||Date.now()-x.ts>10*60000||Math.abs(x.lon-lo)>0.08)continue;
  try{const g=await fs.getDoc(fs.doc(db,'blocks',u,'list',me.uid));if(g.exists())continue}catch(e){}
  const km=Math.hypot((x.lat-la)*111,(x.lon-lo)*111*Math.cos(la*Math.PI/180));out.push({u,x,km})}
 out.sort((a,b)=>a.km-b.km);const ps=await Promise.all(out.map(o=>getProf(o.u).catch(()=>null)));out.forEach((o,i)=>o.p=ps[i]);return{list:out.filter(o=>o.p)}}
function nearMarkers(list){nearClear();list.forEach(o=>{nearMk[o.u]=L.marker([o.x.lat,o.x.lon],{icon:L.divIcon({className:'',html:`<div class="nmk">${av(o.p)}<span>${esc(o.p.name||'')}</span></div>`,iconSize:[1,1]}),zIndexOffset:700}).addTo(map).on('click',()=>nearScreen())})}
function nearKm(k){return k<2?t('أقل من ٢ كم','under 2 km'):t('حوالي ','about ')+Math.round(k)+t(' كم',' km')}
async function nearScreen(){
 const on=flag('hk_soc_near');
 scr(`<h2>👀 ${t('ناس قريبة','People nearby')}</h2>
 <div class="box"><p>${t('مقفولة بشكل افتراضي. لما تفتحها، أي مستخدم للتطبيق قريب منك يشوفك على الخريطة بمكان تقريبي (حوالي كم، مش العنوان) وإنت فاتح التطبيق بس. تختفي أول ما تقفل التطبيق أو الخاصية. لو عايز أصدقاءك بس، استخدم "مشاركة موقعي" في صفحة الأصدقاء.','Off by default. When on, other app users near you see you on the map at an approximate spot (about 1 km, never your address), only while the app is open. You disappear when you close the app or switch this off. For friends only, use "Share my location" on the Friends page.')}</p>
 <button class="${on?'':'o'}" onclick="Soc.togNear()">${on?t('ظاهر للناس القريبة ✓ (اضغط للإخفاء)','Visible to people nearby ✓ (tap to hide)'):t('خليني ظاهر للناس القريبة','Make me visible nearby')}</button></div>
 <div class="box" style="border:1px solid #e2b44c"><p>🛡 ${t('نصيحة أمان: أول لقاء يكون في مكان عام ومزدحم، وخد صاحب معاك، ومتشاركش عنوان بيتك. تقدر تحجب أو تبلّغ عن أي حد.','Safety: meet for the first time in a busy public place, bring a friend, and never share your home address. You can block or report anyone.')}</p></div>
 <div id="nl" class="box"><p>…</p></div>${back('Soc.home()')}`,()=>nearScreen());
 try{const r=await loadNear(),el=document.getElementById('nl');if(!el)return;
  if(r.err){el.innerHTML=`<p>${esc(r.err)}</p>`;return}
  nearMarkers(r.list);const fr=new Set(FR);
  el.innerHTML=r.list.length?r.list.map(o=>`<div style="margin:10px 0;padding-bottom:10px;border-bottom:1px solid #1c3a6b"><div>${av(o.p)} <b>${esc(o.p.name)}</b> <small dir="ltr">@${esc(o.p.handle)}</small><br><small>${nearKm(o.km)}</small></div>
   <div class="row">${fr.has(o.u)?`<button onclick="Soc.chat('${o.u}')">💬 ${t('شات','Chat')}</button>`:`<button onclick="Soc.addFriend('${o.u}',this)">${t('ابعت طلب تعارف','Send connection request')}</button>`}<button class="o" style="width:auto" onclick="Soc.blockUser('${o.u}')">🚫</button><button class="o" style="width:auto" onclick="Soc.reportUser('${o.u}')">⚑</button></div></div>`).join('')+`<p><small>${t('الشات بيتفتح بعد ما الطرف التاني يقبل الطلب.','Chat opens only after the other person accepts your request.')}</small></p>`:`<p>${t('مفيش حد ظاهر قريب منك دلوقتي.','Nobody is visible near you right now.')}</p>`}catch(e){say(err(e))}}
async function togNear(){if(flag('hk_soc_near')){setFlag('hk_soc_near',false);await nearStop();nearClear()}else{if(!confirm(t('أي مستخدم قريب منك هيشوفك بمكان تقريبي (حوالي كم) طول ما التطبيق مفتوح. تقدر تقفلها في أي وقت. تفتحها؟','Other users near you will see you at an approximate spot (about 1 km) while the app is open. You can turn it off anytime. Turn it on?')))return;setFlag('hk_soc_near',true);lastNear=0;const p=myP();if(p&&!FAKE)nearPush(p.lat,p.lon)}nearScreen()}

// ---------- delete account ----------
async function delAcct(){if(!confirm(t('هتمسح حسابك وكل بياناتك (البروفايل، الأصدقاء، الترتيب، المكان). مفيش رجوع. تكمل؟','This deletes your account and all your data (profile, friends, leaderboard, location). It cannot be undone. Continue?')))return;
 try{const {fs,db,au,auth}=FB,uid=me.uid;await stopLoc();await nearStop();try{const ps=await fs.getDocs(fs.collection(db,'userPosts',uid,'items'));for(const d of ps.docs){for(const sub of ['likes','comments']){const r=await fs.getDocs(fs.collection(db,'userPosts',uid,'items',d.id,sub));await Promise.all(r.docs.map(x=>fs.deleteDoc(x.ref)))}await fs.deleteDoc(d.ref)}const bl=await fs.getDocs(fs.collection(db,'blocks',uid,'list'));await Promise.all(bl.docs.map(x=>fs.deleteDoc(x.ref)))}catch(e){}const b=fs.writeBatch(db);FR.forEach(f=>{b.delete(fs.doc(db,'friends',f,'list',uid));b.delete(fs.doc(db,'friends',uid,'list',f))});b.delete(fs.doc(db,'stats',uid));if(prof)b.delete(fs.doc(db,'handles',prof.handle));await b.commit();await fs.deleteDoc(fs.doc(db,'profiles',uid));await au.deleteUser(auth.currentUser);cache.prof={};alert(t('اتمسح حسابك','Account deleted'));openMenu()}catch(x){alert(err(x))}}

return{edZoom,edRot,edTfReset,typing,dbl,edClose,edPick,edStart,edTool,edText,edEmo,edSize,edFont,edCol,edDel,edPen,edPw,edClr,edFilt,edBg,edDur,edAud,edPk,edShare,tab,chatsScreen,addStory,openStory,closeStory,stepStory,storyViews,delStory,pickPhoto,rmPhoto,profileScreen,editScreen,saveEdit,pickEmo,hv,vf,open,home,nearScreen,togNear,blockUser,unblock,reportUser,blockedScreen,feedScreen,postMemory,postBadge,like,comments,addComment,delComment,delPost,report,authScreen,doAuth,reset,signOut,saveProf,editName,searchScreen,doSearch,addFriend,accept,decline,unfriend,chat,send,togLoc,hideNow,togMap,togStats,sugScreen,sugHere,sugSend,delAcct,sync,onPos,get user(){return me},get profile(){return prof},_fb:()=>FB}
})();
