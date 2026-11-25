const fs=require('fs');
const p='android/app/src/main/AndroidManifest.xml';
let m=fs.readFileSync(p,'utf8');
const perms=['ACCESS_FINE_LOCATION','ACCESS_COARSE_LOCATION','ACCESS_BACKGROUND_LOCATION','FOREGROUND_SERVICE','FOREGROUND_SERVICE_LOCATION','POST_NOTIFICATIONS','WAKE_LOCK','INTERNET'];
let add='';for(const x of perms)if(!m.includes('android.permission.'+x+'"'))add+=`    <uses-permission android:name="android.permission.${x}" />\n`;
m=m.replace('</manifest>',add+'</manifest>');
fs.writeFileSync(p,m);
console.log(m);
