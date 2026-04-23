// Shared nav, footer, tweaks, scene for all pages
(function(){
  const currentPage = (document.body.dataset.page || 'index');

  const navItems = [
    { id: 'index',      label: 'Home',       href: 'index.html' },
    { id: 'about',      label: 'About',      href: 'about.html' },
    { id: 'experience', label: 'Experience', href: 'experience.html' },
    { id: 'projects',   label: 'Projects',   href: 'projects.html' },
    { id: 'research',   label: 'Research',   href: 'research.html' },
    { id: 'contact',    label: 'Contact',    href: 'contact.html' },
  ];

  // ---- Scroll progress rail ----
  const rail = document.createElement('div');
  rail.className = 'scroll-rail';
  document.body.prepend(rail);

  // ---- Ambient scene ----
  const sceneBg = document.createElement('div');
  sceneBg.className = 'scene-bg';
  sceneBg.setAttribute('aria-hidden', 'true');
  sceneBg.innerHTML = `
    <div class="scene-gradient"></div>
    <div class="scene-grid"></div>
    <canvas id="scene-canvas"></canvas>
  `;
  document.body.prepend(sceneBg);

  // ---- Cursor glow ----
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  cursorGlow.setAttribute('aria-hidden', 'true');
  document.body.appendChild(cursorGlow);

  // ---- Navbar ----
  const nav = document.createElement('nav');
  nav.className = 'nav';
  nav.innerHTML = `
    <a href="index.html" class="nav-logo">Shreyanshu Bhushan</a>
    <div class="nav-links">
      ${navItems.map(it => `<a class="nav-link ${it.id === currentPage ? 'active' : ''}" href="${it.href}">${it.label}</a>`).join('')}
    </div>
    <div class="nav-tools">
      <button id="theme-toggle" class="icon-btn" aria-label="Toggle theme"></button>
      <a href="assets/cv.pdf" download class="icon-btn" aria-label="Download CV" title="Download CV">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      </a>
      <button id="hamburger" class="hamburger icon-btn" aria-label="Menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>
      </button>
    </div>
  `;
  document.body.prepend(nav);

  // ---- Mobile sheet ----
  const mnav = document.createElement('nav');
  mnav.className = 'mnav';
  mnav.id = 'mnav';
  mnav.innerHTML = `
    ${navItems.map(it => `<a href="${it.href}" class="${it.id === currentPage ? 'active' : ''}">${it.label}</a>`).join('')}
    <div style="display:flex; gap:0.6rem; margin-top:1.5rem;">
      <button id="theme-toggle-m" class="icon-btn" style="background:var(--glass); border:1px solid var(--line);"></button>
      <a href="assets/cv.pdf" download class="btn btn-ghost">Download CV</a>
    </div>
  `;
  // insert after top nav
  nav.after(mnav);

  // ---- Footer ----
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <div class="container">
      <p class="foot-sig">Shreyanshu <em>Bhushan</em>.</p>
      <div class="foot-top" style="margin-top:3rem;">
        <div class="foot-col">
          <h5>About</h5>
          <p style="color:var(--fg-2); font-size:0.9rem; line-height:1.6;">AI Engineer &amp; Researcher at NEOALI Co. Ltd. Seoul, South Korea — Document AI, LLMs, RAG, OCR, and Vision-Language Models.</p>
        </div>
        <div class="foot-col">
          <h5>Navigate</h5>
          <a href="about.html">About</a>
          <a href="experience.html">Experience</a>
          <a href="projects.html">Projects</a>
          <a href="research.html">Research</a>
          <a href="contact.html">Contact</a>
        </div>
        <div class="foot-col">
          <h5>Elsewhere</h5>
          <a href="https://linkedin.com/in/shreyanshu09" target="_blank" rel="noopener">LinkedIn ↗</a>
          <a href="https://github.com/shreyanshu09" target="_blank" rel="noopener">GitHub ↗</a>
          <a href="mailto:shreyanshubhushan@gmail.com">Email ↗</a>
        </div>
        <div class="foot-col">
          <h5>Artifacts</h5>
          <a href="assets/cv.pdf" download>CV (PDF) ↓</a>
          <a href="https://github.com/shreyanshu09/HanForge" target="_blank" rel="noopener">HanForge (OSS) ↗</a>
        </div>
      </div>
      <div class="foot-bottom">
        <span>© <span id="year"></span> Shreyanshu Bhushan · Seoul, KR</span>
        <span>Hand-built · no frameworks · runs everywhere</span>
      </div>
    </div>
  `;
  document.body.appendChild(footer);

  // ---- Tweaks panel ----
  const tp = document.createElement('aside');
  tp.className = 'tweak-panel';
  tp.id = 'tweak-panel';
  tp.setAttribute('aria-label', 'Tweaks');
  tp.innerHTML = `
    <h4>Tweaks</h4>
    <div class="tweak-row">
      <label>Accent</label>
      <div class="tweak-seg" data-key="accent">
        <button data-v="duo">Duo</button>
        <button data-v="lime">Lime</button>
        <button data-v="violet">Violet</button>
        <button data-v="coral">Coral</button>
      </div>
    </div>
    <div class="tweak-row">
      <label>Motion</label>
      <div class="tweak-seg" data-key="motion">
        <button data-v="full">Full</button>
        <button data-v="calm">Calm</button>
      </div>
    </div>
    <div class="tweak-row">
      <label>Grid</label>
      <div class="tweak-seg" data-key="grain">
        <button data-v="true">On</button>
        <button data-v="false">Off</button>
      </div>
    </div>
  `;
  document.body.appendChild(tp);

  // Year
  requestAnimationFrame(() => {
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  });
})();
