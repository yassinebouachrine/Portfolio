/* ========================================
   PORTFOLIO JAVASCRIPT
   Yassine Bouachrine
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {

    // ---- Particles ----
    createParticles();

    // ---- Clock ----
    updateClock();
    setInterval(updateClock, 1000);

    // ---- Greeting ----
    updateGreeting();

    // ---- Typed Effect ----
    initTypedEffect();

    // ---- Navbar Scroll ----
    initNavbar();

    // ---- Scroll Animations (AOS replacement) ----
    initScrollAnimations();

    // ---- Project Filters ----
    initProjectFilters();

    // ---- Contact Form ----
    initContactForm();

    // ---- Back to Top ----
    initBackToTop();

    // ---- Counter Animation ----
    initCounters();

    // ---- Skill Bars Animation ----
    initSkillBars();

    // ---- Mobile Nav ----
    initMobileNav();
});

// ========================
// Particles
// ========================
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (6 + Math.random() * 6) + 's';
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

// ========================
// Clock
// ========================
function updateClock() {
    const now = new Date();
    const timeEl = document.getElementById('clockTime');
    const dateEl = document.getElementById('clockDate');

    if (timeEl) {
        timeEl.textContent = now.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    if (dateEl) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = now.toLocaleDateString('fr-FR', options);
    }
}

// ========================
// Greeting
// ========================
function updateGreeting() {
    const hour = new Date().getHours();
    const greetingEl = document.getElementById('greeting');
    if (!greetingEl) return;

    if (hour < 12) greetingEl.textContent = 'Bonjour ☀️';
    else if (hour < 18) greetingEl.textContent = 'Bon après-midi 🌤️';
    else greetingEl.textContent = 'Bonsoir 🌙';
}

// ========================
// Typed Effect
// ========================
function initTypedEffect() {
    const el = document.getElementById('heroTyped');
    if (!el) return;

    const texts = [
        'Élève Ingénieur en Data Science & IA',
        'Machine Learning Enthusiast',
        'Big Data & Analytics',
        'Full Stack Developer',
        'NLP & Deep Learning'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 80;

    function type() {
        const currentText = texts[textIndex];

        if (!isDeleting) {
            el.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentText.length) {
                isDeleting = true;
                speed = 2000; // Pause at end
            } else {
                speed = 50 + Math.random() * 80;
            }
        } else {
            el.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                speed = 300;
            } else {
                speed = 30;
            }
        }

        setTimeout(type, speed);
    }

    setTimeout(type, 500);
}

// ========================
// Navbar
// ========================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link
        const sections = document.querySelectorAll('.section');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }

            // Close mobile nav
            const mobileNav = document.querySelector('.nav-links');
            const toggle = document.getElementById('navToggle');
            mobileNav.classList.remove('active');
            toggle.classList.remove('active');
        });
    });
}

// ========================
// Scroll Animations (custom AOS)
// ========================
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

// ========================
// Project Filters
// ========================
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                    card.style.display = '';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ========================
// Contact Form
// ========================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('span:not(.btn-loading)');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const messageDiv = document.getElementById('formMessage');

        // Show loading
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);

            const response = await fetch('/api/contact', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            messageDiv.style.display = 'block';
            messageDiv.className = 'form-message ' + (data.success ? 'success' : 'error');
            messageDiv.innerHTML = '<i class="fas fa-' + (data.success ? 'check-circle' : 'exclamation-circle') + '"></i> ' + data.message;

            if (data.success) {
                form.reset();
                setTimeout(() => {
                    messageDiv.style.display = 'none';
                }, 5000);
            }

        } catch (error) {
            messageDiv.style.display = 'block';
            messageDiv.className = 'form-message error';
            messageDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Erreur de connexion. Veuillez réessayer.';
        }

        // Reset button
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    });
}

// ========================
// Back to Top
// ========================
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========================
// Counter Animation
// ========================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el, target) {
    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target + '+';
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, 40);
}

// ========================
// Skill Bars Animation
// ========================
function initSkillBars() {
    const fills = document.querySelectorAll('.skill-fill, .lang-fill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = targetWidth;
                }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    fills.forEach(fill => observer.observe(fill));
}

// ========================
// Mobile Navigation
// ========================
function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', function () {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
        if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}