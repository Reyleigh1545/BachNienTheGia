// Đo lãi chuyến đi buôn (d9.12, CLAUDE.md mục 11.E câu 1). Chạy: node tools/run.js "file:///.../admin.html?ui=old" tools/tradetest.js
// Với mỗi tuyến và mỗi mặt hàng có chênh giá, gọi tradeReturn ở chế độ probe 300 lần (không mở hộp) cho ba loại người đi: lái buôn thuê, người trung bình (EQ 60, trí 60, thông thạo 40), người giỏi (EQ 90, trí 90, thông thạo 80).
// In: tỉ số thu về/vốn trung bình, xác suất gặp nạn, và lãi ròng trung bình mỗi tháng đi đường. Chỉ đo, không đổi gì.
(async()=>{const G=BNTG,ad=G._adm,out=[];const S=()=>G.S();
const h=S().people.find(p=>p.id===S().head);
const rts=ad.tradeRoutes();const goods=Object.keys(G.GOODS||{});
const mkc=(eq,tri,m)=>{h.eq=eq;h.tri=tri;h.m=m;h.vo=60;h.fame=100;return h};
const N=300;
const rows=[];
for(let i=0;i<rts.length;i++){const r=rts[i];if(r.war)continue;
  let best=null;
  for(const g of goods){const sell=(r.sell&&r.sell[g])||1;if(sell<=1.02)continue;
    const cost=100*ad.tradePrice(g);if(!cost)continue;
    const res={};
    for(const who of ['thue','tb','gioi']){let sum=0,nan=0,loss=0;
      for(let k=0;k<N;k++){
        if(who==='tb')mkc(60,60,40);if(who==='gioi')mkc(90,90,80);
        const tr={until:0,route:i,r:JSON.parse(JSON.stringify(r)),sv:sell,good:g,qty:100,cost,cid:who==='thue'?null:h.id,hired:who==='thue',skill:who==='thue'?50:null};
        let o;try{o=ad.tradeProbe(h,tr)}catch(e){o=null}
        if(!o)continue;sum+=o.got/cost;if(Math.random()<o.risk)nan++;if(o.got<cost)loss++}
      res[who]={ratio:+(sum/N).toFixed(2),nan:+(nan/N).toFixed(2),loss:+(loss/N).toFixed(2)}}
    if(!best||res.tb.ratio>best.res.tb.ratio)best={g,res}}
  if(best)rows.push(`${r.n} (${r.mo} tháng, rủi ro ${Math.round(r.risk*100)}%) hàng tốt nhất ${best.g}: thuê ×${best.res.thue.ratio} · trung bình ×${best.res.tb.ratio} (nạn ${best.res.tb.nan}, lỗ ${best.res.tb.loss}) · giỏi ×${best.res.gioi.ratio} (nạn ${best.res.gioi.nan}); lãi/tháng trung bình ${((best.res.tb.ratio-1)*100/r.mo).toFixed(1)}%`)}
out.push('Tỉ số = tiền thu về / vốn (1.00 là hòa). Chưa trừ tiền nạn.');
return out.concat(rows).join('\n')})()
