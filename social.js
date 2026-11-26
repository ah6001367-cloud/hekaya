/* Hekaya social layer: accounts, friends, chat, friends-only location, leaderboard, place suggestions.
   Firebase is loaded lazily from the CDN. If it cannot load (offline), the rest of the app is unaffected. */
const Soc=(()=>{
const CFG={apiKey:"AIzaSyCCHIO-bY1zgpt39XSXOXSOkpEzTXiv2OI",authDomain:"hekaya-122d3.firebaseapp.com",projectId:"hekaya-122d3",storageBucket:"hekaya-122d3.firebasestorage.app",messagingSenderId:"835981529763"};
const V='10.12.2',BASE='https://www.gstatic.com/firebasejs/'+V+'/';
const EMU=location.hostname==='localhost'&&new URLSearchParams(location.search).get('emu')==='1';
const t=(a,e)=>EN?e:a;
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
const say=(m,ok)=>{const e=document.getElementById('smsg');if(e){e.className='msg '+(ok?'ok':'bad');e.textContent=m}};
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
function authScreen(mode){mode=mode||'in';
 scr(`<h2>👥 ${t('الأصدقاء','Friends')}</h2><div class="box"><p>${t('سجّل دخول عشان تضيف أصدقاء وتتشات وتشوف الترتيب. الحكايات نفسها مش محتاجة حساب.','Sign in to add friends, chat and see the leaderboard. The stories themselves need no account.')}</p>
 <input id="se" type="email" autocomplete="email" placeholder="${t('الإيميل','Email')}" dir="ltr"><input id="sp" type="password" autocomplete="${mode=='in'?'current-password':'new-password'}" placeholder="${t('كلمة السر','Password')}" dir="ltr" style="margin-top:8px">
 ${bad('')}
 <div class="row"><button onclick="Soc.doAuth('${mode}')">${mode=='in'?t('دخول','Sign in'):t('إنشاء حساب','Create account')}</button><button class="o" onclick="Soc.authScreen('${mode=='in'?'up':'in'}')">${mode=='in'?t('حساب جديد','New account'):t('عندي حساب','I have an account')}</button></div>
 ${mode=='in'?`<div class="row"><button class="o" onclick="Soc.reset()">${t('نسيت كلمة السر','Forgot password')}</button></div>`:''}
 </div>${back('openMenu()')}`,()=>home())}
async function doAuth(mode){const e=document.getElementById('se').value.trim(),p=document.getElementById('sp').value;if(!e||!p)return say(t('اكتب الإيميل وكلمة السر','Enter email and password'));
 try{const {au,auth}=FB;if(mode=='up')await au.createUserWithEmailAndPassword(auth,e,p);else await au.signInWithEmailAndPassword(auth,e,p)}catch(x){say(err(x))}}
async function reset(){const e=document.getElementById('se').value.trim();if(!e)return say(t('اكتب الإيميل الأول','Enter your email first'));try{await FB.au.sendPasswordResetEmail(FB.auth,e);say(t('بعتنا لينك تغيير كلمة السر على الإيميل','Password reset link sent to your email'),1)}catch(x){say(err(x))}}
async function signOut(){await stopLoc(true);await FB.au.signOut(FB.auth);cache.prof={};cache.stat={}}

// ---------- profile ----------
const EMOJIS=['🙂','😎','🧭','⚓','🐚','🌊','🦩','🚢','🎩','🌙'];
function setupScreen(){
 scr(`<h2>${t('اعمل بروفايلك','Create your profile')}</h2><div class="box">
 <p><small>${t('الاسم والـ@يوزر بيظهروا لأي حد يدوّر عليك. مفيش رقم موبايل ولا إيميل بيظهر.','Your name and @handle are visible to people who search for you. Your email and phone are never shown.')}</small></p>
 <input id="sh" placeholder="@${t('اليوزر (إنجليزي، أرقام، _)','handle (a-z, 0-9, _)')}" dir="ltr" maxlength="20"><input id="sn" placeholder="${t('الاسم اللي يظهر','Display name')}" maxlength="30" style="margin-top:8px">
 <p>${EMOJIS.map(x=>`<button class="o" style="width:auto;display:inline-block;margin:3px;padding:6px 10px" onclick="document.getElementById('sem').value='${x}';this.parentNode.querySelectorAll('button').forEach(b=>b.style.background='');this.style.background='#e2b44c'">${x}</button>`).join('')}<input id="sem" type="hidden" value="🙂"></p>
 ${bad('')}<div class="row"><button onclick="Soc.saveProf()">${t('حفظ','Save')}</button></div></div>
 <div class="row"><button class="o" onclick="Soc.signOut()">${t('تسجيل خروج','Sign out')}</button></div>`,()=>home())}
async function saveProf(){const h=document.getElementById('sh').value.trim().toLowerCase().replace(/^@/,''),n=document.getElementById('sn').value.trim(),em=document.getElementById('sem').value;
 if(!/^[a-z0-9_]{3,20}$/.test(h))return say(t('اليوزر ٣ لـ ٢٠ حرف إنجليزي أو رقم أو _','Handle: 3-20 letters a-z, digits or _'));if(!n)return say(t('اكتب اسم','Enter a name'));
 try{const {fs,db}=FB,uid=me.uid;
  await fs.runTransaction(db,async tx=>{const hd=await tx.get(fs.doc(db,'handles',h));if(hd.exists()&&hd.data().uid!==uid)throw new Error(t('اليوزر ده واخده حد','That handle is taken'));tx.set(fs.doc(db,'handles',h),{uid});tx.set(fs.doc(db,'profiles',uid),{handle:h,name:n,emoji:em,ts:Date.now()})});
  prof=await getProf(uid,true);afterLogin();hub()}catch(x){say(err(x))}}
async function editName(){const n=prompt(t('الاسم الجديد','New display name'),prof.name);if(!n||!n.trim())return;try{const {fs,db}=FB;await fs.setDoc(fs.doc(db,'profiles',me.uid),{handle:prof.handle,name:n.trim().slice(0,30),emoji:prof.emoji,ts:Date.now()});prof=await getProf(me.uid,true);hub()}catch(x){alert(err(x))}}

// ---------- hub ----------
function stats(){const A=(typeof achs==='function'?achs():[]);return{stories:unlocked.length,riddles:SOL.length,badges:A.filter(x=>x.ok).length,ts:Date.now()}}
let syncT=0;
async function sync(){if(!FB||!me||!prof)return;if(flag('hk_soc_stats_off'))return;const now=Date.now();if(now-syncT<5000)return;syncT=now;try{const {fs,db}=FB;await fs.setDoc(fs.doc(db,'stats',me.uid),stats())}catch(e){}}
function afterLogin(){sync();if(flag('hk_soc_loc'))startLoc();if(flag('hk_soc_map'))startMap()}
async function hub(){
 const st=flag('hk_soc_loc'),sm=flag('hk_soc_map'),so=!flag('hk_soc_stats_off');
 scr(`<h2>👥 ${t('الأصدقاء','Friends')}</h2>
 <div class="box"><h3>${esc(prof.emoji)} ${esc(prof.name)}</h3><p dir="ltr">@${esc(prof.handle)}</p><div class="row"><button class="o" onclick="Soc.editName()">${t('غيّر الاسم','Edit name')}</button><button class="o" onclick="Soc.signOut()">${t('خروج','Sign out')}</button></div></div>
 <div class="row"><button onclick="Soc.searchScreen()">🔎 ${t('دوّر على صديق','Find a friend')}</button><button onclick="Soc.sugScreen()">📍 ${t('اقترح مكان','Suggest a place')}</button></div>
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
 const {fs,db}=FB,uid=me.uid;
 unsubs.push(fs.onSnapshot(fs.collection(db,'requests',uid,'from'),async snap=>{const ids=snap.docs.map(d=>d.id);const el=document.getElementById('sreq');if(!el)return;
  if(!ids.length){el.innerHTML='';return}
  const ps=await Promise.all(ids.map(i=>getProf(i).catch(()=>null)));
  el.innerHTML=`<div class="box" style="border:1px solid #e2b44c"><h3>${t('طلبات صداقة','Friend requests')}</h3>`+ids.map((i,k)=>`<p>${esc((ps[k]||{}).emoji||'🙂')} <b>${esc((ps[k]||{}).name||'?')}</b> <small dir="ltr">@${esc((ps[k]||{}).handle||'')}</small></p><div class="row"><button onclick="Soc.accept('${i}')">${t('قبول','Accept')}</button><button class="o" onclick="Soc.decline('${i}')">${t('رفض','Decline')}</button></div>`).join('')+`</div>`},e=>{}));
 unsubs.push(fs.onSnapshot(fs.collection(db,'friends',uid,'list'),async snap=>{FR=snap.docs.map(d=>d.id);await renderFriends();if(flag('hk_soc_map'))startMap()},e=>{}))}
let FR=[];
async function renderFriends(){const el=document.getElementById('sfr'),lb=document.getElementById('slb');if(!el)return;
 if(!FR.length){el.innerHTML=`<p>${t('لسه مفيش أصدقاء. دوّر على حد بالـ@يوزر.','No friends yet. Search by @handle.')}</p>`;lb.innerHTML=`<p>${t('ضيف أصدقاء الأول.','Add friends first.')}</p>`;return}
 const ps=await Promise.all(FR.map(i=>getProf(i).catch(()=>null))),ss=await Promise.all(FR.map(getStat));
 el.innerHTML=FR.map((i,k)=>`<div style="display:flex;align-items:center;gap:8px;margin:8px 0"><div style="flex:1">${esc((ps[k]||{}).emoji||'🙂')} <b>${esc((ps[k]||{}).name||'?')}</b><br><small dir="ltr">@${esc((ps[k]||{}).handle||'')}</small></div><button class="o" style="width:auto;margin:0" onclick="Soc.feedScreen('${i}')">📰</button><button style="width:auto;margin:0" onclick="Soc.chat('${i}')">💬</button><button class="o" style="width:auto;margin:0" onclick="Soc.unfriend('${i}')">✖</button></div>`).join('');
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
async function onPos(lat,lon){if(!FB||!me||!prof||!flag('hk_soc_loc'))return;const now=Date.now();if(now-lastLoc<20000)return;lastLoc=now;try{const {fs,db}=FB;await fs.setDoc(fs.doc(db,'loc',me.uid),{lat:Math.round(lat*1e5)/1e5,lon:Math.round(lon*1e5)/1e5,ts:now})}catch(e){}}
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

// ---------- delete account ----------
async function delAcct(){if(!confirm(t('هتمسح حسابك وكل بياناتك (البروفايل، الأصدقاء، الترتيب، المكان). مفيش رجوع. تكمل؟','This deletes your account and all your data (profile, friends, leaderboard, location). It cannot be undone. Continue?')))return;
 try{const {fs,db,au,auth}=FB,uid=me.uid;await stopLoc();const b=fs.writeBatch(db);FR.forEach(f=>{b.delete(fs.doc(db,'friends',f,'list',uid));b.delete(fs.doc(db,'friends',uid,'list',f))});b.delete(fs.doc(db,'stats',uid));if(prof)b.delete(fs.doc(db,'handles',prof.handle));await b.commit();await fs.deleteDoc(fs.doc(db,'profiles',uid));await au.deleteUser(auth.currentUser);cache.prof={};alert(t('اتمسح حسابك','Account deleted'));openMenu()}catch(x){alert(err(x))}}

return{open,home,feedScreen,postMemory,postBadge,like,comments,addComment,delComment,delPost,report,authScreen,doAuth,reset,signOut,saveProf,editName,searchScreen,doSearch,addFriend,accept,decline,unfriend,chat,send,togLoc,hideNow,togMap,togStats,sugScreen,sugHere,sugSend,delAcct,sync,onPos,get user(){return me},get profile(){return prof},_fb:()=>FB}
})();
