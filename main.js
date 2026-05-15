/* ═══════════════════════════════════════════
   RESAJ BD — main.js
═══════════════════════════════════════════ */

/* ── Nav scroll shadow ── */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Hamburger Menu ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
}

function closeMobileMenu() {
  if (mobileMenu) mobileMenu.classList.remove('open');
  if (hamburger) hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

/* Close mobile menu on outside click */
document.addEventListener('click', (e) => {
  if (
    mobileMenu && mobileMenu.classList.contains('open') &&
    !mobileMenu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    closeMobileMenu();
  }
});

/* ── Modal open / close ── */
function openModal(id) {
  const modal = document.getElementById('modal-' + id);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}
function closeModal(id) {
  const modal = document.getElementById('modal-' + id);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* Close modal on backdrop click */
document.querySelectorAll('.modal-overlay').forEach(el => {
  el.addEventListener('click', e => {
    if (e.target === el) {
      el.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

/* Close modal on Escape key */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(el => {
      el.classList.remove('open');
      document.body.style.overflow = '';
    });
    closeMobileMenu();
  }
});

/* ── 360° Value Chain — product panel toggle ── */
document.querySelectorAll('.w-card-btn').forEach(btn => {
  /* Store the closed label */
  btn.dataset.closed = btn.textContent.trim();

  btn.addEventListener('click', () => {
    const card  = btn.closest('.w-card');
    const panel = card.querySelector('.w-products-panel');
    const isOpen = panel.classList.contains('open');

    /* Close any other open panels */
    document.querySelectorAll('.w-products-panel.open').forEach(p => p.classList.remove('open'));
    document.querySelectorAll('.w-card-btn').forEach(b => {
      b.textContent = b.dataset.closed || 'View Products ↓';
    });

    if (!isOpen) {
      panel.classList.add('open');
      btn.textContent = btn.dataset.open || 'Hide Products ↑';
      setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    }
  });
});

/* ── Scroll Reveal ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Stagger card animations ── */
const staggerSelectors = [
  '.problem-grid .prob-card',
  '.innov-grid .innov-card',
  '.waste-grid .w-card',
  '.apps-grid .app-card',
  '.comp-grid .comp-card',
  '.biz-grid .biz-card',
  '.market-grid .mkt-card'
].join(',');

document.querySelectorAll(staggerSelectors).forEach((el, i) => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(20px)';
  el.style.transition = `opacity .5s ${i * 0.09}s ease, transform .5s ${i * 0.09}s ease`;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity   = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  obs.observe(el);
});

/* ── Active nav link highlight ── */
const sections = document.querySelectorAll('section[id], .problem-sec[id], .conclusion-sec[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + id
          ? 'rgba(245,168,0,1)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ── Contact Form Submit ── */
function handleContactSubmit(btn) {
  const form = btn.closest('.contact-form');
  const inputs = form.querySelectorAll('.cf-input');
  let valid = true;
  inputs.forEach(inp => {
    if (!inp.value.trim()) {
      inp.style.borderColor = 'rgba(245,168,0,0.8)';
      valid = false;
    } else {
      inp.style.borderColor = '';
    }
  });
  if (!valid) return;
  btn.textContent = 'Sending…';
  btn.style.opacity = '0.7';
  setTimeout(() => {
    btn.style.display = 'none';
    const successEl = document.getElementById('cf-success');
    if (successEl) successEl.style.display = 'block';
    inputs.forEach(inp => { inp.value = ''; inp.style.borderColor = ''; });
  }, 1000);
}