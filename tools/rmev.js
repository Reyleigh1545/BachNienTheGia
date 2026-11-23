// node tools/rmev.js id1 id2 ...   Xóa khối định nghĩa các sự kiện cũ khỏi ev-*.js (khi đã viết lại cùng id ở gói mới), tránh trùng id (bài học 6, mục 13).
// Khối: từ dòng chứa  id:'ID'  đến hết dòng trước khối kế tiếp (dòng mở khối mới dạng  X({id:  hoặc  {id: ) hoặc dòng chú thích /* ===  hoặc hết file.
// Luôn chạy node --check và tools/evlint.js sau đó.
const fs=require('fs'),path=require('path');
const D=path.join(__dirname,'..');const ids=process.argv.slice(2);if(!ids.length){console.log('dùng: node tools/rmev.js id1 id2 ...');process.exit(1)}
const files=fs.readdirSync(D).filter(f=>/^ev-.*\.js$/.test(f)&&!/^ev-d912/.test(f));
const START=/^\s*(?:[A-Za-z0-9_$]+\()?\{\s*id\s*:|^\s*[A-Za-z0-9_$]+\([^()]*\{\s*id\s*:/;
const done={};
for(const f of files){const p=path.join(D,f);let L=fs.readFileSync(p,'utf8').split('\n');let ch=false;
  for(const id of ids){const re=new RegExp("\\bid\\s*:\\s*['\"]"+id+"['\"]");
    const i=L.findIndex(l=>re.test(l));if(i<0)continue;
    if(!START.test(L[i])){console.log('BỎ QUA '+id+' ('+f+':'+(i+1)+'): dòng không mở khối đúng dạng: '+L[i].slice(0,60));continue}
    let j=i+1;while(j<L.length&&!START.test(L[j])&&!/^\s*\/\*\s*=+/.test(L[j]))j++;
    L.splice(i,j-i);ch=true;done[id]=(done[id]||0)+1}
  if(ch)fs.writeFileSync(p,L.join('\n'))}
ids.forEach(id=>console.log((done[id]?'đã xóa ':'KHÔNG THẤY ')+id+(done[id]>1?' ('+done[id]+' chỗ)':'')));
