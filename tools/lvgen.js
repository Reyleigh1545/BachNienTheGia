// node tools/lvgen.js : dựng events-lv.js (mức sự kiện 0 vặt, 2 quan trọng, 3 lớn) bằng cách đọc nguồn từng sự kiện trong ev-*.js.
// Mức 1 (thường) không ghi vì là mặc định của engine (evLvOf). Chạy lại sau khi thêm nhiều sự kiện. Heuristic, không thay cho việc gắn tay: ghi đè bằng khóa lv trong sự kiện.
const fs=require('fs'),path=require('path');const dir=path.join(__dirname,'..');
const files=fs.readdirSync(dir).filter(f=>/^ev-.*\.js$/.test(f));const out={};
const KW3=/tru di|xử trảm|lưu đày|tịch biên|lên ngôi|tử trận|cách chức|mưu phản|phế truất|diệt môn|tuyệt tự/i;
for(const f of files){const t=fs.readFileSync(path.join(dir,f),'utf8');const ids=[...t.matchAll(/(?:\{|\()\s*id:'([A-Za-z0-9_]+)'/g)];
 ids.forEach((m,i)=>{const a=m.index,b=i+1<ids.length?ids[i+1].index:t.length;const blk=t.slice(a,b);const id=m[1];
  let bigM=0;for(const x of blk.matchAll(/\bm\(\s*(?:R\(\s*\d+\s*,\s*)?(\d+(?:\.\d+)?)/g))bigM=Math.max(bigM,+x[1]);for(const x of blk.matchAll(/\bmr?\(\s*\d+(?:\.\d+)?\s*,\s*(\d+(?:\.\d+)?)/g))bigM=Math.max(bigM,+x[1]);
  let bigF=0;for(const x of blk.matchAll(/\b(?:fame|merit|cfame)\s*:\s*(?:R\(\s*\d+\s*,\s*)?(\d+)/g))bigF=Math.max(bigF,+x[1]);
  const chain=/later\(|\bnx\(/.test(blk);const arc=/\barc:1|\bfixed:1/.test(blk);const kw=KW3.test(blk);
  let lv=1;
  if(kw||bigM>=100||bigF>=40)lv=3;else if(bigM>=30||bigF>=15||chain)lv=2;else if(bigM<5&&bigF<=3&&!arc&&!chain)lv=0;
  if(lv!==1)out[id]=lv})}
const cnt={};Object.values(out).forEach(v=>cnt[v]=(cnt[v]||0)+1);
fs.writeFileSync(path.join(dir,'events-lv.js'),'/* Mức sự kiện (0 vặt, 2 quan trọng, 3 lớn), dựng bởi tools/lvgen.js; chưa ghi thì là mức 1 hoặc mặc định theo loại (engine evLvOf). */\nwindow.EVLV='+JSON.stringify(out)+';\n');
console.log('ghi events-lv.js',Object.keys(out).length,'su kien',JSON.stringify(cnt));
