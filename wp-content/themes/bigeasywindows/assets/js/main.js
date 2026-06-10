document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerH = document.querySelector('.site-header').offsetHeight;
        window.scrollTo({ top: target.offsetTop - headerH, behavior: 'smooth' });
      }
    });
  });

  // FAQ Accordion with keyboard support
  function toggleFAQ(btn) {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  }

  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function() { toggleFAQ(this); });
    btn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFAQ(this);
      }
    });
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      this.classList.toggle('active');
    });
  }

  // Mobile dropdown toggle (click, not hover)
  document.querySelectorAll('.nav-dropdown-toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth < 1024) {
        e.preventDefault();
        const dropdown = this.closest('.nav-dropdown');
        const isOpen = dropdown.classList.contains('open');
        document.querySelectorAll('.nav-dropdown.open').forEach(function(el) { el.classList.remove('open'); });
        if (!isOpen) dropdown.classList.add('open');
      }
    });
  });

  // Team carousel (Brian / Jose / Corey), auto-rotate + dot nav
  document.querySelectorAll('[data-team-carousel]').forEach(function(carousel) {
    const slides = carousel.querySelectorAll('.team-slide');
    const dots = carousel.querySelectorAll('.team-dot');
    if (slides.length < 2) return;
    let current = 0;
    let timer;

    function show(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('is-active', i === current));
      dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
    }
    function next() { show(current + 1); }
    function start() { timer = setInterval(next, 4000); }
    function stop() { clearInterval(timer); }

    dots.forEach(function(dot) {
      dot.addEventListener('click', function() {
        show(parseInt(this.getAttribute('data-slide'), 10));
        stop(); start();
      });
    });
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    start();
  });
});
