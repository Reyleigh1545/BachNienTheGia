// node tools/addmeta.js : thêm metadata cho các sự kiện mới viết (ev-v67*.js) chưa có trong events-meta.js
// [domain, subdomain, trigger, độ hiếm, ai gặp, hoàn cảnh]
const fs=require('fs'),path=require('path');const dir=path.join(__dirname,'..');
const meta=fs.readFileSync(path.join(dir,'events-meta.js'),'utf8');
const have=new Set([...meta.matchAll(/"([A-Za-z0-9_]+)":\[/g)].map(m=>m[1]));
const files=fs.readdirSync(dir).filter(f=>/^ev-v67.*\.js$/.test(f));
const BASE={lw:['society','law'],gj:['jianghu','wandering'],lo:['society','outlaw'],dh:['life','long_term'],kn:['encounter','rare'],tg:['life','world'],cd:['government','special_office'],
 pm:['story','arc'],bi:['military','border'],th:['economy','trade_guild'],kb:['education','academy'],gh:['jianghu','martial_arts'],ga:['family','legacy'],
 pv:['dynasty','regent_prince'],cc:['dynasty','warlord'],nt:['dynasty','consort_clan'],ps:['economy','ruin'],tn:['society','annexation'],lc:['life','chaos'],dn:['economy','projects']};
const add={};
for(const f of files){const t=fs.readFileSync(path.join(dir,f),'utf8');
  const re=/\bid:'([a-z]+_[A-Za-z0-9_]+)'([^\n]{0,80}?)\bt:'([^']*)'([^\n]*)/g;let m;
  while((m=re.exec(t))){const id=m[1],rest=m[2]+m[4];if(have.has(id))continue;const pre=id.split('_')[0];if(!BASE[pre])continue;
    const ky=/\bky:1/.test(rest)||/KN\(/.test(t.slice(Math.max(0,m.index-6),m.index));
    const q=/job:\['quan'\]/.test(rest)||/QD\(/.test(t.slice(Math.max(0,m.index-6),m.index));
    let [d,s]=BASE[pre];if(q){d='government';s='official_duty'}
    const who=q?'official':/head:1/.test(rest)||/DH\(|GS\(/.test(t.slice(Math.max(0,m.index-6),m.index))?'head':'any';
    add[id]=[d,s,ky?'encounter':'random',ky?'rare':'common',who,'any']}}
const n=Object.keys(add).length;
if(n)fs.appendFileSync(path.join(dir,'events-meta.js'),'/* thêm tự động bởi tools/addmeta.js */\nObject.assign(window.EVMETA,'+JSON.stringify(add)+');\n');
console.log('thêm',n);
