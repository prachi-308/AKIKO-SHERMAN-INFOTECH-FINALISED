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

    // Scroll Animation Logic
    observeElements('.animate-on-scroll:not(.parallax .animate-on-scroll)', el => el.classList.add('visible'));

    // Hero Section Animations
    gsap.fromTo('.orange-container', {
        opacity: 0,
        y: 100,
        rotateX: -60
    }, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.5,
        ease: 'power3.out'
    });
    gsap.fromTo('.orange-container .description', {
        opacity: 0,
        y: 50,
        rotateX: -30
    }, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });
    gsap.fromTo('.content-container', {
        opacity: 0,
        y: 150,
        rotateX: 60
    }, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.5,
        ease: 'power3.out'
    });
    gsap.fromTo('.content-description', {
        opacity: 0,
        y: 50,
        rotateX: -20
    }, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });

    // Parallax Effect
    gsap.to('.parallax', {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5
        }
    });

    // Parallax Section Animation
    function revealImages() {
        const images = document.querySelectorAll('.website-img, .logo-img');
        const windowHeight = window.innerHeight;
        images.forEach((image, index) => {
            const imageTop = image.getBoundingClientRect().top;
            if (imageTop < windowHeight - 150) {
                setTimeout(() => {
                    image.classList.add('visible');
                }, index * 300);
            }
        });
    }
    window.addEventListener('scroll', () => requestAnimationFrame(revealImages));
    window.addEventListener('load', revealImages);

    function parallaxBackground() {
        const background = document.querySelector('.background');
        const scrollPosition = window.pageYOffset;
        background.style.transform = `translateY(${scrollPosition * 0.9}px)`;
    }
    window.addEventListener('scroll', () => requestAnimationFrame(parallaxBackground));
    window.addEventListener('load', parallaxBackground);

    // Feature Carousel Setup
    const container = document.getElementById('featuresContainer');
    const wrapper = document.getElementById('featuresWrapper');
    const scrollIndicator = document.getElementById('scrollIndicator');
    const cards = document.querySelectorAll('.feature-card');
    let currentPage = 0;
    let cardsPerPage = 3;
    let totalPages = Math.ceil(cards.length / cardsPerPage);
    let autoScrollInterval;
    let isHovering = false;
    let touchStartX = 0;
    let touchEndX = 0;

    function setupCarousel() {
        if (window.innerWidth <= 1024 && window.innerWidth > 767) {
            cardsPerPage = 2;
            totalPages = Math.ceil(cards.length / cardsPerPage);
        } else if (window.innerWidth <= 767) {
            cardsPerPage = 1;
            totalPages = cards.length;
        } else {
            cardsPerPage = 3;
            totalPages = Math.ceil(cards.length / cardsPerPage);
        }

        scrollIndicator.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            if (i === currentPage) dot.classList.add('active');
            dot.addEventListener('click', () => goToPage(i));
            scrollIndicator.appendChild(dot);
        }
        updateCarousel();
    }

    function goToPage(page) {
        currentPage = page;
        updateCarousel();
    }

    function updateCarousel() {
        const translateX = -(currentPage * 100 / cardsPerPage);
        wrapper.style.transform = `translateX(${translateX}%)`;
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPage);
        });
    }

    function nextPage() {
        currentPage = (currentPage >= totalPages - 1) ? 0 : currentPage + 1;
        updateCarousel();
    }

    function prevPage() {
        currentPage = (currentPage <= 0) ? totalPages - 1 : currentPage - 1;
        updateCarousel();
    }

    function startAutoScroll() {
        clearInterval(autoScrollInterval);
        if (!isHovering) {
            autoScrollInterval = setInterval(nextPage, 4000);
        }
    }

    container.addEventListener('mouseenter', () => {
        isHovering = true;
        clearInterval(autoScrollInterval);
    });
    container.addEventListener('mouseleave', () => {
        isHovering = false;
        startAutoScroll();
    });
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoScrollInterval);
    }, { passive: true });
    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoScroll();
    }, { passive: true });

    function handleSwipe() {
        const difference = touchStartX - touchEndX;
        if (difference > 50) nextPage();
        else if (difference < -50) prevPage();
    }

    window.addEventListener('resize', setupCarousel);
    setupCarousel();
    startAutoScroll();

    // E-Commerce Card Reveal
    function revealCards() {
        const cards = document.querySelectorAll('.ecommerce-card');
        const windowHeight = window.innerHeight;
        cards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < windowHeight - 100) {
                setTimeout(() => card.classList.add('reveal'), index * 150);
            }
        });
    }
    window.addEventListener('scroll', () => requestAnimationFrame(revealCards));
    window.addEventListener('load', revealCards);

    // Mouse Hover Effect for Cards
    document.querySelectorAll('.ecommerce-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03) translateY(-10px)`;
            card.style.boxShadow = `0 12px 30px rgba(74, 144, 226, 0.2)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
        });
    });

    // Navigation Logic
    const icon = document.querySelector('.icon');
    const navUl = document.querySelector('nav ul');
    icon.addEventListener('click', (e) => {
        e.stopPropagation();
        navUl.classList.toggle('show');
    });
    document.addEventListener('click', (e) => {
        if (!navUl.contains(e.target) && !icon.contains(e.target) && navUl.classList.contains('show')) {
            navUl.classList.remove('show');
            document.querySelectorAll('.drop-menu').forEach(dropdown => dropdown.style.display = 'none');
            document.querySelectorAll('.dropdown-arrow').forEach(arrow => arrow.style.transform = 'rotate(0deg)');
        }
    });

    const dropdownArrows = document.querySelectorAll('.dropdown-arrow');
    dropdownArrows.forEach(arrow => {
        arrow.parentElement.addEventListener('click', (e) => {
            if (window.innerWidth <= 1160) {
                e.preventDefault();
                e.stopPropagation();
                const dropdown = arrow.nextElementSibling;
                const isVisible = dropdown.style.display === 'block';
                dropdown.style.display = isVisible ? 'none' : 'block';
                arrow.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1160) {
            dropdownArrows.forEach(arrow => {
                const dropdown = arrow.parentElement.nextElementSibling;
                if (!arrow.parentElement.contains(e.target) && !dropdown.contains(e.target)) {
                    dropdown.style.display = 'none';
                    arrow.style.transform = 'rotate(0deg)';
                }
            });
        }
    });

    // Footer Animation
    gsap.fromTo('footer', { opacity: 0, y: 50 }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.ecommerce-section', start: 'bottom 80%', toggleActions: 'play none none none' }
    });

    // Tech Item Hover Animation
    gsap.utils.toArray('.tech-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, { x: 5, duration: 0.3, ease: 'power2.out' });
        });
        item.addEventListener('mouseleave', () => {
            gsap.to(item, { x: 0, duration: 0.3, ease: 'power2.out' });
        });
    });

    // Tab Switching
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