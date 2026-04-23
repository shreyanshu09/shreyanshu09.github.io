// Interactions: theme, nav, scroll progress, reveal, typewriter, counters, cursor glow, tweaks, tilt
(function(){
  const html = document.documentElement;

  // ---------- Theme ----------
  const saved = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  html.setAttribute('data-theme', saved);
  const themeBtn = document.getElementById('theme-toggle');
  const mobileThemeBtn = document.getElementById('theme-toggle-m');
  function toggleTheme() {
    const cur = html.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    renderThemeIcon();
  }
  function renderThemeIcon() {
    const cur = html.getAttribute('data-theme');
    const svg = cur === 'dark'
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79z"/></svg>';
    if (themeBtn) themeBtn.innerHTML = svg;
    if (mobileThemeBtn) mobileThemeBtn.innerHTML = svg;
  }
  renderThemeIcon();
  themeBtn && themeBtn.addEventListener('click', toggleTheme);
  mobileThemeBtn && mobileThemeBtn.addEventListener('click', toggleTheme);

  // ---------- Scroll progress + section tracking ----------
  const rail = document.querySelector('.scroll-rail');
  const navLinks = document.querySelectorAll('.nav-link[data-target]');
  const sections = [...document.querySelectorAll('section[id]')];
  function onScroll() {
    const doc = document.documentElement;
    const pct = (window.scrollY / (doc.scrollHeight - window.innerHeight)) * 100;
    if (rail) rail.style.setProperty('--sp', pct + '%');

    // Active link
    const y = window.scrollY + window.innerHeight * 0.35;
    let active = sections[0]?.id;
    for (const s of sections) { if (s.offsetTop <= y) active = s.id; }
    navLinks.forEach(l => l.classList.toggle('active', l.dataset.target === active));

    // Journey spine fill
    const jr = document.querySelector('.jr-spine');
    const chapters = document.querySelectorAll('.chapter');
    if (jr && chapters.length) {
      const first = chapters[0].getBoundingClientRect();
      const last  = chapters[chapters.length-1].getBoundingClientRect();
      const total = (last.bottom) - (first.top);
      const done = Math.min(Math.max(-first.top + window.innerHeight*0.5, 0), total);
      const pctSpine = (done / total) * 100;
      jr.style.setProperty('--fill', Math.min(100, Math.max(0, pctSpine)) + '%');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  // ---------- Smooth scroll for nav ----------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); closeMobileNav(); }
    });
  });

  // ---------- Mobile nav ----------
  const hamb = document.getElementById('hamburger');
  const mnav = document.getElementById('mnav');
  function closeMobileNav() { mnav && mnav.classList.remove('on'); }
  hamb && hamb.addEventListener('click', () => mnav.classList.toggle('on'));

  // ---------- Reveal on scroll ----------
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ---------- Typewriter hero role ----------
  const typed = document.getElementById('typed-role');
  if (typed) {
    const roles = ['AI Engineer', 'Document AI Researcher', 'On-Device LLM Builder', 'RAG Systems Architect', 'Vision-Language Tinker'];
    let idx = 0, sub = 0, deleting = false;
    function tick() {
      const word = roles[idx];
      sub += deleting ? -1 : 1;
      typed.textContent = word.slice(0, sub);
      let delay = deleting ? 35 : 75;
      if (!deleting && sub === word.length) { delay = 1700; deleting = true; }
      else if (deleting && sub === 0) { deleting = false; idx = (idx + 1) % roles.length; delay = 300; }
      setTimeout(tick, delay);
    }
    tick();
  }

  // ---------- Counters ----------
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        cio.unobserve(e.target);
        const dur = 1600, start = performance.now();
        const step = (t) => {
          const p = Math.min(1, (t - start) / dur);
          const ease = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(target * ease);
          if (p < 1) requestAnimationFrame(step); else el.textContent = target;
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    cio.observe(el);
  });

  // ---------- Char split for hero title (preserves inner markup like <em>) ----------
  document.querySelectorAll('[data-split]').forEach(el => {
    let k = 0;
    const wrapChars = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        const text = node.textContent;
        // Split into words, wrap each word in nowrap span so chars stay together
        const parts = text.split(/(\s+)/);
        parts.forEach(part => {
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          if (!part) return;
          const wrap = document.createElement('span');
          wrap.style.display = 'inline-block';
          wrap.style.whiteSpace = 'nowrap';
          [...part].forEach(ch => {
            const c = document.createElement('span');
            c.className = 'char';
            c.textContent = ch;
            c.style.setProperty('--i', k++);
            wrap.appendChild(c);
          });
          frag.appendChild(wrap);
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Recurse into children (so <em class="accent"> keeps its styling)
        [...node.childNodes].forEach(wrapChars);
      }
    };
    [...el.childNodes].forEach(wrapChars);
    requestAnimationFrame(() => el.classList.add('in'));
  });

  // ---------- Cursor glow ----------
  const glow = document.querySelector('.cursor-glow');
  if (glow && window.matchMedia('(pointer: fine)').matches) {
    let tx = 0, ty = 0, x = 0, y = 0;
    window.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
    (function loop(){
      x += (tx - x) * 0.12; y += (ty - y) * 0.12;
      glow.style.left = x + 'px'; glow.style.top = y + 'px';
      requestAnimationFrame(loop);
    })();
  }

  // ---------- Skill cell mouse tracking ----------
  document.querySelectorAll('.skill-cell').forEach(c => {
    c.addEventListener('mousemove', (e) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      c.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  // ---------- Project 3D tilt ----------
  document.querySelectorAll('.proj').forEach(card => {
    let raf = 0;
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top) / r.height - 0.5) * -8;
      const ry = ((e.clientX - r.left) / r.width - 0.5) * 10;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform = `translateY(-4px) perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ---------- Tweaks panel ----------
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "accent": "duo",
    "motion": "full",
    "grain": true
  }/*EDITMODE-END*/;
  let tweaks = { ...TWEAK_DEFAULTS };

  const panel = document.getElementById('tweak-panel');
  function applyTweaks() {
    // accent
    const root = document.documentElement;
    if (tweaks.accent === 'lime')  { root.style.setProperty('--violet', 'var(--lime)'); root.style.setProperty('--violet-2', 'var(--lime-2)'); }
    else if (tweaks.accent === 'violet') { root.style.setProperty('--lime', 'var(--violet)'); root.style.setProperty('--lime-2', 'var(--violet-2)'); }
    else if (tweaks.accent === 'coral') { root.style.setProperty('--lime', 'var(--coral)'); root.style.setProperty('--violet', 'var(--coral)'); }
    else { root.style.removeProperty('--lime'); root.style.removeProperty('--violet'); root.style.removeProperty('--lime-2'); root.style.removeProperty('--violet-2'); }
    // motion
    document.body.dataset.motion = tweaks.motion;
    // grain
    document.body.classList.toggle('no-grain', !tweaks.grain);
    panel && panel.querySelectorAll('.tweak-seg').forEach(seg => {
      const key = seg.dataset.key;
      seg.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.v === String(tweaks[key])));
    });
  }

  window.addEventListener('message', (e) => {
    const d = e.data; if (!d) return;
    if (d.type === '__activate_edit_mode') panel && panel.classList.add('on');
    if (d.type === '__deactivate_edit_mode') panel && panel.classList.remove('on');
  });
  window.parent && window.parent.postMessage({ type: '__edit_mode_available' }, '*');

  if (panel) {
    panel.querySelectorAll('.tweak-seg button').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.parentElement.dataset.key;
        let v = btn.dataset.v;
        if (v === 'true') v = true; else if (v === 'false') v = false;
        tweaks[key] = v;
        applyTweaks();
        window.parent && window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: v } }, '*');
      });
    });
    applyTweaks();
  }

  // ---------- Year in footer ----------
  const yEl = document.getElementById('year'); if (yEl) yEl.textContent = new Date().getFullYear();
})();
