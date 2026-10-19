/** @odoo-module **/

// ==============================================================================
// Daisy Theme — Client-side Interactions
// Scroll-driven effects and IntersectionObserver animations
// ==============================================================================

// Immediately apply cached theme settings from localStorage to eliminate FOUC
try {
    const cachedTheme = localStorage.getItem("daisy_theme_color") || "emerald";
    let cachedScheme = localStorage.getItem("daisy_color_scheme") || "light";
    if (cachedScheme === "contrast") {
        cachedScheme = "light";
        localStorage.setItem("daisy_color_scheme", "light");
    }
    document.documentElement.setAttribute("data-daisy-theme", cachedTheme);
    document.documentElement.setAttribute("data-daisy-scheme", cachedScheme);
} catch (e) {
    // localStorage unavailable
}

function initDaisyTheme() {
    // 1. Sticky Navbar Glassmorphism on Scroll
    const header = document.querySelector('header#top');
    if (header) {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                header.classList.add('daisy-navbar-scrolled');
            } else {
                header.classList.remove('daisy-navbar-scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check
    }

    // 2. IntersectionObserver for Reveal Animations
    if ('IntersectionObserver' in window) {
        const animatedElements = document.querySelectorAll('.daisy-animate');
        if (animatedElements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -40px 0px'
            });

            animatedElements.forEach((el) => observer.observe(el));
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDaisyTheme);
} else {
    initDaisyTheme();
}
