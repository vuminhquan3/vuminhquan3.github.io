// ========== PRELOADER ==========
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Trigger counter animation after preloader hides
            setTimeout(animateCounters, 400);
        }, 1400);
    }
});

// ========== LIÊN QUÂN-STYLE SECTION TRANSITIONS (2s) ==========
const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add transition class for entrance animation
            entry.target.classList.add('section-transition');
            // Also trigger reveal for fallback compatibility
            if (entry.target.classList.contains('reveal')) {
                entry.target.classList.add('active');
            }
        }
    });
}, { 
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ========== SCROLL REVEAL (Fallback/Enhancement) ==========
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ========== MOBILE NAVIGATION ==========
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ========== COUNTER ANIMATION (Editorial Style) ==========
function animateCounters() {
    // Support both old and new counter classes
    const counters = document.querySelectorAll('.counter-number, .counter-number-editorial, .stat-number');
    const speed = 120; // Smooth speed for editorial feel

    counters.forEach(counter => {
        const targetAttr = counter.getAttribute('data-target');
        if (!targetAttr) return;
        
        const target = parseInt(targetAttr.replace(/[^0-9]/g, ''), 10);
        if (!target || target === 0) return;
        
        let count = 0;
        const inc = Math.max(1, Math.ceil(target / speed));
        
        const updateCount = () => {
            count += inc;
            if (count < target) {
                counter.innerText = count.toLocaleString('vi-VN') + (counter.classList.contains('stat-number') ? '' : '');
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target.toLocaleString('vi-VN') + (counter.classList.contains('stat-number') ? '' : '');
            }
        };
        updateCount();
    });
}

// Trigger counters when visible
const countersSection = document.querySelector('.impact-counters, .impact-counters-warm');
if (countersSection) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });
    counterObserver.observe(countersSection);
}

// Also trigger stat-number in about section
const aboutStat = document.querySelector('.stat-number');
if (aboutStat) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    aboutObserver.observe(aboutStat);
}

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId) return;
        
        const target = document.querySelector(targetId);
        if (target) {
            // Close mobile menu if open
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            // Offset for fixed navbar
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== NAVBAR SCROLL EFFECT (Warm Theme) ==========
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
        navbar.style.background = 'rgba(45, 36, 32, 0.98)';
    } else if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.style.boxShadow = '0 6px 40px rgba(232, 93, 4, 0.3)';
        navbar.style.background = 'rgba(45, 36, 32, 0.99)';
    } else {
        // Scrolling up or at top
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)';
        navbar.style.background = 'rgba(45, 36, 32, 0.98)';
    }
    lastScroll = currentScroll;
});

// ========== FORM VALIDATION ==========
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#E85D04';
                field.classList.add('shake');
                setTimeout(() => field.classList.remove('shake'), 500);
            } else {
                field.style.borderColor = '';
            }
        });

        if (!isValid) {
            e.preventDefault();
            alert('Vui lòng điền đầy đủ thông tin bắt buộc');
        }
    });

    // Clear error on input
    form.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', () => {
            field.style.borderColor = '';
            field.classList.remove('shake');
        });
        field.addEventListener('focus', () => {
            field.style.borderColor = '#F4A261';
        });
        field.addEventListener('blur', () => {
            if (!field.value.trim()) {
                field.style.borderColor = '';
            }
        });
    });
});

// ========== PROGRESS BAR ANIMATION ==========
const animateProgressBar = () => {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        const targetWidth = progressFill.dataset.width || progressFill.style.width || '0%';
        progressFill.style.width = '0%';
        // Force reflow
        void progressFill.offsetWidth;
        progressFill.style.transition = 'width 2s cubic-bezier(0.34, 1.56, 0.64, 1)';
        progressFill.style.width = targetWidth;
    }
};

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBar();
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const progressSection = document.querySelector('.progress-section');
if (progressSection) {
    progressObserver.observe(progressSection);
}

// ========== ACTIVE NAV LINK ==========
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// ========== DYNAMIC FOOTER YEAR ==========
const updateFooterYear = () => {
    const yearElements = document.querySelectorAll('#current-year, .footer-bottom p');
    yearElements.forEach(el => {
        if (el.id === 'current-year') {
            el.textContent = new Date().getFullYear();
        } else {
            el.innerHTML = el.innerHTML.replace(/\b\d{4}\b/, new Date().getFullYear());
        }
    });
};
updateFooterYear();

// ========== TRUST BADGE HOVER EFFECT ==========
const trustBadges = document.querySelectorAll('.trust-badge-editorial');
trustBadges.forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(12px)';
    });
    badge.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// ========== BUTTON RIPPLE EFFECT ==========
const animatedButtons = document.querySelectorAll('.btn-animated');
animatedButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ========== IMAGE HOVER PARALLAX (About Photo) ==========
const aboutPhoto = document.querySelector('.about-main-photo');
if (aboutPhoto) {
    aboutPhoto.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });
    
    aboutPhoto.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
}

// ========== PROCESS CARD HOVER ENHANCEMENT ==========
const processCards = document.querySelectorAll('.process-card-editorial');
processCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// ========== BLOG CARD HOVER ENHANCEMENT ==========
const blogCards = document.querySelectorAll('.blog-card-editorial');
blogCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const category = this.querySelector('.blog-category');
        if (category) {
            category.style.transform = 'scale(1.05)';
        }
    });
    card.addEventListener('mouseleave', function() {
        const category = this.querySelector('.blog-category');
        if (category) {
            category.style.transform = 'scale(1)';
        }
    });
});

// ========== CONSOLE MESSAGE (Warm Theme) ==========
console.log('%cTechMpower', 'font-size: 24px; font-weight: bold; color: #E85D04;');
console.log('%cBridging Digital Divide, One PC at a Time', 'font-size: 14px; color: #6B5B4F;');

// ========== REDUCED MOTION SUPPORT ==========
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.section-transition, .reveal, .animated-gradient, .btn-animated, .process-card-editorial, .blog-card-editorial').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
        el.style.transform = 'none';
        el.classList.add('active');
    });
    
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
    
    // Disable parallax
    if (aboutPhoto) {
        aboutPhoto.style.transform = 'none';
        aboutPhoto.onmousemove = null;
        aboutPhoto.onmouseleave = null;
    }
}

// ========== INITIALIZE ON DOM READY ==========
document.addEventListener('DOMContentLoaded', () => {
    // Ensure preloader is hidden if page loads from cache
    const preloader = document.querySelector('.preloader');
    if (preloader && !preloader.classList.contains('hidden')) {
        preloader.classList.add('hidden');
    }
    
    // Trigger animations for elements already in view
    setTimeout(() => {
        document.querySelectorAll('section').forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                section.classList.add('section-transition', 'active');
            }
        });
    }, 500);
});
