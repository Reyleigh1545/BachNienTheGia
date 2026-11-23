// Kiểm tra toàn bộ chức năng bằng bấm thử (d9.10). Chạy: node tools/run.js "file:///.../admin.html?ui=old" tools/fulltest.js
// Bước 1: bot chơi YEARS năm cho có gia đình, quan, nghề. Bước 2: bấm từng trang, thẻ gập, từng người (mở hồ sơ, từng trang hồ sơ, từng nút việc), mở các hộp (thư nhà, việc lớn, hôn lễ, tang lễ, Mối, gia bảo, Sử sách, menu, kết cục phụ), phím Escape.
// Lỗi JS chạy ngầm được run.js đếm ở dòng "errors:" cuối. Kết quả từng bước in ra để biết hỏng ở đâu.
(async()=>{const YEARS=30;
const A=BN_ADMIN,G=BNTG,ad=G._adm,sl=ms=>new Promise(r=>setTimeout(r,ms)),out=[];
const closeAll=async()=>{for(let k=0;k<6;k++){const m=document.querySelector('#modal');const x=m&&m.querySelector('[data-x],[data-back],[data-bx],[data-ok],.choices button:not(:disabled)');if(document.querySelector('#overlay:not([hidden])')||(document.getElementById('modalO')&&!document.getElementById('modalO').hidden)){if(x)x.click();await sl(60)}}
  const sh=document.getElementById('sheetO');if(sh&&!sh.hidden){const c=sh.querySelector('[data-close]');if(c)c.click();await sl(60)}try{ad.closeModal()}catch(e){}};
const step=async(name,fn)=>{try{const r=await fn();out.push('OK   '+name+(r!=null?' :: '+r:''))}catch(e){out.push('LOI  '+name+' :: '+e.message)}await closeAll()};
/* 1. bot */
A.auto='vua';A.force='none';A.delay=0;
{const tog=document.querySelector('[data-tog]');if(tog)tog.click();await sl(300);const tab=[...document.querySelectorAll('#adm [data-tab]')].find(b=>b.dataset.tab==='choi');if(tab)tab.click();await sl(300);
 const yr=document.querySelector('[data-years]');if(yr)yr.value=YEARS;const pl=document.querySelector('[data-play]');if(pl)pl.click();
 const t0=Date.now();while(Date.now()-t0<150000){await sl(1500);if(!A.play||G.S().over)break}A.play=false;await sl(300)}
await closeAll();const S0=G.S();out.push('Van: nam '+Math.floor(S0.t/12)+', '+S0.people.filter(p=>p.dead==null).length+' nguoi song, over='+S0.over);
/* 2. các trang */
const tabs=[...document.querySelectorAll('nav.tabs [data-page]')].map(b=>b.dataset.page);out.push('Trang: '+tabs.join(','));
for(const p of tabs){await step('trang '+p,async()=>{const b=document.querySelector('nav.tabs [data-page="'+p+'"]');b.click();await sl(300);
  const sum=[...document.querySelectorAll('#app details>summary')];sum.forEach(s=>s.click());await sl(150);
  const n=document.querySelectorAll('#app button,#app [data-page],#app select,#app summary,#app [data-sel]').length;
  const sel=[...document.querySelectorAll('#app [data-sel]')].slice(0,2);return n+' phan tu bam duoc, '+sum.length+' khoi gap, '+sel.length+' nguoi'})}
/* 3. hồ sơ từng người */
const people=G.S().people.filter(p=>p.dead==null).slice(0,8);
for(const p of people){await step('ho so '+(p.given||p.id),async()=>{ad.openSheet(p.id);await sl(250);const pages=[...document.querySelectorAll('#sheetM [data-pgk]')];let nb=0;
  for(const b of pages){b.click();await sl(80);nb+=document.querySelectorAll('#sheetM .pgbody:not([hidden]) button').length}
  /* bấm từng nút việc ở mọi trang chỉ để mở hộp, không xác nhận */
  const acts=[...document.querySelectorAll('#sheetM [data-do]')].filter(b=>!b.disabled&&!/expel|head$|moveout|resign|army|boat/.test(b.dataset.do)).slice(0,6);let opened=0;
  for(const b of acts){try{b.click();await sl(160);if(document.querySelector('#modal')&&!document.getElementById('modalO').hidden){opened++;await closeAll();ad.openSheet(p.id);await sl(120)}}catch(e){}}
  return pages.length+' trang, '+nb+' nut, '+acts.length+' nut viec bam thu ('+opened+' mo hop)'})}
/* 4. các hộp */
const h=G.S().people.find(p=>p.id===G.S().head);
await step('thu nha cuoi nam',async()=>{G.S().lt15=-99;ad.letterAdd(h,'<b>Thử</b>: Danh vọng +9',3);ad.letterPopup(h);await sl(250);return (document.querySelector('#modal')||{}).innerText.slice(0,40)});
await step('viec lon (menu)',async()=>{h.m=110;h.tri=120;h.eq=100;h.mi=80;h.viec=null;h.bigT=null;h.bigL={};h.away=null;ad.openSheet(h.id);await sl(200);const b=document.querySelector('#sheetM [data-do="big"]');if(!b)return 'khong hien nut (chua du dieu kien)';b.click();await sl(250);return (document.querySelector('#modal')||{}).innerText.slice(0,40)});
await step('hon le',async()=>{const sp=Object.assign({},JSON.parse(JSON.stringify(h)),{id:'tspx',given:'Thử',g:h.g==='nam'?'nữ':'nam',born:G.S().t-26*12,parents:[],spouse:null,job:'none',lv:0,away:null,flags:{},inLaw:true,hh:h.hh,dead:null,seen:{},pre:{},habits:[],traits:[],mm:[]});G.S().people.push(sp);ad.enqueue('wed',h.id,{pid:'tspx',free:0});ad.nextPopup();await sl(250);const b=document.querySelector('#modal [data-w="0"]');if(b)b.click();await sl(200);return 'da chon muc 0'});
await step('tang le',async()=>{ad.deathPopup(h,'bệnh mất');await sl(250);const b=document.querySelector('#modal [data-f="0"]');if(b)b.click();await sl(200);return 'da chon muc 0'});
await step('boi mai (Mối)',async()=>{const k=Object.assign({},JSON.parse(JSON.stringify(h)),{id:'tmx',given:'Chưa vợ',g:'nam',born:G.S().t-28*12,spouse:null,job:'none',away:null,flags:{},inLaw:false,dead:null});G.S().people.push(k);G.matchmaker(k,{free:1,noOut:1});await sl(250);return (document.querySelector('#modal')||{}).innerText.slice(0,40)});
await step('chon nguoi nha (pickKin)',async()=>{G.pickKin(h,{eyebrow:'Thử',title:'Chọn người',filter:p=>G.age(p)>=16,cb:w=>'đã chọn'});await sl(250);const b=document.querySelector('#modal [data-pk]');if(b){b.click();await sl(200)}return 'ok'});
await step('gia bao (popup)',async()=>{G.S().gb=G.S().gb&&G.S().gb.length?G.S().gb:['gb_an_ngoc'];const b=document.querySelector('.gbbtn');if(b){b.click();await sl(200)}return 'ok'});
await step('su sach (lich su)',async()=>{ad.historyMenu();await sl(300);return (document.querySelector('#modal')||{}).innerText.slice(0,30)});
await step('menu chinh/game menu',async()=>{const g=document.getElementById('gmenu');if(g){g.click();await sl(250)}return 'ok'});
await step('ket cuc phu T4,T7 (go/stop)',async()=>{const snap=JSON.stringify(G.S());for(const id of ['T4','T7']){ad.setS(JSON.parse(snap));ad.closeModal();const w=ad.wp.list.find(x=>x.id===id);ad.wp.win(w);let g=0;while(!document.querySelector('#modal [data-go]')&&g++<10){if(!ad.modalOpen())ad.nextPopup();await sl(80)}const b=document.querySelector('#modal [data-go]');if(b)b.click();await sl(250);await closeAll()}ad.setS(JSON.parse(snap));return 'ok'});
await step('muu dai su (ep mo duong quyen than)',async()=>{const S=G.S();S.money=1e7;G.ts.force('quyen',G.S().people.find(p=>p.id===G.S().head));for(let i=0;i<30;i++){ad.advance();let g=0;while((G.S().queue.length||ad.modalOpen())&&g++<8){if(!ad.modalOpen())ad.nextPopup();const bs=[...document.querySelectorAll('#modal .choices button:not(:disabled), #modal [data-ok]')];if(bs[0])bs[0].click();await sl(0)}}return 'usurp='+(G.S().usurp?'dang':'het')});
await step('phim Escape',async()=>{ad.closeModal();ad.openSheet(h.id);await sl(150);document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}));await sl(150);return 'ho so '+(document.getElementById('sheetO').hidden?'da dong':'con mo')});
await step('Tien 24 thang nua',async()=>{for(let i=0;i<24;i++){ad.advance();let g=0;while((G.S().queue.length||ad.modalOpen())&&g++<8){if(!ad.modalOpen())ad.nextPopup();const bs=[...document.querySelectorAll('#modal .choices button:not(:disabled), #modal [data-ok]')];if(bs[0])bs[0].click();await sl(0)}}return 'nam '+Math.floor(G.S().t/12)});
return out.join('\n')})()
