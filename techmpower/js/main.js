// ========== PRELOADER ==========
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Trigger counter animation after preloader hides
            setTimeout(animateCounters, 300);
        }, 1200);
    }
});

// ========== SCROLL REVEAL ANIMATION ==========
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target); // Animate only once
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

// ========== COUNTER ANIMATION ==========
function animateCounters() {
    const counters = document.querySelectorAll('.counter-number');
    const speed = 200;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        if (!target || target === 0) return; // Skip if no target set
        
        let count = 0;
        const inc = Math.ceil(target / speed);
        
        const updateCount = () => {
            count += inc;
            if (count < target) {
                counter.innerText = count.toLocaleString('vi-VN');
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target.toLocaleString('vi-VN');
            }
        };
        updateCount();
    });
}

// Intersection Observer for counters (only if counters section exists)
const countersSection = document.querySelector('.impact-counters');
if (countersSection) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counterObserver.observe(countersSection);
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== NAVBAR SCROLL EFFECT ==========
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
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
                field.style.borderColor = '#ff4444';
            } else {
                field.style.borderColor = '';
            }
        });

        if (!isValid) {
            e.preventDefault();
            alert('Vui lòng điền đầy đủ thông tin bắt buộc');
        }
    });
});

// ========== PROGRESS BAR ANIMATION ==========
const animateProgressBar = () => {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        const width = progressFill.style.width || '0%';
        progressFill.style.width = '0%';
        setTimeout(() => {
            progressFill.style.width = width;
        }, 300);
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
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// ========== DYNAMIC FOOTER YEAR ==========
const updateFooterYear = () => {
    const yearElements = document.querySelectorAll('.footer-bottom p');
    yearElements.forEach(el => {
        el.innerHTML = el.innerHTML.replace(/\d{4}/, new Date().getFullYear());
    });
};
updateFooterYear();

// Console message
console.log('%cTechMpower', 'font-size: 24px; font-weight: bold; color: #00d4ff;');
console.log('%cBridging Digital Divide, One PC at a Time', 'font-size: 14px; color: #b0b0b0;');