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

/* INNAP: padrão de linhas da marca, desenhado ao entrar; galeria com leve paralaxe */
(function(){
  const sec=document.querySelector('.innap-case');
  if(!sec) return;
  const box=sec.querySelector('.innap-lines');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* traçados ortogonais de cantos arredondados, como no padrão da identidade */
  const W=1600,H=1000,R=26;
  const paths=[
    [[0,180],[420,180],[420,330],[760,330],[760,90],[1180,90],[1180,260],[1600,260]],
    [[160,0],[160,420],[560,420],[560,610],[980,610],[980,470],[1380,470],[1380,0]],
    [[0,720],[300,720],[300,540],[640,540],[640,880],[1120,880],[1120,700],[1600,700]],
    [[860,1000],[860,760],[1240,760],[1240,560],[1600,560]],
    [[0,940],[460,940],[460,1000]],
    [[1460,1000],[1460,860],[1600,860]]
  ];
  const round=pts=>{let d=`M${pts[0][0]} ${pts[0][1]}`;for(let i=1;i<pts.length-1;i++){const [px,py]=pts[i-1],[x,y]=pts[i],[nx,ny]=pts[i+1];const ax=Math.sign(x-px),ay=Math.sign(y-py),bx=Math.sign(nx-x),by=Math.sign(ny-y);d+=` L${x-ax*R} ${y-ay*R} Q${x} ${y} ${x+bx*R} ${y+by*R}`}const l=pts[pts.length-1];return d+` L${l[0]} ${l[1]}`};
  const nodes=[[420,180],[760,330],[560,420],[980,610],[300,720],[1120,880],[1240,760],[1380,470]];
  box.innerHTML=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">${paths.map(p=>`<path d="${round(p)}"/>`).join('')}${nodes.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4"/>`).join('')}</svg>`;
  box.querySelectorAll('path').forEach(p=>p.style.setProperty('--len',Math.ceil(p.getTotalLength())));
  if(reduce){sec.classList.add('drawn');return}
  new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){sec.classList.add('drawn');o.disconnect()}}),{threshold:.15}).observe(sec);
  const figs=[...sec.querySelectorAll('.innap-gallery figure')];
  let ticking=false;
  const par=()=>{ticking=false;const vh=innerHeight;figs.forEach((f,i)=>{const r=f.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;const k=((r.top+r.height/2)-vh/2)/vh;f.querySelector('img').style.setProperty('--py',(k*-(i%2?26:40)-18).toFixed(1)+'px')})};
  addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(par)}},{passive:true});par();
})();
