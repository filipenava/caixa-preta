import {createCube} from './cube.js';
import {getContent,visibleLinks,esc,safeUrl,track} from './store.js';
const dialog=document.getElementById('destinations'),profile=getContent().profile,reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
document.documentElement.style.setProperty('--red',profile.accent);
let state='idle',progress=0,frame;
const smooth=t=>t*t*(3-2*t);
const cube=createCube(document.getElementById('cube'),{accent:profile.accent,cinematic:true,onOpen:open});
cube.setLogo?.(profile.logo);
function travel(target,done){cancelAnimationFrame(frame);const from=progress,start=performance.now(),duration=reduced?100:target?1500:1250;function step(now){const t=Math.min((now-start)/duration,1);progress=from+(target-from)*smooth(t);cube.setJourney?.(smooth(Math.max(0,(progress-.12)/.88)));document.body.style.setProperty('--journey',progress);if(t<1)frame=requestAnimationFrame(step);else done?.();}frame=requestAnimationFrame(step);}
function panelFrames(reverse=false){const frames=[{opacity:0,transform:'perspective(1100px) translateY(35px) rotateX(68deg) scale(.48)',borderColor:'#f32918',boxShadow:'0 0 70px #f3291840'},{opacity:1,transform:'perspective(1100px) translateY(0) rotateX(0deg) scale(1)',borderColor:'#48413a',boxShadow:'0 25px 120px #0009'}];return reverse?frames.reverse():frames;}
function open(){if(state!=='idle')return;renderDestinations();state='opening';document.body.classList.add('travelling');track('cube_open',{source:'entrance'});travel(1);setTimeout(()=>{if(state!=='opening')return;dialog.classList.remove('content-ready');dialog.showModal();dialog.animate(panelFrames(),{duration:reduced?100:850,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'}).finished.then(()=>{if(state==='opening'){state='open';dialog.classList.add('content-ready');}});},reduced?0:850);}
async function close(){if(state==='idle'||state==='closing')return;state='closing';dialog.classList.remove('content-ready');const animation=dialog.animate(panelFrames(true),{duration:reduced?100:650,easing:'cubic-bezier(.55,0,.8,.35)',fill:'both'});await animation.finished;dialog.close();window.scrollTo({top:0,behavior:'instant'});dialog.getAnimations().forEach(a=>a.cancel());cube.open(false);travel(0,()=>{state='idle';document.body.classList.remove('travelling');document.getElementById('cube').focus({preventScroll:true});});}
document.getElementById('open-box').onclick=()=>cube.open();
document.getElementById('close-box').onclick=close;
dialog.addEventListener('cancel',e=>{e.preventDefault();close();});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}});
function renderDestinations(){const links=visibleLinks(getContent()),nav=dialog.querySelector('nav');nav.innerHTML=links.map((l,i)=>{const image=/^data:image\/(png|jpeg|webp);base64,/.test(l.image||'')?l.image:safeUrl(l.image);return `<a href="${esc(safeUrl(l.url))}" target="_blank" rel="noopener noreferrer" class="destination${l.pinned?' featured':''}${image?' with-image':''}" data-id="${esc(l.id)}" data-category="${esc(l.category)}" style="--row:${Math.min(i,5)}">${image?`<img class="destination-image" src="${esc(image)}" alt="" loading="lazy">`:`<span class="destination-number">${String(i+1).padStart(2,'0')}</span>`}<div>${l.pinned?'<em class="destination-badge">EM DESTAQUE</em>':''}${esc(l.title)}<small>${esc(l.description||'')}</small></div><b>↗</b></a>`;}).join('');nav.scrollTop=0;nav.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>img.hidden=true));}
const landing=document.createElement('a');landing.className='landing-option';landing.href='lp.html';landing.textContent='VER COMO LANDING PAGE ↗';dialog.querySelector('nav').after(landing);
dialog.querySelector('nav').addEventListener('click',e=>{const a=e.target.closest('a[data-id]');if(a)track('link_click',{id:a.dataset.id,category:a.dataset.category,source:'cube'});});
landing.addEventListener('click',()=>track('lp_open',{destination:'lp.html'}));
renderDestinations();
addEventListener('storage',e=>{if(e.key==='cp.hub.content.v1')renderDestinations();});
document.getElementById('pause-cube').onclick=e=>{cube.setPaused(!cube.paused);e.currentTarget.textContent=cube.paused?'▷':'Ⅱ';e.currentTarget.setAttribute('aria-label',cube.paused?'Retomar rotação':'Pausar rotação');};
track('page_view',{source:'entrance'});window.__entrance={cube,get state(){return state;}};
