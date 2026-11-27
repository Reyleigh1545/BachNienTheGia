/* Bách Niên Thế Gia v6.7.0-d9.5 · Giang hồ (bản đầu): môn phái từ hạt giống thế giới (S.wr.sects), cấp bậc của người nghề Hiệp khách,
   bí kíp, tỉ võ, bị truy sát, đại hội anh hùng. Cấp lưu ở c.flags.gh (0 chưa vào, 1 môn sinh, 2 đệ tử, 3 cao thủ, 4 minh chủ), phái ở c.flags.ghs.
   Lên minh chủ thì người ấy thành Võ lâm minh chủ (hiệp lv3) và S.gh.lord; đây là chặng cuối của đường Võ lâm chí tôn (T10). */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;const age=c=>G.age(c);
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const GJ=o=>Object.assign({tags:{},k:'Giang hồ',job:['hiep'],age:[16,70],pcd:60,cd:24,w:1.1,ms:1},o);
const rk=c=>(c.flags&&c.flags.gh)||0;
const sects=()=>(S().wr&&S().wr.sects)||[];
const sectOf=c=>{const id=c.flags&&c.flags.ghs;return sects().find(s=>s.id===id)||null};
const rival=c=>{const mine=c.flags&&c.flags.ghs;const o=sects().filter(s=>s.id!==mine);return o.length?pick(o):{n:'một môn phái lạ',al:'trung',boss:'một chưởng môn',pow:50}};
const AL={chinh:'chính phái',ta:'tà phái',trung:'phái trung lập'};
const lvUp=(c,to)=>{const d=to-(c.lv||0);return d>0?{lv:d}:{}};
const L=[
GJ({id:'gh_nhap_mon',t:'Nhập môn phái',c:c=>rk(c)===0&&sects().length>0&&!(c.flags.ghs),once:1,age:[16,45],
 x:c=>{const a=sects().filter(s=>s.al!=='ta'),b=sects().find(s=>s.al==='ta');return `${N(c)} lang bạt đã lâu, nay nghe nói ${a.length?esc(a[0].n)+(a[1]?' và '+esc(a[1].n):''):'vài môn phái'} đang thu nhận môn sinh${b?`, còn ${esc(b.n)} thì mời chào bằng cách riêng`:''}. Đi mãi một mình thì võ nghệ cũng chỉ đến thế.`},
 o:c=>{const ch=sects().filter(s=>s.al==='chinh'),tr=sects().filter(s=>s.al==='trung'),ta=sects().filter(s=>s.al==='ta');const out=[];
  if(ch.length){const s=ch[0];out.push({l:`Bái vào ${s.n}`,r:[{vo:1,eq:0.5},70],y:c=>{c.flags.gh=1;c.flags.ghs=s.id;return `${esc(s.n)} nhận ${N(c)} làm môn sinh. Danh môn chính phái, quy củ nghiêm, nhưng đường đi rõ ràng.`+fx(c,{vo:2,fame:4,tam:6})},n:c=>`Chưởng môn thử tay ba hiệp rồi lắc đầu. ${N(c)} ra về.`+fx(c,{tam:-5})})}
  if(tr.length){const s=tr[0];out.push({l:`Vào ${s.n}`,f:c=>{c.flags.gh=1;c.flags.ghs=s.id;return `${esc(s.n)} không hỏi nhiều, miễn có tay nghề. ${N(c)} thành môn sinh.`+fx(c,{vo:1,tam:4})}})}
  if(ta.length){const s=ta[0];out.push({l:`Theo ${s.n}`,f:c=>{c.flags.gh=1;c.flags.ghs=s.id;return `${esc(s.n)} dạy những chiêu hiểm, đổi lại đòi sự trung thành tuyệt đối. Tiếng tăm không đẹp.`+fx(c,{vo:3,fame:-6,liem:-4})}})}
  out.push({l:'Vẫn đi một mình',f:c=>{c.flags.ghs='none';return `${N(c)} thấy ràng buộc môn quy không hợp mình.`+fx(c,{tam:2})}});return out}}),
GJ({id:'gh_ti_vo',t:'Tỉ võ giữa hai phái',c:c=>rk(c)>=1&&rk(c)<3&&!!sectOf(c),
 x:c=>{const r=rival(c);return `${esc(r.n)}, ${AL[r.al]||'phái khác'}, thách ${esc(sectOf(c).n)} một trận tỉ võ ở chợ phiên. Chưởng môn đẩy ${N(c)} ra đài: thắng thì phái nở mày, thua thì mất mặt cả môn.`},
 o:c=>[{l:'Lên đài, dốc hết sức',r:[{vo:1.2,suc:0.3},58],y:c=>{c.flags.gh=Math.max(rk(c),2);return 'Ba mươi hiệp, thắng sát nút. Cả chợ vỗ tay.'+fx(c,{vo:3,fame:10,tam:8})},n:c=>'Thua một chiêu cuối, nằm dưỡng thương mấy tuần. Đồng môn không trách nhưng im lặng.'+fx(c,{suc:-8,tam:-8,fame:-3})},
  {l:'Xin chưởng môn đổi người',f:c=>{return 'Chưởng môn nhìn một lúc rồi gọi người khác. Từ đó ánh mắt đồng môn khác đi.'+fx(c,{tam:-6,fame:-2})}}]}),
GJ({id:'gh_bi_kip',t:'Một quyển bí kíp',c:c=>rk(c)===2&&c.lv>=1,age:[20,60],
 x:c=>`Một quyển bí kíp cũ lọt vào tay ${N(c)}, không rõ do ai để lại. Chiêu thức bên trong vừa lạ vừa mạnh, nhưng có đoạn phải luyện ngược khí, ai cũng bảo dễ hại thân.`,
 o:c=>[{l:'Luyện từng bước, bỏ đoạn hiểm',r:[{vo:1,tri:0.6},60],y:c=>{c.flags.gh=3;return 'Mất mấy năm, nhưng vững. Võ công thêm một tầng mới.'+fx(c,{vo:6,tam:6,fame:6})},n:c=>'Hiểu sai một đoạn, luyện hỏng một tháng.'+fx(c,{vo:1,suc:-6,tam:-4})},
  {l:'Luyện đủ cả đoạn hiểm',r:[{vo:1,suc:1},45],y:c=>{c.flags.gh=3;return 'Công lực tăng vọt, người ngoài nhìn vào cũng ngạc nhiên.'+fx(c,{vo:12,suc:-4,fame:8,tam:4})},n:c=>'Khí đi ngược kinh mạch, nôn ra máu. Phải nằm nhà hơn nửa năm.'+fx(c,{suc:-20,vo:-2,tam:-12})},
  {l:'Giao nộp cho chưởng môn',f:c=>{c.flags.gh=3;const s=sectOf(c);return `${s?esc(s.n):'Môn phái'} giữ quyển sách, thưởng ${N(c)} một phần tâm pháp. Ơn nghĩa ghi sổ.`+fx(c,{vo:4,fame:5,tam:2})}},
  {l:'Đốt đi cho khỏi họa',f:c=>'Tro bay hết trong gió. Người ta hay tin, thêm kính nể.'+fx(c,{fame:4,tam:-2})}]}),
GJ({id:'gh_truy_sat',t:'Bị truy sát',c:c=>rk(c)>=2&&rk(c)<4,age:[22,65],pcd:84,
 x:c=>{const r=rival(c);return `${esc(r.n)} vì một mối thù cũ cử người truy ${N(c)} suốt mấy tháng. Trên đường, trong quán trọ, đêm nào cũng có kẻ rình.`},
 o:c=>[{l:'Quay lại đánh một trận cho ra lẽ',r:[{vo:1.2,gan:0.5},52],y:c=>'Hạ gục hai kẻ cầm đầu, đám còn lại tan. Tiếng tăm vang đi.'+fx(c,{vo:3,fame:8,tam:3}),n:c=>'Đông quá, thoát được mạng nhưng bị thương nặng.'+fx(c,{suc:-14,tam:-8})},
  {l:'Nhờ sư môn che chở',f:c=>{const s=sectOf(c);return s?`${esc(s.n)} cử người hộ tống. Chuyện êm, nhưng nợ môn phái thêm một lần.`+fx(c,{tam:2,fame:-1}):'Không có sư môn nào đứng ra. Phải lẩn trốn.'+fx(c,{tam:-6})}},
  {l:'Rời đất này, lánh vài năm',f:c=>'Thay tên đổi họ đi nơi khác. Truy binh mất dấu.'+fx(c,{tam:-4,fame:-3})}]}),
GJ({id:'gh_dai_hoi',t:'Đại hội anh hùng',c:c=>rk(c)===3&&c.lv>=2&&age(c)>=28,once:1,pcd:200,
 x:c=>`Các môn phái trong thiên hạ hẹn nhau mở đại hội anh hùng ở một đỉnh núi lớn, chọn người đứng đầu võ lâm. ${N(c)} được nhiều người nhắc tên. Trên đài, từ chính phái đến tà phái đều có cao thủ, ai cũng chờ một người dám bước lên.`,
 o:c=>[{l:'Lên đài tranh ngôi minh chủ',r:[{vo:1.3,tri:0.4,eq:0.4},38],y:c=>{c.flags.gh=4;S().gh=S().gh||{};S().gh.lord=c.id;S().gh.t=S().t;return `Qua ba ngày, ${N(c)} đứng cuối cùng trên đài. Các phái cúi chào, ${N(c)} thành <b>Võ lâm minh chủ</b>.`+fx(c,Object.assign({fame:60,vo:4,tam:20},lvUp(c,3)))},n:c=>'Dừng chân ở vòng bán kết, nhưng tên tuổi đã lan khắp nơi.'+fx(c,{fame:12,suc:-6,tam:-6})},
  {l:'Chỉ đến xem, kết thân các phái',f:c=>'Không tranh ngôi, nhưng quen biết thêm nhiều người. Có người ngỏ lời mời về làm khách.'+fx(c,{fame:5,eq:1,tam:3})},
  {l:'Không dự',f:c=>'Đại hội diễn ra mà không có tên mình.'+fx(c,{tam:-3})}]}),
GJ({id:'gh_minh_chu_viec',t:'Việc của minh chủ',c:c=>rk(c)===4&&S().gh&&S().gh.lord===c.id,pcd:96,cd:60,
 x:c=>`Hai phái lớn kiện nhau lên minh chủ vì tranh một bến đò. Người ngoài đều biết, cách ${N(c)} phân xử sẽ quyết định ngôi minh chủ còn bao lâu nữa.`,
 o:c=>[{l:'Xử công bằng, chia đôi quyền lợi',r:[{eq:1,tri:0.6},62],y:c=>'Hai bên đều thấy mình thiệt một chút, nhưng đều phục.'+fx(c,{fame:12,eq:1,tam:5}),n:c=>'Phân xử xong mà cả hai cùng bất mãn.'+fx(c,{fame:-4,tam:-5})},
  {l:'Nghiêng về phái chính',f:c=>'Chính phái hả hê, tà phái ghi mối hận.'+fx(c,{fame:4,tam:2})},
  {l:'Từ chối, bảo họ tự thương lượng',f:c=>'Ngôi minh chủ bị người ta bắt đầu nói là hữu danh vô thực.'+fx(c,{fame:-8,tam:-4})}]})
];
return L});
