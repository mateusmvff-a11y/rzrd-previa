/* bloco */

(() => {
  'use strict';
  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  function closeMenu(){mobileNav.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu');}
  menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';mobileNav.hidden=open;menuButton.setAttribute('aria-expanded',String(!open));menuButton.setAttribute('aria-label',open?'Abrir menu':'Fechar menu');});
  mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
  const mobileQuery = window.matchMedia('(max-width:900px)');
  mobileQuery.addEventListener('change',e=>{if(!e.matches)closeMenu();});
  const dialog=document.getElementById('method-dialog');
  const methodLinks=[...document.querySelectorAll('[data-method]')];
  const frame=document.getElementById('method-frame');
  const methodNames={mac:'Atratividade de Clientes',carto:'Cartografia Estratégica',mve:'Mecânica de Valor',mcp:'Coerência da Promessa'};
  let lastMethodTrigger=methodLinks[0];
  let selectedMethod='mac';
  let methodReady=false;
  function selectInFrame(){
    if(methodReady&&frame.contentWindow)frame.contentWindow.postMessage({type:'aether-select-tool',tool:selectedMethod},'*');
  }
  function closeMethod(){
    if(dialog.open)dialog.close();
    document.body.classList.remove('modal-open');
    if(lastMethodTrigger)lastMethodTrigger.focus({preventScroll:true});
  }
  methodLinks.forEach(link=>link.addEventListener('click',e=>{
    if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||typeof dialog.showModal!=='function')return;
    const key=link.dataset.method;
    if(!Object.prototype.hasOwnProperty.call(methodNames,key))return;
    e.preventDefault();selectedMethod=key;lastMethodTrigger=link;
    document.getElementById('method-dialog-title').textContent=link.dataset.methodTitle||'Aether · '+methodNames[key];
    if(!frame.hasAttribute('src')&&!frame.hasAttribute('srcdoc')){methodReady=false;frame.src=frame.dataset.src;}
    if(!dialog.open)dialog.showModal();
    document.body.classList.add('modal-open');
    document.getElementById('close-method').focus();
    selectInFrame();
  }));
  frame.addEventListener('load',()=>{methodReady=true;selectInFrame();});
  document.getElementById('close-method').addEventListener('click',closeMethod);
  dialog.addEventListener('cancel',e=>{e.preventDefault();closeMethod();});
  dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeMethod();});
  dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
  window.addEventListener('message',e=>{if(e.source!==frame.contentWindow||!e.data)return;if(e.data.type==='aether-close-method')closeMethod();if(e.data.type==='aether-contact'){closeMethod();const field=document.getElementById('contact-name');field.focus({preventScroll:true});field.scrollIntoView({block:'center',behavior:window.matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  const form=document.getElementById('contact-form');
  const status=document.getElementById('form-status');
  function message(){return 'Olá, William e Geórgia.\n\nGostaria de conversar sobre o Aether.\n\nNome: '+document.getElementById('contact-name').value.trim()+'\nEmpresa: '+document.getElementById('contact-company').value.trim()+'\n\nMomento da empresa e o que queremos explorar:\n'+document.getElementById('contact-challenge').value.trim();}
  function prepareMail(e){e.preventDefault();if(!form.reportValidity())return;const url='mailto:contato@rzrd.com.br?subject='+encodeURIComponent('Aether | '+document.getElementById('contact-company').value.trim())+'&body='+encodeURIComponent(message());window.location.href=url;status.textContent='Revise e envie no seu aplicativo de e-mail. Se ele não abrir, use “Copiar mensagem”.';}
  form.addEventListener('submit',prepareMail);
  document.getElementById('copy-message').addEventListener('click',async()=>{if(!form.reportValidity())return;const text=message();try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(text);}else{const temp=document.createElement('textarea');temp.value=text;temp.style.position='fixed';temp.style.opacity='0';document.body.appendChild(temp);temp.select();const ok=document.execCommand('copy');temp.remove();if(!ok)throw new Error('copy');}status.textContent='Mensagem copiada. Cole no e-mail para contato@rzrd.com.br.';}catch(_){status.textContent='Não foi possível copiar automaticamente. Você pode escrever diretamente para contato@rzrd.com.br.';}});
})();
