// Unmounted until the owner provides an authentic before/after pair.
export function mountComparison(root, {before, after, beforeAlt, afterAlt}) {
  if (!before || !after || !beforeAlt || !afterAlt) throw new Error('Two authentic images and descriptions are required');
  root.classList.add('comparison');
  const back=document.createElement('img'),front=document.createElement('img');
  back.src=before;back.alt=beforeAlt;front.src=after;front.alt=afterAlt;front.className='comparison-after';
  const range=document.createElement('input');range.type='range';range.min='0';range.max='100';range.value='50';range.setAttribute('aria-label','Сравнение: доля изображения после');
  const left=document.createElement('span'),right=document.createElement('span');left.textContent='До';right.textContent='После';left.className='comparison-before-label';right.className='comparison-after-label';
  const update=()=>{front.style.clipPath=`inset(0 0 0 ${range.value}%)`;range.setAttribute('aria-valuetext',`${100-Number(range.value)}% после`);};range.addEventListener('input',update);update();root.replaceChildren(back,front,left,right,range);
}
