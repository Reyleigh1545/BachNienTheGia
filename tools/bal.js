// Đo cân bằng ba đường lên ngôi bằng bot (d9.10). Chạy: node tools/run.js "file:///.../admin.html" tools/bal.js
// Sửa N (số ván mỗi đường), STAT (chỉ số nhân vật thử), PATHS ở đầu file. Bot tránh nút "bỏ/thôi/từ chối", không ép xúc xắc; ghi thắng/thua và lý do.
(async()=>{const N=8,STAT=100,PATHS=['vo','quyen','nghia'],MAXMS=540000;
const A=BN_ADMIN,G=BNTG,ad=G._adm,sl=ms=>new Promise(r=>setTimeout(r,ms));ad.closeModal();await sl(200);
const snap=JSON.stringify(G.S());const t0=Date.now();const AV=/bỏ|thôi|dừng|từ chối|hoãn|rút|đầu thú|giải tán|quy ẩn|nhận tội|xin tha|đành|im lặng|lui/i;const tally={};
for(let k=0;k<N;k++){for(const path of PATHS){if(Date.now()-t0>MAXMS)break;
 ad.setS(JSON.parse(snap));const S=G.S();ad.closeModal();const h=S.people.find(p=>p.id===S.head);S.money=3e6;
 ['tri','vo','mi','eq'].forEach(s=>h[s]=STAT);h.born=S.t-42*12;
 G.ts.force(path,h);A.auto='vua';A.force='none';A.delay=0;let r='';
 for(let i=0;i<300;i++){S.money=Math.max(S.money,1e6);ad.advance();let g=0;while((S.queue.length||ad.modalOpen())&&g++<12){if(!ad.modalOpen())ad.nextPopup();const bs=[...document.querySelectorAll('#modal .choices button:not(:disabled), #modal [data-ok]')];const b=bs.find(x=>!AV.test(x.textContent))||bs[0];if(b)b.click();await sl(0)}
  if(S.over){r='win:'+Object.keys(S._mes||{}).join(',');break}
  if(!S.usurp&&i>3){const txt=(S.log||[]).slice(0,8).map(x=>x.m||x).join(' ');r=/tru di|thập ác/i.test(txt)?'fail_trudi':/tan vỡ|bỏ dở/.test(txt)?'fail_tan':'fail_other';break}}
 const key=path+':'+(r||'timeout');tally[key]=(tally[key]||0)+1}}
return JSON.stringify(tally)})()
