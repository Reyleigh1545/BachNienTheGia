/* node tools/mkav.js : dựng ảnh đại diện cho game từ ảnh gốc trong avatars/klein_test/bo (ảnh gốc 1024px, không đưa vào kho).
   Cắt bớt lề (giữ đủ cánh mũ quan), thu còn 192px, ghi av/<khuôn>/<kiểu>.webp và data-av.js liệt kê những kiểu đã có. Cần sharp trong node_modules. */
const fs=require('fs'),path=require('path');const sharp=require('sharp');
const GOC=path.join(__dirname,'..','avatars','klein_test','bo'),RA=path.join(__dirname,'..','av');
(async()=>{const bo=fs.readdirSync(GOC,{withFileTypes:true}).filter(d=>d.isDirectory()&&/^(nam|nu)_\d+$/.test(d.name)).map(d=>d.name).sort();const co={};let n=0,kb=0;
  /* d.1.5.62: khuôn riêng của nhân vật cốt truyện, đã chọn tấm ưng vào rieng/<tên>/goc.png (và gia.png) */
  const RG=path.join(GOC,'..','rieng');const rg=fs.existsSync(RG)?fs.readdirSync(RG).filter(d=>fs.existsSync(path.join(RG,d,'goc.png'))):[];
  for(const id of bo.concat(rg)){const dir=rg.includes(id)?path.join(RG,id):path.join(GOC,id);const files=fs.readdirSync(dir).filter(f=>rg.includes(id)?/^(goc|gia)\.png$/.test(f):f.endsWith('.png'));fs.mkdirSync(path.join(RA,id),{recursive:true});co[id]=[];
    for(const f of files){const src=path.join(dir,f);const m=await sharp(src).metadata();const c=Math.round(m.width*0.80),l=Math.round(m.width*0.10);
      const out=path.join(RA,id,f.replace(/\.png$/,'.webp'));await sharp(src).extract({left:l,top:0,width:c,height:Math.min(c,m.height)}).resize(192,192).webp({quality:80}).toFile(out);co[id].push(f.replace(/\.png$/,''));n++;kb+=fs.statSync(out).size/1024}}
  fs.writeFileSync(path.join(__dirname,'..','data-av.js'),'/* Dựng bởi tools/mkav.js, đừng sửa tay: các khuôn mặt và kiểu ảnh đang có trong av/ */\nwindow.BN_AVCO='+JSON.stringify(co)+';\n');
  console.log(`${bo.length} khuôn mặt, ${n} ảnh, ${Math.round(kb)} KB`)})();
