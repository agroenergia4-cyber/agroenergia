// ============================================
// LANGUAGE SWITCHING
// ============================================
const translations = {
    en: {},
    pt: {}
};

let currentLang = 'en';

// Initialize language switching
document.addEventListener('DOMContentLoaded', function() {
    initLanguageSwitcher();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initFormValidation();
});

function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const elementsToTranslate = document.querySelectorAll('[data-en]');
    
    // Store original translations
    elementsToTranslate.forEach(element => {
        const enText = element.getAttribute('data-en');
        const ptText = element.getAttribute('data-pt');
        const key = enText || element.textContent.trim();
        
        if (enText) translations.en[key] = enText;
        if (ptText) translations.pt[key] = ptText;
    });
    
    // Language button click handlers
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
            
            // Update active button
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function switchLanguage(lang) {
    currentLang = lang;
    const elementsToTranslate = document.querySelectorAll('[data-en]');
    
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-en');
        const translation = element.getAttribute(`data-${lang}`);
        
        if (translation) {
            // Handle different element types
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else if (element.tagName === 'BUTTON' || element.tagName === 'A') {
                // Preserve any child elements like icons
                const childElements = Array.from(element.children);
                element.textContent = translation;
                childElements.forEach(child => element.appendChild(child));
            } else {
                element.textContent = translation;
            }
        }
    });
    
    // Update document language attribute
    document.documentElement.lang = lang;
    
    // Store preference in localStorage
    localStorage.setItem('preferredLanguage', lang);
}

// Load saved language preference on page load
window.addEventListener('load', function() {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== 'en') {
        const langButton = document.querySelector(`[data-lang="${savedLang}"]`);
        if (langButton) {
            langButton.click();
        }
    }
});

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = navMenu.contains(event.target) || hamburger.contains(event.target);
            if (!isClickInside && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// ============================================
// SMOOTH SCROLLING
// ============================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate sections on scroll
    const animatedElements = document.querySelectorAll('.solution-card, .service-item, .metric-card, .value-item, .impact-category, .tech-card, .sustainability-item, .gallery-item, .testimonial-card');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 16px rgba(45, 95, 63, 0.12)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(45, 95, 63, 0.08)';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// FORM VALIDATION
// ============================================
function initFormValidation() {
    const form = document.querySelector('.contact-form form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            let isValid = true;
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#dc3545';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Show success message
                showNotification(
                    currentLang === 'en' 
                        ? 'Thank you! Your message has been sent successfully.' 
                        : 'Obrigado! Sua mensagem foi enviada com sucesso.',
                    'success'
                );
                
                // Reset form
                this.reset();
            } else {
                showNotification(
                    currentLang === 'en' 
                        ? 'Please fill in all required fields.' 
                        : 'Por favor, preencha todos os campos obrigatórios.',
                    'error'
                );
            }
        });
    }
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '16px 24px',
        background: type === 'success' ? '#2d5f3f' : '#dc3545',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease',
        maxWidth: '400px'
    });
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Add notification animations to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// STATISTICS COUNTER ANIMATION
// ============================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toString();
        }
    }, 16);
}

// Observe stat numbers and animate when visible
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (!isNaN(number)) {
                entry.target.classList.add('animated');
                animateCounter(entry.target, number);
            }
        }
    });
}, { threshold: 0.5 });

window.addEventListener('load', () => {
    const statNumbers = document.querySelectorAll('.stat-number, .metric-value');
    statNumbers.forEach(stat => statObserver.observe(stat));
});

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================
// Keyboard navigation for mobile menu
document.addEventListener('keydown', function(e) {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    // Close menu with Escape key
    if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Focus trap for mobile menu
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input, select'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
}

const navMenu = document.querySelector('.nav-menu');
if (navMenu) {
    trapFocus(navMenu);
}

// ============================================
// PRELOADER (Optional)
// ============================================
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.setAttribute('aria-label', 'Back to top');
backToTopButton.className = 'back-to-top';

Object.assign(backToTopButton.style, {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'var(--primary-green)',
    color: 'white',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    opacity: '0',
    visibility: 'hidden',
    transition: 'all 0.3s ease',
    zIndex: '999',
    boxShadow: '0 4px 16px rgba(45, 95, 63, 0.3)'
});

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopButton.addEventListener('mouseenter', function() {
    this.style.background = 'var(--accent-yellow)';
    this.style.color = 'var(--primary-green)';
    this.style.transform = 'translateY(-5px)';
});

backToTopButton.addEventListener('mouseleave', function() {
    this.style.background = 'var(--primary-green)';
    this.style.color = 'white';
    this.style.transform = 'translateY(0)';
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c🌱 Agro Energia Moçambique', 'font-size: 20px; font-weight: bold; color: #2d5f3f;');
console.log('%cEmpowering rural communities through renewable energy', 'font-size: 12px; color: #6c757d;');
console.log('%cWebsite developed with sustainability in mind', 'font-size: 12px; color: #f4c542;');
