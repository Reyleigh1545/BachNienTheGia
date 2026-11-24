/* Bách Niên Thế Gia · 7.0.0-d.1.5.4 · chữ Hán của họ (icon gia tộc của người chơi: chủ dự án 24/11 "icon gia tộc lấy bảng chữ cái trong tiếng Hán làm chủ").
   hanChars(họ) trả chữ Hán (một hoặc hai chữ cho họ kép); không có trong bảng thì dùng 家. hanMarkHtml(họ) dựng ruột ô ấn đỏ cạnh tên họ. */
(function(){
const H={'Nguyễn':'阮','Trần':'陳','Lê':'黎','Phạm':'范','Hoàng':'黃','Huỳnh':'黃','Vũ':'武','Võ':'武','Đặng':'鄧','Bùi':'裴','Đỗ':'杜','Hồ':'胡','Ngô':'吳','Dương':'楊','Lý':'李','Tô':'蘇','Mạc':'莫','Thẩm':'沈','Tạ':'謝','Lục':'陸','Kiều':'喬','Văn':'文','Quách':'郭','Triệu':'趙','Phó':'傅','Mai':'枚','Cố':'顧','Diệp':'葉','Hàn':'韓','Lam':'藍','Ôn':'溫','Sầm':'岑',
'Âu':'歐','Bạch':'白','Biện':'卞','Cao':'高','Chu':'朱','Châu':'周','Chung':'鍾','Đàm':'譚','Đào':'陶','Đinh':'丁','Đoàn':'段','Đồng':'童','Giang':'江','Hạ':'夏','Hầu':'侯','Hứa':'許','Khổng':'孔','Khúc':'曲','Kim':'金','La':'羅','Lạc':'駱','Lâm':'林','Liễu':'柳','Long':'龍','Lư':'盧','Lương':'梁','Lưu':'劉','Mã':'馬','Mạnh':'孟','Nghiêm':'嚴','Nhan':'顏','Ninh':'寧','Ông':'翁','Phan':'潘','Phí':'費','Phùng':'馮','Quan':'關','Quản':'管','Tân':'辛','Tào':'曹','Thái':'蔡','Thân':'申','Thôi':'崔','Tiêu':'蕭','Tôn':'孫','Tống':'宋','Trang':'莊','Trịnh':'鄭','Trình':'程','Trương':'張','Từ':'徐','Ứng':'應','Vạn':'萬','Vi':'韋','Viên':'袁','Vương':'王','Yên':'燕','Tần':'秦','Tiết':'薛','Hạng':'項',
'Âu Dương':'歐陽','Gia Cát':'諸葛','Tư Mã':'司馬','Thượng Quan':'上官','Công Tôn':'公孫','Nam Cung':'南宮','Hoàng Phủ':'皇甫','Uất Trì':'尉遲',
'Doãn':'尹','Lạc Long':'駱龍','Sở':'楚','Nguyên':'元','Đông Phương':'東方','Tây Môn':'西門','Hạ Hầu':'夏侯','Trưởng Tôn':'長孫','Lữ':'呂','Thạch':'石','Bành':'彭','Ân':'殷','Mộc':'木','Khương':'薑','Đường':'唐','Tiền':'錢','Tôn Thất':'尊室'};
window.HAN_SUR=H;
window.hanChars=function(sur){sur=String(sur||'').trim().replace(/\s+/g,' ');if(!sur)return '家';if(H[sur])return H[sur];const w=sur.split(' ');if(w.length>1){const two=w.slice(0,2).join(' ');if(H[two])return H[two];if(H[w[0]])return H[w[0]]}return '家'};
window.hanMarkHtml=function(sur){const c=Array.from(window.hanChars(sur));if(c.length<=1)return '<span class="han1">'+(c[0]||'家')+'</span>';return '<span class="han2">'+c.slice(0,2).map(x=>'<i>'+x+'</i>').join('')+'</span>'};
})();
