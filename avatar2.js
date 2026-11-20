/* Bách Niên Thế Gia v6.7.0-d9.2 · ảnh đại diện mới (chỉ bản admin dùng, bật bằng BN_ADMIN.ui2)
   Sinh ra từ tên và id nên mỗi người một mặt riêng; nghề, cấp bậc, tước và gia thế đổi mũ, áo, phụ kiện.
   Số biến thể: 6 màu da, 4 dáng mặt, 6 kiểu mắt, 4 kiểu mày, 3 kiểu mũi, 4 kiểu miệng, 8 kiểu tóc nam, 8 kiểu tóc nữ,
   6 kiểu râu, 5 dấu hiệu riêng, 5 màu tóc, 12 màu nền, và hơn 25 bộ trang phục theo nghề. */
(function(){
const hs=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
const P=(h,k,n)=>{let x=Math.imul(h^(k*2654435761),2246822519)>>>0;x^=x>>>13;x=Math.imul(x,3266489917)>>>0;return (x>>>8)%n};
const SKIN=['#f6dcc0','#efcda8','#e2b68f','#d09d76','#b9825c','#9d6b49'];
const HAIR=['#1b1714','#2c2019','#3f2b1d','#5a3a24','#2a2a33'];
/* nền theo nhóm nghề */
const BGH={nong:95,ngu:195,tieunhi:40,hangrong:35,khuanvac:28,tieuphu:110,tho:22,det:320,bep:18,mo:340,chan:75,y:150,nguy:160,su:228,nghe:285,diaky:260,tieu:355,hiep:12,thulai:205,nhadich:0,quan:6,quan_ngu:212,vua:46,chu:52,hau:218,noi:330,huu:30,none:60};
/* áo theo nghề: [màu áo, màu cổ/viền] */
const CL={nong:['#8a6a3d','#6a4f2a'],ngu:['#3f7380','#2c525c'],tieunhi:['#b79d74','#8d7650'],hangrong:['#a8794f','#7e5834'],khuanvac:['#7a6a58','#574a3c'],tieuphu:['#5f7a4a','#44592f'],
 tho:['#7b6a59','#4f4034'],det:['#b25c86','#8a3f66'],bep:['#e8e4da','#c9c3b4'],mo:['#e3dfd4','#b9b3a3'],chan:['#7f8a57','#5c6639'],y:['#4f8060','#355c43'],nguy:['#2f7a62','#c9a227'],
 su:['#33508c','#22386a'],nghe:['#7d4d83','#5b3361'],diaky:['#2e3a4f','#c9a227'],tieu:['#7c2d2d','#4d1818'],hiep:['#2f3d4a','#a5342a'],thulai:['#2f6a86','#1f4a60'],nhadich:['#2c2c33','#a5342a'],
 chu:['#8c5a1f','#c9a227'],hau:['#4d535a','#e9e2d3'],noi:['#a96a73','#7d4750'],huu:['#6d6a60','#4c4a42'],none:['#7a8090','#585d6b'],vua:['#d3a41f','#a5342a']};
const QUANC=lv=>lv>=7?['#701212','#c9a227']:lv>=5?['#9a2c22','#d9b13b']:lv>=3?['#b04a2a','#d9c27a']:lv>=1?['#2f6a86','#9ac0d3']:['#3b6e5a','#9ac0a8'];
const ARMC=lv=>lv>=6?['#5a5f66','#c9a227']:lv>=3?['#656a70','#a5342a']:['#7b6d56','#4d4333'];
function F(c,size,tier){
 const id=String(c.surname||'')+'|'+String(c.given||'')+'|'+String(c.id||'');const h=hs(id);const age=c._age!=null?c._age:(c.age||30);
 const f=c.g==='nữ';const job=c.job||'none';const lv=c.lv||0;const kid=age<12,teen=age>=12&&age<18,old=age>=55,vold=age>=70;
 const skin=SKIN[P(h,1,6)];const skinD=skin; const face=kid?1:P(h,2,4);
 let hair=HAIR[P(h,3,5)];if(age>=45&&P(h,4,3)===0)hair='#6a655e';if(old)hair=vold?'#e4e1da':'#aeaaa2';
 const eyeK=P(h,5,6),browK=P(h,6,4),noseK=P(h,7,3),mouthK=P(h,8,4);
 const hs_=f?P(h,9,8):P(h,9,8);
 const bg=BGH[job]!=null?BGH[job]:60;const bgc=`hsl(${(bg+P(h,10,5)*6)%360},${34+P(h,11,3)*6}%,${84+P(h,12,2)*3}%)`;
 const rich=(tier||0)>=4,mid=(tier||0)>=2;const noble=(c.tuoc||0)>0;
 let robe=(CL[job]||CL.none)[0],trim=(CL[job]||CL.none)[1];
 if(job==='quan'){[robe,trim]=QUANC(lv)}else if(job==='quan_ngu'){[robe,trim]=ARMC(lv)}
 if(job==='none'||job==='huu'||job==='noi'){robe=`hsl(${(P(h,13,360))},${f?34:26}%,${f?50:42}%)`}
 if(noble&&job!=='quan'&&job!=='quan_ngu'){robe='#6a3f8a';trim='#c9a227'}
 else if(rich&&['none','noi','chu','hau'].indexOf(job)<0&&job!=='quan'&&job!=='quan_ngu'){trim='#c9a227'}
 let out='';const add=s=>out+=s;
 /* nền */
 add(`<circle cx="32" cy="32" r="32" fill="${bgc}"/>`);
 /* tóc sau */
 const long_=f?(hs_===2||hs_===3||hs_===5):(hs_===2);
 if(long_)add(`<path d="M14 36q-2-24 18-24q20 0 18 24v14q-5-4-6-12h-24q-1 8-6 12z" fill="${hair}"/>`);
 if(f&&hs_===3&&!kid)add(`<path d="M17 38q-4 8 0 16M47 38q4 8 0 16" stroke="${hair}" stroke-width="4.5" stroke-linecap="round" fill="none"/><circle cx="17" cy="55" r="2" fill="#a5342a"/><circle cx="47" cy="55" r="2" fill="#a5342a"/>`);
 /* thân áo */
 const sh=kid?'M12 64q2-12 20-13q18 1 20 13z':'M5 64q2-16 27-17q25 1 27 17z';
 add(`<path d="${sh}" fill="${robe}"/>`);
 /* kiểu cổ áo */
 if(job==='quan'){add(`<path d="M24 47l8 10 8-10" fill="${f?'#f3e6d0':'#efe6d4'}" stroke="${trim}" stroke-width="1.4"/><rect x="21" y="53" width="22" height="11" rx="1.5" fill="${trim}" opacity=".92"/><circle cx="32" cy="58.5" r="2.7" fill="${robe}"/><path d="M29 61l3-5 3 5z" fill="${trim}"/>`);
  add(`<path d="M5 60h54" stroke="#16130f" stroke-width="1.5" opacity=".7"/>`)}
 else if(job==='quan_ngu'){add(`<path d="M5 64q1-9 8-13l8 3-3 10z M59 64q-1-9-8-13l-8 3 3 10z" fill="${trim}" opacity=".95"/><rect x="25" y="52" width="14" height="12" rx="2" fill="#4a4f55"/><circle cx="32" cy="58" r="2.2" fill="${trim}"/>`);}
 else if(job==='bep'||job==='tho'||job==='det'||job==='noi'){add(`<path d="M24 47l8 7 8-7" fill="#efe6d4"/><path d="M20 64v-9h24v9z" fill="${job==='tho'?'#5a4a3a':'#f2eee4'}" opacity=".95"/>`)}
 else if(job==='vua'){add(`<path d="M24 47l8 8 8-8" fill="#f3e6d0"/><circle cx="32" cy="59" r="4.2" fill="${trim}"/><path d="M29 59h6M32 56v6" stroke="#d3a41f" stroke-width="1"/>`)}
 else if(job==='nong'||job==='ngu'||job==='khuanvac'||job==='tieuphu'||job==='chan'){add(`<path d="M24 47l8 9 8-9" fill="${skin}"/><path d="M24 47l8 9 8-9" fill="none" stroke="${trim}" stroke-width="1.6"/>`)}
 else{add(`<path d="M24 47l8 10 8-10" fill="${f?'#f3e6d0':'#eadfc9'}" stroke="${trim}" stroke-width="1.2"/>`)}
 /* hoa văn theo gia thế */
 if((rich||noble)&&job!=='quan'&&job!=='quan_ngu'&&job!=='vua'&&job!=='nong'&&job!=='ngu'){add(`<circle cx="18" cy="58" r="2.6" fill="none" stroke="${trim}" stroke-width="1"/><circle cx="46" cy="58" r="2.6" fill="none" stroke="${trim}" stroke-width="1"/>`)}
 if(rich||noble||(job==='quan'&&lv>=3)){add(`<path d="M32 56v4" stroke="#7a5a2a" stroke-width=".8"/><circle cx="32" cy="61.5" r="2.4" fill="#4fb6a4"/><circle cx="32" cy="61.5" r="1" fill="#2a7a6c"/>`)}
 /* phụ kiện thân */
 if(job==='hiep')add(`<rect x="49" y="34" width="4" height="19" rx="1.5" fill="#6a4a2a" transform="rotate(18 51 44)"/><rect x="47.6" y="33" width="7" height="3" fill="#c9a227" transform="rotate(18 51 44)"/>`);
 if(job==='hangrong')add(`<path d="M2 44L40 54" stroke="#7a5a32" stroke-width="2.4" stroke-linecap="round"/><ellipse cx="6" cy="50" rx="5" ry="2.4" fill="#b7975a"/>`);
 if(job==='y'||job==='nguy')add(`<path d="M18 48l22 14" stroke="#7a5a32" stroke-width="1.3"/><rect x="12" y="56" width="9" height="8" rx="3" fill="#c9a96a" stroke="#7a5a32" stroke-width=".8"/>`);
 if(job==='su')add(`<rect x="14" y="54" width="12" height="9" rx="1" fill="#efe6d0" stroke="#7a5a32" stroke-width=".8"/><path d="M16 57h8M16 60h8" stroke="#7a5a32" stroke-width=".6"/>`);
 if(job==='tieu')add(`<path d="M9 51q10 8 24 5" stroke="${trim}" stroke-width="2.6" fill="none"/>`);
 if(job==='nghe')add(`<circle cx="50" cy="58" r="3" fill="#d9a441"/><path d="M50 55v6M47 58h6" stroke="#7a4a1f" stroke-width=".8"/>`);
 /* cổ, đầu */
 add(`<rect x="27.5" y="39" width="9" height="10" rx="3" fill="${skin}"/>`);
 add(`<ellipse cx="19.5" cy="31" rx="2.4" ry="3.4" fill="${skin}"/><ellipse cx="44.5" cy="31" rx="2.4" ry="3.4" fill="${skin}"/>`);
 const FS=[`<ellipse cx="32" cy="30" rx="12.2" ry="14.8" fill="${skin}"/>`,`<ellipse cx="32" cy="31" rx="13.6" ry="13.6" fill="${skin}"/>`,
  `<path d="M20 25q0-12 12-12t12 12q0 8-3 13q-4 6-9 6t-9-6q-3-5-3-13z" fill="${skin}"/>`,`<path d="M19.6 24q0-10 12.4-10t12.4 10v8q0 9-12.4 11.4q-12.4-2.4-12.4-11.4z" fill="${skin}"/>`];
 add(FS[face]);
 /* tóc trước */
 const topCap=`<path d="M19 28q-1-15 13-15q14 0 13 15q-5-9-13-9q-8 0-13 9z" fill="${hair}"/>`;
 let hat='';
 const hatless=!['quan','quan_ngu','vua','nong','ngu','hangrong','bep','thulai','nhadich','diaky','chu','su','y','nguy','tieu','hiep','tho','khuanvac','det','mo','noi','hau'].includes(job);
 if(f){
  if(kid){add(`<circle cx="21" cy="16" r="4.6" fill="${hair}"/><circle cx="43" cy="16" r="4.6" fill="${hair}"/>${topCap}`)}
  else{
   const st=hs_;
   if(st===0)add(`<circle cx="32" cy="9" r="6.5" fill="${hair}"/>${topCap}<path d="M25 9h14" stroke="#c9a227" stroke-width="1.4"/>`);
   else if(st===1)add(`<circle cx="19" cy="14" r="6" fill="${hair}"/><circle cx="45" cy="14" r="6" fill="${hair}"/>${topCap}`);
   else if(st===2)add(`${topCap}<path d="M32 15q-6 3-9 9M32 15q6 3 9 9" stroke="#00000022" stroke-width="1" fill="none"/>`);
   else if(st===3)add(`${topCap}`);
   else if(st===4)add(`${topCap}<circle cx="43" cy="20" r="5" fill="${hair}"/><path d="M38 14l9 10" stroke="#c9a227" stroke-width="1.6"/><circle cx="47" cy="25" r="1.6" fill="#c9a227"/>`);
   else if(st===5)add(`${topCap}<path d="M22 17q10-8 20 0" fill="${hair}"/><path d="M45 16q6 4 4 14" stroke="${hair}" stroke-width="4" fill="none" stroke-linecap="round"/>`);
   else if(st===6)add(`<path d="M17 28q-1-17 15-17t15 17q-6-8-15-8t-15 8z" fill="#c07a8a"/><path d="M17 27h30" stroke="#8a4a5a" stroke-width="1.2"/>`);
   else add(`${topCap}<circle cx="32" cy="10" r="5.6" fill="${hair}"/><circle cx="26" cy="9" r="2.3" fill="#e58f86"/><circle cx="38" cy="9" r="2.3" fill="#f0c36a"/><circle cx="32" cy="6" r="2" fill="#e58f86"/>`);
  }
  if(rich||noble)add(`<path d="M21 38q-1 4 0 5M43 38q1 4 0 5" stroke="#c9a227" stroke-width="1.6" stroke-linecap="round"/>`);
 }else{
  const st=hs_;
  if(kid)add(`${topCap}<circle cx="32" cy="10" r="3.4" fill="${hair}"/>`);
  else if(st===0||st===1)add(`${topCap}<circle cx="32" cy="9" r="5" fill="${hair}"/>${st===1?'<path d="M25 11l14-3" stroke="#c9a227" stroke-width="1.6"/>':'<path d="M28 12h8" stroke="#7a4f32" stroke-width="1.6"/>'}`);
  else if(st===2)add(`${topCap}`);
  else if(st===3)add(`<path d="M19 26q0-12 13-12t13 12q-5-6-13-6t-13 6z" fill="${hair}"/>`);
  else if(st===4)add(`<path d="M22 21q10-6 20 0" stroke="${hair}" stroke-width="1.4" opacity=".45" fill="none"/>`); /* đầu cạo */
  else if(st===5)add(`${topCap}<circle cx="45" cy="34" r="3.6" fill="${hair}"/>`);
  else if(st===6)add(`<path d="M18 28q-1-15 14-15q15 0 14 15q-3-6-10-8q-8 1-18 8z" fill="${hair}"/>`);
  else add(`${topCap}<path d="M19 21h26" stroke="#a5342a" stroke-width="2.6"/>`);
 }
 /* mũ nón theo nghề (vẽ đè lên tóc) */
 const hatc=(job==='quan')?'#16130f':'#16130f';
 if(job==='quan'){const w=lv>=6?17:lv>=3?14:10;hat=`<rect x="21" y="6" width="22" height="12" rx="4" fill="${hatc}"/><rect x="${32-w-9}" y="11" width="${w+3}" height="3" rx="1.5" fill="${hatc}"/><rect x="${32+9-3}" y="11" width="${w+3}" height="3" rx="1.5" fill="${hatc}"/><path d="M22 17h20" stroke="${lv>=3?'#c9a227':'#6a6a6a'}" stroke-width="1.4"/>`}
 else if(job==='quan_ngu'){const[c1,c2]=ARMC(lv);hat=`<path d="M17 23q0-15 15-15t15 15z" fill="${c1}"/><path d="M17 23h30" stroke="${c2}" stroke-width="2"/><path d="M32 2v7" stroke="${lv>=3?'#a5342a':'#8a6a3a'}" stroke-width="${lv>=3?4:2.6}" stroke-linecap="round"/>`}
 else if(job==='vua'){hat=`<rect x="20" y="6" width="24" height="8" fill="#d3a41f"/><path d="M18 6h28M22 6v-3M28 6v-4M32 6v-5M36 6v-4M42 6v-3" stroke="#d3a41f" stroke-width="2" stroke-linecap="round"/>`}
 else if(job==='nong'||job==='ngu'||job==='hangrong'||job==='hiep'){const r=job==='hiep'?27:25;hat=`<path d="M${32-r} 21q${r} -22 ${2*r} 0z" fill="${job==='hiep'?'#b9985a':'#d4b872'}"/><path d="M${32-r} 21h${2*r}" stroke="#8a6a3a" stroke-width="1.3"/><path d="M24 21q0 8 4 11M40 21q0 8-4 11" stroke="#a5342a" stroke-width=".9" fill="none"/>`}
 else if(job==='bep'){hat=`<rect x="22" y="3" width="20" height="14" rx="6" fill="#f6f3ec" stroke="#cfc9b8" stroke-width="1"/><rect x="21" y="14" width="22" height="4" fill="#f6f3ec" stroke="#cfc9b8" stroke-width="1"/>`}
 else if(job==='thulai'){hat=`<rect x="22" y="9" width="20" height="9" rx="3" fill="#1b1b22"/><rect x="14" y="13" width="9" height="2.4" rx="1.2" fill="#1b1b22"/><rect x="41" y="13" width="9" height="2.4" rx="1.2" fill="#1b1b22"/>`}
 else if(job==='nhadich'){hat=`<path d="M21 18q0-11 11-11t11 11z" fill="#23232b"/><path d="M21 17h22" stroke="#a5342a" stroke-width="2.4"/>`}
 else if(job==='diaky'){hat=`<ellipse cx="32" cy="9" rx="10" ry="5" fill="#222a38"/><rect x="26" y="9" width="12" height="9" fill="#222a38"/><circle cx="32" cy="13" r="2.3" fill="#efe6d4"/><path d="M32 10.7a2.3 2.3 0 0 1 0 4.6" fill="#222a38"/>`}
 else if(job==='chu'){hat=`<path d="M22 18q0-12 10-12t10 12z" fill="${rich?'#6a3f8a':'#1b1b22'}"/><circle cx="32" cy="6" r="2" fill="#c9a227"/><path d="M22 17h20" stroke="#c9a227" stroke-width="1.6"/>`}
 else if(job==='su'||job==='y'||job==='nguy'){const col=job==='su'?'#1b2a52':job==='y'?'#2e4b38':'#1f5a4a';hat=`<path d="M20 20q0-10 12-10t12 10z" fill="${col}"/><path d="M20 19h24" stroke="#00000055" stroke-width="1"/>${job==='nguy'?'<path d="M26 12h12" stroke="#c9a227" stroke-width="1.4"/>':''}`}
 else if(job==='tieu'||job==='khuanvac'||job==='tho'){hat=`<path d="M19 21q13-8 26 0v-3q-13-8-26 0z" fill="${job==='tieu'?'#a5342a':job==='tho'?'#8b7a62':'#c9bda4'}"/>`}
 else if(job==='det'||job==='mo'||(job==='noi'&&hs_>=6)){hat=`<path d="M17 28q-1-17 15-17t15 17q-5-7-15-7t-15 7z" fill="${job==='mo'?'#eee8da':job==='det'?'#d98ab0':'#c9a679'}"/>`}
 else if(job==='hau'){hat=`<path d="M21 19q0-9 11-9t11 9z" fill="#4a4f55"/>`}
 if(hat)add(hat);
 /* mắt mày mũi miệng */
 const ey=kid?33:31;const lash=f&&!kid?'stroke-linecap="round"':'stroke-linecap="round"';
 const ink='#2a1d16';
 const eye=x=>{switch(eyeK){case 0:return `<path d="M${x-3.4} ${ey}h6.8" stroke="${ink}" stroke-width="1.8" ${lash}/>`;
   case 1:return `<circle cx="${x}" cy="${ey}" r="${kid?2.2:1.7}" fill="${ink}"/>`;
   case 2:return `<path d="M${x-3.6} ${ey}q3.6-3.4 7.2 0q-3.6 2-7.2 0z" fill="#fff" stroke="${ink}" stroke-width="1"/><circle cx="${x}" cy="${ey}" r="1.2" fill="${ink}"/>`;
   case 3:return `<path d="M${x-3.4} ${ey-.5}q3.4 3 6.8 0" stroke="${ink}" stroke-width="1.6" fill="none" ${lash}/>`;
   case 4:return `<circle cx="${x}" cy="${ey}" r="2.7" fill="#fff" stroke="${ink}" stroke-width=".8"/><circle cx="${x}" cy="${ey}" r="1.4" fill="${ink}"/>`;
   default:return `<path d="M${x-3.6} ${ey+.8}l7.2 -1.8" stroke="${ink}" stroke-width="1.9" ${lash}/>`}};
 add(eye(26)+eye(38));
 if(f&&!kid&&eyeK!==1)add(`<path d="M22.6 ${ey-.6}l-1.4-1.2M41.4 ${ey-.6}l1.4-1.2" stroke="${ink}" stroke-width=".9" stroke-linecap="round"/>`);
 const by=ey-4.2;
 const br=[`<path d="M22 ${by}q4-2.4 8 0M34 ${by}q4-2.4 8 0" stroke="${hair}" stroke-width="${f?1:1.4}" fill="none" stroke-linecap="round"/>`,
  `<path d="M22 ${by}h8M34 ${by}h8" stroke="${hair}" stroke-width="${f?1.2:2.2}" stroke-linecap="round"/>`,
  `<path d="M22 ${by+1.2}l8 -2.2M34 ${by-1}l8 2.2" stroke="${hair}" stroke-width="${f?1.1:2}" stroke-linecap="round"/>`,
  `<path d="M23 ${by}h5M36 ${by}h5" stroke="${hair}" stroke-width="${f?1:1.6}" stroke-linecap="round"/>`][browK];
 add(br);
 const ny=ey+3;
 add([`<path d="M32 ${ny}v5" stroke="#8a6048" stroke-width="1" stroke-linecap="round" opacity=".6"/>`,`<circle cx="32" cy="${ny+4.5}" r="1.4" fill="#b7845f" opacity=".6"/>`,`<path d="M30.6 ${ny+5}q1.4 1.8 2.8 0" stroke="#8a6048" stroke-width="1.1" fill="none" stroke-linecap="round"/>`][noseK]);
 const my=ey+10.5;const happy=(c.tam||50)>=60,sad=(c.tam||50)<35;
 if(c.dead!=null)add(`<path d="M28 ${my}h8" stroke="#7a3b30" stroke-width="1.4"/>`);
 else if(f&&!kid)add(`<path d="M28.6 ${my}q3.4 ${happy?3:1.2} 6.8 0q-3.4 ${happy?1.4:.6} -6.8 0z" fill="#c4504a" stroke="#a63a35" stroke-width=".6"/>`);
 else add([`<path d="M27.5 ${my}q4.5 ${happy?3.5:sad?-1.4:1} 9 0" stroke="#7a3b30" stroke-width="1.5" fill="none" stroke-linecap="round"/>`,`<path d="M28 ${my}h8" stroke="#7a3b30" stroke-width="1.5" stroke-linecap="round"/>`,`<path d="M28 ${my}q4 ${happy?4:2} 8 0z" fill="#8a3a33" opacity=".9"/>`,`<path d="M28 ${my+.6}q4 ${happy?2.4:-.8} 8 0" stroke="#7a3b30" stroke-width="1.3" fill="none" stroke-linecap="round"/>`][mouthK]);
 if(f&&!old&&!kid)add(`<circle cx="23" cy="${ey+6}" r="2.5" fill="#e58f86" opacity=".4"/><circle cx="41" cy="${ey+6}" r="2.5" fill="#e58f86" opacity=".4"/>`);
 /* râu */
 if(!f&&!kid&&!teen&&age>=24){const b=P(h,14,7);const bc=old?hair:hair;
  if(b===0)add(`<path d="M25.5 ${my-3}q6.5-3 13 0q-6.5 1.4-13 0z" fill="${bc}"/>`);
  else if(b===1)add(`<path d="M25 ${my-3.4}q7-3.4 14 0l-1.6 1.4q-5.4-1.6-10.8 0z" fill="${bc}"/><path d="M26 ${my-2}q-2.4 3.4 0 6M38 ${my-2}q2.4 3.4 0 6" stroke="${bc}" stroke-width="1.5" fill="none"/>`);
  else if(b===2)add(`<path d="M25.5 ${my-3}q6.5-3 13 0q-6.5 1.6-13 0z" fill="${bc}"/><path d="M29 ${my+1.4}q3 8 6 0q-3 2-6 0z" fill="${bc}"/>`);
  else if(b===3&&age>=34)add(`<path d="M22 ${my-6}q-1 14 10 16q11-2 10-16q-3 8-10 8t-10-8z" fill="${bc}"/><path d="M27 ${my}q5 2.4 10 0" stroke="#7a3b30" stroke-width="1.3" fill="none"/>`);
  else if(b===4&&age>=50)add(`<path d="M24 ${my-3}q8-4 16 0q2 14-8 22q-10-8-8-22z" fill="${old?'#e8e5de':bc}"/><path d="M27 ${my}q5 2.4 10 0" stroke="#7a3b30" stroke-width="1.3" fill="none"/>`);
  else if(b===5)add(`<path d="M20.5 ${my-9}v7M43.5 ${my-9}v7" stroke="${bc}" stroke-width="2.6" stroke-linecap="round"/>`);}
 /* dấu hiệu riêng */
 const mk=P(h,15,10);
 if(mk===0)add(`<path d="M37 ${ey+3}l5 6" stroke="#b2605a" stroke-width="1.2" stroke-linecap="round"/>`);
 else if(mk===1)add(`<circle cx="${f?'37':'27'}" cy="${ey+8}" r="1" fill="#6a3f30"/>`);
 else if(mk===2&&f)add(`<circle cx="40" cy="${my-1}" r=".9" fill="#2a1d16"/>`);
 else if(mk===3&&!kid)add(`<circle cx="25" cy="${ey+5}" r=".7" fill="#a56a4a"/><circle cx="27" cy="${ey+6.4}" r=".7" fill="#a56a4a"/><circle cx="39" cy="${ey+5}" r=".7" fill="#a56a4a"/><circle cx="37" cy="${ey+6.4}" r=".7" fill="#a56a4a"/>`);
 if(old)add(`<path d="M22 ${ey+3}l3 1M42 ${ey+3}l-3 1M26 ${by-2}h10" stroke="#8a6a55" stroke-width=".7" opacity=".7"/>`);
 /* thêm mũ che trán (đè lại sau mặt) đã vẽ trước; hoàn tất */
 const dead=c.dead!=null||c.left;
 return `<svg class="ava ava2" width="${size||40}" height="${size||40}" viewBox="0 0 64 64" aria-hidden="true" style="${dead?'filter:grayscale(1);opacity:.75':''}">${out}</svg>`;
}
window.AVA2={svg:F};
})();
