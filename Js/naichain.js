// Navigation Scroll Effect
const nav = document.getElementById('nav');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');
const backToTopBtn = document.getElementById('back-to-top');
let isMobileMenuOpen = false;

function setMobileMenuState(isOpen) {
    if (!mobileMenu || !menuIcon || !closeIcon) {
        return;
    }

    isMobileMenuOpen = isOpen;
    mobileMenu.classList.toggle('active', isOpen);
    menuIcon.classList.toggle('active', isOpen);
    closeIcon.classList.toggle('active', isOpen);

    if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    }

    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
}

// Handle scroll-based UI changes in one listener.
function handleScroll() {
    if (nav) {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    }

    if (backToTopBtn) {
        backToTopBtn.classList.toggle('visible', window.scrollY > 400);
    }
}

window.addEventListener('scroll', handleScroll);

// Mobile Menu Toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        setMobileMenuState(!isMobileMenuOpen);
    });
}

// Smooth Scroll to Section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        
        // Close mobile menu if open
        if (isMobileMenuOpen) {
            setMobileMenuState(false);
        }
    }
}

// FAQ Toggle
const faqButtons = document.querySelectorAll('.faq-button');
const faqStates = Array.from(faqButtons, (_, index) => index === 0);

function toggleFAQ(index) {
    const answer = document.getElementById(`faq-answer-${index}`);
    const chevron = document.getElementById(`faq-chevron-${index}`);
    const button = document.getElementById(`faq-button-${index}`);

    if (!answer || !chevron || !button || typeof faqStates[index] === 'undefined') {
        return;
    }
    
    // Toggle the state
    faqStates[index] = !faqStates[index];
    
    if (faqStates[index]) {
        answer.classList.add('open');
        chevron.classList.add('rotated');
        button.setAttribute('aria-expanded', 'true');
    } else {
        answer.classList.remove('open');
        chevron.classList.remove('rotated');
        button.setAttribute('aria-expanded', 'false');
    }
}

// Initialize first FAQ as open
document.addEventListener('DOMContentLoaded', () => {
    const firstAnswer = document.getElementById('faq-answer-0');
    const firstChevron = document.getElementById('faq-chevron-0');
    if (firstAnswer && firstChevron) {
        firstAnswer.classList.add('open');
        firstChevron.classList.add('rotated');
    }

    setMobileMenuState(false);
    handleScroll();
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isMobileMenuOpen) {
        setMobileMenuState(false);
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setMobileMenuState(false);
    }
});

// Intersection Observer for Animations on Scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';

            if (entry.target.classList.contains('slide-left')) {
                entry.target.style.transform = 'translateX(0)';
            } else if (entry.target.classList.contains('scale-up')) {
                entry.target.style.transform = 'scale(1)';
            } else {
                entry.target.style.transform = 'translateY(0)';
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.slide-up, .slide-left, .scale-up');
    
    animatedElements.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        if (el.classList.contains('slide-up')) {
            el.style.transform = 'translateY(30px)';
        } else if (el.classList.contains('slide-left')) {
            el.style.transform = 'translateX(-20px)';
        } else if (el.classList.contains('scale-up')) {
            el.style.transform = 'scale(0.9)';
        }
        
        // Add transition
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        // Observe element
        observer.observe(el);
    });
});

// Trigger hero animations on page load
window.addEventListener('load', () => {
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        setTimeout(() => {
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
        }, 100);
    }
});
