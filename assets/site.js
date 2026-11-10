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
      if (e.isIntersecting) {
        e.target.classList.add('in'); io.unobserve(e.target);
        setTimeout(() => { e.target.style.transitionDelay = ''; }, 1000);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach((el, i) => {
    // Cards in the same row arrive one after another.
    if (el.classList.contains('card')) el.style.transitionDelay = (i % 2) * 0.12 + 's';
    io.observe(el);
  });
})();

// Header slims down once the page is scrolled.
(function () {
  const head = document.querySelector('.masthead');
  if (!head) return;
  let slim = false;
  const update = () => {
    const want = window.scrollY > 80;
    if (want !== slim) { slim = want; head.classList.toggle('slim', slim); }
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
})();

// Cite buttons: show the citation and copy it.
document.querySelectorAll('.cite').forEach(c => {
  const btn = c.querySelector('.cite-btn');
  const box = c.querySelector('.cite-box');
  const copy = c.querySelector('.copy-btn');
  btn.addEventListener('click', () => {
    const open = box.hidden;
    box.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
  });
  copy.addEventListener('click', async () => {
    const text = c.querySelector('.cite-text').innerText;
    try { await navigator.clipboard.writeText(text); copy.textContent = 'Copied'; }
    catch (e) { copy.textContent = 'Select and copy'; }
    setTimeout(() => { copy.textContent = 'Copy'; }, 1800);
  });
});

// Dark / light switch (dark is the default; the choice is remembered in this browser).
document.querySelectorAll('.theme-toggle').forEach(b => {
  b.addEventListener('click', () => {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
});
