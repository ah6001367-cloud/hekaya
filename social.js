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
.hd-c textarea,.hd-c input,.hd-r input{width:100%;box-sizing:border-box;background:#0b1a33;border:1px solid #2a4a80;border-radius:14px;color:#fbefd0;padding:10px 12px;font:inherit;margin-top:8px}.hd-c textarea{resize:none}.hd-c button{margin-top:10px;width:100%}
.hd-k span,.hd-f span{cursor:pointer}.hd-k span.on,.hd-f span.on{background:linear-gradient(90deg,#2fb6a0,#7fe0d4);color:#07222a;border-color:transparent;font-weight:800}.hd-f{margin:10px 0}
.hd-h{display:flex;gap:10px;align-items:center}.hd-h>div{flex:1;min-width:0}.hd-h small{display:block;color:#8aa0c2;font-size:11px}.hd-b{font-style:normal;font-size:11px;font-weight:800;border-radius:999px;padding:3px 10px;background:#e2b44c22;color:#f7bf3a;border:1px solid #e2b44c66}.hd-b.k-ask{background:#4d8dff22;color:#9cc0ff;border-color:#4d8dff66}.hd-b.k-hist{background:#2fb6a022;color:#7fe0d4;border-color:#2fb6a066}.hd-b.k-event{background:#e0652a22;color:#ff9b6a;border-color:#e0652a66}
.hd-t{margin:10px 0;line-height:1.7;color:#f2e3b3;white-space:pre-wrap}.hd-a{display:flex;gap:8px}.hd-a button{flex:none;padding:6px 14px;min-height:0}.hd-r{display:flex;gap:8px;margin-top:10px;padding-top:8px;border-top:1px solid #ffffff12}.hd-r p{margin:2px 0 0;color:#dbe5f5}.hd-ri{display:flex;gap:8px;margin-top:10px}.hd-ri input{margin:0;flex:1}.hd-ri button{flex:none;min-height:0}
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
.sc-chh{display:flex;align-items:center;gap:10px;padding:6px 2px 10px}.sc-cm{height:52vh;overflow:auto;background:#0b1a33;border-radius:18px;padding:10px;scroll-behavior:smooth}.cb-r{display:flex;margin:3px 0}.cb-r.mi{justify-content:flex-end}.cb-b{max-width:78%;padding:8px 12px 6px;border-radius:18px 18px 18px 4px;background:#1c3a6b;color:#fff;white-space:pre-wrap;word-break:break-word;animation:pop .18s ease}.cb-b.mi{background:linear-gradient(135deg,#f1cf7a,#e2b44c);color:#0b1a33;border-radius:18px 18px 4px 18px}@keyframes pop{from{transform:scale(.9);opacity:0}}.sc-t{display:block;font-size:10px;opacity:.7;text-align:end;margin-top:2px}.sc-ds{text-align:center;font-size:11px;color:#9fb4d0;margin:10px 0 4px}.sc-cin{display:flex;gap:8px;margin-top:10px}.sc-cin input{flex:1;min-width:0;box-sizing:border-box;font:inherit;padding:12px 16px;border-radius:24px;border:1.5px solid #2a4a80;background:#0b1a33;color:#f4e9c8}.sc-cin input:focus{border-color:#e2b44c;outline:none}.sc-send{width:46px;flex:none;border-radius:50%;padding:0}
.cb-bk{width:auto;flex:none;background:transparent;color:#f4e9c8;font-size:24px;padding:4px 10px;min-height:40px}.cb-ph{flex:none;width:44px;height:44px;border-radius:50%;background:#16325c;display:flex;align-items:center;justify-content:center;font-size:20px;cursor:pointer;transition:transform .12s}.cb-ph:active{transform:scale(.88)}
.cb-b{position:relative;touch-action:pan-y;cursor:pointer}.cb-b.hx{margin-bottom:12px}.cb-i{display:block;max-width:100%;max-height:260px;border-radius:12px;margin-bottom:4px}.cb-q{border-inline-start:3px solid #3ad1b8;background:#0003;border-radius:8px;padding:4px 8px;margin-bottom:5px;font-size:12px;opacity:.92}.cb-q b{color:#3ad1b8}.cb-b.mi .cb-q{background:#0001}.cb-b.fl{animation:flash 1s}@keyframes flash{50%{box-shadow:0 0 0 4px #3ad1b8}}
.cb-rx{position:absolute;bottom:-12px;inset-inline-end:8px;background:#0b1a33;border:1px solid #2a4a80;border-radius:12px;padding:1px 6px;font-size:13px;color:#fff;animation:pop .25s}.cb-rx span{margin:0 2px}.cb-hp{position:absolute;left:50%;top:50%;font-style:normal;font-size:44px;pointer-events:none;animation:hp .8s ease-out}
.tk{font-size:11px;letter-spacing:-3px;margin-inline-start:2px}.tk.rd{color:#1d8bff;font-weight:700}
.cb-rp{display:flex;gap:8px;align-items:center;background:#16325c;border-inline-start:4px solid #3ad1b8;border-radius:10px;padding:6px 10px;margin-top:8px;animation:rise .2s}.cb-rp button{width:auto;background:transparent;color:#fff;min-height:30px;padding:2px 8px}
.cb-sh{position:fixed;inset:0;z-index:100003}.cb-bd{position:absolute;inset:0;background:#000a;animation:fi .2s}.cb-pn{position:absolute;left:0;right:0;bottom:0;background:#0f2447;border-radius:22px 22px 0 0;padding:14px 14px 22px;display:flex;flex-direction:column;gap:6px;animation:up .25s ease;max-width:520px;margin:0 auto}@keyframes up{from{transform:translateY(100%)}}.cb-pn>button{text-align:start;background:#16325c;color:#f4e9c8}.cb-pn>button.dg{color:#ff7b8f}
.cb-rr{display:flex;justify-content:space-around;background:#16325c;border-radius:30px;padding:6px}.cb-rr button{width:auto;background:transparent;font-size:28px;padding:2px 6px;min-height:44px;border-radius:50%;transition:transform .15s}.cb-rr button:active{transform:scale(1.5)}.cb-rr button.on{background:#e2b44c55}
.cb-iv{position:fixed;inset:0;z-index:100004;background:#000e;display:flex;align-items:center;justify-content:center;animation:fi .2s}.cb-iv img{max-width:96%;max-height:92%;border-radius:8px}.cb-iv button{position:absolute;top:14px;right:14px;width:auto;background:#0008;color:#fff}
.cb-tg{display:flex;align-items:center;gap:10px;background:#16325c;border-radius:12px;padding:10px}.cb-tg input{width:44px;height:26px;flex:none;appearance:none;background:#3a4a66;border-radius:14px;position:relative;transition:.2s;margin:0;min-height:0;padding:0}.cb-tg input:checked{background:#3ad1b8}.cb-tg input::after{content:'';position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;transition:.2s}.cb-tg input:checked::after{left:21px}.cb-tg i{display:none}
.cb-li{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #1c3a6b;cursor:pointer;transition:background .15s}.cb-li:active{background:#16325c}.cb-li small{color:#9fb4d0;display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.cb-li small.un{color:#fff;font-weight:700}.cb-n{background:#3ad1b8;color:#06231f;border-radius:12px;min-width:22px;padding:1px 7px;font-weight:800;font-size:12px;text-align:center;margin-top:4px;display:inline-block;animation:pop .3s}
#tb button{position:relative}#tb .bdg{position:absolute;top:2px;inset-inline-end:22%;background:#ee2a5b;color:#fff;border-radius:10px;min-width:18px;height:18px;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;animation:pop .3s}
.cb-vn{display:flex;align-items:center;gap:8px;min-width:170px}.cb-vn button{width:36px;height:36px;border-radius:50%;padding:0;flex:none;background:#0b1a33;color:#e2b44c}.cb-b.mi .cb-vn button{background:#0b1a33}.wv{display:flex;align-items:center;gap:2px;flex:1;height:26px}.wv i{width:3px;border-radius:2px;background:currentColor;opacity:.6;height:40%}.wv i:nth-child(3n){height:80%}.wv i:nth-child(4n+1){height:60%}.wv i:nth-child(5n){height:95%}.cb-vn.pl .wv i{animation:wvA .7s ease-in-out infinite alternate}.cb-vn.pl .wv i:nth-child(2n){animation-delay:.2s}@keyframes wvA{to{height:100%;opacity:1}}
.cb-rec{display:flex;gap:8px;align-items:center;background:#16325c;border-radius:14px;padding:6px 10px;margin-top:8px;animation:rise .2s}.cb-rec .dot{width:12px;height:12px;border-radius:50%;background:#ee2a5b;animation:pls 1s infinite}@keyframes pls{50%{transform:scale(1.6);opacity:.5}}.cb-rec button{width:auto;min-height:36px;padding:2px 12px;background:#0b1a33;color:#fff}.cb-rec button.go{background:#e2b44c;color:#0b1a33}
.sc-vw{background:#0008;color:#fff;border-radius:20px;padding:6px 14px;width:auto}.sc-vw b{font-size:16px}.sc-rpl{position:absolute;left:0;right:0;bottom:0;z-index:5;padding:8px 12px 14px;background:linear-gradient(transparent,#000a)}.sc-rxs{display:flex;justify-content:space-around;margin-bottom:6px}.sc-rxs button{width:auto;background:transparent;font-size:26px;padding:0 6px;min-height:40px;transition:transform .12s}.sc-rxs button:active{transform:scale(1.6)}.sc-ri{display:flex;gap:8px;border:1.5px solid #fff8;border-radius:26px;padding:3px 3px 3px 14px;transition:.2s}.sc-ri.ok{border-color:#3ad1b8;background:#3ad1b822}.sc-ri input{flex:1;min-width:0;background:transparent;border:0;color:#fff;font:inherit;outline:none}.sc-ri button{width:40px;height:34px;border-radius:50%;padding:0;flex:none;min-height:0}.sc-fl{position:fixed;z-index:100010;font-style:normal;font-size:34px;pointer-events:none;animation:flt 1.2s ease-out both}@keyframes flt{from{transform:translateY(0) scale(.6);opacity:1}to{transform:translateY(-260px) scale(1.5);opacity:0}}.sc-vr{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #1c3a6b}
.sc-trk{display:flex;align-items:center;gap:8px;background:#16325c;border-radius:12px;padding:4px 8px;color:#f4e9c8;transition:background .15s}.sc-trk.on{background:#e2b44c33;outline:1.5px solid #e2b44c}.sc-trk .pv{width:36px;height:36px;border-radius:50%;padding:0;flex:none;min-height:0;background:#0b1a33}.sc-trk.pl .pv{background:#3ad1b8;color:#06231f}.sc-trk .pk{width:auto;min-height:34px;padding:2px 12px;flex:none}.sc-trk small{color:#9fb4d0}.sc-mb{width:auto;background:#0008;border-radius:50%;padding:4px 10px;color:#fff;margin-inline-end:6px}.sc-trk.pl .pv{animation:pls 1.2s infinite}
.sc-ovl{position:absolute;left:0;right:0;top:34%;z-index:4;display:flex;flex-direction:column;gap:14px;align-items:center;pointer-events:none}.sc-pl{pointer-events:auto;width:82%;background:#fffffff2;color:#0b1a33;border-radius:18px;padding:12px;text-align:center;box-shadow:0 8px 30px #0006;animation:rise .35s ease both}.sc-pl b{display:block;margin-bottom:8px}.sc-po{display:flex;gap:8px}.sc-po button{flex:1;background:#e9eef7;color:#0b1a33;border-radius:12px;font-weight:700;min-height:42px;transition:.2s}.sc-po button.on{background:linear-gradient(135deg,#f1cf7a,#e2b44c);transform:scale(1.04)}.sc-sl{display:flex;align-items:center;gap:8px}.sc-sl input{flex:1;accent-color:#e2b44c}.sc-sl small{font-size:26px}.sc-res{background:#16325c;border-radius:12px;padding:8px 10px;margin-bottom:8px}
.sc-sr{position:relative}.mnb{position:absolute;right:-2px;bottom:-2px;width:20px;height:20px;border-radius:50%;background:#4d8dff;color:#fff;font-size:12px;display:flex;align-items:center;justify-content:center;border:2px solid #0b1a33}.sc-mnt{position:fixed;left:12px;right:12px;top:calc(12px + env(safe-area-inset-top));z-index:200000;background:linear-gradient(135deg,#4d8dff,#1c5fa8);color:#fff;padding:13px 16px;border-radius:16px;font-weight:700;box-shadow:0 10px 30px #0008;animation:mntin .35s cubic-bezier(.2,.9,.3,1.2)}.sc-mnt b{background:#fff;color:#1c5fa8;border-radius:50%;display:inline-flex;width:22px;height:22px;align-items:center;justify-content:center;margin-inline-end:6px}@keyframes mntin{from{transform:translateY(-120%);opacity:0}}
.sc-ring{width:92px;height:92px;border-radius:50%;padding:3px;background:conic-gradient(#f9ce34,#ee2a7b,#6228d7,#f9ce34);margin:-46px auto 6px;position:relative}.sc-av2{width:100%;height:100%;border-radius:50%;background:#0b1a33;border:3px solid #0e2142;box-sizing:border-box;display:flex;align-items:center;justify-content:center;font-size:44px}.sc-a{display:inline-flex;align-items:center;justify-content:center;border-radius:50%;background-size:cover;background-position:center;color:#fff;font-weight:800;vertical-align:middle;margin-inline-end:6px;flex:none;overflow:hidden}.sc-av2 .sc-a{margin:0}.sc-up{flex:1;text-align:center;background:#e2b44c;color:#0b2a52;font-weight:700;border-radius:12px;padding:12px 14px;min-height:20px;cursor:pointer}.sc-sb{display:flex;gap:12px;overflow-x:auto;padding:4px 2px 10px;scrollbar-width:none}.sc-sbi{flex:none;text-align:center;width:68px;cursor:pointer}.sc-sbi small{display:block;font-size:11px;margin-top:4px;color:#cfd9ea;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.sc-sr{width:68px;height:68px;border-radius:50%;padding:3px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;position:relative}.sc-sr.new{background:conic-gradient(#f9ce34,#ee2a7b,#6228d7,#f9ce34)}.sc-sr.old{background:#3b4f73}.sc-sr.add{background:#1c3a6b}.sc-sr .sc-a{border:3px solid #0b2a52;box-sizing:content-box;margin:0}.sc-sr i{position:absolute;right:-2px;bottom:-2px;background:#e2b44c;color:#0b2a52;border-radius:50%;width:20px;height:20px;font-style:normal;font-weight:800;text-align:center;line-height:20px}
.sc-sv{position:fixed;inset:0;z-index:100001;background:#000;display:flex;flex-direction:column;animation:fi .2s}@keyframes fi{from{opacity:0;transform:scale(.98)}}.sc-sv img{flex:1;min-height:0;object-fit:contain;width:100%}.sc-sp{display:flex;gap:4px;padding:10px 10px 4px}.sc-sp i{flex:1;height:3px;border-radius:2px;background:#ffffff44;position:relative;overflow:hidden}.sc-sp i.d{background:#fff}.sc-sp i u{position:absolute;inset:0;background:#fff;transform-origin:left;animation:sg 5s linear forwards}@keyframes sg{from{transform:scaleX(0)}to{transform:scaleX(1)}}.sc-sh{display:flex;align-items:center;gap:8px;padding:6px 12px;color:#fff}.sc-sh b{flex:1}.sc-sh button{width:auto;flex:none;background:transparent;color:#fff;min-height:36px;padding:4px 10px}.sc-sc{position:absolute;bottom:70px;left:0;right:0;text-align:center;color:#fff;padding:10px 16px;background:linear-gradient(transparent,#000a);font-size:16px}.sc-nv{position:absolute;inset:90px 0 70px;display:flex}.sc-nv div{flex:1}.sc-sf{display:flex;gap:8px;padding:10px 12px;position:relative;z-index:2}.sc-sf button{background:#ffffff22;color:#fff}
.sc-post{content-visibility:auto;contain-intrinsic-size:auto 380px}.sk{background:linear-gradient(90deg,#13305e,#1c3a6b,#13305e);background-size:200% 100%;animation:skm 1.2s infinite}@keyframes skm{to{background-position:-200% 0}}
.sc-ed{position:fixed;inset:0;z-index:100002;background:#050c1a;display:flex;flex-direction:column;animation:fi .2s;color:#fff}.sc-edh{display:flex;align-items:center;justify-content:space-between;padding:10px 12px}.sc-edh button{width:auto;flex:none;min-height:38px;background:#ffffff22;color:#fff}.sc-edh .sc-go{background:#e2b44c;color:#0b2a52}.sc-edp{text-align:center;max-width:300px}#edc{max-height:100%;max-width:100%;aspect-ratio:9/16;height:100%;border-radius:14px;touch-action:none;background:#000}.sc-edt{display:flex;justify-content:space-around;padding:4px 4px}.sc-edt button{background:transparent;color:#fff;font-size:11px;display:flex;flex-direction:column;gap:2px;align-items:center;min-height:46px;padding:2px 0;flex:1}.sc-edt button span,.sc-edt button i{font-size:20px;font-style:normal}.sc-edx{padding:4px 10px 12px;min-height:70px}.sc-edr{display:flex;gap:8px;align-items:center;margin:6px 0;overflow-x:auto}.sc-edr button{width:auto;flex:none;min-height:36px;padding:6px 12px;background:#ffffff22;color:#fff}.sc-edr button.on{background:#e2b44c;color:#0b2a52}.sw{width:28px;height:28px;border-radius:50%;flex:none;border:2px solid #fff6}.sw.on{border-color:#e2b44c;box-shadow:0 0 0 2px #e2b44c}.sc-pk{display:inline-flex;align-items:center;gap:4px;padding:4px 10px 4px 4px;border:1.5px solid #ffffff33;border-radius:20px;margin:3px;font-size:13px}.sc-pk.on{border-color:#e2b44c;background:#e2b44c33}.sc-pi,.sc-bp{position:relative;margin:10px 0;border-radius:14px;overflow:hidden;user-select:none}.sc-pi img{width:100%;display:block}.sc-bp{background:linear-gradient(135deg,#1c5fa8,#16507a);text-align:center;padding:26px 14px}.sc-hrt{position:absolute;left:50%;top:50%;font-style:normal;font-size:84px;color:#fff;transform:translate(-50%,-50%) scale(0);opacity:0;pointer-events:none;text-shadow:0 4px 20px #0008}.sc-hrt.go{animation:hp .8s ease-out}@keyframes hp{0%{transform:translate(-50%,-50%) scale(0);opacity:0}25%{transform:translate(-50%,-50%) scale(1.25);opacity:1}55%{transform:translate(-50%,-50%) scale(.95);opacity:1}100%{transform:translate(-50%,-70%) scale(1.1);opacity:0}}.sc-act{display:flex;gap:6px;align-items:center}.sc-act button{width:auto;flex:none;background:transparent;color:#f4e9c8;font-size:20px;padding:6px 10px;min-height:40px;transition:transform .12s}.sc-act button:active{transform:scale(.85)}.sc-act button.lk{color:#ff5a7e}.sc-post{animation:rise .35s ease both}@keyframes rise{from{opacity:0;transform:translateY(12px)}}.sc-chh{display:flex;align-items:center;gap:10px;padding:6px 2px 10px}.sc-cm{height:52vh;overflow:auto;background:#0b1a33;border-radius:18px;padding:10px;scroll-behavior:smooth}.cb-r{display:flex;margin:3px 0}.cb-r.mi{justify-content:flex-end}.cb-b{max-width:78%;padding:8px 12px 6px;border-radius:18px 18px 18px 4px;background:#1c3a6b;color:#fff;white-space:pre-wrap;word-break:break-word;animation:pop .18s ease}.cb-b.mi{background:linear-gradient(135deg,#f1cf7a,#e2b44c);color:#0b1a33;border-radius:18px 18px 4px 18px}@keyframes pop{from{transform:scale(.9);opacity:0}}.sc-t{display:block;font-size:10px;opacity:.7;text-align:end;margin-top:2px}.sc-ds{text-align:center;font-size:11px;color:#9fb4d0;margin:10px 0 4px}.sc-cin{display:flex;gap:8px;margin-top:10px}.sc-cin input{flex:1;min-width:0;box-sizing:border-box;font:inherit;padding:12px 16px;border-radius:24px;border:1.5px solid #2a4a80;background:#0b1a33;color:#f4e9c8}.sc-cin input:focus{border-color:#e2b44c;outline:none}.sc-send{width:46px;flex:none;border-radius:50%;padding:0}.sc-emo{display:flex;flex-wrap:wrap;gap:6px;justify-content:center}.sc-emo button{width:48px;flex:none;min-height:48px;font-size:24px;padding:0;background:#0b1a33}.sc-emo button.on{background:#e2b44c}
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
 au.onAuthStateChanged(auth,async u=>{me=u;prof=null;if(u){try{prof=await getProf(u.uid,true)}catch(e){}afterLogin()}else{stopLoc();clearMarkers();gwStop()}if(view)view()});
 return FB}
function panel(){return document.getElementById('mn')}
let skW=0;function scr(html,v){unsubs.forEach(f=>{try{f()}catch(e){}});unsubs=[];view=v||null;const e=panel();e.innerHTML=html;e.classList.add('on');e.classList.remove('sk-to');e.scrollTop=0;clearTimeout(skW);const vv=view;skW=setTimeout(()=>{const p=panel();if(!p||view!==vv||!p.querySelector('.sk'))return;p.classList.add('sk-to');if(!p.querySelector('.sk-rt')){const d=document.createElement('div');d.className='sc-card sk-rt';d.style.textAlign='center';d.innerHTML=`<div style="font-size:34px">📡</div><p>${t('الاتصال بطيء أو الخدمة مش متاحة. جرّب تاني.','Slow connection or the service is unavailable. Try again.')}</p><button onclick="Soc.retryView()">🔄 ${t('حاول تاني','Retry')}</button>`;const h=p.querySelector('.sk');(h.closest('.sc-card,.box')||h).before(d)}},5000);return e}
function retryView(){if(view)view()}
(function(){const s=document.createElement('style');s.textContent='.sk-to .sk{display:none!important}';document.head.appendChild(s)})();
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
function stats(){const A=(typeof achs==='function'?achs():[]),P=typeof points==='function'?points():{total:0,ri:0,cur:0};return{stories:unlocked.length,riddles:SOL.length,badges:A.filter(x=>x.ok).length,pts:P.total,rk:P.ri,st:P.cur,ts:Date.now()}}
let syncT=0;
async function sync(){if(!FB||!me||!prof)return;if(flag('hk_soc_stats_off'))return;const now=Date.now();if(now-syncT<5000)return;syncT=now;try{const {fs,db}=FB;const st=stats();try{await fs.setDoc(fs.doc(db,'stats',me.uid),Object.assign({at:fs.serverTimestamp()},st))}catch(e){await fs.setDoc(fs.doc(db,'stats',me.uid),{stories:st.stories,riddles:st.riddles,badges:st.badges,ts:st.ts})}try{if(st.rk!==lastRk){await fs.setDoc(fs.doc(db,'profiles',me.uid),{rk:st.rk},{merge:true});lastRk=st.rk}}catch(e){}}catch(e){}}
let lastRk=-1;
function afterLogin(){sync();gwStart();if(flag('hk_soc_loc'))startLoc();if(flag('hk_soc_map'))startMap()}
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
 rows.sort((a,b)=>((b.s&&(b.s.pts!=null?b.s.pts:b.s.stories*100))||-1)-((a.s&&(a.s.pts!=null?a.s.pts:a.s.stories*100))||-1));
 lb.innerHTML=rows.map((r,k)=>`<p style="margin:6px 0;${r.me?'color:#e2b44c;font-weight:700':''}">${k+1}. ${r.e} ${esc(r.n)}${r.me?' ('+t('أنا','me')+')':''} · ${r.s?`${r.s.pts!=null?`<b>${r.s.pts}</b> ${t('نقطة','pts')} · ${RKN(r.s.rk)} · `:''}${t('حكايات','stories')} ${r.s.stories} · ${t('ألغاز','riddles')} ${r.s.riddles}${r.s.st>=2?' · 🔥'+r.s.st:''}`:`<small>${t('مخفي','hidden')}</small>`}</p>`).join('')}
async function togStats(){const off=!flag('hk_soc_stats_off');setFlag('hk_soc_stats_off',off);const {fs,db}=FB;try{if(off)await fs.deleteDoc(fs.doc(db,'stats',me.uid));else{syncT=0;await sync()}}catch(e){}hub()}

// ---------- search / requests ----------
// ---------- discovery ----------
(function(){const s=document.createElement('style');s.textContent=`.ds-w{position:relative;margin:6px 0 12px}.ds-in{width:100%;box-sizing:border-box;background:#0b1a33;color:#fff;border:1.5px solid #274a80;border-radius:16px;padding:13px 44px 13px 16px;font-size:17px;font-family:inherit;outline:none;text-align:start;transition:border-color .2s,box-shadow .2s}[dir=rtl] .ds-in{padding:13px 16px 13px 44px}.ds-in::placeholder{color:#7f97b8}.ds-in:focus{border-color:#e2b44c;box-shadow:0 0 0 3px #e2b44c33}.ds-x{position:absolute;top:50%;inset-inline-end:8px;transform:translateY(-50%);width:30px;height:30px;border-radius:50%;padding:0;margin:0;background:#1c3a6b;color:#fff;font-size:14px;display:none}.ds-h{display:flex;align-items:center;justify-content:space-between;margin:16px 4px 4px;color:#e2b44c;font-weight:700}.ds-h button{width:auto;margin:0;padding:2px 8px;background:none;color:#9fb4d0;font-size:13px;border:0}.ds-r{display:flex;align-items:center;gap:8px;padding:9px 6px;border-bottom:1px solid #1c3a6b;animation:dsIn .35s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i,0)*45ms)}@keyframes dsIn{from{opacity:0;transform:translateY(10px)}}.ds-i{flex:1;min-width:0;display:flex;align-items:center;gap:10px;cursor:pointer}.ds-t{min-width:0;display:flex;flex-direction:column}.ds-t small{color:#9fb4d0}.ds-t em{font-style:normal;font-size:12px;color:#e2b44c}.ds-r button{width:auto;margin:0;padding:8px 14px;border-radius:20px;transition:transform .15s,background .2s}.ds-r button.ok{background:#3ad1b8;color:#0b1a33}.ds-ch{display:inline-flex;align-items:center;gap:6px;background:#16325c;border-radius:20px;padding:7px 8px 7px 14px;margin:4px;cursor:pointer;animation:dsIn .3s both}.ds-ch span{color:#9fb4d0;padding:0 6px}.ds-em{text-align:center;padding:26px 10px;opacity:.85;animation:dsIn .4s both}.ds-em b{display:block;font-size:34px;margin-bottom:6px}.ds-sk{display:flex;gap:10px;align-items:center;padding:10px 6px}.ds-sk i{width:44px;height:44px;border-radius:50%}.ds-sk u{flex:1;height:30px;border-radius:10px}`;document.head.appendChild(s)})();
const DSR='hk_recent_search',SENT=new Set();let dsT=0,dsSeq=0,dsN=0;
const recents=()=>{try{return JSON.parse(localStorage.getItem(DSR)||'[]').slice(0,8)}catch(e){return[]}};
function addRecent(q){q=q.trim();if(q.length<2)return;localStorage.setItem(DSR,JSON.stringify([q].concat(recents().filter(x=>x!==q)).slice(0,8)))}
function dsRow(u,p,sub){if(!p)return'';cache.prof[u]=p;const isF=FR.includes(u),rk=p.rk!=null&&RKN(p.rk)?`<em>${RKN(p.rk)}</em>`:'';
 return `<div class="ds-r" style="--i:${dsN++}"><div class="ds-i" onclick="Soc.profileScreen('${u}')">${av(p,46)}<div class="ds-t"><b>${esc(p.name||'?')}</b><small dir="ltr">@${esc(p.handle||'')}</small>${rk}${sub?`<small>${sub}</small>`:''}</div></div>${isF?`<button onclick="Soc.chat('${u}')">💬 ${t('شات','Chat')}</button>`:SENT.has(u)?`<button class="ok" disabled>✓ ${t('اتبعت','Sent')}</button>`:`<button onclick="Soc.addFriend('${u}',this)">➕ ${t('أضف','Add')}</button>`}</div>`}
const dsSk=n=>Array.from({length:n},()=>`<div class="ds-sk"><i class="sk"></i><u class="sk"></u></div>`).join('');
function searchScreen(){dsN=0;scr(`<h2>🔎 ${t('دوّر على صديق','Find friends')}</h2><div class="ds-w"><input id="sq" class="ds-in" dir="auto" autocomplete="off" autocapitalize="off" placeholder="${t('ابحث بالاسم أو @اليوزر','Search by name or @handle')}" oninput="Soc.dsType()"><button class="ds-x" id="sqx" onclick="Soc.dsClear()">✕</button></div><div id="sres"></div>${bad('')}${back('Soc.home()')}`,()=>{});dsIdle()}
function dsType(){const i=document.getElementById('sq');if(!i)return;document.getElementById('sqx').style.display=i.value?'block':'none';clearTimeout(dsT);const q=i.value.trim();if(!q){dsSeq++;return dsIdle()}document.getElementById('sres').innerHTML=dsSk(3);dsT=setTimeout(()=>doSearch(q),280)}
function dsClear(){const i=document.getElementById('sq');i.value='';dsType();i.focus()}
function dsPick(q){const i=document.getElementById('sq');i.value=q;dsType()}
function dsDelRecent(k,ev){ev&&ev.stopPropagation();const a=recents();a.splice(k,1);localStorage.setItem(DSR,JSON.stringify(a));dsIdle()}
function dsClearRecent(){localStorage.removeItem(DSR);dsIdle()}
async function doSearch(q0){const q=(q0||'').trim();if(!q)return;const my=++dsSeq,el=document.getElementById('sres');if(!el)return;dsN=0;
 try{const {fs,db}=FB,h=q.toLowerCase().replace(/^@/,''),cap=q.charAt(0).toUpperCase()+q.slice(1),lim=fs.limit(8),Q=(f,v)=>fs.getDocs(fs.query(fs.collection(db,'profiles'),fs.orderBy(f),fs.startAt(v),fs.endAt(v+'\uf8ff'),lim)).catch(()=>({docs:[]}));
  const rs=await Promise.all([Q('handle',h),Q('name',q),Q('name',cap),Q('name',q.toLowerCase())]);if(my!==dsSeq)return;
  const blocked=new Set(await getBlocks().catch(()=>[])),seen={},L=[];
  rs.forEach(r=>r.docs.forEach(d=>{if(d.id===me.uid||blocked.has(d.id)||seen[d.id])return;seen[d.id]=1;L.push({u:d.id,p:d.data()})}));
  L.sort((a,b)=>(b.p.handle===h)-(a.p.handle===h)||(FR.includes(a.u)-FR.includes(b.u)));
  el.innerHTML=L.length?L.map(o=>dsRow(o.u,o.p)).join(''):`<div class="ds-em"><b>🕵️</b>${t('مفيش حد بالاسم ده','Nobody found')}<br><small>${t('جرّب جزء تاني من الاسم أو اليوزر','Try another part of the name or handle')}</small></div>`;
  if(L.length)addRecent(q)}catch(x){if(my===dsSeq)el.innerHTML=`<div class="ds-em"><b>📡</b>${esc(err(x))}</div>`}}
async function dsIdle(){const el=document.getElementById('sres');if(!el)return;const my=++dsSeq;dsN=0;const rc=recents();
 el.innerHTML=(rc.length?`<div class="ds-h">🕘 ${t('عمليات بحث سابقة','Recent')}<button onclick="Soc.dsClearRecent()">${t('مسح','Clear')}</button></div><div>${rc.map((r,k)=>`<span class="ds-ch" style="animation-delay:${k*40}ms" onclick="Soc.dsPick(this.firstChild.textContent)"><span style="padding:0;color:#fff">${esc(r)}</span><span onclick="Soc.dsDelRecent(${k},event)">✕</span></span>`).join('')}</div>`:'')+['near','top','mut','new'].map(k=>`<div id="ds_${k}"></div>`).join('');
 const {fs,db}=FB,blocked=new Set(await getBlocks().catch(()=>[])),skip=u=>u===me.uid||blocked.has(u),fill=(k,title,rows,empty)=>{if(my!==dsSeq)return;const e=document.getElementById('ds_'+k);if(e)e.innerHTML=rows&&rows.length?`<div class="ds-h">${title}</div>`+rows.join(''):(empty?`<div class="ds-h">${title}</div>${empty}`:'')};
 const sec=(k,title)=>{const e=document.getElementById('ds_'+k);if(e)e.innerHTML=`<div class="ds-h">${title}</div>${dsSk(2)}`};
 sec('near','📍 '+t('قريبين منك','Near you'));sec('top','🏆 '+t('أعلى اللاعبين','Top players'));sec('mut','🤝 '+t('ناس يعرفهم أصدقاؤك','Friends of friends'));sec('new','✨ '+t('لاعبين جداد','New players'));
 const jobs=[
 (async()=>{if(!flag('hk_soc_near'))return fill('near','📍 '+t('قريبين منك','Near you'),[],`<div class="ds-em"><small>${t('شغّل "ناس قريبة" علشان تشوف ناس حواليك (اختياري)','Turn on "People nearby" to see people around you (optional)')}</small><br><button style="width:auto;margin-top:8px" onclick="Soc.nearScreen()">👀 ${t('ناس قريبة','People nearby')}</button></div>`);
   const r=await loadNear();if(r.err)return fill('near','📍 '+t('قريبين منك','Near you'),[],`<div class="ds-em"><small>${esc(r.err)}</small></div>`);
   fill('near','📍 '+t('قريبين منك','Near you'),r.list.filter(o=>!skip(o.u)).slice(0,6).map(o=>dsRow(o.u,o.p,nearKm(o.km))),`<div class="ds-em"><small>${t('محدش ظاهر قريب منك دلوقتي','No one visible nearby right now')}</small></div>`)})(),
 (async()=>{const r=await fs.getDocs(fs.query(fs.collection(db,'profiles'),fs.orderBy('rk','desc'),fs.limit(12)));fill('top','🏆 '+t('أعلى اللاعبين','Top players'),r.docs.filter(d=>!skip(d.id)&&d.data().rk>0).slice(0,6).map(d=>dsRow(d.id,d.data())))})(),
 (async()=>{const cnt={};await Promise.all(FR.slice(0,12).map(async f=>{try{const r=await fs.getDocs(fs.collection(db,'friends',f,'list'));r.docs.forEach(d=>{if(d.id!==me.uid&&!FR.includes(d.id)&&!skip(d.id))(cnt[d.id]=cnt[d.id]||[]).push(f)})}catch(e){}}));
   const ids=Object.keys(cnt).sort((a,b)=>cnt[b].length-cnt[a].length).slice(0,6),ps=await Promise.all(ids.map(u=>getProf(u).catch(()=>null)));
   fill('mut','🤝 '+t('ناس يعرفهم أصدقاؤك','Friends of friends'),ids.map((u,k)=>dsRow(u,ps[k],`${cnt[u].length} ${t('أصدقاء مشتركين','mutual')}`)))})(),
 (async()=>{const r=await fs.getDocs(fs.query(fs.collection(db,'profiles'),fs.orderBy('ts','desc'),fs.limit(14)));fill('new','✨ '+t('لاعبين جداد','New players'),r.docs.filter(d=>!skip(d.id)&&!FR.includes(d.id)).slice(0,6).map(d=>dsRow(d.id,d.data())))})()];
 await Promise.all(jobs.map(j=>j.catch(()=>{})));if(my!==dsSeq)return;
 ['near','top','mut','new'].forEach(k=>{const e=document.getElementById('ds_'+k);if(e&&/ds-sk/.test(e.innerHTML))e.innerHTML=''});
 if(!document.querySelector('#sres .ds-r')&&!rc.length&&!document.querySelector('#sres .ds-em'))el.innerHTML=`<div class="ds-em"><b>🔎</b>${t('اكتب اسم أو يوزر صاحبك','Type a friend\'s name or handle')}</div>`}
async function addFriend(uid,btn){try{const {fs,db}=FB;await fs.setDoc(fs.doc(db,'requests',uid,'from',me.uid),{ts:Date.now()});SENT.add(uid);btn.textContent='✓ '+t('اتبعت','Sent');btn.classList.add('ok');btn.disabled=true}catch(x){say(err(x))}}
async function accept(uid){try{const {fs,db}=FB,b=fs.writeBatch(db);b.set(fs.doc(db,'friends',me.uid,'list',uid),{ts:Date.now()});b.set(fs.doc(db,'friends',uid,'list',me.uid),{ts:Date.now()});b.delete(fs.doc(db,'requests',me.uid,'from',uid));await b.commit()}catch(x){alert(err(x))}}
async function decline(uid){try{const {fs,db}=FB;await fs.deleteDoc(fs.doc(db,'requests',me.uid,'from',uid))}catch(x){alert(err(x))}}
async function unfriend(uid){if(!confirm(t('تشيل الصديق ده؟','Remove this friend?')))return;try{const {fs,db}=FB,b=fs.writeBatch(db);b.delete(fs.doc(db,'friends',me.uid,'list',uid));b.delete(fs.doc(db,'friends',uid,'list',me.uid));await b.commit()}catch(x){alert(err(x))}}

// ---------- chat ----------
const RKN=i=>(typeof RANKS!=='undefined'&&RANKS[i||0])?RANKS[i||0][3]+' '+(EN?RANKS[i||0][2]:RANKS[i||0][1]):'';

function blobJpg(b){return new Promise((ok,no)=>{const im=new Image(),u=URL.createObjectURL(b);im.onload=()=>{let mx=900,q=.7,img='';for(let k=0;k<6;k++){const r=Math.min(1,mx/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*r);c.height=Math.round(im.height*r);c.getContext('2d').drawImage(im,0,0,c.width,c.height);img=c.toDataURL('image/jpeg',q);if(img.length<=150000)break;q-=.1;mx-=120}URL.revokeObjectURL(u);img.length<=150000?ok(img):no('big')};im.onerror=()=>no('bad');im.src=u})}
async function memSave(n,ts,v,blob){if(!FB||!me||!prof)return;try{const img=await blobJpg(blob),{fs,db}=FB;await fs.addDoc(fs.collection(db,'memories',me.uid,'items'),{n:+n,ts:+ts,v:v?1:0,img})}catch(e){}}
async function memLoad(){if(!FB||!me||!prof)return[];try{const {fs,db}=FB,r=await fs.getDocs(fs.collection(db,'memories',me.uid,'items'));return r.docs.map(d=>d.data()).filter(x=>/^data:image\/jpeg;base64,/.test(x.img||''))}catch(e){return[]}}
let tpT=0,CH=null,GW=[],GWW={},GWIDS=[],LM={},UN={},CP={},DV={},hbT=null;
const RXS=['❤️','👍','😂','😮','😢','🙏'];
const rdK=u=>'hk_rd_'+u,getRd=u=>+(S0(rdK(u))||0),setRd=(u,v)=>localStorage.setItem(rdK(u),String(v));
const rrOn=()=>S0('hk_rr')!=='0',lsOn=()=>S0('hk_ls')!=='0';
const cidOf=u=>[me.uid,u].sort().join('_');
const msOf=m=>m.ts&&m.ts.toMillis?m.ts.toMillis():Date.now();
const snip=m=>m.del?t('🚫 رسالة محذوفة','🚫 Deleted message'):(m.au?'🎤 '+t('رسالة صوتية','Voice message'):m.img&&!m.text?'📷 '+t('صورة','Photo'):String(m.text||'').slice(0,80));
function gwStop(){GW.forEach(f=>{try{f()}catch(e){}});GW=[];GWW={};GWIDS=[];LM={};UN={};DV={};clearInterval(hbT);hbT=null;badge()}
function badge(){const n=Object.values(UN).reduce((a,b)=>a+b,0);window.__cb=n;if(typeof tbDraw==='function')tbDraw(window.__tbk||'map')}
function beat(){if(!FB||!me||document.hidden)return;try{FB.fs.setDoc(FB.fs.doc(FB.db,'presence',me.uid),{ts:lsOn()?Date.now():0}).catch(()=>{})}catch(e){}}
function recount(u){const rd=getRd(u);UN[u]=(LM[u]||[]).filter(d=>{const m=d.data();return m.from!==me.uid&&!m.del&&!(m.dl||[]).includes(me.uid)&&msOf(m)>rd}).length;badge();drawChatList()}
const GWRT={};
function gwFriend(u){if(GWIDS.indexOf(u)>19)return;const {fs,db}=FB;if(GWW[u])return;GWW[u]=1;getProf(u).then(p=>{CP[u]=p;drawChatList()}).catch(()=>{});
   GW.push(fs.onSnapshot(fs.query(fs.collection(db,'chats',cidOf(u),'messages'),fs.orderBy('ts','desc'),fs.limit(15)),s=>{LM[u]=s.docs;
    const nw=s.docs.filter(d=>d.data().from===u).reduce((a,d)=>Math.max(a,msOf(d.data())),0);if(nw>(DV[u]||0)){DV[u]=nw;fs.setDoc(fs.doc(db,'chats',cidOf(u),'deliv',me.uid),{ts:Date.now()}).catch(()=>{})}
    if(CH&&CH.u===u&&document.getElementById('cmsgs'))setRd(u,Date.now());recount(u)},e=>{delete GWW[u];GWRT[u]=(GWRT[u]||0)+1;if(GWRT[u]<=3)setTimeout(()=>{if(GWIDS.includes(u))gwFriend(u)},4000*GWRT[u])}))}
function chatRetry(){gwStop();GWRDY=false;GWERR=null;chatsScreen()}
function gwStart(){if(GW.length||!FB||!me)return;const {fs,db}=FB;
 GW.push(fs.onSnapshot(fs.collection(db,'friends',me.uid,'list'),{includeMetadataChanges:true},snap=>{if(snap.metadata.hasPendingWrites)return;const ids=snap.docs.map(d=>d.id);GWIDS=ids;
  ids.forEach(gwFriend);
  FR=ids.length?ids:FR;GWRDY=true;GWERR=null;drawChatList()},e=>{window.__ge=(window.__ge||'')+'F'+(e&&e.code);GWERR=(e&&e.code)||'err';GWRDY=true;drawChatList(1)}));
 beat();hbT=setInterval(beat,60000)}
async function chat(uid){gwStart();const p=await getProf(uid).catch(()=>null),cid=cidOf(uid);
 CH={u:uid,cid,p,docs:[],rd:0,dv:0,reply:null,pres:null,typing:false};
 scr(`<div class="sc-chh"><button class="cb-bk" onclick="Soc.tab('chat')">‹</button>${av(p||{},40)}<div style="flex:1;cursor:pointer;min-width:0" onclick="Soc.profileScreen('${uid}')"><b>${esc((p||{}).name||'')}</b><br><small id="cty" style="color:#9fb4d0">@${esc((p||{}).handle||'')}</small></div><button class="cb-bk" onclick="Soc.chatSettings()">⚙</button></div>
 <div id="cmsgs" class="sc-cm"></div><div id="crp"></div><div class="sc-cin"><label class="cb-ph">📷<input type="file" accept="image/*" style="display:none" onchange="Soc.sendPhoto(this)"></label><button class="cb-ph" style="border:0;padding:0" onclick="Soc.recStart()">🎤</button><input id="ct" maxlength="1000" autocomplete="off" placeholder="${t('اكتب رسالة...','Message...')}" oninput="Soc.typing('${uid}')" onkeydown="if(event.key=='Enter')Soc.send('${uid}')"><button class="sc-send" onclick="Soc.send('${uid}')">➤</button></div>${bad('')}`,()=>{});
 const {fs,db}=FB;setRd(uid,Date.now());recount(uid);
 const el=document.getElementById('cmsgs');cmWire(el);
 const mark=()=>{setRd(uid,Date.now());recount(uid);if(rrOn()){try{fs.setDoc(fs.doc(db,'chats',cid,'reads',me.uid),{ts:Date.now()}).catch(()=>{})}catch(e){}}};
 unsubs.push(fs.onSnapshot(fs.query(fs.collection(db,'chats',cid,'messages'),fs.orderBy('ts'),fs.limitToLast(100)),{includeMetadataChanges:true},snap=>{CH&&(CH.docs=snap.docs);cmDraw();const l=snap.docs[snap.docs.length-1];if(l&&l.data().from!==me.uid&&!snap.metadata.hasPendingWrites)mark()},e=>say(err(e))));
 mark();
 unsubs.push(fs.onSnapshot(fs.doc(db,'chats',cid,'reads',uid),d=>{if(CH){CH.rd=d.exists()?d.data().ts:0;cmDraw()}},e=>{}));
 unsubs.push(fs.onSnapshot(fs.doc(db,'chats',cid,'deliv',uid),d=>{if(CH){CH.dv=d.exists()?d.data().ts:0;cmDraw()}},e=>{}));
 unsubs.push(fs.onSnapshot(fs.doc(db,'presence',uid),d=>{if(CH){CH.pres=d.exists()?d.data().ts:0;cmSub()}},e=>{}));
 unsubs.push(fs.onSnapshot(fs.doc(db,'chats',cid,'typing',uid),d=>{if(!CH)return;CH.typing=d.exists()&&Date.now()-d.data().ts<5000;cmSub();if(CH.typing)setTimeout(cmSub,5200)},e=>{}));
 unsubs.push(()=>{CH=null})}
function cmSub(){const el=document.getElementById('cty');if(!el||!CH)return;const h='@'+((CH.p||{}).handle||'');let tx=h,col='#9fb4d0';
 if(CH.typing){tx=t('بيكتب...','typing...');col='#3ad1b8'}else if(lsOn()&&CH.pres){if(Date.now()-CH.pres<90000){tx=t('● متصل','● online');col='#3ad1b8'}else tx=t('آخر ظهور ','last seen ')+ago(CH.pres)+(EN?' ago':'')}
 el.textContent=tx;el.style.color=col}
function tickOf(m,ms,pend){if(pend)return '<span class="tk">🕓</span>';const rd=rrOn()&&CH.rd>=ms,dv=CH.dv>=ms||rd;return dv?`<span class="tk ${rd?'rd':''}">✓✓</span>`:'<span class="tk">✓</span>'}
function cmDraw(){const el=document.getElementById('cmsgs');if(!el||!CH)return;const near=el.scrollHeight-el.scrollTop-el.clientHeight<120||!el.dataset.ok;let day='';const byId={};CH.docs.forEach(d=>byId[d.id]=d.data());
 el.innerHTML=CH.docs.filter(d=>!(d.data().dl||[]).includes(me.uid)).map(d=>{const m=d.data(),mine=m.from===me.uid,ms=msOf(m),dt=new Date(ms),dk=dt.toDateString();let sep='';if(dk!==day){day=dk;sep=`<div class="sc-ds">${dt.toLocaleDateString(EN?'en-GB':'ar-EG',{day:'numeric',month:'short'})}</div>`}
  const tm=dt.toLocaleTimeString(EN?'en-GB':'ar-EG',{hour:'2-digit',minute:'2-digit'});
  const rx={};Object.values(m.rx||{}).forEach(e=>rx[e]=(rx[e]||0)+1);const rxh=Object.keys(rx).length?`<div class="cb-rx">${Object.keys(rx).map(e=>`<span>${e}${rx[e]>1?' '+rx[e]:''}</span>`).join('')}</div>`:'';
  const q=m.rep&&!m.del?`<div class="cb-q" data-q="${esc(m.rep.id)}"><b>${m.rep.f===me.uid?t('إنت','You'):esc((CH.p||{}).name||'')}</b><br>${esc(m.rep.t)}</div>`:'';
  const body=m.del?`<i style="opacity:.7">${snip(m)}</i>`:`${/^data:image\/jpeg;base64,/.test(m.img||'')?`<img class="cb-i" alt="" src="${m.img}" data-v="1">`:''}${/^data:audio\//.test(m.au||'')?`<div class="cb-vn" data-id="${d.id}"><button>▶</button><span class="wv"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span><small>${fmtD(m.ad)}</small></div>`:''}${m.text?`<span dir="auto">${esc(m.text)}</span>`:''}`;
  return sep+`<div class="cb-r ${mine?'mi':''}" data-id="${d.id}"><div class="cb-b ${mine?'mi':''} ${rxh?'hx':''}">${q}${body}<span class="sc-t">${m.ed&&!m.del?t('معدّلة · ','edited · '):''}${tm} ${mine&&!m.del?tickOf(m,ms,d.metadata.hasPendingWrites):''}</span>${rxh}</div></div>`}).join('')||`<div style="text-align:center;opacity:.85;margin-top:30px"><div style="font-size:40px">👋</div>${t('ابدأ الكلام','Say hi')}</div>`;
 if(near){el.scrollTop=el.scrollHeight;el.dataset.ok='1'}cmSub()}
function cmWire(el){let st=null,tap=null;
 el.addEventListener('pointerdown',e=>{const b=e.target.closest('.cb-b');if(!b||e.target.closest('.cb-q')||e.target.closest('.cb-vn button'))return;st={b,id:b.parentNode.dataset.id,x:e.clientX,y:e.clientY,mv:false}});
 el.addEventListener('pointermove',e=>{if(!st)return;const dx=e.clientX-st.x,dy=e.clientY-st.y;if(!st.mv&&Math.abs(dy)>Math.abs(dx)*1.3&&Math.abs(dy)>8){st=null;return}if(Math.abs(dx)>8){st.mv=true;st.b.style.transition='none';st.b.style.transform=`translateX(${Math.max(-70,Math.min(70,dx))}px)`}});
 const end=e=>{if(!st)return;const dx=e.clientX-st.x,s=st;st=null;s.b.style.transition='transform .2s';s.b.style.transform='';if(s.mv&&Math.abs(dx)>55){setReply(s.id);return}if(s.mv)return;
  if(e.target.closest&&e.target.closest('img[data-v]')){viewImg(e.target.closest('img').src);return}
  if(tap&&tap.id===s.id&&Date.now()-tap.t<320){clearTimeout(tap.h);tap=null;react(s.id,'❤️',true);heartPop(s.b);return}
  tap={id:s.id,t:Date.now(),h:setTimeout(()=>{tap=null;msgMenu(s.id)},300)}};
 el.addEventListener('pointerup',end);el.addEventListener('pointercancel',()=>{st=null});
 el.addEventListener('click',e=>{const vb=e.target.closest('.cb-vn button');if(vb){playVn(vb);return}const q=e.target.closest('.cb-q');if(q){const r=el.querySelector(`[data-id="${q.dataset.q}"] .cb-b`);if(r){r.scrollIntoView({block:'center',behavior:'smooth'});r.classList.remove('fl');void r.offsetWidth;r.classList.add('fl')}}})}
function heartPop(b){const h=document.createElement('i');h.className='cb-hp';h.textContent='❤️';b.appendChild(h);setTimeout(()=>h.remove(),800)}
const mOf=id=>{const d=CH&&CH.docs.find(x=>x.id===id);return d?d.data():null};
function setReply(id){const m=mOf(id);if(!m||m.del)return;CH.reply={id,t:snip(m).slice(0,80),f:m.from};const r=document.getElementById('crp');r.innerHTML=`<div class="cb-rp"><div style="flex:1;min-width:0"><b>${m.from===me.uid?t('إنت','You'):esc((CH.p||{}).name||'')}</b><br><small>${esc(CH.reply.t)}</small></div><button onclick="Soc.clearReply()">✕</button></div>`;const i=document.getElementById('ct');if(i)i.focus()}
function clearReply(){if(CH)CH.reply=null;const r=document.getElementById('crp');if(r)r.innerHTML=''}
function closeSheet(){const s=document.getElementById('cbs');if(s)s.remove()}
function msgMenu(id){const m=mOf(id);if(!m||!CH)return;closeSheet();const mine=m.from===me.uid,my=(m.rx||{})[me.uid],s=document.createElement('div');s.id='cbs';s.className='cb-sh';
 s.innerHTML=`<div class="cb-bd" onclick="Soc.closeSheet()"></div><div class="cb-pn"><div class="cb-rr">${m.del?'':RXS.map(e=>`<button class="${my===e?'on':''}" onclick="Soc.react('${id}','${e}')">${e}</button>`).join('')}</div>
 ${m.del?'':`<button onclick="Soc.closeSheet();Soc.setReply('${id}')">↩️ ${t('رد','Reply')}</button>`}${m.text&&!m.del?`<button onclick="Soc.copyMsg('${id}')">📋 ${t('نسخ','Copy')}</button>`:''}${mine&&m.text&&!m.del?`<button onclick="Soc.editMsg('${id}')">✏️ ${t('تعديل','Edit')}</button>`:''}<button onclick="Soc.delMe('${id}')">🗑 ${t('مسح عندي','Delete for me')}</button>${mine&&!m.del?`<button class="dg" onclick="Soc.delAll('${id}')">🗑 ${t('مسح عند الكل','Delete for everyone')}</button>`:''}</div>`;document.body.appendChild(s)}
async function react(id,e,quiet){const m=mOf(id);if(!m||!CH)return;closeSheet();const {fs,db}=FB,my=(m.rx||{})[me.uid];try{await fs.updateDoc(fs.doc(db,'chats',CH.cid,'messages',id),{['rx.'+me.uid]:(my===e&&!quiet)?fs.deleteField():e})}catch(x){say(err(x))}}
function copyMsg(id){const m=mOf(id);closeSheet();if(m&&navigator.clipboard)navigator.clipboard.writeText(m.text).catch(()=>{})}
async function editMsg(id){const m=mOf(id);closeSheet();if(!m)return;const v=prompt(t('عدّل الرسالة','Edit message'),m.text);if(v===null||!v.trim()||v.trim()===m.text)return;try{const {fs,db}=FB;await fs.updateDoc(fs.doc(db,'chats',CH.cid,'messages',id),{text:v.trim().slice(0,1000),ed:true})}catch(x){say(err(x))}}
async function delMe(id){closeSheet();try{const {fs,db}=FB;await fs.updateDoc(fs.doc(db,'chats',CH.cid,'messages',id),{dl:fs.arrayUnion(me.uid)})}catch(x){say(err(x))}}
async function delAll(id){closeSheet();if(!confirm(t('تمسح الرسالة عند الاتنين؟','Delete this message for everyone?')))return;try{const {fs,db}=FB;await fs.updateDoc(fs.doc(db,'chats',CH.cid,'messages',id),{del:true,text:'',img:''})}catch(x){say(err(x))}}
function viewImg(src){const v=document.createElement('div');v.className='cb-iv';v.innerHTML=`<img src="${src}" alt=""><button>✕</button>`;v.onclick=()=>v.remove();document.body.appendChild(v)}
function chatSettings(){closeSheet();const s=document.createElement('div');s.id='cbs';s.className='cb-sh';const row=(k,on,ti,de)=>`<label class="cb-tg"><div><b>${ti}</b><br><small>${de}</small></div><input type="checkbox" ${on?'checked':''} onchange="Soc.setPriv('${k}',this.checked)"><i></i></label>`;
 s.innerHTML=`<div class="cb-bd" onclick="Soc.closeSheet()"></div><div class="cb-pn"><h3 style="margin:4px 0 8px">⚙ ${t('خصوصية الشات','Chat privacy')}</h3>${row('rr',rrOn(),t('إيصالات القراءة','Read receipts'),t('لو قفلتها مش هتشوف علامة القراءة الزرقا عند غيرك، وهو كمان مش هيشوف عندك.','If off, you will not see blue ticks from others and they will not see yours.'))}${row('ls',lsOn(),t('متصل وآخر ظهور','Online and last seen'),t('لو قفلتها مش هتشوف حالة غيرك، وهم مش هيشوفوا حالتك.','If off, you will not see others and they will not see you.'))}<button onclick="Soc.closeSheet()">${t('تمام','Done')}</button></div>`;document.body.appendChild(s)}
function setPriv(k,v){localStorage.setItem('hk_'+k,v?'1':'0');if(k=='ls')beat();if(k=='rr'&&v&&CH)try{FB.fs.setDoc(FB.fs.doc(FB.db,'chats',CH.cid,'reads',me.uid),{ts:Date.now()}).catch(()=>{})}catch(e){}cmDraw()}
function typing(uid){const n=Date.now();if(n-tpT<2500)return;tpT=n;const {fs,db}=FB;try{fs.setDoc(fs.doc(db,'chats',cidOf(uid),'typing',me.uid),{ts:n}).catch(()=>{})}catch(e){}}
async function send(uid,extra){const i=document.getElementById('ct'),x=i.value.trim();if(!x&&!(extra&&(extra.img||extra.au)))return;const cid=cidOf(uid);i.value='';
 const o=Object.assign({from:me.uid,text:x,ts:FB.fs.serverTimestamp()},extra||{});if(CH&&CH.reply){o.rep={id:CH.reply.id,t:CH.reply.t,f:CH.reply.f};clearReply()}
 try{const {fs,db}=FB;await fs.addDoc(fs.collection(db,'chats',cid,'messages'),o);tpT=0}catch(e){say(err(e))}}

const fmtD=n=>{n=+n||0;return Math.floor(n/60)+':'+String(n%60).padStart(2,'0')};
let REC=null,VA=null;
async function recStart(){if(REC||!CH)return;if(!window.MediaRecorder||!navigator.mediaDevices)return alert(t('المتصفح ده مش بيدعم التسجيل','This browser cannot record audio'));
 let stream;try{stream=await navigator.mediaDevices.getUserMedia({audio:true})}catch(e){return alert(t('اسمح بالميكروفون عشان تسجل','Allow microphone access to record'))}
 const mime=['audio/webm;codecs=opus','audio/mp4','audio/webm'].find(m=>MediaRecorder.isTypeSupported(m))||'',ch=[];let mr;try{mr=new MediaRecorder(stream,mime?{mimeType:mime,audioBitsPerSecond:16000}:{audioBitsPerSecond:16000})}catch(e){stream.getTracks().forEach(x=>x.stop());return alert(t('التسجيل مش شغال','Recording not available'))}
 mr.ondataavailable=e=>{if(e.data&&e.data.size)ch.push(e.data)};REC={mr,stream,ch,t0:Date.now(),uid:CH.u,mime:mr.mimeType||mime||'audio/webm'};mr.start(500);
 const r=document.getElementById('crp');r.innerHTML=`<div class="cb-rec"><i class="dot"></i><b id="rct">0:00</b><span style="flex:1;opacity:.8">${t('بيسجل...','Recording...')}</span><button onclick="Soc.recStop(0)">🗑</button><button class="go" onclick="Soc.recStop(1)">➤</button></div>`;
 REC.tm=setInterval(()=>{const s=Math.round((Date.now()-REC.t0)/1000),e=document.getElementById('rct');if(e)e.textContent=fmtD(s);if(s>=60)recStop(1)},300)}
function recStop(sendIt){const R=REC;if(!R)return;REC=null;clearInterval(R.tm);const dur=Math.max(1,Math.round((Date.now()-R.t0)/1000));
 R.mr.onstop=()=>{R.stream.getTracks().forEach(x=>x.stop());if(!sendIt)return;const b=new Blob(R.ch,{type:R.mime.split(';')[0]}),fr=new FileReader();fr.onload=()=>{let au=String(fr.result);if(!/^data:audio\//.test(au))return;if(au.length>200000)return alert(t('التسجيل طويل. اعمله أقصر.','Recording too long. Keep it shorter.'));send(R.uid,{au,ad:Math.min(60,dur)})};fr.readAsDataURL(b)};
 const r=document.getElementById('crp');if(r&&!(CH&&CH.reply))r.innerHTML='';try{R.mr.stop()}catch(e){R.stream.getTracks().forEach(x=>x.stop())}}
function playVn(btn){const w=btn.closest('.cb-vn'),m=mOf(w.dataset.id);if(!m||!m.au)return;if(VA&&VA.id===w.dataset.id&&!VA.a.paused){VA.a.pause();btn.textContent='▶';w.classList.remove('pl');return}
 if(VA){VA.a.pause();document.querySelectorAll('.cb-vn').forEach(x=>{x.classList.remove('pl');x.querySelector('button').textContent='▶'})}
 const a=new Audio(m.au);VA={a,id:w.dataset.id};btn.textContent='⏸';w.classList.add('pl');a.onended=()=>{btn.textContent='▶';w.classList.remove('pl')};a.play().catch(()=>{btn.textContent='▶';w.classList.remove('pl')})}
function sendPhoto(inp){const f=inp.files&&inp.files[0];inp.value='';if(!f||!CH)return;const uid=CH.u,im=new Image(),u=URL.createObjectURL(f);im.onload=()=>{let mx=900,q=.72,img='';for(let k=0;k<6;k++){const r=Math.min(1,mx/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*r);c.height=Math.round(im.height*r);c.getContext('2d').drawImage(im,0,0,c.width,c.height);img=c.toDataURL('image/jpeg',q);if(img.length<=150000)break;q-=.1;mx-=120}
  URL.revokeObjectURL(u);if(img.length>150000)return alert(t('الصورة تقيلة.','Photo too large.'));send(uid,{img})};im.onerror=()=>alert(t('الصورة مش شغالة','Could not read the photo'));im.src=u}

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
let FEEDC=null,FEEDL=[],FEEDN=0,FEEDPS={},lkObs=null,sentObs=null,FEEDEND=false,FEEDBUSY=false,FCUR={},FEEDW=null;
const FPAGE=15,FNEXT=10,tms=x=>(x.d.ts&&x.d.ts.toMillis&&x.d.ts.toMillis())||Date.now();
async function feedOlder(){if(FEEDBUSY||FEEDEND||!FB)return 0;FEEDBUSY=true;try{const {fs,db}=FB,us=Object.keys(FCUR).filter(u=>FCUR[u]);const add=[];
  await Promise.all(us.map(async u=>{try{const r=await fs.getDocs(fs.query(fs.collection(db,'userPosts',u,'items'),fs.orderBy('ts','desc'),fs.startAfter(FCUR[u]),fs.limit(10)));if(r.docs.length<10)FCUR[u]=null;else FCUR[u]=r.docs[r.docs.length-1];r.docs.forEach(d=>add.push({id:d.id,u,d:d.data()}))}catch(e){FCUR[u]=null}}));
  const need=[...new Set(add.map(p=>p.u))].filter(u=>!(u in FEEDPS));await Promise.all(need.map(async u=>{FEEDPS[u]=await getProf(u).catch(()=>null)}));
  if(!add.length){FEEDEND=true;return 0}add.sort((a,b)=>tms(b)-tms(a));FEEDL=FEEDL.concat(add);return add.length}finally{FEEDBUSY=false}}
function feedMore(){const el=document.getElementById('fd');if(!el)return;const b=document.getElementById('fsent');if(b){if(sentObs)sentObs.unobserve(b);b.remove()}
 const n=FEEDN?FNEXT:FPAGE,part=FEEDL.slice(FEEDN,FEEDN+n);FEEDN+=part.length;const f=document.createElement('div');f.innerHTML=part.map(p=>postCard(p,FEEDPS[p.u])).join('');
 const kids=[...f.children];let k=0;const step=()=>{if(!document.getElementById('fd'))return;const c=kids.slice(k,k+3);k+=3;c.forEach(x=>{el.appendChild(x);if(lkObs)lkObs.observe(x)});if(k<kids.length)requestAnimationFrame(step);else sentinel()};if(kids.length)step();else sentinel()}
function sentinel(){const el=document.getElementById('fd');if(!el||FEEDEND&&FEEDN>=FEEDL.length)return;const m=document.createElement('div');m.id='fsent';m.style.cssText='height:60px;text-align:center;opacity:.6';m.innerHTML='<div class="sk" style="height:10px;width:40%;margin:20px auto;border-radius:6px"></div>';el.appendChild(m);
 if(sentObs)sentObs.observe(m);else{m.innerHTML=`<button class="o" onclick="Soc.feedMore()">${t('أكتر','Load more')} ↓</button>`}}
async function feedNext(){if(FEEDN<FEEDL.length)return feedMore();const n=await feedOlder();if(n)feedMore();else{const b=document.getElementById('fsent');if(b)b.remove()}}
async function feedScreen(who){
 const ck=who||'all',hot=FEEDC&&FEEDC.k===ck&&Date.now()-FEEDC.t<600000;
 scr(`<h2>📰 ${who?t('بوستاته','Posts'):t('الفيد','Feed')}</h2>${who?'':'<div id="fsb"></div>'}<div id="fd">${hot?'':[1,2].map(()=>`<div class="sc-card"><div style="display:flex;gap:10px;align-items:center"><div class="sk" style="width:36px;height:36px;border-radius:50%"></div><div class="sk" style="height:14px;width:40%;border-radius:7px"></div></div><div class="sk" style="height:220px;border-radius:14px;margin-top:10px"></div></div>`).join('')}</div>${bad('')}${back('Soc.home()')}`,()=>feedScreen(who));
 if(sentObs)sentObs.disconnect();sentObs=typeof IntersectionObserver==='function'?new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting))feedNext()},{rootMargin:'700px'}):null;FEEDEND=false;
 if(lkObs)lkObs.disconnect();lkObs=typeof IntersectionObserver==='function'?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){lkObs.unobserve(e.target);const k=e.target.id.slice(2),u=k.slice(0,k.indexOf('_')),id=k.slice(k.indexOf('_')+1);loadLikes({u,id})}}),{rootMargin:'200px'}):null;
 const draw=()=>{const el=document.getElementById('fd');if(!el)return;el.innerHTML='';FEEDN=0;
  if(!FEEDL.length){el.innerHTML=`<div class="sc-card" style="text-align:center"><div style="font-size:46px">📷</div><p>${t('الفيد فاضي. انشر أول صورة من ذكرياتك أو شارك إنجاز، وضيف أصدقاء يظهروا هنا.','Your feed is empty. Post your first memory or an achievement, and add friends to see theirs here.')}</p><div class="row"><button onclick="Soc.searchScreen()">🔎 ${t('دوّر على أصدقاء','Find friends')}</button></div></div>`;return}
  feedMore()};
 if(hot){FEEDL=FEEDC.l;FEEDPS=FEEDC.ps;draw()}
 setTimeout(()=>{if(!who&&document.getElementById('fsb'))storyBar('fsb')},hot?250:60);
 try{const {fs,db}=FB;const ids=who?[who]:[me.uid].concat(FR.slice(0,25));
  const all=[];FCUR={};await Promise.all(ids.map(async u=>{try{const r=await fs.getDocs(fs.query(fs.collection(db,'userPosts',u,'items'),fs.orderBy('ts','desc'),fs.limit(15)));FCUR[u]=r.docs.length>=15?r.docs[r.docs.length-1]:null;r.docs.forEach(d=>all.push({id:d.id,u,d:d.data()}))}catch(e){}}));
  all.sort((a,b)=>((b.d.ts&&b.d.ts.toMillis&&b.d.ts.toMillis())||Date.now())-((a.d.ts&&a.d.ts.toMillis&&a.d.ts.toMillis())||Date.now()));
  const top=all,ps={};await Promise.all([...new Set(top.map(p=>p.u))].map(async u=>{ps[u]=await getProf(u).catch(()=>null)}));
  if(!document.getElementById('fd'))return;
  const same=hot&&FEEDC.l.length===top.length&&FEEDC.l.every((x,i)=>x.id===top[i].id);
  FEEDC={k:ck,t:Date.now(),l:top,ps};FEEDL=top;FEEDPS=ps;if(!same)draw()}catch(e){say(err(e))}}
const LK={},tapT={};
function postCard(p,pr){const d=p.d,mine=p.u===me.uid,ms=d.ts&&d.ts.toMillis?d.ts.toMillis():Date.now();const k=p.u+'_'+p.id;
 return `<div class="sc-card sc-post" id="p_${k}" style="padding:12px"><div style="display:flex;align-items:center;gap:10px;cursor:pointer" onclick="Soc.profileScreen('${p.u}')">${av(pr||{},40)}<div style="flex:1"><b>${esc((pr||{}).name||'?')}</b><br><small style="color:#9fb4d0">${d.title?'📍 '+esc(d.title)+' · ':''}${ago(ms)}</small></div></div>
 ${d.kind==='badge'?`<div class="sc-bp" ondblclick="Soc.dbl('${p.u}','${p.id}')" onclick="Soc.dbl('${p.u}','${p.id}',1)"><div style="font-size:54px">🏅</div><div style="font-size:19px;font-weight:700" dir="auto">${esc(d.text)}</div><i class="sc-hrt" id="h_${k}">♥</i></div>`:`${/^data:image\/jpeg;base64,/.test(d.img||'')?`<div class="sc-pi" ondblclick="Soc.dbl('${p.u}','${p.id}')" onclick="Soc.dbl('${p.u}','${p.id}',1)"><img alt="" decoding="async" loading="lazy" src="${d.img}"><i class="sc-hrt" id="h_${k}">♥</i></div>`:''}`}
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
let MNL=[];const mnSeen=()=>{try{return JSON.parse(localStorage.getItem('hk_mnseen')||'[]')}catch(e){return[]}};
async function loadStories(){const {fs,db}=FB,out={},cut=Date.now()-DAY;MNL=[];
 try{const r=await fs.getDocs(fs.query(fs.collection(db,'stories',me.uid,'items'),fs.orderBy('ts','desc'),fs.limit(10)));
  const L=r.docs.map(d=>({id:d.id,u:me.uid,d:d.data()})).filter(x=>x.d.ts&&x.d.ts.toMillis&&x.d.ts.toMillis()>cut).reverse();if(L.length)out[me.uid]=L;
  r.docs.forEach(d=>{const x=d.data();if(x.ts&&x.ts.toMillis&&x.ts.toMillis()<=cut)fs.deleteDoc(d.ref).catch(()=>{})})}catch(e){}
 try{const f=await fs.getDocs(fs.collection(db,'storyFeed',me.uid,'items'));
  await Promise.all(f.docs.map(async k=>{const m=k.data();if(m.ts<cut){fs.deleteDoc(k.ref).catch(()=>{});return}
   try{const d=await fs.getDoc(fs.doc(db,'stories',m.o,'items',m.id));if(!d.exists()){fs.deleteDoc(k.ref).catch(()=>{});return}const x=d.data();if(!x.ts||x.ts.toMillis()<=cut)return;(out[m.o]=out[m.o]||[]).push({id:m.id,u:m.o,d:x});if(m.mn&&m.o!==me.uid)MNL.push({u:m.o,id:m.id,ts:x.ts.toMillis()})}catch(e){}}));
  Object.keys(out).forEach(u=>out[u].sort((p,q)=>p.d.ts.toMillis()-q.d.ts.toMillis()))}catch(e){}
 STO=out;return out}
async function storyBar(elId){const el=document.getElementById(elId);if(!el)return;
 el.innerHTML=`<div class="sc-sb"><div class="sc-sbi"><div class="sk" style="width:62px;height:62px;border-radius:50%"></div></div></div>`;
 const st=await loadStories().catch(()=>({}));const e2=document.getElementById(elId);if(!e2)return;const seen=seenK();const ms=mnSeen(),mnU=new Set(MNL.filter(x=>!ms.includes(x.id)).map(x=>x.u));
 const ids=[me.uid].concat(FR.filter(u=>st[u])),ps=await Promise.all(ids.map(u=>u===me.uid?prof:getProf(u).catch(()=>null)));
 e2.innerHTML=`<div class="sc-sb">`+ids.map((u,i)=>{const L=st[u],mine=u===me.uid,last=L&&L[L.length-1],un=L&&!mine&&(!seen[u]||seen[u]<last.d.ts.toMillis());
  return `<div class="sc-sbi" onclick="${L?`Soc.openStory('${u}')`:`Soc.addStory()`}"><div class="sc-sr ${L?(un?'new':'old'):'add'}">${av(ps[i]||{},56)}${mine&&!L?'<i>+</i>':''}${mnU.has(u)?'<b class="mnb">@</b>':''}</div><small>${mine?t('قصتي','Your story'):esc((ps[i]||{}).name||'')}</small></div>`}).join('')+`</div>`;
 const nw=MNL.filter(x=>!ms.includes(x.id)).sort((a,b)=>b.ts-a.ts)[0];if(nw){const k=ids.indexOf(nw.u),nm=k>=0&&ps[k]?(ps[k].name||ps[k].handle||''):'';mnToast(nw,nm)}}
function mnToast(x,nm){if(document.getElementById('mntoast'))return;const d=document.createElement('div');d.id='mntoast';d.className='sc-mnt';d.innerHTML='<b>@</b> '+esc(nm||t('صاحبك','A friend'))+' '+t('ذكرك في قصته. دوس تشوفها','mentioned you in a story. Tap to view');
 d.onclick=()=>{d.remove();openStory(x.u)};document.body.appendChild(d);setTimeout(()=>d.remove(),9000);
 const a=mnSeen();a.push(x.id);try{localStorage.setItem('hk_mnseen',JSON.stringify(a.slice(-100)))}catch(e){}}

// ---------- story editor ----------
const FILT=[['Original','none'],['Warm','sepia(.25) saturate(1.3) hue-rotate(-10deg)'],['Cool','saturate(1.1) hue-rotate(15deg) brightness(1.05)'],['B&W','grayscale(1) contrast(1.1)'],['Sepia','sepia(.9)'],['Vivid','saturate(1.8) contrast(1.1)'],['Fade','contrast(.85) brightness(1.15) saturate(.8)'],['Vintage','sepia(.4) contrast(.9) saturate(1.2) brightness(.95)']];
const BGS=[['#e2b44c','#b9522a'],['#1c5fa8','#0b2a52'],['#2fb6a0','#16507a'],['#8e4ec6','#2a2d7a'],['#e0527a','#f0a04b'],['#222','#000']];
const FONTS=['800 {s}px system-ui,sans-serif','700 {s}px Georgia,serif','700 {s}px "Noto Naskh Arabic",serif','900 {s}px Impact,"Arial Black",sans-serif'];
const COLS=['#ffffff','#000000','#e2b44c','#ee2a7b','#3ad1b8','#4d8dff'];
const EMOS=['😀','😍','😂','🔥','❤️','✨','👏','🎉','🌊','⚓','🚢','🐚','🦩','🌅','🏛','☕','🙌','😎','🥳','📍'];
const TRK=[['desert','🏜','لفّة شرقية','Oriental loop','arab'],['mystic','🏛','غموض فرعوني','Pharaonic mystic','arab'],['arabian','🕌','إيقاع عربي','Arabian groove','arab'],['fool','🌙','حالم شرقي','Dreamy oriental','arab'],['lofi','☕','لوفاي هادي','Chill lofi','chill'],['chill','🌊','نسمة بحر','Sea breeze','chill'],['bossa','💃','بوسا نوفا مبهجة','Upbeat bossa','up'],['tiki','🎉','حماس وفرحة','Upbeat tiki','up'],['cider','🍎','مريح','Easy going','chill']];
let PV=null;const pvStop=()=>{if(PV){PV.pause();PV=null}document.querySelectorAll('.sc-trk.pl').forEach(e=>e.classList.remove('pl'))};
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
 <label class="sc-up">📷 ${t('صورة','Photo')}<input type="file" accept="image/*" style="display:none" multiple onchange="Soc.edPick(this)"></label><button class="o" style="margin-top:10px" onclick="Soc.edStart(null)">Aa ${t('قصة نص','Text story')}</button></div></div>`;document.body.appendChild(e)}
let PQ=[],PS=null,PN=0,PT=0;
function edPick(inp){const fs=[...(inp.files||[])].slice(0,10);if(!fs.length)return;const ld=f=>new Promise(r=>{const im=new Image();im.onload=()=>r(im);im.onerror=()=>r(null);im.src=URL.createObjectURL(f)});
 Promise.all(fs.map(ld)).then(L=>{L=L.filter(Boolean);if(!L.length)return alert(t('الصورة مش شغالة','Could not read the photo'));PQ=L.slice(1);PS=null;PN=1;PT=L.length;edStart(L[0]);edQ()})}
function edQ(){const b=document.getElementById('edsh');if(b&&PT>1)b.textContent=t('نشر','Share')+' '+PN+'/'+PT;if(PS&&E){E.aud=PS.aud;E.except=PS.except;E.close=PS.close;E.dur=PS.dur;const d=document.getElementById('edd');if(d)d.textContent=E.dur+'s'}}
function edStart(im){const e=document.getElementById('sced');if(!e)return;E={pl:null,sl:null,mu:null,img:im,f:0,bg:0,z:1,ox:0,oy:0,rot:0,items:[],sel:-1,tool:'move',dur:30,aud:'all',except:[],pc:'#ffffff',pw:8,c:null,pen:document.createElement('canvas')};E.pen.width=EW;E.pen.height=EH;
 e.innerHTML=`<div class="sc-edh"><button onclick="Soc.edClose()">✕</button><b>${t('قصة جديدة','New story')}</b><button class="sc-go" id="edsh" onclick="Soc.edShare()">${t('نشر','Share')}</button></div>
 <div style="flex:1;min-height:0;display:flex;align-items:center;justify-content:center"><canvas id="edc" width="${EW}" height="${EH}"></canvas></div>
 <div class="sc-edt">${im?`<button onclick="Soc.edTool('c')"><span>⛶</span>${t('قص','Crop')}</button>`:''}<button onclick="Soc.edTool('f')"><span>🎨</span>${t('فلتر','Filter')}</button><button onclick="Soc.edText()"><span>Aa</span>${t('نص','Text')}</button><button onclick="Soc.edTool('e')"><span>😀</span>${t('استيكر','Sticker')}</button><button onclick="Soc.edTool('m')"><span>🎵</span>${t('موسيقى','Music')}</button><button onclick="Soc.edTool('p')"><span>✏️</span>${t('رسم','Draw')}</button><button onclick="Soc.edTool('d')"><span>⏱</span><i id="edd">30s</i></button><button onclick="Soc.edTool('a')"><span>👥</span>${t('الجمهور','Audience')}</button></div><div class="sc-edx" id="edx"></div>`;
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
 if(k=='m')h+=`<div class="sc-edr sc-sc2" style="flex-direction:column;align-items:stretch;max-height:200px;overflow:auto">${E.mu?`<button class="sc-trk" onclick="Soc.edMu(null)">🚫 ${t('من غير موسيقى','No music')}</button>`:''}${TRK.map(x=>`<div class="sc-trk ${E.mu==x[0]?'on':''}"><button class="pv" onclick="Soc.edPv('${x[0]}',this)">▶</button><span style="flex:1" onclick="Soc.edMu('${x[0]}')">${x[1]} ${EN?x[3]:x[2]}<small> · ${x[4]=='arab'?t('شرقي','Oriental'):x[4]=='up'?t('حماسي','Upbeat'):t('هادي','Chill')}</small></span><button class="pk" onclick="Soc.edMu('${x[0]}')">${E.mu==x[0]?'✓':t('اختار','Use')}</button></div>`).join('')}</div><small style="color:#9fb4d0">${t('موسيقى حرة (CC0). بتشتغل مع القصة جوه التطبيق.','Free CC0 music. It plays with the story inside the app.')}</small>`;
 if(k=='@')h+=`<div class="sc-edr" style="flex-wrap:wrap;max-height:130px;overflow:auto" id="edm">…</div>`;
 if(k=='f')h+=`<div class="sc-edr sc-sc2">${FILT.map((f,i)=>`<button class="${E.f==i?'on':''}" onclick="Soc.edFilt(${i})">${f[0]}</button>`).join('')}</div>`;
 if(k=='b')h+=`<div class="sc-edr">${BGS.map((g,i)=>`<i class="sw ${E.bg==i?'on':''}" style="background:linear-gradient(135deg,${g[0]},${g[1]})" onclick="Soc.edBg(${i})"></i>`).join('')}</div>`;
 if(k=='e')h+=`<div class="sc-edr"><button onclick="Soc.edTime()">🕒 ${t('الوقت','Time')}</button><button onclick="Soc.edTool('@')">@ ${t('منشن','Mention')}</button><button onclick="Soc.edTime(1)">📅 ${t('التاريخ','Date')}</button><button onclick="Soc.edPoll()">📊 ${t('استفتاء','Poll')}</button><button onclick="Soc.edSlider()">🎚 ${t('سلايدر','Slider')}</button></div>${E.pl?`<div class="sc-edr"><small style="flex:1">📊 ${esc(E.pl.q)}: ${esc(E.pl.a)} / ${esc(E.pl.b)}</small><button onclick="Soc.edPlDel('pl')">🗑</button></div>`:''}${E.sl?`<div class="sc-edr"><small style="flex:1">🎚 ${esc(E.sl.q)} ${esc(E.sl.e)}</small><button onclick="Soc.edPlDel('sl')">🗑</button></div>`:''}<div class="sc-edr sc-sc2">${EMOS.map(x=>`<button onclick="Soc.edEmo('${x}')" style="font-size:26px">${x}</button>`).join('')}</div>`;
 if(k=='p')h+=`<div class="sc-edr">${COLS.map(c=>`<i class="sw ${E.pc==c?'on':''}" style="background:${c}" onclick="Soc.edPen('${c}')"></i>`).join('')}<input type="range" min="3" max="30" value="${E.pw}" oninput="Soc.edPw(this.value)" style="flex:1"><button onclick="Soc.edClr()">↺</button></div>`;
 if(k=='d')h+=`<div class="sc-edr">${[30,45,60].map(d=>`<button class="${E.dur==d?'on':''}" onclick="Soc.edDur(${d})">${d}s</button>`).join('')}<small style="flex:1;color:#9fb4d0">${t('مدة ظهور القصة. الصلاحية ٢٤ ساعة.','Display time per viewer. It lasts 24 h.')}</small></div>`;
 if(k=='a')h+=`<div class="sc-edr">${[['all',t('كل الأصدقاء','All friends')],['close',t('المقربين','Close friends')],['except',t('إلا ناس','All except')]].map(a=>`<button class="${E.aud==a[0]?'on':''}" onclick="Soc.edAud('${a[0]}')">${a[1]}</button>`).join('')}</div><div id="edl"></div>`;
 el.innerHTML=h;if(k=='a')edList();if(k=='@')edMen()}
async function edList(){const el=document.getElementById('edl');if(!el||E.aud=='all')return;el.innerHTML='…';if(!E.close){try{const {fs,db}=FB,d=await fs.getDoc(fs.doc(db,'closeFriends',me.uid));E.close=d.exists()?d.data().list:[]}catch(e){E.close=[]}}
 const ids=FR,ps=await Promise.all(ids.map(u=>getProf(u).catch(()=>null)));if(!document.getElementById('edl'))return;const set=E.aud=='close'?E.close:E.except;
 document.getElementById('edl').innerHTML=ids.length?`<div class="sc-edr" style="flex-wrap:wrap;max-height:120px;overflow:auto">`+ids.map((u,i)=>`<label class="sc-pk ${set.includes(u)?'on':''}" onclick="Soc.edPk('${u}')">${av(ps[i],24)} ${esc((ps[i]||{}).name||'?')}</label>`).join('')+`</div><small style="color:#9fb4d0">${E.aud=='close'?t('المقربين بس هيشوفوها.','Only the people you pick will see it.'):t('الناس دي مش هتشوفها.','The people you pick will not see it.')}</small>`:`<small>${t('ضيف أصدقاء الأول.','Add friends first.')}</small>`}
function edPk(u){const set=E.aud=='close'?E.close:E.except,i=set.indexOf(u);if(i>=0)set.splice(i,1);else set.push(u);edList()}
function edAud(a){E.aud=a;edPanel()}
function edTime(d){const n=new Date(),L=EN?'en-GB':'ar-EG',txt=d?n.toLocaleDateString(L,{weekday:'short',day:'numeric',month:'short'}):n.toLocaleTimeString(L,{hour:'2-digit',minute:'2-digit'});E.items.push({k:'t',x:EW/2,y:EH*.25+(E.items.length%4)*110,s:72,txt,font:3,col:'#ffffff'});E.sel=E.items.length-1;E.tool='move';E.pt='t';edDraw(1);edPanel()}
async function edMen(){const el=document.getElementById('edm');if(!el)return;if(!FR.length){el.innerHTML=`<small>${t('ضيف أصدقاء الأول.','Add friends first.')}</small>`;return}const ps=await Promise.all(FR.map(u=>getProf(u).catch(()=>null)));const e2=document.getElementById('edm');if(!e2)return;e2.innerHTML=ps.map((p,i)=>p?`<label class="sc-pk" onclick="Soc.edMention('${esc(p.handle||'')}','${FR[i]}')">${av(p,24)} @${esc(p.handle||'')}</label>`:'').join('')}
function edMention(h,u){if(!h)return;if(u){E.mn=E.mn||{};E.mn['@'+h]=u}E.items.push({k:'t',x:EW/2,y:EH*.7,s:60,txt:'\u200e@'+h,font:0,col:'#4d8dff'});E.sel=E.items.length-1;E.tool='move';E.pt='t';edDraw(1);edPanel()}
function edPoll(){const q=prompt(t('سؤال الاستفتاء','Poll question'),'');if(!q||!q.trim())return;const a=prompt(t('الاختيار الأول','Option 1'),t('أيوه','Yes'));if(!a)return;const b=prompt(t('الاختيار التاني','Option 2'),t('لأ','No'));if(!b)return;E.pl={q:q.trim().slice(0,60),a:a.trim().slice(0,25),b:b.trim().slice(0,25)};edPanel()}
function edSlider(){const q=prompt(t('سؤال السلايدر','Slider question'),'');if(!q||!q.trim())return;const e=prompt(t('إيموجي','Emoji'),'😍');E.sl={q:q.trim().slice(0,60),e:([...(e||'😍')][0]||'😍')};edPanel()}
function edPlDel(k){E[k]=null;edPanel()}
function edMu(k){E.mu=k;pvStop();edPanel()}
function edPv(k,b){const was=b.parentNode.classList.contains('pl');pvStop();if(was)return;PV=new Audio('music/'+k+'.mp3');PV.volume=.7;PV.loop=true;PV.play().catch(()=>{});b.parentNode.classList.add('pl');b.textContent='⏸'}
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
function edClose(){PQ=[];PS=null;PT=0;pvStop();const e=document.getElementById('sced');if(e)e.remove();E=null}
async function edShare(){if(!E)return;if(!E.img&&!E.items.length&&!confirm(t('القصة فاضية. تنشر؟','The story is empty. Post anyway?')))return;
 const cap=''; E.sel=-1;edDraw();let q=.82,img='';for(let i=0;i<6;i++){img=E.c.toDataURL('image/jpeg',q);if(img.length<=250000)break;q-=.12}
 if(img.length>255000)return alert(t('الصورة تقيلة. جرب صورة تانية.','Image too large. Try another photo.'));
 const {fs,db}=FB;let rec=FR.slice();if(E.aud=='close'){if(!E.close)await edList();rec=rec.filter(u=>(E.close||[]).includes(u))}else if(E.aud=='except')rec=rec.filter(u=>!E.except.includes(u));
 if(E.aud=='close'&&!rec.length)return alert(t('اختار ناس من المقربين الأول.','Pick some close friends first.'));
 const b=document.getElementById('edsh');busy('edsh',true,t('بننشر','Posting'));
 try{if(E.aud=='close'&&E.close)await fs.setDoc(fs.doc(db,'closeFriends',me.uid),{list:E.close});
  const ref=fs.doc(fs.collection(db,'stories',me.uid,'items')),mk=async(dur,mu,ex,nomn)=>{const bt=fs.writeBatch(db),o={uid:me.uid,img,cap,ts:fs.serverTimestamp(),dur,aud:E.aud};if(mu)o.mu=mu;if(ex){if(E.pl)o.pl=E.pl;if(E.sl)o.sl=E.sl}bt.set(ref,o);
  const MNs=ex&&!nomn?Object.keys(E.mn||{}).filter(k=>E.items.some(it=>it.txt&&it.txt.includes(k))).map(k=>E.mn[k]):[];rec.forEach(u=>{const o={o:me.uid,id:ref.id,ts:Date.now()};if(MNs.includes(u))o.mn=true;bt.set(fs.doc(db,'storyFeed',u,'items',me.uid+'_'+ref.id),o)});await bt.commit()};const pe=e=>/permission/i.test(String(e&&(e.code||e.message)));try{await mk(E.dur,E.mu,1)}catch(e){if(!pe(e))throw e;try{await mk(E.dur,E.mu,1,1)}catch(e2){if(pe(e2))await mk(Math.min(E.dur,15));else throw e2}}
  const n=rec.length;if(PQ.length){PS={aud:E.aud,except:E.except,close:E.close,dur:E.dur};PN++;edStart(PQ.shift());edQ();if(view)view();return}edClose();alert(t('اتنشرت قصتك لـ ','Your story is live for ')+n+t(' صديق لمدة ٢٤ ساعة',' friend(s) for 24 hours'));if(view)view()}catch(e){busy('edsh',false);alert(err(e))}}
let stoMu=null;
function muToggle(){const off=S0('hk_smute')!=='1';localStorage.setItem('hk_smute',off?'1':'0');if(stoMu)stoMu.muted=off;const b=document.getElementById('smb');if(b)b.textContent=off?'🔇':'🎵'}
function closeStory(){stopMu();if(stoView){clearTimeout(stoView.t);stoView.el.remove();stoView=null}}
async function openStory(u){const L=STO[u];if(!L||!L.length)return;closeStory();const el=document.createElement('div');el.className='sc-sv';document.body.appendChild(el);stoView={el,u,i:0,t:null};showStory()}
async function showStory(){const v=stoView;if(!v)return;const L=STO[v.u];if(v.i>=L.length){closeStory();return}const x=L[v.i],p=v.u===me.uid?prof:await getProf(v.u).catch(()=>({})),mine=v.u===me.uid;
 v.el.innerHTML=`<div class="sc-sp">${L.map((_,k)=>`<i class="${k<v.i?'d':k==v.i?'a':''}">${k==v.i?`<u style="animation-duration:${(x.d.dur||30)}s"></u>`:''}</i>`).join('')}</div><div class="sc-sh">${av(p,34)}<b>${esc((p||{}).name||'')}</b><small>${esc(x.d.ts.toDate().toLocaleTimeString(EN?'en-GB':'ar-EG',{hour:'2-digit',minute:'2-digit'}))}</small><button onclick="Soc.closeStory()">✕</button></div>
 <img src="${/^data:image\/jpeg;base64,/.test(x.d.img||'')?x.d.img:''}" alt=""><div class="sc-sc">${esc(x.d.cap||'')}</div><div class="sc-nv"><div onclick="Soc.stepStory(-1)"></div><div onclick="Soc.stepStory(1)"></div></div>
 ${mine?`<div class="sc-sf"><button class="sc-vw" id="svw" onclick="Soc.storyViews('${x.id}')">👁 <b id="svn">…</b> ${t('مشاهدة','views')}</button><button onclick="Soc.delStory('${x.id}')">🗑</button></div>`:`<div class="sc-rpl"><div class="sc-rxs">${['❤️','😂','😮','😢','🔥','👏'].map(e=>`<button onclick="Soc.storyRx('${x.id}','${e}',this)">${e}</button>`).join('')}</div><div class="sc-ri"><input id="sri" maxlength="300" autocomplete="off" placeholder="${t('ردّ على ','Reply to ')}${esc((p||{}).name||'')}..." onfocus="Soc.pauseStory()" onkeydown="if(event.key=='Enter')Soc.storyReply('${x.id}')"><button onclick="Soc.storyReply('${x.id}')">➤</button></div></div>`}`;
 const ov=document.createElement('div');ov.className='sc-ovl';ov.innerHTML=(x.d.pl?`<div class="sc-pl"><b dir="auto">${esc(x.d.pl.q)}</b><div class="sc-po"><button data-i="0">${esc(x.d.pl.a)}</button><button data-i="1">${esc(x.d.pl.b)}</button></div></div>`:'')+(x.d.sl?`<div class="sc-pl"><b dir="auto">${esc(x.d.sl.q)}</b><div class="sc-sl"><input type="range" min="0" max="100" value="${+S0('hk_sv_'+x.id)||50}" style="--e:'${esc(x.d.sl.e)}'"><small>${esc(x.d.sl.e)}</small></div></div>`:'');
 if(ov.innerHTML){v.el.appendChild(ov);const pv=S0('hk_pv_'+x.id);ov.querySelectorAll('.sc-po button').forEach(b=>{if(pv===b.dataset.i)b.classList.add('on');b.onclick=ev=>{ev.stopPropagation();if(mine)return;localStorage.setItem('hk_pv_'+x.id,b.dataset.i);ov.querySelectorAll('.sc-po button').forEach(z=>z.classList.toggle('on',z===b));storyMark(x.id,{pv:+b.dataset.i})}});const sr=ov.querySelector('input[type=range]');if(sr)sr.onchange=()=>{localStorage.setItem('hk_sv_'+x.id,sr.value);if(!mine)storyMark(x.id,{sv:+sr.value})}}
 if(mine){const {fs,db}=FB;fs.getDocs(fs.collection(db,'stories',me.uid,'items',x.id,'views')).then(r=>{const e=document.getElementById('svn');if(e)e.textContent=r.size}).catch(()=>{})}
 clearTimeout(v.t);v.t=setTimeout(()=>stepStory(1),(x.d.dur||30)*1000);
 stopMu();if(/^[a-z]{3,10}$/.test(x.d.mu||'')&&TRK.some(z=>z[0]==x.d.mu)){stoMu=new Audio('music/'+x.d.mu+'.mp3');stoMu.loop=true;stoMu.volume=.6;stoMu.muted=S0('hk_smute')==='1';stoMu.play().catch(()=>{});const tr=TRK.find(z=>z[0]==x.d.mu),sh=v.el.querySelector('.sc-sh');if(sh){const mb=document.createElement('button');mb.id='smb';mb.className='sc-mb';mb.textContent=S0('hk_smute')==='1'?'🔇':'🎵';mb.title=(EN?tr[3]:tr[2]);mb.onclick=ev=>{ev.stopPropagation();muToggle()};sh.insertBefore(mb,sh.lastElementChild)}}
 const sn=seenK();sn[v.u]=x.d.ts.toMillis();localStorage.setItem('hk_seen',JSON.stringify(sn));
 if(!mine)storyMark(x.id,{})}
function stopMu(){if(stoMu){stoMu.pause();stoMu=null}}
function stepStory(d){const v=stoView;if(!v)return;v.i+=d;if(v.i<0)v.i=0;showStory()}
async function storyViews(id){const v=stoView;if(!v)return;pauseStory();const {fs,db}=FB;closeSheet();const s=document.createElement('div');s.id='cbs';s.className='cb-sh';s.innerHTML=`<div class="cb-bd" onclick="Soc.closeSheet();Soc.resumeStory()"></div><div class="cb-pn" style="max-height:70vh;overflow:auto"><h3 style="margin:2px 0 6px">👁 ${t('اللي شافوا القصة','Viewed by')}</h3><div id="svl"><div class="sk" style="height:44px;border-radius:12px"></div></div></div>`;document.body.appendChild(s);
 try{const r=await fs.getDocs(fs.collection(db,'stories',me.uid,'items',id,'views')),rows=await Promise.all(r.docs.map(async d=>({d:d.data(),p:await getProf(d.id).catch(()=>null)})));rows.sort((a,b)=>(b.d.ts||0)-(a.d.ts||0));const cur=STO[v.u][v.i].d;let res='';if(cur.pl){const c=[0,0];rows.forEach(x=>{if(x.d.pv===0||x.d.pv===1)c[x.d.pv]++});res+=`<div class="sc-res">📊 <b>${esc(cur.pl.q)}</b><br>${esc(cur.pl.a)}: <b>${c[0]}</b> · ${esc(cur.pl.b)}: <b>${c[1]}</b></div>`}if(cur.sl){const z=rows.filter(x=>typeof x.d.sv==='number');res+=`<div class="sc-res">🎚 <b>${esc(cur.sl.q)}</b> ${esc(cur.sl.e)}<br>${z.length?t('المتوسط ','Average ')+Math.round(z.reduce((a,x)=>a+x.d.sv,0)/z.length)+'% ('+z.length+')':t('لسه محدش ردّ','No answers yet')}</div>`}
  const el=document.getElementById('svl');if(el)el.innerHTML=res+(rows.length?rows.map(x=>`<div class="sc-vr">${av(x.p||{},40)}<div style="flex:1;min-width:0"><b>${esc((x.p||{}).name||'?')}</b><br><small style="color:#9fb4d0">${ago(x.d.ts||Date.now())}${x.d.rp?' · '+esc(x.d.rp):''}</small></div><span style="font-size:24px">${esc(x.d.rx||'')}</span></div>`).join(''):`<p style="text-align:center;opacity:.8">${t('لسه محدش شافها 👀','Nobody has seen it yet 👀')}</p>`)}catch(e){say(err(e))}}
function pauseStory(){const v=stoView;if(!v)return;clearTimeout(v.t);const u=v.el.querySelector('.sc-sp u');if(u)u.style.animationPlayState='paused'}
function resumeStory(){const v=stoView;if(!v)return;const u=v.el.querySelector('.sc-sp u');if(u)u.style.animationPlayState='running';clearTimeout(v.t);const x=STO[v.u][v.i];v.t=setTimeout(()=>stepStory(1),((x&&x.d.dur)||30)*1000*0.5)}
async function storyMark(id,patch){const v=stoView;if(!v)return;const {fs,db}=FB;try{await fs.setDoc(fs.doc(db,'stories',v.u,'items',id,'views',me.uid),Object.assign({ts:Date.now()},patch),{merge:true})}catch(e){}}
async function storyDM(text){const v=stoView;if(!v)return;const {fs,db}=FB;try{await fs.addDoc(fs.collection(db,'chats',cidOf(v.u),'messages'),{from:me.uid,text:text.slice(0,1000),ts:fs.serverTimestamp()})}catch(e){say(err(e))}}
function storyRx(id,e,btn){const f=document.createElement('i');f.className='sc-fl';f.textContent=e;const b=btn.getBoundingClientRect();f.style.left=(b.left+b.width/2-14)+'px';f.style.top=b.top+'px';document.body.appendChild(f);setTimeout(()=>f.remove(),1300);
 storyMark(id,{rx:e});storyDM(e+' '+t('على قصتك','on your story'))}
async function storyReply(id){const i=document.getElementById('sri'),x=i&&i.value.trim();if(!x)return;i.value='';i.blur();storyMark(id,{rp:x.slice(0,200)});await storyDM('↩️ '+t('ردّ على قصتك','Reply to your story')+': '+x);const b=document.querySelector('.sc-ri');if(b){b.classList.add('ok');setTimeout(()=>b.classList.remove('ok'),900)}resumeStory()}
async function delStory(id){if(!confirm(t('تمسح القصة؟','Delete this story?')))return;const {fs,db}=FB;try{await fs.deleteDoc(fs.doc(db,'stories',me.uid,'items',id));closeStory();if(view)view()}catch(e){alert(err(e))}}


// ---------- tabs ----------
async function tab(k){if(!FB||!me||!prof){await open();if(!me||!prof)return}
 if(k=='feed')feedScreen();else if(k=='chat')chatsScreen();else if(k=='hood')hoodScreen();else home()}
function ago(ms){const m=Math.round((Date.now()-ms)/60000);if(m<1)return t('دلوقتي','now');if(m<60)return m+t(' د',' m');const h=Math.round(m/60);if(h<24)return h+t(' س',' h');return Math.round(h/24)+t(' يوم',' d')}
async function chatsScreen(){gwStart();scr(`<h2>💬 ${t('الشات','Chats')}</h2><div id="cl"><div class="sc-card"><div class="sk" style="height:48px;border-radius:12px;margin:6px 0"></div><div class="sk" style="height:48px;border-radius:12px;margin:6px 0"></div></div></div>${back('Soc.home()')}`,()=>chatsScreen());
 GWRDY=!!GWRDY&&GWIDS!==null;setTimeout(()=>drawChatList(1),4500);drawChatList()}
let GWRDY=false,GWERR=null;
function drawChatList(force){const el=document.getElementById('cl');if(!el||!me)return;if(!force&&!GWRDY&&!GWIDS.length&&!FR.length&&el.querySelector('.sk'))return;
 if(GWERR&&!GWIDS.length&&!FR.length){el.innerHTML=`<div class="sc-card" style="text-align:center"><div style="font-size:44px">💬</div><p>${t('مقدرناش نحمّل الشات دلوقتي. تأكد من النت وجرّب تاني.','Could not load chats right now. Check your connection and try again.')}</p><button onclick="Soc.chatRetry()">🔄 ${t('حاول تاني','Retry')}</button></div>`;return}

 const ids=GWIDS.length?GWIDS:FR,rows=ids.map(u=>{const m=(LM[u]||[]).map(d=>d.data()).find(m=>!(m.dl||[]).includes(me.uid));return{u,p:CP[u],m,n:UN[u]||0}});
 rows.sort((a,b)=>(b.m?msOf(b.m):0)-(a.m?msOf(a.m):0));
 el.innerHTML=rows.length?`<div class="sc-card" style="padding:6px 12px">`+rows.map(r=>`<div class="cb-li" onclick="Soc.chat('${r.u}')">${av(r.p||{},46)}<div style="flex:1;min-width:0"><b>${esc((r.p||{}).name||'?')}</b><br><small class="${r.n?'un':''}" dir="auto">${r.m?(r.m.from===me.uid?t('إنت: ','You: '):'')+esc(snip(r.m)):t('ابدأ المحادثة 👋','Say hi 👋')}</small></div><div style="text-align:end"><small style="color:${r.n?'#3ad1b8':'#9fb4d0'}">${r.m?ago(msOf(r.m)):''}</small>${r.n?`<div class="cb-n">${r.n>9?'9+':r.n}</div>`:''}</div></div>`).join('')+`</div>`:`<div class="sc-card" style="text-align:center"><div style="font-size:44px">💬</div><p>${t('لسه معندكش أصدقاء تتكلم معاهم. دوّر على ناس أو شوف مين قريب منك.','No friends to chat with yet. Search for people or see who is nearby.')}</p><div class="row"><button onclick="Soc.searchScreen()">🔎 ${t('دوّر على أصدقاء','Find friends')}</button></div></div>`}

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

// ---------- حكاية الحي (neighbourhood feed) ----------
const HK=[['all','الكل','All'],['new','مكان جديد','New place'],['event','حدث','Event'],['hist','معلومة تاريخية','History'],['ask','سؤال','Question']];
let HF='all',HK2='new',HL=[],HCELL='',HNEAR=[];
const hcell=(la,lo)=>Math.floor(la/.02)+'_'+Math.floor(lo/.02);
function hcells(la,lo){const a=Math.floor(la/.02),b=Math.floor(lo/.02),o=[];for(let i=-1;i<=1;i++)for(let j=-1;j<=1;j++)o.push((a+i)+'_'+(b+j));return o}
function hpos(){const p=myP();return p&&p.lat!=null?{lat:p.lat,lon:p.lon,real:1}:{lat:31.2653,lon:32.3019,real:0}}
function hkn(k){const x=HK.find(y=>y[0]==k)||HK[1];return t(x[1],x[2])}
async function hoodScreen(){
 const p=hpos();HCELL=hcell(p.lat,p.lon);
 scr(`<h2>${t('حكاية الحي','Neighbourhood stories')}</h2><p class="sc-sub">${p.real?t('اللي بيحصل حواليك (حوالي ٢ كم). اسأل أو احكي أو شارك مكان جديد.','What is around you (about 2 km). Ask, tell, or share a new place.'):t('مش لاقيين لوكيشنك. بنعرض بورسعيد. شغّل اللوكيشن علشان تشوف حيّك.','No location yet, showing central Port Said. Turn on location to see your area.')}</p>
 <div class="sc-card hd-c"><div class="sc-chips hd-k">${HK.slice(1).map(x=>`<span class="${x[0]==HK2?'on':''}" onclick="Soc.hoodKind('${x[0]}')">${t(x[1],x[2])}</span>`).join('')}</div>
 <textarea id="hdt" maxlength="300" rows="3" placeholder="${t('احكي حاجة عن حيّك... محل جديد؟ حدث؟ معلومة قديمة؟ أو اسأل سؤال','Share something about your area: a new place, an event, history, or ask a question')}"></textarea>
 <input id="hdp" maxlength="60" placeholder="${t('اسم المكان (اختياري)','Place name (optional)')}"><button id="hdb" onclick="Soc.hoodPost()">${t('انشر في الحي','Post to the neighbourhood')}</button><div id="hdm" class="msg" style="display:none"></div></div>
 <div class="sc-chips hd-f">${HK.map(x=>`<span class="${x[0]==HF?'on':''}" onclick="Soc.hoodFilter('${x[0]}')">${t(x[1],x[2])}</span>`).join('')}</div>
 <div id="hdl"><div class="sc-card"><div class="sk" style="height:60px;border-radius:12px"></div></div></div>${back('Soc.home()')}`,()=>hoodScreen());
 hoodLoad()}
function hoodKind(k){HK2=k;document.querySelectorAll('.hd-k span').forEach((s,i)=>s.classList.toggle('on',HK.slice(1)[i][0]==k))}
function hoodFilter(k){HF=k;document.querySelectorAll('.hd-f span').forEach((s,i)=>s.classList.toggle('on',HK[i][0]==k));hoodDraw()}
async function hoodLoad(){
 try{const {fs,db}=FB,p=hpos();const r=await fs.getDocs(fs.query(fs.collection(db,'hood'),fs.where('cell','in',hcells(p.lat,p.lon)),fs.limit(80)));
  HL=r.docs.map(d=>({id:d.id,...d.data()})).filter(x=>x.ts&&x.ts.toMillis).sort((a,b)=>b.ts.toMillis()-a.ts.toMillis());
  await Promise.all([...new Set(HL.map(x=>x.uid))].map(u=>getProf(u).catch(()=>null)));hoodDraw()}
 catch(e){const el=document.getElementById('hdl');if(el)el.innerHTML=`<div class="sc-card msg bad">${esc(String(e&&e.code||e).includes('permission')?t('مش مسموح. القواعد على Firebase لسه ما اتنشرتش؟','Not allowed. Were the Firebase rules published?'):err(e))}</div>`}}
const hhide=()=>{try{return JSON.parse(S0('hk_hh')||'[]')}catch(e){return[]}};
function hoodDraw(){const el=document.getElementById('hdl');if(!el)return;const hh=hhide(),L=HL.filter(x=>(HF=='all'||x.k==HF)&&!hh.includes(x.id));
 if(!L.length){el.innerHTML=`<div class="sc-card" style="text-align:center"><p>${t('لسه مفيش حكايات في حيّك. كون أول واحد يحكي!','Nothing here yet. Be the first to share!')}</p></div>`;return}
 el.innerHTML=L.map(x=>{const p=cache.prof[x.uid]||{};return `<div class="sc-card hd-p" id="hp${x.id}"><div class="hd-h">${av(p,34)}<div><b>${esc(p.name||p.handle||'')}</b><small>${ago(x.ts.toMillis())}${x.pl?' · '+esc(x.pl):''}</small></div><i class="hd-b k-${esc(x.k)}">${hkn(x.k)}</i></div><p class="hd-t" dir="auto">${esc(x.txt)}</p>
 <div class="hd-a"><button class="o" onclick="Soc.hoodReplies('${x.id}')">${t('ردود','Replies')}${x.rc?' ('+x.rc+')':''}</button>${me&&x.uid==me.uid?`<button class="o" onclick="Soc.hoodDel('${x.id}')">${t('مسح','Delete')}</button>`:`<button class="o" onclick="Soc.hoodReport('${x.id}')">${t('تبليغ / إخفاء','Report / hide')}</button>`}</div><div id="hr${x.id}"></div></div>`}).join('')}
async function hoodPost(){const txt=(document.getElementById('hdt').value||'').trim(),pl=(document.getElementById('hdp').value||'').trim(),m=document.getElementById('hdm');
 if(txt.length<3){m.style.display='block';m.className='msg bad';m.textContent=t('اكتب حاجة الأول.','Write something first.');return}
 const p=hpos();busy('hdb',true,t('بننشر','Posting'));
 try{const {fs,db}=FB,o={uid:me.uid,cell:hcell(p.lat,p.lon),k:HK2,txt:txt.slice(0,300),ts:fs.serverTimestamp()};if(pl)o.pl=pl.slice(0,60);await fs.addDoc(fs.collection(db,'hood'),o);document.getElementById('hdt').value='';document.getElementById('hdp').value='';busy('hdb',false);await hoodLoad()}
 catch(e){busy('hdb',false);m.style.display='block';m.className='msg bad';m.textContent=String(e&&e.code||e).includes('permission')?t('مش مسموح. القواعد على Firebase لسه ما اتنشرتش؟','Not allowed. Were the Firebase rules published?'):err(e)}}
async function hoodReport(id){if(!confirm(t('تبلغ عن البوست ده وتخفيه من عندك؟','Report this post and hide it for you?')))return;const a=hhide();a.push(id);try{localStorage.setItem('hk_hh',JSON.stringify(a.slice(-300)))}catch(e){}hoodDraw();try{const {fs,db}=FB;await fs.setDoc(fs.doc(db,'hoodReports',id+'_'+me.uid),{pid:id,uid:me.uid,ts:fs.serverTimestamp()})}catch(e){}}
async function hoodDel(id){if(!confirm(t('تمسح البوست؟','Delete this post?')))return;try{const {fs,db}=FB;await fs.deleteDoc(fs.doc(db,'hood',id));HL=HL.filter(x=>x.id!=id);hoodDraw()}catch(e){alert(err(e))}}
async function hoodReplies(id){const el=document.getElementById('hr'+id);if(!el)return;if(el.dataset.o){el.innerHTML='';el.dataset.o='';return}el.dataset.o='1';el.innerHTML='<div class="sk" style="height:30px;border-radius:8px"></div>';
 try{const {fs,db}=FB,r=await fs.getDocs(fs.query(fs.collection(db,'hood',id,'r'),fs.limit(50)));const L=r.docs.map(d=>d.data()).filter(x=>x.ts&&x.ts.toMillis).sort((a,b)=>a.ts.toMillis()-b.ts.toMillis());await Promise.all([...new Set(L.map(x=>x.uid))].map(u=>getProf(u).catch(()=>null)));
  el.innerHTML=L.map(x=>{const p=cache.prof[x.uid]||{};return `<div class="hd-r">${av(p,24)}<div><b>${esc(p.name||p.handle||'')}</b> <small>${ago(x.ts.toMillis())}</small><p dir="auto">${esc(x.txt)}</p></div></div>`}).join('')+`<div class="hd-ri"><input id="hi${id}" maxlength="200" placeholder="${t('اكتب رد','Write a reply')}"><button onclick="Soc.hoodReply('${id}')">${t('ابعت','Send')}</button></div>`}
 catch(e){el.innerHTML=`<div class="msg bad">${esc(err(e))}</div>`}}
async function hoodReply(id){const i=document.getElementById('hi'+id),txt=i&&i.value.trim();if(!txt)return;try{const {fs,db}=FB;await fs.addDoc(fs.collection(db,'hood',id,'r'),{uid:me.uid,txt:txt.slice(0,200),ts:fs.serverTimestamp()});const el=document.getElementById('hr'+id);el.dataset.o='';await hoodReplies(id)}catch(e){alert(String(e&&e.code||e).includes('permission')?t('مش مسموح. القواعد على Firebase لسه ما اتنشرتش؟','Not allowed. Were the Firebase rules published?'):err(e))}}

return{hoodReport,hoodScreen,hoodKind,hoodFilter,hoodPost,hoodDel,hoodReplies,hoodReply,publish,feedMore,feedNext,chatRetry,retryView,dsType,dsClear,dsPick,dsDelRecent,dsClearRecent,edPoll,edSlider,edPlDel,memSave,memLoad,edTime,edMention,edMu,edPv,muToggle,pauseStory,resumeStory,storyRx,storyReply,msgMenu,recStart,recStop,chat:chat,closeSheet,setReply,clearReply,react,copyMsg,editMsg,delMe,delAll,chatSettings,setPriv,sendPhoto,edZoom,edRot,edTfReset,typing,dbl,edClose,edPick,edStart,edTool,edText,edEmo,edSize,edFont,edCol,edDel,edPen,edPw,edClr,edFilt,edBg,edDur,edAud,edPk,edShare,tab,chatsScreen,addStory,openStory,closeStory,stepStory,storyViews,delStory,pickPhoto,rmPhoto,profileScreen,editScreen,saveEdit,pickEmo,hv,vf,open,home,nearScreen,togNear,blockUser,unblock,reportUser,blockedScreen,feedScreen,postMemory,postBadge,like,comments,addComment,delComment,delPost,report,authScreen,doAuth,reset,signOut,saveProf,editName,searchScreen,doSearch,addFriend,accept,decline,unfriend,chat,send,togLoc,hideNow,togMap,togStats,sugScreen,sugHere,sugSend,delAcct,sync,onPos,get user(){return me},get profile(){return prof},_fb:()=>FB,init:()=>fb()}
})();
