'use strict';
const $ = s => document.querySelector(s);
const track = (name, detail = {}) => window.dispatchEvent(new CustomEvent('vozmi:analytics', {detail:{name,...detail}}));
const menu = $('.menu-toggle'), nav = $('#nav');
function closeMenu(){menu.setAttribute('aria-expanded','false');nav.classList.remove('open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus();}});
const hero=$('#hero-video'), heroButton=$('#hero-play');
function pauseHero(){hero.pause();heroButton.setAttribute('aria-pressed','false');heroButton.textContent='Смотреть шоурил';}
heroButton.addEventListener('click',async()=>{if(!hero.paused){pauseHero();return;}if(!hero.src)hero.src=hero.dataset.src;try{await hero.play();hero.classList.add('playing');heroButton.setAttribute('aria-pressed','true');heroButton.textContent='Пауза шоурила';}catch{heroButton.textContent='Повторить воспроизведение';}});
document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseHero();});
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',e=>{if(e.matches)pauseHero();});
const heroObserver=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)pauseHero();});heroObserver.observe(hero);
const cards=[...document.querySelectorAll('.project')];
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));let count=0;cards.forEach(card=>{card.hidden=button.dataset.filter!=='all'&&!card.dataset.categories.split(' ').includes(button.dataset.filter);if(!card.hidden)count++;});$('#filter-status').textContent=`Показано проектов: ${count}`;}));
const viewer=$('#viewer');let opener;let projectsPromise;
function loadProjects(){return projectsPromise ||= fetch('assets/js/projects.json').then(r=>{if(!r.ok)throw Error('projects');return r.json();}).catch(e=>{projectsPromise=null;throw e;});}
function clearViewer(){const media=$('#viewer-media');media.querySelectorAll('video').forEach(v=>{v.pause();v.removeAttribute('src');v.load();});media.replaceChildren();document.body.style.overflow='';opener?.focus();}
viewer.addEventListener('close',clearViewer);$('#viewer-close').addEventListener('click',()=>viewer.close());
viewer.addEventListener('click',e=>{if(e.target===viewer){const r=viewer.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)viewer.close();}});
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',async()=>{opener=button;pauseHero();$('#viewer-title').textContent='Загрузка проекта…';$('#viewer-description').textContent='';$('#viewer-media').replaceChildren();viewer.showModal();document.body.style.overflow='hidden';try{const p=(await loadProjects())[Number(button.dataset.project)];if(!viewer.open)return;$('#viewer-title').textContent=p.title;$('#viewer-description').textContent=p.description;const media=document.createElement(p.type==='video'?'video':'img');media.src=p.src;if(p.type==='video'){media.controls=true;media.playsInline=true;media.preload='metadata';media.poster=p.image;}else media.alt=p.title;$('#viewer-media').replaceChildren(media);$('#similar').dataset.projectTitle=p.title;track('project_view',{project:p.title});}catch{$('#viewer-title').textContent='Не удалось загрузить проект';$('#viewer-description').textContent='Проверьте соединение и попробуйте открыть проект снова.';}}));
const form=$('#request-form');
$('#similar').addEventListener('click',()=>{const title=$('#similar').dataset.projectTitle;if(title)form.elements.task.value=`Хочу обсудить проект в стиле «${title}».`;viewer.close();setTimeout(()=>form.elements.name.focus(),0);});
document.querySelectorAll('[data-service]').forEach(a=>a.addEventListener('click',()=>{form.elements.service.value=a.dataset.service;track('service_select',{service:a.dataset.service});}));
form.elements.service.addEventListener('change',()=>track('service_select',{service:form.elements.service.value}));
form.addEventListener('input',()=>{if(!form.dataset.started){form.dataset.started='true';track('form_start');}for(const name of ['name','task'])form.elements[name].setCustomValidity('');});
form.addEventListener('submit',e=>{e.preventDefault();for(const name of ['name','task']){const input=form.elements[name];input.setCustomValidity(input.value.trim().length<(name==='task'?10:1)?'Пожалуйста, заполните поле содержательным текстом.':'');}if(!form.reportValidity())return;const val=n=>form.elements[n].value.trim()||'Обсудим';const message=`Здравствуйте! Хочу заказать AI-проект.\n\nИмя: ${val('name')}\nУслуга: ${val('service')}\nЗадача: ${val('task')}\nБюджет: ${val('budget')}\nСрок: ${val('deadline')}`;$('#form-status').textContent='Открываем WhatsApp. Для отправки подтвердите сообщение в приложении.';track('whatsapp_open',{source:'form'});window.open('https://wa.me/77776999969?text='+encodeURIComponent(message),'_blank','noopener,noreferrer');});
document.querySelectorAll('a[href="#request"]').forEach(a=>a.addEventListener('click',()=>track('discuss_project')));
document.querySelectorAll('[data-event]').forEach(a=>a.addEventListener('click',()=>track(a.dataset.event,{source:'contact'})));
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('reveal');observer.unobserve(e.target);}}),{threshold:.08});document.querySelectorAll('.service,.case-grid article,.process li').forEach(e=>observer.observe(e));}
