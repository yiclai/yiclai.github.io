/* =========================================================
   MAIN.JS  –  Homepage
   ========================================================= */

// Page fade-in on load
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});

// Nav colour change on scroll
const nav = document.querySelector('.site-nav');
if (nav) {
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Parallax hero background
const heroBg = document.querySelector('.hero__bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const heroH = heroBg.closest('.hero').offsetHeight;
    if (y < heroH * 1.2) {
      heroBg.style.transform = `translateY(${y * 0.38}px)`;
    }
  }, { passive: true });
}

// Smooth page-transition on internal links
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

// Card entrance animation via IntersectionObserver
const cards = document.querySelectorAll('.article-card');
if (cards.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 100);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s cubic-bezier(0.4,0,0.2,1)';
    io.observe(card);
  });
}
