# Shreyanshu Bhushan - Professional Portfolio

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://shreyanshu09.github.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, responsive portfolio website showcasing AI research, projects, and professional experience.

## 🌟 Features

- **Bilingual Support**: English and Korean language toggle
- **Interactive Chatbot**: AI-powered assistant to answer questions about experience and projects
- **Responsive Design**: Mobile-first approach with smooth animations
- **Professional Theme**: Dark mode with carefully chosen color palette
- **Project Showcase**: Detailed project descriptions with impact metrics
- **Research Publications**: Academic papers and patent information
- **Contact Integration**: Multiple contact methods and working contact form

## 🔧 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Variables
- **Fonts**: Inter & JetBrains Mono from Google Fonts
- **Icons**: Unicode Emojis
- **Animations**: CSS Transitions and Keyframes
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
├── index.html              # Homepage
├── about.html              # About page
├── experience.html         # Professional experience
├── projects.html           # Project portfolio
├── research.html           # Research & publications
├── contact.html            # Contact information
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   └── script.js          # JavaScript functionality
├── images/
│   ├── profile.jpg        # Profile photo
│   └── projects/          # Project screenshots
├── resume.pdf             # Resume download
└── README.md              # This file
```

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/shreyanshu09/shreyanshu09.github.io.git
   cd shreyanshu09.github.io
   ```

2. **Open in browser**
   ```bash
   # Simple HTTP server
   python -m http.server 8000
   # or
   npx serve .
   ```

3. **Visit** `http://localhost:8000`

## 🎨 Customization

### Color Scheme
The website uses CSS custom properties for easy theming:

```css
:root {
    --primary-bg: #1a1a1a;
    --text-highlight: #DAD085;
    --accent-blue: #96CBFE;
    --accent-green: #A8FF60;
    /* ... more variables */
}
```

### Content Updates
- Update personal information in HTML files
- Modify project descriptions and achievements
- Replace placeholder images with actual screenshots
- Update contact information and social links

### Language Support
Add new languages by extending the `translations` object in `script.js`:

```javascript
const translations = {
    en: { /* English translations */ },
    ko: { /* Korean translations */ },
    // Add new languages here
};
```

## 📱 Responsive Design

The website is optimized for all device sizes:
- **Desktop**: Full-featured layout with animations
- **Tablet**: Adapted grid layouts and navigation
- **Mobile**: Stacked layouts and touch-friendly interactions

## 🤖 Chatbot Features

The integrated chatbot can answer questions about:
- Professional experience and roles
- Technical skills and expertise
- Project details and achievements
- Education and research background
- Contact information and availability

## 📊 SEO & Performance

- **Semantic HTML**: Proper heading structure and landmarks
- **Meta Tags**: Descriptions and Open Graph tags
- **Performance**: Optimized images and minimal JavaScript
- **Accessibility**: ARIA labels and keyboard navigation

## 🛠️ Development

### Local Development
```bash
# Install a simple HTTP server
npm install -g http-server

# Serve the website
http-server -p 8000

# Or use Python
python -m http.server 8000
```

### Building for Production
The website is static HTML/CSS/JS, so no build process is required. Simply push to the `main` branch for automatic deployment via GitHub Pages.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/shreyanshu09/shreyanshu09.github.io/issues).

## 📞 Contact

- **Email**: shreyanshubhushan@gmail.com
- **LinkedIn**: [linkedin.com/in/shreyanshu09](https://www.linkedin.com/in/shreyanshu09/)
- **GitHub**: [github.com/shreyanshu09](https://github.com/shreyanshu09)

## 🙏 Acknowledgments

- Design inspiration from modern portfolio websites
- Color palette optimized for accessibility
- Font choices for professional readability
- Animation effects for enhanced user experience

---

⭐ **If you found this portfolio template helpful, please consider giving it a star!**