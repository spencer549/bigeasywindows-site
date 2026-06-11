document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      if (this.hasAttribute('data-lead-modal')) return;
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

  // Lead form popup (GHL) — iframe src injected on first open (lazy, but loads visible)
  (function(){
    var modal = document.getElementById('bewLeadModal');
    if (!modal) return;
    var iframe = modal.querySelector('iframe[data-ghl-src]');
    var loaded = false;
    function openModal(e) {
      if (e) e.preventDefault();
      if (!loaded && iframe) { iframe.src = iframe.getAttribute('data-ghl-src'); loaded = true; }
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    document.querySelectorAll('[data-lead-modal]').forEach(function(trigger) {
      trigger.addEventListener('click', openModal);
    });
    modal.querySelectorAll('[data-modal-close]').forEach(function(el) {
      el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
  })();
});
