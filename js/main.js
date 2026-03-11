// ========================================
// Theme Toggle
// ========================================
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

// ========================================
// Scroll Animations (Intersection Observer)
// ========================================
const observerOptions = {
    threshold: 0,
    rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.anim-fade-up').forEach(el => {
    observer.observe(el);
});

// ========================================
// Active Nav Link
// ========================================
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const updateActiveLink = () => {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < bottom) {
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${id}`) {
                    link.style.color = 'var(--text)';
                }
            });
        }
    });
};

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();
