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

    // Hero Section Animations
    gsap.fromTo('.orange-container', { opacity: 0, y: 100, rotateX: -60 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.5, ease: 'power3.out' });
    gsap.fromTo('.orange-container .description', { opacity: 0, y: 50, rotateX: -30 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, delay: 0.5, ease: 'power3.out' });
    gsap.fromTo('.content-container', { opacity: 0, y: 150, rotateX: 60 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.5, ease: 'power3.out' });
    gsap.utils.toArray('.stat-box').forEach((box, index) => {
        gsap.fromTo(box, { opacity: 0, y: 50, rotateX: -45 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, delay: index * 0.2, ease: 'power3.out' });
    });
    gsap.fromTo('.content-description', { opacity: 0, y: 50, rotateX: -20 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, delay: 0.5, ease: 'power3.out' });
    gsap.to('.parallax', { y: '20%', ease: 'none', scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 0.5 } });

    // Carousel Section
    const carouselInner = document.querySelector('#carousel-inner');
    const carouselIndicators = document.querySelector('#carousel-indicators');
    const carouselElement = document.querySelector('#carouselExampleControls');
    const items = Array.from(carouselInner.children);
    let carouselInstance = new bootstrap.Carousel(carouselElement, {
        interval: 5000,
        ride: 'carousel',
        pause: false
    });
    let currentSlideIndex = 0;

    function updateCarousel() {
        const activeSlide = carouselInner.querySelector('.carousel-item.active');
        currentSlideIndex = activeSlide ? Array.from(carouselInner.children).indexOf(activeSlide) : 0;

        if (carouselInstance) {
            carouselInstance.dispose();
        }

        carouselInner.style.opacity = '1';

        const rebuildCarousel = () => {
            carouselInner.innerHTML = '';
            carouselIndicators.innerHTML = '';

            if (window.innerWidth >= 768) {
                const cardsPerSlide = 3;
                const numSlides = Math.ceil(items.length / cardsPerSlide);

                for (let i = 0; i < numSlides; i++) {
                    const slide = document.createElement('div');
                    slide.classList.add('carousel-item');
                    if (i === Math.floor(currentSlideIndex / cardsPerSlide)) slide.classList.add('active');

                    const wrapper = document.createElement('div');
                    wrapper.classList.add('cards-wrapper');

                    for (let j = i * cardsPerSlide; j < (i + 1) * cardsPerSlide && j < items.length; j++) {
                        wrapper.innerHTML += items[j].querySelector('.cards-wrapper').innerHTML;
                    }

                    slide.appendChild(wrapper);
                    carouselInner.appendChild(slide);

                    const indicator = document.createElement('button');
                    indicator.type = 'button';
                    indicator.setAttribute('data-bs-target', '#carouselExampleControls');
                    indicator.setAttribute('data-bs-slide-to', i);
                    if (i === Math.floor(currentSlideIndex / cardsPerSlide)) {
                        indicator.classList.add('active');
                        indicator.setAttribute('aria-current', 'true');
                    }
                    indicator.setAttribute('aria-label', `Slide ${i + 1}`);
                    carouselIndicators.appendChild(indicator);
                }
            } else {
                items.forEach((item, index) => {
                    const clonedItem = item.cloneNode(true);
                    clonedItem.classList.remove('active');
                    if (index === currentSlideIndex) clonedItem.classList.add('active');
                    carouselInner.appendChild(clonedItem);

                    const indicator = document.createElement('button');
                    indicator.type = 'button';
                    indicator.setAttribute('data-bs-target', '#carouselExampleControls');
                    indicator.setAttribute('data-bs-slide-to', index);
                    if (index === currentSlideIndex) {
                        indicator.classList.add('active');
                        indicator.setAttribute('aria-current', 'true');
                    }
                    indicator.setAttribute('aria-label', `Slide ${index + 1}`);
                    carouselIndicators.appendChild(indicator);
                });
            }

            requestAnimationFrame(() => {
                carouselInstance = new bootstrap.Carousel(carouselElement, {
                    interval: 5000,
                    ride: 'carousel',
                    pause: false
                });
                ScrollTrigger.refresh();
                animateCards();
            });
        };

        gsap.to(carouselInner, { opacity: 0, duration: 0.2, onComplete: rebuildCarousel });
        gsap.to(carouselInner, { opacity: 1, duration: 0.2, delay: 0.2 });
    }

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateCarousel, 100);
    });

    updateCarousel();

    gsap.fromTo('.carousel-section', { opacity: 0, yPercent: 10, rotateX: 15 }, {
        opacity: 1,
        yPercent: 0,
        rotateX: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.carousel-section', start: 'top 80%', end: 'top 20%', scrub: 0.5 }
    });

    const carouselHeading = document.querySelector('.carousel-heading');
    const isInViewport = () => {
        const rect = carouselHeading.getBoundingClientRect();
        return rect.top >= -rect.height && rect.bottom <= window.innerHeight + rect.height;
    };

    let hasAnimated = false;
    const animateHeading = () => {
        if (!hasAnimated) {
            gsap.fromTo(carouselHeading, { opacity: 0, y: 20, rotateX: -20, scale: 0.9 }, { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 0.6, ease: 'power4.out' });
            hasAnimated = true;
        }
    };

    if (isInViewport()) {
        animateHeading();
    } else {
        gsap.fromTo(carouselHeading, { opacity: 0, y: 20, rotateX: -20, scale: 0.9 }, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: '.carousel-heading',
                start: 'top 100%',
                toggleActions: 'play none none none',
                once: true,
                onEnter: () => animateHeading()
            }
        });
    }

    function animateCards() {
        const cards = document.querySelectorAll('.carousel-item .card');
        cards.forEach((card, index) => {
            ScrollTrigger.getAll().forEach(st => { if (st.trigger === card) st.kill(); });
            gsap.fromTo(card, { opacity: 0, y: 30, rotateX: -20, rotateY: index % 2 === 0 ? -10 : 10, scale: 0.95, filter: 'blur(2px)' }, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                filter: 'blur(0px)',
                duration: 0.6,
                delay: window.innerWidth >= 768 ? index * 0.1 : 0,
                ease: 'back.out(1.5)',
                scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none', once: true }
            });
        });
    }

    animateCards();

    gsap.fromTo('.third-section', { opacity: 0, y: 100, rotateX: 45 }, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.carousel-section', start: 'bottom 80%', end: 'bottom 50%', scrub: 0.5 }
    });

    const observer = observeElements('.title, .offering', (target) => {
        target.classList.add('show');
        observer.unobserve(target);
    });

    gsap.fromTo('footer', { opacity: 0, y: 50 }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.third-section', start: 'bottom 80%', toggleActions: 'play none none none' }
    });

    window.switchTab = (tabNumber) => {
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach((tab, index) => {
            if (index + 1 === tabNumber) {
                tab.classList.add('active');
                gsap.to(tab, { z: 30, rotateX: 0, duration: 0.5, ease: 'power2.out' });
            } else {
                tab.classList.remove('active');
                gsap.to(tab, { z: 0, rotateX: 10, duration: 0.5, ease: 'power2.out' });
            }
        });
    };
});