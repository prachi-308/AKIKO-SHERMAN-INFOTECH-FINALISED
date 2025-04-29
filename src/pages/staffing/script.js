const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
import { observeElements } from '../../scripts/utils.js';
import '../../scripts/components.js'; // Import to ensure navigation logic is available
import '../../styles/global.css'; // Import global styles
import '../../styles/components.css'; // Import components styles
import './style.css'; // Import page-specific styles


document.addEventListener('DOMContentLoaded', () => {
    if (!gsap || !ScrollTrigger) {
        console.error('GSAP or ScrollTrigger not loaded. Check script order in HTML.');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Image Optimization (Lazy Loading)
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

    // Hero Section Animations
    gsap.fromTo('.orange-container', { opacity: 0, y: 100, rotateX: -60 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.5, ease: 'power3.out' });
    gsap.fromTo('.orange-container .description', { opacity: 0, y: 50, rotateX: -30 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, delay: 0.5, ease: 'power3.out' });
    gsap.fromTo('.content-container', { opacity: 0, y: 150, rotateX: 60 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.5, ease: 'power3.out' });
    gsap.fromTo('.content-description', { opacity: 0, y: 50, rotateX: -20 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, delay: 0.5, ease: 'power3.out' });

    // Parallax Effect
    gsap.to('.parallax', { y: '10%', scale: 1.15, ease: 'none', scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: true } });

    // Quote Section Animation
    gsap.fromTo('.quote p', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.quote', start: 'top 80%' } });
    gsap.fromTo('.quote hr', { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.8, delay: 0.3, ease: 'power3.out', scrollTrigger: { trigger: '.quote', start: 'top 80%' } });

    // Technical Profiles Section Animations
    gsap.utils.toArray('.profile').forEach((profile, index) => {
        gsap.fromTo(profile, { opacity: 0, y: 50 }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.container2', start: 'top 80%' }
        });
    });
    gsap.fromTo('.middle-section', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.middle-section', start: 'top 80%' } });

    // Key Offerings Section Animations
    gsap.fromTo('.section-title', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.key-offerings', start: 'top 80%' } });
    gsap.utils.toArray('.offering-card').forEach((card, index) => {
        gsap.fromTo(card, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, delay: index * 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.key-offerings', start: 'top 80%' } });
    });

    // Footer Animation
    gsap.fromTo('footer', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: '.key-offerings', start: 'bottom 80%' } });

    // Tab Switching Logic
    window.switchTab = function(tabNumber) {
        const tabs = document.querySelectorAll('.tab');
        const contentArea = document.getElementById('tab-content');
        tabs.forEach(tab => tab.classList.remove('active'));
        tabs[tabNumber - 1].classList.add('active');

        let content = '';
        switch (tabNumber) {
            case 1:
                content = '<p>Over 1000 IT Professionals have been deployed at various Government Organizations and Corporates successfully catering to their needs and contributing to the country’s E-governance initiatives.</p>';
                break;
            case 2:
                content = '<p>We provide comprehensive support services, including 24/7 helpdesk, system administration, and training to ensure your IT operations run smoothly.</p>';
                break;
            case 3:
                content = '<p>Our staffing solutions have empowered clients to achieve their project goals, delivering measurable success across diverse industries.</p>';
                break;
            default:
                content = '<p>Over 1000 IT Professionals have been deployed at various Government Organizations and Corporates successfully catering to their needs and contributing to the country’s E-governance initiatives.</p>';
        }
        contentArea.innerHTML = content;
        gsap.fromTo('.content-description', { opacity: 0, y: 50, rotateX: -20 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: 'power3.out' });
    };

    // Intersection Observer for Additional Animations
    observeElements('.profile, .middle-section, .section-title, .offering-card', el => el.classList.add('in-view'));
});