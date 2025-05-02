const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger; // pages/salesforce/script.js
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

    // Hero Section Animations
    gsap.fromTo('.orange-container', { opacity: 0, y: 100, rotateX: -60 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.5, ease: 'power3.out' });
    gsap.fromTo('.orange-container .description', { opacity: 0, y: 50, rotateX: -30 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, delay: 0.5, ease: 'power3.out' });
    gsap.fromTo('.content-container', { opacity: 0, y: 150, rotateX: 60 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.5, ease: 'power3.out' });
    gsap.fromTo('.content-description', { opacity: 0, y: 50, rotateX: -20 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, delay: 0.5, ease: 'power3.out' });

    // Parallax Effect
    gsap.to('.parallax', { y: '10%', scale: 1.15, ease: 'none', scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: true } });

    // Card Section Animations
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        gsap.fromTo(card, { opacity: 0, y: 50 }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.card-container', start: 'top 100%' }
        });
    });

    // Einstein AI Section Animation
    gsap.fromTo('.einstein-ai-section', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.einstein-ai-section', start: 'top 80%' } });

    // Custom Slider Animation
    let currentSlide = 0;
    let hasAnimated = false;

    function updateSlider() {
        const wrapper = document.querySelector('.custom-slider-wrapper');
        const slideWidth = document.querySelector('.slide-page').offsetWidth + 5;
        wrapper.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

        if (hasAnimated) {
            animateCurrentSlideCards();
        }
    }

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
    const sliderObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateCurrentSlideCards();
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    sliderObserver.observe(sliderSection);

    document.querySelector('.custom-prev').addEventListener('click', customPrevSlide);
    document.querySelector('.custom-next').addEventListener('click', customNextSlide);
    window.addEventListener('resize', updateSlider);

    // Card Hover Effects
    cards.forEach(card => {
        const inner = card.querySelector('.card-inner');
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

        });
    });

    // Footer Animation
    document.addEventListener('footerLoaded', () => {
        gsap.fromTo('footer', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: '.custom-slider', start: 'bottom 80%' } });
    });

    // Tab Switching Logic
    window.switchTab = function(tabNumber) {
        const tabs = document.querySelectorAll('.tab');
        const contentArea = document.getElementById('tab-content');
        tabs.forEach(tab => tab.classList.remove('active'));
        tabs[tabNumber - 1].classList.add('active');

        let content = '';
        switch (tabNumber) {
            case 1:
                content = '<p>We drive productivity and personalization with predictive and generative AI across the Customer 360 with Salesforce Einstein Implementation. We help our clients create and deploy assistive AI experiences natively in Salesforce, allowing our customers & employees to converse with Einstein to solve issues faster and work smarter.</p>';
                break;
            case 2:
                content = '<p>Our Salesforce solutions enhance business operations, streamline processes, and improve customer engagement across various industries.</p>';
                break;
            default:
                content = '<p>We drive productivity and personalization with predictive and generative AI across the Customer 360 with Salesforce Einstein Implementation.</p>';
        }
        contentArea.innerHTML = content;
        gsap.fromTo('.content-description', { opacity: 0, y: 50, rotateX: -20 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: 'power3.out' });
    };

    // Intersection Observer for Card Animations
    observeElements('.card, .einstein-ai-section', el => el.classList.add('show'));
});