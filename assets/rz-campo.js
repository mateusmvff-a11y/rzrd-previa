/* Rzrd. topo da V1: o mesmo diagrama do original (index.html), com acabamento de motion.
   Mantém a estrutura e o texto: 10 órbitas com régua, 120 pontos (3 famílias), as seis forças
   (MERCADO, PESSOAS, NEGÓCIO, CULTURA, CONCORRÊNCIA, AMBIÇÃO), POTENCIAL, a teia polar,
   as três expressões, os seis núcleos com pontes, os sinais e a onda; lente no mouse.
   O que muda é o acabamento: pontos nítidos e pequenos (sem bokeh nem esferas desfocadas),
   texto limpo sem contorno, anéis que se desenham, curvas de motion e stagger do centro para fora. */
(function(w){
  var cl=function(v,a,b){return Math.min(b,Math.max(a,v))};
  var sm=function(x){x=cl(x,0,1);return x*x*(3-2*x)};
  var ioQ=function(x){x=cl(x,0,1);return x<.5?8*x*x*x*x:1-Math.pow(-2*x+2,4)/2};
  var E8=Math.exp(-8),oX=function(p){p=cl(p,0,1);return (1-Math.exp(-8*p)*(1+8*p))/(1-9*E8)};
  function rnd(i,k){var x=Math.sin(i*127.1+k*311.7)*43758.5453;return x-Math.floor(x)}

  w.RzCampo=function(cv,o){
    var hx=cv.getContext('2d'),C=o.colors,sec=o.section||cv;
    var rm=w.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var hw=0,hh=0,g={},HD=38000,brk=[0,.25,.5,.75,1];
    var NP=120,NR=10,PR=12,CF=Math.cos(-.13),SF=Math.sin(-.13);
    var WORDS=['MERCADO','PESSOAS','NEGÓCIO','CULTURA','CONCORRÊNCIA','AMBIÇÃO'];
    var CEN=[[-.48,-.17],[.46,-.22],[.04,.47]];
    var HUB=[[-.75,-.30],[.67,-.39],[-.08,.67],[-.40,.25],[.38,.30],[.05,-.22]];
    var LNK=[[0,5],[5,1],[0,3],[3,2],[2,4],[4,1],[3,5],[5,4],[3,4],[0,2],[1,2]];
    var el=rm?HD*.62:0,last=0,paused=rm,hmx=-999,hmy=-999,hsx=-999,hsy=-999,hmon=false,lk=0,lxs=0,lys=0,cur=-1;
    var PX=new Float32Array(NP),PY=new Float32Array(NP),init=false;
    function rgba(k,a){return 'rgba('+C[k]+','+cl(a,0,1).toFixed(3)+')'}
    function fit(){var d=Math.min(w.devicePixelRatio||1,2);hw=cv.clientWidth;hh=cv.clientHeight;cv.width=hw*d;cv.height=hh*d;hx.setTransform(d,0,0,d,0,0);var L=o.layout(hw,hh);g={cx:L.cx,cy:L.cy,R:L.R,R0:L.R,mob:hw<700,r:hw<700?1.9:2.4}}
    fit();w.addEventListener('resize',fit);
    sec.addEventListener('pointermove',function(e){if(e.pointerType==='touch')return;var b=cv.getBoundingClientRect();hmx=e.clientX-b.left;hmy=e.clientY-b.top;hmon=true});
    sec.addEventListener('pointerleave',function(){hmon=false;hsx=-999});

    function orb(i,T,noise,tight){
      var k=Math.floor(i/PR),j=i%PR,rk=g.R*(.2+.8*k/(NR-1))*tight,dir=k%2?1:-1,om=.00009*(1.7-k*.13)*dir;
      var th=j/PR*6.283185+k*.62+T*om+(noise?(rnd(i,7)-.5)*1.4*noise:0),rr=1+(noise?(rnd(i,8)-.5)*noise:0);
      var ex=rk*rr*Math.cos(th),ey=rk*rr*.56*Math.sin(th);return [g.cx+ex*CF-ey*SF,g.cy+ex*SF+ey*CF];
    }
    function shape(i,T){
      var f=i%3,idx=(i-f)/3,R=g.R,bx=g.cx+CEN[f][0]*R,by=g.cy+CEN[f][1]*R,x,y;
      if(f===0){var th=idx*2.39996+T*.00009,rad=R*(.09+.29*Math.sqrt((idx+.5)/40));x=bx+Math.cos(th)*rad;y=by+Math.sin(th)*rad*.65}
      else if(f===1){var u=(idx%8)/7-.5,v=(Math.floor(idx/8)%5)/4-.5,t2=idx*.23+T*.000045;x=bx+u*R*.55+Math.sin(t2)*R*.012;y=by+v*R*.38+Math.cos(t2)*R*.012}
      else{var t3=idx*2.39996+T*.00008,rd=R*(.10+.28*Math.sqrt((idx+.5)/40));x=bx+Math.cos(t3)*rd*(1+.13*Math.sin(t3*3));y=by+Math.sin(t3)*rd*.60}
      return [x,y];
    }
    function hubPos(i,T){var hi=(i*7+Math.floor(i/9))%6,h=HUB[hi],R=g.R,a=i*2.39996+T*.000045*(hi%2?1:-1),rr=R*(.065+.115*Math.sqrt((i%29)/29));return [g.cx+h[0]*R+Math.cos(a)*rr,g.cy+h[1]*R+Math.sin(a)*rr*.75]}
    function tgt(st,i,T){return st===0?orb(i,T,.28,1):st===1?orb(i,T,0,.8):st===2?shape(i,T):hubPos(i,T)}
    function ell(rx,ry,a0,a1){hx.beginPath();hx.ellipse(g.cx,g.cy,rx,ry,-.13,a0,a1)}

    function frame(now){
      var dt=last?Math.min(50,now-last):16;last=now;
      var r0=sec.getBoundingClientRect();
      if(r0.bottom<-40||r0.top>w.innerHeight){requestAnimationFrame(frame);return}
      if(!paused)el+=dt;
      var sy=w.scrollY||0,spg=cl(sy/(sec.offsetHeight||800),0,1);
      g.R=g.R0*(1+.22*sm(spg));
      var p=(el%HD)/HD,ph=0;for(var k=0;k<4;k++){if(p>=brk[k]&&p<brk[k+1])ph=k}
      var q=(p-brk[ph])/(brk[ph+1]-brk[ph]),T=el,prev=(ph+3)%4,R=g.R,cx=g.cx,cy=g.cy,first=el<HD*.25;
      if(first&&ph===0)prev=0;
      if(o.onStage)o.onStage(ph,q);
      if(hmon){if(hsx<-900){hsx=hmx;hsy=hmy}hsx+=(hmx-hsx)*.12;hsy+=(hmy-hsy)*.12;lxs=hsx;lys=hsy}
      lk+=((hmon&&!g.mob?1:0)-lk)*.07;
      hx.clearRect(0,0,hw,hh);
      /* luz de fundo, plana e discreta */
      var gl=hx.createRadialGradient(cx,cy,0,cx,cy,R*2.2);gl.addColorStop(0,rgba('acc',.07));gl.addColorStop(1,rgba('acc',0));hx.fillStyle=gl;hx.fillRect(0,0,hw,hh);
      var intro=first?oX((T-200)/1800):1;

      /* campo panorâmico */
      hx.lineWidth=1;
      for(var b=0;b<(g.mob?4:8);b++){
        var sh=Math.sin(T*.000095+b*.21)*R*.05,sw=first?oX((T-600-b*110)/2000):1;if(sw<=0)continue;
        hx.beginPath();hx.ellipse(cx+sh,cy,R*(1.35+b*.5),R*(.72+b*.21),-.13,Math.PI*.18,Math.PI*(.18+1.64*sw));
        hx.strokeStyle=rgba('line',(.07-b/8*.045));hx.stroke();
      }
      /* órbitas com profundidade (frente mais forte), desenhadas do centro para fora na entrada */
      var RA=ph===0?(first?1:sm(q/.3)):(ph===1?1:(ph===2?1-sm(q/.35):0)),tf=ph===1?1-.2*ioQ(q/.45):(ph===0?1:.8);
      if(RA>.01){
        for(var k2=0;k2<NR;k2++){
          var rk=R*(.2+.8*k2/(NR-1))*tf,sw2=first?oX((T-150-k2*80)/1600):1;if(sw2<=0)continue;
          var segs=Math.ceil(72*sw2);
          for(var a5=0;a5<segs;a5++){
            var t1=a5/72*6.283185-1.5708,t2=(a5+1)/72*6.283185-1.5708,zn=.5+.5*Math.sin((t1+t2)/2);
            var u1=rk*Math.cos(t1),v1=rk*.56*Math.sin(t1),u2=rk*Math.cos(t2),v2=rk*.56*Math.sin(t2);
            hx.beginPath();hx.moveTo(cx+u1*CF-v1*SF,cy+u1*SF+v1*CF);hx.lineTo(cx+u2*CF-v2*SF,cy+u2*SF+v2*CF);
            hx.strokeStyle=rgba('line',.19*RA*(.28+.9*zn));hx.lineWidth=.5+.8*zn;hx.stroke();
          }
          if(k2===NR-1){
            var tv=RA*(first?oX((T-1300)/1600):1);hx.beginPath();
            for(var tk=0;tk<120;tk++){var th2=tk/120*6.283185,ln=tk%10===0?.05:(tk%5===0?.032:.016),c1=Math.cos(th2),s1=Math.sin(th2),x1=rk*c1,y1=rk*.56*s1,x2=rk*(1-ln)*c1,y2=rk*(1-ln)*.56*s1;
              hx.moveTo(cx+x1*CF-y1*SF,cy+x1*SF+y1*CF);hx.lineTo(cx+x2*CF-y2*SF,cy+x2*SF+y2*CF)}
            hx.strokeStyle=rgba('line',.36*tv);hx.lineWidth=.8;hx.stroke();
          }
        }
      }
      /* pontos: cada etapa nasce da anterior, de dentro para fora, com curva de motion */
      var X=[],Y=[],S=[],I0=[];
      for(var i=0;i<NP;i++){
        var a=tgt(prev,i,T),b2=tgt(ph,i,T);
        var dl=cl(Math.hypot(b2[0]-cx,b2[1]-cy)/(R*1.15),0,1)*.55+rnd(i,3)*.2;
        var s0=ioQ((q-dl*.22)/.44),x=a[0]+(b2[0]-a[0])*s0,y=a[1]+(b2[1]-a[1])*s0;
        if(first&&T<5200){var e0=oX((T/1000-.5-dl*.9)/1.6);x=cx+(x-cx)*e0;y=cy+(y-cy)*e0}
        x+=Math.sin(T*.0009+i*1.9)*.6;y+=Math.cos(T*.0008+i*2.7)*.6;
        if(!init){PX[i]=x;PY[i]=y}
        PX[i]+=(x-PX[i])*.35;PY[i]+=(y-PY[i])*.35;
        X.push(PX[i]);Y.push(PY[i]);S.push(s0);
        I0.push(first&&T<5200?cl(oX((T/1000-.5-dl*.9)/1.6)*1.5,0,1):1);
      }
      init=true;
      /* etapa 2: teia polar */
      var wl=ph===1?sm((q-.3)/.3):(ph===2?1-sm(q/.3):0);
      if(wl>.01){hx.lineWidth=.7;hx.strokeStyle=rgba('line',.24*wl);hx.beginPath();
        for(var i2=0;i2<NP;i2++){var kk=Math.floor(i2/PR),jj=i2%PR,nx=kk*PR+(jj+1)%PR;hx.moveTo(X[i2],Y[i2]);hx.lineTo(X[nx],Y[nx]);if(kk<NR-1){hx.moveTo(X[i2],Y[i2]);hx.lineTo(X[i2+PR],Y[i2+PR])}}
        hx.stroke()}
      /* etapa 3: ligações dentro de cada expressão */
      var wc=ph===2?sm((q-.45)/.3):(ph===3?1-sm(q/.25):0);
      if(wc>.01){hx.lineWidth=.7;hx.strokeStyle=rgba('line',.24*wc);hx.beginPath();
        for(var i4=0;i4<NP-3;i4++){var dx4=X[i4]-X[i4+3],dy4=Y[i4]-Y[i4+3];if(dx4*dx4+dy4*dy4<R*R*.03){hx.moveTo(X[i4],Y[i4]);hx.lineTo(X[i4+3],Y[i4+3])}}
        hx.stroke()}
      /* etapa 4: sinais ao centro, pontes entre os seis núcleos, a onda */
      var reset=ph===3?sm((q-.88)/.12):0,evolved=ph===3?sm((q-.18)/.35)*(1-reset):0,signal=ph===3?sm(q/.1)*(1-sm((q-.34)/.16)):0;
      if(evolved>0||signal>.01){
        CEN.forEach(function(o2,k3){
          var x0=cx+o2[0]*R,y0=cy+o2[1]*R,c1x=cx+o2[0]*R*.2,c1y=cy+o2[1]*R*.18;
          hx.beginPath();hx.moveTo(x0,y0);hx.quadraticCurveTo(c1x,c1y,cx,cy);hx.strokeStyle=rgba('fam'+k3,.45*signal);hx.lineWidth=1;hx.stroke();
          for(var n=0;n<3;n++){var u=((q*2.4)+n/3+k3*.1)%1,xx=(1-u)*(1-u)*x0+2*(1-u)*u*c1x+u*u*cx,yy=(1-u)*(1-u)*y0+2*(1-u)*u*c1y+u*u*cy;
            hx.beginPath();hx.arc(xx,yy,2.2,0,6.2832);hx.fillStyle=rgba('fam'+k3,.95*signal);hx.fill()}
        });
        LNK.forEach(function(l,j){var A=HUB[l[0]],B=HUB[l[1]],x1=cx+A[0]*R,y1=cy+A[1]*R,x2=cx+B[0]*R,y2=cy+B[1]*R,dr=sm((evolved*1.4)-j*.035);if(dr<=0)return;
          var mx=(x1+x2)/2+Math.sin(j*2.4)*R*.07,my=(y1+y2)/2+Math.cos(j*1.8)*R*.045;
          hx.beginPath();hx.moveTo(x1,y1);
          var N2=20;for(var s3=1;s3<=Math.ceil(N2*dr);s3++){var u3=s3/N2;hx.lineTo((1-u3)*(1-u3)*x1+2*(1-u3)*u3*mx+u3*u3*x2,(1-u3)*(1-u3)*y1+2*(1-u3)*u3*my+u3*u3*y2)}
          hx.strokeStyle=rgba('acc',(.3+(j%3)*.1)*evolved);hx.lineWidth=1;hx.stroke()});
        HUB.forEach(function(h,i5){var xx=cx+h[0]*R,yy=cy+h[1]*R;
          hx.beginPath();hx.arc(xx,yy,9,0,6.2832);hx.strokeStyle=rgba('fam'+(i5%3),.4*evolved);hx.lineWidth=1;hx.stroke();
          hx.beginPath();hx.arc(xx,yy,3,0,6.2832);hx.fillStyle=rgba('fam'+(i5%3),evolved);hx.fill()});
        var wave=sm((q-.5)/.4)*evolved;
        if(wave>.01){ell(R*(.55+wave*3),R*(.36+wave*1.1),0,Math.PI*2);hx.strokeStyle=rgba('acc',.28*(1-wave));hx.lineWidth=1;hx.stroke()}
      }
      /* lente do mouse */
      var LR=118;
      if(lk>.01){
        hx.beginPath();hx.arc(lxs,lys,LR,0,6.2832);hx.strokeStyle=rgba('line',.26*lk);hx.lineWidth=1;hx.stroke();
        hx.beginPath();hx.arc(lxs,lys,2,0,6.2832);hx.fillStyle=rgba('acc',.9*lk);hx.fill();
        var ins=[];for(var ii=0;ii<NP;ii++){if(Math.hypot(X[ii]-lxs,Y[ii]-lys)<LR)ins.push(ii)}
        hx.beginPath();for(var ia=0;ia<ins.length;ia++)for(var ib=ia+1;ib<ins.length;ib++){var pa=ins[ia],pb=ins[ib];if(Math.hypot(X[pa]-X[pb],Y[pa]-Y[pb])<R*.34){hx.moveTo(X[pa],Y[pa]);hx.lineTo(X[pb],Y[pb])}}
        hx.strokeStyle=rgba('line',.42*lk);hx.lineWidth=.8;hx.stroke();
      }
      /* pontos nítidos, três famílias, mesmo tamanho; a lente aumenta os de dentro */
      for(var i3=0;i3<NP;i3++){
        var rad=g.r*(1+.22*Math.sin(Math.PI*cl(S[i3],0,1)))*I0[i3],al=.92*I0[i3];
        if(lk>.01){var dl2=Math.hypot(X[i3]-lxs,Y[i3]-lys),pr=Math.max(0,1-dl2/LR);al*=1-.45*lk*(1-pr);rad*=1+.55*lk*pr}
        if(rad<.05)continue;
        hx.beginPath();hx.arc(X[i3],Y[i3],rad,0,6.2832);hx.fillStyle=rgba('fam'+(i3%3),al);hx.fill();
      }
      /* as seis forças e o potencial: texto limpo, sem contorno */
      hx.textAlign='center';hx.textBaseline='middle';
      var wv=ph===0?(first?sm((T-1500)/1200):sm(q/.12))*(1-sm((q-.78)/.2)):0;
      if(wv>.01){
        hx.font='500 '+(g.mob?9.5:11)+'px Geist,system-ui,sans-serif';if('letterSpacing' in hx)hx.letterSpacing='.08em';
        WORDS.forEach(function(wd,i6){
          var lw=cl(wv*1.6-i6*.1,0,1),an=i6*Math.PI/3+T*.000013,ex=Math.cos(an)*R*1.18,ey=Math.sin(an)*R*(.56*1.18+.1);
          var wx=cx+ex*CF-ey*SF,wy=cy+ex*SF+ey*CF+(1-oX(lw))*6;
          hx.fillStyle=rgba('text',.78*lw);hx.fillText(wd,wx,wy);
        });
      }
      var pv=ph===1?sm((q-.12)/.2)*(1-sm((q-.62)/.25)):0;
      if(pv>.01){hx.font='500 '+(g.mob?13:16)+'px Geist,system-ui,sans-serif';if('letterSpacing' in hx)hx.letterSpacing='.14em';
        hx.fillStyle=rgba('bg',.9*pv);var tw=hx.measureText('POTENCIAL').width+22;hx.fillRect(cx-tw/2,cy-R*.05-13,tw,26);
        hx.fillStyle=rgba('acc',pv);hx.fillText('POTENCIAL',cx,cy-R*.05+(1-oX(pv))*6)}
      if('letterSpacing' in hx)hx.letterSpacing='0px';
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    return {pause:function(v){paused=v},paused:function(){return paused},fit:fit};
  };
})(window);
