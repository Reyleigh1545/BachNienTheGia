// smoke run: node smoke.js <file:///...admin.html> <years>
const {spawn}=require('child_process');const url=process.argv[2],years=+process.argv[3]||20;
const prof=__dirname+'/../prof'+(process.env.PN||'');const port=9333;
const CHROME=process.env.CHROME||[ 'C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Google/Chrome/Application/chrome.exe','/Applications/Google Chrome.app/Contents/MacOS/Google Chrome','/usr/bin/google-chrome','/usr/bin/chromium' ].find(p=>require('fs').existsSync(p))||'chrome'; /* d9.10: đặt biến môi trường CHROME nếu Chrome ở nơi khác */
const ch=spawn(CHROME,['--headless=new','--disable-gpu','--no-first-run','--user-data-dir='+prof,'--remote-debugging-port='+port,'--allow-file-access-from-files','about:blank'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{let tabs;for(let i=0;i<40;i++){try{tabs=await (await fetch(`http://127.0.0.1:${port}/json`)).json();if(tabs.length)break}catch(e){}await sleep(250)}
 const t=tabs.find(x=>x.type==='page');const ws=new WebSocket(t.webSocketDebuggerUrl);let id=0;const wait={};const errs=[];
 ws.onmessage=m=>{const d=JSON.parse(m.data);if(d.id&&wait[d.id]){wait[d.id](d);delete wait[d.id]}
   if(d.method==='Runtime.exceptionThrown')errs.push('EXC '+(d.params.exceptionDetails.exception?.description||d.params.exceptionDetails.text).slice(0,300));
   if(d.method==='Runtime.consoleAPICalled'&&d.params.type==='error')errs.push('CONSOLE '+d.params.args.map(a=>a.value||a.description).join(' ').slice(0,300));
   if(d.method==='Log.entryAdded'&&d.params.entry.level==='error'&&!/fonts/.test(d.params.entry.url||''))errs.push('LOG '+d.params.entry.text.slice(0,200))};
 await new Promise(r=>ws.onopen=r);
 const send=(method,params={})=>new Promise(r=>{const i=++id;wait[i]=r;ws.send(JSON.stringify({id:i,method,params}))});
 const ev=async e=>{const r=await send('Runtime.evaluate',{expression:e,awaitPromise:true,returnByValue:true});if(r.result?.exceptionDetails)return 'THROW '+(r.result.exceptionDetails.exception?.description||r.result.exceptionDetails.text).slice(0,400);if(r.result?.result?.value===undefined)return 'RAW '+JSON.stringify(r).slice(0,600);return r.result.result.value};
 await send('Runtime.enable');await send('Log.enable');await send('Page.enable');
 await send('Page.navigate',{url});await sleep(2500);
 console.log('boot:',await ev(`(()=>{const b=document.querySelector('[data-m="new"]');if(b)b.click();return !!b})()`));
 await sleep(500);
 console.log('modal:',await ev(`(document.querySelector('#modal')||{}).innerText?.slice(0,200)`));console.log('setup:',await ev(`(()=>{let b=document.querySelector('#modal [data-go]');if(!b){const all=[...document.querySelectorAll('#modal .choices button, #modal [data-slot]')];const x=all.find(y=>/trống/i.test(y.innerText))||all[0];if(x)x.click();{const y=document.querySelector('#modal [data-y]');if(y)y.click()}b=document.querySelector('#modal [data-go]')}if(b)b.click();return !!b})()`));
 await sleep(800);
 console.log('state:',await ev(`(()=>{const S=BNTG.S();return S?('t='+S.t+' people='+S.people.length+' head='+S.head):'no S'})()`));
 console.log(await ev(require('fs').readFileSync(process.argv[3],'utf8')));
 console.log('errors:',errs.length);errs.slice(0,25).forEach(e=>console.log(' ',e));
 ws.close();ch.kill();process.exit(0)})().catch(e=>{console.error(e);ch.kill();process.exit(1)});
