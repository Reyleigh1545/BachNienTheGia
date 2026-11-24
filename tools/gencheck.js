// Quét lời kể: NPC nữ mà lời kể gọi ông/anh/chàng, NPC nam mà gọi bà/chị, người trẻ mà gọi lão/cụ, người già mà gọi cậu/chàng (d9.12.68). Chạy: node tools/run.js "file:///.../admin.html" tools/gencheck.js. Bộ lọc thô (đoạn có cả hai kiểu xưng hô thì bỏ qua), nên có báo động giả; dùng để đếm và xem mẫu.
(async()=>{const G=BNTG,ad=G._adm,S=()=>G.S();const hd=S().people.find(p=>p.id===S().head);hd.age=40;hd.born=S().t-40*12;
const EV=ad.EVMAP();const ids=Object.keys(EV);const strip=t=>String(t||'').replace(/<[^>]*>/g,' ');
const M=/\b(ông|lão|chàng|cậu|anh|cụ ông|bác trai|thằng)\b/i,F=/\b(bà|nàng|chị|cụ bà|bà lão|cô gái|thiếu nữ|con bé)\b/i;
const OLD=/\b(cụ|lão|già|bà lão|ông lão|lão bà)\b/i,YOUNG=/\b(cậu|chàng|cô gái|thiếu nữ|đứa bé|đứa trẻ|thiếu niên|em bé|con bé)\b/i;
const gbad={},abad={},tot={n:0,withNpc:0,err:0};
for(const id of ids){const e=EV[id];if(typeof e.x!=='function')continue;
 for(let k=0;k<5;k++){const d={_force:1};let txt;try{txt=strip(e.x(hd,d))}catch(er){tot.err++;continue}tot.n++;
  if(!d.npc)continue;const n=(S().np&&S().np.l||{})[d.npc];if(!n)continue;tot.withNpc++;const a=G.np.age(n);
  const nameIdx=txt.indexOf(n.n);const near=txt;// toan doan
  if(n.g==='nữ'&&M.test(near)&&!F.test(near)){(gbad[id]=gbad[id]||[]).push('nu nhung goi nam: '+n.n+' '+a+'t | '+(near.match(M)||[''])[0]);break}
  if(n.g==='nam'&&F.test(near)&&!M.test(near)){(gbad[id]=gbad[id]||[]).push('nam nhung goi nu: '+n.n+' '+a+'t | '+(near.match(F)||[''])[0]);break}
  if(a<45&&OLD.test(near)&&!YOUNG.test(near)){(abad[id]=abad[id]||[]).push('tre nhung goi gia: '+n.n+' '+a+'t | '+(near.match(OLD)||[''])[0]);break}
  if(a>=45&&YOUNG.test(near)&&!OLD.test(near)){(abad[id]=abad[id]||[]).push('gia nhung goi tre: '+n.n+' '+a+'t | '+(near.match(YOUNG)||[''])[0]);break}
 }}
const out=['tong su kien x chay '+tot.n+' co NPC '+tot.withNpc+' loi goi x '+tot.err,'SAI GIOI: '+Object.keys(gbad).length,...Object.keys(gbad).slice(0,60).map(k=>k+' :: '+gbad[k][0]),'SAI TUOI: '+Object.keys(abad).length,...Object.keys(abad).slice(0,60).map(k=>k+' :: '+abad[k][0])];
return out.join('\n')})()
