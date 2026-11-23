// node tools/addmeta.js : thêm metadata cho các sự kiện mới viết (ev-v67*.js) chưa có trong events-meta.js
// [domain, subdomain, trigger, độ hiếm, ai gặp, hoàn cảnh]
const fs=require('fs'),path=require('path');const dir=path.join(__dirname,'..');
const meta=fs.readFileSync(path.join(dir,'events-meta.js'),'utf8');
const have=new Set([...meta.matchAll(/"([A-Za-z0-9_]+)":\[/g)].map(m=>m[1]));
const files=fs.readdirSync(dir).filter(f=>/^(ev-v67.*|ev-cotran|ev-d912.*)\.js$/.test(f));
const BASE={tpha:['family','legacy'],qg:['government','official_peers'],tnh:['society','faith'],gh2:['jianghu','secret_manual'],hc:['society','land'],tdt:['economy','trade_guild'],dich:['life','illness'],ill:['life','illness'],kt:['family','succession'],cp:['military','campaign'],ky:['life','encounter'],kiem:['life','encounter'],hd:['education','academy'],bg:['society','acquaintance'],lut:['life','season'],hv:['dynasty','royal_house'],ho:['society','relations'],tie:['society','acquaintance'],rgx:['society','relations'],sm:['jianghu','master_school'],td:['family','romance'],tp:['jianghu','sect'],bn:['life','illness'],thu:['government','tax'],tl2:['society','spontaneous_forces'],bd:['story','treasure_map'],xom:['society','neighbors'],qx:['government','official_peers'],vuong:['dynasty','royal_house'],lh:['family','in_laws'],tk:['dynasty','royal_grant'],gh:['jianghu','martial_arts'],tq:['government','official_peers'],lh:['family','in_laws'],kinh:['government','capital'],lw:['society','law'],gj:['jianghu','wandering'],lo:['society','outlaw'],dh:['life','long_term'],kn:['encounter','rare'],tg:['life','world'],cd:['government','special_office'],
 pm:['story','arc'],bi:['military','border'],th:['economy','trade_guild'],kb:['education','academy'],gh:['jianghu','martial_arts'],ga:['family','legacy'],
 pv:['dynasty','regent_prince'],cc:['dynasty','warlord'],nt:['dynasty','consort_clan'],ps:['economy','ruin'],tn:['society','annexation'],lc:['life','chaos'],dn:['economy','projects'],dp:['life','land'],tl:['society','chaos'],tk:['dynasty','honor'],qh:['military','conscript'],cv:['life','encounter'],dx:['government','eunuch'],kn:['life','encounter'],gh:['society','jianghu'],pc:['dynasty','consort_clan'],qt5:['government','career']};
const add={};
for(const f of files){const t=fs.readFileSync(path.join(dir,f),'utf8');
  const re=/\bid:'([a-z0-9]+_[A-Za-z0-9_]+)'([^\n]{0,80}?)\bt:'([^']*)'([^\n]*)/g;let m;
  while((m=re.exec(t))){const id=m[1],rest=m[2]+m[4];if(have.has(id))continue;const pre=id.split('_')[0];if(!BASE[pre])continue;
    const ky=/\bky:1/.test(rest)||/KN\(/.test(t.slice(Math.max(0,m.index-6),m.index));
    const q=/job:\['quan'\]/.test(rest)||/QD\(/.test(t.slice(Math.max(0,m.index-6),m.index));
    let [d,s]=BASE[pre];if(q){d='government';s='official_duty'}
    const who=q?'official':/head:1/.test(rest)||/DH\(|GS\(/.test(t.slice(Math.max(0,m.index-6),m.index))?'head':'any';
    add[id]=[d,s,ky?'encounter':'random',ky?'rare':'common',who,'any']}}
const n=Object.keys(add).length;
if(n)fs.appendFileSync(path.join(dir,'events-meta.js'),'/* thêm tự động bởi tools/addmeta.js */\nObject.assign(window.EVMETA,'+JSON.stringify(add)+');\n');
console.log('thêm',n);
