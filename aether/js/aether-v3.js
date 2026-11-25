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
