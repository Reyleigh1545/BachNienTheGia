// node classify.js <repoDir> -> ghi repo/events-meta.js và ../manifest-su-kien.csv
const fs=require('fs'),path=require('path');
const repo=process.argv[2];const F=JSON.parse(fs.readFileSync(path.join(__dirname,'..','ev_feat.json'),'utf8'));
/* nguồn file */
const src={};fs.readdirSync(repo).filter(f=>/^ev-.*\.js$/.test(f)).forEach(f=>{const t=fs.readFileSync(path.join(repo,f),'utf8');
  for(const m of t.matchAll(/\bid\s*:\s*['"]([A-Za-z0-9_]+)['"]/g)){if(!src[m[1]])src[m[1]]=f}});
const KMAP={'Quan trường':['government','official_duty'],'Ân oán':['story','an_oan'],'Danh hiệu':['encounter','divine_title'],'Việc nghề':['economy','routine'],
 'Cốt truyện':['story','arc'],'Mở đầu cốt truyện':['story','arc'],'Họ khác':['society','clan_relations'],'Quân ngũ':['military','barracks'],'Kỳ ngộ quân ngũ':['encounter','martial'],
 'Mưu đại sự':['dynasty','usurpation'],'Thế gia':['society','four_great_clans'],'Con trẻ':['family','children'],'Con nhỏ':['family','children'],'Tình duyên':['family','romance'],
 'Gia đình':['family','household'],'Việc phụ':['economy','services'],'Thông gia':['family','in_laws'],'Thiên tai':['life','disaster'],'Cảnh giới':['encounter','breakthrough'],
 'Chi họ':['family','branch_clan'],'Xuất thân':['life','childhood'],'Danh gia':['society','local_elite'],'Hôn nhân':['family','marriage'],'Thời thế':['dynasty','court_climate'],
 'Tranh ngôi':['dynasty','succession'],'Chiến sự':['military','local_war'],'Binh lửa':['military','local_war'],'Gia sự':['family','household'],'Tin từ xa':['life','local_news'],
 'Gia pháp':['family','family_rules'],'Hộ ở riêng':['family','household'],'Tật xấu':['life','health'],'Dệt thêu':['economy','crafts'],'Bà đỡ':['family','pregnancy_birth'],
 'Bếp núc':['economy','services'],'Địa lý':['life','daily_life'],'Kinh doanh':['economy','business'],'Triều đình':['dynasty','court_climate'],'Ngọc bội':['encounter','treasure'],
 'Con nuôi':['family','children'],'Ruộng đất':['economy','land'],'Tàng bảo đồ':['story','arc'],'Thân thế':['story','arc'],'Lạc Nhạn':['story','arc'],'Môn sinh':['education','scholar_reputation'],'Khoa cử':['education','degree'],'Mang thai':['family','pregnancy_birth'],'Dịch bệnh':['life','disaster'],'Kỳ ngộ':['encounter','ordinary'],'Kỳ ngộ hiếm':['encounter','rare']};
const JMAP={nong:['economy','agriculture'],ngu:['economy','agriculture'],chan:['economy','agriculture'],tho:['economy','crafts'],det:['economy','crafts'],mo:['economy','crafts'],nghe:['economy','crafts'],
 y:['economy','medicine'],nguy:['economy','medicine'],su:['economy','education_work'],tieu:['economy','commerce'],tieunhi:['economy','commerce'],tieuphu:['economy','commerce'],hangrong:['economy','commerce'],
 khuanvac:['economy','services'],hau:['economy','services'],bep:['economy','services'],noi:['family','household'],nhadich:['economy','services'],thulai:['government','official_duty'],diaky:['society','village'],
 chu:['economy','business'],quan:['government','official_duty'],quan_ngu:['military','barracks'],hiep:['jianghu','wandering']};
const PMAP=[[/^ts_/,['dynasty','usurpation']],[/^tc_/,['dynasty','succession']],[/^tt_/,['dynasty','emperor']],[/^qt4_/,['dynasty','purge']],[/^qt/,['government','investigation']],
 [/^vil/,['society','village']],[/^w63|^w631/,['society','clan_relations']],[/^rd_|^tinh/,['family','romance']],[/^br_/,['family','branch_clan']],[/^lq_/,['family','household']],[/^rg/,['society','clan_relations']],
 [/^xg/,['family','marriage']],[/^hn/,['family','marriage']],[/^tre/,['family','children']],[/^nuoi/,['family','children']],[/^jh|^hg/,['jianghu','wandering']],[/^tai/,['life','disaster']],
 [/^qn/,['military','barracks']],[/^hau/,['government','entry']],[/^nong/,['economy','agriculture']],[/^y_/,['economy','medicine']],[/^gd|^gc/,['family','household']],[/^kv/,['life','local_news']],[/^ct|^c9/,['story','arc']]];
const KW=[[/ruộng|điền|đất/i,['economy','land']],[/cưới|hỏi|mai mối|hôn/i,['family','marriage']],[/thi |khoa|học|thầy|đồ /i,['education','study']],[/bệnh|thuốc|ốm/i,['life','health']],
 [/giặc|chiến|quân|binh/i,['military','local_war']],[/vua|hoàng|triều/i,['dynasty','court_climate']],[/quan |huyện|tri /i,['government','official_duty']],[/võ|kiếm|môn phái/i,['jianghu','martial_arts']],
 [/lễ|tết|hội|chùa|miếu/i,['life','festival']],[/mua|bán|buôn|hàng|chợ/i,['economy','commerce']],[/con |trẻ|bé/i,['family','children']],[/hàng xóm|làng|láng giềng/i,['society','neighbors']]];
const IDM=[[/^(ho_lao|gay_chan|trung_gio|mat_mo|dau_lung|dau_mua|cho_dai|ran_can|kiet_ly|muoi_dot|cuu_chim|lam_quan_tai)$/,['life','health']],[/^(ret_dam|nang_han|lu_lut|doi_kem|chay_nha|mua_gat|thu_buon|trom_cuoi_nam)$/,['life','season']],[/^(xin_chu_dau_nam|thanh_minh|trung_thu|chu_te_dinh|yen_tiec_huyen|thuong_ngoan|dan_ca)$/,['life','festival']],[/^(ru_co_bac|cai_bac|ru_ruou|cai_ruou|thanh_lau|xa_hoa_canh_tinh|v6_ru_ruou_tre|v6_choi_ga|v6_bac_thang|v6_tu_cai|tu_thien|an_chay|u_uat|het_u_uat|hung_khoi|ganh_ti|gap_lai_ban_cu|gioi_thieu_viec|mua_nha_bon)$/,['life','daily_life']],[/^(cai_nhau|me_chong|ghen_tuong|v6_vo_khoc|sinh_nhat_vo_chong|gia_huan)$/,['family','spouse']],[/^thieu_nien/,['family','children']],[/^(vay_nang_lai|tra_no_lai)$/,['economy','household_finance']],[/^(gia_nhan_trom|nguoi_xin_lam|nm_tuyen_nguoi|lam_thue_nha_giau)$/,['economy','employees']],[/^sauthi$/,['education','degree']]];
function dom(e){
  for(const [re,d] of IDM)if(re.test(e.id))return [...d,'id'];
  if(KMAP[e.k])return [...KMAP[e.k],'k'];
  for(const [re,d] of PMAP)if(re.test(e.id))return [...d,'id'];
  if(e.job){const j=e.job[0].replace(/^biz:.*/,'chu');if(JMAP[j])return [...JMAP[j],'job'];}
  for(const [re,d] of KW)if(re.test(e.t))return [...d,'kw'];
  return ['unclassified','unclassified','none']}
const rows=[];const META={};
F.forEach(e=>{
  let [d,s,how]=dom(e);
  if(e.ky&&d!=='encounter'){s=({economy:'profession',military:'martial',jianghu:'martial',education:'intellect',life:'health'})[d]||'ordinary';d='encounter';how='ky'}
  if(e.ky&&d==='encounter'&&(s==='ordinary'||s==='rare')){const kw=[[/võ|kiếm|đao|quyền|bí kíp/i,'martial'],[/thuốc|y |bệnh|dưỡng/i,'health'],[/sách|học|thi|văn|chữ/i,'intellect'],[/vàng|bạc|tiền|của|châu báu|kho/i,'wealth'],[/bảo|ngọc|cổ vật|kiếm quý|bội/i,'treasure'],[/quý nhân|cao nhân|thầy|tiên|ông lão|lão/i,'mentor'],[/duyên|tình|nhan sắc|đẹp/i,'charm']];
    for(const [re,sd] of kw)if(re.test(e.t)){s=sd;break}}
  const trig=e.arc?'arc':e.fixed?'fixed':e.ky?'encounter':'random';
  let rar='common';
  if(trig==='fixed'||trig==='arc')rar='na';
  else if(e.k==='Kỳ ngộ hiếm'||(e.ky&&((e.pcd||0)>=240||(e.w!=null&&e.w<=0.4))))rar='very_rare';
  else if(e.ky)rar='rare';
  else if(e.once)rar='unique';
  else if(e.w!=null&&e.w<0.6)rar='uncommon';
  let who='any';
  if(e.job&&e.job.includes('quan_ngu'))who='army';else if(e.job&&e.job.includes('quan'))who='official';else if(e.baby||/Con trẻ|Con nhỏ/.test(e.k)||(e.age&&e.age[1]!=null&&e.age[1]<16))who='child';else if(e.head)who='head';else if(e.job)who='trade';
  let sit='any';
  if(/Chiến sự|Binh lửa/.test(e.k)||/^w63_(chien|binh)/.test(e.id))sit='war';else if(/Thiên tai/.test(e.k))sit='disaster';else if(/Thời thế|Tranh ngôi/.test(e.k))sit='court';
  const conf=how==='k'||how==='id'||how==='job'?'cao':how==='ky'?'vừa':how==='kw'?'thấp':'không';
  META[e.id]=[d,s,trig,rar,who,sit];
  rows.push([e.id,src[e.id]||'(sinh bằng mã)',(e.t||'').replace(/[",\n]/g,' '),e.k,trig,d,s,rar,who,sit,e.job?e.job.join('|'):'',how,conf,e.w==null?'':e.w,e.cd==null?'':e.cd]);
});
const hdr='id,tệp,tiêu đề,nhãn k,trigger,domain,subdomain,độ hiếm,ai gặp,hoàn cảnh,nghề,căn cứ,độ tin,w,cd';
fs.writeFileSync(path.join(__dirname,'..','manifest-su-kien.csv'),'﻿'+hdr+'\n'+rows.map(r=>r.map(x=>/[",]/.test(String(x))?'"'+String(x).replace(/"/g,'""')+'"':x).join(',')).join('\n'));
fs.writeFileSync(path.join(repo,'events-meta.js'),'/* v6.5.4: metadata kho sự kiện, sinh bởi tools/classify.js. [domain, subdomain, trigger, độ hiếm, ai gặp, hoàn cảnh] theo id. Chỉ để lọc, thống kê và hiển thị ở trang admin; không đổi cách game chọn sự kiện. */\nwindow.EVMETA='+JSON.stringify(META)+';\n');
const cnt={};rows.forEach(r=>cnt[r[5]]=(cnt[r[5]]||0)+1);console.log(cnt);
console.log('unclassified',rows.filter(r=>r[5]==='unclassified').length,'/',rows.length);
const cc={};rows.forEach(r=>cc[r[12]]=(cc[r[12]]||0)+1);console.log(cc);
const nf=rows.filter(r=>r[1]==='(sinh bằng mã)').length;console.log('không tìm thấy tệp',nf);
