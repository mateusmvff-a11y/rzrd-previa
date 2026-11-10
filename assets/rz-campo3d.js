/* Rzrd. topo da V1, versão 3D: o mesmo diagrama do original, com a mesma informação e os mesmos
   quatro atos, num espaço real. Câmera que se aproxima e inclina a cada ato, profundidade (o que está
   longe some), 120 pontos nítidos, órbitas que se desenham, fios com luz correndo por dentro e os nomes
   das seis forças em etiquetas HTML (texto de verdade, não desenhado no canvas).
   Uso: RzCampo3D(canvas,{section, labels:elementoParaEtiquetas, layout(w,h)->{x,y,s}, onStage(i,u)})
   -> null sem WebGL. layout devolve o centro do diagrama em px e a escala. */
(function(w){
  var cl=function(v,a,b){return Math.min(b,Math.max(a,v))};
  var sm=function(x){x=cl(x,0,1);return x*x*(3-2*x)};
  var ioQ=function(x){x=cl(x,0,1);return x<.5?8*x*x*x*x:1-Math.pow(-2*x+2,4)/2};
  var E8=Math.exp(-8),oX=function(p){p=cl(p,0,1);return (1-Math.exp(-8*p)*(1+8*p))/(1-9*E8)};
  function rnd(i,k){var x=Math.sin(i*127.1+k*311.7)*43758.5453;return x-Math.floor(x)}

  w.RzCampo3D=function(cv,o){
    var T=w.THREE;if(!T)return null;
    var R3;try{R3=new T.WebGLRenderer({canvas:cv,antialias:true,alpha:true})}catch(e){return null}
    if(!R3.getContext())return null;
    var rm=w.matchMedia('(prefers-reduced-motion: reduce)').matches,sec=o.section||cv;
    var PR=Math.min(w.devicePixelRatio||1,2);R3.setPixelRatio(PR);
    var BG=new T.Color(o.bg||0x142327);R3.setClearColor(BG,1);var sc=new T.Scene();sc.fog=new T.Fog(BG,12,26);
    var cam=new T.PerspectiveCamera(30,1,.1,100);cam.position.set(0,0,15);
    var G=new T.Group();sc.add(G);
    var R=4,NP=120,NR=10,PRG=12,HD=38000,brk=[0,.25,.5,.75,1];
    var C={line:new T.Color(0x96c8d6),acc:new T.Color(0x69D1EB),f:[new T.Color(0x69D1EB),new T.Color(0xBEE8F3),new T.Color(0x48A0BE)]};
    var WORDS=o.words||['Mercado','Pessoas','Negócio','Cultura','Concorrência','Ambição'];
    var CEN=[[-.48,-.17],[.46,-.22],[.04,.47]];
    var HUB=[[-.75,-.30],[.67,-.39],[-.08,.67],[-.40,.25],[.38,.30],[.05,-.22]];
    var LNK=[[0,5],[5,1],[0,3],[3,2],[2,4],[4,1],[3,5],[5,4],[3,4],[0,2],[1,2]];
    var ADD=T.NormalBlending;

    /* órbitas, régua e campo panorâmico */
    function circle(r,n){var p=[];for(var i=0;i<=n;i++){var a=i/n*Math.PI*2-Math.PI/2;p.push(Math.cos(a)*r,0,Math.sin(a)*r)}var g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(p,3));return g}
    var rings=[];for(var k=0;k<NR;k++){var L=new T.Line(circle(R*(.2+.8*k/(NR-1)),160),new T.LineBasicMaterial({color:C.line,transparent:true,opacity:.3,blending:ADD,depthWrite:false,fog:true}));G.add(L);rings.push(L)}
    var pano=[];for(var b=0;b<6;b++){var Lp=new T.Line(circle(R*(1.5+b*.48),200),new T.LineBasicMaterial({color:C.line,transparent:true,opacity:.07-b*.009,blending:ADD,depthWrite:false,fog:true}));G.add(Lp);pano.push(Lp)}
    var tp=[];for(var t2=0;t2<120;t2++){var a2=t2/120*Math.PI*2,ln=t2%10===0?.06:(t2%5===0?.04:.02);tp.push(Math.cos(a2)*R,0,Math.sin(a2)*R,Math.cos(a2)*R*(1-ln),0,Math.sin(a2)*R*(1-ln))}
    var tg=new T.BufferGeometry();tg.setAttribute('position',new T.Float32BufferAttribute(tp,3));
    var ticks=new T.LineSegments(tg,new T.LineBasicMaterial({color:C.line,transparent:true,opacity:.5,blending:ADD,depthWrite:false,fog:true}));G.add(ticks);

    /* pontos: disco nítido com borda suave, tamanho e brilho caem com a distância */
    var pPos=new Float32Array(NP*3),pCol=new Float32Array(NP*3),pA=new Float32Array(NP),pS=new Float32Array(NP);
    for(var i=0;i<NP;i++){var cf=C.f[i%3];pCol[i*3]=cf.r;pCol[i*3+1]=cf.g;pCol[i*3+2]=cf.b;pS[i]=1}
    var pg=new T.BufferGeometry();pg.setAttribute('position',new T.BufferAttribute(pPos,3));pg.setAttribute('aColor',new T.BufferAttribute(pCol,3));pg.setAttribute('aA',new T.BufferAttribute(pA,1));pg.setAttribute('aS',new T.BufferAttribute(pS,1));
    var pm=new T.ShaderMaterial({transparent:true,depthWrite:false,blending:ADD,uniforms:{uSize:{value:7},uPR:{value:PR},uN:{value:12},uF:{value:24},uD:{value:15}},
      vertexShader:'attribute vec3 aColor;attribute float aA;attribute float aS;uniform float uSize;uniform float uPR;uniform float uN;uniform float uF;uniform float uD;varying vec3 vC;varying float vA;void main(){vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;float z=-mv.z;gl_PointSize=uSize*aS*uPR*(uD/z);vA=aA*(1.-.7*smoothstep(uN,uF,z));vC=aColor;}',
      fragmentShader:'varying vec3 vC;varying float vA;void main(){float d=length(gl_PointCoord-.5);float a=smoothstep(.5,.34,d);float core=smoothstep(.22,.0,d);gl_FragColor=vec4(min(vC*(.9+core*.3),vec3(1.)),a*vA);}'});
    var pts=new T.Points(pg,pm);G.add(pts);

    /* fios dinâmicos (teia, ligações, pontes com luz correndo, sinais, onda, lente) */
    var MAXS=1400,lPos=new Float32Array(MAXS*6),lCol=new Float32Array(MAXS*6),ls=0;
    var lg=new T.BufferGeometry();lg.setAttribute('position',new T.BufferAttribute(lPos,3));lg.setAttribute('color',new T.BufferAttribute(lCol,3));
    var lines=new T.LineSegments(lg,new T.LineBasicMaterial({vertexColors:true,depthWrite:false,fog:true}));G.add(lines);
    function seg(x1,y1,z1,x2,y2,z2,c,a1,a2){if(ls>=MAXS)return;var j=ls*6;lPos[j]=x1;lPos[j+1]=y1;lPos[j+2]=z1;lPos[j+3]=x2;lPos[j+4]=y2;lPos[j+5]=z2;
      a1=Math.min(1,a1);lCol[j]=BG.r+(c.r-BG.r)*a1;lCol[j+1]=BG.g+(c.g-BG.g)*a1;lCol[j+2]=BG.b+(c.b-BG.b)*a1;var b2=Math.min(1,a2===undefined?a1:a2);lCol[j+3]=BG.r+(c.r-BG.r)*b2;lCol[j+4]=BG.g+(c.g-BG.g)*b2;lCol[j+5]=BG.b+(c.b-BG.b)*b2;ls++}
    function curve(A,B,ctrl,c,base,t,pulse,draw){var N=28,px=A[0],pz=A[1],lim=Math.ceil(N*(draw===undefined?1:draw));
      for(var s=1;s<=lim;s++){var u=s/N,x=(1-u)*(1-u)*A[0]+2*(1-u)*u*ctrl[0]+u*u*B[0],z=(1-u)*(1-u)*A[1]+2*(1-u)*u*ctrl[1]+u*u*B[1];
        var pl=pulse?Math.max(0,1-Math.abs(((u-t)%1+1)%1-.0)/.14)+Math.max(0,1-Math.abs(((u-t)%1+1)%1-1)/.14):0;
        seg(px,0,pz,x,0,z,c,base+pl*.9);px=x;pz=z}}

    /* etiquetas HTML */
    var lab=o.labels,chips=[],pot=null;
    if(lab){WORDS.forEach(function(wd){var e=document.createElement('span');e.className='rz-chip';e.innerHTML='<i></i>'+wd;lab.appendChild(e);chips.push(e)});
      pot=document.createElement('span');pot.className='rz-chip rz-pot';pot.textContent='Potencial';lab.appendChild(pot)}

    var cw=0,ch=0,L0={x:0,y:0,s:1};
    function fit(){cw=cv.clientWidth;ch=cv.clientHeight;if(!cw||!ch)return;R3.setSize(cw,ch,false);cam.aspect=cw/ch;
      L0=o.layout(cw,ch);
      /* desloca o centro óptico para o ponto do layout, sem distorcer */
      cam.setViewOffset(cw,ch,(cw/2-L0.x),(ch/2-L0.y),cw,ch);cam.updateProjectionMatrix()}
    fit();w.addEventListener('resize',fit);

    /* mouse: inclinação leve e lente no plano */
    var mx=0,my=0,pmx=0,pmy=0,hmon=false,lk=0,ray=new T.Raycaster(),nd=new T.Vector2(),plane=new T.Plane(),hit=new T.Vector3(),lens=new T.Vector3(),inv=new T.Matrix4();
    sec.addEventListener('pointermove',function(e){if(e.pointerType==='touch')return;var b=cv.getBoundingClientRect();nd.set((e.clientX-b.left)/b.width*2-1,-((e.clientY-b.top)/b.height)*2+1);mx=(e.clientX-b.left-L0.x)/cw;my=(e.clientY-b.top-L0.y)/ch;hmon=true});
    sec.addEventListener('pointerleave',function(){hmon=false});

    /* posições de cada ato (no plano: x, z) */
    function orb(i,Tm,noise,tight){var k=Math.floor(i/PRG),j=i%PRG,rk=R*(.2+.8*k/(NR-1))*tight,dir=k%2?1:-1,om=.00009*(1.7-k*.13)*dir;
      var th=j/PRG*6.283185+k*.62+Tm*om+(noise?(rnd(i,7)-.5)*1.4*noise:0),rr=1+(noise?(rnd(i,8)-.5)*noise:0);return [rk*rr*Math.cos(th),rk*rr*Math.sin(th),noise?(rnd(i,9)-.5)*.5*noise:0]}
    function shape(i,Tm){var f=i%3,idx=(i-f)/3,bx=CEN[f][0]*R,bz=CEN[f][1]*R*1.5,x,z;
      if(f===0){var th=idx*2.39996+Tm*.00009,rad=R*(.09+.29*Math.sqrt((idx+.5)/40));x=bx+Math.cos(th)*rad;z=bz+Math.sin(th)*rad}
      else if(f===1){var u=(idx%8)/7-.5,v=(Math.floor(idx/8)%5)/4-.5;x=bx+u*R*.55;z=bz+v*R*.5}
      else{var t3=idx*2.39996+Tm*.00008,rd=R*(.10+.28*Math.sqrt((idx+.5)/40));x=bx+Math.cos(t3)*rd*(1+.13*Math.sin(t3*3));z=bz+Math.sin(t3)*rd}
      return [x,z,0]}
    function hubXZ(h){return [h[0]*R,h[1]*R*1.5]}
    function hubPos(i,Tm){var hi=(i*7+Math.floor(i/9))%6,h=hubXZ(HUB[hi]),a=i*2.39996+Tm*.000045*(hi%2?1:-1),rr=R*(.065+.115*Math.sqrt((i%29)/29));return [h[0]+Math.cos(a)*rr,h[1]+Math.sin(a)*rr,Math.sin(a*2)*.08]}
    function tgt(st,i,Tm){return st===0?orb(i,Tm,.28,1):st===1?orb(i,Tm,0,.8):st===2?shape(i,Tm):hubPos(i,Tm)}

    /* câmera por ato: inclinação do plano, distância */
    var CAM=[{tilt:.5,dist:15.5},{tilt:.95,dist:13.6},{tilt:.62,dist:14.4},{tilt:.46,dist:16.6}];
    var el=rm?HD*.62:0,last=0,paused=rm,visible=true,yaw=0,X=new Float32Array(NP),Z=new Float32Array(NP),Y=new Float32Array(NP),init=false,v3=new T.Vector3();
    new IntersectionObserver(function(es){visible=es[0].isIntersecting},{rootMargin:'60px'}).observe(cv);

    function frame(now){
      requestAnimationFrame(frame);
      if(!visible)return;
      var dt=last?Math.min(50,now-last):16;last=now;if(!paused)el+=dt;
      var p=(el%HD)/HD,ph=0;for(var k=0;k<4;k++){if(p>=brk[k]&&p<brk[k+1])ph=k}
      var q=(p-brk[ph])/(brk[ph+1]-brk[ph]),Tm=el,prev=(ph+3)%4,first=el<HD*.25,lt=q*HD/4;
      if(first&&ph===0)prev=0;
      if(o.onStage)o.onStage(ph,q);
      /* câmera: do ato anterior para o atual em 2,6 s */
      var cA=CAM[first&&ph===0?0:prev],cB=CAM[ph],cm=ioQ(lt/2600),tilt=cA.tilt+(cB.tilt-cA.tilt)*cm,dist=cA.dist+(cB.dist-cA.dist)*cm;
      if(first)dist+=(1-oX(el/2600))*3.5;
      if(!paused)yaw+=dt*.000045;
      pmx+=((hmon?mx:0)-pmx)*.05;pmy+=((hmon?my:0)-pmy)*.05;
      G.rotation.set(tilt+pmy*.18,yaw+pmx*.35,-.13,'XYZ');
      var sy=w.scrollY||0,spg=cl(sy/(sec.offsetHeight||800),0,1);
      var cd=dist*L0.s*(1+.15*sm(spg));cam.position.set(0,0,cd);cam.lookAt(0,0,0);sc.fog.near=cd-R*.35;sc.fog.far=cd+R*2.6;pm.uniforms.uN.value=cd-R*.35;pm.uniforms.uF.value=cd+R*2.2;pm.uniforms.uD.value=cd*.98;
      G.updateMatrixWorld();

      /* órbitas aparecem, se fecham e somem como no original; na entrada se desenham do centro para fora */
      var RA=ph===0?(first?1:sm(q/.3)):(ph===1?1:(ph===2?1-sm(q/.35):0)),tf=ph===1?1-.2*ioQ(q/.45):(ph===0?1:.8);
      rings.forEach(function(L,k2){var sw=first?oX((el-150-k2*90)/1700):1;L.geometry.setDrawRange(0,Math.max(0,Math.ceil(161*sw)));L.scale.setScalar(tf);L.material.opacity=(.16+.22*(k2/(NR-1)))*RA;L.visible=RA>.005});
      ticks.scale.setScalar(tf);ticks.material.opacity=.5*RA*(first?oX((el-1300)/1600):1);
      pano.forEach(function(L,b2){var sw=first?oX((el-500-b2*120)/2200):1;L.geometry.setDrawRange(0,Math.ceil(201*sw));L.rotation.y=Math.sin(el*.00008+b2)*.05});

      /* pontos */
      for(var i=0;i<NP;i++){
        var A=tgt(prev,i,Tm),B=tgt(ph,i,Tm),dl=cl(Math.hypot(B[0],B[1])/(R*1.15),0,1)*.55+rnd(i,3)*.2,s0=ioQ((q-dl*.22)/.44);
        var x=A[0]+(B[0]-A[0])*s0,z=A[1]+(B[1]-A[1])*s0,y=A[2]+(B[2]-A[2])*s0,ia=1;
        if(first&&el<5200){var e0=oX((el/1000-.5-dl*.9)/1.6);x*=e0;z*=e0;ia=cl(e0*1.5,0,1)}
        if(!init){X[i]=x;Z[i]=z;Y[i]=y}X[i]+=(x-X[i])*.35;Z[i]+=(z-Z[i])*.35;Y[i]+=(y-Y[i])*.35;
        pPos[i*3]=X[i];pPos[i*3+1]=Y[i];pPos[i*3+2]=Z[i];pA[i]=.95*ia;pS[i]=1+.25*Math.sin(Math.PI*cl(s0,0,1));
      }
      init=true;
      ls=0;
      /* lente: ponto do mouse no plano do diagrama */
      lk+=((hmon?1:0)-lk)*.07;
      if(lk>.01){plane.setFromNormalAndCoplanarPoint(v3.set(0,1,0).applyQuaternion(G.quaternion),G.position);ray.setFromCamera(nd,cam);
        if(ray.ray.intersectPlane(plane,hit)){inv.copy(G.matrixWorld).invert();lens.copy(hit).applyMatrix4(inv)}
        var LR=R*.32,ins=[];for(var i5=0;i5<NP;i5++){var dd=Math.hypot(X[i5]-lens.x,Z[i5]-lens.z);if(dd<LR){ins.push(i5);var pr=1-dd/LR;pS[i5]*=1+.6*lk*pr;pA[i5]=Math.min(1,pA[i5]*(1+.4*lk*pr))}}
        for(var ia2=0;ia2<ins.length;ia2++)for(var ib=ia2+1;ib<ins.length;ib++){var a5=ins[ia2],b5=ins[ib];if(Math.hypot(X[a5]-X[b5],Z[a5]-Z[b5])<R*.32)seg(X[a5],Y[a5],Z[a5],X[b5],Y[b5],Z[b5],C.line,.5*lk)}
        var N3=48;for(var c3=0;c3<N3;c3++){var u1=c3/N3*6.2832,u2=(c3+1)/N3*6.2832;seg(lens.x+Math.cos(u1)*LR,0,lens.z+Math.sin(u1)*LR,lens.x+Math.cos(u2)*LR,0,lens.z+Math.sin(u2)*LR,C.line,.22*lk)}}
      /* ato 2: teia polar */
      var wl=ph===1?sm((q-.3)/.3):(ph===2?1-sm(q/.3):0);
      if(wl>.01)for(var i2=0;i2<NP;i2++){var kk=Math.floor(i2/PRG),jj=i2%PRG,nx=kk*PRG+(jj+1)%PRG;seg(X[i2],Y[i2],Z[i2],X[nx],Y[nx],Z[nx],C.line,.32*wl);if(kk<NR-1)seg(X[i2],Y[i2],Z[i2],X[i2+PRG],Y[i2+PRG],Z[i2+PRG],C.line,.22*wl)}
      /* ato 3: ligações dentro de cada expressão */
      var wc=ph===2?sm((q-.45)/.3):(ph===3?1-sm(q/.25):0);
      if(wc>.01)for(var i4=0;i4<NP-3;i4++){if(Math.hypot(X[i4]-X[i4+3],Z[i4]-Z[i4+3])<R*.26)seg(X[i4],Y[i4],Z[i4],X[i4+3],Y[i4+3],Z[i4+3],C.f[i4%3],.34*wc)}
      /* ato 4: sinais ao centro, pontes com luz correndo, núcleos e a onda */
      var reset=ph===3?sm((q-.88)/.12):0,evolved=ph===3?sm((q-.18)/.35)*(1-reset):0,signal=ph===3?sm(q/.1)*(1-sm((q-.34)/.16)):0;
      if(signal>.01)CEN.forEach(function(o2,k3){var A2=[o2[0]*R,o2[1]*R*1.5];curve(A2,[0,0],[A2[0]*.2,A2[1]*.18],C.f[k3],.18*signal,(q*2.4+k3*.1)%1,true)});
      if(evolved>.01){
        LNK.forEach(function(l,j){var A3=hubXZ(HUB[l[0]]),B3=hubXZ(HUB[l[1]]),ctrl=[(A3[0]+B3[0])/2+Math.sin(j*2.4)*R*.07,(A3[1]+B3[1])/2+Math.cos(j*1.8)*R*.07];
          curve(A3,B3,ctrl,C.acc,.22*evolved,(el*.00022+j*.17)%1,true,sm(evolved*1.4-j*.035))});
        HUB.forEach(function(h,i6){var c6=hubXZ(h),N4=36,r6=.16*evolved;for(var c4=0;c4<N4;c4++){var u3=c4/N4*6.2832,u4=(c4+1)/N4*6.2832;seg(c6[0]+Math.cos(u3)*r6,0,c6[1]+Math.sin(u3)*r6,c6[0]+Math.cos(u4)*r6,0,c6[1]+Math.sin(u4)*r6,C.f[i6%3],.6*evolved)}});
        var wave=sm((q-.5)/.4)*evolved;if(wave>.01){var rw=R*(.4+2.4*wave),N5=96;for(var c5=0;c5<N5;c5++){var u5=c5/N5*6.2832,u6=(c5+1)/N5*6.2832;seg(Math.cos(u5)*rw,0,Math.sin(u5)*rw,Math.cos(u6)*rw,0,Math.sin(u6)*rw,C.acc,.35*(1-wave))}}
      }
      lg.setDrawRange(0,ls*2);lg.attributes.position.needsUpdate=true;lg.attributes.color.needsUpdate=true;
      pg.attributes.position.needsUpdate=true;pg.attributes.aA.needsUpdate=true;pg.attributes.aS.needsUpdate=true;
      R3.render(sc,cam);

      /* etiquetas: as seis forças no primeiro ato, o potencial no segundo */
      if(lab){
        var wv=ph===0?(first?sm((el-1600)/1200):sm(q/.12))*(1-sm((q-.78)/.2)):0;
        chips.forEach(function(e,i7){var lw=cl(wv*1.7-i7*.12,0,1),an=i7*Math.PI/3+el*.000013;
          v3.set(Math.cos(an)*R*1.16,0,Math.sin(an)*R*1.16).applyMatrix4(G.matrixWorld).project(cam);
          var sx=(v3.x*.5+.5)*cw,sy2=(-v3.y*.5+.5)*ch;e.style.opacity=lw.toFixed(3);e.style.transform='translate3d('+sx.toFixed(1)+'px,'+(sy2+(1-oX(lw))*8).toFixed(1)+'px,0) translate(-50%,-50%)'});
        var pv=ph===1?sm((q-.12)/.2)*(1-sm((q-.62)/.25)):0;
        v3.set(0,0,0).applyMatrix4(G.matrixWorld).project(cam);pot.style.opacity=pv.toFixed(3);
        pot.style.transform='translate3d('+((v3.x*.5+.5)*cw).toFixed(1)+'px,'+((-v3.y*.5+.5)*ch+(1-oX(pv))*8-34).toFixed(1)+'px,0) translate(-50%,-50%)';
      }
    }
    requestAnimationFrame(frame);
    return {pause:function(v){paused=v},paused:function(){return paused},fit:fit,
      seek:function(s){el=HD+Math.floor(s)*HD/4+(s%1)*HD/4+1}};
  };
})(window);
