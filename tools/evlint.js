// node tools/evlint.js [--list] [--rt]
// Cổng chất lượng sự kiện (CLAUDE.md mục 13, kế hoạch d9.12 mục 1 và 5). Hai phần:
//  (a) quét tĩnh mọi ev-*.js: lời hứa tương lai thiếu hậu sự (R2/G6), sự kiện chỉ cộng tâm trạng (R8/G7), người vô danh thiếu sổ nhân vật (R1/G9),
//      thưởng danh vọng lớn (R7), thiếu giới hạn tuổi (R9), đổi quan hệ không hiện dòng quan hệ (R3), id lặp trong nguồn;
//  (b) --rt: chạy engine thật (tools/run.js) kiểm id lặp trong EVENTS() (G1) và hộp một lựa chọn (G5). Thoát mã 1 nếu có id lặp.
// Số đếm tĩnh là xấp xỉ, dùng để xếp hàng duyệt, không tự sửa.
const fs=require('fs'),path=require('path'),cp=require('child_process');
const D=path.join(__dirname,'..');const LIST=process.argv.includes('--list');const RT=process.argv.includes('--rt');
const files=fs.readdirSync(D).filter(f=>/^ev-.*\.js$/.test(f));
const blocks=[];
for(const f of files){const s=fs.readFileSync(path.join(D,f),'utf8');const re=/\bid\s*:\s*['"]([A-Za-z0-9_]+)['"]/g;let m;const pos=[];while((m=re.exec(s)))pos.push([m[1],m.index]);
  pos.forEach((p,i)=>{const end=i+1<pos.length?pos[i+1][1]:s.length;blocks.push({id:p[0],f,line:s.slice(0,p[1]).split('\n').length,t:s.slice(p[1],end)})})}
const RETIRED=new Set();try{const r=fs.readFileSync(path.join(D,'ev-d912.js'),'utf8');const i0=r.indexOf('window.EVRETIRED=[');const i1=r.indexOf('];',i0);const seg=i0>=0&&i1>i0?r.slice(i0,i1):'';(seg.match(/'([A-Za-z0-9_]+)'/g)||[]).forEach(x=>RETIRED.add(x.slice(1,-1)))}catch(e){}
const live=blocks.filter(b=>!RETIRED.has(b.id));
const out=[];let bad=0;
const rep=(name,arr,fatal)=>{out.push(name+': '+arr.length+(LIST&&arr.length?' :: '+arr.map(b=>b.id+'('+b.f+':'+b.line+')').join(' '):(arr.length?' :: '+arr.slice(0,25).map(b=>b.id).join(' ')+(arr.length>25?' …':''):'')));if(fatal&&arr.length)bad++};
/* id lặp trong nguồn: chỉ tính khối có dạng định nghĩa sự kiện (có lời kể x: hoặc lựa chọn o:) */
const defs=live.filter(b=>/\bx\s*:|\bo\s*:/.test(b.t.slice(0,2500)));
const seen={};const dup=[];defs.forEach(b=>{if(seen[b.id]&&seen[b.id].f+':'+seen[b.id].line!==b.f+':'+b.line)dup.push(b);else seen[b.id]=b});
rep('G1 id lặp trong nguồn (khối có x:/o:)',dup,true);
const fut=/(Về sau|vài năm sau|Vài năm sau|sau này|Sau này|ít lâu sau|Ít lâu sau|mấy tháng sau|Mấy tháng sau|Ba năm sau|ba năm sau|năm sau|Năm sau|mai sau|một thời gian sau|Một thời gian sau)/;
/* d9.12: chỉ tính khi cụm tương lai nằm gần từ khóa hứa hẹn (hứa, hẹn, sẽ, dặn, nguyện, chờ...); câu kể kết quả ("Mấy tháng sau nghe tin...") không tính */
const CUE=/(hứa|hẹn|sẽ |dặn|nguyện|để dành|đợi|chờ|mong|biết đâu)/;
const promised=t=>{const g=new RegExp(fut.source,'g');let m;while((m=g.exec(t))){const ctx=t.slice(Math.max(0,m.index-90),m.index+110);if(CUE.test(ctx))return true}return false};
rep('R2/G6 lời hứa tương lai không có hậu sự (có từ khóa hứa hẹn)',defs.filter(b=>promised(b.t)&&!/later\(|nx\(|G\.later|enqueue\(|\bnx\b|rg\.later|addProph/.test(b.t)));
rep('R8/G7 mọi dòng fx chỉ tâm trạng',defs.filter(b=>{const m=b.t.match(/fx\(\w+,\{[^}]*\}\)/g)||[];return m.length>0&&m.every(t=>!/(money|fame|cfame|tri:|vo:|mi:|eq:|suc:|hpMax|merit|on:|hung|sk:|m:|bonus|habit|liem|lv:|duyen|cheer|rg)/.test(t))}));
const nameWords=/(bạn thân|khách quý|người ấy|ân nhân|quý nhân|cao nhân|lão nhân|ông lão|bà đồng|thầy đồ|người bạn|kẻ lạ|ông già|đạo sĩ|thầy lang|thầy thuốc|thương nhân|người lạ)/;
rep('R1/G9 người vô danh, không gọi sổ nhân vật',defs.filter(b=>nameWords.test(b.t)&&!/npc\.|mkMatch|G\.npc|npFam|npHouse|adopt|mkSpouse|pickKin|G\.fam|G\.tie/.test(b.t)));
rep('R7 thưởng danh vọng lớn (>=10 hoặc R())',defs.filter(b=>/fame:\s*(R\(\d+\s*,\s*\d+\)|\d{2,})/.test(b.t)));
rep('R9 thiếu giới hạn tuổi (không fixed/arc/baby)',defs.filter(b=>!/age\s*:\s*\[/.test(b.t)&&!/fixed\s*:\s*1|arc\s*:|baby\s*:/.test(b.t)));
rep('R3 đổi quan hệ mà không có dòng quan hệ (7.0.0-d.1.5.4: engine đã tự thêm dòng "Quan hệ với" cho họ khác qua RELTR; số này chỉ còn là thông tin)',defs.filter(b=>/(rel0|addRel|\.rel\s*[+-]=|cl\.rel)/.test(b.t)&&!/rg\.set|G\.rg|relLine/.test(b.t)));
/* d.1.5.4 (7.0.0): các luật rút từ phản hồi 24/11 */
rep('R23 sự kiện "Mục tiêu đời người" mở chuỗi mà điều kiện không đọc nghề, tính cách hay kỹ năng',defs.filter(b=>/k\s*:\s*['"]Mục tiêu đời người['"]/.test(b.t)&&/\bage\s*:\s*\[/.test(b.t)&&/\bc\s*:\s*c\s*=>/.test(b.t)&&!/\bjob\b|subOf|axv|\.sk\b|skv|\.flags\./.test((b.t.match(/\bc\s*:\s*c\s*=>[^\n]{0,260}/)||[''])[0])));
rep('R25 người thương, tình địch, người gây ghen được tạo mà không truyền giới g:',defs.filter(b=>/tie\.ensure\([^)]*vai\s*:\s*\[[^\]]*['"](nguoi_thuong|tinh_dich)['"]/.test(b.t.replace(/\n/g,' '))&&!/tie\.ensure\([^)]*\bg\s*:/.test(b.t.replace(/\n/g,' '))));
const LONGRE=/^(cv_nuoi|cv_dom_ngo|yl_|tpha_|hd_|bd_|kt_|hc_|tdt_|kiem_|ky_o_|ky_lua_|ky_tranh_|dan_|cau_|bg_|cp_|ky_hd_)/;
rep('R24 hẹn việc quá 12 tháng cho id không thuộc LONGRE hay arc (người giữ mất thì mất việc, engine.js passLong)',defs.filter(b=>{const m=b.t.match(/(?:G\.)?later\(c,'([a-z0-9_]+)',(?:R\()?(\d+)(?:,\s*(\d+))?/);return m&&(+m[2]>=13||(m[3]&&+m[3]>=13))&&!LONGRE.test(m[1])&&!LONGRE.test(b.id)&&!/arc\s*:\s*1/.test(b.t)}));
rep('R26 NPC tạo với chữ chỉ tuổi (già, lão, cụ) mà age: dưới 50',defs.filter(b=>/tie\.ensure\([^)]*nghe\s*:\s*['"`][^'"`]*\b(già|lão|cụ)\b[^)]*age\s*:\s*R\((\d+)/.test(b.t.replace(/\n/g,' '))&&+((b.t.replace(/\n/g,' ').match(/tie\.ensure\([^)]*nghe\s*:\s*['"`][^'"`]*\b(già|lão|cụ)\b[^)]*age\s*:\s*R\((\d+)/)||[])[2]||99)<50));
/* R27 (7.0.0-d.1.5.9, bài học 38): lời kể khẳng định một trạng thái (đang có tang, người nhà đã nhập ngũ) mà khối không có phép kiểm trạng thái đó. Chỉ là thông tin, xếp hàng duyệt. */
rep('R27a lời kể "để tang, đang có tang" mà không kiểm người đã mất (.dead, mournFor)',defs.filter(b=>/đang có tang|để tang|trong tang|có tang chưa/.test(b.t)&&!/\.dead|dead\s*!=|mournFor|\bdeath/.test(b.t)));
rep('R27b lời kể "đã/đang nhập ngũ, đi lính, nhập ngũ theo quân hộ" mà không kiểm người đang ở doanh (quan_ngu, army, SOLDIERS, enlist)',defs.filter(b=>/(đã|đang)\s+(nhập ngũ|đi lính|ở doanh)|nhập ngũ theo quân hộ/.test(b.t)&&!/quan_ngu|army|SOLDIERS|enlist|qh\.who/.test(b.t)));
/* R28 (7.0.0-d.1.5.10, chủ dự án 24/11: "tất cả các sự kiện đều phải gắn với người cụ thể, người có liên quan"): lời kể nhắc con cái mà khối không kiểm nhà có con (hoặc không chọn một đứa cụ thể) */
const KIDW=/bọn trẻ|đứa trẻ nhà|đứa con|con trai nhà|con gái nhà|người con|các con|đàn con|cậu con|cô con|con cái nhà/i;
const KIDCHK=/kidsOf|kidsOk|hasKid|\bkid\(|childOf|kinList|pickKin|hwho|\.parents|\bkids\b|pickWho|G\.tie\.kid|\bson\b|\bkid\b|babyOk|G\.kids|kinOf|famOf|childrenOf|sib\(/;
rep('R28a lời kể nhắc con cái nhà mà không kiểm có con (kidsOf, hasKid, kinList, pickKin…)',defs.filter(b=>KIDW.test(b.t)&&!KIDCHK.test(b.t)));
const SPW=/người vợ|vợ nhà|người chồng|chồng nhà|vợ của|chồng của|bà xã|ông xã/i;
rep('R28b lời kể nhắc vợ chồng của nhân vật mà không kiểm có vợ chồng (spouseOf, married, spouse)',defs.filter(b=>SPW.test(b.t)&&!/spouseOf|married|\.spouse|G\.sp|vợ chồng:|hwho|pickKin/.test(b.t)));
out.push('khối quét: '+blocks.length+' (định nghĩa sự kiện: '+defs.length+'), file: '+files.length+', RETIRED: '+RETIRED.size);
if(RT){
  const tmp=path.join(process.env.TEMP||process.env.TMPDIR||'.','evlint_'+Date.now()+'.js');
  fs.writeFileSync(tmp,`(()=>{const E=BNTG._adm.EVENTS();const m={};E.forEach(e=>{(m[e.id]=m[e.id]||[]).push(1)});const d=Object.keys(m).filter(k=>m[k].length>1);
   const one=E.filter(e=>Array.isArray(e.o)&&e.o.length===1&&!e.fixed&&!e.arc).map(e=>e.id);
   return 'JSON::'+JSON.stringify({n:E.length,dup:d,one})})()`);
  const r=cp.spawnSync('node',[path.join(__dirname,'run.js'),'file:///'+path.join(D,'admin.html').replace(/\\/g,'/')+'?ui=old',tmp],{encoding:'utf8',maxBuffer:1<<26,env:Object.assign({},process.env,{PN:'lint'+(Date.now()%100000)})});
  try{fs.unlinkSync(tmp)}catch(e){}
  const line=(r.stdout||'').split('\n').find(l=>l.startsWith('JSON::'));
  if(!line){out.push('RT: không chạy được engine');bad++}else{const j=JSON.parse(line.slice(6));
    out.push('RT EVENTS(): '+j.n+' sự kiện; G1 id lặp: '+j.dup.length+(j.dup.length?' :: '+j.dup.join(' '):''));if(j.dup.length)bad++;
    out.push('RT G5 hộp mảng một lựa chọn (không fixed/arc): '+j.one.length+(j.one.length?' :: '+j.one.slice(0,40).join(' '):''))}
  const errm=(r.stdout||'').match(/errors:\s*(\d+)/);if(errm&&+errm[1]>0){out.push('RT lỗi chạy ngầm: '+errm[1]);bad++}
}
console.log(out.join('\n'));process.exit(bad?1:0);
