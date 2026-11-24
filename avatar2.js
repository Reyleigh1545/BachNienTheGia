/* Bách Niên Thế Gia v6.7.0-d9.3 · ảnh đại diện (chỉ bản admin dùng, bật bằng BN_ADMIN.ui2)
   Kiểu hoạt hình đầu to, nét viền nâu, mắt to có điểm sáng, má hồng. Sinh từ tên và id nên mỗi người một mặt riêng;
   nghề, cấp bậc, tước, gia thế và tuổi đổi mũ, áo, phụ kiện. */
(function(){
const hs=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
const P=(h,k,n)=>{let x=Math.imul(h^(k*2654435761),2246822519)>>>0;x^=x>>>13;x=Math.imul(x,3266489917)>>>0;return (x>>>8)%n};
const SKIN=['#fbe3cc','#f6d5b6','#ebbf97','#d9a37a','#c28862','#a56f4d'];
const HAIR=['#2a211d','#3a2b22','#4d3426','#6a4a30','#27273a'];
const O='#4a3228';
const BGH={nong:95,ngu:195,tieunhi:40,hangrong:35,khuanvac:28,tieuphu:110,tho:22,tho_ren:22,det:320,bep:18,mo:340,chan:75,y:150,nguy:160,su:228,nghe:285,diaky:260,tieu:355,hiep:12,thulai:205,nhadich:0,quan:6,quan_ngu:212,vua:46,chu:52,hau:218,noi:330,huu:30,none:60};
const CL={nong:['#9a7a4a','#6f5632'],ngu:['#4a8a98','#2f5f6b'],tieunhi:['#c4a97c','#8d7650'],hangrong:['#b9844f','#7e5834'],khuanvac:['#8a7966','#5f503f'],tieuphu:['#6f8e55','#4a6736'],
 tho:['#8a7765','#5a4838'],tho_ren:['#6b5a52','#40322c'],det:['#c76a98','#8f3f68'],bep:['#f0ece2','#cfc8b6'],mo:['#ece8dc','#bdb6a4'],chan:['#8d9a60','#66723f'],y:['#5a9468','#386447'],nguy:['#36896f','#c9a227'],
 su:['#3f5fa3','#2a427a'],nghe:['#8d5a93','#62386a'],diaky:['#38465e','#c9a227'],tieu:['#8f3535','#561d1d'],hiep:['#38495a','#b03a2e'],thulai:['#3a7a98','#245068'],nhadich:['#34343c','#b03a2e'],
 chu:['#a06a24','#d4b13a'],hau:['#5a6068','#efe8d8'],noi:['#b8747d','#8a4f58'],huu:['#7d7a6d','#56544a'],none:['#7f8aa0','#5a6478'],vua:['#e0b02a','#b03a2e']};
const QUANC=lv=>lv>=7?['#7d1a1a','#e0b83a']:lv>=5?['#a83428','#e0b83a']:lv>=3?['#bb5230','#e6cf85']:lv>=1?['#3a7a98','#a8cadb']:['#4a8068','#a8cdb6'];
const ARMC=lv=>lv>=6?['#666c74','#e0b83a']:lv>=3?['#727880','#b03a2e']:['#8a7a60','#5a4c38'];
function F(c,size,tier){
 const id=String(c.surname||'')+'|'+String(c.given||'')+'|'+String(c.id||'');const h=hs(id);const age=c._age!=null?c._age:(c.age||30);
 const f=c.g==='nữ';const job=c.job||'none';const lv=c.lv||0;const kid=age<12,teen=age>=12&&age<18,old=age>=55,vold=age>=70;
 const skin=SKIN[P(h,1,6)];const face=kid?0:P(h,2,4);
 let hair=HAIR[P(h,3,5)];if(age>=46&&P(h,4,3)===0)hair='#8a847b';if(old)hair=vold?'#ece9e2':'#bdb9b0';
 const eyeK=P(h,5,6),browK=P(h,6,4),mouthK=P(h,8,3),hst=P(h,9,8);
 const bgH=((BGH[job]!=null?BGH[job]:60)+P(h,10,5)*5)%360;
 const rich=(tier||0)>=4,noble=(c.tuoc||0)>0;
 let robe=(CL[job]||CL.none)[0],trim=(CL[job]||CL.none)[1];
 if(job==='quan')[robe,trim]=QUANC(lv);else if(job==='quan_ngu')[robe,trim]=ARMC(lv);
 if(job==='none'||job==='huu'||job==='noi')robe=`hsl(${P(h,13,360)},${f?36:28}%,${f?58:46}%)`;
 if(noble&&job!=='quan'&&job!=='quan_ngu'){robe='#7a4c9c';trim='#e0b83a'}else if(rich&&!['none','noi','hau','quan','quan_ngu','vua','nong','ngu'].includes(job))trim='#e0b83a';
 const gid='g'+(h%99991);
 const ol=`stroke="${O}" stroke-width="1.25" stroke-linejoin="round" stroke-linecap="round"`;
 const hairD=`stroke="${O}" stroke-width="1.25" stroke-linejoin="round"`;
 let o='';const add=s=>o+=s;
 add(`<defs><radialGradient id="${gid}" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="hsl(${bgH},45%,93%)"/><stop offset="1" stop-color="hsl(${bgH},38%,80%)"/></radialGradient></defs><circle cx="32" cy="32" r="32" fill="url(#${gid})"/>`);
 /* tóc sau */
 const longH=f?(hst===2||hst===3||hst===5||hst===7):(hst===2);
 if(!kid&&longH)add(`<path d="M13.5 36 Q11 12 32 10.5 Q53 12 50.5 36 L51 58 Q45 54 45 44 L19 44 Q19 54 13 58Z" fill="${hair}" ${hairD}/>`);
 if(f&&hst===3&&!kid)add(`<path d="M15 38 Q9 48 14 60 M49 38 Q55 48 50 60" stroke="${hair}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M15 38 Q9 48 14 60 M49 38 Q55 48 50 60" stroke="${O}" stroke-width=".7" fill="none" opacity=".6"/><circle cx="14" cy="60" r="2.2" fill="#c8453a" ${ol}/><circle cx="50" cy="60" r="2.2" fill="#c8453a" ${ol}/>`);
 if(f&&hst===5&&!kid)add(`<path d="M46 20 Q60 26 54 50" stroke="${hair}" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="47" cy="21" r="2" fill="#c8453a" ${ol}/>`);
 /* thân */
 const kb=kid?2.5:0;
 add(`<path d="M28.2 ${44+kb} v8 q3.8 3.2 7.6 0 v-8z" fill="${skin}" ${ol}/>`);
 add(`<path d="M9 66 Q9 ${52+kb} 24 ${50+kb} L40 ${50+kb} Q55 ${52+kb} 55 66Z" fill="${robe}" ${ol}/>`);
 if(job==='quan'){add(`<path d="M25 ${50.5+kb} L32 59 L39 ${50.5+kb}" fill="#f6ecd8" ${ol}/><rect x="21" y="57" width="22" height="9" rx="1.5" fill="${trim}" ${ol}/><circle cx="32" cy="61.5" r="2.6" fill="${robe}" ${ol}/>`)}
 else if(job==='quan_ngu'){add(`<path d="M9 66 Q9 56 15 52 L23 55 L20 66z M55 66 Q55 56 49 52 L41 55 L44 66z" fill="${trim}" ${ol}/><rect x="26" y="56" width="12" height="10" rx="2" fill="#555b62" ${ol}/><circle cx="32" cy="61" r="2" fill="${trim}"/>`)}
 else if(job==='bep'||job==='tho'||job==='tho_ren'||job==='det'||job==='noi'){add(`<path d="M25 ${50.5+kb} L32 58 L39 ${50.5+kb}" fill="#f6ecd8" ${ol}/><path d="M20 66 v-8 q12 4 24 0 v8z" fill="${job==='tho'?'#6a5645':'#fbf8f0'}" ${ol}/>`)}
 else if(job==='vua'){add(`<path d="M25 ${50.5+kb} L32 58 L39 ${50.5+kb}" fill="#f6ecd8" ${ol}/><circle cx="32" cy="60.5" r="4.4" fill="${trim}" ${ol}/>`)}
 else if(['nong','ngu','khuanvac','tieuphu','chan'].includes(job)){add(`<path d="M25 ${50.5+kb} L32 58 L39 ${50.5+kb}" fill="${skin}" ${ol}/>`)}
 else{add(`<path d="M25 ${50.5+kb} L32 59 L39 ${50.5+kb}" fill="#f6ecd8" ${ol}/><path d="M32 59 v7" stroke="${trim}" stroke-width="1.2"/>`)}
 if((rich||noble||(job==='quan'&&lv>=3))&&job!=='vua')add(`<circle cx="32" cy="63.5" r="2.3" fill="#58c0ae" ${ol}/>`);
 if((rich||noble)&&!['quan','quan_ngu','vua','nong','ngu'].includes(job))add(`<circle cx="17" cy="60" r="2.4" fill="none" stroke="${trim}" stroke-width="1.1"/><circle cx="47" cy="60" r="2.4" fill="none" stroke="${trim}" stroke-width="1.1"/>`);
 if(job==='hiep')add(`<rect x="50" y="36" width="4" height="20" rx="1.6" fill="#7a5632" transform="rotate(16 52 46)" ${ol}/><rect x="48.4" y="35" width="7.4" height="3.2" fill="#e0b83a" transform="rotate(16 52 46)" ${ol}/>`);
 if(job==='hangrong')add(`<path d="M2 47 L42 58" stroke="#8a6a3e" stroke-width="2.6" stroke-linecap="round"/><ellipse cx="6" cy="53" rx="5.5" ry="2.6" fill="#c9a665" ${ol}/>`);
 if(job==='y'||job==='nguy')add(`<path d="M18 52 L40 66" stroke="#8a6a3e" stroke-width="1.4"/><rect x="11" y="57" width="10" height="9" rx="3.4" fill="#d4b676" ${ol}/>`);
 if(job==='su')add(`<rect x="13" y="56" width="13" height="10" rx="1.2" fill="#f4ead0" ${ol}/><path d="M15.5 59.5h8M15.5 62.5h8" stroke="#8a6a3e" stroke-width=".7"/>`);
 if(job==='tieu')add(`<path d="M10 54 Q22 64 38 60" stroke="${trim}" stroke-width="3" fill="none" stroke-linecap="round"/>`);
 if(job==='nghe')add(`<circle cx="50" cy="61" r="3.4" fill="#e0a843" ${ol}/>`);
 /* tai và mặt */
 add(`<circle cx="17.6" cy="34" r="2.9" fill="${skin}" ${ol}/><circle cx="46.4" cy="34" r="2.9" fill="${skin}" ${ol}/>`);
 const FS=[`<ellipse cx="32" cy="32" rx="14.8" ry="15.2" fill="${skin}" ${ol}/>`,`<ellipse cx="32" cy="32.5" rx="13.6" ry="16" fill="${skin}" ${ol}/>`,
  `<path d="M17.6 28 Q17 16.5 32 16.5 Q47 16.5 46.4 28 Q46 40 38.4 45.6 Q32 49 25.6 45.6 Q18 40 17.6 28Z" fill="${skin}" ${ol}/>`,
  `<path d="M17.4 27 Q17.4 16.5 32 16.5 Q46.6 16.5 46.6 27 L46 38 Q45 47 32 48 Q19 47 18 38Z" fill="${skin}" ${ol}/>`];
 add(FS[face]);
 add(`<ellipse cx="22.8" cy="40" rx="3.2" ry="2" fill="#f0867c" opacity=".38"/><ellipse cx="41.2" cy="40" rx="3.2" ry="2" fill="#f0867c" opacity=".38"/>`);
 /* tóc trước */
 const cap=`<path d="M16.4 32 Q13.5 11 32 10.6 Q50.5 11 47.6 32 Q46 23.5 40 21.5 Q32 26 24 21.5 Q18 23.5 16.4 32Z" fill="${hair}" ${hairD}/><path d="M23 15.5 Q30 12.4 38 14.4" stroke="#fff" stroke-width="1.6" fill="none" opacity=".28" stroke-linecap="round"/>`;
 if(f){
  if(kid)add(`<circle cx="19.5" cy="16.5" r="5.2" fill="${hair}" ${hairD}/><circle cx="44.5" cy="16.5" r="5.2" fill="${hair}" ${hairD}/>${cap}`);
  else if(hst===0)add(`<circle cx="32" cy="8.5" r="6.4" fill="${hair}" ${hairD}/>${cap}<path d="M26.4 12.6 h11.2" stroke="#e0b83a" stroke-width="1.8" stroke-linecap="round"/>`);
  else if(hst===1)add(`<circle cx="18.5" cy="14.5" r="6.2" fill="${hair}" ${hairD}/><circle cx="45.5" cy="14.5" r="6.2" fill="${hair}" ${hairD}/>${cap}<circle cx="18.5" cy="14.5" r="1.6" fill="#c8453a"/><circle cx="45.5" cy="14.5" r="1.6" fill="#c8453a"/>`);
  else if(hst===4)add(`${cap}<circle cx="44.5" cy="21" r="5.4" fill="${hair}" ${hairD}/><path d="M38 14 L47 25" stroke="#e0b83a" stroke-width="1.8" stroke-linecap="round"/><circle cx="47" cy="25" r="1.8" fill="#e05a5a" ${ol}/>`);
  else if(hst===6)add(`<path d="M16.4 32 Q13 10.5 32 10 Q51 10.5 47.6 32 Q44 21 32 21 Q20 21 16.4 32Z" fill="#cf7a8c" ${ol}/><path d="M18 25 Q32 17 46 25" stroke="#a85468" stroke-width="1.2" fill="none"/>`);
  else if(hst===7)add(`${cap}<circle cx="32" cy="9.5" r="5.2" fill="${hair}" ${hairD}/><circle cx="26" cy="9" r="2.4" fill="#f08a80" ${ol}/><circle cx="38" cy="9" r="2.4" fill="#f3c862" ${ol}/>`);
  else add(`${cap}<path d="M32 14 Q27 17 24 24 M32 14 Q37 17 40 24" stroke="${O}" stroke-width=".8" fill="none" opacity=".55"/>`);
  if(rich||noble)add(`<circle cx="17.4" cy="38.5" r="1.4" fill="#e0b83a"/><circle cx="46.6" cy="38.5" r="1.4" fill="#e0b83a"/>`);
 }else{
  if(kid)add(`${cap}<circle cx="32" cy="9" r="3.8" fill="${hair}" ${hairD}/>`);
  else if(hst===0)add(`${cap}<circle cx="32" cy="8.5" r="5.6" fill="${hair}" ${hairD}/><path d="M27.4 12.5 h9.2" stroke="#c8453a" stroke-width="1.8" stroke-linecap="round"/>`);
  else if(hst===1)add(`${cap}<circle cx="32" cy="8.5" r="5.6" fill="${hair}" ${hairD}/><path d="M24 11.5 L40 6.5" stroke="#e0b83a" stroke-width="1.9" stroke-linecap="round"/>`);
  else if(hst===2||hst===5)add(cap);
  else if(hst===3)add(`<path d="M16.4 32 Q13.5 11 32 10.6 Q50.5 11 47.6 32 Q43 24 32 23.5 Q21 24 16.4 32Z" fill="${hair}" ${hairD}/>`);
  else if(hst===4)add(`<path d="M20 20 Q32 12 44 20" stroke="${O}" stroke-width="1" fill="none" opacity=".25"/><path d="M26 16 Q31 14 36 15" stroke="#fff" stroke-width="2" fill="none" opacity=".35" stroke-linecap="round"/>`);
  else if(hst===6)add(`<path d="M16.4 32 Q13.5 11 32 10.6 Q50.5 11 47.6 32 Q44 24 36 21.5 Q27 22 16.4 32Z" fill="${hair}" ${hairD}/>`);
  else add(`<path d="M16.4 32 Q13.5 11 32 10.6 Q50.5 11 47.6 32 Q46 23.5 40 21.5 Q32 26 24 21.5 Q18 23.5 16.4 32Z" fill="${hair}" ${hairD}/><path d="M21 17 L19 10 L25 14 L28 8 L32 13 L37 8 L39 14 L45 10 L43 18" fill="${hair}" ${hairD}/><path d="M17 23 h30" stroke="#c8453a" stroke-width="2.4"/>`);
 }
 /* mũ theo nghề */
 const hatless=!(['quan','quan_ngu','vua','nong','ngu','hangrong','hiep','bep','thulai','nhadich','diaky','chu','su','y','nguy','tieu','khuanvac','tho','det','mo','hau'].includes(job));
 if(!kid){
  if(job==='quan'){const w=lv>=6?9:lv>=3?7:5;add(`<rect x="21.5" y="3.5" width="21" height="13" rx="4.5" fill="#1c1a1f" ${ol}/><rect x="${21.5-w-2}" y="9.6" width="${w+3}" height="3.2" rx="1.6" fill="#1c1a1f" ${ol}/><rect x="${42.5-1}" y="9.6" width="${w+3}" height="3.2" rx="1.6" fill="#1c1a1f" ${ol}/><path d="M22 15.5 h20" stroke="${lv>=3?'#e0b83a':'#8a8a8a'}" stroke-width="1.6"/>`)}
  else if(job==='quan_ngu'){const[a1,a2]=ARMC(lv);add(`<path d="M15.5 25 Q15 7 32 6.5 Q49 7 48.5 25z" fill="${a1}" ${ol}/><path d="M15.5 25 h33" stroke="${a2}" stroke-width="2.4"/><path d="M32 6.5 v-5" stroke="${lv>=3?'#c8453a':'#8a6a3e'}" stroke-width="${lv>=3?4.2:2.8}" stroke-linecap="round"/>`)}
  else if(job==='vua'){add(`<rect x="19.5" y="5.5" width="25" height="9" fill="#e0b02a" ${ol}/><path d="M19.5 5.5 L23 1.5 L27.5 5.5 L32 1 L36.5 5.5 L41 1.5 L44.5 5.5" fill="#e0b02a" ${ol}/>`)}
  else if(['nong','ngu','hangrong','hiep'].includes(job)){const r=job==='hiep'?29:26;add(`<path d="M${32-r} 22 Q${32-r+4} 8 32 4 Q${32+r-4} 8 ${32+r} 22 Q32 25.5 ${32-r} 22Z" fill="${job==='hiep'?'#c8a45e':'#e0c47e'}" ${ol}/><path d="M${32-r+5} 20.5 Q32 13 ${32+r-5} 20.5" stroke="#9a7a42" stroke-width="1" fill="none" opacity=".7"/>`)}
  else if(job==='bep'){add(`<path d="M21 17 Q18 6 25 4.5 Q27 1.5 32 3 Q37 1.5 39 4.5 Q46 6 43 17z" fill="#fbf8f0" ${ol}/><rect x="21" y="15" width="22" height="4.5" fill="#fbf8f0" ${ol}/>`)}
  else if(job==='thulai'){add(`<rect x="22" y="8" width="20" height="9.5" rx="3" fill="#1f1f27" ${ol}/><rect x="13" y="12.4" width="10" height="2.6" rx="1.3" fill="#1f1f27" ${ol}/><rect x="41" y="12.4" width="10" height="2.6" rx="1.3" fill="#1f1f27" ${ol}/>`)}
  else if(job==='nhadich'){add(`<path d="M20.5 18.5 Q20 5 32 5 Q44 5 43.5 18.5z" fill="#26262e" ${ol}/><path d="M20.5 17 h23" stroke="#c8453a" stroke-width="2.6"/>`)}
  else if(job==='diaky'){add(`<ellipse cx="32" cy="9" rx="11" ry="5" fill="#252d3e" ${ol}/><rect x="25.5" y="8.5" width="13" height="9" fill="#252d3e" ${ol}/><circle cx="32" cy="13" r="2.5" fill="#f3ebdb"/><path d="M32 10.5 a2.5 2.5 0 0 1 0 5" fill="#252d3e"/>`)}
  else if(job==='chu'){add(`<path d="M21.5 18.5 Q21 5 32 5 Q43 5 42.5 18.5z" fill="${rich?'#7a4c9c':'#26232a'}" ${ol}/><circle cx="32" cy="5" r="2.2" fill="#e0b83a" ${ol}/><path d="M21.5 17 h21" stroke="#e0b83a" stroke-width="1.8"/>`)}
  else if(job==='su'||job==='y'||job==='nguy'){const col=job==='su'?'#1f2f5c':job==='y'?'#2f503c':'#1f5f4e';add(`<path d="M19.5 21 Q19 7 32 7 Q45 7 44.5 21z" fill="${col}" ${ol}/><path d="M19.5 19.6 h25" stroke="#00000044" stroke-width="1.2"/>${job==='nguy'?'<path d="M25 11 h14" stroke="#e0b83a" stroke-width="1.6"/>':''}`)}
  else if(['tieu','khuanvac','tho'].includes(job)){add(`<path d="M17.5 21.5 Q32 12 46.5 21.5 L46 17.5 Q32 8.5 18 17.5z" fill="${job==='tieu'?'#b03a2e':job==='tho'?'#9a8a72':'#d4c8ac'}" ${ol}/>`)}
  else if(job==='det'||job==='mo'){add(`<path d="M16 31 Q13 10 32 9.5 Q51 10 48 31 Q44 21 32 21 Q20 21 16 31Z" fill="${job==='mo'?'#f3eee0':'#e48fb8'}" ${ol}/>`)}
  else if(job==='hau'){add(`<path d="M21 19 Q20 8 32 8 Q44 8 43 19z" fill="#555b63" ${ol}/>`)}
 }
 /* mắt */
 const ink='#2b1f1a';const ey=33.6;
 const eyeShape=(x,side)=>{const hl=`<circle cx="${x+0.9}" cy="${ey-1.2}" r="1" fill="#fff"/><circle cx="${x-0.9}" cy="${ey+1.4}" r=".5" fill="#fff"/>`;
  const big=kid||f;
  switch(eyeK){
   case 0:return `<ellipse cx="${x}" cy="${ey}" rx="${big?2.7:2.4}" ry="${big?3.5:3.1}" fill="${ink}"/>${hl}`;
   case 1:return `<ellipse cx="${x}" cy="${ey}" rx="2.9" ry="2.4" fill="${ink}"/><circle cx="${x+.9}" cy="${ey-.8}" r=".9" fill="#fff"/>`;
   case 2:return `<path d="M${x-3} ${ey+.8} Q${x} ${ey-3.2} ${x+3} ${ey+.8}" stroke="${ink}" stroke-width="1.9" fill="none" stroke-linecap="round"/>`;
   case 3:return `<ellipse cx="${x}" cy="${ey+.4}" rx="2.6" ry="2.4" fill="${ink}"/><path d="M${x-3.2} ${ey-1.2} Q${x} ${ey-2.8} ${x+3.2} ${ey-1.2}" stroke="${ink}" stroke-width="1.5" fill="none" stroke-linecap="round"/><circle cx="${x+.9}" cy="${ey-.2}" r=".8" fill="#fff"/>`;
   case 4:return `<circle cx="${x}" cy="${ey}" r="2.5" fill="${ink}"/><circle cx="${x+.8}" cy="${ey-.9}" r=".85" fill="#fff"/>`;
   default:return `<path d="M${x-3.2} ${ey+1.2} Q${x} ${ey-3.4} ${x+3.2} ${ey-.4} Q${x+.6} ${ey+3} ${x-3.2} ${ey+1.2}Z" fill="${ink}"/><circle cx="${x+.8}" cy="${ey-.6}" r=".85" fill="#fff"/>`}};
 add(eyeShape(26.2,-1)+eyeShape(37.8,1));
 if(f&&!kid&&eyeK!==2)add(`<path d="M22.8 ${ey-1.8} l-1.7 -1.4 M41.2 ${ey-1.8} l1.7 -1.4" stroke="${ink}" stroke-width="1.1" stroke-linecap="round"/>`);
 const by=ey-5.6;
 add([`<path d="M22.6 ${by+.6} Q26.2 ${by-1.8} 29.8 ${by+.4} M34.2 ${by+.4} Q37.8 ${by-1.8} 41.4 ${by+.6}" stroke="${hair}" stroke-width="${f?1.3:1.9}" fill="none" stroke-linecap="round"/>`,
  `<path d="M22.8 ${by} h6.8 M34.4 ${by} h6.8" stroke="${hair}" stroke-width="${f?1.4:2.3}" stroke-linecap="round"/>`,
  `<path d="M22.8 ${by+1.4} L29.6 ${by-.8} M34.4 ${by-.8} L41.2 ${by+1.4}" stroke="${hair}" stroke-width="${f?1.3:2.1}" stroke-linecap="round"/>`,
  `<path d="M23.4 ${by-.4} Q26.4 ${by-2.4} 29.4 ${by-.4} M34.6 ${by-.4} Q37.6 ${by-2.4} 40.6 ${by-.4}" stroke="${hair}" stroke-width="${f?1.2:1.7}" fill="none" stroke-linecap="round"/>`][browK]);
 add(`<path d="M31 38.4 Q32 39.8 33 38.4" stroke="#b07a62" stroke-width="1.1" fill="none" stroke-linecap="round"/>`);
 const my=42.4;const tam=(c.tam==null?50:c.tam);const happy=tam>=60,sad=tam<32;
 if(c.dead!=null)add(`<path d="M29.4 ${my} h5.2" stroke="#8a3a33" stroke-width="1.4" stroke-linecap="round"/>`);
 else if(f&&!kid)add(`<path d="M29.4 ${my-.2} Q32 ${my+(happy?3.2:1.6)} 34.6 ${my-.2} Q32 ${my+.7} 29.4 ${my-.2}Z" fill="#d4584f" stroke="#a63a35" stroke-width=".7" stroke-linejoin="round"/>`);
 else if(mouthK===0)add(`<path d="M29.2 ${my-.4} Q32 ${my+(happy?3.4:sad?-1.2:1.6)} 34.8 ${my-.4}" stroke="#8a3a33" stroke-width="1.5" fill="none" stroke-linecap="round"/>`);
 else if(mouthK===1)add(`<path d="M29.6 ${my} Q32 ${my+(happy?2.4:.4)} 34.4 ${my}" stroke="#8a3a33" stroke-width="1.5" fill="none" stroke-linecap="round"/>`);
 else add(`<path d="M29.4 ${my-.6} Q32 ${my+(happy?4.4:2.2)} 34.6 ${my-.6}Z" fill="#9c3f38" stroke="#8a3a33" stroke-width=".8" stroke-linejoin="round"/>`);
 /* râu */
 if(!f&&!kid&&!teen&&age>=26){const b=P(h,14,7),bc=hair;
  if(b===0)add(`<path d="M26 ${my-2.6} Q32 ${my-5.6} 38 ${my-2.6} Q32 ${my-3.6} 26 ${my-2.6}Z" fill="${bc}" ${ol}/>`);
  else if(b===1)add(`<path d="M25.4 ${my-2.4} Q28 ${my-5} 32 ${my-3.4} Q36 ${my-5} 38.6 ${my-2.4} Q36 ${my-1.6} 32 ${my-2.6} Q28 ${my-1.6} 25.4 ${my-2.4}Z" fill="${bc}" ${ol}/>`);
  else if(b===2)add(`<path d="M26 ${my-2.6} Q32 ${my-5.4} 38 ${my-2.6} Q32 ${my-3.4} 26 ${my-2.6}Z" fill="${bc}" ${ol}/><path d="M29.4 ${my+2} Q32 ${my+8} 34.6 ${my+2} Q32 ${my+3.4} 29.4 ${my+2}Z" fill="${bc}" ${ol}/>`);
  else if(b===3&&age>=34)add(`<path d="M18.4 ${my-5} Q18 ${my+9} 32 ${my+10} Q46 ${my+9} 45.6 ${my-5} Q42 ${my+3} 32 ${my+3} Q22 ${my+3} 18.4 ${my-5}Z" fill="${bc}" ${ol}/><path d="M28.6 ${my-.4} Q32 ${my+1.8} 35.4 ${my-.4}" stroke="#8a3a33" stroke-width="1.3" fill="none"/>`);
  else if(b===4&&age>=50)add(`<path d="M20 ${my-4} Q19 ${my+10} 32 ${my+14} Q45 ${my+10} 44 ${my-4} Q40 ${my+2} 32 ${my+2} Q24 ${my+2} 20 ${my-4}Z" fill="${old?'#ece9e2':bc}" ${ol}/><path d="M28.6 ${my-.2} Q32 ${my+1.8} 35.4 ${my-.2}" stroke="#8a3a33" stroke-width="1.3" fill="none"/>`);
 }
 const mk=P(h,15,10);
 if(mk===0)add(`<path d="M37 31 L41.6 37.6" stroke="#b86a60" stroke-width="1.2" stroke-linecap="round"/>`);
 else if(mk===1)add(`<circle cx="${f?'38.4':'26.6'}" cy="38.6" r="1" fill="#6a4030"/>`);
 else if(mk===2&&f)add(`<circle cx="39.6" cy="${my-.6}" r=".9" fill="#2b1f1a"/>`);
 else if(mk===3&&!kid)add(`<circle cx="24.4" cy="36.8" r=".7" fill="#a56a4a"/><circle cx="26.2" cy="38.2" r=".7" fill="#a56a4a"/><circle cx="39.6" cy="36.8" r=".7" fill="#a56a4a"/><circle cx="37.8" cy="38.2" r=".7" fill="#a56a4a"/>`);
 if(old)add(`<path d="M21.8 36.4 l2.6 .8 M42.2 36.4 l-2.6 .8 M24.6 ${by-1.6} h4.6" stroke="#8a6a55" stroke-width=".8" opacity=".6" stroke-linecap="round"/>`);
 const dead=c.dead!=null||c.left;
 return `<svg class="ava ava2" width="${size||40}" height="${size||40}" viewBox="0 0 64 64" aria-hidden="true" style="${dead?'filter:grayscale(1);opacity:.75':''}">${o}</svg>`;
}
window.AVA2={svg:F};
})();
