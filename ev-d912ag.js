/* Bách Niên Thế Gia v6.7.10-d9.12 · ARC.budget bản gọn (nhịp cốt truyện): đánh dấu `opener:1` cho các sự kiện mở đầu chuỗi (kể cả ngắn lẫn dài). Engine ghi mỗi bước chuỗi hoặc việc cố định vào S.pace; khi nhà đã có từ 3 bước chuỗi trong 12 tháng gần nhất thì trọng số của sự kiện mở đầu chuỗi mới nhân 0,25 (không chồng quá nhiều chuyện cùng lúc, đáp lại góp ý "tốc độ đi nhanh" và "sự kiện không phù hợp thời điểm"). Chuỗi đang chạy không bị chặn. */
window.EVPATCH=window.EVPATCH||[];
window.EVPATCH.push(function(E,G){
 const OPEN=new Set(['hc_lan_bo','tdt_mo_tuyen','hd_y_dinh','kt_so_sanh','tpha_y_dinh','td_gap','qg_dong_khoa','gh2_tin_don','tnh_chon_chu_te','dich_bung','lut_canh_bao','bg_1','kiem_1','ky_o_1','ky_lua_1','ky_tranh_1','cn_1','ky_hd_1','tn_chua_xuong_cap','cp_xuat_quan','sm_nhan_thay','hv_hoang_tu_san','hv_cong_chua_chua','pm_x_nguoi_bi_hai','ho_phan_xu','ho_ket_be','bd_tim_thay']);
 E.forEach(e=>{if(OPEN.has(e.id))e.opener=1});
 return E});
