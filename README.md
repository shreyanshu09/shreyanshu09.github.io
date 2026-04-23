# Shreyanshu Bhushan — Portfolio Website

A modern, responsive portfolio built with clean HTML, CSS, and JavaScript. Designed for professional presentation to recruiters, research collaborators, and engineering teams.

## Features

- **Dark / Light theme** — user preference persisted via localStorage
- **Bilingual (EN / KO)** — full English and Korean language toggle
- **3D Neural Network Canvas** — animated WebGL-style canvas hero background
- **Scroll-reveal animations** — IntersectionObserver-driven staggered reveals
- **Typed text effect** — rotating role titles in the hero section
- **Keyword-matching chatbot** — offline, rule-based assistant answering questions about experience and projects
- **Scroll progress indicator** — top-of-page reading progress bar
- **Fully responsive** — tested across desktop, tablet, and mobile viewports
- **ATS-compatible content** — all text is semantic HTML, readable by parsing tools

## Project Structure

```
portfolio/
├── index.html              # Homepage with hero, featured projects, awards
├── about.html              # Profile, education timeline, skills matrix
├── experience.html         # Work history and volunteer roles
├── projects.html           # Full project portfolio with detailed descriptions
├── research.html           # Publications, patent, research interests
├── contact.html            # Contact form and social links
│
├── css/
│   ├── theme.css           # CSS custom properties — dark and light theme variables
│   ├── style.css           # Base layout, typography, components (imports theme.css)
│   └── animations.css      # Hero, timeline, project card, and reveal animations
│
├── js/
│   ├── main.js             # Theme, language, navbar, scroll progress, reveal
│   ├── animations.js       # Canvas neural network, counter animations, stagger
│   └── chatbot.js          # Keyword-matching portfolio assistant
│
├── images/
│   └── profile.png         # Profile photo
│
├── files/
│   ├── cv.pdf              # Downloadable CV (place here)
│   └── portfolio.pdf       # Downloadable portfolio (place here)
│
└── README.md
```

## Technology Stack

- **HTML5** — semantic markup, accessible structure
- **CSS3** — custom properties, grid, flexbox, keyframe animations, backdrop-filter
- **JavaScript (ES6+)** — vanilla, no build step required
- **Fonts** — Syne (display) + DM Sans (body) + JetBrains Mono (code/labels) via Google Fonts
- **Canvas API** — neural network particle animation

## Quick Start

```bash
# Clone or download the repository
git clone https://github.com/shreyanshu09/shreyanshu09.github.io.git
cd shreyanshu09.github.io

# Serve locally
python -m http.server 8000
# or
npx serve .
```

Open `http://localhost:8000` in your browser.

## Customization

### Theme Colors

Edit `css/theme.css` to modify the colour palette:

```css
:root {
  --accent-cyan:   #00c9ff;   /* Primary accent */
  --accent-gold:   #e8b84b;   /* Awards / highlights */
  --accent-green:  #34d399;   /* Success / open badges */
  --accent-purple: #818cf8;   /* Secondary accent */
}
```

### Adding Content

Update the relevant HTML file. All content uses `data-en` and `data-ko` attributes for bilingual support:

```html
<p data-en="English text" data-ko="한국어 텍스트">English text</p>
```

### Chatbot Responses

Edit `js/chatbot.js` — add entries to the `RULES` array or update `PORTFOLIO_DATA` constants:

```javascript
{
  keywords: ['your', 'keywords', 'here'],
  response: 'Your response text here.',
},
```

## Deployment

The site is fully static — no build step, no server-side requirements.

**GitHub Pages:**
1. Push to a repository named `<username>.github.io`
2. Enable GitHub Pages from the repository settings (Settings → Pages → main branch)
3. Place `cv.pdf` and `portfolio.pdf` in the `files/` directory

## Browser Support

Tested in Chrome 110+, Firefox 110+, Safari 16+, Edge 110+. Core features (theme, navigation, reveal) degrade gracefully in older browsers.

## License

MIT License. Free to use as a template with attribution.

## Contact

- Email: shreyanshubhushan@gmail.com
- LinkedIn: [linkedin.com/in/shreyanshu09](https://linkedin.com/in/shreyanshu09)
- GitHub: [github.com/shreyanshu09](https://github.com/shreyanshu09)
