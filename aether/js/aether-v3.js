/* Aether — camada 3: barra de status nos iPads e entrada dos blocos na rolagem */
(function(){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* barra de status de iPad em cada tela (decorativa) */
  const status='<div class="ax-status" aria-hidden="true"><span>9:41</span><i><svg width="16" height="11" viewBox="0 0 16 11"><path d="M8 2.2c2.3 0 4.4.9 6 2.4l1-1C13.1 1.8 10.7.8 8 .8S2.9 1.8 1 3.6l1 1C3.6 3.1 5.7 2.2 8 2.2Zm0 3c1.5 0 2.9.6 3.9 1.6l1-1C11.6 4.5 9.9 3.8 8 3.8s-3.6.7-4.9 2l1 1C5.1 5.8 6.5 5.2 8 5.2Zm0 3c-.7 0-1.3.3-1.8.7L8 10.7l1.8-1.8c-.5-.4-1.1-.7-1.8-.7Z" fill="currentColor"/></svg><svg width="25" height="12" viewBox="0 0 25 12"><rect x=".5" y=".5" width="21" height="11" rx="3" fill="none" stroke="currentColor" opacity=".45"/><rect x="2" y="2" width="16" height="8" rx="1.6" fill="currentColor"/><rect x="22.6" y="4" width="1.6" height="4" rx=".8" fill="currentColor" opacity=".45"/></svg></i></div>';
  document.querySelectorAll('.ipad-screen').forEach(s=>s.insertAdjacentHTML('afterbegin',status));

  /* blocos que entram na rolagem; filhos de um mesmo grupo entram em sequência */
  const groups=[
    ['.section-head'],
    ['.decisions .decision'],['.decisions .premise'],['.decisions .business-examples article'],
    ['.method .method-tabs'],
    ['.v35case-teaser-image','.v35case-teaser-copy','.v35case-open'],
    ['.delivery-list li'],['.delivery-composition>.ipad'],['.adaptive-note'],['.revision-strip>div:first-child','.revision-questions>*'],
    ['.v35-person'],['.faq'],
    ['.contact-grid>div','.contact-form']
  ];
  const els=[];
  groups.forEach(sel=>{
    let i=0;
    sel.forEach(s=>document.querySelectorAll(s).forEach(e=>{if(e.closest('dialog'))return;e.classList.add('rv');e.style.setProperty('--i',i++%6);els.push(e)}));
  });
  if(reduce||!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('in'));return}
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -12% 0px',threshold:.08});
  els.forEach(e=>io.observe(e));
  /* segurança: quem já está na tela ao carregar entra de imediato */
  requestAnimationFrame(()=>els.forEach(e=>{const r=e.getBoundingClientRect();if(r.top<innerHeight*.9&&r.bottom>0)e.classList.add('in')}));
})();

/* INNAP: as aplicações do projeto passam dentro da moldura */
(function(){
  const box=document.querySelector('.innap-slides');
  if(!box) return;
  const imgs=[...box.querySelectorAll('img')];
  const dots=box.querySelector('.innap-dots');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DUR=4200;
  dots.innerHTML=imgs.map((_,i)=>`<button type="button" aria-label="Imagem ${i+1}"><i></i></button>`).join('');
  dots.removeAttribute('aria-hidden');
  const bs=[...dots.children];
  let cur=0,timer=null,visible=false,paused=false;
  const show=n=>{cur=(n+imgs.length)%imgs.length;imgs.forEach((im,i)=>im.classList.toggle('on',i===cur));bs.forEach((b,i)=>{b.classList.toggle('done',i<cur);b.classList.remove('on');void b.offsetWidth;if(i===cur)b.classList.add('on')})};
  const run=()=>{clearTimeout(timer);if(reduce||!visible||paused)return;timer=setTimeout(()=>{show(cur+1);run()},DUR)};
  bs.forEach((b,i)=>b.addEventListener('click',()=>{show(i);run()}));
  box.addEventListener('pointerenter',()=>{paused=true;clearTimeout(timer)});
  box.addEventListener('pointerleave',()=>{paused=false;run()});
  box.style.setProperty('--dur',DUR+'ms');
  new IntersectionObserver(es=>es.forEach(e=>{visible=e.isIntersecting;run()}),{threshold:.3}).observe(box);
  show(0);
})();

/* Método: abas e texto da leitura ao lado do iPad, sem subir e descer para trocar */
(function(){
  const tabs=document.querySelector('.method .method-tabs');
  if(!tabs) return;
  const panels=[...document.querySelectorAll('.method .method-panel')];
  const stage=document.createElement('div');stage.className='mx-stage';
  const copies=document.createElement('div');copies.className='mx-copies';
  const screens=document.createElement('div');screens.className='mx-screens';
  tabs.before(stage);
  panels.forEach(p=>{const intro=p.firstElementChild;intro.classList.add('mx-copy');intro.dataset.for=p.id;intro.hidden=p.hidden;copies.appendChild(intro);screens.appendChild(p)});
  const rail=document.createElement('div');rail.className='mx-rail';rail.append(tabs,copies);
  stage.append(rail,screens);
  const hdr=document.querySelector('.header');
  const setH=()=>{stage.style.setProperty('--tabs-h',tabs.offsetHeight+'px');if(hdr)document.documentElement.style.setProperty('--hdr',hdr.offsetHeight+'px')};
  setH();addEventListener('resize',setH);
  const sync=()=>panels.forEach(p=>{const c=copies.querySelector(`[data-for="${p.id}"]`);if(c&&c.hidden!==p.hidden){c.hidden=p.hidden;if(!p.hidden){c.classList.remove('mx-in');void c.offsetWidth;c.classList.add('mx-in')}}});
  new MutationObserver(sync).observe(screens,{attributes:true,subtree:true,attributeFilter:['hidden']});
  /* no celular, a barra de leituras rola até a ativa */
  const center=()=>{const b=tabs.querySelector('[aria-selected="true"]');if(b&&tabs.scrollWidth>tabs.clientWidth)tabs.scrollTo({left:b.offsetLeft-(tabs.clientWidth-b.offsetWidth)/2,behavior:'smooth'})};
  new MutationObserver(center).observe(tabs,{attributes:true,subtree:true,attributeFilter:['aria-selected']});
  /* ao trocar de leitura com a tela já rolada para baixo, volta ao começo do iPad */
  tabs.addEventListener('click',e=>{if(!e.target.closest('button'))return;requestAnimationFrame(()=>{const r=screens.getBoundingClientRect();const top=parseFloat(getComputedStyle(tabs).top)||0;const off=innerWidth<1181?top+tabs.offsetHeight+16:110;if(r.top<off-4||r.top>innerHeight*.6)scrollTo({top:scrollY+r.top-off,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})})});
})();
