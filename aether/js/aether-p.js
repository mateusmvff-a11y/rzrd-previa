/* Aether v55 — blocos entram na rolagem */
(function(){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const groups=[
    ['.a54-moment-head h2'],['.a54-exhibit-copy'],['.a54-other-possibilities article'],
    ['.a54-project-intro'],['.a54-project-grid>*'],['.a54-project-foot'],
    ['.investigation-heading'],['.direction-map'],['.approach-foot'],
    ['.a54-brand-strip>*'],
    ['.people-heading'],['.founders>*'],
    ['.conversation-head'],['.conversation-form'],['.conversation-questions>*']
  ];
  const els=[];
  groups.forEach(g=>{let i=0;g.forEach(sel=>document.querySelectorAll(sel).forEach(e=>{e.classList.add('rv');e.style.setProperty('--i',i++%6);els.push(e)}))});
  if(reduce||!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('in'));return}
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -10% 0px',threshold:.06});
  els.forEach(e=>io.observe(e));
  requestAnimationFrame(()=>els.forEach(e=>{const r=e.getBoundingClientRect();if(r.top<innerHeight*.92&&r.bottom>0)e.classList.add('in')}));
})();
