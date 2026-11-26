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

/* A peça: 3D com o mouse, luz e paralaxe */
(function(){
  const ex=document.querySelector('.a54-exhibit');
  if(!ex) return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce) return;
  const fine=matchMedia('(hover: hover) and (pointer: fine)').matches;
  let tx=0,ty=0,mx=0,my=0,on=false,raf=0;
  const io=new IntersectionObserver(es=>es.forEach(e=>{on=e.isIntersecting;if(on){ex.classList.add('p-in');setTimeout(()=>ex.classList.add('p-live'),1600);loop()}}),{threshold:.12});
  io.observe(ex);
  if(fine){ex.addEventListener('pointermove',e=>{const r=ex.getBoundingClientRect();tx=(e.clientX-r.left)/r.width-.5;ty=(e.clientY-r.top)/r.height-.5});ex.addEventListener('pointerleave',()=>{tx=ty=0})}
  const t0=performance.now();
  function loop(){
    cancelAnimationFrame(raf);
    const step=now=>{
      if(!on) return;
      const t=(now-t0)/1000;
      const ix=fine?tx:.18*Math.sin(t*.35),iy=fine?ty:.14*Math.cos(t*.28);
      mx+=(ix-mx)*.06;my+=(iy-my)*.06;
      const r=ex.getBoundingClientRect(),k=(r.top+r.height/2-innerHeight/2)/innerHeight;
      ex.style.setProperty('--ry',(mx*7).toFixed(2)+'deg');
      ex.style.setProperty('--rx',(-my*5).toFixed(2)+'deg');
      ex.style.setProperty('--py',(k*-46).toFixed(1)+'px');
      ex.style.setProperty('--lx',(62+mx*40).toFixed(1)+'%');
      ex.style.setProperty('--ly',(38+my*40).toFixed(1)+'%');
      raf=requestAnimationFrame(step);
    };
    raf=requestAnimationFrame(step);
  }
})();

/* Entender muda o que se faz: fios que se desenham, pulsos e foco por frente */
(function(){
  const map=document.querySelector('.direction-map');
  const svg=map&&map.querySelector('.direction-art');
  if(!svg) return;
  const NS='http://www.w3.org/2000/svg';
  const groups={base:'field-base',marca:'field-marca',oferta:'field-oferta',entrega:'field-entrega'};
  const pulses=document.createElementNS(NS,'g');pulses.setAttribute('class','p-pulses');
  Object.entries(groups).forEach(([k,id],gi)=>{
    const g=svg.getElementById?svg.getElementById(id):svg.querySelector('#'+id);
    if(!g) return;
    [...g.querySelectorAll('path')].forEach((p,i)=>{
      p.setAttribute('pathLength','1');
      if(i>2) return; /* três pulsos por frente bastam */
      const c=p.cloneNode(false);c.removeAttribute('id');c.setAttribute('class','p-pulse');c.setAttribute('pathLength','1');c.dataset.g=k;
      c.setAttribute('stroke',getComputedStyle(g).stroke||'#526d31');
      c.style.setProperty('--d',(6+gi*1.3+i*1.7).toFixed(1)+'s');c.style.setProperty('--o',(i*1.1+gi*.6).toFixed(1)+'s');
      pulses.appendChild(c);
    });
  });
  /* os pulsos ficam no mesmo recorte dos fios */
  const clipG=svg.querySelector('[clip-path]');(clipG||svg).appendChild(pulses);
  new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){map.classList.add('p-in');o.disconnect()}}),{threshold:.25}).observe(map);
  const call={base:'.direction-base',oferta:'.direction-offer',marca:'.direction-brand',entrega:'.direction-delivery'};
  Object.entries(call).forEach(([k,sel])=>{const el=map.querySelector(sel);if(!el)return;el.addEventListener('pointerenter',()=>map.dataset.focus=k);el.addEventListener('pointerleave',()=>delete map.dataset.focus)});
})();

/* painel verde do projeto */
(function(){const c=document.querySelector('.a54-project-composition');if(!c)return;if(matchMedia('(prefers-reduced-motion: reduce)').matches){c.classList.add('p-in');return}new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){c.classList.add('p-in');o.disconnect()}}),{threshold:.2}).observe(c)})();

/* ===== Rodada de diagramação ===== */
(function(){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 2 · Negócio. Oferta. Marca. acendem em sequência */
  const fit=document.querySelector('.hero-fit>span:last-child');
  if(fit&&!fit.querySelector('.hf-w')){
    const words=fit.textContent.trim().split(/\s+/);
    fit.innerHTML=words.map(w=>`<span class="hf-w">${w}</span>`).join(' ');
    const ws=[...fit.querySelectorAll('.hf-w')];let k=0;
    const step=()=>{ws.forEach((w,i)=>w.classList.toggle('on',i===k));k=(k+1)%ws.length};
    step();if(!reduce)setInterval(step,1800);
  }

  /* 4 · o fio entre direção e trabalho */
  const left=document.querySelector('.a54-project-left');
  if(left&&!left.querySelector('.pj-link')){const l=document.createElement('span');l.className='pj-link';l.setAttribute('aria-hidden','true');left.appendChild(l)}

  /* 5 · prévia dos instrumentos num iPad */
  const foot=document.querySelector('.approach-foot');const open=document.getElementById('open-method');
  if(foot&&open&&!foot.querySelector('.ap-preview')){
    const b=document.createElement('button');b.type='button';b.className='ap-preview';b.setAttribute('aria-label','Abrir os instrumentos do Aether');
    b.innerHTML='<img src="img/instrumentos-preview.jpg" alt="" width="1770" height="1200" loading="lazy" decoding="async">';
    b.addEventListener('click',()=>open.click());foot.appendChild(b);
  }

  /* 6 · marcas em movimento contínuo */
  const strip=document.querySelector('.a54-brand-strip');
  if(strip&&!reduce&&!strip.classList.contains('mq')){
    strip.querySelectorAll('.rv').forEach(e=>e.classList.remove('rv'));
    const mask=document.createElement('div');mask.className='mq-mask';strip.before(mask);mask.appendChild(strip);
    [...strip.children].forEach(c=>{const d=c.cloneNode(true);d.setAttribute('aria-hidden','true');d.removeAttribute('role');strip.appendChild(d)});
    strip.classList.add('mq');
  }

  /* 7 · fundadores em carrossel */
  const box=document.querySelector('.founders');
  if(box&&!box.classList.contains('fx')){
    const people=[...box.querySelectorAll('.founder')];
    if(people.length>1){
      box.classList.add('fx');
      people.forEach(p=>p.classList.remove('rv'));
      const stage=document.createElement('div');stage.className='fx-stage';people.forEach(p=>stage.appendChild(p));
      const tabs=document.createElement('div');tabs.className='fx-tabs';tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','Fundadores');
      const DUR=8000;box.style.setProperty('--fx',DUR+'ms');
      const btns=people.map((p,i)=>{const n=p.querySelector('h3').textContent.trim();p.id=p.id||'fundador-'+i;p.setAttribute('role','tabpanel');
        const b=document.createElement('button');b.type='button';b.setAttribute('role','tab');b.setAttribute('aria-controls',p.id);b.innerHTML=`${n}<i aria-hidden="true"></i>`;tabs.appendChild(b);return b});
      box.append(tabs,stage);
      let cur=0,timer=null,paused=false,visible=false;
      const show=n=>{cur=(n+people.length)%people.length;people.forEach((p,i)=>{p.classList.toggle('on',i===cur);p.setAttribute('aria-hidden',String(i!==cur))});btns.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===cur));const bar=b.querySelector('i');bar.style.animation='none';void bar.offsetWidth;bar.style.animation=''})};
      const run=()=>{clearTimeout(timer);if(reduce||paused||!visible)return;timer=setTimeout(()=>{show(cur+1);run()},DUR)};
      btns.forEach((b,i)=>b.addEventListener('click',()=>{show(i);run()}));
      box.addEventListener('pointerenter',()=>{paused=true;box.classList.add('paused');clearTimeout(timer)});
      box.addEventListener('pointerleave',()=>{paused=false;box.classList.remove('paused');run()});
      new IntersectionObserver(es=>es.forEach(e=>{visible=e.isIntersecting;run()}),{threshold:.3}).observe(box);
      show(0);
    }
  }
})();

/* 3 · as perguntas numa linha só: a quebra vira espaço */
document.querySelectorAll('.a54-other-possibilities h3 br').forEach(br=>br.replaceWith(' '));
