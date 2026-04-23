// ============================================
// Scene: animated neural particle field (canvas 2D)
// Global ambient background with theme-aware colors
// ============================================
(function(){
  const canvas = document.getElementById('scene-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  let DPR = Math.min(window.devicePixelRatio || 1, 2);
  let W = 0, H = 0;
  let nodes = [];
  let mouse = { x: -9999, y: -9999, active: false };
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = rect.width; H = rect.height;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    const target = Math.min(120, Math.floor((W * H) / 15000));
    seed(target);
  }

  function seed(n) {
    nodes = [];
    for (let i = 0; i < n; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.5,
        hue: Math.random() < 0.55 ? 'a' : (Math.random() < 0.7 ? 'b' : 'c')
      });
    }
  }

  function getColors() {
    const s = getComputedStyle(document.body);
    return {
      a: s.getPropertyValue('--particle-a').trim() || 'rgba(200,255,100,0.7)',
      b: s.getPropertyValue('--particle-b').trim() || 'rgba(180,100,255,0.7)',
      c: s.getPropertyValue('--particle-c').trim() || 'rgba(255,150,100,0.4)',
      line: getComputedStyle(document.documentElement).getPropertyValue('--dot').trim() || 'rgba(255,255,255,0.1)'
    };
  }

  let colors = getColors();

  function step() {
    ctx.clearRect(0, 0, W, H);
    const linkDist = Math.min(160, W * 0.15);

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;

      if (mouse.active) {
        const dx = n.x - mouse.x, dy = n.y - mouse.y;
        const d2 = dx*dx + dy*dy;
        if (d2 < 180*180) {
          const f = (1 - Math.sqrt(d2)/180) * 0.6;
          n.x += (dx / Math.sqrt(d2||1)) * f;
          n.y += (dy / Math.sqrt(d2||1)) * f;
        }
      }
    }

    // Links
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i+1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < linkDist) {
          const alpha = (1 - d/linkDist) * 0.35;
          ctx.strokeStyle = colors.line.replace(/[\d.]+\)$/, `${alpha})`).replace(/(\w+)$/,'$1');
          // simpler: build rgba manually
          ctx.beginPath();
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = colors.a;
          ctx.lineWidth = 0.5;
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;

    // Dots
    for (const n of nodes) {
      ctx.fillStyle = n.hue === 'a' ? colors.a : (n.hue === 'b' ? colors.b : colors.c);
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
      ctx.fill();
    }

    if (!reduced) requestAnimationFrame(step);
  }

  window.addEventListener('resize', () => { resize(); colors = getColors(); }, { passive: true });
  window.addEventListener('mousemove', (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.active = true;
  }, { passive: true });
  window.addEventListener('mouseleave', () => { mouse.active = false; });

  // Re-fetch colors on theme change
  const obs = new MutationObserver(() => { colors = getColors(); });
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  resize();
  if (!reduced) requestAnimationFrame(step);
  else step();
})();
