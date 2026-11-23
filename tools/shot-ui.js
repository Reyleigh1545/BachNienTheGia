// node tools/shot-ui.js <url admin.html?ui=old> <tiền tố ảnh> 1280 820 : chụp ảnh mẫu giao diện. Đường dẫn D:/BachNienTheGia/git-repo/tools/mock-ui.js trong file là cũ, đổi thành tools/mock-ui.js khi chạy lại; cần Chrome ở C:/Program Files/Google/Chrome.
// node shot.js <url> <outPrefix> <w> <h>
const {spawn}=require('child_process');const fs=require('fs');const [url,pref,W,H]=[process.argv[2],process.argv[3],+process.argv[4]||1280,+process.argv[5]||820];
const prof='D:/BachNienTheGia/profshot'+Date.now();const port=9400+Math.floor(Math.random()*300);
const ch=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--disable-gpu','--no-first-run','--user-data-dir='+prof,'--remote-debugging-port='+port,'--allow-file-access-from-files','--hide-scrollbars','about:blank'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{let tabs;for(let i=0;i<40;i++){try{tabs=await (await fetch(`http://127.0.0.1:${port}/json`)).json();if(tabs.length)break}catch(e){}await sleep(250)}
 const t=tabs.find(x=>x.type==='page');const ws=new WebSocket(t.webSocketDebuggerUrl);let id=0;const wait={};
 ws.onmessage=m=>{const d=JSON.parse(m.data);if(d.id&&wait[d.id]){wait[d.id](d);delete wait[d.id]}};
 await new Promise(r=>ws.onopen=r);
 const send=(method,params={})=>new Promise(r=>{const i=++id;wait[i]=r;ws.send(JSON.stringify({id:i,method,params}))});
 const ev=async e=>{const r=await send('Runtime.evaluate',{expression:e,awaitPromise:true,returnByValue:true});return r.result&&r.result.result?r.result.result.value:JSON.stringify(r.result)};
 await send('Runtime.enable');await send('Page.enable');
 await send('Emulation.setDeviceMetricsOverride',{width:W,height:H,deviceScaleFactor:1,mobile:W<600});
 await send('Page.navigate',{url});await sleep(2500);
 await ev(`(()=>{const b=document.querySelector('[data-m="new"]');if(b)b.click()})()`);await sleep(500);
 await ev(`(()=>{let b=document.querySelector('#modal [data-go]');if(!b){const all=[...document.querySelectorAll('#modal .btn,#modal button')];b=all.find(x=>/Ô 1|Ô trống/.test(x.textContent))||all[0]}if(b)b.click()})()`);await sleep(800);
 await ev(`(()=>{const b=document.querySelector('#modal [data-go]');if(b)b.click()})()`);await sleep(1200);
 // cho chơi 20 năm bằng bot để có gia đình
 await ev(`(async()=>{const A=BN_ADMIN;A.auto='cao';A.force='none';A.delay=0;const tog=document.querySelector('[data-tog]');if(tog)tog.click();await new Promise(r=>setTimeout(r,300));const tab=[...document.querySelectorAll('#adm [data-tab]')].find(b=>b.dataset.tab==='choi');if(tab)tab.click();await new Promise(r=>setTimeout(r,300));const yr=document.querySelector('[data-years]');if(yr)yr.value=22;const pl=document.querySelector('[data-play]');if(pl)pl.click();const t0=Date.now();while(Date.now()-t0<75000){await new Promise(r=>setTimeout(r,1000));if(!A.play)break}A.auto='off';if(tog)tog.click();})()`);
 await sleep(500);
 const shot=async name=>{const r=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(pref+'-'+name+'.png',Buffer.from(r.result.data,'base64'))};
 const prep=`(async()=>{const G=BNTG,S=G.S(),ad=G._adm;const sl=ms=>new Promise(r=>setTimeout(r,ms));ad.closeModal();await sl(200);
  const css=document.createElement('style');css.id='mock';css.textContent=window.__MOCK_CSS||'';document.head.appendChild(css);return 'ok'})()`;
 await ev(`(()=>{window.__MOCK_CSS=${JSON.stringify(process.env.MOCKCSS||'')}})()`);
 await ev(prep);
 const gotoPage=async p=>{await ev(`(()=>{const b=document.querySelector('nav.tabs [data-page="${p}"]');if(b)b.click()})()`);await sleep(500)};
 for(let k=0;k<6;k++){await ev(`BNTG._adm.closeModal()`);await sleep(250)}
 const MOCK=require('fs').readFileSync('D:/BachNienTheGia/git-repo/tools/mock-ui.js','utf8');
 await ev(`(()=>{BN_ADMIN.play=false;BNTG._adm.closeModal();BNTG.S().queue.length=0})()`);await sleep(300);
 await ev(MOCK);await sleep(300);
 await ev(`(()=>{BNTG._adm.openSheet(BNTG.S().head)})()`);await sleep(900);
 await shot('0-hien-tai-ho-so');
 await ev(`(()=>{BNTG._adm.closeModal();const s=document.querySelector('.overlay.sheet');if(s)s.hidden=true;const x=document.querySelector('[data-close]');if(x)x.click()})()`);await sleep(300);
 for(const n of ['evt1','evt2','res','pf1','pf2','pf3']){await ev(`window.__mk.${n}()`);await sleep(500);await shot(n)}
 ws.close();ch.kill();setTimeout(()=>{try{fs.rmSync(prof,{recursive:true,force:true})}catch(e){}process.exit(0)},800)})().catch(e=>{console.error(e);ch.kill();process.exit(1)});
