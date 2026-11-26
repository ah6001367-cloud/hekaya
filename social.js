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
.sc-ring{width:92px;height:92px;border-radius:50%;padding:3px;background:conic-gradient(#f9ce34,#ee2a7b,#6228d7,#f9ce34);margin:-46px auto 6px;position:relative}.sc-av2{width:100%;height:100%;border-radius:50%;background:#0b1a33;border:3px solid #0e2142;box-sizing:border-box;display:flex;align-items:center;justify-content:center;font-size:44px}.sc-emo{display:flex;flex-wrap:wrap;gap:6px;justify-content:center}.sc-emo button{width:48px;flex:none;min-height:48px;font-size:24px;padding:0;background:#0b1a33}.sc-emo button.on{background:#e2b44c}
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

const EMOJIS=['🙂','😎','🧭','⚓','🐚','🌊','🦩','🚢','🎩','🌙'];
function pickEmo(x,btn){document.getElementById('sem').value=x;btn.parentNode.querySelectorAll('button').forEach(b=>b.classList.remove('on'));btn.classList.add('on')}
function emoRow(cur){return `<div class="sc-emo">${EMOJIS.map(x=>`<button type="button" class="${x==cur?'on':''}" onclick="Soc.pickEmo('${x}',this)">${x}</button>`).join('')}</div><input id="sem" type="hidden" value="${cur}">`}
function hv(){const h=document.getElementById('sh'),e=document.getElementById('she');if(!h)return;const v=h.value.trim().replace(/^@/,'');if(v&&!/^[a-zA-Z0-9_]{3,20}$/.test(v)){e.textContent=t('٣ لـ ٢٠ حرف إنجليزي أو رقم أو _','3-20 letters a-z, digits or _');h.classList.add('bad')}else{e.textContent='';h.classList.remove('bad')}}
function setupScreen(){
 scr(`<div class="sc-hero"><div class="sc-logo">${t('👋','👋')}</div><div class="sc-h">${t('اعمل بروفايلك','Set up your profile')}</div><p class="sc-sub">${t('الاسم والـ@يوزر بيظهروا لأي حد يدوّر عليك. الإيميل والموبايل عمرهم ما بيظهروا.','Your name and @handle are visible to people who search for you. Your email and phone are never shown.')}</p></div>
 <div class="sc-card"><div class="sc-f"><label for="sh">${t('اليوزر','Handle')}</label><span class="sc-i">@</span><input id="sh" placeholder="${t('مثال: ahmed_ps','e.g. ahmed_ps')}" dir="ltr" maxlength="20" autocapitalize="none" oninput="Soc.hv()"></div><div class="sc-e" id="she"></div>
 <div class="sc-f"><label for="sn">${t('الاسم اللي يظهر','Display name')}</label><span class="sc-i">🙂</span><input id="sn" maxlength="30" placeholder="${t('اسمك','Your name')}"></div><div class="sc-e"></div>
 <div class="sc-f"><label>${t('الصورة الرمزية','Avatar')}</label></div>${emoRow('🙂')}
 <div class="msg bad" id="smsg" style="display:none"></div><button class="sc-btn" id="ssb" onclick="Soc.saveProf()">${t('حفظ وابدأ','Save and start')}</button></div>
 <div style="text-align:center"><button class="sc-link" onclick="Soc.signOut()">${t('تسجيل خروج','Sign out')}</button></div>`,()=>home())}
async function saveProf(){const h=document.getElementById('sh').value.trim().toLowerCase().replace(/^@/,''),n=document.getElementById('sn').value.trim(),em=document.getElementById('sem').value;
 if(!/^[a-z0-9_]{3,20}$/.test(h))return say(t('اليوزر ٣ لـ ٢٠ حرف إنجليزي أو رقم أو _','Handle: 3-20 letters a-z, digits or _'));if(!n)return say(t('اكتب اسم','Enter a name'));
 busy('ssb',true,t('بنحفظ','Saving'));try{const {fs,db}=FB,uid=me.uid;
  await fs.runTransaction(db,async tx=>{const hd=await tx.get(fs.doc(db,'handles',h));if(hd.exists()&&hd.data().uid!==uid)throw new Error(t('اليوزر ده واخده حد','That handle is taken'));tx.set(fs.doc(db,'handles',h),{uid});tx.set(fs.doc(db,'profiles',uid),{handle:h,name:n,emoji:em,ts:Date.now()})});
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
  el.innerHTML=`<div class="box" style="border:1px solid #e2b44c"><h3>${t('طلبات صداقة','Friend requests')}</h3>`+ids.map((i,k)=>`<p>${esc((ps[k]||{}).emoji||'🙂')} <b>${esc((ps[k]||{}).name||'?')}</b> <small dir="ltr">@${esc((ps[k]||{}).handle||'')}</small></p><div class="row"><button onclick="Soc.accept('${i}')">${t('قبول','Accept')}</button><button class="o" onclick="Soc.decline('${i}')">${t('رفض','Decline')}</button></div>`).join('')+`</div>`},e=>{}));
 unsubs.push(fs.onSnapshot(fs.collection(db,'friends',uid,'list'),async snap=>{FR=snap.docs.map(d=>d.id);await renderFriends();if(flag('hk_soc_map'))startMap()},e=>{}))}
let FR=[];
async function renderFriends(){const el=document.getElementById('sfr'),lb=document.getElementById('slb');if(!el)return;
 if(!FR.length){el.innerHTML=`<p>${t('لسه مفيش أصدقاء. دوّر على حد بالـ@يوزر.','No friends yet. Search by @handle.')}</p>`;lb.innerHTML=`<p>${t('ضيف أصدقاء الأول.','Add friends first.')}</p>`;return}
 const ps=await Promise.all(FR.map(i=>getProf(i).catch(()=>null))),ss=await Promise.all(FR.map(getStat));
 el.innerHTML=FR.map((i,k)=>`<div style="display:flex;align-items:center;gap:8px;margin:8px 0"><div style="flex:1;cursor:pointer" onclick="Soc.profileScreen('${i}')">${esc((ps[k]||{}).emoji||'🙂')} <b>${esc((ps[k]||{}).name||'?')}</b><br><small dir="ltr">@${esc((ps[k]||{}).handle||'')}</small></div><button class="o" style="width:auto;margin:0" onclick="Soc.feedScreen('${i}')">📰</button><button class="o" style="width:auto;margin:0" onclick="Soc.blockUser('${i}')">🚫</button><button style="width:auto;margin:0" onclick="Soc.chat('${i}')">💬</button><button class="o" style="width:auto;margin:0" onclick="Soc.unfriend('${i}')">✖</button></div>`).join('');
 const rows=[{n:prof.name,e:prof.emoji,me:1,s:flag('hk_soc_stats_off')?null:stats()}].concat(FR.map((i,k)=>({n:(ps[k]||{}).name||'?',e:(ps[k]||{}).emoji||'🙂',s:ss[k]})));
 rows.sort((a,b)=>((b.s&&b.s.stories)||-1)-((a.s&&a.s.stories)||-1)||((b.s&&b.s.riddles)||0)-((a.s&&a.s.riddles)||0));
 lb.innerHTML=rows.map((r,k)=>`<p style="margin:6px 0;${r.me?'color:#e2b44c;font-weight:700':''}">${k+1}. ${esc(r.e)} ${esc(r.n)}${r.me?' ('+t('أنا','me')+')':''} · ${r.s?`${t('حكايات','stories')} ${r.s.stories} · ${t('ألغاز','riddles')} ${r.s.riddles} · 🏅${r.s.badges}`:`<small>${t('مخفي','hidden')}</small>`}</p>`).join('')}
async function togStats(){const off=!flag('hk_soc_stats_off');setFlag('hk_soc_stats_off',off);const {fs,db}=FB;try{if(off)await fs.deleteDoc(fs.doc(db,'stats',me.uid));else{syncT=0;await sync()}}catch(e){}hub()}

// ---------- search / requests ----------
function searchScreen(){scr(`<h2>🔎 ${t('دوّر على صديق','Find a friend')}</h2><div class="box"><input id="sq" placeholder="@${t('يوزر الصديق','friend handle')}" dir="ltr" onkeydown="if(event.key=='Enter')Soc.doSearch()"><div class="row"><button onclick="Soc.doSearch()">${t('بحث','Search')}</button></div><div id="sres"></div>${bad('')}</div>${back('Soc.home()')}`,()=>{})}
async function doSearch(){const q=document.getElementById('sq').value.trim().toLowerCase().replace(/^@/,'');if(q.length<2)return say(t('اكتب حرفين على الأقل','Type at least 2 characters'));
 try{const {fs,db}=FB;const r=await fs.getDocs(fs.query(fs.collection(db,'profiles'),fs.orderBy('handle'),fs.startAt(q),fs.endAt(q+'\uf8ff'),fs.limit(10)));
  const L=r.docs.filter(d=>d.id!==me.uid);document.getElementById('sres').innerHTML=L.length?L.map(d=>{const p=d.data(),isF=FR.includes(d.id);cache.prof[d.id]=p;return `<div style="display:flex;align-items:center;gap:8px;margin:8px 0"><div style="flex:1">${esc(p.emoji||'🙂')} <b>${esc(p.name)}</b><br><small dir="ltr">@${esc(p.handle)}</small></div>${isF?`<small>${t('صديق','Friend')}</small>`:`<button style="width:auto;margin:0" onclick="Soc.addFriend('${d.id}',this)">${t('أضف','Add')}</button>`}</div>`}).join(''):`<p>${t('مفيش نتيجة','No results')}</p>`;say('',1)}catch(x){say(err(x))}}
async function addFriend(uid,btn){try{const {fs,db}=FB;await fs.setDoc(fs.doc(db,'requests',uid,'from',me.uid),{ts:Date.now()});btn.textContent=t('اتبعت ✓','Sent ✓');btn.disabled=true}catch(x){say(err(x))}}
async function accept(uid){try{const {fs,db}=FB,b=fs.writeBatch(db);b.set(fs.doc(db,'friends',me.uid,'list',uid),{ts:Date.now()});b.set(fs.doc(db,'friends',uid,'list',me.uid),{ts:Date.now()});b.delete(fs.doc(db,'requests',me.uid,'from',uid));await b.commit()}catch(x){alert(err(x))}}
async function decline(uid){try{const {fs,db}=FB;await fs.deleteDoc(fs.doc(db,'requests',me.uid,'from',uid))}catch(x){alert(err(x))}}
async function unfriend(uid){if(!confirm(t('تشيل الصديق ده؟','Remove this friend?')))return;try{const {fs,db}=FB,b=fs.writeBatch(db);b.delete(fs.doc(db,'friends',me.uid,'list',uid));b.delete(fs.doc(db,'friends',uid,'list',me.uid));await b.commit()}catch(x){alert(err(x))}}

// ---------- chat ----------
async function chat(uid){const p=await getProf(uid).catch(()=>null),cid=[me.uid,uid].sort().join('_');
 scr(`<h2>💬 ${esc((p||{}).emoji||'')} ${esc((p||{}).name||'')}</h2><div id="cmsgs" style="min-height:200px;max-height:55vh;overflow:auto;background:#0e2142;border-radius:12px;padding:10px"></div><div class="row" style="margin-top:8px"><input id="ct" maxlength="1000" placeholder="${t('اكتب رسالة','Write a message')}" onkeydown="if(event.key=='Enter')Soc.send('${uid}')" style="flex:1"><button style="width:auto" onclick="Soc.send('${uid}')">➤</button></div>${bad('')}${back('Soc.home()')}`,()=>{});
 const {fs,db}=FB;
 unsubs.push(fs.onSnapshot(fs.query(fs.collection(db,'chats',cid,'messages'),fs.orderBy('ts'),fs.limitToLast(100)),snap=>{const el=document.getElementById('cmsgs');if(!el)return;
  el.innerHTML=snap.docs.map(d=>{const m=d.data(),mine=m.from===me.uid;return `<div style="display:flex;justify-content:${mine?'flex-end':'flex-start'};margin:4px 0"><div style="max-width:78%;padding:7px 11px;border-radius:12px;background:${mine?'#e2b44c':'#1c3a6b'};color:${mine?'#0b1a33':'#fff'};white-space:pre-wrap;word-break:break-word" dir="auto">${esc(m.text)}</div></div>`}).join('')||`<p style="opacity:.6">${t('ابدأ الكلام','Say hi')}</p>`;el.scrollTop=el.scrollHeight},e=>say(err(e))))}
async function send(uid){const i=document.getElementById('ct'),x=i.value.trim();if(!x)return;const cid=[me.uid,uid].sort().join('_');i.value='';try{const {fs,db}=FB;await fs.addDoc(fs.collection(db,'chats',cid,'messages'),{from:me.uid,text:x,ts:fs.serverTimestamp()})}catch(e){say(err(e))}}

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
   markers[uid]=L.marker([x.lat,x.lon],{icon:L.divIcon({className:'',html:`<div class="fmk">${esc((p||{}).emoji||'🙂')}<span>${esc((p||{}).name||'')}</span></div>`,iconSize:[1,1]}),zIndexOffset:800}).addTo(map).bindTooltip(ago+' '+t('د','min'),{direction:'top'})},e=>{}))})}
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
 scr(`<h2>📰 ${who?t('بوستاته','Posts'):t('الفيد','Feed')}</h2><div id="fd"><p>…</p></div>${bad('')}${back('Soc.home()')}`,()=>{});
 try{const {fs,db}=FB;const ids=who?[who]:[me.uid].concat(FR);
  const all=[];await Promise.all(ids.map(async u=>{try{const r=await fs.getDocs(fs.query(fs.collection(db,'userPosts',u,'items'),fs.orderBy('ts','desc'),fs.limit(8)));r.docs.forEach(d=>all.push({id:d.id,u,d:d.data()}))}catch(e){}}));
  all.sort((a,b)=>((b.d.ts&&b.d.ts.toMillis&&b.d.ts.toMillis())||Date.now())-((a.d.ts&&a.d.ts.toMillis&&a.d.ts.toMillis())||Date.now()));
  const top=all.slice(0,20),ps={};await Promise.all([...new Set(top.map(p=>p.u))].map(async u=>{ps[u]=await getProf(u).catch(()=>null)}));
  const el=document.getElementById('fd');if(!el)return;
  el.innerHTML=top.length?top.map(p=>postCard(p,ps[p.u])).join(''):`<div class="box"><p>${t('مفيش بوستات لسه. انشر صورة من ذكرياتك أو إنجاز.','No posts yet. Post a photo from your memories or an achievement.')}</p></div>`;
  top.forEach(p=>loadLikes(p))}catch(e){say(err(e))}}
function postCard(p,pr){const d=p.d,mine=p.u===me.uid,tm=d.ts&&d.ts.toDate?d.ts.toDate().toLocaleString(EN?'en-GB':'ar-EG'):'';const k=p.u+'_'+p.id;
 return `<div class="box" id="p_${k}"><div>${esc((pr||{}).emoji||'🙂')} <b>${esc((pr||{}).name||'?')}</b> <small dir="ltr">@${esc((pr||{}).handle||'')}</small><br><small>${esc(tm)}</small></div>
 ${d.kind==='badge'?`<p style="font-size:18px">🏅 ${esc(d.text)}</p>`:`${d.title?`<p><small>📍 ${esc(d.title)}</small></p>`:''}${/^data:image\/jpeg;base64,/.test(d.img||'')?`<img alt="" src="${d.img}" style="width:100%;border-radius:10px">`:''}${d.text?`<p dir="auto">${esc(d.text)}</p>`:''}`}
 <div class="row"><button class="o" id="lk_${k}" onclick="Soc.like('${p.u}','${p.id}')">♡ …</button><button class="o" onclick="Soc.comments('${p.u}','${p.id}')">💬</button>${mine?`<button class="o" onclick="Soc.delPost('${p.id}')">🗑</button>`:`<button class="o" onclick="Soc.report('${p.u}','${p.id}')">⚑</button>`}</div><div id="cm_${k}"></div></div>`}
async function loadLikes(p){const {fs,db}=FB,k=p.u+'_'+p.id;try{const r=await fs.getDocs(fs.collection(db,'userPosts',p.u,'items',p.id,'likes'));const mine=r.docs.some(d=>d.id===me.uid),b=document.getElementById('lk_'+k);if(b){b.textContent=(mine?'♥ ':'♡ ')+r.size;b.style.background=mine?'#e2b44c':'';b.style.color=mine?'#0b1a33':''}}catch(e){}}
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
 return `<div class="sc-card" style="padding-top:16px"><div class="sc-cov" style="background:${cv}"></div><div class="sc-ring"><div class="sc-av2">${esc(p.emoji||'🙂')}</div></div>
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
 <div class="sc-f"><label>${t('الصورة الرمزية','Avatar')}</label></div>${emoRow(prof.emoji||'🙂')}
 <div class="sc-f"><label>${t('لون الغلاف','Cover colour')}</label></div><div class="sc-emo">${COVERS.map((c,i)=>`<button type="button" class="${i==cv?'on':''}" style="background:${c};border:3px solid ${i==cv?'#e2b44c':'transparent'}" onclick="document.getElementById('scv').value=${i};this.parentNode.querySelectorAll('button').forEach(b=>b.style.borderColor='transparent');this.style.borderColor='#e2b44c'"></button>`).join('')}</div><input id="scv" type="hidden" value="${cv}">
 <div class="msg bad" id="smsg" style="display:none"></div><button class="sc-btn" id="seb" onclick="Soc.saveEdit()">${t('حفظ','Save')}</button></div>${back('Soc.home()')}`,()=>{})}
async function saveEdit(){const n=document.getElementById('sn').value.trim(),b=document.getElementById('sb').value.trim().slice(0,160),em=document.getElementById('sem').value,cv=+document.getElementById('scv').value|0;if(!n)return say(t('اكتب اسم','Enter a name'));
 busy('seb',true,t('بنحفظ','Saving'));try{const {fs,db}=FB;await fs.setDoc(fs.doc(db,'profiles',me.uid),{handle:prof.handle,name:n.slice(0,30),emoji:em,bio:b,cv,ts:Date.now()});prof=await getProf(me.uid,true);hub()}catch(x){busy('seb',false);say(err(x))}}

// ---------- block / report people ----------
async function getBlocks(){const {fs,db}=FB;const r=await fs.getDocs(fs.collection(db,'blocks',me.uid,'list'));return r.docs.map(d=>d.id)}
async function blockUser(uid){if(!confirm(t('تحجب الشخص ده؟ هيتشال من أصدقائك ومش هيقدر يبعتلك طلب أو رسالة ولا يشوفك قريب منه.','Block this person? They are removed from your friends and can no longer send you requests or messages, or see you nearby.')))return;
 try{const {fs,db}=FB,b=fs.writeBatch(db);b.set(fs.doc(db,'blocks',me.uid,'list',uid),{ts:Date.now()});b.delete(fs.doc(db,'friends',me.uid,'list',uid));b.delete(fs.doc(db,'friends',uid,'list',me.uid));b.delete(fs.doc(db,'requests',me.uid,'from',uid));b.delete(fs.doc(db,'requests',uid,'from',me.uid));await b.commit();alert(t('اتحجب.','Blocked.'));if(view)view()}catch(e){alert(err(e))}}
async function unblock(uid){try{const {fs,db}=FB;await fs.deleteDoc(fs.doc(db,'blocks',me.uid,'list',uid));blockedScreen()}catch(e){alert(err(e))}}
async function reportUser(uid){const why=prompt(t('سبب الإبلاغ عن الشخص ده؟','Why are you reporting this person?'),'');if(why===null)return;const {fs,db}=FB;try{await fs.addDoc(fs.collection(db,'reports'),{by:me.uid,postUid:uid,postId:'profile',reason:String(why).slice(0,300),ts:fs.serverTimestamp()});alert(t('وصلنا البلاغ. شكرا.','Report sent. Thank you.'))}catch(e){alert(err(e))}}
async function blockedScreen(){scr(`<h2>🚫 ${t('المحجوبين','Blocked people')}</h2><div id="bl" class="box"><p>…</p></div>${back('Soc.home()')}`,()=>{});
 try{const ids=await getBlocks(),ps=await Promise.all(ids.map(i=>getProf(i).catch(()=>null)));const el=document.getElementById('bl');if(!el)return;
  el.innerHTML=ids.length?ids.map((i,k)=>`<div style="display:flex;align-items:center;gap:8px;margin:8px 0"><div style="flex:1">${esc((ps[k]||{}).emoji||'🙂')} <b>${esc((ps[k]||{}).name||'?')}</b><br><small dir="ltr">@${esc((ps[k]||{}).handle||'')}</small></div><button class="o" style="width:auto;margin:0" onclick="Soc.unblock('${i}')">${t('إلغاء الحجب','Unblock')}</button></div>`).join(''):`<p>${t('محدش محجوب.','Nobody is blocked.')}</p>`}catch(e){say(err(e))}}

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
function nearMarkers(list){nearClear();list.forEach(o=>{nearMk[o.u]=L.marker([o.x.lat,o.x.lon],{icon:L.divIcon({className:'',html:`<div class="nmk">${esc(o.p.emoji||'🙂')}<span>${esc(o.p.name||'')}</span></div>`,iconSize:[1,1]}),zIndexOffset:700}).addTo(map).on('click',()=>nearScreen())})}
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
  el.innerHTML=r.list.length?r.list.map(o=>`<div style="margin:10px 0;padding-bottom:10px;border-bottom:1px solid #1c3a6b"><div>${esc(o.p.emoji||'🙂')} <b>${esc(o.p.name)}</b> <small dir="ltr">@${esc(o.p.handle)}</small><br><small>${nearKm(o.km)}</small></div>
   <div class="row">${fr.has(o.u)?`<button onclick="Soc.chat('${o.u}')">💬 ${t('شات','Chat')}</button>`:`<button onclick="Soc.addFriend('${o.u}',this)">${t('ابعت طلب تعارف','Send connection request')}</button>`}<button class="o" style="width:auto" onclick="Soc.blockUser('${o.u}')">🚫</button><button class="o" style="width:auto" onclick="Soc.reportUser('${o.u}')">⚑</button></div></div>`).join('')+`<p><small>${t('الشات بيتفتح بعد ما الطرف التاني يقبل الطلب.','Chat opens only after the other person accepts your request.')}</small></p>`:`<p>${t('مفيش حد ظاهر قريب منك دلوقتي.','Nobody is visible near you right now.')}</p>`}catch(e){say(err(e))}}
async function togNear(){if(flag('hk_soc_near')){setFlag('hk_soc_near',false);await nearStop();nearClear()}else{if(!confirm(t('أي مستخدم قريب منك هيشوفك بمكان تقريبي (حوالي كم) طول ما التطبيق مفتوح. تقدر تقفلها في أي وقت. تفتحها؟','Other users near you will see you at an approximate spot (about 1 km) while the app is open. You can turn it off anytime. Turn it on?')))return;setFlag('hk_soc_near',true);lastNear=0;const p=myP();if(p&&!FAKE)nearPush(p.lat,p.lon)}nearScreen()}

// ---------- delete account ----------
async function delAcct(){if(!confirm(t('هتمسح حسابك وكل بياناتك (البروفايل، الأصدقاء، الترتيب، المكان). مفيش رجوع. تكمل؟','This deletes your account and all your data (profile, friends, leaderboard, location). It cannot be undone. Continue?')))return;
 try{const {fs,db,au,auth}=FB,uid=me.uid;await stopLoc();await nearStop();try{const ps=await fs.getDocs(fs.collection(db,'userPosts',uid,'items'));for(const d of ps.docs){for(const sub of ['likes','comments']){const r=await fs.getDocs(fs.collection(db,'userPosts',uid,'items',d.id,sub));await Promise.all(r.docs.map(x=>fs.deleteDoc(x.ref)))}await fs.deleteDoc(d.ref)}const bl=await fs.getDocs(fs.collection(db,'blocks',uid,'list'));await Promise.all(bl.docs.map(x=>fs.deleteDoc(x.ref)))}catch(e){}const b=fs.writeBatch(db);FR.forEach(f=>{b.delete(fs.doc(db,'friends',f,'list',uid));b.delete(fs.doc(db,'friends',uid,'list',f))});b.delete(fs.doc(db,'stats',uid));if(prof)b.delete(fs.doc(db,'handles',prof.handle));await b.commit();await fs.deleteDoc(fs.doc(db,'profiles',uid));await au.deleteUser(auth.currentUser);cache.prof={};alert(t('اتمسح حسابك','Account deleted'));openMenu()}catch(x){alert(err(x))}}

return{profileScreen,editScreen,saveEdit,pickEmo,hv,vf,open,home,nearScreen,togNear,blockUser,unblock,reportUser,blockedScreen,feedScreen,postMemory,postBadge,like,comments,addComment,delComment,delPost,report,authScreen,doAuth,reset,signOut,saveProf,editName,searchScreen,doSearch,addFriend,accept,decline,unfriend,chat,send,togLoc,hideNow,togMap,togStats,sugScreen,sugHere,sugSend,delAcct,sync,onPos,get user(){return me},get profile(){return prof},_fb:()=>FB}
})();
