// Expandable items: opening one closes the others in the same group.
// Modern browsers do this natively through <details name="...">; this covers older ones.
document.querySelectorAll('details.item').forEach(d => {
  d.addEventListener('toggle', () => {
    if (!d.open) return;
    document.querySelectorAll(`details.item[name="${d.getAttribute('name')}"]`).forEach(o => {
      if (o !== d) o.open = false;
    });
  });
});

// Arriving from a Home figure (research.html#phone): open that paper and bring it into view.
function openFromHash() {
  const id = decodeURIComponent(location.hash.slice(1));
  const target = id && document.getElementById(id);
  if (target && target.tagName === 'DETAILS') {
    target.open = true;
    target.scrollIntoView({ block: 'start' });
  }
}
openFromHash();
window.addEventListener('hashchange', openFromHash);

// Figure lightbox (Home page).
const box = document.querySelector('.lightbox');
if (box) {
  const big = box.querySelector('img');
  document.querySelectorAll('.fig').forEach(btn => {
    btn.addEventListener('click', () => {
      big.src = btn.dataset.full;
      big.alt = btn.querySelector('img').alt;
      box.showModal();
    });
  });
  box.addEventListener('click', e => {
    if (e.target === box || e.target.classList.contains('close')) box.close();
  });
}

// Scroll reveal: fade sections and cards in as they enter the view.
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { items.forEach(el => el.classList.add('in')); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach((el, i) => {
    // Cards in the same row arrive one after another.
    if (el.classList.contains('card')) el.style.transitionDelay = (i % 2) * 0.12 + 's';
    io.observe(el);
  });
})();
