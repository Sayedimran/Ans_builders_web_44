/**
 * ANS Builders - Main JavaScript
 */
document.addEventListener('DOMContentLoaded', function() {
    // Mobile / Side Menu - 3-dot icon or hamburger
    const menuBtn = document.getElementById('navDotMenu') || document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
    }

    // Sticky Header
    const header = document.getElementById('mainHeader');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        });
    }

    // Animated Stats Counter
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const el = entry.target;
                if (el.dataset.animated) return;
                el.dataset.animated = 'true';
                const target = parseInt(el.dataset.target, 10);
                const suffix = el.dataset.suffix || '';
                const duration = 2000;
                const start = performance.now();
                function update(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 4);
                    const current = Math.floor(easeOut * target);
                    el.textContent = current + suffix;
                    if (progress < 1) requestAnimationFrame(update);
                    else el.textContent = target + suffix;
                }
                requestAnimationFrame(update);
            }
        });
    }, { threshold: 0.2 });
    statNumbers.forEach(function(el) { observer.observe(el); });

    // Contact Form
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = form.querySelector('.btn-submit');
            btn.textContent = 'Sending...';
            setTimeout(function() {
                btn.textContent = 'Submit';
                form.reset();
                alert('Thank you! Your message has been sent.');
            }, 1500);
        });
    }
});
