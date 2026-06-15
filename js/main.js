document.addEventListener('DOMContentLoaded', () => {

  // ===== THEME TOGGLE =====
  const toggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const saved = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', saved);
  if (toggle) toggle.textContent = saved === 'dark' ? '☀️' : '🌙';
  if (toggle) toggle.addEventListener('click', () => {
    const t = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
    toggle.textContent = t === 'dark' ? '☀️' : '🌙';
  });

  // ===== HEADER SCROLL =====
  const header = document.getElementById('siteHeader');
  if (header) window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ===== HAMBURGER =====
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('mainNav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
    }));
  }

  // ===== HERO SLIDER =====
  const track = document.getElementById('slideTrack');
  const dotsContainer = document.getElementById('sliderDots');
  if (track && dotsContainer) {
    const slides = track.querySelectorAll('.slide');
    let current = 0;
    // Create dots
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });
    const dots = dotsContainer.querySelectorAll('.slider-dot');
    function goTo(n) {
      current = (n + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }
    const prev = document.getElementById('prevSlide');
    const next = document.getElementById('nextSlide');
    if (prev) prev.addEventListener('click', () => goTo(current - 1));
    if (next) next.addEventListener('click', () => goTo(current + 1));
    setInterval(() => goTo(current + 1), 5000);
  }

  // ===== TESTIMONIAL CAROUSEL =====
  const tTrack = document.getElementById('testimonialTrack');
  if (tTrack) {
    const tSlides = tTrack.querySelectorAll('.testimonial-slide');
    let tCurrent = 0;
    function goToTestimonial(n) {
      tCurrent = (n + tSlides.length) % tSlides.length;
      tTrack.style.transform = `translateX(-${tCurrent * 100}%)`;
    }
    const pT = document.getElementById('prevTestimonial');
    const nT = document.getElementById('nextTestimonial');
    if (pT) pT.addEventListener('click', () => goToTestimonial(tCurrent - 1));
    if (nT) nT.addEventListener('click', () => goToTestimonial(tCurrent + 1));
    setInterval(() => goToTestimonial(tCurrent + 1), 7000);
  }

  // ===== POPUP =====
  const popup = document.getElementById('enquiryPopup');
  const popupClose = document.getElementById('popupClose');
  if (popup && popupClose) {
    popupClose.addEventListener('click', () => popup.classList.remove('active'));
    popup.addEventListener('click', e => { if (e.target === popup) popup.classList.remove('active'); });
  }

  // ===== SCROLL ANIMATIONS =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

  // ===== SECTION HEADING ANIMATIONS =====
  const headingObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('heading-visible');
        headingObserver.unobserve(e.target); // animate only once
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.animate-heading').forEach(el => headingObserver.observe(el));

  // ===== FAQ ACCORDION =====
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });

  // ===== PATHWAY TABS =====
  document.querySelectorAll('.pathway-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.pathway-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.pathway-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.target);
      if (target) target.classList.add('active');
    });
  });

  // ===== COUNTER ANIMATION =====
  function animateCounters() {
    document.querySelectorAll('.stat-item h3').forEach(el => {
      const text = el.textContent;
      const num = parseInt(text.replace(/[^0-9]/g, ''));
      if (isNaN(num) || el.dataset.counted) return;
      el.dataset.counted = 'true';
      const suffix = text.replace(/[0-9]/g, '');
      let c = 0;
      const step = Math.ceil(num / 60);
      const timer = setInterval(() => {
        c += step;
        if (c >= num) { c = num; clearInterval(timer); }
        el.textContent = c + suffix;
      }, 30);
    });
  }
  const statsObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) animateCounters(); });
  }, { threshold: 0.3 });
  document.querySelectorAll('.stats-bar').forEach(el => statsObs.observe(el));

  // ===== VIDEO POSTER PLAY =====
  const videoPoster = document.getElementById('videoPoster');
  const schoolVideo = document.getElementById('schoolVideo');
  if (videoPoster && schoolVideo) {
    videoPoster.addEventListener('click', () => {
      videoPoster.style.display = 'none';
      schoolVideo.style.display = 'block';
      if (schoolVideo.tagName.toLowerCase() === 'video') {
        schoolVideo.play();
      } else {
        // Auto-play by appending autoplay to src for iframe
        if (!schoolVideo.src.includes('autoplay=1')) {
          schoolVideo.src += (schoolVideo.src.includes('?') ? '&' : '?') + 'autoplay=1';
        }
      }
    });
  }
});
