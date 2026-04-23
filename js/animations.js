/* ============================================================
   ANIMATIONS.JS — Canvas Neural Network Background
   ============================================================ */

'use strict';

class NeuralCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx    = this.canvas.getContext('2d');
    this.nodes  = [];
    this.mouse  = { x: null, y: null };
    this.raf    = null;
    this.config = {
      nodeCount:   65,
      maxDist:     160,
      nodeRadius:  2.5,
      speed:       0.45,
      lineOpacity: 0.35,
    };

    this.init();
  }

  get isDark() {
    return document.documentElement.getAttribute('data-theme') !== 'light';
  }

  get colors() {
    return this.isDark
      ? { node: '#00c9ff', line: '0,201,255', bg: 'transparent' }
      : { node: '#0099cc', line: '0,153,204', bg: 'transparent' };
  }

  resize() {
    this.canvas.width  = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  spawnNode() {
    return {
      x:  Math.random() * this.canvas.width,
      y:  Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * this.config.speed,
      vy: (Math.random() - 0.5) * this.config.speed,
      r:  Math.random() * 1.5 + 1,
      pulse: Math.random() * Math.PI * 2,
    };
  }

  init() {
    this.resize();

    this.nodes = Array.from({ length: this.config.nodeCount }, () => this.spawnNode());

    window.addEventListener('resize', () => {
      this.resize();
    }, { passive: true });

    this.canvas.addEventListener('mousemove', e => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    }, { passive: true });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    this.animate();

    // React to theme changes
    const observer = new MutationObserver(() => {});
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  animate() {
    this.raf = requestAnimationFrame(() => this.animate());
    this.draw();
  }

  draw() {
    const { ctx, canvas, nodes, config, mouse } = this;
    const c = this.colors;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update & draw nodes
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      n.pulse += 0.025;

      // Bounce off edges
      if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

      // Mouse attraction (subtle)
      if (mouse.x !== null) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 180) {
          n.x += (dx / d) * 0.35;
          n.y += (dy / d) * 0.35;
        }
      }

      const pulse = 0.6 + Math.sin(n.pulse) * 0.4;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
      ctx.fillStyle = c.node;
      ctx.globalAlpha = 0.8 * pulse;
      ctx.fill();
    });

    ctx.globalAlpha = 1;

    // Draw edges
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx   = nodes[i].x - nodes[j].x;
        const dy   = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < config.maxDist) {
          const alpha = (1 - dist / config.maxDist) * config.lineOpacity;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(${c.line},${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  destroy() {
    if (this.raf) cancelAnimationFrame(this.raf);
  }
}

/* ── Counter Animation ───────────────────────────────────── */
function animateCounter(el, target, duration = 1600) {
  const start = performance.now();
  const isFloat = target % 1 !== 0;

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const val = target * ease;

    el.textContent = isFloat ? val.toFixed(1) : Math.floor(val).toString();

    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toString();
  }

  requestAnimationFrame(step);
}

function initCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const val = parseFloat(el.dataset.count);
        animateCounter(el, val);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
}

/* ── Horizontal Scroll ───────────────────────────────────── */
function initHorizontalScroll() {
  document.querySelectorAll('.h-scroll').forEach(el => {
    el.addEventListener('wheel', e => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  });
}

/* ── Stagger children ────────────────────────────────────── */
function staggerReveal(containerSelector, childSelector, delayMs = 80) {
  document.querySelectorAll(containerSelector).forEach(container => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          container.querySelectorAll(childSelector).forEach((child, i) => {
            setTimeout(() => {
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
            }, i * delayMs);
          });
          observer.unobserve(container);
        }
      });
    }, { threshold: 0.1 });

    container.querySelectorAll(childSelector).forEach(child => {
      child.style.opacity = '0';
      child.style.transform = 'translateY(20px)';
      child.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    observer.observe(container);
  });
}

/* ── Init ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Only run canvas on hero page
  if (document.getElementById('hero-canvas')) {
    window._neuralCanvas = new NeuralCanvas('hero-canvas');
  }

  initCounters();
  initHorizontalScroll();
  staggerReveal('.project-grid', '.project-card');
  staggerReveal('.skills-grid', '.skill-category-card');
  staggerReveal('.awards-row', '.award-card');
});
