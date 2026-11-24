// node tools/r1gen.js : dựng ev-d912al.js (gói tự gắn người thật cho sự kiện có người vô danh, luật R1).
// Lấy danh sách như tools/r1scan.js (sự kiện có cụm "một người, ông, bà, người lạ…" mà không gọi sổ nhân vật), bỏ các id đã viết tay, rồi ghi file gói.
// Gói: bọc x() để tạo một người thật (G.tie.ensure) từ chính câu mô tả trong lời kể, hiện thẻ chân dung (d.npc); bọc kết quả mỗi lựa chọn để đổi quan hệ theo nhãn lựa chọn (giúp/mời/cho thì tăng, từ chối/đuổi/bỏ thì giảm, vạch/báo quan thì giảm mạnh) và hiện dòng "Quan hệ với X". Sự kiện nào đã viết tay (gọi G.tie.ensure) thì tự rơi khỏi danh sách khi chạy lại.
const fs=require('fs'),path=require('path');const D=path.join(__dirname,'..');
const PH=/(Một (người|ông|bà|vị|cụ|lão|thầy|thương nhân|lái buôn|viên|kẻ|cô|chàng|anh|chị|đạo sĩ|nhà sư|tay|gã|bác)|người lạ|một người)/;
const NAMED=/G\.tie\.ensure|G\.np\.new|np\.new|\.ensure\(|pickKin|d\.oid|G\.P\(|npc:|mkMatch|G\.led\.np|npHouse|npFam|tie\.get/;
const RET=fs.readFileSync(path.join(D,'ev-d912.js'),'utf8');
const files=fs.readdirSync(D).filter(f=>/^ev-.*\.js$/.test(f)&&f!=='ev-d912al.js');const ids=[];
for(const f of files){const s=fs.readFileSync(path.join(D,f),'utf8');const re=/\bid\s*:\s*['"]([A-Za-z0-9_]+)['"]/g;let m;const pos=[];while((m=re.exec(s)))pos.push([m[1],m.index]);
 pos.forEach((p,i)=>{const t=s.slice(p[1],i+1<pos.length?pos[i+1][1]:s.length);if(!/\bx\s*:|\bo\s*:/.test(t.slice(0,2500)))return;if(RET.includes("'"+p[0]+"'"))return;
  const xm=t.match(/x\s*:\s*(?:\(?[a-z,]*\)?\s*=>\s*)?[`'"]([^`'"]{0,260})/);if(!xm)return;
  if(PH.test(xm[1])&&!NAMED.test(t)&&!ids.includes(p[0]))ids.push(p[0])})}
const src=[
"/* Bách Niên Thế Gia v6.7.10-d9.12 · TỰ GẮN NGƯỜI THẬT cho sự kiện có người vô danh (luật R1). SINH TỰ ĐỘNG bởi tools/r1gen.js, đừng sửa tay: sửa tools/r1gen.js rồi chạy lại.",
"   Với mỗi id trong danh sách R1: x() tạo một người thật (sổ người quen) từ câu mô tả trong lời kể và hiện thẻ chân dung; kết quả mỗi lựa chọn kèm đổi quan hệ theo nhãn lựa chọn và dòng Quan hệ. Sự kiện đã viết tay thì không còn trong danh sách khi chạy lại tools/r1gen.js. */",
"window.EVPATCH=window.EVPATCH||[];",
"window.EVPATCH.push(function(E,G){",
" const R1=new Set("+JSON.stringify(ids)+");",
" const PH=/(Một (người|ông|bà|vị|cụ|lão|thầy|thương nhân|lái buôn|viên|kẻ|cô|chàng|anh|chị|đạo sĩ|nhà sư|tay|gã|bác)|người lạ)[^.,;:!?]{0,70}/;",
" const UP=/(giúp|cho |mời|tiếp đón|tiếp|nhận lời|chữa|cứu|biếu|dạy|chia|đỡ|nhường|góp|hỏi thăm|chào|cảm ơn|trả lại|giữ lời|đưa|tặng|mua|trả giá|học|làm cùng|xin theo|kết giao|thân)/i;",
" const DOWN=/(từ chối|đuổi|bỏ đi|mặc kệ|đóng cửa|không quan tâm|lảng tránh|làm lơ|bỏ qua|né|quay đi|không (mua|nhận|đi|giúp|cho|tin|cần|dám|theo|học)|ngại|sợ|thôi)/i;",
" const HARD=/(vạch|báo quan|bắt|tố|kiện|đánh|hạ gục|xử|trục xuất)/i;",
" const delta=function(l){l=String(l||'');if(HARD.test(l))return -22;if(DOWN.test(l))return -9;if(UP.test(l))return 12;return 2};",
" const esc=function(s){return String(s).replace(/<[^>]*>/g,'')};",
" E.forEach(function(e){if(!R1.has(e.id)||e.__r1)return;e.__r1=1;",
"  var x0=e.x;e.x=function(c,d){var t=typeof x0==='function'?x0.call(this,c,d):x0;d=d||{};",
"   try{if(!d.npc&&typeof t==='string'){var pl=esc(t).match(PH);var nghe=pl?pl[0].replace(/^Một /,'').replace(/^một /,'').trim():'người lạ trong chuyện';var n=G.tie.ensure(c,{key:'r1_'+e.id+'_'+(d.oid||c.id),vai:['quen'],nghe:nghe.charAt(0).toLowerCase()+nghe.slice(1),tier:Math.max(0,Math.min(6,G.tierIdx()+(Math.random()<0.5?-1:0))),rel:0,why:e.t||e.id});d.npc=n.id;d.r1=n.id}}catch(er){}",
"   return t};",
"  var o0=e.o;",
"  var wrapOpt=function(op,d){if(!op||typeof op!=='object')return op;var dl=delta(op.l);var nw=Object.assign({},op);",
"   ['f','y','yy','n','nn'].forEach(function(k){var f0=op[k];if(typeof f0!=='function')return;nw[k]=function(c,dd){var t=f0.apply(this,arguments);",
"    if(typeof t==='string'&&d&&d.r1){var n=G.tie.get(d.r1);if(n&&t.indexOf('Quan hệ với')<0){var sign=(k==='n'||k==='nn')?(dl>0?-0.4:0.3):1;var v=Math.round(dl*sign);",
"     /* d9.12.62: tính cách thật của NPC (engine-npc.js) quyết định mức đổi quan hệ và hậu sự: người thật thà, rộng lượng đáp lại nhiều; người nóng nảy giận nhiều */",
"     if(v&&n.sub&&G.npc){var fa=v>0?(0.7+(G.npc.ax(n,'rong')+G.npc.ax(n,'thanh'))/250):(0.7+(100-G.npc.ax(n,'diem'))/160);v=Math.round(v*fa)||v}",
"     if(v){try{var q=G.tie.rel(n,v,e.t||e.id);t+=G.fx(c,{qh:[n.n,v]})}catch(er){}}",
"     if(n.sub&&G.npc&&(k==='f'||k==='y'||k==='yy')){",
"      if(dl>=10){G.tie.on(n,2);if(Math.random()<G.npc.ax(n,'thanh')/220){try{G.tie.later(n,c,'tie_an_nhan_tra',24+Math.floor(Math.random()*48),{})}catch(er){}}else if(G.npc.ax(n,'thanh')<35&&Math.random()<0.3){G.tie.rel(n,-6,'vô ơn');t+=' Về sau mới biết người ấy vô ơn.'}}",
"      if(dl<=-20){G.tie.oan(n,G.npc.ax(n,'diem')<45?6:3)}}}}return t}});return nw};",
"  e.o=function(c,d){var arr=typeof o0==='function'?o0.call(this,c,d):o0;if(!Array.isArray(arr))return arr;return arr.map(function(op){return wrapOpt(op,d)})};",
" });",
" return E});",
""
].join('\n');
fs.writeFileSync(path.join(D,'ev-d912al.js'),src);console.log('ghi ev-d912al.js với',ids.length,'id');
