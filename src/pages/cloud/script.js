const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
import { observeElements } from '../../scripts/utils.js';
import '../../scripts/components.js';
import '../../styles/global.css';
import '../../styles/components.css';
import './style.css';

// Image Optimizer
class ImageOptimizer {
    constructor() {
        this.optimizeImages();
    }
    optimizeImages() {
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
            if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
            console.log('Optimized image:', img.src);
        });
    }
}

// GSAP Footer Animation
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
                trigger: '.blog-post-container',
                start: 'bottom 80%',
                toggleActions: 'play none none none'
            }
        });
    } else {
        console.warn('Footer element not found for GSAP animation.');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Image Optimizer
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

    // Navigation Logic
    const icon = document.querySelector('.icon');
    const navUl = document.querySelector('nav ul');
    if (icon && navUl) {
        icon.setAttribute('role', 'button');
        icon.setAttribute('aria-label', 'Toggle navigation menu');
        icon.setAttribute('aria-expanded', 'false');

        icon.addEventListener('click', e => {
            e.stopPropagation();
            const isExpanded = navUl.classList.toggle('show');
            icon.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
            console.log('Navigation toggled:', isExpanded ? 'open' : 'closed');
        });

        document.addEventListener('click', e => {
            if (!navUl.contains(e.target) && !icon.contains(e.target) && navUl.classList.contains('show')) {
                navUl.classList.remove('show');
                icon.setAttribute('aria-expanded', 'false');
                document.querySelectorAll('.drop-menu').forEach(dropdown => {
                    dropdown.style.display = 'none';
                });
                document.querySelectorAll('.dropdown-arrow').forEach(arrow => {
                    arrow.style.transform = 'rotate(0deg)';
                });
                console.log('Navigation closed due to outside click');
            }
        });

        document.querySelectorAll('.dropdown-arrow').forEach(arrow => {
            arrow.parentElement.addEventListener('click', e => {
                if (window.innerWidth <= 968) {
                    e.preventDefault();
                    e.stopPropagation();
                    const dropdown = arrow.nextElementSibling;
                    const isVisible = dropdown.style.display === 'block';
                    dropdown.style.display = isVisible ? 'none' : 'block';
                    arrow.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
                    console.log('Dropdown toggled:', isVisible ? 'closed' : 'opened');
                }
            });
        });
    }
});