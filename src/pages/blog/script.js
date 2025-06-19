const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
import { observeElements } from '../../scripts/utils.js';
import '../../scripts/components.js';
import '../../styles/global.css';
import '../../styles/components.css';
import './style.css';

// Carousel Functionality
let currentSlide = 0;
let autoScrollInterval = null;
let touchStartX = 0;
let touchEndX = 0;

function animateCarouselSlide() {
    const activeSlide = document.querySelectorAll('.carousel-item')[currentSlide];
    const title = activeSlide.querySelector('.carousel-title');
    const text = activeSlide.querySelector('.carousel-text');
    const button = activeSlide.querySelector('.carousel-button');

    if (gsap) {
        gsap.fromTo(title, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
        gsap.fromTo(text, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });
        gsap.fromTo(button, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.4 });
    } else {
        console.warn('GSAP not loaded, skipping carousel animations.');
        // Fallback: Ensure elements are visible without animation
        title.style.opacity = 1;
        text.style.opacity = 1;
        button.style.opacity = 1;
    }
}

function goToSlide(index) {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-item');
    if (!carousel || !slides.length) {
        console.error('Carousel elements not found');
        return;
    }

    if (index < 0 || index >= slides.length) return;

    currentSlide = index;
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateControls();
    animateCarouselSlide();
    resetAutoScroll();
}

function updateControls() {
    const controls = document.querySelectorAll('.carousel-controls button');
    controls.forEach((control, index) => {
        control.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    const slides = document.querySelectorAll('.carousel-item');
    goToSlide((currentSlide + 1) % slides.length);
}

function resetAutoScroll() {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(nextSlide, 5000);
}

// Category Filtering
window.filterPosts = category => {
    console.log(`Filtering posts for category: ${category}`);
    const blogCards = document.querySelectorAll('.blog-card');
    const categoryItems = document.querySelectorAll('.category-section ul li');
    const categoryTitle = document.querySelector('.category-section h3');

    const normalizedCategory = category.toLowerCase();
    const isAll = normalizedCategory === 'all';

    categoryItems.forEach(item => {
        const itemCategory = item.textContent.trim().toLowerCase();
        item.classList.toggle('active-category', itemCategory === normalizedCategory);
    });
    categoryTitle.classList.toggle('active-category', isAll);

    blogCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category').toLowerCase();
        const shouldShow = isAll || cardCategory === normalizedCategory;
        card.style.display = shouldShow ? 'block' : 'none';
    });
};

const initializeGSAP = () => {
    if (!gsap || !ScrollTrigger) {
        console.error('GSAP or ScrollTrigger not loaded, skipping GSAP initialization.');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Parallax effect for carousel background
    gsap.utils.toArray('.carousel-item').forEach(slide => {
        gsap.to(slide, {
            backgroundPosition: '50% 60%',
            ease: 'none',
            scrollTrigger: {
                trigger: slide,
                scrub: true,
                start: 'top bottom',
                end: 'bottom top'
            }
        });
    });

    if (document.querySelector('footer')) {
        gsap.fromTo('footer', {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: '.additional-blog-posts',
                start: 'bottom 80%',
                toggleActions: 'play none none none'
            }
        });
    } else {
        console.warn('Footer element not found for GSAP animation.');
    }
};

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Image Optimizer
    class ImageOptimizer {
        constructor() {
            this.optimizeImages();
        }
        optimizeImages() {
            document.querySelectorAll('img').forEach(img => {
                if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
                if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
            });
        }
    }
    new ImageOptimizer();

    // Scroll Animations
    observeElements('.animate-on-scroll', el => {
        el.classList.add('visible');
        console.log('Element made visible:', el);
    });

    // Initialize GSAP
    initializeGSAP();

    // Initialize Carousel
    const carousel = document.querySelector('.carousel');
    const controls = document.querySelectorAll('.carousel-controls button');

    controls.forEach((control, index) => {
        control.addEventListener('click', () => {
            console.log(`Clicked carousel dot ${index}`);
            goToSlide(index);
        });
    });

    carousel.addEventListener('mouseenter', () => {
        if (autoScrollInterval) clearInterval(autoScrollInterval);
        console.log('Carousel auto-scroll paused');
    });

    carousel.addEventListener('mouseleave', () => {
        resetAutoScroll();
        console.log('Carousel auto-scroll resumed');
    });

    carousel.addEventListener('touchstart', e => {
        e.preventDefault();
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: false });

    carousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const difference = touchStartX - touchEndX;
        if (difference > 50) nextSlide();
        else if (difference < -50) goToSlide(currentSlide === 0 ? document.querySelectorAll('.carousel-item').length - 1 : currentSlide - 1);
    }, { passive: true });

    resetAutoScroll();
    animateCarouselSlide(); // Initial animation

    // Initialize with 'all' category
    filterPosts('all');

    // Wait for footer to load before initializing GSAP
    const footerDiv = document.querySelector('[data-include="/components/footer.html"]');
    if (footerDiv) {
        footerDiv.addEventListener('include-loaded', initializeGSAP);
    } else {
        initializeGSAP();
    }
});
