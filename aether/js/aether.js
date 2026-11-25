/* bloco */

(() => {
  'use strict';
  const tabs=[...document.querySelectorAll('[data-tool]')];
  function selectTool(key){
    tabs.forEach(t=>{const on=t.dataset.tool===key;t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1;document.getElementById('panel-'+t.dataset.tool).hidden=!on;});
  }
  tabs.forEach((tab,i)=>{
    tab.addEventListener('click',()=>selectTool(tab.dataset.tool));
    tab.addEventListener('keydown',e=>{let n=null;if(e.key==='ArrowRight')n=(i+1)%tabs.length;if(e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;if(e.key==='Home')n=0;if(e.key==='End')n=tabs.length-1;if(n!==null){e.preventDefault();selectTool(tabs[n].dataset.tool);tabs[n].focus();}});
  });
  const form=document.getElementById('contact-form'),status=document.getElementById('form-status'),manual=document.getElementById('manual-copy'),send=document.getElementById('send-contact');
  let submissionId=null,lastPayload=null,inFlight=false,submitted=false;
  const val=id=>document.getElementById(id).value.trim();
  const message=()=> 'Olá, William e Geórgia.\n\nGostaria de conversar sobre o Aether.\n\nNome: '+val('contact-name')+'\nE-mail: '+val('contact-email')+'\nEmpresa e site: '+val('contact-company')+'\n\nDecisão em aberto:\n'+val('contact-challenge');
  // AETHER_PORTABLE_REVIEW: preservar a integração com o serviço ao publicar.
  const portableReviewMode=location.origin!=="https://aether-rzrd-direcao.wcabralg.chatgpt.site";
  if(portableReviewMode){document.getElementById('portable-contact-note').hidden=false;send.disabled=true;send.textContent='Envio disponível no site';}
  form.addEventListener('input',()=>{if(submitted){submitted=false;send.disabled=false;send.textContent='Enviar contato';status.textContent='Vamos responder pelo e-mail informado.';status.dataset.state='';}});
  form.addEventListener('submit',async event=>{
    event.preventDefault();if(portableReviewMode){status.textContent='Para enviar um contato, use o formulário do site publicado.';document.getElementById('portable-contact-link').focus();return;}if(inFlight||submitted||!form.reportValidity())return;
    const payload={name:val('contact-name'),email:val('contact-email'),company:val('contact-company'),challenge:val('contact-challenge'),website:val('contact-website')};
    const signature=JSON.stringify(payload);
    if(signature!==lastPayload||!submissionId){submissionId=crypto.randomUUID();lastPayload=signature;}
    inFlight=true;form.querySelectorAll('input,textarea').forEach(el=>el.readOnly=true);send.disabled=true;send.textContent='Enviando…';status.textContent='Enviando seu contato.';status.dataset.state='';
    const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),20000);
    try{
      const response=await fetch('/api/contato',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json','X-Aether-Form':'contact-v34'},body:JSON.stringify({...payload,submissionId}),signal:controller.signal});
      const result=await response.json().catch(()=>null);
      if(!response.ok||!result?.ok)throw new Error(response.status===429?'Aguarde alguns minutos antes de tentar novamente.':'Não foi possível confirmar o recebimento. Tente novamente ou use o e-mail abaixo.');
      status.textContent='Recebemos seu contato. Vamos responder pelo e-mail informado.';status.dataset.state='success';send.textContent='Contato recebido';submitted=true;manual.hidden=true;
    }catch(error){status.textContent=error.name==='AbortError'?'A confirmação demorou mais do que o esperado. Você pode tentar novamente; o mesmo contato não será duplicado.':(error.message.includes('Aguarde')||error.message.includes('Não foi possível')?error.message:'Não foi possível confirmar o recebimento. Tente novamente ou use o e-mail abaixo.');status.dataset.state='error';send.textContent='Tentar novamente';send.disabled=false;}
    finally{clearTimeout(timeout);inFlight=false;form.querySelectorAll('input,textarea').forEach(el=>el.readOnly=false);}
  });
  document.getElementById('copy-message').addEventListener('click',async()=>{
    if(!form.reportValidity())return;
    const text='Para: contato@rzrd.com.br\nAssunto: Aether | '+val('contact-company')+'\n\n'+message();
    try{if(!navigator.clipboard||!window.isSecureContext)throw new Error('clipboard-unavailable');await navigator.clipboard.writeText(text);status.textContent='Mensagem copiada. Cole no seu e-mail e envie para contato@rzrd.com.br.';status.dataset.state='';manual.hidden=true;}
    catch{manual.value=text;manual.hidden=false;manual.focus();manual.select();status.textContent='Selecione e copie a mensagem abaixo para enviar por e-mail.';status.dataset.state='';}
  });
})();

;
/* bloco */

(() => {
  const tree = document.querySelector('.v35mac-tree');
  if (tree) {
    const options = [...tree.querySelectorAll('[data-v35mac-select]')];
    const select = index => {
      tree.dataset.v35macActive = String(index);
      options.forEach(option => option.setAttribute('aria-pressed', String(Number(option.dataset.v35macSelect) === index)));
    };
    options.forEach((option, index) => {
      option.addEventListener('click', () => select(index));
      option.addEventListener('keydown', event => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        const next = (index + 1) % options.length;
        select(next); options[next].focus();
      });
    });
  }

  const cartography = document.getElementById('panel-carto');
  if (!cartography) return;
  const tabs = [...cartography.querySelectorAll('[data-v35carto-lens]')];
  const selectLens = index => {
    tabs.forEach((tab, i) => {
      const active = index === i;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
    });
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectLens(index));
    tab.addEventListener('keydown', event => {
      let next = null;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === null) return;
      event.preventDefault(); selectLens(next); tabs[next].focus();
    });
  });
})();


/* Aether v35: restored MVE flow mechanics and MCP support structure. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const mve = $('panel-mve');
  if (mve && $('v35mve-hours')) {
    // Premises recovered from v32. All economic outputs and line counts share this data.
    const scenarios = {
      focus: {demand:24,effort:6,price:18000,cost:10000},
      service: {demand:28,effort:10,price:24000,cost:14500},
      redesign: {demand:32,effort:4,price:19000,cost:10500}
    };
    const money = n => 'R$ '+Math.round(n).toLocaleString('pt-BR');
    const compact = n => (n/1000).toLocaleString('pt-BR',{maximumFractionDigits:1})+' mil';
    const range=$('v35mve-hours');
    let selected='service';
    const totals=(s,hours)=>{
      const capacity=Math.floor(hours/s.effort),done=Math.min(s.demand,capacity);
      return {capacity,done,over:s.demand-done,total:done*(s.price-s.cost)};
    };
    function drawFlow(s,result){
      const cy=260,pitch=4.1,inputHeight=s.demand*pitch,outputHeight=result.done*pitch;
      const ti=cy-inputHeight/2,bi=cy+inputHeight/2,to=cy-outputHeight/2,bo=cy+outputHeight/2;
      const y=v=>Number(v.toFixed(2));
      $('v35mve-demand-shape').setAttribute('d',`M40 ${y(ti)} C130 ${y(ti)} 203 ${y(ti+3)} 267 ${y(ti+5)} L463 ${y(ti+5)} V${y(bi-5)} L267 ${y(bi-5)} C203 ${y(bi-3)} 130 ${y(bi)} 40 ${y(bi)} Z`);
      $('v35mve-gate-shape').setAttribute('d',`M464 ${y(to)} H587 V${y(bo)} H464 Z`);
      $('v35mve-done-shape').setAttribute('d',`M587 ${y(to)} C634 ${y(to)} 649 ${y(to-2)} 695 ${y(to-2)} H855 V${y(bo+2)} H695 C649 ${y(bo+2)} 634 ${y(bo)} 587 ${y(bo)} Z`);
      $('v35mve-gate').setAttribute('y',String(y(to-8)));
      $('v35mve-gate').setAttribute('height',String(y(outputHeight+16)));
      $('v35mve-gate-center').setAttribute('d',`M526 ${y(to-8)} V${y(bo+8)}`);
      $('v35mve-excess').style.opacity=result.over>0?'1':'0';
      $('v35mve-excess-path').setAttribute('d',`M478 ${y(bo+10)} C511 ${y(bo+32)} 548 352 581 362`);
      const layer=$('v35mve-threads');layer.replaceChildren();
      const first=Math.floor((s.demand-result.done)/2);
      function path(d,color,width,opacity){
        const p=document.createElementNS('http://www.w3.org/2000/svg','path');
        p.setAttribute('d',d);p.setAttribute('stroke',color);p.setAttribute('stroke-width',String(width));p.setAttribute('opacity',String(opacity));
        layer.appendChild(p);
      }
      // One filament per potential contract; exactly result.done pass the bottleneck.
      for(let i=0;i<s.demand;i++){
        const yi=ti+(i+.5)*pitch,pass=i>=first&&i<first+result.done;
        if(pass){
          const yo=to+(i-first+.5)*pitch;
          const shade=i%5===0?'#416f49':'#6a8d59';
          path(`M44 ${y(yi)} C158 ${y(yi)} 318 ${y(yo)} 464 ${y(yo)} C512 ${y(yo)} 555 ${y(yo)} 587 ${y(yo)} C667 ${y(yo)} 728 ${y(yo)} 855 ${y(yo)}`,shade,i%5===0?1.7:1.05,.8);
        }else{
          const t=(i+.5)/s.demand;
          path(`M44 ${y(yi)} C165 ${y(yi)} 323 ${y(yi)} 465 ${y(yi)}`,'#6e9163',1,.35);
          path(`M465 ${y(yi)} C493 ${y(yi+12)} 522 ${y(346+12*t)} 574 ${y(357+8*t)}`,'#aa7a53',1.15,.65);
        }
      }
    }
    function update(){
      const s=scenarios[selected],hours=Number(range.value),r=totals(s,hours);
      const all=Object.entries(scenarios).map(([key,model])=>({key,model,...totals(model,hours)}));
      const maximum=Math.max(...all.map(x=>x.total),1);
      $('v35mve-hours-value').value=hours+' h';
      $('v35mve-demand').textContent=s.demand;
      $('v35mve-capacity').textContent=r.capacity;
      $('v35mve-effort').textContent='a '+s.effort+' h por contrato';
      $('v35mve-contribution').textContent=compact(r.total);
      $('v35mve-done').textContent=r.done+' contratos atendidos';
      $('v35mve-overflow').textContent=r.over>0?r.over+' contratos excedem a capacidade':'A capacidade cobre a procura';
      $('v35mve-overflow').style.color=r.over>0?'#8a603c':'#48643e';
      $('v35mve-flow-desc').textContent=`Dos ${s.demand} contratos potenciais, ${r.done} atravessam a capacidade disponível e ${r.over} excedem esse limite. A contribuição hipotética é de ${money(r.total)}.`;
      all.forEach(item=>{
        const button=mve.querySelector(`[data-v35mve-scenario="${item.key}"]`);
        const active=item.key===selected;button.classList.toggle('is-current',active);button.setAttribute('aria-pressed',String(active));
        mve.querySelector(`[data-v35mve-total="${item.key}"]`).textContent='R$ '+compact(item.total);
        mve.querySelector(`[data-v35mve-count="${item.key}"]`).textContent=item.done+' contratos · '+item.model.effort+' h por contrato';
        mve.querySelector(`[data-v35mve-bar="${item.key}"]`).style.width=(100*item.total/maximum).toFixed(2)+'%';
        mve.querySelector(`[data-v35mve-pick="${item.key}"]`).textContent=active?'Fluxo em foco':'Ver fluxo';
      });
      const focal=all.find(x=>x.key==='focus'),service=all.find(x=>x.key==='service');
      let insight;
      if(selected==='focus'){
        insight=r.over>0
          ?`As horas limitam a entrega a ${r.done} dos ${s.demand} contratos procurados. `
          :`A procura limita a oferta: há capacidade para ${r.capacity} contratos, mas a procura é de ${s.demand}. `;
        insight+=service.total>focal.total
          ?`Com ${hours} horas, o serviço ampliado passa a gerar mais contribuição: ${money(service.total)}, diante de ${money(focal.total)} da focalizada.`
          :service.total<focal.total
            ?`No ciclo, a focalizada gera ${money(focal.total)}, acima dos ${money(service.total)} do serviço ampliado.`
            :`As duas ofertas geram a mesma contribuição de ${money(focal.total)} no ciclo.`;
      }else if(selected==='service'){
        insight=`O serviço ampliado realiza ${r.done} contratos e gera ${money(r.total)} no ciclo. `;
        insight+=service.total>focal.total
          ?`A relação se inverte: com ${hours} horas, supera os ${money(focal.total)} da oferta focalizada, cuja procura já foi atendida.`
          :service.total<focal.total
            ?`Apesar dos R$ 9,5 mil por contrato, as 10 horas exigidas por entrega deixam o total abaixo dos ${money(focal.total)} da oferta focalizada.`
            :`Com ${hours} horas, empata com a oferta focalizada em contribuição total.`;
      }else{
        insight=`Com 4 horas por contrato, a entrega redesenhada realiza ${r.done} dos ${s.demand} contratos procurados. Os ${money(r.total)} de contribuição dependem também de hipóteses próprias de maior procura e preço em relação à focalizada, além do custo de servir.`;
      }
      $('v35mve-insight').textContent=insight;
      drawFlow(s,r);
    }
    mve.querySelectorAll('[data-v35mve-scenario]').forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.v35mveScenario;update();}));
    range.addEventListener('input',update);update();
  }
  const mcp=$('panel-mcp');
  if(mcp&&$('v35mcp-scene')){
    const names=['Relevância','Evidência','Capacidade','Economia'];
    const readings={
      investigate:[
        ['Quando essa promessa muda a escolha?','Investigar se o comprador valoriza o acompanhamento entre a decisão e a aplicação, e em quais situações isso pesa na contratação.','Buscar evidências em entrevistas, propostas e escolhas de contratação.'],
        ['O que torna a diferença visível?','Identificar quais entregas e situações anteriores demonstram que a orientação se transforma em aplicação.','Examinar materiais, relatos verificáveis e registros do trabalho.'],
        ['A empresa consegue cumprir?','Examinar as horas de especialistas, os responsáveis e a participação necessária do cliente para acompanhar cada projeto.','Identificar limites da carteira e condições para uma entrega consistente.'],
        ['A entrega se sustenta como negócio?','Relacionar preço, custo de servir e esforço da equipe nos diferentes formatos de acompanhamento.','Verificar a contribuição e o recurso que limita cada oferta.']
      ],
      build:[
        ['Escolher onde a promessa importa.','Concentrar a oferta nos compradores e nas situações em que o acompanhamento ajuda a resolver uma necessidade decisiva.','Movimento possível: organizar a oferta por necessidade do comprador.'],
        ['Construir provas que o cliente possa ver.','Definir marcos e registrar decisões e aplicações para que o comprador consiga examinar a contribuição do trabalho.','Movimento possível: desenvolver demonstrações e casos verificáveis.'],
        ['Preparar a empresa para entregar.','Definir papéis, rotinas e limites de projetos simultâneos; desenvolver as competências que ainda faltam.','Movimento possível: redesenhar a entrega e preparar a equipe.'],
        ['Ajustar a oferta para que se sustente.','Rever preço, escopo e esforço por projeto para manter a qualidade e a contribuição necessárias.','Movimento possível: testar outro formato de entrega e contratação.']
      ]
    };
    let mode='investigate',dimension=0;
    function render(){
      const value=readings[mode][dimension],scene=$('v35mcp-scene');
      $('v35mcp-kicker').textContent=names[dimension]+' / '+(mode==='build'?'Construir':'Investigar');
      $('v35mcp-title').textContent=value[0];$('v35mcp-text').textContent=value[1];$('v35mcp-output').textContent=value[2];
      $('v35mcp-phase').textContent=mode==='build'?'Direção a sustentar':'Tese sob exame';
      scene.dataset.activeDim=String(dimension);scene.dataset.phase=mode;
      scene.setAttribute('aria-label','Quatro condições sustentam a promessa de levar escolhas à aplicação. Em foco: '+names[dimension]+', modo '+(mode==='build'?'Construir':'Investigar')+'.');
      scene.querySelectorAll('[data-beam]').forEach(p=>p.classList.toggle('is-active',Number(p.dataset.beam)===dimension));
      scene.querySelectorAll('[data-anchor]').forEach(p=>p.classList.toggle('is-active',Number(p.dataset.anchor)===dimension));
      mcp.querySelectorAll('[data-v35mcp-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v35mcpMode===mode)));
      mcp.querySelectorAll('[data-v35mcp-dimension]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.v35mcpDimension)===dimension)));
    }
    mcp.querySelectorAll('[data-v35mcp-mode]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.v35mcpMode;render();}));
    mcp.querySelectorAll('[data-v35mcp-dimension]').forEach(b=>b.addEventListener('click',()=>{dimension=Number(b.dataset.v35mcpDimension);render();}));
    render();
  }
})();


(() => {
  const dialog = document.getElementById('v35case-dialog');
  if (!dialog) return;
  const openers = document.querySelectorAll('[data-v35case-open]');
  const closers = dialog.querySelectorAll('[data-v35case-close]');
  let previousFocus = null;
  let previousOverflow = '';
  let previousPadding = '';
  let pointerBeganOnBackdrop = false;

  function openCase(trigger) {
    if (dialog.open) return;
    previousFocus = trigger || document.activeElement;
    previousOverflow = document.documentElement.style.overflow;
    previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbar > 0) {
      document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight || '0') + scrollbar}px`;
    }
    document.documentElement.style.overflow = 'hidden';
    dialog.showModal();
    dialog.scrollTop = 0;
    closers[0]?.focus({ preventScroll: true });
  }

  function closeCase() {
    if (dialog.open) dialog.close();
  }

  openers.forEach(button => button.addEventListener('click', () => openCase(button)));
  closers.forEach(button => button.addEventListener('click', closeCase));
  dialog.addEventListener('close', () => {
    document.documentElement.style.overflow = previousOverflow;
    document.body.style.paddingRight = previousPadding;
    pointerBeganOnBackdrop = false;
    if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
  });
  // Escape and focus containment use the native modal dialog behavior.
  dialog.addEventListener('pointerdown', event => {
    pointerBeganOnBackdrop = event.target === dialog;
  });
  dialog.addEventListener('click', event => {
    if (!pointerBeganOnBackdrop || event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeCase();
  });
})();

