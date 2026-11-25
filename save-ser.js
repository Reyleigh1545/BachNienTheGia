/* Bách Niên Thế Gia · 7.0.0-d.1.5.24 · CÁCH LƯU SAVE MỚI (chủ dự án 25/11: "chỉ những dòng code thì thực sự không đủ sức để chứa toàn bộ thông tin save game dẫn tới lỗi save, không đọc được đúng game").
   Vì sao JSON.stringify(S) thường không đủ: (1) số NaN, Infinity thành null; (2) giá trị undefined trong mảng thành null; (3) Map, Set, Date mất hết nội dung; (4) một đối tượng được hai nơi cùng trỏ tới (ví dụ chiến tuyến, người, thế lực) sau khi nạp thành hai bản sao rời nhau, sửa bên này bên kia không đổi; (5) không có cách biết file đã hỏng.
   Định dạng mới: {"bntg":2,"ver":...,"t":tháng,"h":mã kiểm,"data":...}. Đối tượng dùng chung ghi {"$id":n,...} ở lần đầu và {"$ref":n} ở các lần sau. Số đặc biệt {"$n":"NaN"}, undefined trong mảng {"$u":1}, Map {"$m":[[k,v]]}, Set {"$s":[..]}, Date {"$d":ms}. Nạp được cả file cũ (JSON thường). Hỏng (mã kiểm sai) thì báo lỗi, không nạp nửa chừng. */
(function(){
const FMT=2;
const isObj=v=>v!==null&&typeof v==='object';
function hash(s){let h=2166136261>>>0;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0}return h.toString(16)}
function enc(S,ver){
  const seen=new Set(),shared=new Set();
  (function w(v){if(!isObj(v)||v instanceof Date)return;if(seen.has(v)){shared.add(v);return}seen.add(v);
    if(Array.isArray(v))v.forEach(w);else if(v instanceof Map)v.forEach((x,k)=>{w(k);w(x)});else if(v instanceof Set)v.forEach(w);else for(const k in v)w(v[k])})(S);
  const ids=new Map();let nid=0;
  function e(v,inArr){
    if(v===undefined)return inArr?{$u:1}:undefined;
    if(typeof v==='function'||typeof v==='symbol')return inArr?{$u:1}:undefined;
    if(typeof v==='number'){if(v!==v)return {$n:'NaN'};if(v===Infinity)return {$n:'Inf'};if(v===-Infinity)return {$n:'-Inf'};return v}
    if(typeof v==='bigint')return Number(v);
    if(!isObj(v))return v;
    if(v instanceof Date)return {$d:v.getTime()};
    if(ids.has(v))return {$ref:ids.get(v)};
    const sh=shared.has(v);let id=null;if(sh){id=nid++;ids.set(v,id)}
    let out;
    if(Array.isArray(v)){const a=v.map(x=>e(x,true));out=sh?{$id:id,$a:a}:a}
    else if(v instanceof Map){const m=[];v.forEach((x,k)=>m.push([e(k,true),e(x,true)]));out={$m:m};if(sh)out.$id=id}
    else if(v instanceof Set){const a=[];v.forEach(x=>a.push(e(x,true)));out={$s:a};if(sh)out.$id=id}
    else{out={};if(sh)out.$id=id;for(const k in v){const x=e(v[k],false);if(x!==undefined)out[k]=x}}
    return out}
  const data=e(S,false);
  const body=JSON.stringify(data);
  return '{"bntg":'+FMT+',"ver":'+JSON.stringify(ver||'')+',"t":'+(S&&S.t!=null?S.t:0)+',"h":"'+hash(body)+'","data":'+body+'}'}
function dec(txt){
  const j=JSON.parse(txt);
  if(!j||j.bntg!==FMT||!('data' in j))return j; /* file cũ: JSON thường */
  const body=JSON.stringify(j.data);
  if(j.h&&hash(body)!==j.h)throw new Error('Mã kiểm của file save không khớp: file bị sửa hoặc bị hỏng');
  const ids=new Map();
  function d(v){
    if(!isObj(v))return v;
    if(Array.isArray(v))return v.map(d);
    if('$ref' in v)return ids.get(v.$ref);
    if('$n' in v)return v.$n==='NaN'?NaN:v.$n==='Inf'?Infinity:-Infinity;
    if('$u' in v)return undefined;
    if('$d' in v)return new Date(v.$d);
    if('$a' in v){const a=[];if('$id' in v)ids.set(v.$id,a);v.$a.forEach(x=>a.push(d(x)));return a}
    if('$m' in v){const m=new Map();if('$id' in v)ids.set(v.$id,m);v.$m.forEach(([k,x])=>m.set(d(k),d(x)));return m}
    if('$s' in v){const s=new Set();if('$id' in v)ids.set(v.$id,s);v.$s.forEach(x=>s.add(d(x)));return s}
    const o={};if('$id' in v)ids.set(v.$id,o);
    for(const k in v){if(k==='$id')continue;o[k]=d(v[k])}
    return o}
  return d(j.data)}
window.BNSER={enc,dec,hash,FMT};
})();
