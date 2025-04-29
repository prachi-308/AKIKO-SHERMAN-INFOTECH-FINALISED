// Import utilities and styles (assuming Webpack handles these)
import { observeElements } from '../../scripts/utils.js';
import '../../scripts/components.js';
import '../../styles/global.css';
import '../../styles/components.css';
import './style.css';

// Use global GSAP if loaded via CDN, fallback to module import
const gsap = window.gsap || (typeof gsap !== 'undefined' ? gsap : null);
const ScrollTrigger = window.ScrollTrigger || (typeof ScrollTrigger !== 'undefined' ? ScrollTrigger : null);

document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP and ScrollTrigger are available
    if (!gsap || !ScrollTrigger) {
        console.error('GSAP or ScrollTrigger not loaded. Ensure CDN scripts are included in HTML or Webpack is configured to bundle GSAP.');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Image Optimization
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

    // Form Handling

    // Animations for contact page
    gsap.from('.hero-content', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    });
    gsap.from('.contact-container', {
        opacity: 0,
        y: 100,
        duration: 1.5,
        delay: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact-container',
            start: 'top 80%'
        }
    });
    observeElements('.contact-info', el => el.classList.add('show'));
});