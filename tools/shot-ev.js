// node tools/shot-ev.js <url admin.html hoặc admin.html?ui=old> <tiền tố ảnh> [rộng] [cao]
// Chụp hộp sự kiện có NPC (một người, hai người, người đã mất, người nhà ngỏ ý) ở giao diện hiện tại để kiểm hiển thị: đủ người, thẻ cùng cỡ, không tràn chữ, bấm thẻ NPC mở hồ sơ. (d9.12.63)
const {spawn}=require('child_process');const fs=require('fs');const [url,pref,W,H]=[process.argv[2],process.argv[3]||'shot',+process.argv[4]||1280,+process.argv[5]||820];
const prof='D:/BachNienTheGia/profshot'+Date.now();const port=9400+Math.floor(Math.random()*300);
const CH=process.env.CHROME||'C:/Program Files/Google/Chrome/Application/chrome.exe';
const ch=spawn(CH,['--headless=new','--disable-gpu','--no-first-run','--user-data-dir='+prof,'--remote-debugging-port='+port,'--allow-file-access-from-files','about:blank'],{stdio:'ignore'});
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
 for(let k=0;k<6;k++){await ev(`BNTG._adm.closeModal()`);await sleep(200)}
 const shot=async name=>{const r=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(pref+'-'+name+'.png',Buffer.from(r.result.data,'base64'))};
 /* chuẩn bị: người nhà, NPC các kiểu */
 await ev(`(()=>{const G=BNTG,ad=G._adm,S=G.S();BN_ADMIN.play=false;ad.closeModal();S.queue.length=0;S.money=1e6;const h=S.people.find(p=>p.id===S.head);
  const mk=(o)=>G.tie.ensure(h,o);
  window.__n={a:mk({key:'sa',g:'nam',vai:['an_nhan'],nghe:'người đàn ông trung niên chạy ra chặn giữa đường, quỳ xuống: mười năm trước ngài cứu mạng cha tôi ở đèo Ma, tôi tìm khắp thiên hạ để tạ ơn',age:42,tier:2,rel:35,why:'thử'}),b:mk({key:'sb',g:'nam',vai:['quy_nhan'],nghe:'quan huyện sở tại',age:50,tier:4,rel:10,why:'thử'}),c:mk({key:'sc',g:'nữ',vai:['quen'],nghe:'bà bán xôi ở chợ',age:48,tier:0,rel:5,why:'thử'}),d:mk({key:'sd',g:'nam',vai:['thay'],nghe:'thầy đồ',age:70,tier:1,rel:30,why:'thử'})};
  window.__n.d.ok=0;window.__n.d.dead=S.t;
  if(window.__n.a){window.__n.a.heir=window.__n.c.id}
  return 'ok'})()`);
 const cases=[
  ['1-mot-npc',`{ev:'np_thanh_dat',data:{npc:__n.a.id,goal:'thang_tien'}}`],
  ['2-hai-npc',`{ev:'n633_tl_trong',data:{}}`],
  ['3-npc-da-mat',`{ev:'np_qua_doi',data:{npc:__n.d.id}}`],
  ['4-bao-an',`{ev:'np_bao_an',data:{npc:__n.a.id}}`],
  ['5-bao-thu',`{ev:'np_bao_thu',data:{npc:__n.b.id}}`],
  ['6-hai-npc-bep',`{ev:'n633_bep_doc',data:{}}`],
  ['7-gd-y-nguyen',`{ev:'gd_y_nguyen',data:{who:BNTG.S().people.filter(p=>p.id!==BNTG.S().head&&p.dead==null)[0]?BNTG.S().people.filter(p=>p.id!==BNTG.S().head&&p.dead==null)[0].id:BNTG.S().head,gk:'giau'}}`],
  ['8-yl-hoc',`{ev:'yl_hoc',data:{npc:__n.d.id,pt:__n.c.id,sc:2}}`]
 ];
 const report=[];
 for(const [name,spec] of cases){
  await ev(`(()=>{const G=BNTG,ad=G._adm,S=G.S();ad.closeModal();S.queue.length=0;const h=S.people.find(p=>p.id===S.head);const q=${spec};G.enqueue('ev',h.id,q,true);ad.nextPopup()})()`);await sleep(600);
  const info=await ev(`(()=>{const m=document.querySelector('#modal');if(!m)return 'khong co hop';const cards=[...m.querySelectorAll('.evcard,.pcard')];const r=m.getBoundingClientRect();const over=[...m.querySelectorAll('*')].filter(e=>{const b=e.getBoundingClientRect();return b.width>0&&(b.right>r.right+2||b.left<r.left-2)}).length;return JSON.stringify({the:cards.map(c=>{const b=c.getBoundingClientRect();return c.className.replace(/\\s+/g,'.')+':'+Math.round(b.width)+'x'+Math.round(b.height)}),tran:over,lc:m.querySelectorAll('.choices button,.choice').length})})()`);
  report.push(name+' '+info);
  await shot(name);
  /* bấm thẻ NPC đầu tiên nếu có */
  if(name==='1-mot-npc'||name==='2-hai-npc'){const ok=await ev(`(()=>{const b=document.querySelector('#modal [data-ncard]');if(!b)return 'khong co the npc';b.click();return document.getElementById('npov')?'mo ho so npc':'KHONG mo duoc'})()`);report.push(name+' bam the: '+ok);await sleep(300);await shot(name+'-hoso');await ev(`(()=>{const x=document.querySelector('#npov .npx');if(x)x.click()})()`)}
 }
 console.log(report.join('\n'));
 ws.close();ch.kill();setTimeout(()=>{try{fs.rmSync(prof,{recursive:true,force:true})}catch(e){}process.exit(0)},800)})().catch(e=>{console.error(e);ch.kill();process.exit(1)});
