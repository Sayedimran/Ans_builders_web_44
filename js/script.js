/**
 * ANS Builders and Consultancy - Main JavaScript
 * Handles: Sticky header, mobile menu, smooth scroll, contact form
 */

document.addEventListener('DOMContentLoaded', function() {
    // Sticky Header
    const header = document.getElementById('mainHeader');
    if (header) {
        let lastScroll = 0;
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            lastScroll = currentScroll;
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close menu when clicking a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mainNav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }

    // Services dropdown: click toggle on mobile
    const dropdownTriggers = document.querySelectorAll('.nav-dropdown-trigger');
    dropdownTriggers.forEach(function(trigger) {
        trigger.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = this.closest('.nav-item-has-dropdown');
                if (parent) {
                    parent.classList.toggle('dropdown-open');
                }
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Contact Form Submit Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');
            const nameVal = name ? name.value.trim() : '';
            const phoneVal = phone ? phone.value.trim() : '';
            const messageVal = message ? message.value.trim() : '';

            if (!nameVal || !phoneVal || !messageVal) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }

            // Simulate form submission (replace with actual backend integration)
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(function() {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
                showFormMessage('Thank you! Your message has been sent. We will get back to you soon.', 'success');
            }, 1500);
        });
    }

    // Helper: Show form message
    function showFormMessage(text, type) {
        let messageEl = document.querySelector('.form-message');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.className = 'form-message';
            if (contactForm) {
                contactForm.insertBefore(messageEl, contactForm.firstChild);
            }
        }
        messageEl.textContent = text;
        messageEl.className = 'form-message ' + type;
        messageEl.style.display = 'block';

        setTimeout(function() {
            messageEl.style.display = 'none';
        }, 5000);
    }

    // Scroll to hash on page load (for services anchor links)
    if (window.location.hash) {
        setTimeout(function() {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 100);
    }

    // Animated Stats Counter (triggers when section is visible)
    const statsSection = document.getElementById('statsSection');
    if (statsSection) {
        const statNumbers = statsSection.querySelectorAll('.stat-number');
        let hasAnimated = false;

        function animateCounter(el) {
            const target = parseInt(el.getAttribute('data-target'), 10);
            const suffix = el.getAttribute('data-suffix') || '';
            const duration = 2000;
            const start = 0;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(start + (target - start) * easeOutQuart);
                el.textContent = current + suffix;
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    el.textContent = target + suffix;
                }
            }
            requestAnimationFrame(update);
        }

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    statNumbers.forEach(function(el) {
                        animateCounter(el);
                    });
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

        observer.observe(statsSection);
    }
});
