/* Interações do protótipo aprovado (v10), sem alterações. A camada nova fica em upgrade.js. */
/* ===== base ===== */
(()=>{
 const caseTabs=[...document.querySelectorAll('[data-case]')],caseSlides=[...document.querySelectorAll('.case-slide')];
 let caseIndex=0;
 function renderCase(i){if(!caseTabs.length)return;caseIndex=(i+caseTabs.length)%caseTabs.length;caseTabs.forEach((t,j)=>{const current=j===caseIndex;t.setAttribute('aria-selected',String(current));t.tabIndex=current?0:-1});caseSlides.forEach((s,j)=>s.classList.toggle('active',j===caseIndex));document.getElementById('caseCount').textContent=(caseIndex+1)+' / 3';document.getElementById('nextCase').textContent=caseIndex===caseTabs.length-1?'Rever do início ↺':'Próxima perspectiva ↗';}
 caseTabs.forEach((t,i)=>{t.addEventListener('click',()=>renderCase(i));t.addEventListener('keydown',e=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const j=e.key==='Home'?0:e.key==='End'?caseTabs.length-1:(i+(e.key==='ArrowRight'?1:caseTabs.length-1))%caseTabs.length;renderCase(j);caseTabs[j].focus()}})});
 const nextCase=document.getElementById('nextCase'); if(nextCase) nextCase.addEventListener('click',()=>renderCase(caseIndex+1));renderCase(0);
 const menuButton=document.getElementById('menuButton'),mobileMenu=document.getElementById('mobileMenu');
 if(menuButton&&mobileMenu){menuButton.addEventListener('click',()=>{const open=mobileMenu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open))});mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileMenu.classList.remove('open');menuButton.setAttribute('aria-expanded','false')}));}
})();

/* ===== v5-interactions ===== */
(()=>{
const goalData=[
 {title:'A marca quer ser descoberta.',metrics:'Alcance · alcance por publicação · crescimento de seguidores',context:'O objetivo é ampliar exposição sem confundir volume isolado com avanço recorrente.',question:'Quais temas alcançam novos públicos de maneira consistente?',next:'Separar picos excepcionais de uma evolução distribuída entre conteúdos.'},
 {title:'A marca quer aprofundar interesse.',metrics:'Comentários · compartilhamentos · salvamentos · engajamento de valor por alcance',context:'O conjunto ajuda a observar comportamentos. A qualidade dessas ações não pode ser presumida por uma taxa isolada.',question:'Que temas e estruturas suscitam ações mais próximas do objetivo?',next:'Comparar publicações equivalentes, abrir exemplos e distinguir reação rápida de envolvimento observado.'},
 {title:'A marca quer gerar consideração.',metrics:'Visitas ao perfil · cliques disponíveis · indicadores comerciais de fontes próprias',context:'Visita é um indicador indireto. Leads e vendas exigem fontes distintas, períodos alinhados e atribuição apropriada.',question:'Quais conteúdos acompanham movimentos de interesse além do feed?',next:'Investigar destino, oferta e origem dos sinais antes de atribuir resultados comerciais a publicações.'}
];
const goals=[...document.querySelectorAll('.v5-strategy-tab')];
function showGoal(i){const x=goalData[i];goals.forEach((b,j)=>{b.setAttribute('aria-selected',String(j===i));b.classList.toggle('active',j===i)});for(const [id,val] of Object.entries({'v5-goal-title':x.title,'v5-goal-metrics':x.metrics,'v5-goal-context':x.context,'v5-goal-question':x.question,'v5-goal-next':x.next,'v5-goal-count':`${String(i+1)} / 3`}))document.getElementById(id).textContent=val}
goals.forEach((b,i)=>{b.addEventListener('click',()=>showGoal(i));b.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const j=e.key==='Home'?0:e.key==='End'?goals.length-1:(i+(e.key==='ArrowRight'?1:goals.length-1))%goals.length;showGoal(j);goals[j].focus()}})});showGoal(0);
const lensButtons=[...document.querySelectorAll('.v5-editorial-tab')],lenses=[...document.querySelectorAll('.v5-lens')];
function showLens(i){lensButtons.forEach((b,j)=>{b.setAttribute('aria-selected',String(j===i));b.classList.toggle('active',j===i)});lenses.forEach((s,j)=>s.classList.toggle('active',j===i));document.getElementById('v5-lens-count').textContent=`${String(i+1)} / 3`}
lensButtons.forEach((b,i)=>{b.addEventListener('click',()=>showLens(i));b.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const j=e.key==='Home'?0:e.key==='End'?lensButtons.length-1:(i+(e.key==='ArrowRight'?1:lensButtons.length-1))%lensButtons.length;showLens(j);lensButtons[j].focus()}})});showLens(0);
})();

/* ===== v6-modal-script ===== */
const rankingRows=[
  {label:'Alcance',values:['1604','1148','2379','2149','3329']},
  {label:'Engajamento',values:['10,29%','6,97%','6,35%','6,84%','4,36%']},
  {label:'Engajamento de valor',values:['8,17%','3,92%','3,53%','2,23%','1,86%']},
  {label:'Formato',values:['Card','Reels','Carrossel','Reels','Carrossel']},
  {label:'Frente de conteúdo',values:['','','','','']},
  {label:'Colab',values:['Sim','','Sim','Sim','Sim']},
  {label:'Automação',values:['Sim','Sim','Sim','Sim','Sim']},
  {label:'Data e hora',values:['15 de out. de 2026, 18:00','29 de out. de 2026, 18:00','27 de out. de 2026, 12:00','5 de out. de 2026, 18:14','19 de out. de 2026, 18:00']},
  {label:'Curtidas',values:['34','35','67','99','83']},
  {label:'Comentários',values:['80','2','38','34','12']},
  {label:'Compartilhamentos',values:['30','25','16','8','15']},
  {label:'Salvamentos',values:['21','18','30','6','35']},
  {label:'Authority Score',values:['6,85','5,26','4,26','3,13','3,11']},
  {label:'Impacto',values:['5,73','5,14','5,48','5,49','5,34']}
];
const rankingDetails=[
  {kicker:'CONTEÚDO 1 · CARD',headline:'Promessa concreta + contexto de oferta.',pills:[['Alcance','1604'],['Engajamento de valor','8,17%'],['Compartilhamentos','30']],summary:'O card reúne tese, urgência e chamada clara. Mesmo sem o maior alcance absoluto, sustenta um dos melhores níveis de resposta qualificada do conjunto.',reading:'A força parece vir da combinação entre tema oportuno, recorte objetivo e CTA direto para inscrição.',test:'Repetir a lógica em outras promessas específicas e comparar com chamadas mais abertas.',anatomyTitle:'A anatomia do card vencedor.',steps:[['ABERTURA','Black Friday contextualiza a oportunidade imediatamente e cria tensão de tempo.'],['DESENVOLVIMENTO','O conteúdo apresenta uma promessa concreta: oportunidades para devs em 2027.'],['ENCERRAMENTO','A CTA convida a comentar para se inscrever, aproximando a peça de uma ação explícita.']]},
  {kicker:'CONTEÚDO 2 · REEL',headline:'Corte direto e uma promessa em poucos segundos.',pills:[['Alcance','1148'],['Engajamento de valor','3,92%'],['Compartilhamentos','25']],summary:'O reel funciona menos como peça de explicação e mais como gatilho de curiosidade. A performance vem do gancho forte logo no início.',reading:'A promessa 3 oportunidades para devs em 2027 concentra o interesse rapidamente e favorece compartilhamento.',test:'Comparar versões com abertura semelhante, mas variações de enquadramento e ritmo nos 3 primeiros segundos.',anatomyTitle:'A anatomia do reel de corte.',steps:[['ABERTURA','A fala entra sem preâmbulo e apresenta o benefício imediatamente.'],['DESENVOLVIMENTO','O conteúdo se organiza em torno de uma lista curta e digerível.'],['ENCERRAMENTO','O fecho reforça a tese central e deixa a continuação para o consumo completo.']]},
  {kicker:'CONTEÚDO 3 · CARROSSEL',headline:'Comparação técnica como motor de utilidade.',pills:[['Alcance','2379'],['Engajamento de valor','3,53%'],['Salvamentos','30']],summary:'O carrossel técnico combina clareza visual e informação prática. Os salvamentos são relativamente altos porque a peça serve como referência futura.',reading:'A utilidade percebida parece vir da comparação explícita entre competências e versões, não apenas do tema de IA.',test:'Testar novas peças de comparação técnica e observar se o padrão se sustenta em outros assuntos.',anatomyTitle:'A anatomia do carrossel técnico.',steps:[['ABERTURA','O título anuncia uma atualização clara e relevante para quem acompanha o tema.'],['DESENVOLVIMENTO','Cada tela traduz a comparação em blocos curtos, com hierarquia visual forte.'],['ENCERRAMENTO','O fechamento preserva a sensação de síntese aplicável, o que pode explicar o volume de salvamentos.']]},
  {kicker:'CONTEÚDO 4 · REEL',headline:'Evento + prova social + contexto rápido.',pills:[['Alcance','2149'],['Engajamento de valor','2,23%'],['Comentários','34']],summary:'O conteúdo gera boa circulação por registrar um momento real, mas sua qualidade de resposta é inferior à das peças mais utilitárias.',reading:'A força está no contexto de evento e na presença humana; a fragilidade está na menor densidade de informação prática.',test:'Testar aberturas que combinem o registro do evento com uma tese explícita logo nos primeiros segundos.',anatomyTitle:'A anatomia do reel de evento.',steps:[['ABERTURA','A imagem situa o espectador em um momento real e reconhecível.'],['DESENVOLVIMENTO','O valor depende do contexto verbal: sem tese explícita, a peça pode ficar mais descritiva do que analítica.'],['ENCERRAMENTO','A continuação tende a depender mais da curiosidade do público do que de uma CTA forte.']]},
  {kicker:'CONTEÚDO 5 · CARROSSEL',headline:'Tese editorial forte com expansão narrativa.',pills:[['Alcance','3329'],['Engajamento de valor','1,86%'],['Salvamentos','35']],summary:'É a peça de maior alcance do grupo, mas com uma taxa menor de resposta qualificada. Isso sugere força de distribuição e título, sem equivaler automaticamente ao melhor conteúdo.',reading:'A tese abre muito bem e amplia a circulação, mas talvez converta menos em interação valiosa por publicação.',test:'Dissecar quais slides sustentam a tese e testar encerramentos mais orientados à reflexão ou ação.',anatomyTitle:'A anatomia do carrossel de tese.',steps:[['ABERTURA','A capa apresenta uma tese assertiva, com alto poder de interrupção.'],['DESENVOLVIMENTO','O conteúdo expande a premissa e contextualiza a afirmação em novas telas.'],['ENCERRAMENTO','Sem um convite forte, parte do alcance pode se dissipar sem gerar resposta proporcional.']]}
];
const backdrop=document.getElementById('ranking-modal');
const openers=document.querySelectorAll('[data-open="ranking-modal"]');
const closers=document.querySelectorAll('[data-close="ranking-modal"]');
const rankButtons=[...document.querySelectorAll('.v5-rank-card')];
const tableBody=document.getElementById('v5-ranking-table-body');
function buildRankingTable(){if(!tableBody)return;tableBody.innerHTML='';rankingRows.forEach(row=>{const tr=document.createElement('tr');const th=document.createElement('th');th.textContent=row.label;tr.appendChild(th);row.values.forEach(v=>{const td=document.createElement('td');td.textContent=v||'';if(!v)td.className='empty';tr.appendChild(td)});tableBody.appendChild(tr)});}buildRankingTable();
function showRank(i){const data=rankingDetails[i];rankButtons.forEach((btn,j)=>{btn.classList.toggle('active',j===i);btn.setAttribute('aria-selected',String(j===i));});document.getElementById('v5-rank-kicker').textContent=data.kicker;document.getElementById('v5-rank-headline').textContent=data.headline;document.getElementById('v5-rank-summary').textContent=data.summary;document.getElementById('v5-rank-reading').textContent=data.reading;document.getElementById('v5-rank-test').textContent=data.test;document.getElementById('v5-anatomy-title').textContent=data.anatomyTitle;const pills=document.getElementById('v5-rank-pills');pills.innerHTML='';data.pills.forEach(([k,v])=>{const d=document.createElement('div');d.className='v5-metric-pill';d.innerHTML=`<span>${k}</span><b>${v}</b>`;pills.appendChild(d);});const steps=document.getElementById('v5-anatomy-steps');steps.innerHTML='';data.steps.forEach(([label,desc])=>{const d=document.createElement('div');d.className='v5-anatomy-step';d.innerHTML=`<i>${label}</i><span>${desc}</span>`;steps.appendChild(d);});}
showRank(0); rankButtons.forEach(btn=>btn.addEventListener('click',()=>showRank(Number(btn.dataset.rank))));
function openModal(){backdrop.classList.add('open');backdrop.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}
function closeModal(){backdrop.classList.remove('open');backdrop.setAttribute('aria-hidden','true');document.body.style.overflow='';}
openers.forEach(btn=>btn.addEventListener('click',openModal)); closers.forEach(btn=>btn.addEventListener('click',closeModal)); if(backdrop){backdrop.addEventListener('click',e=>{if(e.target===backdrop)closeModal();});} document.addEventListener('keydown',e=>{if(e.key==='Escape'&&backdrop.classList.contains('open'))closeModal();});

/* ===== spectra-v10-interactions ===== */
(()=>{
  const tabs=[...document.querySelectorAll('.v10-demo-tab')];
  const scenes=[...document.querySelectorAll('.v10-scene')];
  const count=document.querySelector('.v10-demo-count');
  const prev=document.getElementById('v10-prev');
  const next=document.getElementById('v10-next');
  const showcase=document.getElementById('experiencia');
  let sceneIndex=0;
  const updateScene=(index,opts={})=>{
    sceneIndex=Math.max(0,Math.min(scenes.length-1,index));
    tabs.forEach((tab,i)=>{let active=i===sceneIndex;tab.classList.toggle('active',active);tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});
    scenes.forEach((scene,i)=>{const active=i===sceneIndex;scene.hidden=!active;scene.setAttribute('aria-hidden',String(!active));});
    count.textContent=(sceneIndex+1)+' / '+scenes.length;
    prev.disabled=sceneIndex===0;next.disabled=sceneIndex===scenes.length-1;
    if(opts.fromBottom){showcase.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}
  };
  tabs.forEach((btn,i)=>{btn.addEventListener('click',()=>updateScene(i));btn.addEventListener('keydown',e=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const target=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length;updateScene(target);tabs[target].focus();}})});
  prev.addEventListener('click',()=>updateScene(sceneIndex-1,{fromBottom:true}));
  next.addEventListener('click',()=>updateScene(sceneIndex+1,{fromBottom:true}));
  updateScene(0);
  const caps=[...document.querySelectorAll('.v10-cap')];
  function activateCap(index){caps.forEach((card,i)=>{let current=i===index;card.classList.toggle('active',current);const button=card.querySelector('button');button.setAttribute('aria-expanded',String(current));card.querySelector('.v10-cap-body').setAttribute('aria-hidden',String(!current));card.querySelector('.v10-cap-indicator').textContent=current?'−':'+';});}
  caps.forEach((card,i)=>{
    const button=card.querySelector('button');button.addEventListener('click',()=>activateCap(i));
    button.addEventListener('keydown',e=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const k=e.key==='Home'?0:e.key==='End'?caps.length-1:(i+(e.key==='ArrowRight'?1:caps.length-1))%caps.length;activateCap(k);caps[k].querySelector('button').focus();}});
    card.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse' && matchMedia('(hover:hover)').matches)activateCap(i);});
  });
  activateCap(0);
})();

