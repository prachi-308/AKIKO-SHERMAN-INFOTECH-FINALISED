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

    // Remove redundant navigation logic since components.js handles it
    // Keep only custom page-specific animations and logic

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
    let carouselInstance = new bootstrap.Carousel(carouselElement, { interval: 5000, ride: 'carousel' });
    let currentSlideIndex = 0;

    function updateCarousel() {
        const activeSlide = carouselInner.querySelector('.carousel-item.active');
        currentSlideIndex = activeSlide ? Array.from(carouselInner.children).indexOf(activeSlide) : 0;

        if (carouselInstance) {
            carouselInstance.dispose();
        }

        carouselInner.style.opacity = '1';

        const rebuildCarousel = () => {
            if (window.innerWidth >= 768) {
                carouselInner.innerHTML = '';
                carouselIndicators.innerHTML = `
                    <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="0" ${currentSlideIndex < 3 ? 'class="active" aria-current="true"' : ''} aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="1" ${currentSlideIndex >= 3 ? 'class="active" aria-current="true"' : ''} aria-label="Slide 2"></button>
                `;

                const slide1 = document.createElement('div');
                slide1.classList.add('carousel-item');
                if (currentSlideIndex < 3) slide1.classList.add('active');
                slide1.innerHTML = `
                    <div class="cards-wrapper">
                        ${items[0].querySelector('.cards-wrapper').innerHTML}
                        ${items[1].querySelector('.cards-wrapper').innerHTML}
                        ${items[2].querySelector('.cards-wrapper').innerHTML}
                    </div>
                `;

                const slide2 = document.createElement('div');
                slide2.classList.add('carousel-item');
                if (currentSlideIndex >= 3) slide2.classList.add('active');
                slide2.innerHTML = `
                    <div class="cards-wrapper">
                        ${items[3].querySelector('.cards-wrapper').innerHTML}
                        ${items[4].querySelector('.cards-wrapper').innerHTML}
                        ${items[5].querySelector('.cards-wrapper').innerHTML}
                    </div>
                `;

                carouselInner.appendChild(slide1);
                carouselInner.appendChild(slide2);
            } else {
                carouselInner.innerHTML = '';
                carouselIndicators.innerHTML = `
                    <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="0" ${currentSlideIndex === 0 ? 'class="active" aria-current="true"' : ''} aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="1" ${currentSlideIndex === 1 ? 'class="active" aria-current="true"' : ''} aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="2" ${currentSlideIndex === 2 ? 'class="active" aria-current="true"' : ''} aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="3" ${currentSlideIndex === 3 ? 'class="active" aria-current="true"' : ''} aria-label="Slide 4"></button>
                    <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="4" ${currentSlideIndex === 4 ? 'class="active" aria-current="true"' : ''} aria-label="Slide 5"></button>
                    <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="5" ${currentSlideIndex === 5 ? 'class="active" aria-current="true"' : ''} aria-label="Slide 6"></button>
                `;

                items.forEach((item, index) => {
                    const clonedItem = item.cloneNode(true);
                    clonedItem.classList.remove('active');
                    if (index === currentSlideIndex) clonedItem.classList.add('active');
                    carouselInner.appendChild(clonedItem);
                });
            }

            requestAnimationFrame(() => {
                carouselInstance = new bootstrap.Carousel(carouselElement, { interval: 5000, ride: 'carousel' });
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

    gsap.fromTo('.carousel-heading', { opacity: 0, y: 20, rotateX: -20, scale: 0.9 }, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.carousel-section', start: 'top 80%' }
    });

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

    // Third Section and Footer
    gsap.fromTo('.third-section', { opacity: 0, y: 100, rotateX: 45 }, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.carousel-section', start: 'bottom 80%', end: 'bottom 50%', scrub: 0.5 }
    });

    // Store the observer instance and use it in the callback
    const observer = observeElements('.title, .offering', (target) => {
        target.classList.add('show');
        observer.unobserve(target); // Use the stored observer
    });

    gsap.fromTo('footer', { opacity: 0, y: 50 }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.third-section', start: 'bottom 80%', toggleActions: 'play none none none' }
    });

    // Tab Switch Function
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