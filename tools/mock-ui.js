// Dựng ảnh mẫu giao diện mới (d9.7): chạy trong trang admin.html qua tools/shot-ui.js, dùng avatar và màu hiện tại của game. Gọi window.__mk.evt1(), evt2(), res(), pf1(), pf2(), pf3().
(()=>{
const G=BNTG,S=G.S(),ad=G._adm;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const alive=S.people.filter(p=>p.dead==null);
const head=S.people.find(p=>p.id===S.head);
const other=alive.find(p=>p.id!==head.id&&(p.id===head.spouse))||alive.find(p=>p.id!==head.id)||head;
const kid=alive.find(p=>p.id!==head.id&&p.id!==other.id)||other;
const nm=p=>G.nameOf(p);
const ag=p=>Math.floor((S.t-p.born)/12);
const jobName=p=>{try{return window.D.JOBS[p.job].n}catch(e){return ''}};
const inc=p=>{try{return ad.income(p)}catch(e){return 0}};
const fmt=v=>String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g,'.');
const css=`
.mk-ov{position:fixed;inset:0;background:color-mix(in srgb,var(--ink) 50%,transparent);display:grid;place-items:center;z-index:200;padding:16px}
.mk{width:720px;max-height:96%;background:var(--panel);border:1px solid var(--line);border-top:4px solid var(--seal);border-radius:10px;box-shadow:0 18px 50px rgba(0,0,0,.28);overflow:hidden;display:flex;flex-direction:column;font-family:var(--body)}
.mk-band{background:linear-gradient(180deg,var(--jade-soft),var(--panel));padding:18px 20px 14px;display:flex;justify-content:center;gap:14px;flex-wrap:wrap}
.mk-card{display:flex;align-items:center;gap:10px;background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:9px 14px 9px 10px;box-shadow:0 1px 3px rgba(0,0,0,.08);min-width:0}
.mk-card.solo{flex-direction:column;text-align:center;padding:12px 22px 10px;gap:4px}
.mk-card .av{position:relative;flex:none}
.mk-card .av .age{position:absolute;right:-6px;top:-4px;background:var(--panel);border:1px solid var(--line);border-radius:999px;font-size:11px;font-weight:700;padding:1px 6px}
.mk-card b.n{font-family:var(--display);font-size:17px;line-height:1.1;display:block}
.mk-card small{display:block;font-size:11.5px;color:var(--muted);margin-top:1px}
.mk-card .inc{display:inline-block;margin-top:4px;font-size:11.5px;font-weight:700;color:var(--good);background:var(--jade-soft);border-radius:999px;padding:1px 9px}
.mk-body{padding:14px 26px 6px;overflow-y:auto}
.mk-eb{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--gold);margin-bottom:6px}
.mk h2{font-family:var(--display);font-size:30px;line-height:1.05;margin:0 0 8px}
.mk p{margin:0 0 10px;line-height:1.5;font-size:14.5px;max-width:62ch}
.mk-ch{display:grid;gap:8px;padding:6px 26px 20px}
.mk-opt{display:flex;align-items:center;gap:12px;border:1px solid var(--line);background:var(--paper);border-radius:9px;padding:10px 14px;font:inherit;text-align:left;color:var(--ink)}
.mk-opt .no{flex:none;width:24px;height:24px;border-radius:50%;background:var(--jade-soft);color:var(--good);font-weight:700;font-size:12.5px;display:grid;place-items:center}
.mk-opt .l{flex:1;font-weight:600;font-size:14.5px}
.mk-opt .pr{font-size:12.5px;font-weight:700;color:var(--seal);white-space:nowrap}
.mk-opt:hover{border-color:var(--seal)}
.mk-res{margin:2px 26px 12px;padding:11px 14px;background:var(--jade-soft);border-radius:8px;font-size:14px;line-height:1.5}
.mk-fx{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px}
.mk-fx span{font-size:12px;font-weight:700;padding:1px 8px;border-radius:5px;border:1px solid currentColor}
.mk-fx .up{color:var(--good)}.mk-fx .dn{color:var(--bad)}
.mk-go{margin:0 26px 20px;background:var(--seal);color:var(--on-seal);border:0;border-radius:9px;padding:12px;font:inherit;font-weight:700;font-size:15px;text-align:center}
.mk-bars{display:grid;gap:6px;margin:4px 0 4px}
.mk-bar{display:grid;grid-template-columns:78px 1fr 36px;align-items:center;gap:10px;font-size:13px}
.mk-bar i{display:block;height:9px;border-radius:5px;background:var(--line);overflow:hidden}
.mk-bar i u{display:block;height:100%;border-radius:5px;background:var(--good)}
.mk-bar.sk i u{background:var(--mood)}
.mk-bar.hp i u{background:var(--bad)}
.mk-bar b{text-align:right}
.mk-tabs{display:flex;gap:6px;padding:0 26px 12px;flex-wrap:wrap}
.mk-tabs span{border:1px solid var(--line);background:var(--paper);border-radius:999px;padding:5px 14px;font-size:13px;font-weight:600;color:var(--muted)}
.mk-tabs span.on{background:var(--ink);color:var(--paper);border-color:var(--ink)}
.mk-pf{display:flex;gap:16px;align-items:center;padding:20px 26px 12px;background:linear-gradient(180deg,var(--jade-soft),var(--panel))}
.mk-pf h2{margin:0;font-size:30px}
.mk-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.mk-chip{font-size:12px;font-weight:600;border:1px solid var(--line);background:var(--panel);border-radius:999px;padding:2px 10px}
.mk-chip.gold{border-color:var(--gold);color:var(--gold)}
.mk-chip.good{border-color:var(--good);color:var(--good)}
.mk-tiles{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:12px 0 6px}
.mk-tile{border:1px solid var(--line);border-radius:9px;background:var(--paper);padding:9px 6px;text-align:center}
.mk-tile b{display:block;font-size:16px}
.mk-tile small{font-size:11.5px;color:var(--muted)}
.mk-sec{font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin:14px 0 6px}
.mk-people{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.mk-foot{display:flex;justify-content:flex-end;padding:8px 26px 18px}
.mk-foot span{border:1px solid var(--line);background:var(--paper);border-radius:8px;padding:7px 16px;font-weight:600;font-size:13.5px}
.mk-x{position:absolute;right:14px;top:10px;font-size:22px;color:var(--muted)}
`;
if(!document.getElementById('mkcss')){const s=document.createElement('style');s.id='mkcss';s.textContent=css;document.head.appendChild(s)}
const card=(p,solo)=>`<div class="mk-card ${solo?'solo':''}"><span class="av">${ad.avatarSVG(p,solo?72:56)}<span class="age">${ag(p)}</span></span><span><b class="n">${esc(nm(p))}</b><small>${p.id===head.id?'Gia chủ':'Người nhà'} · ${esc(jobName(p))||'Nhàn rỗi'}</small><span class="inc">+${fmt(Math.max(inc(p),177))} đồng/tháng</span></span></div>`;
const opts=(L)=>`<div class="mk-ch">${L.map((o,i)=>`<div class="mk-opt"><span class="no">${i+1}</span><span class="l">${esc(o[0])}</span>${o[1]?`<span class="pr">${esc(o[1])}</span>`:''}</div>`).join('')}</div>`;
const wrap=(inner)=>{let o=document.getElementById('mkov');if(o)o.remove();o=document.createElement('div');o.id='mkov';o.className='mk-ov';o.innerHTML=`<div class="mk" style="position:relative">${inner}</div>`;document.body.appendChild(o)};
window.__mk={
 evt1(){wrap(`<div class="mk-band">${card(head,true)}</div><div class="mk-body"><span class="mk-eb">Nghề nghiệp · Tháng ${(S.t%12)+1} năm ${Math.floor(S.t/12)+1}</span><h2>Chọn nghề kiếm sống</h2><p>${esc(head.given)} đã đến tuổi phải lo kế sinh nhai. Trong làng có mấy chỗ đang cần người: nhà thuốc đầu làng nhận học trò, lò gốm bên sông thiếu thợ, còn ruộng nhà thì vẫn đủ việc cho một người nữa.</p></div>${opts([['Theo ý '+head.given+': học trò nhà thuốc',''],['Vào lò gốm bên sông',''],['Ở nhà cày ruộng',''],['Xin vào làm cho nhà giàu trong làng','Nhận ngay 300 đồng']])}`)},
 evt2(){wrap(`<div class="mk-band">${card(other,false)}${card(head,false)}</div><div class="mk-body"><span class="mk-eb">Con nhỏ · Tháng ${(S.t%12)+1} năm ${Math.floor(S.t/12)+1}</span><h2>Lạc giữa hội chợ</h2><p>Hội chợ đông nghịt người. ${esc(kid.given)} buông tay người lớn chạy theo tiếng trống múa lân, đến khi quay lại đã không thấy ai quen.</p></div>${opts([['Cả nhà chia nhau đi tìm, treo thưởng','Thưởng 120 đồng'],['Báo quan nhờ lính tuần tìm giúp',''],['Chạy đi tìm một mình','']])}`)},
 res(){wrap(`<div class="mk-band">${card(other,false)}${card(head,false)}</div><div class="mk-body"><span class="mk-eb">Con nhỏ · Kết quả</span><h2>Lạc giữa hội chợ</h2></div><div class="mk-res">Cả nhà chia nhau đi tìm. Gần tối, lính tuần dắt ${esc(kid.given)} về, mặt lấm lem nhưng không sao. Hàng xóm kéo đến hỏi thăm, người nào cũng khen nhà biết đoàn kết.<div class="mk-fx"><span class="dn">Công quỹ −120 đồng</span><span class="up">Danh vọng +3</span><span class="up">Tâm trạng ${esc(head.given)} +4</span><span class="dn">Tâm trạng ${esc(kid.given)} −2</span></div></div><div class="mk-go">Tiếp tục</div>`)},
 pf1(){const b=(n,v,c)=>`<div class="mk-bar ${c||''}"><span>${n}</span><i><u style="width:${Math.min(100,v)}%"></u></i><b>${Math.round(v)}</b></div>`;
  wrap(`<span class="mk-x">×</span><div class="mk-pf">${ad.avatarSVG(head,84)}<div><h2>${esc(nm(head))}</h2><div class="mk-chips"><span class="mk-chip gold">Gia chủ</span><span class="mk-chip">${ag(head)} tuổi</span><span class="mk-chip">${esc(jobName(head))||'Nhàn rỗi'}</span><span class="mk-chip good">Thân thể cường tráng</span></div></div></div><div class="mk-tabs"><span class="on">Tổng quan</span><span>Tính cách và kỹ năng</span><span>Tâm tư</span><span>Việc và tiền</span><span>Gia đình</span></div><div class="mk-body"><div class="mk-bars">${b('Trí tuệ',head.tri)}${b('Võ lực',head.vo)}${b('Mị lực',head.mi)}${b('EQ',head.eq)}${b('Sức khỏe',head.suc,'hp')}${b('Tâm trạng',head.tam,'sk')}</div><div class="mk-tiles"><div class="mk-tile"><b>${esc(jobName(head))||'Nhàn rỗi'}</b><small>Nghề</small></div><div class="mk-tile"><b>+${fmt(Math.max(inc(head),177))}</b><small>Thu nhập tháng</small></div><div class="mk-tile"><b>${fmt(head.purse||0)}</b><small>Tiền riêng</small></div><div class="mk-tile"><b>Gia chủ</b><small>Vai trong nhà</small></div></div></div><div class="mk-foot"><span>Đóng</span></div>`)},
 pf2(){const sk=head.sk||{};const t=(n,v)=>`<div class="mk-tile"><b>${Math.round(v||0)}</b><small>${n}</small></div>`;
  wrap(`<span class="mk-x">×</span><div class="mk-pf">${ad.avatarSVG(head,84)}<div><h2>${esc(nm(head))}</h2><div class="mk-chips"><span class="mk-chip gold">Gia chủ</span><span class="mk-chip">${ag(head)} tuổi</span></div></div></div><div class="mk-tabs"><span>Tổng quan</span><span class="on">Tính cách và kỹ năng</span><span>Tâm tư</span><span>Việc và tiền</span><span>Gia đình</span></div><div class="mk-body"><div class="mk-sec">Tính cách</div><div class="mk-chips"><span class="mk-chip">Dựa dẫm</span><span class="mk-chip">Điềm tĩnh</span><span class="mk-chip">Kiên định</span><span class="mk-chip good">Sáng dạ</span></div><div class="mk-sec">Kỹ năng</div><div class="mk-tiles">${t('Cơ mưu',sk.muu)}${t('Khẩu tài',sk.khau)}${t('Quản trị',sk.ql)}${t('Kỹ nghệ',sk.ky)}</div><div class="mk-sec">Tiềm năng</div><p style="font-size:13.5px;color:var(--muted)">Trí tuệ khá, Võ lực thấp, Mị lực khá, EQ khá.</p></div><div class="mk-foot"><span>Đóng</span></div>`)},
 pf3(){const pc=p=>`<div class="mk-card" style="width:100%"><span class="av">${ad.avatarSVG(p,48)}</span><span><b class="n">${esc(nm(p))}</b><small>${p.id===head.spouse?'Vợ chồng':p.parents&&p.parents.includes(head.id)?'Con':'Người nhà'} · ${ag(p)} tuổi</small></span></div>`;
  wrap(`<span class="mk-x">×</span><div class="mk-pf">${ad.avatarSVG(head,84)}<div><h2>${esc(nm(head))}</h2><div class="mk-chips"><span class="mk-chip gold">Gia chủ</span><span class="mk-chip">${ag(head)} tuổi</span></div></div></div><div class="mk-tabs"><span>Tổng quan</span><span>Tính cách và kỹ năng</span><span>Tâm tư</span><span>Việc và tiền</span><span class="on">Gia đình</span></div><div class="mk-body"><div class="mk-sec">Vợ chồng và con cái</div><div class="mk-people">${alive.filter(p=>p.id!==head.id).slice(0,6).map(pc).join('')}</div></div><div class="mk-foot"><span>Đóng</span></div>`)},
 clear(){const o=document.getElementById('mkov');if(o)o.remove()}
};
return 'mock ready; people '+alive.length;
})()
