/* ========================================
   RIYANSH WEB STUDIO — SHARED SCRIPTS
   ======================================== */

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    initPageLoader();
    initNavbar();
    initMobileNav();
    initScrollReveal();
    initFAQ();
    initContactForm();
    initBackToTop();
    initActiveNavLink();
});

/* ========================================
   PAGE LOADER
   ======================================== */
function initPageLoader() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 300);
        });
    }
}

/* ========================================
   NAVBAR SCROLL EFFECT
   ======================================== */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

/* ========================================
   MOBILE NAVIGATION
   ======================================== */
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (!navToggle || !mobileNav) return;

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close on link click
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
}

/* ========================================
   SCROLL REVEAL ANIMATION
   ======================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const parent = entry.target.parentElement;
                const siblings = parent ? Array.from(parent.querySelectorAll('.reveal')) : [];
                const index = siblings.indexOf(entry.target);
                const delay = index >= 0 ? index * 80 : 0;

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

/* ========================================
   FAQ ACCORDION
   ======================================== */
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');

            // Close all others
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    item.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });

            // Toggle current
            if (isActive) {
                faqItem.classList.remove('active');
                button.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = '0';
            } else {
                faqItem.classList.add('active');
                button.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

/* ========================================
   CONTACT FORM → WHATSAPP
   ======================================== */
function initContactForm() {
    const form = document.getElementById('enquiryForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('formName')?.value.trim() || '';
        const business = document.getElementById('formBusiness')?.value.trim() || '';
        const phone = document.getElementById('formPhone')?.value.trim() || '';
        const type = document.getElementById('formType')?.value || '';
        const plan = document.getElementById('formPlan')?.value || '';
        const message = document.getElementById('formMessage')?.value.trim() || '';

        let whatsappMessage = `Hi Riyansh, I'm interested in getting a website for my business.\n\n`;
        whatsappMessage += `*Name:* ${name}\n`;
        if (business) whatsappMessage += `*Business:* ${business}\n`;
        whatsappMessage += `*WhatsApp:* ${phone}\n`;
        whatsappMessage += `*Business Type:* ${type}\n`;
        if (plan) whatsappMessage += `*Plan:* ${plan}\n`;
        if (message) whatsappMessage += `*Message:* ${message}\n`;

        const encoded = encodeURIComponent(whatsappMessage);
        window.open(`https://wa.me/917048948600?text=${encoded}`, '_blank');
    });
}

/* ========================================
   BACK TO TOP BUTTON
   ======================================== */
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    const handleScroll = () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ========================================
   ACTIVE NAV LINK
   ======================================== */
function initActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/* ========================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ======================================== */
document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const targetId = anchor.getAttribute('href');
    if (targetId === '#' || targetId.length < 2) return;

    const target = document.querySelector(targetId);
    if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
    }
});
