/* bloco */

(function(){
  const menuBtn=document.getElementById('menuBtn'),mobileMenu=document.getElementById('mobileMenu');
  if(menuBtn&&mobileMenu){menuBtn.addEventListener('click',()=>{const open=mobileMenu.classList.toggle('on');mobileMenu.hidden=!open;menuBtn.setAttribute('aria-expanded',String(open));});mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileMenu.hidden=true;mobileMenu.classList.remove('on');menuBtn.setAttribute('aria-expanded','false')}));}
  const data=[
    {"k": "MAC / ALTERNATIVAS E CRITÉRIOS", "title": "Uma proposta pode responder a decisões muito diferentes.", "text": "Um cliente procura solução imediata; outro precisa sustentar uma mudança ao longo do tempo. Comparar essas compras como se fossem equivalentes obscurece alternativas, critérios e valor.", "out": "Investigar quais situações merecem ofertas, argumentos e níveis de acompanhamento distintos."},
    {"k": "CARTOGRAFIA / POSIÇÕES COMPETITIVAS", "title": "De quem somos alternativa, e em que disputa?", "text": "Soluções padronizadas, equipes internas e especialistas podem concorrer de maneiras diferentes. A posição desejável depende do que os compradores valorizam e da capacidade de ocupá-la.", "out": "Examinar se existe espaço para especialização acompanhada, sem tratar um vazio no mapa como demanda provada."},
    {"k": "MVE / VALOR E CAPACIDADE", "title": "Mais serviço não significa necessariamente mais resultado.", "text": "Projetos sob medida e acompanhamento podem elevar valor percebido, mas também consumir horas dos profissionais mais experientes. O MVE confronta procura, capacidade e contribuição.", "out": "Escolher ofertas, preços e formas de entrega que permitam crescer sem estrangular os especialistas."},
    {"k": "MCP / COERÊNCIA DA PROMESSA", "title": "Uma diferenciação forte pode precisar ser construída.", "text": "Afirmar que o serviço leva projetos à aplicação real exige relevância para o cliente, evidência observável, operação capaz e economia sustentável. O trabalho é fortalecer essa posição, não apenas moderar o discurso.", "out": "Definir a promessa desejada e o que precisa ser desenvolvido para sustentá-la no mercado."}
  ];
  const tabs=[...document.querySelectorAll('.method-tools button')],figures=[...document.querySelectorAll('.method-visual .viz')],k=document.getElementById('methodKicker'),title=document.getElementById('methodTitle'),t=document.getElementById('methodText'),out=document.getElementById('methodOutcome'),n=document.getElementById('methodCount'),prog=document.getElementById('methodProgress');
  function render(i){tabs.forEach((b,j)=>{const active=i===j;b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active))});figures.forEach((f,j)=>f.classList.toggle('active',i===j));k.textContent=data[i].k;title.textContent=data[i].title;t.textContent=data[i].text;out.textContent=data[i].out;n.textContent=(i+1)+' de 4';if(prog)prog.style.width=100*(i+1)/4+'%';}
  tabs.forEach((b,i)=>{b.addEventListener('click',()=>render(i));b.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowDown'){e.preventDefault();tabs[(i+1)%tabs.length].focus();render((i+1)%tabs.length)}if(e.key==='ArrowLeft'||e.key==='ArrowUp'){e.preventDefault();tabs[(i+tabs.length-1)%tabs.length].focus();render((i+tabs.length-1)%tabs.length)}})});render(0);
})();

;
/* id="aether-v16-process" */

(() => {
  const steps = [{"prompt":"O que está acontecendo — e o que não pode esperar?","title":"A entrada começa com escuta, não com um protocolo.","body":"Conversamos com quem conhece o negócio, examinamos a operação e distinguimos urgências de questões estruturais. Em alguns casos, uma orientação imediata vem antes de um plano formal.","output":"O desafio ganha uma leitura mais precisa e clareza sobre o que pede atenção agora."},{"prompt":"Qual decisão precisa de orientação primeiro?","title":"O que não pode esperar recebe atenção primeiro.","body":"Organizamos as evidências disponíveis e orientamos ações prioritárias. Questões de equipe, responsabilidade ou oferta podem entrar nessa frente, quando fizerem parte do escopo contratado.","output":"A empresa pode agir sobre o urgente sem confundir uma resposta imediata com a direção definitiva."},{"prompt":"Como conectar o que cada área está tentando resolver?","title":"A visão de conjunto vira escolhas e prioridades.","body":"Confrontamos alternativas e conectamos mercado, marca, oferta e operação. Quando necessário, estruturamos um plano transversal, responsáveis e dependências; em outros casos, a direção pode ser mais concentrada.","output":"A liderança enxerga o que precisa ser escolhido, por quem e com quais consequências."},{"prompt":"Como manter a direção útil quando a empresa evolui?","title":"A direção ganha critérios para continuar viva.","body":"Transformamos escolhas em aplicações e referências para a equipe. Conforme o projeto, podemos orientar revisões e reuniões de acompanhamento ou transferir os critérios para execução interna.","output":"As equipes conseguem aplicar e revisar a direção, sem depender de um roteiro imutável."}];
  const paper = ["<div class=\"v16-paper-comparison\"><div><small>PONTO DE PARTIDA</small><strong>“Precisamos crescer.”</strong></div><span class=\"v16-paper-arr\">→</span><div class=\"focus\"><small>PERGUNTA DE ENTRADA</small><strong>O que está impedindo a empresa de avançar?</strong></div></div>","<div class=\"v16-paper-evidence\"><div><small>URGÊNCIAS</small><strong>O que agir?</strong><i></i></div><div><small>RESPONSÁVEIS</small><strong>Quem decide?</strong><i></i></div><div><small>CRITÉRIOS</small><strong>Com qual base?</strong><i></i></div></div><p class=\"v16-paper-note\">ORIENTAR O QUE NÃO PODE ESPERAR · SEM PRESUMIR UM PLANO PRONTO</p>","<div class=\"v16-paper-actions\"><div><span>1</span><strong>Escolhas e renúncias</strong><i>com justificativas</i></div><div><span>2</span><strong>Prioridades e dependências</strong><i>entre frentes</i></div><div><span>3</span><strong>Responsáveis e critérios</strong><i>para agir</i></div></div>","<div class=\"v16-paper-comparison v16-paper-options\"><div><small>DIREÇÃO ACORDADA</small><strong>Critérios e aplicações</strong><em>para equipes</em></div><span class=\"v16-paper-arr\">↔</span><div class=\"focus\"><small>REALIDADE EM MOVIMENTO</small><strong>Evidências e ajustes</strong><em>conforme o escopo</em></div></div><p class=\"v16-paper-note\">REVISAR QUANDO NOVAS INFORMAÇÕES MUDAM A DECISÃO</p>"];
  const tabs = [...document.querySelectorAll('.experience-step')];
  if(!tabs.length)return;
  const el=(id)=>document.getElementById(id);
  const count=steps.length;
  function set(i) {
    tabs.forEach((tab,j)=>{const active=i===j;tab.classList.toggle('active',active);tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});
    const d=steps[i];
    el('xpKicker').textContent='FRENTE DE ATUAÇÃO';
    el('xpPrompt').textContent=d.prompt;
    el('xpTitle').textContent=d.title;
    el('xpBody').textContent=d.body;
    el('xpOutput').textContent=d.output;
    el('v16PaperNo').textContent='FOCO / '+(i+1);
    el('v16PaperContent').innerHTML=paper[i];
  }
  tabs.forEach((tab,i)=>{
    tab.addEventListener('click',()=>set(i));
    tab.addEventListener('keydown',(e)=>{
      let j=-1;
      if(e.key==='ArrowDown'||e.key==='ArrowRight')j=(i+1)%count;
      if(e.key==='ArrowUp'||e.key==='ArrowLeft')j=(i+count-1)%count;
      if(e.key==='Home')j=0;
      if(e.key==='End')j=count-1;
      if(j<0)return;
      e.preventDefault();set(j);tabs[j].focus();
    });
  });
  set(0);
})();

;
/* bloco */

(() => {
  const dlg=document.getElementById('aether-case-dialog');
  if(!dlg)return;
  let current=null,step=0,lastTrigger=null;
  const list=()=>Array.from(current.querySelectorAll('[data-scene]'));
  function show(n){if(!current)return;const scenes=list();step=Math.max(0,Math.min(n,scenes.length-1));scenes.forEach((el,i)=>{el.hidden=i!==step});current.querySelectorAll('[data-step-btn]').forEach((el,i)=>{const active=i===step;el.classList.toggle('active',active);el.setAttribute('aria-pressed',active?'true':'false')});current.querySelector('[data-case-prev]').disabled=step===0;const nxt=current.querySelector('[data-case-next]');nxt.disabled=step===scenes.length-1;nxt.innerHTML=step===scenes.length-1?'Fim do estudo':'Próximo <span aria-hidden="true">→</span>';}
  document.querySelectorAll('[data-case-open]').forEach(btn=>btn.addEventListener('click',()=>{lastTrigger=btn;const id=btn.getAttribute('data-case-open');dlg.querySelectorAll('[data-case-panel]').forEach(p=>{p.hidden=p.getAttribute('data-case-panel')!==id});current=dlg.querySelector('[data-case-panel="'+id+'"]');if(!current)return;show(0);dlg.showModal();dlg.scrollTop=0;}));
  dlg.addEventListener('click',e=>{if(e.target.matches('[data-case-close]'))dlg.close();if(e.target.matches('[data-step-btn]')){show(Number(e.target.getAttribute('data-step-btn')));dlg.scrollTop=0;}if(e.target.closest('[data-case-prev]')){show(step-1);dlg.scrollTop=0;}if(e.target.closest('[data-case-next]')){show(step+1);dlg.scrollTop=0;}});
  dlg.addEventListener('close',()=>{lastTrigger?.focus();current=null;});
  dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close();});
})();

;
/* bloco */
(()=>{const buttons=Array.from(document.querySelectorAll('[data-deliver-tab]'));const panels=Array.from(document.querySelectorAll('[data-deliver-panel]'));function show(n){buttons.forEach((b,i)=>{b.classList.toggle('active',i===n);b.setAttribute('aria-selected',String(i===n))});panels.forEach((p,i)=>p.hidden=i!==n)}buttons.forEach(b=>b.addEventListener('click',()=>show(Number(b.dataset.deliverTab))));show(0);})();
;
/* bloco */

(function(){
const d=document.getElementById('v10FrameworkDialog');
if(!d)return;
const panels=[...d.querySelectorAll('[data-fw-panel]')];
const nav=[...d.querySelectorAll('[data-fw-tab]')];
let lastTrigger=null;let current=0;
function select(i){current=i;panels.forEach((p,j)=>p.hidden=j!==i);nav.forEach((b,j)=>{b.classList.toggle('active',j===i);b.setAttribute('aria-selected',String(j===i));});}
function open(i,source){lastTrigger=source;select(i);if(!d.open)d.showModal();d.querySelector('.v10-close').focus();}
function close(){if(d.open)d.close();if(lastTrigger&&lastTrigger.isConnected)lastTrigger.focus({preventScroll:true});}
document.querySelectorAll('[data-open-fw]').forEach(el=>el.addEventListener('click',()=>open(Number(el.dataset.openFw),el)));
const main=document.querySelector('[data-open-current-fw]');
if(main){main.addEventListener('click',()=>{let buttons=[...document.querySelectorAll('.method-tools [data-view]')];let active=buttons.findIndex(b=>b.classList.contains('active'));open(Math.max(0,active),main);});}
nav.forEach((el,i)=>el.addEventListener('click',()=>select(i)));
d.querySelector('#v10CloseFramework').addEventListener('click',close);
d.addEventListener('click',e=>{if(e.target===d)close();});
d.addEventListener('close',()=>{if(lastTrigger&&lastTrigger.isConnected)lastTrigger.focus({preventScroll:true});});
d.querySelector('#v10FwSeeDelivery').addEventListener('click',()=>{close();document.getElementById('entrega')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});});
})();

;
/* id="aether-v11-tab-keys" */
(()=>{const tabs=[...document.querySelectorAll('#entrega [data-deliver-tab]')];tabs.forEach((tab,i)=>tab.addEventListener('keydown',e=>{const keys=['ArrowRight','ArrowLeft','Home','End'];if(!keys.includes(e.key))return;e.preventDefault();let j=i;if(e.key==='ArrowRight')j=(i+1)%tabs.length;if(e.key==='ArrowLeft')j=(i+tabs.length-1)%tabs.length;if(e.key==='Home')j=0;if(e.key==='End')j=tabs.length-1;tabs[j].click();tabs[j].focus({preventScroll:true})}))})();
;
/* bloco */

(()=>{
  const sector=document.querySelector('#para-quem'); if(!sector)return;
  const photo=sector.querySelector('#sector-photo');const img=sector.querySelector('#sector-img');
  const category=sector.querySelector('#sector-category');const question=sector.querySelector('#sector-question');const action=sector.querySelector('#sector-action');
  const sectorViews=[
    ['SERVIÇOS ESPECIALIZADOS E CONHECIMENTO','Como transformar conhecimento, reputação e experiência em ofertas que o comprador compreende e valoriza?','Arquitetura de serviços, públicos, confiança e experiência do cliente.','https://images.unsplash.com/photo-1758270704851-adff797a2010?auto=format&fit=crop&w=1400&q=75','Pessoas em uma sessão de aprendizagem e trabalho'],
    ['MARCAS, PRODUTOS E EXPERIÊNCIAS','O que faz o público escolher sua marca além do produto em si?','Diferenciação, ocasiões de escolha, canais e experiência vivida.','https://images.unsplash.com/photo-1722411927625-0e478acf502b?auto=format&fit=crop&w=1400&q=75','Profissional trabalhando madeira em uma oficina'],
    ['TECNOLOGIA E SOLUÇÕES COMPLEXAS','Como tornar uma solução complexa mais fácil de escolher sem perder aquilo que a diferencia?','Compradores, posicionamento, arquitetura do produto e entrada no mercado.','https://images.unsplash.com/photo-1748256086767-8974ee677f77?auto=format&fit=crop&w=1400&q=75','Profissional conferindo equipamentos técnicos em ambiente produtivo']
  ];
  const decisionViews=[
    ['REPOSICIONAR','Que valor o mercado ainda não reconhece naquilo que a empresa já sabe entregar?','Diagnóstico da percepção, alternativas competitivas e provas que sustentam uma nova posição.',sectorViews[1][3],sectorViews[1][4]],
    ['REORGANIZAR A OFERTA','O portfólio ajuda o comprador a escolher ou torna a decisão mais difícil?','Públicos, usos, arquitetura comercial e limites de cada oferta.',sectorViews[0][3],sectorViews[0][4]],
    ['PREPARAR O PRÓXIMO CICLO','Que mercados, públicos ou ofertas merecem investimento na próxima fase da empresa?','Hipóteses de crescimento, caminhos de entrada, capacidade e prioridades.',sectorViews[0][3],sectorViews[0][4]]
  ];
  const descriptions={sector:[
    ['Serviços especializados e negócios de conhecimento','Saúde, educação, serviços profissionais e outros negócios em que competência e confiança são centrais.'],
    ['Marcas, produtos e experiências de valor agregado','Design, mobiliário, hospitalidade e marcas nas quais o valor também se revela na experiência.'],
    ['Tecnologia e soluções complexas','Plataformas, SaaS e soluções B2B ou B2C em que é preciso tornar a escolha mais clara.']
  ],moment:[
    ['Reposicionar uma empresa','Quando a percepção do mercado não acompanha o valor entregue.'],
    ['Reorganizar produtos e serviços','Quando cresceu o portfólio, mas a escolha ficou menos clara.'],
    ['Preparar uma nova fase','Quando existem oportunidades, mas é preciso escolher quais perseguir.']
  ]};
  const modes=[...sector.querySelectorAll('[data-sector-mode]')];let mode='sector';
  const credit=document.createElement('span');credit.className='sector-photo-credit';credit.textContent='IMAGEM EDITORIAL';credit.setAttribute('aria-label','Imagem ilustrativa, não representa cliente da Rzrd.');photo.appendChild(credit);
  const buttons=[...sector.querySelectorAll('[data-sector]')];let active=0;
  function set(i){active=i;const v=(mode==='sector'?sectorViews:decisionViews)[i];buttons.forEach((b,j)=>{b.classList.toggle('active',i===j);b.setAttribute('aria-selected',String(i===j));b.tabIndex=i===j?0:-1;});category.textContent=v[0];question.textContent=v[1];action.textContent=v[2];img.alt=v[4];if(img.getAttribute('src')!==v[3])img.src=v[3];photo.classList.toggle('sector-fallback',!(img.complete && img.naturalWidth>0));}
  function changeMode(next){mode=next;modes.forEach(b=>{let on=b.dataset.sectorMode===next;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});buttons.forEach((b,i)=>{const strong=b.querySelector('strong'),small=b.querySelector('small');strong.textContent=descriptions[next][i][0];small.textContent=descriptions[next][i][1];});set(0);}
  modes.forEach(b=>b.addEventListener('click',()=>changeMode(b.dataset.sectorMode)));
  buttons.forEach((b,i)=>{b.addEventListener('click',()=>set(i));b.addEventListener('keydown',e=>{if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();let k=(i+(e.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length;buttons[k].focus();set(k);}})});
  img.addEventListener('error',()=>photo.classList.add('sector-fallback'));img.addEventListener('load',()=>photo.classList.remove('sector-fallback'));
  // Editorial photographs illustrate real situations, not client work or verified outcomes.
  changeMode('moment');
})();

;
/* id="aether-v22-service-simulation" */

(()=>{
const hours=document.querySelector('#a22Hours'),per=document.querySelector('#a22HoursPer');
if(!hours||!per)return;
const out=(id,s)=>{const e=document.getElementById(id);if(e)e.textContent=s;};
function update(){
 const h=Number(hours.value),p=Number(per.value),d=18,accepted=Math.min(d,Math.floor(h/p)),gap=d-accepted;
 out('a22HoursOut',h+' h');out('a22HoursPerOut',p+' h');out('a22HoursInline',h+' h / ciclo');out('a22AcceptedInline',String(accepted));out('a22Accepted',String(accepted));out('a22Gap',String(gap));out('a22Contribution','R$ '+(accepted*2400).toLocaleString('pt-BR'));
}
[hours,per].forEach(el=>el.addEventListener('input',update));update();
})();

;
/* bloco */

(() => {
  // Zoom controls now open the dedicated, scrollable v25 diagram reader.
  const d=document.getElementById('v10FrameworkDialog');if(!d)return;
  // Cartography: same illustrative agents, three lenses. Tabs select without duplicating the maps.
  d.querySelectorAll('[data-a24-map-btn]').forEach(btn=>btn.addEventListener('click',()=>{
    const id=Number(btn.dataset.a24MapBtn);
    d.querySelectorAll('[data-a24-map-btn]').forEach(b=>{const on=Number(b.dataset.a24MapBtn)===id;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});
    d.querySelectorAll('[data-a24-map]').forEach(page=>page.classList.toggle('active',Number(page.dataset.a24Map)===id));
  }));
  // MVE: hypothetical causal model. Contribution ignores fixed costs and investment.
  const scenarios={
    focus:{demand:24,effort:6,price:18000,cost:10000,value:['Acompanhamento','ajustado ao contexto'],thought:'Na oferta focalizada, o recurso crítico limita parte da procura. A decisão é escolher quais problemas justificam as horas sêniores.'},
    service:{demand:28,effort:10,price:24000,cost:14500,value:['Serviço ampliado','dedicação sênior intensa'],thought:'A ampliação do serviço eleva o valor por contrato, mas consome mais tempo. Se a capacidade não muda, o total de contribuição pode diminuir.'},
    redesign:{demand:32,effort:4,price:19000,cost:10500,value:['Entrega redesenhada','menos horas por projeto'],thought:'Redesenhar a entrega libera horas por contrato. A tese pode capturar mais contribuição sem depender de uma promessa comercial menor.'}
  };
  const e=(id)=>d.querySelector('#'+id);
  let selected='focus';const range=e('a24HoursRange');
  function money(n){return 'R$ '+Math.round(n).toLocaleString('pt-BR');}
  // The SVG flow is part of the simulation, not a fixed illustration.
  // Every width and bottleneck opening uses the SAME demand/done figures used by the economic comparison.

  function renderA29MveFilaments(s,done){
    const layer=e('a29MveThreadLayer');if(!layer)return;
    const ns='http://www.w3.org/2000/svg';
    const count=19, demandHeight=60+s.demand*1.9, ratio=s.demand?done/s.demand:0;
    const outHeight=demandHeight*(.16+.84*ratio), cy=260;
    const topIn=cy-demandHeight/2, topOut=cy-outHeight/2;
    const pass=Math.max(1,Math.round(count*ratio));
    const first=Math.floor((count-pass)/2);
    const y=v=>Number(v.toFixed(1));
    layer.replaceChildren();
    const mk=(d,color,width,opacity)=>{
      const path=document.createElementNS(ns,'path');
      path.setAttribute('d',d);path.setAttribute('stroke',color);
      path.setAttribute('stroke-width',String(width));path.setAttribute('opacity',String(opacity));
      layer.appendChild(path);
    };
    for(let i=0;i<count;i++){
      const t=(i+.5)/count;
      const yIn=topIn+3+t*(demandHeight-6);
      const active=i>=first&&i<first+pass;
      if(active){
        const r=(i-first+.5)/pass;
        const yGate=topOut+3+r*(outHeight-6);
        const yEnd=topOut+3+r*(outHeight-6);
        const tone=(i%5===0?'#477d59':'#729b78');
        mk(`M44 ${y(yIn)} C158 ${y(yIn)} 318 ${y(yGate)} 464 ${y(yGate)}`,tone, i%5===0?1.8:1.3,.74);
        mk(`M464 ${y(yGate)} C512 ${y(yGate)} 555 ${y(yGate)} 587 ${y(yGate)} C667 ${y(yGate)} 728 ${y(yEnd)} 855 ${y(yEnd)}`,
          i%5===0?'#396a4b':'#709f7c',i%5===0?1.8:1.3,.86);
      } else {
        const yApproach=topIn+7+t*(demandHeight-14);
        mk(`M44 ${y(yIn)} C165 ${y(yIn)} 323 ${y(yApproach)} 465 ${y(yApproach)}`,'#749d7b',1.1,.38);
        mk(`M465 ${y(yApproach)} C493 ${y(yApproach+12)} 522 ${y(346+12*t)} 574 ${y(357+8*t)}`,'#bc865f',1.3,.47);
      }
    }
  }

  function redrawMVEFlow(s, done, over){
    const cy=260, demandHeight=60 + s.demand*1.9;
    const ratio=s.demand ? done/s.demand : 0;
    const realizedHeight=demandHeight*(.16+.84*ratio);
    const halfIn=demandHeight/2, halfOut=realizedHeight/2;
    const topIn=cy-halfIn, bottomIn=cy+halfIn;
    const topOut=cy-halfOut, bottomOut=cy+halfOut;
    const y=(v)=>Number(v.toFixed(1));
    e('a28FlowDemand').setAttribute('d',`M40 ${y(topIn)} C130 ${y(topIn)} 203 ${y(topIn+3)} 267 ${y(topIn+5)} L463 ${y(topIn+10)} V${y(bottomIn-10)} L267 ${y(bottomIn-5)} C203 ${y(bottomIn-3)} 130 ${y(bottomIn)} 40 ${y(bottomIn)} Z`);
    e('a28FlowGate').setAttribute('d',`M464 ${y(topOut)} H587 V${y(bottomOut)} H464 Z`);
    e('a28FlowRealized').setAttribute('d',`M587 ${y(topOut)} C634 ${y(topOut)} 649 ${y(topOut-2)} 695 ${y(topOut-2)} H855 V${y(bottomOut+2)} H695 C649 ${y(bottomOut+2)} 634 ${y(bottomOut)} 587 ${y(bottomOut)} Z`);
    const frame=e('a28GateFrame');
    frame.setAttribute('y', String(y(topOut-8)));
    frame.setAttribute('height', String(y(realizedHeight+16)));
    e('a28GateCenter').setAttribute('d',`M526 ${y(topOut-8)} V${y(bottomOut+8)}`);
    // Excess is diverted away from the choke point, never counted as realized business.
    const group=e('a28ExcessGroup');group.style.opacity=over>0?'1':'0';
    group.setAttribute('aria-hidden', String(over===0));
    e('a28OverflowBranch').setAttribute('d',`M478 ${y(bottomOut+10)} C511 ${y(bottomOut+32)} 548 352 581 362`);
    e('a28OverflowBranch').setAttribute('stroke-width', String(y(1.5+9*over/s.demand)));
    const overflowLabel=e('a24OverflowOut');
    overflowLabel.setAttribute('fill',over>0?'#AA724F':'#567B63');
    overflowLabel.setAttribute('x',over>0?'592':'475');
    overflowLabel.setAttribute('y',over>0?'368':'368');
    renderA29MveFilaments(s,done);
    e('a28ValueTitle').textContent=s.value[0];
    e('a28ValueDetail').textContent=s.value[1];
    e('a24MveInsight').setAttribute('data-has-bottleneck',String(over>0));
  }
  function updateMVE(){if(!range)return;const s=scenarios[selected],hrs=Number(range.value),capacity=Math.floor(hrs/s.effort),done=Math.min(s.demand,capacity),over=s.demand-done,total=done*(s.price-s.cost);
    e('a24DemandOut').textContent=s.demand;e('a24HoursOut').textContent=hrs+' h';e('a24EffortOut').textContent=s.effort+' h / contrato';e('a24TotalOut').textContent=money(total);e('a24CompletedOut').textContent=done+' contratos realizáveis';e('a24OverflowOut').textContent=over?over+' contratos acima da capacidade':'Capacidade cobre a procura ilustrada';e('a24HoursVal').textContent=hrs+' h';e('a24Need').textContent=s.demand;e('a24Done').textContent=done;e('a24PerHour').textContent=money(total/hrs);e('a24MveInsight').textContent=over>0?s.thought:'Neste cenário, a capacidade cobre a procura ilustrativa. Resta verificar a contribuição por contrato, o custo de servir e se essa escolha merece prioridade comercial.';
    redrawMVEFlow(s,done,over);
    // Comparação derivada das mesmas premissas do gráfico, respeitando as horas selecionadas.
    const comparison=Object.entries(scenarios).map(([key,m])=>{
      const realizable=Math.min(m.demand,Math.floor(hrs/m.effort));
      return {key, realizable, total:realizable*(m.price-m.cost)};
    });
    const peak=Math.max(...comparison.map(item=>item.total),1);
    e('a27CompareHours').textContent='MESMAS '+hrs+' HORAS DISPONÍVEIS';
    comparison.forEach(item=>{
      const card=d.querySelector('[data-a27-compare="'+item.key+'"]');
      if(!card)return;
      const amount=item.total>=1000?'R$ '+(item.total/1000).toLocaleString('pt-BR',{maximumFractionDigits:1})+' mil':money(item.total);
      card.querySelector('[data-a27-total]').textContent=amount;
      card.querySelector('[data-a27-hourly]').textContent=money(item.total/hrs)+'/h';
      card.querySelector('[data-a27-done]').textContent=item.realizable+' contratos';
      card.querySelector('[data-a27-bar]').style.width=Math.max(3,100*item.total/peak).toFixed(1)+'%';
      const isCurrent=item.key===selected;
      card.classList.toggle('is-current',isCurrent);
      card.setAttribute('aria-pressed',String(isCurrent));
      card.querySelector('[data-a27-pick]').textContent=isCurrent?'EM FOCO':'VER FLUXO';
    });
    d.querySelectorAll('[data-a24-scenario]').forEach(b=>{const on=b.dataset.a24Scenario===selected;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});
  }
  d.querySelectorAll('[data-a24-scenario]').forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.a24Scenario;updateMVE();}));range?.addEventListener('input',updateMVE);
  d.querySelectorAll('[data-a27-compare]').forEach(card=>card.addEventListener('click',()=>{
    selected=card.dataset.a27Compare;
    updateMVE();
    const first=d.querySelector('.a24-mve-head');
    first?.scrollIntoView({block:'nearest',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  }));
  const plotView=e('a28MvePlot'), plotViewBtn=e('a28MveView');
  plotViewBtn?.addEventListener('click',()=>{
    const expanded=plotView.classList.toggle('is-detail');
    plotViewBtn.setAttribute('aria-pressed',String(expanded));
    plotViewBtn.textContent=expanded?'Ver fluxo completo':'Ampliar para ler';
    if(!expanded)plotView.scrollLeft=0;
  });
  updateMVE();
  // MCP: selecting a dimension and a constructive, not merely restrictive, course of action.
  const mcp={
    investigate:[
      ['Quando essa promessa muda a escolha?','Investigar se a continuidade entre diagnóstico e aplicação é importante para os compradores e em quais circunstâncias.','Evidências a buscar: entrevistas, propostas e escolhas realizadas.'],
      ['O que demonstraria a diferença?','Investigar como os clientes distinguem orientação abstrata de aplicação efetiva e quais provas já existem.','Evidências a buscar: entregas, histórias verificáveis e acompanhamento.'],
      ['A empresa entrega aquilo que afirma?','Examinar responsáveis, horas sêniores, interfaces com o cliente e dependências para sustentar continuidade.','Evidências a buscar: operação, capacidade e padrões de entrega.'],
      ['A oferta se sustenta como negócio?','Examinar preço, custo de servir e contribuição da continuidade em diferentes perfis de projeto.','Evidências a buscar: margem de contribuição, tempo e recursos críticos.']
    ],
    build:[
      ['Tornar a promessa relevante','Escolher os perfis e situações em que o acompanhamento realmente cria uma vantagem desejada.','Possível movimento: redesenhar a oferta por necessidade do comprador.'],
      ['Construir provas observáveis','Criar marcos, registros, demonstrações e acompanhamento para que a promessa não dependa de adjetivos.','Possível movimento: tornar resultados de aplicação verificáveis.'],
      ['Preparar a capacidade necessária','Definir papéis, rotinas, limites de carteira e mecanismos para preservar continuidade com qualidade.','Possível movimento: desenvolver um sistema de entrega repetível.'],
      ['Viabilizar economicamente','Rever arquitetura de preço, esforço de serviço e condições comerciais sem degradar a proposta.','Possível movimento: capturar valor suficiente para sustentar a entrega.']
    ]
  };
  let mode='investigate', dim=0;
  function renderMCP(){const names=['Relevância','Evidência','Capacidade','Economia'],val=mcp[mode][dim];e('a24McpKicker').textContent=names[dim].toUpperCase()+' / '+(mode==='build'?'CONSTRUIR':'INVESTIGAR');e('a24McpTitle').textContent=val[0];e('a24McpText').textContent=val[1];e('a24McpOutput').textContent=val[2];d.querySelector('.a24-mcp-ring').dataset.a24Dim=String(dim);
    const apparatus=e('a29McpScene');
    if(apparatus){
      apparatus.dataset.activeDim=String(dim);
      apparatus.dataset.phase=mode;
      e('a29McpModeText').textContent=mode==='build'?'CONSTRUIR / CONDIÇÕES':'INVESTIGAR / CONDIÇÕES';
      e('a29McpCoreLabel').textContent=mode==='build'?'DIREÇÃO A SUSTENTAR':'TESE SOB EXAME';
      e('a29McpFocusLabel').textContent=String(dim+1).padStart(2,'0')+' / '+names[dim].toUpperCase();
    }
    d.querySelectorAll('[data-a24-mcp-mode]').forEach(b=>{const on=b.dataset.a24McpMode===mode;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});
    d.querySelectorAll('[data-a24-dim-btn]').forEach(b=>{const on=Number(b.dataset.a24DimBtn)===dim;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});
  }
  d.querySelectorAll('[data-a24-mcp-mode]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.a24McpMode;renderMCP();}));
  d.querySelectorAll('[data-a24-dim-btn]').forEach(b=>b.addEventListener('click',()=>{dim=Number(b.dataset.a24DimBtn);renderMCP();}));renderMCP();
})();

;
/* id="aether-v25-interactions" */

(()=>{
  const section=document.getElementById('metodo');
  const dlg=document.getElementById('v25DiagramDialog');
  const inner=document.getElementById('v25ViewerInner');
  const viewport=document.getElementById('v25ViewerViewport');
  const title=document.getElementById('v25ViewerTitle');
  const closeBtn=document.getElementById('v25CloseViewer');
  let lastTrigger=null,zoom=1;
  const setZoom=()=>{const width=Math.round(960*zoom);inner.style.setProperty('--v25-chart-width',width+'px');};
  if(section&&dlg&&inner){
    section.querySelectorAll('[data-a24-zoom]').forEach(btn=>btn.addEventListener('click',()=>{
      const art=btn.closest('.viz')?.querySelector('.a24-main-art');if(!art)return;
      lastTrigger=btn;
      inner.replaceChildren(art.cloneNode(true));
      // Clones are illustrations, not nested keyboard targets.
      inner.querySelectorAll('[tabindex]').forEach(el=>el.removeAttribute('tabindex'));
      title.textContent=btn.closest('.viz')?.querySelector('.a24-visual-foot strong')?.textContent||'Investigação em detalhe';
      zoom=1;setZoom();
      if(typeof dlg.showModal==='function')dlg.showModal();else dlg.setAttribute('open','');
      viewport.scrollLeft=0;viewport.scrollTop=0;closeBtn.focus();
    }));
    const close=()=>{if(typeof dlg.close==='function'&&dlg.open)dlg.close();else dlg.removeAttribute('open');if(lastTrigger&&lastTrigger.isConnected)lastTrigger.focus({preventScroll:true});};
    closeBtn.addEventListener('click',close);
    dlg.addEventListener('click',e=>{if(e.target===dlg)close();});
    document.getElementById('v25ZoomIn').addEventListener('click',()=>{zoom=Math.min(2.1,+(zoom+.2).toFixed(2));setZoom();});
    document.getElementById('v25ZoomOut').addEventListener('click',()=>{zoom=Math.max(.9,+(zoom-.2).toFixed(2));setZoom();});
  }
  const start=document.getElementById('v25ComposeEmail'),copy=document.getElementById('v25CopyMessage');
  const status=document.getElementById('v25ContactStatus'),help=document.getElementById('v26ContactHelp');
  // In a deployed environment, set window.AETHER_CONTACT_ENDPOINT to a configured same-origin Worker route.
  // Without that route this preview never claims to send: it opens a real email draft instead.
  const endpoint=typeof window.AETHER_CONTACT_ENDPOINT==='string'?window.AETHER_CONTACT_ENDPOINT.trim():'';
  const nameInput=document.getElementById('v25ContactName'),challengeInput=document.getElementById('v25ContactChallenge'),emailInput=document.getElementById('v26ContactEmail');
  const compose=()=>{
    const name=nameInput.value.trim();const context=challengeInput.value.trim();const email=emailInput.value.trim();
    const parts=['Olá, gostaria de conversar sobre o Aether.','', context?'O desafio que estamos vivendo:\n'+context:'Gostaria de apresentar o contexto da empresa e entender se faz sentido investigar uma decisão estratégica.','',email?'E-mail para resposta: '+email:'',name?'Obrigado,\n'+name:'Obrigado.'];
    return parts.filter((x,i)=>x!==''||i<2).join('\n');
  };
  if(start&&copy&&status){
    if(endpoint){
      start.textContent='Enviar minha mensagem ↗';
      help.textContent='Sua mensagem será enviada pelo formulário. Você receberá uma confirmação aqui após o recebimento pelo serviço.';
    }
    start.addEventListener('click',async()=>{
      if(!endpoint){
        const link='mailto:contato@rzrd.com.br?subject='+encodeURIComponent('Aether | Primeira conversa')+'&body='+encodeURIComponent(compose());
        status.textContent='Abrindo seu aplicativo de e-mail. Confirme o envio por lá.';
        window.location.href=link;
        return;
      }
      const email=emailInput.value.trim(),context=challengeInput.value.trim();
      if(!email||!emailInput.checkValidity()){emailInput.focus();status.textContent='Informe um e-mail válido para receber nossa resposta.';return;}
      if(context.length<10){challengeInput.focus();status.textContent='Descreva o desafio em pelo menos dez caracteres.';return;}
      start.disabled=true;const label=start.textContent;start.textContent='Enviando…';status.textContent='';
      try{
        const resp=await fetch(endpoint,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({name:nameInput.value.trim(),email,challenge:context,website:document.getElementById('v26ContactWebsite').value})});
        if(!resp.ok)throw new Error('Não foi possível confirmar o recebimento');
        const result=await resp.json().catch(()=>({}));
        if(result.ok!==true)throw new Error('O serviço não confirmou o recebimento');
        status.textContent='Mensagem recebida. Obrigado pelo contato.';nameInput.value='';challengeInput.value='';emailInput.value='';
      }catch(e){status.textContent='Não conseguimos confirmar o envio. Use o botão “Copiar a mensagem” e encaminhe para contato@rzrd.com.br.';}
      finally{start.disabled=false;start.textContent=label;}
    });
    copy.addEventListener('click',async()=>{
      const data='Para: contato@rzrd.com.br\nAssunto: Aether | Primeira conversa\n\n'+compose();
      try{
        if(navigator.clipboard&&navigator.clipboard.writeText)await navigator.clipboard.writeText(data);
        else{const ta=document.createElement('textarea');ta.value=data;ta.style.cssText='position:fixed;top:-9999px';document.body.appendChild(ta);ta.focus();ta.select();if(!document.execCommand('copy'))throw new Error('copy failed');ta.remove();}
        status.textContent='Mensagem copiada. Cole no seu e-mail e envie para contato@rzrd.com.br.';
      }catch(e){status.textContent='Não foi possível copiar automaticamente. Escreva para contato@rzrd.com.br.';}
    });
  }
})();
