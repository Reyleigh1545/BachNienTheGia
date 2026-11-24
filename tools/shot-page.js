// node tools/shot-page.js <url> <file.png> [rộng] [cao] [js chạy trước khi chụp] : chụp một màn hình (ví dụ màn mở game) bằng Chrome headless
const {spawn}=require('child_process');const fs=require('fs');const [url,out,W,H,pre]=[process.argv[2],process.argv[3]||'shot.png',+process.argv[4]||1280,+process.argv[5]||820,process.argv[6]||''];
const prof='D:/BachNienTheGia/profshot'+Date.now();const port=9400+Math.floor(Math.random()*300);
const CH=process.env.CHROME||'C:/Program Files/Google/Chrome/Application/chrome.exe';
const ch=spawn(CH,['--headless=new','--disable-gpu','--no-first-run','--user-data-dir='+prof,'--remote-debugging-port='+port,'--allow-file-access-from-files','--hide-scrollbars','about:blank'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{let tabs;for(let i=0;i<40;i++){try{tabs=await (await fetch(`http://127.0.0.1:${port}/json`)).json();if(tabs.length)break}catch(e){}await sleep(250)}
 const t=tabs.find(x=>x.type==='page');const ws=new WebSocket(t.webSocketDebuggerUrl);let id=0;const wait={};
 ws.onmessage=m=>{const d=JSON.parse(m.data);if(d.id&&wait[d.id]){wait[d.id](d);delete wait[d.id]}};
 await new Promise(r=>ws.onopen=r);
 const send=(method,params={})=>new Promise(r=>{const i=++id;wait[i]=r;ws.send(JSON.stringify({id:i,method,params}))});
 await send('Runtime.enable');await send('Page.enable');
 await send('Emulation.setDeviceMetricsOverride',{width:W,height:H,deviceScaleFactor:1,mobile:W<600});
 await send('Page.navigate',{url});await sleep(2200);
 if(pre){const q=await send('Runtime.evaluate',{expression:pre,awaitPromise:true,returnByValue:true});const v=q.result&&q.result.result?q.result.result.value:'';if(v)console.log(String(v));await sleep(900)}
 const r=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(out,Buffer.from(r.result.data,'base64'));
 ws.close();ch.kill();setTimeout(()=>{try{fs.rmSync(prof,{recursive:true,force:true})}catch(e){}process.exit(0)},800)})().catch(e=>{console.error(e);ch.kill();process.exit(1)});
