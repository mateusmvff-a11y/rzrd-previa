/* Aether v2 — topo vivo (campo de relações) e cabeçalho que aparece com a rolagem */
(function(){
  const hero=document.querySelector('.ax-hero');
  if(!hero) return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine=matchMedia('(hover: hover) and (pointer: fine)').matches;
  const NS='http://www.w3.org/2000/svg';
  const f=n=>n.toFixed(2);
  const el=(tag,attrs,parent)=>{const e=document.createElementNS(NS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(parent)parent.appendChild(e);return e};

  /* cabeçalho */
  const onScroll=()=>document.body.classList.toggle('ax-scrolled',scrollY>hero.offsetHeight*.55);
  addEventListener('scroll',onScroll,{passive:true});onScroll();

  /* campo: órbitas que precessam, cinco forças que circulam e fluem para a direção */
  const tilt=hero.querySelector('.ax-tilt');
  const svg=el('svg',{viewBox:'-500 -500 1000 1000','aria-hidden':'true'},tilt);
  const defs=el('defs',{},svg);
  const glow=el('radialGradient',{id:'axGlow'},defs);
  el('stop',{offset:'0','stop-color':'#D3E3B6','stop-opacity':'.95'},glow);
  el('stop',{offset:'.55','stop-color':'#E3EBD3','stop-opacity':'.55'},glow);
  el('stop',{offset:'1','stop-color':'#F2EFE9','stop-opacity':'0'},glow);
  el('circle',{r:490,fill:'url(#axGlow)'},svg);

  const field=el('g',{fill:'none'},svg);
  const rings=[];
  for(let i=0;i<7;i++){rings.push(el('circle',{r:110+i*58,stroke:'#8FAE74','stroke-opacity':f(.2-i*.02),'stroke-width':1},field))}

  const ORB=[
    {rx:445,ry:150,a:-18,s:2.2,c:'#C6D8AA',w:1.3},
    {rx:405,ry:178,a:34,s:-1.6,c:'#A6C384',w:1.6},
    {rx:372,ry:128,a:92,s:1.4,c:'#83A764',w:1.8},
    {rx:432,ry:196,a:142,s:-1.9,c:'#5E8446',w:1.6},
    {rx:388,ry:142,a:206,s:1.2,c:'#3F6B45',w:1.4}
  ];
  const orbG=el('g',{fill:'none'},svg);
  ORB.forEach(o=>{o.e=el('ellipse',{rx:o.rx,ry:o.ry,stroke:o.c,'stroke-width':o.w,'stroke-opacity':'.85'},orbG)});

  const flowG=el('g',{fill:'none',stroke:'#6F9640','stroke-width':'1.7','stroke-linecap':'round','stroke-dasharray':'1.5 10'},svg);
  const partG=el('g',{fill:'#5E8446'},svg);
  const nodeG=el('g',{},svg);

  const NODES=[
    {t:'Comprador',h:-116,R:300},
    {t:'Marca',h:-64,R:318},
    {t:'Mercado',h:-10,R:272},
    {t:'Oferta',h:46,R:312},
    {t:'Operação',h:102,R:292}
  ];
  NODES.forEach(n=>{
    n.flow=el('path',{},flowG);
    n.g=el('g',{},nodeG);
    n.halo=el('circle',{r:26,fill:'none',stroke:'#7EA03F','stroke-opacity':'.35'},n.g);
    n.dot=el('circle',{r:13,fill:'#F7F5EF',stroke:'#4E7537','stroke-width':'2.2'},n.g);
    el('circle',{r:4,fill:'#4E7537'},n.g);
    n.lab=el('text',{class:'ax-lab','font-size':'19','font-weight':'560','letter-spacing':'-.2',fill:'#2F4A2B'},n.g);
    n.lab.textContent=n.t;
  });
  const PARTS=[];
  for(let i=0;i<16;i++){PARTS.push({o:i%5,p:i*1.71,v:(.16+((i*37)%10)/55)*(i%2?1:-1),c:el('circle',{r:i%3?2.2:3.2,'fill-opacity':i%3?'.55':'.8'},partG)})}

  /* núcleo */
  const core=el('g',{},svg);
  const pulse=el('circle',{r:80,fill:'none',stroke:'#7EA03F','stroke-width':'1.5'},core);
  el('circle',{r:84,fill:'#1B3931'},core);
  el('circle',{r:70,fill:'none',stroke:'#8FAF81','stroke-opacity':'.7'},core);
  const t1=el('text',{y:4,'text-anchor':'middle','font-size':'27','font-weight':'600','letter-spacing':'-.6',fill:'#F4F6EE'},core);t1.textContent='Direção';
  const t2=el('text',{y:30,'text-anchor':'middle','font-size':'11.5','font-weight':'500','letter-spacing':'3',fill:'#B7CFA5'},core);t2.textContent='AETHER';

  const pt=(o,ang,th)=>{const r=th*Math.PI/180,x=o.rx*Math.cos(ang),y=o.ry*Math.sin(ang);return[x*Math.cos(r)-y*Math.sin(r),x*Math.sin(r)+y*Math.cos(r)]};

  function tick(t){
    rings.forEach((r,i)=>r.setAttribute('r',f(110+i*58+Math.sin(t*.6-i*.7)*5)));
    ORB.forEach(o=>{o.th=o.a+t*o.s;o.e.setAttribute('transform',`rotate(${f(o.th)})`)});
    NODES.forEach((n,i)=>{
      const ang=(n.h+8*Math.sin(t*.32+i*1.7))*Math.PI/180,R=n.R+12*Math.sin(t*.47+i*1.3);
      const x=R*Math.cos(ang),y=R*Math.sin(ang);
      const z=Math.sin(t*.3+i*2.1); /* respiração de profundidade */
      n.g.setAttribute('transform',`translate(${f(x)} ${f(y)}) scale(${f(.94+.08*z)})`);
      if(!n.w)n.w=n.lab.getComputedTextLength();
      n.lab.setAttribute('x',f(-n.w/2));
      n.lab.setAttribute('y','50');
      const mx=x*.5-y*.18,my=y*.5+x*.18;
      n.flow.setAttribute('d',`M${f(x)} ${f(y)}Q${f(mx)} ${f(my)} 0 0`);
      n.flow.setAttribute('stroke-dashoffset',f(-t*22));
    });
    PARTS.forEach(q=>{const o=ORB[q.o];const [x,y]=pt(o,q.p+t*q.v,o.th);q.c.setAttribute('cx',f(x));q.c.setAttribute('cy',f(y))});
    const ph=(t*.45)%1;pulse.setAttribute('r',f(84+ph*70));pulse.setAttribute('stroke-opacity',f(.5*(1-ph)));
  }

  let on=true,mx=0,my=0,tx=0,ty=0;
  if(fine){hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();tx=(e.clientX-r.left)/r.width-.5;ty=(e.clientY-r.top)/r.height-.5});hero.addEventListener('pointerleave',()=>{tx=ty=0})}
  new IntersectionObserver(es=>es.forEach(e=>on=e.isIntersecting),{rootMargin:'80px'}).observe(hero);
  const t0=performance.now();
  function loop(now){
    if(on){const t=(now-t0)/1000+6;mx+=(tx-mx)*.05;my+=(ty-my)*.05;tilt.style.transform=`rotateY(${f(mx*14)}deg) rotateX(${f(-my*9)}deg)`;tick(t)}
    requestAnimationFrame(loop);
  }
  if(reduce) tick(9); else requestAnimationFrame(loop);
  requestAnimationFrame(()=>requestAnimationFrame(()=>hero.classList.add('ax-in')));

  /* eco no fechamento: as mesmas órbitas, em linhas claras sobre o verde */
  const cta=document.getElementById('contato');
  if(cta){
    const box=document.createElement('div');box.className='ax-echo';box.setAttribute('aria-hidden','true');cta.prepend(box);
    const es=el('svg',{viewBox:'-500 -500 1000 1000'},box);
    const eg=el('g',{fill:'none',stroke:'#F2EFE9'},es);
    const EO=ORB.map((o,i)=>({o,e:el('ellipse',{rx:o.rx,ry:o.ry,'stroke-opacity':f(.16+i*.025),'stroke-width':1.2},eg)}));
    const ED=[];for(let i=0;i<10;i++)ED.push({o:ORB[i%5],p:i*2.3,v:(.1+i%4*.04)*(i%2?1:-1),c:el('circle',{r:2.6,fill:'#F2EFE9','fill-opacity':'.5'},es)});
    let eon=false;new IntersectionObserver(x=>x.forEach(e=>eon=e.isIntersecting)).observe(cta);
    const etick=t=>{EO.forEach((q,i)=>q.e.setAttribute('transform',`rotate(${f(q.o.a+t*q.o.s*.7)})`));ED.forEach(d=>{const [x,y]=pt(d.o,d.p+t*d.v,d.o.a+t*d.o.s*.7);d.c.setAttribute('cx',f(x));d.c.setAttribute('cy',f(y))})};
    if(reduce) etick(9); else (function l(n){if(eon)etick(n/1000+6);requestAnimationFrame(l)})(0);
  }
})();
