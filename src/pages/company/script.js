const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
gsap.registerPlugin(ScrollTrigger);
import { observeElements } from '../../scripts/utils.js';
import '../../scripts/components.js';
import '../../styles/global.css';
import '../../styles/components.css';
import './style.css';

function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function(...args) {
        if (!lastRan) {
            func.apply(this, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(this, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}
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

const optimizeCarousel = () => {
    const items = document.querySelectorAll('#carousel div');
    const titles = document.querySelectorAll('#titles-descriptions .title-description');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 3;
    let autoSlideInterval;

    if (!items.length || !titles.length || !dots.length) {
        console.warn('Carousel elements missing in DOM');
        return;
    }

    const updateCarousel = () => {
        requestAnimationFrame(() => {
            items.forEach((item, index) => {
                item.className = '';
                if (index === currentIndex) item.classList.add('selected');
                else if (index === (currentIndex - 1 + items.length) % items.length) item.classList.add('prev');
                else if (index === (currentIndex - 2 + items.length) % items.length) item.classList.add('prevLeftSecond');
                else if (index === (currentIndex + 1) % items.length) item.classList.add('next');
                else if (index === (currentIndex + 2) % items.length) item.classList.add('nextRightSecond');
                else if (index < (currentIndex - 2 + items.length) % items.length) item.classList.add('hideLeft');
                else item.classList.add('hideRight');
            });
            titles.forEach((title, index) => {
                title.classList.toggle('active', index === currentIndex % titles.length);
                if (title.classList.contains('active')) checkScrollForElement(title);
            });
            dots.forEach((dot, index) => dot.classList.toggle('active', index === currentIndex % dots.length));
            checkScrollForDots();
        });
    };

    const checkScrollForElement = (element) => {
        const windowHeight = window.innerHeight;
        const rect = element.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.85 && rect.bottom >= 0) element.classList.add('visible');
        else element.classList.remove('visible');
    };

    const checkScrollForDots = () => {
        const windowHeight = window.innerHeight;
        const dotsContainer = document.querySelector('.dots-container');
        if (!dotsContainer) {
            console.warn('No .dots-container element found in the DOM');
            return;
        }
        const rect = dotsContainer.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.85 && rect.bottom >= 0) {
            dots.forEach((dot, index) => setTimeout(() => dot.classList.add('visible'), index * 100));
        } else {
            dots.forEach(dot => dot.classList.remove('visible'));
        }
    };

    const checkScroll = throttle(() => {
        const activeTitle = document.querySelector('.title-description.active');
        if (activeTitle) checkScrollForElement(activeTitle);
        checkScrollForDots();
    }, 100);

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentIndex = parseInt(dot.getAttribute('data-index'));
            updateCarousel();
            resetAutoSlide();
        });
    });

    const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel();
        }, 5000);
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    window.addEventListener('scroll', checkScroll);
    window.addEventListener('load', () => {
        setTimeout(checkScroll, 100);
        startAutoSlide();
        updateCarousel();
    });

    updateCarousel();
};

const optimizeClientsScroll = () => {
    const clientsRow = document.querySelector('.clients-row');
    if (!clientsRow) {
        console.warn('No .clients-row element found in the DOM');
        return;
    }
    const clients = document.querySelectorAll('.client');
    clientsRow.innerHTML += clientsRow.innerHTML;

    const scrollAnimations = document.querySelectorAll('.scroll-animation');
    const checkScroll = throttle(() => {
        scrollAnimations.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            if (elementTop < window.innerHeight && elementBottom > 0) element.classList.add('animate');
            else element.classList.remove('animate');
        });
    }, 100);

    window.addEventListener('scroll', checkScroll);
    checkScroll();
};

document.addEventListener('DOMContentLoaded', () => {
    if (!gsap || !ScrollTrigger) {
        console.error('GSAP or ScrollTrigger not loaded. Check script order in HTML.');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    new ImageOptimizer();
    optimizeCarousel();
    optimizeClientsScroll();

    gsap.to('.parallax', { y: '10%', scale: 1.15, ease: 'none', scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.fromTo('.orange-container', { opacity: 0, y: 100, rotateX: -60, scale: 0.95 }, { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1.5, ease: 'power4.out' });
    gsap.fromTo('.orange-container .description', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power4.out' });

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.stat').forEach(stat => statObserver.observe(stat));

    document.querySelectorAll('.count').forEach(count => {
        gsap.fromTo(count, { textContent: 0 }, { textContent: count.getAttribute('data-target'), duration: 2, ease: 'power1.out', snap: { textContent: 1 }, scrollTrigger: { trigger: count, start: 'top 80%' } });
    });

    gsap.fromTo('.software-innovation .content', { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.software-innovation', start: 'top 95%' } });
    gsap.fromTo('.software-innovation .grid', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.software-innovation', start: 'top 80%' } });
    gsap.to('.banner-parallax', { y: '15%', scale: 1.1, ease: 'none', scrollTrigger: { trigger: '.banner', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.fromTo('.banner-left', { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.banner', start: 'top 80%' } });
    gsap.fromTo('.banner-right', { opacity: 0, x: 100 }, { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.banner', start: 'top 80%' } });
    gsap.fromTo('.solution-item', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: '.solutions', start: 'top 80%' } });
    gsap.fromTo('.mission-vision-values .card', { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.3, ease: 'elastic.out(1, 0.7)', scrollTrigger: { trigger: '.mission-vision-values', start: 'top 80%', toggleActions: 'play none none reverse' } });

    // Add footer animation with check
    const checkFooter = setInterval(() => {
        const footer = document.querySelector('footer');
        if (footer) {
            clearInterval(checkFooter);
            console.log('Footer found, applying animation');
            gsap.fromTo('footer', { opacity: 0, y: 50 }, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power4.out',
                scrollTrigger: { trigger: '.sec-8', start: 'bottom 80%', toggleActions: 'play none none none' }
            });
        }
    }, 300); // Increased interval for reliability
});
