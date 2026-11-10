/* Rzrd. topo: órbita em quatro atos (Compreender, Encontrar a direção, Dar forma, Evoluir).
   Uma peça de motion só, desenhada em vetor: poucos elementos, curvas de motion (outExpo, inOutQuart),
   stagger curto e uma forma virando a outra. Sem brilho, sem texto contornado, sem chuva de partículas.
   Uso: RzOrbit(canvas,{section, layout(w,h)->{cx,cy,R}, colors:{line,node,acc,text}, onStage(i,u)}) */
(function(w){
  var cl=function(v,a,b){return Math.min(b,Math.max(a,v))};
  var E8=Math.exp(-8),outExpo=function(p){p=cl(p,0,1);return (1-Math.exp(-8*p)*(1+8*p))/(1-9*E8)};
  var ioQuart=function(p){p=cl(p,0,1);return p<.5?8*p*p*p*p:1-Math.pow(-2*p+2,4)/2};
  var outBack=function(p){p=cl(p,0,1);var c=1.2;return 1+(c+1)*Math.pow(p-1,3)+c*Math.pow(p-1,2)};
  var seg=function(t,a,b,f){return (f||outExpo)((t-a)/(b-a))};
  var lerp=function(a,b,t){return a+(b-a)*t};

  w.RzOrbit=function(cv,o){
    var c=cv.getContext('2d'),W=0,H=0,G={cx:0,cy:0,R:100},C=o.colors;
    var ST=5200,CY=ST*4,K=.44,RO=-.12,cr=Math.cos(RO),sr=Math.sin(RO),DIR=-.62;
    var WORDS=o.words||['Mercado','Pessoas','Negócio','Cultura','Concorrência','Ambição'];
    var rm=w.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var el=rm?ST*2+3000:0,last=0,paused=rm,cur=-1,mx=0,my=0,px=0,py=0,hover=false;
    function fit(){var d=Math.min(w.devicePixelRatio||1,2);W=cv.clientWidth;H=cv.clientHeight;cv.width=W*d;cv.height=H*d;c.setTransform(d,0,0,d,0,0);G=o.layout(W,H)}
    fit();w.addEventListener('resize',fit);
    (o.section||cv).addEventListener('pointermove',function(e){if(e.pointerType==='touch')return;var b=cv.getBoundingClientRect();mx=(e.clientX-b.left-G.cx)/W;my=(e.clientY-b.top-G.cy)/H;hover=true});
    (o.section||cv).addEventListener('pointerleave',function(){hover=false});
    function ring(r,a){var x=r*Math.cos(a),y=r*Math.sin(a)*K;return [G.cx+px+x*cr-y*sr,G.cy+py+x*sr+y*cr]}
    function ell(r,a0,a1){c.beginPath();c.ellipse(G.cx+px,G.cy+py,r,r*K,RO,a0,a1)}
    function rgba(k,a){return 'rgba('+C[k]+','+cl(a,0,1).toFixed(3)+')'}

    function frame(now){
      var dt=last?Math.min(50,now-last):16;last=now;
      var sec=o.section||cv,rb=sec.getBoundingClientRect();
      if(rb.bottom<0||rb.top>w.innerHeight){requestAnimationFrame(frame);return}
      if(!paused)el+=dt;
      px+=((hover?-mx*26:0)-px)*.05;py+=((hover?-my*18:0)-py)*.05;
      var R=G.R,tau=el%CY,st=Math.floor(tau/ST),lt=tau-st*ST,first=el<CY,intro=first?el:1e9;
      if(st!==cur){cur=st}
      if(o.onStage)o.onStage(st,lt/ST);
      c.clearRect(0,0,W,H);
      var drift=el*.000035;

      /* anéis: abrem (ato 1), fecham num só (ato 2), seguram (ato 3), voltam (ato 4) */
      var col=st===1?ioQuart((lt-80)/1500):st===2?1:st===3?1-ioQuart((lt-2500)/2300):0;
      var NRG=5,base=[];for(var k=0;k<NRG;k++)base.push(R*(.36+.16*k));
      for(var k2=0;k2<NRG;k2++){
        var rr=lerp(base[k2],R*.84,col),al=(k2===NRG-1?.5:.26)*(1-col*(k2===NRG-1?.25:.72));
        var sw=first?outExpo((intro-150-k2*90)/1500):1;if(sw<=0)continue;
        ell(rr,-Math.PI/2,-Math.PI/2+Math.PI*2*sw);c.strokeStyle=rgba('line',al);c.lineWidth=1;c.stroke();
      }
      /* régua no anel de fora */
      var tv=(1-col)*(first?outExpo((intro-700)/1600):1);
      if(tv>.01){c.beginPath();for(var t2=0;t2<96;t2++){var a=t2/96*Math.PI*2,ln=t2%8===0?.045:.022,p1=ring(base[4],a),p2=ring(base[4]*(1-ln),a);c.moveTo(p1[0],p1[1]);c.lineTo(p2[0],p2[1])}c.strokeStyle=rgba('line',.34*tv);c.lineWidth=1;c.stroke()}
      /* varredura: um arco curto de luz que percorre o anel (o único elemento em giro contínuo) */
      var sv=tv*(st===0||st===3?1:.4);
      if(sv>.01){var a0=el*.00032;for(var s2=0;s2<22;s2++){var aa=a0-s2*.026,q1=ring(base[4],aa),q2=ring(base[4],aa-.026);c.beginPath();c.moveTo(q1[0],q1[1]);c.lineTo(q2[0],q2[1]);c.strokeStyle=rgba('acc',sv*(1-s2/22)*.95);c.lineWidth=1.6;c.stroke()}}

      /* posições dos seis pontos em cada ato */
      var N=6,pos=[],hexR=st===3?lerp(1,1.12,ioQuart(lt/1800)):1,hexRot=st===3?ioQuart(lt/1800)*Math.PI/6:0;
      function rp(i){return ring(base[4],i*Math.PI/3+drift+.35)}
      function lp(i){var d=R*(.16+.17*i);return [G.cx+px+Math.cos(DIR)*d,G.cy+py+Math.sin(DIR)*d]}
      function hp(i,s,rt){var a=i*Math.PI/3-Math.PI/2+(rt||0),r=R*.6*(s||1);return [G.cx+px+Math.cos(a)*r,G.cy+py+Math.sin(a)*r]}
      for(var i=0;i<N;i++){
        var A,B,m;
        if(st===0){pos.push(rp(i));continue}
        if(st===1){A=rp(i);B=lp(i);m=outExpo((lt-260-i*70)/1700)}
        else if(st===2){A=lp(i);B=hp(i);m=outExpo((lt-160-i*70)/1700)}
        else{A=hp(i,hexR,hexRot);B=rp(i);m=ioQuart((lt-2300-i*60)/2400)}
        pos.push([lerp(A[0],B[0],m),lerp(A[1],B[1],m)]);
      }

      /* ato 1: fios do centro até cada força, um depois do outro */
      if(st===0){
        for(var i1=0;i1<N;i1++){var f=seg(lt,500+i1*80,1500+i1*80)*(1-seg(lt,4300,5100,ioQuart))*(first?seg(intro,1300,2200):1);if(f<=.01)continue;
          var P=pos[i1],ex=lerp(G.cx+px,P[0],f),ey=lerp(G.cy+py,P[1],f);c.beginPath();c.moveTo(G.cx+px,G.cy+py);c.lineTo(ex,ey);c.strokeStyle=rgba('line',.3);c.lineWidth=1;c.stroke()}
      }
      /* ato 2: o vetor de direção */
      var vv=st===1?seg(lt,1300,2700):st===2?1-seg(lt,0,900,ioQuart):0;
      if(vv>.01){
        var L=R*1.16*(st===1?vv:1),tx=G.cx+px+Math.cos(DIR)*L,ty=G.cy+py+Math.sin(DIR)*L,al2=st===2?vv:1;
        c.beginPath();c.moveTo(G.cx+px,G.cy+py);c.lineTo(tx,ty);c.strokeStyle=rgba('acc',al2);c.lineWidth=1.6;c.stroke();
        var hl=9;c.beginPath();c.moveTo(tx-Math.cos(DIR-.42)*hl,ty-Math.sin(DIR-.42)*hl);c.lineTo(tx,ty);c.lineTo(tx-Math.cos(DIR+.42)*hl,ty-Math.sin(DIR+.42)*hl);c.stroke();
      }
      /* ato 3: a forma (hexágono, raios e o triângulo das três frentes) */
      var fv=st===2?1:st===3?1-seg(lt,2400,4300,ioQuart):0;
      if(fv>.01){
        for(var j=0;j<N;j++){var e=st===2?seg(lt,900+j*80,1900+j*80):1;if(e<=0)continue;var P1=pos[j],P2=pos[(j+1)%N];
          c.beginPath();c.moveTo(P1[0],P1[1]);c.lineTo(lerp(P1[0],P2[0],e),lerp(P1[1],P2[1],e));c.strokeStyle=rgba('node',.7*fv);c.lineWidth=1.2;c.stroke()}
        var tr=st===2?seg(lt,1900,3000):1;
        if(tr>.01){c.beginPath();[0,2,4].forEach(function(q,n){var P=pos[q];n?c.lineTo(P[0],P[1]):c.moveTo(P[0],P[1])});c.closePath();c.fillStyle=rgba('acc',.14*tr*fv);c.fill();c.strokeStyle=rgba('acc',.85*tr*fv);c.lineWidth=1.2;c.stroke()}
        var sp=st===2?seg(lt,2600,3600):1;
        if(sp>.01){c.beginPath();for(var j2=0;j2<N;j2++){c.moveTo(G.cx+px,G.cy+py);c.lineTo(pos[j2][0],pos[j2][1])}c.strokeStyle=rgba('line',.22*sp*fv);c.lineWidth=1;c.stroke()}
      }
      /* ato 4: uma onda só, que abre o campo */
      if(st===3){var wv=seg(lt,500,3600);ell(R*(.3+1.25*wv),0,Math.PI*2);c.strokeStyle=rgba('acc',.55*(1-wv));c.lineWidth=1.2;c.stroke()}

      /* centro */
      var cb=first?outBack((intro-250)/700):1;
      if(cb>0){c.beginPath();c.arc(G.cx+px,G.cy+py,3.2*cb,0,Math.PI*2);c.fillStyle=rgba('acc',1);c.fill();
        c.beginPath();c.arc(G.cx+px,G.cy+py,11*cb,0,Math.PI*2);c.strokeStyle=rgba('acc',.35);c.lineWidth=1;c.stroke()}
      /* pontos */
      for(var i2=0;i2<N;i2++){var b2=first?outBack((intro-900-i2*70)/800):1;if(b2<=0)continue;var Q=pos[i2],on=(st===2||st===3&&lt<3000)&&(i2%2===0);
        c.beginPath();c.arc(Q[0],Q[1],(W<700?5.5:8)*b2,0,Math.PI*2);c.fillStyle=rgba('bg',1);c.fill();c.strokeStyle=rgba(on?'acc':'line',on?.9:.45);c.lineWidth=1;c.stroke();
        c.beginPath();c.arc(Q[0],Q[1],3*b2,0,Math.PI*2);c.fillStyle=rgba(on?'acc':'node',1);c.fill()}
      /* nomes das forças: só no primeiro ato, em texto limpo */
      if(st===0&&o.labels!==false){
        c.font='500 '+(W<700?11:13)+'px Geist,system-ui,sans-serif';c.textBaseline='middle';
        for(var i3=0;i3<N;i3++){var la=seg(lt,(first?1500:300)+i3*70,(first?2300:1100)+i3*70)*(1-seg(lt,4200,4900,ioQuart));if(la<=.01)continue;
          var Q2=pos[i3],dx=Q2[0]-G.cx-px,dy=Q2[1]-G.cy-py,dl=Math.hypot(dx,dy)||1,off=18+(1-la)*8;
          c.textAlign=dx<0?'right':'left';c.fillStyle=rgba('text',.82*la);c.fillText(WORDS[i3],Q2[0]+dx/dl*off,Q2[1]+dy/dl*off*.7)}
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    return {pause:function(v){paused=v},paused:function(){return paused},fit:fit};
  };
})(window);
