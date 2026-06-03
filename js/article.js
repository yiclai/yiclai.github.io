/* =========================================================
   ARTICLE.JS  –  Article pages
   ========================================================= */

// Page fade-in
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});

// Nav colour on scroll
const nav = document.querySelector('.site-nav');
if (nav) {
  const tick = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', tick, { passive: true });
  tick();
}

// Reading progress bar
const progressBar = document.querySelector('.reading-progress');
if (progressBar) {
  const updateProgress = () => {
    const docH  = document.documentElement.scrollHeight - window.innerHeight;
    const pct   = docH > 0 ? (window.scrollY / docH) * 100 : 0;
    progressBar.style.width = `${Math.min(pct, 100)}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

// Hero parallax
const heroBg = document.querySelector('.article-hero__bg');
if (heroBg) {
  const heroEl = heroBg.closest('.article-hero');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < heroEl.offsetHeight * 1.3) {
      heroBg.style.transform = `translateY(${y * 0.38}px)`;
    }
  }, { passive: true });
}

// Scroll reveal for article paragraphs
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealIO.observe(el));
}

// Back-to-top button
const backBtn = document.querySelector('.back-nav');
if (backBtn) {
  window.addEventListener('scroll', () => {
    backBtn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  backBtn.querySelector('button')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Page transitions
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('//') || href.startsWith('mailto')) return;

  link.addEventListener('click', e => {
    e.preventDefault();
    document.body.classList.remove('loaded');
    document.body.classList.add('fade-out');
    setTimeout(() => { window.location.href = href; }, 320);
  });
});
