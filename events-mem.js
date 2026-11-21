/* v6.7.0-d7: gắn ký ức vào sự kiện theo id (không sửa từng pack).
   led = ghi vào sổ sau khi người chơi chọn (lab: chỉ khi nhãn lựa chọn khớp); mem = điều kiện ký ức của người gặp sự kiện (need/not/fneed/fnot/gap, xem ledOk trong engine).
   Cặp đôi "ghi" và "đọc": việc tốt đã làm thì mới có người nhớ ơn; dạy học trò thì mới có học trò đỗ đạt; lật án oan thì mới có án được rửa. */
window.EVMEM=Object.assign(window.EVMEM||{},{
 /* ghi: đã dạy */
 su_hoc_tro_ngheo:{led:{k:'day_hoc',lab:/Dạy/}},
 qh_tro_gioi:{led:{k:'day_hoc',lab:/môn sinh|học bổng/i}},
 /* ghi: đã cứu giúp */
 n_kho_cuu_doi:{led:{k:'cuu',lab:/phát chẩn|giá rẻ/i}},
 tai_cuu_doi:{led:{k:'cuu',lab:/phát chẩn/i}},
 q_thien_tai:{led:{k:'cuu',lab:/Phát đủ/}},
 qn653_ky_cuu_khach:{led:{k:'cuu',lab:/cứu/}},
 /* ghi: đã lật án oan */
 qa_an_oan:{led:{k:'cuu_oan',lab:/Lật lại/}},
 /* đọc */
 kn_93:{mem:{need:['cuu']}},
 t_g_bao_an:{mem:{need:['cuu']}},
 kn_91:{mem:{need:['day_hoc']}},
 su_tro_do_dat:{mem:{need:['day_hoc']}},
 kn_95:{mem:{need:['cuu_oan']}},
 /* thêm ở đợt B */
 tq_xin_bao_lanh:{led:{k:'tien_cu',lab:/tiến cử/}},
 qn653_tien_cu:{led:{k:'tien_cu_nguoi',lab:/Tiến cử/}},
 qn_cuu_tuong:{led:{k:'cuu',lab:/cõng/}},
 su_mon_sinh_lam_quan:{mem:{need:['day_hoc']}},
 lw_70:{mem:{need:['an']}},
 lw_75:{mem:{need:['an']}},
 /* d9: thêm lô đọc ký ức (đã gặp, đã cưới, đã nhận con nuôi, đã cứu, đã gây oán) */
 ky_niem_cuoi:{mem:{need:['cuoi']}},
 d631_thu_nguoi_xua:{mem:{any:['cuu','day_hoc','gap']}},
 n633_hiep_no:{mem:{need:['cuu']}},
 lw_42:{mem:{need:['nhan_con']}},
 dh_50:{mem:{need:['gap']}},
 gj_63:{mem:{any:['hai','doi_thu','bi_hac']}},
 dh_59:{mem:{any:['cuu','hai']}},
 v6_xt_vo:{mem:{any:['hai','doi_thu']}},
 qt_tro_lai:{mem:{need:['chuc']}},
 /* d9.4: người cũ chỉ tìm đến khi đã từng có quan hệ (gặp, giúp hoặc dạy) */
 gap_lai_ban_cu:{mem:{any:['gap','cuu','day_hoc']}},
 c631_ban_cu_ghe:{mem:{any:['gap','cuu','day_hoc']}},
 n633_y_thaycu:{mem:{any:['gap','day_hoc']}},
 hn_nguoi_cu:{mem:{any:['gap','cuu','day_hoc','cuoi']}},
 /* d9.5: lô bộ nhớ (chủ dự án 21/11, "thêm bộ nhớ cho các sự kiện"): sự kiện "người cũ trở lại" chỉ ra khi đã từng có quan hệ; sự kiện giúp đỡ ghi sổ để sau có người nhớ ơn */
 su_tro_ngheo_bao_an:{mem:{need:['day_hoc']}},
 n633_su_do:{mem:{need:['day_hoc']}},
 v61_ban_tra_no:{mem:{any:['gap','cuu']}},
 v62_tro_ve:{mem:{any:['gap','cuu','day_hoc']}},
 d631_ban_hoc_lam_quan:{mem:{any:['gap','day_hoc']}},
 d631_dong_doi_cu:{mem:{any:['gap','cuu']}},
 rg_suy_cau_dua:{mem:{any:['gap','cuu','an']}},
 rg_lien_minh:{mem:{any:['oan','doi_thu']}},
 hk_truy_sat:{mem:{any:['oan','doi_thu','hai']}},
 jh_truy_sat:{mem:{any:['oan','doi_thu','hai']}},
 tl631_sua_so:{mem:{any:['cuu','an']}},
 c631_cuoi_hang_xom:{mem:{any:['gap']}},
 d631_nguoi_than_thuat_lac:{mem:{any:['gap','cuoi']}},
 v61_cho_vay_ban:{led:{k:'cuu',lab:/Cho vay/}},
 h_du_phatthuoc:{led:{k:'cuu',lab:/Phát|Cấp|Cho/}},
 n633_hr_gui:{led:{k:'cuu',lab:/Giúp|Nhận|Đưa/}},
 c631_day_chu_ban_dem:{led:{k:'day_hoc',lab:/Mở|Dạy|Nhận/}},
 d631_nguoi_bao_tro_hoc:{led:{k:'an',lab:/Nhận|Cảm tạ/}},
 w63_ho_gia_nan:{led:{k:'cuu',lab:/Giúp|Cho|Gửi|Mang/}}
});
