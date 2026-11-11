/* Dựng lại admin.html từ index.html (chạy ở thư mục gốc: node tools/make-admin.js). Sửa index.html xong thì chạy lại. */
const fs=require('fs');let s=fs.readFileSync('index.html','utf8');const crlf=s.includes('\r\n');s=s.replace(/\r\n/g,'\n');
const rep=(a,b)=>{if(s.split(a).length!==2)throw new Error('match '+a);s=s.replace(a,()=>b)};
rep('<title>Bách Niên Thế Gia</title>','<title>Bách Niên Thế Gia · Admin</title>');
{const a='<div class="verlbl" aria-hidden="true">';const i=s.indexOf(a);if(i<0)throw new Error('verlbl');const j=s.indexOf('</div>',i);s=s.slice(0,j)+' · admin'+s.slice(j)}
rep('<script src="engine.js"></script>','<script src="admin.js"></script>\n<script src="engine.js"></script>');
rep('</style>',`/* ===== bảng admin (chỉ có ở admin.html) ===== */
#adm{position:fixed;left:10px;bottom:10px;z-index:9999;font-size:13px;max-width:min(420px,calc(100vw - 20px))}
#adm .adtog{background:var(--purple);color:#fff;border:0;border-radius:6px;padding:7px 12px;font-weight:600;box-shadow:0 2px 8px #0004}
#adm .adpanel{margin-top:6px;background:var(--panel);color:var(--ink);border:1px solid var(--line);border-radius:8px;box-shadow:0 6px 24px #0005;padding:10px;max-height:min(72vh,640px);overflow:auto}
#adm nav,#adm .adseg{display:flex;flex-wrap:wrap;gap:4px}
#adm nav button,#adm .adseg button,#adm .adlist button{border:1px solid var(--line);background:transparent;border-radius:5px;padding:4px 9px}
#adm [aria-pressed="true"]{background:var(--purple);color:#fff;border-color:var(--purple)}
#adm h4{margin:12px 0 5px;font-size:13px}
#adm .admut{color:var(--muted);font-size:12px;margin:4px 0}
#adm .adgrid{display:grid;grid-template-columns:1fr 1fr;gap:4px 10px}
#adm .adf{display:flex;justify-content:space-between;align-items:center;gap:6px;margin:3px 0}
#adm .adf input{width:6.5em;font:inherit;padding:2px 4px;background:var(--paper);color:var(--ink);border:1px solid var(--line);border-radius:4px}
#adm .adq{width:100%;font:inherit;padding:5px;background:var(--paper);color:var(--ink);border:1px solid var(--line);border-radius:4px}
#adm .adlist>div{display:flex;align-items:center;gap:4px;padding:3px 0;border-bottom:1px dashed var(--line)}
#adm .adlist>div>span{flex:1;min-width:0}
#adm .adlist small{color:var(--muted)}
#adm .adrow{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:4px 0}
#adm .adnote{margin:8px 0 0;color:var(--purple);font-weight:600;white-space:pre-wrap}
#adm .adck{display:flex;gap:6px;align-items:center}
#adm .adsel{font:inherit;padding:4px;background:var(--paper);color:var(--ink);border:1px solid var(--line);border-radius:4px;max-width:48%}
#adm .adlist button.adlink{border:0;padding:0;text-align:left;background:transparent;color:var(--ink);text-decoration:underline dotted}
</style>`);
if(crlf)s=s.replace(/\n/g,'\r\n');fs.writeFileSync('admin.html',s);console.log('admin.html ok');
