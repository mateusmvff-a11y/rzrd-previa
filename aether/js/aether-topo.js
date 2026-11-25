/* Aether — opções da figura do topo para aprovação (?topo=a..e).
   Cada opção desenha no SVG do topo e devolve, a cada quadro, a posição dos três
   pontos (Mercado, Negócio, Marca) para os cartões acompanharem. */
(function(){
  const mix=(a,b,k)=>a.map((v,j)=>Math.round(v+(b[j]-v)*k));
  const rgb=c=>`rgb(${c})`;
  const float=(n,i,t,ax=10,ay=9)=>[n.x+ax*Math.sin(t*.34+i*2.1),n.y+ay*Math.cos(t*.29+i*1.4)];

  window.AX_TOPO={
    /* A · Vórtice: anéis grossos em espiral, o mesmo princípio da Vortex, em verdes */
    a({svg,el,f,NODES}){
      const g=el('g',{fill:'none'},svg),N=16,S=[[232,237,222],[176,203,142],[90,128,74],[27,53,43]];
      const col=t=>t<.45?mix(S[0],S[1],t/.45):t<.8?mix(S[1],S[2],(t-.45)/.35):mix(S[2],S[3],(t-.8)/.2);
      const cs=[];for(let i=0;i<N;i++){const k=i/(N-1),r=470*(1-i/(N+1.6));cs.push(el('circle',{r:f(r),stroke:rgb(col(k)),'stroke-width':f(470/(N+1.6)*.58)},g))}
      const eye=el('circle',{r:12,fill:'#14281F'},svg);
      return{keep:[g,eye],tick(t){let ex=0,ey=0;cs.forEach((c,i)=>{const k=i/N,d=k*92,a=t*.5-i*.3;ex=d*Math.cos(a);ey=d*Math.sin(a);c.setAttribute('cx',f(ex));c.setAttribute('cy',f(ey))});eye.setAttribute('cx',f(ex*1.08));eye.setAttribute('cy',f(ey*1.08));return NODES.map((n,i)=>float(n,i,t))}};
    },

    /* B · Contornos: linhas de relevo que ondulam, como um mapa do terreno */
    b({svg,el,f,NODES}){
      const g=el('g',{fill:'none','stroke-linejoin':'round'},svg),L=15,P=96,paths=[];
      for(let j=0;j<L;j++)paths.push(el('path',{stroke:j%4===3?'#3F6B45':'#8FAE74','stroke-width':j%4===3?1.6:1.05,'stroke-opacity':f(j%4===3?.85:.55)},g));
      const dot=el('circle',{r:9,fill:'#1B352B'},svg),ring=el('circle',{r:22,fill:'none',stroke:'#1B352B','stroke-opacity':'.35'},svg);
      return{keep:[g,dot,ring],tick(t){
        const cx=26*Math.sin(t*.12),cy=18*Math.cos(t*.1);
        paths.forEach((p,j)=>{const base=46+j*29;let d='';for(let k=0;k<=P;k++){const a=k/P*Math.PI*2;const r=base*(1+.09*Math.sin(3*a+t*.32+j*.42)+.05*Math.sin(5*a-t*.21+j*.7)+.03*Math.sin(2*a+t*.17-j*.3));const x=cx*(1-j/L)+r*Math.cos(a),y=cy*(1-j/L)+r*Math.sin(a)*.92;d+=(k?'L':'M')+f(x)+' '+f(y)}p.setAttribute('d',d+'Z')});
        dot.setAttribute('cx',f(cx));dot.setAttribute('cy',f(cy));ring.setAttribute('cx',f(cx));ring.setAttribute('cy',f(cy));
        return NODES.map((n,i)=>float(n,i,t,6,6))}};
    },

    /* C · Convergência: três feixes saem de Mercado, Negócio e Marca e viram uma direção */
    c({svg,el,f,NODES}){
      const cols=['#A9C487','#5E8446','#2F5B3E'],M=9,g=el('g',{fill:'none','stroke-linecap':'round'},svg);
      const bands=NODES.map((n,i)=>{const lines=[];for(let j=0;j<M;j++)lines.push(el('path',{stroke:cols[i],'stroke-width':j%3===1?1.8:1.1,'stroke-opacity':f(.28+.62*(1-Math.abs(j-(M-1)/2)/((M-1)/2))),'stroke-dasharray':j%3===1?'40 220':'none'},g));return lines});
      const out=[];for(let j=0;j<M*3;j++)out.push(el('path',{stroke:j%3===0?'#1B352B':'#5E8446','stroke-width':j%5===0?1.8:1.05,'stroke-opacity':j%5===0?'.8':'.4','stroke-dasharray':j%5===0?'50 260':'none'},g));
      const hub=el('circle',{r:10,fill:'#1B352B'},svg);
      return{keep:[g,hub],tick(t){
        const P=NODES.map((n,i)=>float(n,i,t,8,8));
        bands.forEach((lines,i)=>{const [sx,sy]=P[i];const ang=Math.atan2(-sy,-sx),nx=-Math.sin(ang),ny=Math.cos(ang);
          lines.forEach((l,j)=>{const o=(j-(M-1)/2);const x0=sx+nx*o*9,y0=sy+ny*o*9,x3=nx*o*2.2,y3=ny*o*2.2;const c1x=sx*.55+nx*o*7,c1y=sy*.55+ny*o*7+40*Math.sin(t*.4+i);
            l.setAttribute('d',`M${f(x0)} ${f(y0)}C${f(c1x)} ${f(c1y)} ${f(x3*3)} ${f(y3*3)} ${f(x3)} ${f(y3)}`);l.setAttribute('stroke-dashoffset',f(-t*70))})});
        out.forEach((l,j)=>{const o=(j-(M*3-1)/2)*2.4;l.setAttribute('d',`M0 ${f(o*.5)}C-160 ${f(o*1.2+30*Math.sin(t*.3))} -300 ${f(o*2.6+150)} -560 ${f(o*3.4+210)}`);l.setAttribute('stroke-dashoffset',f(-t*70))});
        return P}};
    },

    /* D · Globo: esfera de pontos girando, com a linha do equador marcada */
    d({svg,el,f,NODES}){
      const g=el('g',{},svg),R=330,pts=[];
      for(let la=-80;la<=80;la+=10)for(let lo=0;lo<360;lo+=10)pts.push({la:la*Math.PI/180,lo:lo*Math.PI/180,c:el('circle',{r:2,fill:'#3F6B45'},g)});
      const eq=el('ellipse',{fill:'none',stroke:'#5E8446','stroke-width':1.4,'stroke-opacity':'.6',rx:R},svg);
      const tilt=.32;
      return{keep:[g,eq],tick(t){const rot=t*.16;
        pts.forEach(p=>{const x=Math.cos(p.la)*Math.sin(p.lo+rot),y0=Math.sin(p.la),z0=Math.cos(p.la)*Math.cos(p.lo+rot);const y=y0*Math.cos(tilt)-z0*Math.sin(tilt),z=y0*Math.sin(tilt)+z0*Math.cos(tilt);
          p.c.setAttribute('cx',f(x*R));p.c.setAttribute('cy',f(-y*R));p.c.setAttribute('r',f(1.1+1.9*(z+1)/2));p.c.setAttribute('fill-opacity',f(.12+.78*(z+1)/2))});
        eq.setAttribute('ry',f(R*Math.sin(tilt)));
        return NODES.map((n,i)=>float(n,i,t,5,5))}};
    },

    /* E · Interseção: três círculos translúcidos; onde se encontram, a direção */
    e({svg,el,f,NODES}){
      const g=el('g',{style:'isolation:isolate'},svg),fills=['#C9DCAE','#93B675','#4F7A4A'];
      const ang=[-84,-4,84].map(a=>a*Math.PI/180),D=118,R=215;
      const cs=fills.map(c=>el('circle',{r:R,fill:c,'fill-opacity':'.55',style:'mix-blend-mode:multiply',stroke:'#3F6B45','stroke-opacity':'.35','stroke-width':1},g));
      const core=el('circle',{r:9,fill:'#14281F'},svg);
      return{keep:[g,core],tick(t){
        cs.forEach((c,i)=>{const a=ang[i]+.07*Math.sin(t*.25+i*2),d=D+10*Math.sin(t*.4+i);c.setAttribute('cx',f(d*Math.cos(a)));c.setAttribute('cy',f(d*Math.sin(a)));c.setAttribute('r',f(R+6*Math.sin(t*.5+i*1.3)))});
        return NODES.map((n,i)=>float(n,i,t,6,6))}};
    }
  };

  /* seletor das opções, só quando a página é aberta com ?topo= */
  const key=new URLSearchParams(location.search).get('topo');
  if(!key) return;
  const names={atual:'Atual',a:'A · Vórtice',b:'B · Contornos',c:'C · Convergência',d:'D · Globo',e:'E · Interseção'};
  const bar=document.createElement('nav');bar.className='ax-topo-bar';bar.setAttribute('aria-label','Opções da figura do topo');
  bar.innerHTML=Object.entries(names).map(([k,v])=>`<a href="?topo=${k}"${k===key?' aria-current="true"':''}>${v}</a>`).join('');
  document.addEventListener('DOMContentLoaded',()=>document.body.appendChild(bar));
  const st=document.createElement('style');
  st.textContent='.ax-topo-bar{position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:999;display:flex;gap:4px;padding:5px;border-radius:99px;background:rgba(20,30,25,.92);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);box-shadow:0 16px 40px -16px rgba(0,0,0,.5);max-width:calc(100vw - 24px);overflow-x:auto}.ax-topo-bar a{flex:0 0 auto;padding:9px 15px;border-radius:99px;color:#DCE6D2;font:500 13.5px/1 Geist,Arial,sans-serif;text-decoration:none;white-space:nowrap}.ax-topo-bar a[aria-current]{background:#BED69C;color:#14281F}.ax-topo-bar a:hover{color:#fff}';
  document.head.appendChild(st);
})();
