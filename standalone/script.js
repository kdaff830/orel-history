/* ============================================
   Орёл. 671 день оккупации — Scripts
   ============================================ */

(function () {
  'use strict';

  // --- Back to Top ---
  var backBtn = document.getElementById('back-to-top');
  if (backBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 600) {
        backBtn.classList.add('visible');
      } else {
        backBtn.classList.remove('visible');
      }
    }, { passive: true });

    backBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Fade-in on scroll ---
  var fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    var fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    fadeEls.forEach(function (el) {
      fadeObserver.observe(el);
    });
  } else {
    // Fallback: just show everything
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // --- Fireworks ---
  var fireworksTriggered = false;
  var fireworksAnimating = false;
  var particles = [];
  var rafId = 0;

  var COLORS = ['#8b0000', '#a01020', '#c02030', '#d44050', '#c8a415', '#dab830', '#e8cc55', '#5a0011'];

  function createBurst(ctx, cx, cy, w, h) {
    var count = 60 + Math.floor(Math.random() * 40);
    for (var i = 0; i < count; i++) {
      var angle = Math.random() * Math.PI * 2;
      var speed = 1 + Math.random() * 4;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 40 + Math.random() * 40,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 1.5 + Math.random() * 2
      });
    }
  }

  function animateFireworks() {
    var canvas = document.getElementById('fireworks-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var w = canvas.width;
    var h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    var alive = [];
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.life++;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.04;
      p.vx *= 0.99;

      var alpha = 1 - p.life / p.maxLife;
      if (alpha <= 0) continue;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      alive.push(p);
    }

    particles = alive;

    if (particles.length > 0) {
      rafId = requestAnimationFrame(animateFireworks);
    } else {
      ctx.clearRect(0, 0, w, h);
      fireworksAnimating = false;
    }
  }

  function startFireworks() {
    if (fireworksAnimating) return;
    fireworksAnimating = true;

    var canvas = document.getElementById('fireworks-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var w = canvas.width;
    var h = canvas.height;

    var bursts = [
      { x: w * 0.3, y: h * 0.25, delay: 0 },
      { x: w * 0.7, y: h * 0.3, delay: 300 },
      { x: w * 0.5, y: h * 0.2, delay: 600 },
      { x: w * 0.2, y: h * 0.35, delay: 900 },
      { x: w * 0.8, y: h * 0.25, delay: 1200 }
    ];

    bursts.forEach(function (b) {
      setTimeout(function () {
        createBurst(ctx, b.x, b.y, w, h);
      }, b.delay);
    });

    rafId = requestAnimationFrame(animateFireworks);
  }

  // Trigger fireworks when scrolling to salute-trigger
  var saluteEl = document.getElementById('salute-trigger');
  if (saluteEl && 'IntersectionObserver' in window) {
    var saluteObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !fireworksTriggered) {
          fireworksTriggered = true;
          startFireworks();
          saluteObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    saluteObserver.observe(saluteEl);
  }

})();
