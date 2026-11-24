/* Bách Niên Thế Gia v6.7.10-d9.12 · TỰ GẮN NGƯỜI THẬT cho sự kiện có người vô danh (luật R1). SINH TỰ ĐỘNG bởi tools/r1gen.js, đừng sửa tay: sửa tools/r1gen.js rồi chạy lại.
   Với mỗi id trong danh sách R1: x() tạo một người thật (sổ người quen) từ câu mô tả trong lời kể và hiện thẻ chân dung; kết quả mỗi lựa chọn kèm đổi quan hệ theo nhãn lựa chọn và dòng Quan hệ. Sự kiện đã viết tay thì không còn trong danh sách khi chạy lại tools/r1gen.js. */
window.EVPATCH=window.EVPATCH||[];
window.EVPATCH.push(function(E,G){
 const R1=new Set(["c12_khuc_nhac","c15_nguoi_thu_ba","nb_d","tk_a","cv_dom_ngo","cv_thien_tai","cv_dau_gia","cv_truyen_thuyet","cv_phuc_bao","cv_boc_lot","cv_ket_minh_tin","cv_so_menh","lw_31","ky_gt_hom_bac","ky_gt_cay_dang","tuoc_ky_ngo","tinh_goa_bua","lnh_b","v62_cg_tri_b","v62_cg_vo_b","v62_cg_suc_a","w63_tin_xa","w631_su_hanh_cuoc","w631_thay_lang_rong","w631_nguoi_hat_rong","qn631_gac_kho","noi631_hoc_tho_cam","c631_van_bia_tong_tu","h_du_dongy","h_du_benhnhan","vil_b_thaylang","vil_b_tiec","vil_l_chung","vil_l_thuoc","vil_l_gp","vil_l_ankhan","vil_l_linh","vil_d_1","vil_d_2","n633_tn_trang","vil_bp_thaykien","vil_bn_nho","v64_dan_kien_quan_tren","v64_ho_hang_len_nho","v64_vo_tuan_bien","v64_vo_cam_y","qt2_loi_khuyen","qt3_thuong_nhan","qt_hac_ket_be","qt_cuu_than","qt_di_so","qt4_tu_sat_nguc","qt4_dong_minh_quay","qt4_than_vuong_nghi","ts_noi_phan","qn653_ban_no","wl_phu_ho","lw_16","lw_29","cd_01","cd_42","lo_04","lo_06","cd_43","lw_07","lw_08","lw_09","lw_11","lw_15","lw_38","lw_41","lw_43","lw_46","lw_54","lw_58","lw_59","lw_69","lw_72","lw_73","lw_75","lw_76","dn_22","kn_92","qt5_quy_nhan_tien_cu","gh_dai_hoi","qh_chuoc_so","dx_theo_doi","gh_bk_khinhcong","gh_moi_ket_giao","gj_03","gj_16","v6_choi_ga","v6_hang_gia","v6_qua_bieu","v6_don_tinh_xao","v6_mac_ca","v6_xt_nong","v6_xt_buon","v6_xt_nho","v6_xt_vo","vv_tri_tang_kinh","vv_suc_dao_si"]);
 const PH=/(Một (người|ông|bà|vị|cụ|lão|thầy|thương nhân|lái buôn|viên|kẻ|cô|chàng|anh|chị|đạo sĩ|nhà sư|tay|gã|bác)|người lạ)[^.,;:!?]{0,70}/;
 const UP=/(giúp|cho |mời|tiếp đón|tiếp|nhận lời|chữa|cứu|biếu|dạy|chia|đỡ|nhường|góp|hỏi thăm|chào|cảm ơn|trả lại|giữ lời|đưa|tặng|mua|trả giá|học|làm cùng|xin theo|kết giao|thân)/i;
 const DOWN=/(từ chối|đuổi|bỏ đi|mặc kệ|đóng cửa|không quan tâm|lảng tránh|làm lơ|bỏ qua|né|quay đi|không (mua|nhận|đi|giúp|cho|tin|cần|dám|theo|học)|ngại|sợ|thôi)/i;
 const HARD=/(vạch|báo quan|bắt|tố|kiện|đánh|hạ gục|xử|trục xuất)/i;
 const delta=function(l){l=String(l||'');if(HARD.test(l))return -22;if(DOWN.test(l))return -9;if(UP.test(l))return 12;return 2};
 const esc=function(s){return String(s).replace(/<[^>]*>/g,'')};
 E.forEach(function(e){if(!R1.has(e.id)||e.__r1)return;e.__r1=1;
  var x0=e.x;e.x=function(c,d){var t=typeof x0==='function'?x0.call(this,c,d):x0;d=d||{};
   try{if(!d.npc&&typeof t==='string'){var pl=esc(t).match(PH);var nghe=pl?pl[0].replace(/^Một /,'').replace(/^một /,'').trim():'người lạ trong chuyện';var n=G.tie.ensure(c,{key:'r1_'+e.id+'_'+(d.oid||c.id),vai:['quen'],nghe:nghe.charAt(0).toLowerCase()+nghe.slice(1),tier:Math.max(0,Math.min(6,G.tierIdx()+(Math.random()<0.5?-1:0))),rel:0,why:e.t||e.id});d.npc=n.id;d.r1=n.id}}catch(er){}
   return t};
  var o0=e.o;
  var wrapOpt=function(op,d){if(!op||typeof op!=='object')return op;var dl=delta(op.l);var nw=Object.assign({},op);
   ['f','y','yy','n','nn'].forEach(function(k){var f0=op[k];if(typeof f0!=='function')return;nw[k]=function(c,dd){var t=f0.apply(this,arguments);
    if(typeof t==='string'&&d&&d.r1){var n=G.tie.get(d.r1);if(n&&t.indexOf('Quan hệ với')<0){var sign=(k==='n'||k==='nn')?(dl>0?-0.4:0.3):1;var v=Math.round(dl*sign);
     /* d9.12.62: tính cách thật của NPC (engine-npc.js) quyết định mức đổi quan hệ và hậu sự: người thật thà, rộng lượng đáp lại nhiều; người nóng nảy giận nhiều */
     if(v&&n.sub&&G.npc){var fa=v>0?(0.7+(G.npc.ax(n,'rong')+G.npc.ax(n,'thanh'))/250):(0.7+(100-G.npc.ax(n,'diem'))/160);v=Math.round(v*fa)||v}
     if(v){try{var q=G.tie.rel(n,v,e.t||e.id);t+=G.fx(c,{qh:[n.n,v]})}catch(er){}}
     if(n.sub&&G.npc&&(k==='f'||k==='y'||k==='yy')){
      if(dl>=10){G.tie.on(n,2);if(Math.random()<G.npc.ax(n,'thanh')/220){try{G.tie.later(n,c,'tie_an_nhan_tra',24+Math.floor(Math.random()*48),{})}catch(er){}}else if(G.npc.ax(n,'thanh')<35&&Math.random()<0.3){G.tie.rel(n,-6,'vô ơn');t+=' Về sau mới biết người ấy vô ơn.'}}
      if(dl<=-20){G.tie.oan(n,G.npc.ax(n,'diem')<45?6:3)}}}}return t}});return nw};
  e.o=function(c,d){var arr=typeof o0==='function'?o0.call(this,c,d):o0;if(!Array.isArray(arr))return arr;return arr.map(function(op){return wrapOpt(op,d)})};
 });
 return E});
