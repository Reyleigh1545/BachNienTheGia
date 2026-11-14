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
 kn_95:{mem:{need:['cuu_oan']}}
});
