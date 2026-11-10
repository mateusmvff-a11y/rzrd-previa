/* Rzrd. topo da V2: móbile contínuo. Placas de metal penduradas em fios, girando e refletindo a luz
   (referência: os "Continuel-mobile" de Julio Le Parc). three.js, uma InstancedMesh só.
   Movimento: cada placa é uma mola (gira até o alvo da onda e assenta); o mouse passa como vento e
   empurra as placas perto dele; a rolagem desloca a onda. Entrada: as placas descem em cascata.
   Uso: RzMobile(canvas,{section}) -> null se não houver WebGL. */
(function(w){
  var cl=function(v,a,b){return Math.min(b,Math.max(a,v))};
  var E8=Math.exp(-8),oX=function(p){p=cl(p,0,1);return (1-Math.exp(-8*p)*(1+8*p))/(1-9*E8)};
  function rnd(i,k){var x=Math.sin(i*127.1+k*311.7)*43758.5453;return x-Math.floor(x)}

  w.RzMobile=function(cv,o){
    var T=w.THREE;if(!T)return null;
    var R;try{R=new T.WebGLRenderer({canvas:cv,antialias:true,alpha:true,powerPreference:'high-performance'})}catch(e){return null}
    if(!R.getContext())return null;
    var rm=w.matchMedia('(prefers-reduced-motion: reduce)').matches,sec=o.section||cv;
    R.setPixelRatio(Math.min(w.devicePixelRatio||1,2));R.outputEncoding=T.sRGBEncoding;R.toneMapping=T.ACESFilmicToneMapping;R.toneMappingExposure=1.08;
    var sc=new T.Scene(),cam=new T.PerspectiveCamera(24,1,.1,200);cam.position.set(0,0,34);

    /* ambiente que as placas refletem: papel claro com faixas de tinta, ciano e branco */
    var DK=!!o.dark,es=new T.Scene();es.background=new T.Color(DK?0x0B1517:0xE6EDEF);
    function strip(col,x,y,z,wd,ht,ry,rx){var m=new T.Mesh(new T.PlaneGeometry(wd,ht),new T.MeshBasicMaterial({color:col,side:T.DoubleSide}));m.position.set(x,y,z);m.rotation.set(rx||0,ry||0,0);es.add(m)}
    if(DK){strip(0x69D1EB,-10,0,-4,2.5,40,.7);strip(0xE7F1F4,11,3,-3,1.6,40,-.8);strip(0x1D7F9C,0,13,6,50,5,0,1.2);strip(0x69D1EB,12,0,12,3,30,-2.3);strip(0x19292D,-12,-2,10,6,30,2.4)}
    else{strip(0x0F1C1F,-11,0,-5,7,40,.7);strip(0x69D1EB,11,2,-3,4,40,-.8);strip(0xffffff,0,13,6,50,7,0,1.2);strip(0x0F1C1F,4,-13,8,40,8,0,-1.1);strip(0x1D7F9C,-12,-2,10,5,30,2.4);strip(0xffffff,12,0,12,6,30,-2.3);strip(0x19292D,13,-6,2,3,30,-1.1)}
    var pm=new T.PMREMGenerator(R);sc.environment=pm.fromScene(es,.02).texture;pm.dispose();
    var mat=new T.MeshStandardMaterial({color:0xffffff,metalness:1,roughness:.09});
    var key=new T.PointLight(0xbff0fb,1.4,70);sc.add(key);sc.add(new T.AmbientLight(0xffffff,.2));
    var geo=new T.BoxGeometry(1,1,.04),dummy=new T.Object3D(),col=new T.Color();

    var mesh=null,lines=null,N=0,COLS=0,ROWS=0,SP=1.62,ang,vel,base,tl,tv,X0,Y0,DL;
    function build(){
      if(mesh){sc.remove(mesh);mesh.dispose()}if(lines){sc.remove(lines);lines.geometry.dispose()}
      var vh=2*Math.tan(cam.fov*Math.PI/360)*cam.position.z,vw=vh*cam.aspect;
      COLS=Math.max(5,Math.floor(vw/SP)+1);ROWS=Math.max(4,Math.floor((vh-SP*1.2)/SP));N=COLS*ROWS;var top=vh/2-SP*1.05,rail=top+SP*.62;
      mesh=new T.InstancedMesh(geo,mat,N);mesh.instanceMatrix.setUsage(T.DynamicDrawUsage);
      ang=new Float32Array(N);vel=new Float32Array(N);tl=new Float32Array(N);tv=new Float32Array(N);base=new Float32Array(N);X0=new Float32Array(N);Y0=new Float32Array(N);DL=new Float32Array(N);
      var lp=[];
      lp.push(-vw/2-2,rail,-.05,vw/2+2,rail,-.05);
      for(var c=0;c<COLS;c++){var x=(c-(COLS-1)/2)*SP;lp.push(x,rail,-.05,x,top-(ROWS-1)*SP-.6,-.05);
        for(var r=0;r<ROWS;r++){var i=c*ROWS+r;X0[i]=x;Y0[i]=top-r*SP;base[i]=rnd(i,1)*6.28;ang[i]=base[i];DL[i]=c*.06+r*.035+rnd(i,2)*.25;
          var cy=(c+r)%7===3&&rnd(i,5)>.35;col.set(cy?0x69D1EB:(DK?0x93A7AD:0xCCD7DB));mesh.setColorAt(i,col)}}
      if(mesh.instanceColor)mesh.instanceColor.needsUpdate=true;
      var lg=new T.BufferGeometry();lg.setAttribute('position',new T.Float32BufferAttribute(lp,3));
      lines=new T.LineSegments(lg,new T.LineBasicMaterial({color:DK?0xE7F1F4:0x0F1C1F,transparent:true,opacity:.16}));
      sc.add(lines);sc.add(mesh);
    }
    var cw=0,ch=0;
    function fit(){cw=cv.clientWidth;ch=cv.clientHeight;if(!cw||!ch)return;R.setSize(cw,ch,false);cam.aspect=cw/ch;cam.position.z=cw<700?21:34;cam.updateProjectionMatrix();build()}
    fit();w.addEventListener('resize',fit);

    /* vento do mouse: posição no plano das placas e velocidade */
    var pw=new T.Vector3(1e3,1e3,0),pv=new T.Vector3(),pOn=false,ray=new T.Raycaster(),nd=new T.Vector2(),plane=new T.Plane(new T.Vector3(0,0,1),0),hit=new T.Vector3();
    sec.addEventListener('pointermove',function(e){var b=cv.getBoundingClientRect();nd.set((e.clientX-b.left)/b.width*2-1,-((e.clientY-b.top)/b.height)*2+1);ray.setFromCamera(nd,cam);
      if(ray.ray.intersectPlane(plane,hit)){if(pOn)pv.set(hit.x-pw.x,hit.y-pw.y,0);pw.copy(hit);pOn=true}});
    sec.addEventListener('pointerleave',function(){pOn=false;pw.set(1e3,1e3,0)});

    var el=rm?4000:0,last=0,visible=true;
    new IntersectionObserver(function(es2){visible=es2[0].isIntersecting},{rootMargin:'60px'}).observe(cv);
    function frame(now){
      requestAnimationFrame(frame);
      if(!visible||!mesh)return;
      var dt=last?Math.min(.05,(now-last)/1000):.016;last=now;if(!rm)el+=dt*1000;
      var t=el/1000,sp=o.progress?o.progress():cl((w.scrollY||0)/(sec.offsetHeight||800),0,1);
      key.position.set(Math.sin(t*.27)*9,Math.cos(t*.21)*6,9);
      var speed=Math.min(1.2,pv.length());pv.multiplyScalar(.86);
      for(var i=0;i<N;i++){
        var c=Math.floor(i/ROWS),r=i%ROWS;
        /* alvo: uma onda lenta que atravessa as colunas + um leve balanço por linha */
        var tgt=base[i]*.15+Math.sin(t*.42-c*.36+r*.11+sp*5)*1.15+Math.sin(t*.19+r*.33)*.35;
        if(pOn){var dx=X0[i]-pw.x,dy=Y0[i]-pw.y,d=Math.sqrt(dx*dx+dy*dy);if(d<3.2){var f=(1-d/3.2);vel[i]+=f*f*speed*(dx>=0?1:-1)*.9}}
        vel[i]+=((tgt-ang[i])*5.5-vel[i]*2.2)*dt;ang[i]+=vel[i]*dt;
        /* inclinação: segue a velocidade (a placa balança no fio) */
        tv[i]+=((-vel[i]*.05)-tv[i])*Math.min(1,dt*4);
        var k=rm?1:oX((t-.2-DL[i])/1.6),drop=(1-k)*3.2;
        dummy.position.set(X0[i],Y0[i]+drop,0);dummy.rotation.set(tv[i],ang[i],Math.sin(t*.5+i)*.012);dummy.scale.setScalar(1.08*(.3+.7*k));
        dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate=true;
      lines.material.opacity=.16*oX((t-.1)/1.2);
      R.render(sc,cam);
    }
    requestAnimationFrame(frame);
    return {fit:fit};
  };
})(window);
