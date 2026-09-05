# Riyansh Web Studio - Professional Multi-Page Website

A modern, responsive portfolio website for Riyansh Web Studio built with vanilla HTML, CSS, and JavaScript.

## 📁 File Structure

```
/
├── index.html          # Home page
├── services.html       # Services page
├── plans.html          # Pricing plans page
├── projects.html       # Portfolio/projects page
├── about.html          # About page
├── contact.html        # Contact page with form
├── faq.html            # FAQ page
├── css/
│   └── style.css       # Global styles
├── js/
│   └── script.js       # Global scripts
└── README.md           # This file
```

## 🌟 Features

### Pages
- **Home** - Hero section, services preview, projects preview, process steps, CTA
- **Services** - 8 service cards with icons and descriptions
- **Plans & Pricing** - 4 pricing tiers (₹249, ₹999, ₹1999, ₹3499)
- **Projects** - 4 project showcases with live demo links
- **About** - Personal introduction and skills
- **Contact** - Contact cards and enquiry form
- **FAQ** - 9 frequently asked questions with accordion

### Design Features
- Dark theme with purple/cyan gradient accents
- Glassmorphism effects on contact cards
- Smooth scroll animations
- Page loader animation
- Sticky navigation bar
- Mobile-responsive design
- Back-to-top button
- Hover effects on all interactive elements

### Functionality
- WhatsApp integration for all CTAs
- Contact form that sends data via WhatsApp
- Mobile hamburger menu
- FAQ accordion
- Active page highlighting in navigation
- All links are functional and tested

## 📱 Contact Information

- **Phone/WhatsApp**: 7048948600
- **Email**: riyansharya295@gmail.com

## 💰 Pricing Plans

1. **Google Business Profile** - ₹249
2. **Starter Website** - ₹999
3. **Business Website** - ₹1,999 (Most Popular)
4. **Premium Website** - ₹3,499

All plans include WhatsApp checkout - no payment gateway needed.

## 🚀 How to Use

### Viewing the Website
Simply open `index.html` in any modern web browser, or serve the directory with any HTTP server:

```bash
# Using Python
python3 -m http.server 8080

# Using Node.js (if http-server is installed)
npx http-server

# Using PHP
php -S localhost:8080
```

### Deploying
Upload all files to any web hosting service:
- GitHub Pages
- Netlify
- Vercel
- Any shared hosting

## 🎨 Customization

### Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --bg-primary: #08080d;
    --accent-1: #7c5cfc;
    --accent-2: #00d4ff;
    /* ... more variables */
}
```

### Content
- Edit HTML files to change text and images
- Update WhatsApp number in all links (search for `7048948600`)
- Modify pricing in `plans.html`
- Update project links in `projects.html`

## 📋 Important Notes

- No external dependencies required
- No build process needed
- No backend/database
- All interactions go through WhatsApp
- Fully static site - works on any hosting

## 🔧 Technical Details

- **HTML5** semantic markup
- **CSS3** with modern features (Grid, Flexbox, Custom Properties)
- **Vanilla JavaScript** (no frameworks)
- **Mobile-first** responsive design
- **Accessibility** features (ARIA labels, semantic HTML)

## 📄 License

This website was created for Riyansh Web Studio. All rights reserved © 2026.

---

**Built with ❤️ for Riyansh Web Studio**
