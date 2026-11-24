// Kiểm hộp hiển thị khi bot chơi dài (d9.12.63). Chạy: node tools/run.js "file:///.../admin.html" tools/popcheck.js  (thêm ?ui=old để kiểm giao diện cũ)
// Mỗi lần hiện hộp có băng người (.pbanner/.evband): (1) tên người nhà và NPC được nhắc trong lời kể mà không có thẻ; (2) số thẻ; (3) chữ tràn ra ngoài hộp; (4) thẻ bị chồng lên nhau; (5) hộp có trên 6 thẻ; (6) dòng "họ Phạm" hiện ở kết quả sự kiện nào, có dòng tác dụng đi kèm không.
(async()=>{const G=BNTG,ad=G._adm,A=BN_ADMIN,out=[];const S=()=>G.S();const sl=ms=>new Promise(r=>setTimeout(r,ms));const YEARS=window.__YEARS||60;A.marry=true;
const hd=S().people.find(p=>p.id===S().head);for(let i=0;i<4;i++){const k=ad.mkPerson({g:i%2?'nữ':'nam',surname:hd.surname,age:17+i,hh:hd.hh});k.parents=[hd.id];k.gen=(hd.gen||1)+1;S().people.push(k)}
const bad={miss:[],over:[],overlap:[],many:[]};const pham=[];let shown=0,withBand=0;const cnt={};const t0=Date.now();
const NL=String.fromCharCode(10);
const check=()=>{const m=document.querySelector('#modal');if(!m)return;const band=m.querySelector('.pbanner,.evband');shown++;if(!band)return;withBand++;
 const cards=[...band.querySelectorAll('.pcard,.evcard')];const names=cards.map(c=>(c.querySelector('b')||{}).textContent||'');cnt[cards.length]=(cnt[cards.length]||0)+1;
 const text=(m.querySelector('.evbody')||m).innerText||'';const title=(m.querySelector('h2')||{}).textContent||'';
 const miss=[];S().people.filter(p=>p.dead==null&&!p.left).forEach(p=>{if(p.given&&p.given.length>=3&&text.includes(p.given)&&!names.some(n=>n.includes(p.given)))miss.push(p.given)});
 if(S().np&&S().np.l)Object.values(S().np.l).forEach(n=>{if(n.n&&n.n.length>=6&&text.includes(n.n)&&!names.some(x=>x.includes(n.n)))miss.push(n.n)});
 if(miss.length&&bad.dbg==null)bad.dbg=[];if(miss.length&&bad.dbg.length<4)bad.dbg.push(title+' | the: '+names.join(', ')+' | thieu: '+miss.join(',')+' | np.keys='+JSON.stringify(Object.values((S().np||{l:{}}).l).filter(n=>text.includes(n.n)).map(n=>n.id+':'+n.n+':ok'+n.ok)));
 if(miss.length&&bad.miss.length<25)bad.miss.push(title+' ['+(((S().evl||[]).slice(-1)[0]||[])[3]||'?')+'] :: '+[...new Set(miss)].slice(0,3).join(','));
 const r=m.getBoundingClientRect();const ov=[...m.querySelectorAll('*')].filter(e=>{const b=e.getBoundingClientRect();return b.width>0&&e.scrollWidth>e.clientWidth+2&&getComputedStyle(e).overflowX==='visible'&&(b.right>r.right+2||b.left<r.left-2)});
 if(ov.length&&bad.over.length<15)bad.over.push(title+' :: '+ov.slice(0,2).map(e=>e.className||e.tagName).join(','));
 for(let i=0;i<cards.length;i++)for(let j=i+1;j<cards.length;j++){const a=cards[i].getBoundingClientRect(),b=cards[j].getBoundingClientRect();if(a.left<b.right-3&&b.left<a.right-3&&a.top<b.bottom-3&&b.top<a.bottom-3){if(bad.overlap.length<10)bad.overlap.push(title)}}
 if(cards.length>6&&bad.many.length<10)bad.many.push(title+' '+cards.length)};
const afterClick=ttl=>{try{const rt=document.querySelector('#modal .result');if(!rt)return;const tx=rt.innerText||'';if(!/họ Phạm/.test(tx))return;const lines=tx.split(NL).map(x=>x.trim()).filter(Boolean);const line=lines.find(x=>/họ Phạm/.test(x))||'';const fx=lines.find(x=>/^(Chứng cứ|Nhân chứng|Người sẵn lòng|Thế lực nhà|Dư luận|Họ Phạm để ý)/.test(x))||'không có dòng tác dụng';pham.push(ttl+' | '+line.slice(0,70)+' | '+fx)}catch(e){}};
const stepOnce=()=>{ad.advance();let g=0;while(S()&&(S().queue.length||ad.modalOpen())&&g++<10){if(!ad.modalOpen())ad.nextPopup();try{check()}catch(e){out.push('LOI check '+e.message)}const bs=[...document.querySelectorAll('#modal .choices button:not(:disabled), #modal [data-ok]')];const ttl=(document.querySelector('#modal h2')||{}).textContent||'';window.__last=ttl;if(bs.length){const pk=bs[Math.min(bs.length-1,Math.floor(Math.random()*bs.length))];window.__lastPick=(pk.textContent||'').trim().slice(0,40);pk.click();afterClick(ttl)}else{try{ad.closeModal()}catch(e){}}}};
let ended='';for(let i=0;i<YEARS*12;i++){if(!S()){ended='S=null (về menu) ở tháng '+i+' sau hộp "'+window.__last+'" chọn "'+window.__lastPick+'"';break}if(S().over){ended='over ở tháng '+i+' '+JSON.stringify(Object.keys(S()._mes||{}));break}stepOnce();if(i%12===0)await sl(0);if(Date.now()-t0>170000)break}
out.push('ket thuc: '+(ended||'het gio')+' ');out.push('nam '+(S()?Math.floor(S().t/12):'?')+' hop '+shown+' co bang '+withBand+' so the '+JSON.stringify(cnt));
out.push('THIEU THE ('+bad.miss.length+'): '+bad.miss.slice(0,12).join(' | '));
out.push('DBG: '+JSON.stringify(bad.dbg||[]));out.push('TRAN ('+bad.over.length+'): '+bad.over.join(' | '));
out.push('CHONG THE ('+bad.overlap.length+'): '+bad.overlap.join(' | '));
out.push('DONG HO PHAM ('+pham.length+'): '+pham.slice(0,16).join(' || '));
out.push('QUA 6 THE ('+bad.many.length+'): '+bad.many.join(' | '));
return out.join(NL)})()
