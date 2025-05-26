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
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (!gsap || !ScrollTrigger) {
        console.error('GSAP or ScrollTrigger not loaded.');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

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

    // Wait for footer to load before initializing GSAP
    const footerDiv = document.querySelector('[data-include="/components/footer.html"]');
    if (footerDiv) {
        footerDiv.addEventListener('include-loaded', initializeGSAP);
    } else {
        initializeGSAP();
    }

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

    // Initialize with 'all' category
    filterPosts('all');
});
