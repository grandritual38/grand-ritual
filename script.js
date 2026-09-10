const reveal=document.querySelectorAll('.reveal');function show(){reveal.forEach(e=>{if(e.getBoundingClientRect().top<innerHeight-80)e.classList.add('active')})}addEventListener('scroll',show);addEventListener('load',show);document.querySelectorAll('.faq-item').forEach(i=>i.querySelector('.faq-question').onclick=()=>i.classList.toggle('active'));const b=document.getElementById('menuBtn'),n=document.getElementById('nav');if(b&&n){b.onclick=()=>n.classList.toggle('open');n.querySelectorAll('a').forEach(a=>a.onclick=()=>n.classList.remove('open'))}
// Галерея товара с увеличением
(() => {
  const modal = document.getElementById('productModal');
  const cards = [...document.querySelectorAll('[data-product-open]')];
  const mainImage = document.getElementById('productModalImage');
  const stage = document.getElementById('productImageStage');
  const zoomValue = document.getElementById('zoomValue');
  const thumbnailsWrap = modal?.querySelector('.product-thumbnails');
  const modalTitle = document.getElementById('productModalTitle');
  const modalDescription = document.getElementById('productModalDescription');
  const modalPrice = modal?.querySelector('.product-modal-price');
  if (!modal || !cards.length || !mainImage || !stage || !thumbnailsWrap || !modalTitle || !modalDescription || !modalPrice) return;

  let images = [];
  let currentIndex = 0;
  const previewImages = {"images/products/coffins/coffin-12-1-jpg.webp": "images/previews/coffins/coffin-12-1.webp", "images/products/coffins/coffin-12-2-jpg.webp": "images/previews/coffins/coffin-12-2.webp", "images/products/coffins/coffin-5-1-jpg.webp": "images/previews/coffins/coffin-5-1.webp", "images/products/coffins/coffin-5-2-jpg.webp": "images/previews/coffins/coffin-5-2.webp", "images/products/coffins/coffin-bordeaux-1-jpeg.webp": "images/previews/coffins/coffin-bordeaux-1.webp", "images/products/coffins/coffin-bordeaux-2-jpeg.webp": "images/previews/coffins/coffin-bordeaux-2.webp", "images/products/coffins/coffin-bordeaux-3-jpeg.webp": "images/previews/coffins/coffin-bordeaux-3.webp", "images/products/coffins/coffin-lux-1-jpg.webp": "images/previews/coffins/coffin-lux-1.webp", "images/products/coffins/coffin-lux-2-jpg.webp": "images/previews/coffins/coffin-lux-2.webp", "images/products/crosses/angel-1-png.webp": "images/previews/crosses/angel-1.webp", "images/products/crosses/angel-2-png.webp": "images/previews/crosses/angel-2.webp", "images/products/crosses/angel-3-png.webp": "images/previews/crosses/angel-3.webp", "images/products/crosses/cross-16-1-png.webp": "images/previews/crosses/cross-16-1.webp", "images/products/crosses/cross-16-2-png.webp": "images/previews/crosses/cross-16-2.webp", "images/products/crosses/cross-16-3-png.webp": "images/previews/crosses/cross-16-3.webp", "images/products/crosses/cross-20-1-png.webp": "images/previews/crosses/cross-20-1.webp", "images/products/crosses/cross-20-2-png.webp": "images/previews/crosses/cross-20-2.webp", "images/products/crosses/cross-20-3-png.webp": "images/previews/crosses/cross-20-3.webp", "images/products/crosses/cross-21-1-png.webp": "images/previews/crosses/cross-21-1.webp", "images/products/crosses/cross-21-2-png.webp": "images/previews/crosses/cross-21-2.webp", "images/products/crosses/cross-21-3-png.webp": "images/previews/crosses/cross-21-3.webp", "images/products/crosses/cross-3-1-png.webp": "images/previews/crosses/cross-3-1.webp", "images/products/crosses/cross-3-2-png.webp": "images/previews/crosses/cross-3-2.webp", "images/products/crosses/cross-3-3-png.webp": "images/previews/crosses/cross-3-3.webp", "images/products/crosses/cross-33-1-png.webp": "images/previews/crosses/cross-33-1.webp", "images/products/crosses/cross-33-2-png.webp": "images/previews/crosses/cross-33-2.webp", "images/products/crosses/cross-33-3-png.webp": "images/previews/crosses/cross-33-3.webp", "images/products/crosses/drevo-1-v2-png.webp": "images/previews/crosses/drevo-1-v2.webp", "images/products/crosses/drevo-2-v2-png.webp": "images/previews/crosses/drevo-2-v2.webp", "images/products/crosses/drevo-3-v2-png.webp": "images/previews/crosses/drevo-3-v2.webp", "images/products/monuments/pedestal-1-jpg.webp": "images/previews/monuments/pedestal-1.webp", "images/products/monuments/pedestal-2-jpg.webp": "images/previews/monuments/pedestal-2.webp", "images/products/monuments/pedestal-v2-1-jpg.webp": "images/previews/monuments/pedestal-v2-1.webp", "images/products/monuments/pedestal-v2-2-jpg.webp": "images/previews/monuments/pedestal-v2-2.webp", "images/products/wreaths/basket-baby-1-jpeg.webp": "images/previews/wreaths/basket-baby-1.webp", "images/products/wreaths/basket-baby-2-jpeg.webp": "images/previews/wreaths/basket-baby-2.webp", "images/products/wreaths/basket-baby-3-jpeg.webp": "images/previews/wreaths/basket-baby-3.webp", "images/products/wreaths/basket-large-1-jpeg.webp": "images/previews/wreaths/basket-large-1.webp", "images/products/wreaths/basket-large-2-jpeg.webp": "images/previews/wreaths/basket-large-2.webp", "images/products/wreaths/basket-large-v2-1-jpg.webp": "images/previews/wreaths/basket-large-v2-1.webp", "images/products/wreaths/basket-large-v2-2-jpg.webp": "images/previews/wreaths/basket-large-v2-2.webp", "images/products/wreaths/basket-medium-1-jpg.webp": "images/previews/wreaths/basket-medium-1.webp", "images/products/wreaths/basket-medium-2-jpg.webp": "images/previews/wreaths/basket-medium-2.webp", "images/products/wreaths/basket-medium-v2-1-jpg.webp": "images/previews/wreaths/basket-medium-v2-1.webp", "images/products/wreaths/basket-medium-v2-2-jpg.webp": "images/previews/wreaths/basket-medium-v2-2.webp", "images/products/wreaths/basket-medium-v2-3-jpg.webp": "images/previews/wreaths/basket-medium-v2-3.webp", "images/products/wreaths/basket-medium-v3-1-jpeg.webp": "images/previews/wreaths/basket-medium-v3-1.webp", "images/products/wreaths/basket-medium-v3-2-jpeg.webp": "images/previews/wreaths/basket-medium-v3-2.webp", "images/products/wreaths/basket-moscow-b-1-jpg.webp": "images/previews/wreaths/basket-moscow-b-1.webp", "images/products/wreaths/basket-moscow-b-2-jpg.webp": "images/previews/wreaths/basket-moscow-b-2.webp", "images/products/wreaths/wreath-1-1-jpg.webp": "images/previews/wreaths/wreath-1-1.webp", "images/products/wreaths/wreath-1-2-jpg.webp": "images/previews/wreaths/wreath-1-2.webp", "images/products/wreaths/wreath-b-13000-1-jpeg.webp": "images/previews/wreaths/wreath-b-13000-1.webp", "images/products/wreaths/wreath-b-13000-2-jpeg.webp": "images/previews/wreaths/wreath-b-13000-2.webp", "images/products/wreaths/wreath-b-13000-3-jpeg.webp": "images/previews/wreaths/wreath-b-13000-3.webp", "images/products/wreaths/wreath-blue-green-1-jpg.webp": "images/previews/wreaths/wreath-blue-green-1.webp", "images/products/wreaths/wreath-blue-green-2-jpg.webp": "images/previews/wreaths/wreath-blue-green-2.webp", "images/products/wreaths/wreath-blue-pink-1-jpg.webp": "images/previews/wreaths/wreath-blue-pink-1.webp", "images/products/wreaths/wreath-blue-pink-2-jpg.webp": "images/previews/wreaths/wreath-blue-pink-2.webp", "images/products/wreaths/wreath-circle-euro-1-jpg.webp": "images/previews/wreaths/wreath-circle-euro-1.webp", "images/products/wreaths/wreath-econom-1-jpg.webp": "images/previews/wreaths/wreath-econom-1.webp", "images/products/wreaths/wreath-econom-2-jpg.webp": "images/previews/wreaths/wreath-econom-2.webp", "images/products/wreaths/wreath-econom-v2-1-jpg.webp": "images/previews/wreaths/wreath-econom-v2-1.webp", "images/products/wreaths/wreath-econom-v2-2-jpg.webp": "images/previews/wreaths/wreath-econom-v2-2.webp", "images/products/wreaths/wreath-garland-1-jpg.webp": "images/previews/wreaths/wreath-garland-1.webp", "images/products/wreaths/wreath-garland-2-jpg.webp": "images/previews/wreaths/wreath-garland-2.webp", "images/products/wreaths/wreath-golden-1-jpg.webp": "images/previews/wreaths/wreath-golden-1.webp", "images/products/wreaths/wreath-golden-2-jpg.webp": "images/previews/wreaths/wreath-golden-2.webp", "images/products/wreaths/wreath-golden-3-jpg.webp": "images/previews/wreaths/wreath-golden-3.webp", "images/products/wreaths/wreath-grave-1-jpeg.webp": "images/previews/wreaths/wreath-grave-1.webp", "images/products/wreaths/wreath-grave-2-jpeg.webp": "images/previews/wreaths/wreath-grave-2.webp", "images/products/wreaths/wreath-grave-3-jpeg.webp": "images/previews/wreaths/wreath-grave-3.webp", "images/products/wreaths/wreath-novinka-1-jpg.webp": "images/previews/wreaths/wreath-novinka-1.webp", "images/products/wreaths/wreath-novinka-2-jpg.webp": "images/previews/wreaths/wreath-novinka-2.webp", "images/products/wreaths/wreath-novinka-v2-1-jpeg.webp": "images/previews/wreaths/wreath-novinka-v2-1.webp", "images/products/wreaths/wreath-novinka-v2-2-jpeg.webp": "images/previews/wreaths/wreath-novinka-v2-2.webp", "images/products/wreaths/wreath-novinka-v4-1-jpg.webp": "images/previews/wreaths/wreath-novinka-v4-1.webp", "images/products/wreaths/wreath-novinka-v4-2-jpg.webp": "images/previews/wreaths/wreath-novinka-v4-2.webp", "images/products/wreaths/wreath-r-1-jpg.webp": "images/previews/wreaths/wreath-r-1.webp", "images/products/wreaths/wreath-r-2-jpg.webp": "images/previews/wreaths/wreath-r-2.webp", "images/products/wreaths/wreath-super-econom-1-jpg.webp": "images/previews/wreaths/wreath-super-econom-1.webp", "images/products/wreaths/wreath-super-econom-2-jpg.webp": "images/previews/wreaths/wreath-super-econom-2.webp", "images/products/wreaths/wreath-super-econom-3-jpg.webp": "images/previews/wreaths/wreath-super-econom-3.webp", "images/products/wreaths/wreath-super-econom-v2-1-jpg.webp": "images/previews/wreaths/wreath-super-econom-v2-1.webp", "images/products/wreaths/wreath-super-econom-v2-2-jpg.webp": "images/previews/wreaths/wreath-super-econom-v2-2.webp", "images/products/wreaths/wreath-super-econom-v2-3-jpg.webp": "images/previews/wreaths/wreath-super-econom-v2-3.webp", "images/products/wreaths/wreath-untitled-1-jpeg.webp": "images/previews/wreaths/wreath-untitled-1.webp", "images/products/wreaths/wreath-untitled-2-jpeg.webp": "images/previews/wreaths/wreath-untitled-2.webp", "images/products/wreaths/wreath-untitled-8500-1-png.webp": "images/previews/wreaths/wreath-untitled-8500-1.webp", "images/products/wreaths/wreath-untitled-8500-2-png.webp": "images/previews/wreaths/wreath-untitled-8500-2.webp", "images/products/wreaths/wreath-untitled-8500-3-png.webp": "images/previews/wreaths/wreath-untitled-8500-3.webp", "images/products/wreaths/wreath-untitled-v2-1-jpeg.webp": "images/previews/wreaths/wreath-untitled-v2-1.webp", "images/products/wreaths/wreath-untitled-v2-2-jpeg.webp": "images/previews/wreaths/wreath-untitled-v2-2.webp", "images/products/wreaths/wreath-untitled-v4-1-png.webp": "images/previews/wreaths/wreath-untitled-v4-1.webp", "images/products/wreaths/wreath-untitled-v4-2-png.webp": "images/previews/wreaths/wreath-untitled-v4-2.webp", "images/products/wreaths/wreath-v-1-jpg.webp": "images/previews/wreaths/wreath-v-1.webp", "images/products/wreaths/wreath-v-2-jpg.webp": "images/previews/wreaths/wreath-v-2.webp", "images/products/wreaths/wreath-v-3-jpg.webp": "images/previews/wreaths/wreath-v-3.webp", "images/products/wreaths/wreath-white-1-jpeg.webp": "images/previews/wreaths/wreath-white-1.webp", "images/products/wreaths/wreath-white-2-jpeg.webp": "images/previews/wreaths/wreath-white-2.webp", "images/products/wreaths/wreath-white-3-jpeg.webp": "images/previews/wreaths/wreath-white-3.webp"};
  let zoom = 1;
  let panX = 0, panY = 0;
  let suppressClick = false;
  let lastFocused = null;
  let currentTitle = '';

  const applyTransform = () => {
    const maxX = stage.clientWidth * (zoom - 1) / 2;
    const maxY = stage.clientHeight * (zoom - 1) / 2;
    panX = Math.max(-maxX, Math.min(maxX, panX));
    panY = Math.max(-maxY, Math.min(maxY, panY));
    mainImage.style.transformOrigin = 'center';
    mainImage.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`;
  };
  const setZoom = (nextZoom, originX = 50, originY = 50) => {
    const previousZoom = zoom;
    zoom = Math.min(3, Math.max(1, nextZoom));
    if (zoom === 1) { panX = 0; panY = 0; }
    else if (previousZoom === 1) {
      panX = (50 - originX) / 100 * stage.clientWidth * (zoom - 1);
      panY = (50 - originY) / 100 * stage.clientHeight * (zoom - 1);
    }
    applyTransform();
    mainImage.classList.toggle('zoomed', zoom > 1);
    stage.classList.toggle('is-zoomed', zoom > 1);
    if (zoomValue) zoomValue.textContent = `${Math.round(zoom * 100)}%`;
  };

  const updateThumbs = () => {
    const thumbs = [...thumbnailsWrap.querySelectorAll('[data-gallery-index]')];
    thumbs.forEach((button, i) => button.classList.toggle('active', i === currentIndex));
  };

  const showImage = index => {
    if (!images.length) return;
    currentIndex = (index + images.length) % images.length;
    mainImage.src = images[currentIndex];
    mainImage.alt = `${currentTitle} — фотография ${currentIndex + 1}`;
    updateThumbs();
    setZoom(1);
  };

  const renderThumbnails = () => {
    thumbnailsWrap.innerHTML = images.map((src, i) => `
      <button class="product-thumbnail ${i === 0 ? 'active' : ''}" type="button" data-gallery-index="${i}" aria-label="Открыть фотографию ${i + 1}">
        <img alt="${currentTitle} — миниатюра ${i + 1}" src="${previewImages[src] || src}"/>
      </button>`).join('');
    thumbnailsWrap.querySelectorAll('[data-gallery-index]').forEach(button => {
      button.addEventListener('click', () => showImage(Number(button.dataset.galleryIndex)));
    });
  };

  const openModal = card => {
    images = (card.dataset.images || '').split('|').filter(Boolean);
    currentTitle = card.dataset.title || 'Товар';
    modalTitle.textContent = currentTitle;
    modalDescription.textContent = card.dataset.description || '';
    modalPrice.textContent = card.dataset.price || '';
    renderThumbnails();
    lastFocused = document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    showImage(0);
    modal.querySelector('.product-modal-close')?.focus();
  };

  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    setZoom(1);
    lastFocused?.focus?.();
  };

  cards.forEach(card => {
    card.addEventListener('click', event => {
      if (event.target.closest('a')) return;
      openModal(card);
    });

    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(card);
      }
    });
  });

  modal.querySelectorAll('[data-modal-close]').forEach(button => button.addEventListener('click', closeModal));
  modal.querySelector('[data-gallery-prev]')?.addEventListener('click', () => showImage(currentIndex - 1));
  modal.querySelector('[data-gallery-next]')?.addEventListener('click', () => showImage(currentIndex + 1));
  modal.querySelector('[data-zoom-in]')?.addEventListener('click', () => setZoom(zoom + 0.5));
  modal.querySelector('[data-zoom-out]')?.addEventListener('click', () => setZoom(zoom - 0.5));
  modal.querySelector('[data-zoom-reset]')?.addEventListener('click', () => setZoom(1));

  mainImage.addEventListener('click', event => {
    if (suppressClick) { suppressClick = false; return; }
    if (zoom > 1) {
      setZoom(1);
      return;
    }
    const rect = mainImage.getBoundingClientRect();
    const originX = ((event.clientX - rect.left) / rect.width) * 100;
    const originY = ((event.clientY - rect.top) / rect.height) * 100;
    setZoom(2, originX, originY);
  });

  // One-finger swipe at normal size; drag to explore an enlarged photo.
  let gesture = null;
  mainImage.draggable = false;
  stage.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0 || event.target.closest('button')) return;
    suppressClick = false;
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY,
      panX, panY, moved: false, enlarged: zoom > 1 };
  });
  stage.addEventListener('pointermove', event => {
    if (!gesture || event.pointerId !== gesture.id) return;
    const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
    if (Math.hypot(dx, dy) > 8) {
      gesture.moved = true;
      suppressClick = true;
      if (!stage.hasPointerCapture(event.pointerId)) stage.setPointerCapture(event.pointerId);
    }
    if (gesture.enlarged && gesture.moved) {
      stage.classList.add('is-dragging');
      panX = gesture.panX + dx; panY = gesture.panY + dy;
      applyTransform();
    }
  });
  const finishGesture = event => {
    if (!gesture || event.pointerId !== gesture.id) return;
    const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
    if (event.type === 'pointerup' && !gesture.enlarged &&
        Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      showImage(currentIndex + (dx < 0 ? 1 : -1));
    }
    stage.classList.remove('is-dragging');
    if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
    gesture = null;
  };
  stage.addEventListener('pointerup', finishGesture);
  stage.addEventListener('pointercancel', finishGesture);
  window.addEventListener('resize', applyTransform);

  stage.addEventListener('wheel', event => {
    if (!modal.classList.contains('open')) return;
    event.preventDefault();
    const rect = mainImage.getBoundingClientRect();
    const originX = ((event.clientX - rect.left) / rect.width) * 100;
    const originY = ((event.clientY - rect.top) / rect.height) * 100;
    setZoom(zoom + (event.deltaY < 0 ? 0.25 : -0.25), originX, originY);
  }, { passive: false });

  document.addEventListener('keydown', event => {
    if (!modal.classList.contains('open')) return;
    if (event.key === 'Escape') closeModal();
    if (event.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (event.key === 'ArrowRight') showImage(currentIndex + 1);
    if (event.key === '+' || event.key === '=') setZoom(zoom + 0.5);
    if (event.key === '-') setZoom(zoom - 0.5);
  });
})();

// Price filters and pagination work with cards saved by the local editor.
(() => {
  const grid = document.querySelector('.product-grid');
  if (!grid) return;
  const cards = [...grid.querySelectorAll('[data-product-open]')];
  const isMonuments = /(?:^|\/)monuments\.html$/.test(location.pathname);
  const pageSize = isMonuments ? 12 : Infinity;
  const getPrice = card => {
    const text = card.dataset.price || '';
    if (!/\d/.test(text)) return null;
    const amount = Number(text.replace(/[^\d.,]/g, '').replace(',', '.'));
    return Number.isFinite(amount) ? amount : null;
  };
  const entries = cards.map((card, index) => ({ card, index, price: getPrice(card), kind: card.dataset.subcategory || 'other' }));
  const tools = document.createElement('form');
  tools.className = 'catalog-tools';
  tools.setAttribute('aria-label', 'Фильтр и сортировка товаров');
  tools.innerHTML = `<div class="catalog-control"><label for="catalog-price-min">Цена от, ₽</label><input id="catalog-price-min" type="number" min="0" step="0.01" inputmode="decimal" placeholder="Любая"></div>
    <div class="catalog-control"><label for="catalog-price-max">Цена до, ₽</label><input id="catalog-price-max" type="number" min="0" step="0.01" inputmode="decimal" placeholder="Любая"></div>
    <div class="catalog-control catalog-control-sort"><label for="catalog-sort">Сортировка</label><select id="catalog-sort"><option value="asc">Сначала дешевле</option><option value="desc">Сначала дороже</option></select></div>
    <button class="catalog-reset" type="button">Сбросить</button>
    <p class="catalog-results" role="status" aria-live="polite" aria-atomic="true"></p>`;
  const empty = document.createElement('p');
  empty.className = 'catalog-empty';
  empty.hidden = true;
  const pagination = document.createElement('nav');
  pagination.className = 'catalog-pagination';
  pagination.setAttribute('aria-label', 'Страницы товаров');
  grid.before(tools);
  grid.after(empty, pagination);
  const minInput = tools.querySelector('#catalog-price-min');
  const maxInput = tools.querySelector('#catalog-price-max');
  const sort = tools.querySelector('#catalog-sort');
  const results = tools.querySelector('.catalog-results');
  let currentPage = 1;
  let currentKind = 'all';
  const kindButtons = [];
  if (isMonuments) {
    const kinds = [['all', 'Все'], ['vertical', 'Вертикальные памятники'],
      ['horizontal', 'Горизонтальные памятники'], ['crosses', 'Кресты'], ['pedestals', 'Тумбы']];
    // Newly added cards without a type stay available until assigned.
    if (entries.some(e => !['vertical', 'horizontal', 'crosses', 'pedestals'].includes(e.kind))) kinds.push(['other', 'Другие']);
    const group = document.createElement('div');
    group.className = 'catalog-subcategories';
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', 'Вид памятника или тумбы');
    kinds.forEach(([value, label]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.kind = value;
      const count = value === 'all' ? entries.length : entries.filter(e => value === 'other' ? !['vertical', 'horizontal', 'crosses', 'pedestals'].includes(e.kind) : e.kind === value).length;
      button.textContent = label + ' · ' + count;
      button.setAttribute('aria-pressed', String(value === 'all'));
      button.addEventListener('click', () => { currentKind = value; currentPage = 1; render(); });
      group.append(button); kindButtons.push(button);
    });
    tools.prepend(group);
  }
  function render(scroll = false) {
    const min = minInput.value === '' ? null : Number(minInput.value);
    const max = maxInput.value === '' ? null : Number(maxInput.value);
    const invalid = (min !== null && (!Number.isFinite(min) || min < 0)) ||
      (max !== null && (!Number.isFinite(max) || max < 0)) ||
      (min !== null && max !== null && min > max);
    kindButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.kind === currentKind)));
    const kindEntries = currentKind === 'all' ? entries : entries.filter(e => currentKind === 'other' ? !['vertical', 'horizontal', 'crosses', 'pedestals'].includes(e.kind) : e.kind === currentKind);
    let filtered = invalid ? [] : kindEntries.filter(e =>
      (min === null && max === null) ||
      (e.price !== null && (min === null || e.price >= min) && (max === null || e.price <= max)));
    filtered.sort((a, b) => {
      if (a.price === null) return b.price === null ? a.index - b.index : 1;
      if (b.price === null) return -1;
      return (sort.value === 'desc' ? b.price - a.price : a.price - b.price) || a.index - b.index;
    });
    const pages = pageSize === Infinity ? 1 : Math.max(1, Math.ceil(filtered.length / pageSize));
    currentPage = Math.min(Math.max(1, currentPage), pages);
    const start = pageSize === Infinity ? 0 : (currentPage - 1) * pageSize;
    const shown = filtered.slice(start, pageSize === Infinity ? undefined : start + pageSize);
    entries.forEach(e => { e.card.hidden = true; });
    // Keep every card in the grid: the editor can still read the entire catalog.
    filtered.forEach(e => grid.append(e.card));
    shown.forEach(e => { e.card.hidden = false; });
    empty.hidden = shown.length !== 0;
    empty.textContent = invalid ? 'Проверь диапазон: цены должны быть неотрицательными, а цена «от» не больше цены «до».' :
      cards.length ? 'По выбранным условиям нет товаров. Измени подкатегорию, цену или сбрось фильтр.' : 'В этом разделе пока нет товаров.';
    minInput.setAttribute('aria-invalid', String(invalid));
    maxInput.setAttribute('aria-invalid', String(invalid));
    results.textContent = invalid ? 'Некорректный диапазон цены.' : !cards.length ? 'Товаров: 0' :
      `Найдено: ${filtered.length} из ${kindEntries.length}` + (shown.length ? ` · Показаны ${start + 1}–${start + shown.length}` : '');
    pagination.replaceChildren();
    pagination.hidden = pages <= 1;
    if (pages > 1) {
      const addButton = (label, target, disabled, active = false) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = label;
        button.disabled = disabled;
        button.setAttribute('aria-label', /^\d+$/.test(label) ? `Страница ${label}` : label);
        if (active) button.setAttribute('aria-current', 'page');
        button.addEventListener('click', () => {
          currentPage = target; render(true);
          pagination.querySelector('[aria-current="page"]')?.focus({ preventScroll: true });
        });
        pagination.append(button);
      };
      addButton('Назад', currentPage - 1, currentPage === 1);
      const visible = [...new Set([1, pages, currentPage - 1, currentPage, currentPage + 1])].filter(n => n >= 1 && n <= pages).sort((a, b) => a - b);
      let previous = 0;
      visible.forEach(n => {
        if (n - previous > 1) { const dots = document.createElement('span'); dots.textContent = '…'; pagination.append(dots); }
        addButton(String(n), n, false, n === currentPage); previous = n;
      });
      addButton('Далее', currentPage + 1, currentPage === pages);
    }
    if (scroll) tools.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  const resetPage = () => { currentPage = 1; render(); };
  tools.addEventListener('submit', event => { event.preventDefault(); resetPage(); });
  minInput.addEventListener('input', resetPage);
  maxInput.addEventListener('input', resetPage);
  sort.addEventListener('change', resetPage);
  tools.querySelector('.catalog-reset').addEventListener('click', () => {
    minInput.value = ''; maxInput.value = ''; sort.value = 'asc'; currentKind = 'all'; resetPage();
  });
  render();
})();
