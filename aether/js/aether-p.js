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
    /* começa pela Geórgia */
    people.sort((a,b)=>(/Ge[óo]rgia/.test(b.querySelector('h3').textContent)?1:0)-(/Ge[óo]rgia/.test(a.querySelector('h3').textContent)?1:0));
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

/* exemplos do projeto como lista: cada linha (ou frase) vira um item, sem mudar o texto */
document.querySelectorAll('.a54-project-examples').forEach(p=>{
  if(p.querySelector('.pj-item'))return;
  const hasBr=!!p.querySelector('br');
  const parts=hasBr?p.innerHTML.split(/<br\s*\/?>/i):p.textContent.trim().split(/(?<=\.)\s+/);
  p.innerHTML=parts.map(t=>t.trim()).filter(Boolean).map(t=>`<span class="pj-item">${t}</span>`).join(hasBr?'<br>':' ');
});

/* =====================================================================
   A peça em 3D: profundidade gerada da própria foto (fundo longe, madeira
   no meio, papel na frente) e um shader WebGL que desloca cada camada.
   O papel fica como pivô e ondula de leve; a madeira e o fundo se movem
   com o mouse e a rolagem.
   ===================================================================== */
(function(){
  const ex=document.querySelector('.a54-exhibit');
  if(!ex) return;
  const imgs=[...ex.querySelectorAll('img.a54-art')];
  if(!imgs.length||matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const test=document.createElement('canvas').getContext('webgl');
  if(!test) return;

  const src=imgs[0];
  const ready=src.complete&&src.naturalWidth?Promise.resolve():new Promise(r=>src.addEventListener('load',r,{once:true}));
  ready.then(()=>{
    /* 1 · mapa de profundidade, numa versão reduzida da foto */
    const W=420,H=Math.round(W*src.naturalHeight/src.naturalWidth);
    const c=document.createElement('canvas');c.width=W;c.height=H;
    const cx=c.getContext('2d',{willReadFrequently:true});cx.drawImage(src,0,0,W,H);
    const px=cx.getImageData(0,0,W,H).data;
    let d=new Float32Array(W*H);
    for(let i=0;i<W*H;i++){
      const r=px[i*4],g=px[i*4+1],b=px[i*4+2],mx=Math.max(r,g,b),mn=Math.min(r,g,b),lum=.299*r+.587*g+.114*b;
      const y=Math.floor(i/W)/H;
      let v=.12+Math.max(0,y-.7)*.6;                         /* fundo, com o chão mais perto */
      if(r>g+6&&r>b+10&&lum>22&&lum<170)v=.55;               /* madeira */
      if(lum>135&&mx-mn<48)v=1;                              /* papel */
      d[i]=v;
    }
    /* suaviza para não rasgar a imagem nas bordas */
    const blur=(a,rad)=>{const o=new Float32Array(a.length);
      for(let y=0;y<H;y++){let s=0;for(let x=-rad;x<=rad;x++)s+=a[y*W+Math.min(W-1,Math.max(0,x))];for(let x=0;x<W;x++){o[y*W+x]=s/(2*rad+1);s+=a[y*W+Math.min(W-1,x+rad+1)]-a[y*W+Math.max(0,x-rad)]}}
      const o2=new Float32Array(a.length);
      for(let x=0;x<W;x++){let s=0;for(let y=-rad;y<=rad;y++)s+=o[Math.min(H-1,Math.max(0,y))*W+x];for(let y=0;y<H;y++){o2[y*W+x]=s/(2*rad+1);s+=o[Math.min(H-1,y+rad+1)*W+x]-o[Math.max(0,y-rad)*W+x]}}
      return o2};
    const MW=1400,MH=Math.round(MW*src.naturalHeight/src.naturalWidth);
    const mc=document.createElement('canvas');mc.width=MW;mc.height=MH;const mcx=mc.getContext('2d',{willReadFrequently:true});mcx.drawImage(src,0,0,MW,MH);
    const mp=mcx.getImageData(0,0,MW,MH);const md=mp.data;
    for(let i=0;i<MW*MH;i++){const r=md[i*4],g=md[i*4+1],b=md[i*4+2],mx=Math.max(r,g,b),mn=Math.min(r,g,b),lum=.299*r+.587*g+.114*b;
      /* papel claro e pouco saturado; a borda ganha uma transição curta pela luminância */
      const k=Math.max(0,Math.min(1,(lum-118)/30))*Math.max(0,Math.min(1,(60-(mx-mn))/16));md[i*4]=md[i*4+1]=md[i*4+2]=Math.round(k*255);md[i*4+3]=255}
    /* fecha as linhas do quadriculado e reafina a borda */
    {const k=new Float32Array(MW*MH);for(let i=0;i<MW*MH;i++)k[i]=md[i*4]/255;
     const bl=(arr,rad)=>{const o=new Float32Array(arr.length),o2=new Float32Array(arr.length);
       for(let y=0;y<MH;y++){let s=0;for(let x=-rad;x<=rad;x++)s+=arr[y*MW+Math.min(MW-1,Math.max(0,x))];for(let x=0;x<MW;x++){o[y*MW+x]=s/(2*rad+1);s+=arr[y*MW+Math.min(MW-1,x+rad+1)]-arr[y*MW+Math.max(0,x-rad)]}}
       for(let x=0;x<MW;x++){let s=0;for(let y=-rad;y<=rad;y++)s+=o[Math.min(MH-1,Math.max(0,y))*MW+x];for(let y=0;y<MH;y++){o2[y*MW+x]=s/(2*rad+1);s+=o[Math.min(MH-1,y+rad+1)*MW+x]-o[Math.max(0,y-rad)*MW+x]}}
       return o2};
     const b=bl(k,3);for(let i=0;i<MW*MH;i++){const v=Math.max(0,Math.min(1,(b[i]-.38)/.24));md[i*4]=md[i*4+1]=md[i*4+2]=Math.round(v*255)}}
    d=blur(blur(blur(d,5),5),4);
    const dep=new Uint8Array(W*H*4);for(let i=0;i<W*H;i++){const v=Math.round(Math.min(1,d[i])*255);dep[i*4]=dep[i*4+2]=v;dep[i*4+1]=0;dep[i*4+3]=255}

    /* 2 · um canvas WebGL no lugar de cada camada da foto */
    const VS='attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;v.y=1.-v.y;gl_Position=vec4(p,0.,1.);}';
    const FS=`precision mediump float;varying vec2 v;uniform sampler2D img,dep,msk;uniform vec2 m;uniform float t;uniform float ov;
      void main(){
        vec2 uv=v;
        float z=texture2D(dep,uv).r;
        float paper=smoothstep(.72,.95,z);
        uv-= (z-.92)*m*vec2(.034,.026);                        /* paralaxe: o papel é o pivô */
        uv.y+=sin(uv.x*13.+t*1.1)*.0022*paper;                 /* o papel ondula */
        uv.x+=cos(uv.y*9.-t*.9)*.0012*paper;
        vec3 col=texture2D(img,uv).rgb;
        float sheen=.5+.5*sin(uv.x*5.5-uv.y*2.-t*.55+m.x*2.5);
        col+=paper*.05*sheen;                                 /* brilho que corre pelo papel */
        float a=mix(1.,smoothstep(.2,.8,texture2D(msk,uv).r),ov);gl_FragColor=vec4(col*a,a);
      }`;
    const views=imgs.map(im=>{
      const cv=document.createElement('canvas');cv.className=im.className;cv.setAttribute('aria-hidden','true');
      im.after(cv);im.style.visibility='hidden';
      const gl=cv.getContext('webgl',{premultipliedAlpha:true,alpha:true,antialias:false});
      const sh=(type,s)=>{const o=gl.createShader(type);gl.shaderSource(o,s);gl.compileShader(o);return o};
      const pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,VS));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);gl.useProgram(pr);
      const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
      const loc=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
      const tex=(unit,data,w,h)=>{const tx=gl.createTexture();gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,tx);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
        if(w)gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,w,h,0,gl.RGBA,gl.UNSIGNED_BYTE,data);else gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,data)};
      tex(0,src);tex(1,dep,W,H);tex(2,new Uint8Array(mp.data.buffer),MW,MH);
      gl.uniform1i(gl.getUniformLocation(pr,'img'),0);gl.uniform1i(gl.getUniformLocation(pr,'dep'),1);gl.uniform1i(gl.getUniformLocation(pr,'msk'),2);
      gl.uniform1f(gl.getUniformLocation(pr,'ov'),im.classList.contains('a54-paper-overflow')?1:0);
      return{cv,gl,um:gl.getUniformLocation(pr,'m'),ut:gl.getUniformLocation(pr,'t')};
    });
    ex.classList.add('gl');
    const size=()=>views.forEach(o=>{const r=o.cv.getBoundingClientRect(),k=Math.min(2,devicePixelRatio||1);o.cv.width=Math.max(1,Math.round(r.width*k));o.cv.height=Math.max(1,Math.round(r.height*k));o.gl.viewport(0,0,o.cv.width,o.cv.height)});
    size();addEventListener('resize',size);

    /* 3 · mouse (ou deriva lenta sem mouse) e rolagem */
    const fine=matchMedia('(hover: hover) and (pointer: fine)').matches;
    let tx=0,ty=0,mx=0,my=0,on=false;
    if(fine){ex.addEventListener('pointermove',e=>{const r=ex.getBoundingClientRect();tx=(e.clientX-r.left)/r.width-.5;ty=(e.clientY-r.top)/r.height-.5});ex.addEventListener('pointerleave',()=>{tx=ty=0})}
    new IntersectionObserver(es=>es.forEach(e=>on=e.isIntersecting),{rootMargin:'120px'}).observe(ex);
    const t0=performance.now();
    const frame=now=>{
      if(on){
        const t=(now-t0)/1000;
        const r=ex.getBoundingClientRect(),k=(r.top+r.height/2-innerHeight/2)/innerHeight;
        const ix=fine?tx:.35*Math.sin(t*.3),iy=(fine?ty:.25*Math.cos(t*.23))+k*.6;
        mx+=(ix-mx)*.06;my+=(iy-my)*.06;
        views.forEach(o=>{o.gl.uniform2f(o.um,mx,my);o.gl.uniform1f(o.ut,t);o.gl.drawArrays(o.gl.TRIANGLE_STRIP,0,4)});
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }).catch(()=>{});
})();

/* assinatura dos fundadores com as duas fotos */
(function(){const hp=document.querySelector('.hero-people');if(!hp||hp.querySelector('.hp-faces'))return;
  const t=document.createElement('span');t.className='hp-text';while(hp.firstChild)t.appendChild(hp.firstChild);
  const f=document.createElement('span');f.className='hp-faces';f.setAttribute('aria-hidden','true');
  f.innerHTML='<img src="img/img-5-5cc64970.jpg" alt="" width="52" height="52"><img src="img/img-4-448280f5.jpg" alt="" width="52" height="52">';
  hp.append(f,t)})();

/* Uma direção → O trabalho que ela exige: fios entre as escolhas e as mudanças */
(function(){
  const c=document.querySelector('.a54-project-composition');if(!c)return;
  const grid=c.querySelector('.a54-project-grid');
  const L=[...c.querySelectorAll('.a54-project-left .pj-item')],R=[...c.querySelectorAll('.a54-project-right .pj-item')];
  if(!grid||L.length<3||R.length<4)return;
  // clientes → oferta, entrega · ofertas → oferta, materiais · posição → marca, materiais
  const links=[[0,0],[0,3],[1,0],[1,2],[2,1],[2,2]];
  [...L,...R].forEach(it=>{const d=document.createElement('span');d.className='pj-dot';d.setAttribute('aria-hidden','true');it.appendChild(d)});
  L.forEach((it,i)=>it.style.setProperty('--d',120+i*140));
  R.forEach((it,j)=>{const first=links.findIndex(l=>l[1]===j);it.style.setProperty('--d',700+first*160+500)});
  const NS='http://www.w3.org/2000/svg',svg=document.createElementNS(NS,'svg');
  svg.setAttribute('class','pj-wires');svg.setAttribute('aria-hidden','true');grid.prepend(svg);
  svg.innerHTML='<defs><linearGradient id="pjg" gradientUnits="userSpaceOnUse" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#58784A"/><stop offset=".55" stop-color="#86A372"/><stop offset="1" stop-color="#C5D9AB"/></linearGradient></defs>';
  const grad=svg.querySelector('#pjg');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const paths=links.map(([a,b],k)=>{
    const p=document.createElementNS(NS,'path');p.setAttribute('id','pjw'+k);p.setAttribute('pathLength','1');
    p.style.transitionDelay=(700+k*160)+'ms';p.dataset.a=a;p.dataset.b=b;svg.appendChild(p);
    if(!reduce){const ci=document.createElementNS(NS,'circle');ci.setAttribute('r','2.6');
      const m=document.createElementNS(NS,'animateMotion');m.setAttribute('dur',(3.4+k*.35).toFixed(2)+'s');m.setAttribute('repeatCount','indefinite');m.setAttribute('begin',(k*.55).toFixed(2)+'s');
      const mp=document.createElementNS(NS,'mpath');mp.setAttribute('href','#pjw'+k);m.appendChild(mp);ci.appendChild(m);svg.appendChild(ci)}
    return p});
  const draw=()=>{
    if(innerWidth<901)return;
    const g=grid.getBoundingClientRect();
    const la=L[0].querySelector('.pj-dot').getBoundingClientRect(),rb=R[0].querySelector('.pj-dot').getBoundingClientRect();grad.setAttribute('x1',(la.left-g.left).toFixed(0));grad.setAttribute('x2',(rb.right-g.left).toFixed(0));
    paths.forEach(p=>{
      const a=L[p.dataset.a].querySelector('.pj-dot').getBoundingClientRect(),b=R[p.dataset.b].querySelector('.pj-dot').getBoundingClientRect();
      const x1=a.left+a.width/2-g.left,y1=a.top+a.height/2-g.top,x2=b.left+b.width/2-g.left,y2=b.top+b.height/2-g.top,dx=(x2-x1)*.55;
      p.setAttribute('d',`M${x1.toFixed(1)} ${y1.toFixed(1)}C${(x1+dx).toFixed(1)} ${y1.toFixed(1)} ${(x2-dx).toFixed(1)} ${y2.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`)});
  };
  draw();addEventListener('resize',draw);document.fonts&&document.fonts.ready.then(draw);addEventListener('load',draw);
  if('ResizeObserver' in window)new ResizeObserver(draw).observe(grid);
  const burst=ms=>{const t0=performance.now();const f=()=>{draw();if(performance.now()-t0<ms)requestAnimationFrame(f)};f()};
  c.addEventListener('transitionend',e=>{if(e.target.closest('.a54-project-grid>*')&&!e.target.classList.contains('pj-item'))draw()});
  new MutationObserver(()=>{if(c.classList.contains('p-in')&&!c.classList.contains('p-on')){burst(3200);setTimeout(()=>c.classList.add('p-on'),2400)}}).observe(c,{attributes:true,attributeFilter:['class']});
  document.querySelectorAll('.a54-project-grid>*').forEach(el=>new MutationObserver(()=>burst(2200)).observe(el,{attributes:true,attributeFilter:['class']}));
  if(c.classList.contains('p-in'))c.classList.add('p-on');
  // passar o mouse num tópico acende só os fios dele
  const set=(side,i)=>{c.classList.add('hov');
    const on=links.map(([a,b])=>side==='L'?a===i:b===i);
    paths.forEach((p,k)=>p.classList.toggle('hl',on[k]));
    L.forEach((it,a)=>it.classList.toggle('hl',side==='L'?a===i:links.some(([x,y],k)=>on[k]&&x===a)));
    R.forEach((it,b)=>it.classList.toggle('hl',side==='R'?b===i:links.some(([x,y],k)=>on[k]&&y===b)));
  };
  const clr=()=>{c.classList.remove('hov');[...paths,...L,...R].forEach(e=>e.classList.remove('hl'))};
  L.forEach((it,i)=>{it.addEventListener('mouseenter',()=>set('L',i));it.addEventListener('mouseleave',clr)});
  R.forEach((it,i)=>{it.addEventListener('mouseenter',()=>set('R',i));it.addEventListener('mouseleave',clr)});
})();

/* instrumentos: destaca a abertura da frase sem mudar o texto */
(function(){const c=document.querySelector('.approach-caption');if(!c||c.querySelector('.ac-lead'))return;
  const k='Mesmo sem dados organizados,';const t=c.firstChild;if(!t||t.nodeType!==3||!t.data.startsWith(k))return;
  const s=document.createElement('span');s.className='ac-lead';s.textContent=k;t.data=t.data.slice(k.length);c.insertBefore(s,t)})();
