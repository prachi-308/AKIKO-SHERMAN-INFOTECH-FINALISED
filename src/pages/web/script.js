const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
import { observeElements } from '../../scripts/utils.js';
import '../../scripts/components.js';
import '../../styles/global.css';
import '../../styles/components.css';
import './style.css';

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

    // Helper function to animate only if element exists
    const animateIfExists = (selector, fromProps, toProps, scrollTrigger) => {
        const element = document.querySelector(selector);
        if (element) {
            gsap.fromTo(element, fromProps, {...toProps, scrollTrigger });
        } else {
            console.warn(`Element ${selector} not found for GSAP animation.`);
        }
    };

    // Hero Section Animations
    animateIfExists('.orange-container', { opacity: 0, y: 100, rotateX: -60 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.5, ease: 'power3.out' });
    animateIfExists('.orange-container .description', { opacity: 0, y: 50, rotateX: -30 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, delay: 0.5, ease: 'power3.out' });
    animateIfExists('.content-container', { opacity: 0, y: 150, rotateX: 60 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.5, ease: 'power3.out' });
    animateIfExists('.content-description', { opacity: 0, y: 50, rotateX: -20 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, delay: 0.5, ease: 'power3.out' });

    // Parallax Effect
    animateIfExists('.parallax', {}, { y: '10%', scale: 1.15, ease: 'none' }, { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: true });

    // Quote Section Animation
    animateIfExists('.section-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, { trigger: '.quote', start: 'top 100%' });
    animateIfExists('.quote hr', { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.8, delay: 0.3, ease: 'power3.out>' }, { trigger: '.quote', start: 'top 80%' });

    // Technical Profiles Section Animations
    gsap.utils.toArray('.profile').forEach((profile, index) => {
        gsap.fromTo(profile, { opacity: 0, y: 50 }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.05,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.profiles-row', start: 'top 80%' }
        });
    });

    animateIfExists('.middle-section', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, { trigger: '.middle-section', start: 'top 80%' });

    // Pause Scrolling on Hover
    const profilesRow = document.querySelector('.profiles-row');
    if (profilesRow) {
        profilesRow.addEventListener('mouseenter', () => profilesRow.classList.add('paused'));
        profilesRow.addEventListener('mouseleave', () => profilesRow.classList.remove('paused'));
    }

    // Key Offerings Section Animations
    animateIfExists('.section-title', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, { trigger: '.key-offerings', start: 'top 80%' });
    gsap.utils.toArray('.offering-card').forEach((card, index) => {
        gsap.fromTo(card, { opacity: 0, y: 50 }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.key-offerings', start: 'top 80%' }
        });
    });

    animateIfExists('footer', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }, { trigger: '.key-offerings', start: 'bottom 80%' });

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

    // Intersection Observer for Slider
    let currentSlide = 0;
    let hasAnimated = false;

    function animateCurrentSlideCards() {
        document.querySelectorAll('.custom-card').forEach(card => {
            card.classList.remove('visible');
        });

        const currentPageCards = document.querySelectorAll(`.slide-page:nth-child(${currentSlide + 1}) .custom-card`);
        currentPageCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        });
    }

    function updateSlider() {
        const sliderWrapper = document.querySelector('.custom-slider-wrapper');
        if (sliderWrapper) {
            sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
            animateCurrentSlideCards();
        }
    }

    function customPrevSlide() {
        const totalPages = document.querySelectorAll('.slide-page').length;
        currentSlide = currentSlide > 0 ? currentSlide - 1 : totalPages - 1;
        updateSlider();
    }

    function customNextSlide() {
        const totalPages = document.querySelectorAll('.slide-page').length;
        currentSlide = currentSlide < totalPages - 1 ? currentSlide + 1 : 0;
        updateSlider();
    }

    const sliderSection = document.querySelector('.custom-slider');
    if (sliderSection) {
        const sliderObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    animateCurrentSlideCards();
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
        sliderObserver.observe(sliderSection);
    } else {
        console.warn('Slider section (.custom-slider) not found in the DOM.');
    }

    const prevButton = document.querySelector('.custom-prev');
    const nextButton = document.querySelector('.custom-next');
    if (prevButton) prevButton.addEventListener('click', customPrevSlide);
    if (nextButton) nextButton.addEventListener('click', customNextSlide);
    window.addEventListener('resize', updateSlider);

    // Card Hover Effects
    const cards = document.querySelectorAll('.custom-card');
    if (cards.length > 0) {
        cards.forEach(card => {
            const inner = card.querySelector('.custom-card-content');
            if (inner) {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const rotateX = (y - centerY) / 35;
                    const rotateY = (centerX - x) / 35;

                    inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                    card.style.transform = `translateY(-15px) scale(1.05)`;
                });

                card.addEventListener('mouseleave', () => {
                    inner.style.transform = 'rotateX(0deg) rotateY(0deg)';
                    card.style.transform = 'translateY(0) scale(1)';
                });
            }
        });
    } else {
        console.warn('No .custom-card elements found for hover effects.');
    }

    // Intersection Observer for Additional Animations
    observeElements('.profile, .middle-section, .section-title, .offering-card', el => el.classList.add('in-view'));
});