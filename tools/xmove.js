#!/usr/bin/env node
/* Công cụ tách engine.js (mục 12 và 11.D): chuyển các hàm cấp cao nhất của engine.js sang một gói engine-<tên>.js chạy qua cơ chế ENGX.
   Dùng:  node tools/xmove.js <tên gói> <hàm1,hàm2,...|tiền tố*,...> [--apply]     (không có --apply thì chỉ báo cáo, không ghi gì)
   Việc làm: (1) đọc engine.js bằng bộ tách từ (bỏ qua chuỗi, chú thích, regex, template), (2) tìm khối từng hàm, (3) tìm tên cấp cao mà thân hàm dùng,
   (4) nếu hàm GÁN vào biến let cấp cao (S=, page=, DRY=…) thì DỪNG (cần viết tay), (5) --apply: ghi engine-<tên>.js, thay thân hàm trong engine.js bằng dòng chuyển
   `function f(...a){return ENGX.fn.f(...a)}`, thêm tên cần dùng vào X.EC và getter cho biến let được đọc, thêm thẻ <script> vào index.html.
   Biến let cấp cao được đọc thì mỗi hàm bắt đầu bằng `const S=X.S;` (bản chụp lúc gọi, đúng khuôn engine-x.js).
   Sau khi apply: node --check, node tools/make-admin.js, chạy tools/fulltest.js. */
const fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..');const ENG=path.join(ROOT,'engine.js');
const args=process.argv.slice(2);const pack=args[0];const spec=(args[1]||'').split(',').filter(Boolean);const APPLY=args.includes('--apply');
if(!pack||!spec.length){console.log('Dùng: node tools/xmove.js <tên gói> <hàm,hàm,tiền_tố*> [--apply]');process.exit(1)}
const src=fs.readFileSync(ENG,'utf8');
/* ---- bộ tách từ ---- */
function scan(s,opt){opt=opt||{};const ids=[];const decl={fn:[],cv:[]};const blocks=[];let i=0;const n=s.length;let nest=opt.startNest||0;
  const TOP=opt.top;let declMode=null,expectName=false,fnStart=-1,fnName=null,fnWait=false,fnDepth=-1;
  let prev='';let prevWord='';
  function skipStr(q){i++;while(i<n&&s[i]!==q){if(s[i]==='\\')i++;i++}i++}
  function skipTpl(){i++;while(i<n&&s[i]!=='`'){if(s[i]==='\\'){i+=2;continue}if(s[i]==='$'&&s[i+1]==='{'){i+=2;const r=scanInner(i);i=r}else i++}i++}
  function scanInner(start){const save=i;i=start;let d=0;while(i<n){const c=s[i];
      if(c==='}'&&d===0){i++;return i}
      if(c==='{'){d++;i++;continue}if(c==='}'){d--;i++;continue}
      step()}return i}
  function regexOk(){return prev===''||'(,=:[!&|?{};'.includes(prev)||prevWord==='return'||prevWord==='typeof'}
  function step(){const c=s[i];
    if(c==='/'&&s[i+1]==='/'){while(i<n&&s[i]!=='\n')i++;return}
    if(c==='/'&&s[i+1]==='*'){i=s.indexOf('*/',i+2);i=i<0?n:i+2;return}
    if(c==='"'||c==="'"){skipStr(c);prev='s';prevWord='';return}
    if(c==='`'){skipTpl();prev='s';prevWord='';return}
    if(c==='/'&&regexOk()){i++;let cls=false;while(i<n){if(s[i]==='\\'){i+=2;continue}if(s[i]==='['){cls=true}else if(s[i]===']'){cls=false}else if(s[i]==='/'&&!cls)break;i++}i++;while(i<n&&/[a-z]/.test(s[i]))i++;prev='s';prevWord='';return}
    if(/[A-Za-z_$]/.test(c)){let j=i+1;while(j<n&&/[\w$]/.test(s[j]))j++;const w=s.slice(i,j);const st=i;
      let k=j;while(k<n&&/\s/.test(s[k]))k++;const nx=s[k];
      let pk=st-1;while(pk>=0&&/\s/.test(s[pk]))pk--;const pc=pk>=0?s[pk]:'';const pc2=pk>=1?s[pk-1]:'';
      const isProp=pc==='.'&&pc2!=='.';const isKey=nx===':'&&(pc==='{'||pc===',')&&s[k+1]!==':';
      if(TOP&&nest===1){
        if(declMode&&expectName&&!['function'].includes(w)){decl.cv.push(w);expectName=false}
        if(w==='function'&&(pc===''||pc===';'||pc==='}'||pc===')'||s[pk]==='\n'||/\n/.test(s.slice(pk+1,st)))){fnWait=true;fnStart=st;fnName=null}
        else if(fnWait&&fnName===null){fnName=w;decl.fn.push(w)}
        if((w==='const'||w==='let'||w==='var')&&!fnWait){declMode=w;expectName=true}
      }
      if(!isProp&&!isKey)ids.push({w,st,en:j});
      prev='a';prevWord=w;i=j;return}
    if(/\d/.test(c)){let j=i+1;while(j<n&&/[\w.]/.test(s[j]))j++;i=j;prev='a';prevWord='';return}
    if(c==='{'){nest++;if(TOP&&nest===2&&fnWait&&fnDepth<0)fnDepth=nest;prev=c;prevWord='';i++;return}
    if(c==='}'){nest--;if(TOP&&nest===1&&fnWait&&fnDepth===2){blocks.push({n:fnName,st:fnStart,en:i+1});fnWait=false;fnDepth=-1}prev=c;prevWord='';i++;return}
    if(c==='('||c==='['){nest++;prev=c;prevWord='';i++;return}
    if(c===')'||c===']'){nest--;prev=c;prevWord='';i++;return}
    if(c===','&&TOP&&nest===1&&declMode){expectName=true}
    if(c===';'&&TOP&&nest===1){declMode=null;expectName=false}
    if(!/\s/.test(c)){prev=c;prevWord=''}
    i++}
  while(i<n)step();
  return {ids,decl,blocks}}
/* ---- phân tích engine.js: bắt đầu sau dòng mở IIFE ---- */
const iifeAt=src.indexOf('(function(){');if(iifeAt<0){console.log('Không thấy IIFE');process.exit(1)}
const bodyStart=iifeAt+'(function(){'.length;
const body=src.slice(bodyStart);
const A=scan(body,{top:true,startNest:1});
const FN=new Map();A.blocks.forEach(b=>{if(b.n)FN.set(b.n,b)});
const topFn=new Set(A.decl.fn),topCv=new Set(A.decl.cv);
/* khai báo tách: const {a,b:c,d=1}=...  và const [a,b]=... */
{const re=/^(?:const|let|var)\s*[{\[]([^}\]]+)[}\]]\s*=/gm;let m;while((m=re.exec(body))){m[1].split(',').forEach(p=>{const q=p.split(':').pop().split('=')[0].trim();if(/^[A-Za-z_$][\w$]*$/.test(q))topCv.add(q)})}}
/* biến let cấp cao (đọc qua getter) */
const LETS=new Set();{const re=/^(let|var)\s+([^;\n]+)/gm;let m;while((m=re.exec(body))){m[2].split(/,(?![^()]*\))/).forEach(p=>{const nm=/^\s*([A-Za-z_$][\w$]*)/.exec(p);if(nm)LETS.add(nm[1])})}}
const isLetName=w=>LETS.has(w);
/* chọn hàm */
let chosen=[];spec.forEach(sp=>{if(sp.endsWith('*')){const p=sp.slice(0,-1);FN.forEach((b,nm)=>{if(nm.startsWith(p))chosen.push(nm)})}else if(FN.has(sp))chosen.push(sp);else console.log('Không thấy hàm: '+sp)});
chosen=[...new Set(chosen)];
if(!chosen.length){console.log('Không chọn được hàm nào');process.exit(1)}
const moved=new Set(chosen);
const needEC=new Set(),readLets=new Set(),writeLets=new Set(),warn=[];
let totalLen=0;
chosen.forEach(nm=>{const b=FN.get(nm);const text=body.slice(b.st,b.en);totalLen+=text.length;const T=scan(text,{startNest:0});
  const declaredInside=new Set();
  T.ids.forEach(({w,st})=>{
    if(moved.has(w))return;
    if(isLetName(w)){readLets.add(w);const after=text.slice(st+w.length,st+w.length+6);const before=text.slice(Math.max(0,st-3),st);
      if(/^\s*(=(?!=)|\+=|-=|\*=|\/=|\+\+|--)/.test(after)||/(\+\+|--)\s*$/.test(before))writeLets.add(w+' (trong '+nm+')')}
    else if(topFn.has(w)||topCv.has(w))needEC.add(w)})});
/* tên khai báo trong chính thân hàm (const x, tham số) không thể biết chắc; thừa tên trong EC chỉ vô hại */
console.log('Hàm chuyển:',chosen.length,'| ký tự:',totalLen);
console.log('Tên cấp cao cần lấy qua EC:',needEC.size);
console.log('Biến let được đọc:',[...readLets].join(', ')||'(không)');
if(writeLets.size){console.log('DỪNG: hàm gán vào biến let cấp cao:',[...writeLets].join(', '));process.exit(2)}
if(!APPLY){console.log('(chạy thử, thêm --apply để ghi)');process.exit(0)}
/* ---- ghi ---- */
const packFile='engine-'+pack+'.js';
const lets=[...readLets].sort();
let packText=`/* Bách Niên Thế Gia · ${packFile}: gói ENGX tách từ engine.js bằng tools/xmove.js (7.0.0-d.1.5.6). Thân hàm giữ nguyên; engine.js còn dòng chuyển ENGX.fn.<tên>. Hàm gán vào biến let cấp cao KHÔNG nằm ở đây. Nạp sau events-lv.js, trước engine.js. */
window.ENGX=window.ENGX||[];
window.ENGX.push(X=>{
const {${[...needEC].sort().join(',')}}=X.EC;
`;
const insertAlias=text=>{/* sau dấu { mở thân hàm */const T=scan(text,{startNest:0});let depthIdx=-1;let d=0;let k=0;/* tìm { đầu tiên ở nest 0 sau danh sách tham số */
  let p=text.indexOf('(');let lvl=0;let q=p;for(;q<text.length;q++){const c=text[q];if(c==='(')lvl++;else if(c===')'){lvl--;if(lvl===0)break}}
  const br=text.indexOf('{',q);return {head:text.slice(0,br+1),rest:text.slice(br+1)}};
chosen.forEach(nm=>{const b=FN.get(nm);let text=body.slice(b.st,b.en);
  const T=scan(text,{startNest:0});const used=lets.filter(L=>T.ids.some(x=>x.w===L));
  if(used.length){const pp=insertAlias(text);text=pp.head+used.map(L=>`const ${L}=X.${L};`).join('')+pp.rest}
  packText+=text+'\n'});
packText+=`Object.assign(X.fn,{${chosen.join(',')}});\n});\n`;
fs.writeFileSync(path.join(ROOT,packFile),packText);
/* thay trong engine.js từ cuối lên đầu để vị trí không lệch */
let out=src;const edits=chosen.map(nm=>FN.get(nm)).sort((a,b)=>b.st-a.st);
edits.forEach(b=>{const s0=bodyStart+b.st,e0=bodyStart+b.en;out=out.slice(0,s0)+`function ${b.n}(...a){return ENGX.fn.${b.n}(...a)}`+out.slice(e0)});
/* X.EC và getter */
const xl=out.indexOf('{const X={get S(){return S}');if(xl<0){console.log('Không thấy dòng X');process.exit(1)}
const ecAt=out.indexOf('EC:{',xl);const ecEnd=out.indexOf('}',ecAt);const ecList=out.slice(ecAt+4,ecEnd).split(',').map(x=>x.trim()).filter(Boolean);
const addEC=[...needEC].filter(w=>!ecList.includes(w));
out=out.slice(0,ecEnd)+(addEC.length?','+addEC.join(','):'')+out.slice(ecEnd);
const xHead=out.slice(xl,out.indexOf('EC:{',xl));
let getters='';lets.forEach(L=>{if(L==='S'||L==='M'||L==='EVENTS'||L==='EVMAP')return;if(!new RegExp('get '+L+'\\(').test(xHead))getters+=`get ${L}(){return ${L}},`});
if(getters){const at=out.indexOf('EC:{',xl);out=out.slice(0,at)+getters+out.slice(at)}
fs.writeFileSync(ENG,out);
/* index.html */
const IH=path.join(ROOT,'index.html');let ih=fs.readFileSync(IH,'utf8');const tag=`<script src="${packFile}"></script>`;
if(!ih.includes(tag)){const anchor=ih.match(/<script src="engine-x\.js"><\/script>/);if(anchor)ih=ih.replace(anchor[0],anchor[0]+'\n'+tag);else console.log('Không thấy thẻ engine-x.js trong index.html: thêm tay '+tag);fs.writeFileSync(IH,ih)}
console.log('Đã ghi '+packFile+', engine.js '+out.split('\n').length+' dòng. Chạy: node --check engine.js '+packFile+'; node tools/make-admin.js; tools/fulltest.js');
