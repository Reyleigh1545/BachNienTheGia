// node tools/r1scan.js : liệt kê sự kiện có người vô danh (lời kể nhắc "một người, một ông, người lạ…" mà không gọi sổ nhân vật G.tie.ensure/np/pickKin). Danh sách việc cho luật R1 (CLAUDE.md mục 13 bài học 5c).
const fs=require('fs'),path=require('path');const D=require('path').join(__dirname,'..');
const PH=/(Một (người|ông|bà|vị|cụ|lão|thầy|thương nhân|lái buôn|viên|kẻ|cô|chàng|anh|chị|đạo sĩ|nhà sư|tay|gã|bác)|người lạ|một người)/;
const NAMED=/G\.tie\.ensure|G\.np\.new|np\.new|\.ensure\(|pickKin|d\.oid|G\.P\(|npc:|mkMatch|G\.led\.np|npHouse|npFam|tie\.get/;
const RET=fs.readFileSync(D+'/ev-d912.js','utf8');
const files=fs.readdirSync(D).filter(f=>/^ev-.*\.js$/.test(f));const out=[];
for(const f of files){const s=fs.readFileSync(path.join(D,f),'utf8');const re=/\bid\s*:\s*['"]([A-Za-z0-9_]+)['"]/g;let m;const pos=[];while((m=re.exec(s)))pos.push([m[1],m.index]);
 pos.forEach((p,i)=>{const t=s.slice(p[1],i+1<pos.length?pos[i+1][1]:s.length);if(!/\bx\s*:|\bo\s*:/.test(t.slice(0,2500)))return;if(RET.includes("'"+p[0]+"'"))return;
  const xm=t.match(/x\s*:\s*(?:\(?[a-z,]*\)?\s*=>\s*)?[`'"]([^`'"]{0,260})/);if(!xm)return;
  if(PH.test(xm[1])&&!NAMED.test(t))out.push(p[0]+' ['+f+']')})}
console.log(out.length);console.log(out.join('\n'));
