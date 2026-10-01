const $=(s,c=document)=>c.querySelector(s);const $$=(s,c=document)=>[...c.querySelectorAll(s)];
$$('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

const CATEGORIES={readiness:'Pre-construction readiness',monitoring:'Construction monitoring',materials:'Materials & workmanship',condition:'Condition screening',closeout:'Handover & close-out',remote:'Remote monitoring'};

const grid=$('#galleryGrid'),empty=$('#galleryEmpty'),filterBar=$('#galleryFilters'),countEl=$('#galleryCount');
let photos=[],activeFilter='all',activeSet=[],activeIndex=0;

function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

function renderFilters(){
  const counts={};
  photos.forEach(p=>{counts[p.category]=(counts[p.category]||0)+1});
  const used=Object.keys(CATEGORIES).filter(k=>counts[k]);
  if(!used.length){filterBar.hidden=true;return}
  filterBar.hidden=false;
  filterBar.innerHTML=`<button type="button" class="active" data-filter="all">All (${photos.length})</button>`+
    used.map(k=>`<button type="button" data-filter="${k}">${CATEGORIES[k]} (${counts[k]})</button>`).join('');
  $$('button',filterBar).forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.filter)));
}

function setFilter(key){
  activeFilter=key;
  $$('button',filterBar).forEach(b=>b.classList.toggle('active',b.dataset.filter===key));
  renderGrid();
}

function renderGrid(){
  activeSet=activeFilter==='all'?photos:photos.filter(p=>p.category===activeFilter);
  if(!activeSet.length){
    grid.hidden=true;empty.hidden=false;
    empty.querySelector('p').textContent=photos.length?'No photos in this category yet.':'Project photos will appear here as site visits are documented.';
    countEl.textContent='';
    return;
  }
  grid.hidden=false;empty.hidden=true;
  countEl.textContent=`${activeSet.length} photo${activeSet.length===1?'':'s'}`;
  grid.innerHTML=activeSet.map((p,i)=>`
    <figure class="gallery-card">
      <button type="button" class="gallery-thumb" data-index="${i}" aria-label="View larger: ${escapeHtml(p.title||'Project photo')}">
        <img src="assets/gallery/photos/${encodeURIComponent(p.file)}" alt="${escapeHtml(p.caption||p.title||'')}" loading="lazy">
      </button>
      <figcaption><strong>${escapeHtml(p.title||'Project photo')}</strong><span>${escapeHtml([p.location,formatDate(p.date)].filter(Boolean).join(' · '))}</span></figcaption>
    </figure>`).join('');
  $$('.gallery-thumb',grid).forEach(b=>b.addEventListener('click',()=>openLightbox(+b.dataset.index)));
}

function formatDate(d){
  if(!d)return'';
  const m=/^(\d{4})-(\d{2})$/.exec(d);
  if(!m)return d;
  const names=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${names[+m[2]-1]} ${m[1]}`;
}

const lightbox=$('#galleryLightbox'),lbImage=$('#lightboxImage'),lbTitle=$('#lightboxTitle'),lbMeta=$('#lightboxMeta'),lbCaption=$('#lightboxCaption'),lbPrev=$('#lightboxPrev'),lbNext=$('#lightboxNext');

function openLightbox(i){
  activeIndex=i;showSlide();
  lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
  $('.modal-close',lightbox)?.focus();
}
function closeLightbox(){
  lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');
}
function showSlide(){
  const p=activeSet[activeIndex];
  if(!p)return;
  lbImage.src=`assets/gallery/photos/${encodeURIComponent(p.file)}`;
  lbImage.alt=p.caption||p.title||'';
  lbTitle.textContent=p.title||'Project photo';
  lbMeta.textContent=[p.location,formatDate(p.date)].filter(Boolean).join(' · ');
  lbCaption.textContent=p.caption||'';
  const multi=activeSet.length>1;
  lbPrev.hidden=lbNext.hidden=!multi;
}
function step(dir){
  if(activeSet.length<2)return;
  activeIndex=(activeIndex+dir+activeSet.length)%activeSet.length;
  showSlide();
}
lbPrev?.addEventListener('click',()=>step(-1));
lbNext?.addEventListener('click',()=>step(1));
$('.modal-close',lightbox)?.addEventListener('click',closeLightbox);
lightbox?.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener('keydown',e=>{
  if(!lightbox?.classList.contains('open'))return;
  if(e.key==='Escape')closeLightbox();
  if(e.key==='ArrowLeft')step(-1);
  if(e.key==='ArrowRight')step(1);
});

fetch('assets/gallery/photos.json').then(r=>{if(!r.ok)throw new Error('load failed');return r.json()}).then(data=>{
  photos=Array.isArray(data)?data:[];
  photos.sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  renderFilters();renderGrid();
}).catch(()=>{photos=[];renderFilters();renderGrid()});
