/* Instrumentos do Aether — as linhas do diagrama se desenham ao abrir cada instrumento */
(function(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const draw=panel=>{
    if(!panel||panel.hidden) return;
    const paths=[...panel.querySelectorAll('svg path, svg line, svg polyline')].filter(p=>{
      const cs=getComputedStyle(p);return cs.stroke&&cs.stroke!=='none'&&(cs.fill==='none'||cs.fill==='rgba(0, 0, 0, 0)')&&p.getBBox&&p.getBoundingClientRect().width+p.getBoundingClientRect().height>0});
    paths.forEach((p,i)=>{
      if(p.getAttribute('stroke-dasharray')||getComputedStyle(p).strokeDasharray!=='none'&&!p.classList.contains('ip-draw')) return; /* linhas tracejadas ficam como estão */
      p.setAttribute('pathLength','1');p.classList.remove('ip-draw');void p.getBoundingClientRect();
      p.style.setProperty('--dl',Math.min(i*.025,.8).toFixed(3)+'s');p.classList.add('ip-draw');
    });
  };
  const panels=[...document.querySelectorAll('.method-panel')];
  new MutationObserver(ms=>ms.forEach(m=>{if(m.target.classList.contains('method-panel')&&!m.target.hidden)draw(m.target)})).observe(document.body,{attributes:true,subtree:true,attributeFilter:['hidden']});
  const first=panels.find(p=>!p.hidden);if(first)requestAnimationFrame(()=>draw(first));
})();
