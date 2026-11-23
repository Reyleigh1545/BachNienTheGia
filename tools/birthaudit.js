// Kiểm tra đặc điểm bẩm sinh (d9.12, CLAUDE.md mục 11.E câu 5). Chạy: node tools/run.js "file:///.../admin.html?ui=old" tools/birthaudit.js
// Sinh 3000 người ngẫu nhiên bằng mkPerson (người đầu đời), đếm: mỗi đặc điểm có gen (TRAITS có gene) biểu hiện bao nhiêu phần trăm, so với xác suất thiết kế (T.p hoặc T.rate);
// số người có ít nhất một đặc điểm; số người có danh hiệu sức khỏe bẩm sinh. Chỉ đo, không đổi gì.
(async()=>{const G=BNTG,ad=G._adm,out=[];const S=()=>G.S();
const T=G.TRAITS||{};const N=3000;const cnt={};let any=0,hl=0;const hlc={};
const h=S().people[0];
for(let i=0;i<N;i++){let p;try{p=ad.mkPerson({g:i%2?'nam':'nữ',age:20,surname:h.surname,hh:h.hh})}catch(e){continue}
  const tr=(p.traits||[]).filter(Boolean);if(tr.length)any++;tr.forEach(k=>cnt[k]=(cnt[k]||0)+1);
  if(p.ht||p.hlTitle){hl++;const k=p.ht||p.hlTitle;hlc[k]=(hlc[k]||0)+1}}
const rows=Object.entries(cnt).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`${k}: ${(v/N*100).toFixed(1)}%${T[k]&&(T[k].p||T[k].rate)?` (thiết kế ${((T[k].p||T[k].rate)*100).toFixed(1)}%)`:''}`);
out.push(`Mẫu ${N} người. Có ít nhất một đặc điểm: ${(any/N*100).toFixed(1)}%.`);
out.push('Danh hiệu sức khỏe bẩm sinh: '+(hl/N*100).toFixed(1)+'% '+JSON.stringify(hlc));
out.push('Đặc điểm (tỉ lệ biểu hiện):');
return out.concat(rows).join('\n')})()
