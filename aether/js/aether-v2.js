/* Aether v36 — topo vivo (Mercado, Negócio e Marca fluindo para a direção),
   cabeçalho que ganha fundo após o topo e órbitas ecoando no fechamento. */
(function(){
  const hero=document.querySelector('.ax-hero');
  if(!hero) return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine=matchMedia('(hover: hover) and (pointer: fine)').matches;
  const NS='http://www.w3.org/2000/svg';
  const f=n=>n.toFixed(2);
  const el=(tag,attrs,parent,before)=>{const e=document.createElementNS(NS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(parent)before?parent.insertBefore(e,before):parent.appendChild(e);return e};

  /* cabeçalho */
  const onScroll=()=>document.body.classList.toggle('ax-scrolled',scrollY>40);
  addEventListener('scroll',onScroll,{passive:true});onScroll();

  /* celular: os cartões descem para uma lista abaixo do texto */
  const cardsBox=hero.querySelector('.ax-cards');
  const side=hero.querySelector('.ax-side');
  if(cardsBox&&side){const m=cardsBox.cloneNode(true);m.className='ax-mcards';m.setAttribute('aria-hidden','true');m.querySelectorAll('.ax-card').forEach(c=>c.classList.remove('ax-card'));side.after(m)}

  const tilt=hero.querySelector('.ax-tilt');
  const svg=el('svg',{viewBox:'-500 -500 1000 1000','aria-hidden':'true'},tilt,tilt.firstChild);
  const defs=el('defs',{},svg);
  const glow=el('radialGradient',{id:'axGlow'},defs);
  el('stop',{offset:'0','stop-color':'#D3E3B6','stop-opacity':'.95'},glow);
  el('stop',{offset:'.55','stop-color':'#E3EBD3','stop-opacity':'.5'},glow);
  el('stop',{offset:'1','stop-color':'#F2EFE9','stop-opacity':'0'},glow);
  el('circle',{r:490,fill:'url(#axGlow)'},svg);

  const field=el('g',{fill:'none'},svg);
  const rings=[];
  for(let i=0;i<7;i++)rings.push(el('circle',{r:110+i*58,stroke:'#8FAE74','stroke-opacity':f(.2-i*.02),'stroke-width':1},field));

  const ORB=[
    {rx:445,ry:150,a:-18,s:2.2,c:'#C6D8AA',w:1.3},
    {rx:405,ry:178,a:34,s:-1.6,c:'#A6C384',w:1.6},
    {rx:372,ry:128,a:92,s:1.4,c:'#83A764',w:1.8},
    {rx:432,ry:196,a:142,s:-1.9,c:'#5E8446',w:1.6},
    {rx:388,ry:142,a:206,s:1.2,c:'#3F6B45',w:1.4}
  ];
  const orbG=el('g',{fill:'none'},svg);
  ORB.forEach(o=>{o.e=el('ellipse',{rx:o.rx,ry:o.ry,stroke:o.c,'stroke-width':o.w,'stroke-opacity':'.85'},orbG)});
  const flowG=el('g',{fill:'none',stroke:'#6F9640','stroke-width':'1.8','stroke-linecap':'round','stroke-dasharray':'1.5 10'},svg);
  const partG=el('g',{fill:'#5E8446'},svg);
  const nodeG=el('g',{},svg);

  /* três forças: Mercado (alto), Negócio (direita), Marca (baixo); o cartão de cada uma segue o ponto */
  const cards=[...hero.querySelectorAll('.ax-card')];
  const NODES=[
    {x:40,y:-300,up:false},
    {x:215,y:-12,up:false},
    {x:30,y:322,up:true}
  ];
  /* limite para os cartões não passarem da borda da tela */
  const fig=hero.querySelector('.ax-fig');
  let maxCx=[1e9,1e9,1e9];
  const measure=()=>{const r=fig.getBoundingClientRect(),sc=r.width/1000||1;maxCx=NODES.map(n=>n.card?(innerWidth-20-r.left)/sc-500-(n.card.offsetWidth/2)/sc:1e9)};
  addEventListener('resize',measure);
  NODES.forEach((n,i)=>{
    n.card=cards[i];
    if(n.card&&n.up)n.card.classList.add('up');
    n.flow=el('path',{},flowG);
    n.g=el('g',{},nodeG);
    el('circle',{r:26,fill:'none',stroke:'#7EA03F','stroke-opacity':'.35'},n.g);
    el('circle',{r:13,fill:'#F7F5EF',stroke:'#4E7537','stroke-width':'2.2'},n.g);
    el('circle',{r:4,fill:'#4E7537'},n.g);
  });
  const PARTS=[];
  for(let i=0;i<16;i++)PARTS.push({o:i%5,p:i*1.71,v:(.16+((i*37)%10)/55)*(i%2?1:-1),c:el('circle',{r:i%3?2.2:3.2,'fill-opacity':i%3?'.55':'.8'},partG)});

  const core=el('g',{},svg);
  const pulse=el('circle',{r:80,fill:'none',stroke:'#7EA03F','stroke-width':'1.5'},core);
  el('circle',{r:80,fill:'#1B352B'},core);
  el('circle',{r:67,fill:'none',stroke:'#8FAF81','stroke-opacity':'.7'},core);
  const t1=el('text',{y:4,'text-anchor':'middle','font-size':'26','font-weight':'600','letter-spacing':'-.6',fill:'#F4F6EE'},core);t1.textContent='Direção';
  const t2=el('text',{y:29,'text-anchor':'middle','font-size':'11','font-weight':'500','letter-spacing':'3',fill:'#B7CFA5'},core);t2.textContent='AETHER';

  const pt=(o,ang,th)=>{const r=th*Math.PI/180,x=o.rx*Math.cos(ang),y=o.ry*Math.sin(ang);return[x*Math.cos(r)-y*Math.sin(r),x*Math.sin(r)+y*Math.cos(r)]};

  function tick(t){
    rings.forEach((r,i)=>r.setAttribute('r',f(110+i*58+Math.sin(t*.6-i*.7)*5)));
    ORB.forEach(o=>{o.th=o.a+t*o.s;o.e.setAttribute('transform',`rotate(${f(o.th)})`)});
    NODES.forEach((n,i)=>{
      const x=n.x+10*Math.sin(t*.34+i*2.1),y=n.y+9*Math.cos(t*.29+i*1.4);
      n.g.setAttribute('transform',`translate(${f(x)} ${f(y)}) scale(${f(.95+.07*Math.sin(t*.3+i*2.1))})`);
      const mx=x*.5-y*.18,my=y*.5+x*.18;
      n.flow.setAttribute('d',`M${f(x)} ${f(y)}Q${f(mx)} ${f(my)} 0 0`);
      n.flow.setAttribute('stroke-dashoffset',f(-t*22));
      if(n.card){n.card.style.left=f((Math.min(x,maxCx[i])+500)/10)+'%';n.card.style.top=f((y+(n.up?-34:34)+500)/10)+'%'}
    });
    PARTS.forEach(q=>{const o=ORB[q.o];const [x,y]=pt(o,q.p+t*q.v,o.th);q.c.setAttribute('cx',f(x));q.c.setAttribute('cy',f(y))});
    const ph=(t*.45)%1;pulse.setAttribute('r',f(80+ph*70));pulse.setAttribute('stroke-opacity',f(.5*(1-ph)));
  }

  let on=true,mx=0,my=0,tx=0,ty=0;
  if(fine){hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();tx=(e.clientX-r.left)/r.width-.5;ty=(e.clientY-r.top)/r.height-.5});hero.addEventListener('pointerleave',()=>{tx=ty=0})}
  new IntersectionObserver(es=>es.forEach(e=>on=e.isIntersecting),{rootMargin:'80px'}).observe(hero);
  const t0=performance.now();
  function loop(now){
    if(on){const t=(now-t0)/1000+6;mx+=(tx-mx)*.05;my+=(ty-my)*.05;tilt.style.transform=`rotateY(${f(mx*12)}deg) rotateX(${f(-my*8)}deg)`;tick(t)}
    requestAnimationFrame(loop);
  }
  measure();tick(6);
  if(document.fonts)document.fonts.ready.then(measure);
  if(!reduce)requestAnimationFrame(loop);
  requestAnimationFrame(()=>requestAnimationFrame(()=>hero.classList.add('ax-in')));

  /* eco no fechamento: as mesmas órbitas, em linhas claras sobre o verde escuro */
  const cta=document.getElementById('contato');
  if(cta){
    cta.style.position='relative';cta.style.overflow='hidden';cta.style.isolation='isolate';
    const box=document.createElement('div');box.className='ax-echo';box.setAttribute('aria-hidden','true');cta.prepend(box);
    const es=el('svg',{viewBox:'-500 -500 1000 1000'},box);
    const eg=el('g',{fill:'none',stroke:'#DDE8CC'},es);
    const EO=ORB.map((o,i)=>({o,e:el('ellipse',{rx:o.rx,ry:o.ry,'stroke-opacity':f(.07+i*.018),'stroke-width':1.2},eg)}));
    const ED=[];for(let i=0;i<10;i++)ED.push({o:ORB[i%5],p:i*2.3,v:(.1+i%4*.04)*(i%2?1:-1),c:el('circle',{r:2.6,fill:'#DDE8CC','fill-opacity':'.35'},es)});
    let eon=false;new IntersectionObserver(x=>x.forEach(e=>eon=e.isIntersecting)).observe(cta);
    const etick=t=>{EO.forEach(q=>q.e.setAttribute('transform',`rotate(${f(q.o.a+t*q.o.s*.7)})`));ED.forEach(d=>{const [x,y]=pt(d.o,d.p+t*d.v,d.o.a+t*d.o.s*.7);d.c.setAttribute('cx',f(x));d.c.setAttribute('cy',f(y))})};
    etick(9);
    if(!reduce)(function l(n){if(eon)etick(n/1000+6);requestAnimationFrame(l)})(0);
  }
})();
