// node tools/classify-fill.js <unclassified.json>  (d9.10)
// Điền domain, subdomain cho các sự kiện còn "unclassified" trong events-meta.js MÀ KHÔNG ĐÈ các phân loại đã có (khác classify.js, vốn dựng lại toàn bộ từ ev_feat.json, tệp này không còn).
// Tạo <unclassified.json> bằng cách chạy trong admin.html: JSON.stringify(BNTG._adm.EVENTS().filter(e=>e.meta&&e.meta.d==='unclassified').map(e=>[e.id,e.t,(e.job||[]).join(','),e.k||'']))
const fs=require('fs'),path=require('path');const list=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const KMAP={'Tiền riêng':['economy','private_money'],'Gia tộc':['family','clan_affairs'],'Họ hàng':['family','relatives'],'Danh vọng':['society','reputation'],'Gia phong':['family','family_rules'],'Việc nhà':['family','household'],'Tự học':['education','study'],'Gia giáo':['family','children'],'Học nghề':['economy','apprentice'],'Tự làm':['economy','self_employed'],'Thiên mệnh':['story','arc'],'Ân oán họ Phạm':['story','an_oan'],'Hoàng tộc':['dynasty','royal_court'],'Duyên cung đình':['family','romance']};
const PMAP=[[/^v6_tre_/,['family','children']],[/^v62_tre_/,['family','children']],[/^c631_/,['society','village']],[/^v6_/,['life','daily_life']],[/^v62_/,['family','household']],[/^v61_/,['economy','private_money']],[/^pm_|^tm_/,['story','arc']],[/^hv_|^pc_/,['dynasty','royal_court']]];
const KW=[[/cưới|hôn|mai/i,['family','marriage']],[/bệnh|thuốc|đau/i,['life','health']],[/tang|giỗ|chết/i,['life','funeral']],[/tiền|bạc|nợ|vay/i,['economy','private_money']],[/quan|huyện/i,['government','official_duty']]];
const file=path.join(__dirname,'..','events-meta.js');let t=fs.readFileSync(file,'utf8');let n=0;
for(const [id,title,job,k] of list){let d=KMAP[k];if(!d){for(const [re,x] of PMAP)if(re.test(id)){d=x;break}}if(!d){for(const [re,x] of KW)if(re.test(title)){d=x;break}}if(!d)continue;
  const from='"'+id+'":["unclassified","unclassified",';const i=t.indexOf(from);if(i<0)continue;t=t.slice(0,i)+'"'+id+'":["'+d[0]+'","'+d[1]+'",'+t.slice(i+from.length);n++}
fs.writeFileSync(file,t);console.log('da phan loai',n,'tren',list.length,'su kien con unclassified');
