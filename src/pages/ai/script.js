import { observeElements } from '../../scripts/utils.js';
import '../../scripts/components.js';
import '../../styles/global.css'; // Import global styles
import '../../styles/components.css'; // Import components styles
import './style.css'; // Import page-specific styles

const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;

document.addEventListener("DOMContentLoaded", () => {
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
    gsap.fromTo('.services-heading', { opacity: 0, y: 50, rotateX: -20 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, delay: 0.3, ease: 'power3.out' });
    gsap.utils.toArray('.stat-box').forEach((box, index) => {
        gsap.fromTo(box, { opacity: 0, y: 50, rotateX: -45 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, delay: index * 0.2, ease: 'power3.out' });
    });
    gsap.fromTo('.content-description', { opacity: 0, y: 50, rotateX: -20 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, delay: 0.5, ease: 'power3.out' });

    // Parallax Effect
    gsap.to('.parallax', { y: '10%', scale: 1.15, ease: 'none', scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: true } });

    // AI Section Animations
    gsap.utils.toArray('.ai-section').forEach(section => {
        gsap.fromTo(section, { opacity: 0, x: section.classList.contains('ai-section:nth-child(odd)') ? -100 : 100 }, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 95%', toggleActions: 'play none none reset' }
        });
    });

    // Sec-4 Animations
    gsap.fromTo('.sec-4 h2', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.sec-4', start: 'top 80%' } });
    gsap.utils.toArray('.service-item').forEach((item, index) => {
        gsap.fromTo(item, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, delay: index * 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.sec-4', start: 'top 80%' } });
    });

    // Footer Animation (Triggered by .sec-4)
    gsap.fromTo('footer', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: '.sec-4', start: 'bottom 80%' } });

    // Slideshow Functionality
    const sections = document.querySelectorAll(".ai-section");
    const dotsContainer = document.querySelector(".ai-dots");
    let currentIndex = 0;
    let interval;

    function showSlide(index) {
        sections.forEach((section, i) => {
            section.classList.toggle("active", i === index);
            section.style.display = i === index ? "flex" : "none";
        });
        dotsContainer.querySelectorAll(".ai-dot").forEach((dot, i) => dot.classList.toggle("active", i === index));
    }

    function createDots() {
        dotsContainer.innerHTML = "";
        sections.forEach((_, index) => {
            const dot = document.createElement("div");
            dot.classList.add("ai-dot");
            if (index === 0) dot.classList.add("active");
            dot.addEventListener("click", () => {
                currentIndex = index;
                showSlide(index);
                clearInterval(interval);
                startAutoSlide();
            });
            dotsContainer.appendChild(dot);
        });
    }

    function startAutoSlide() {
        clearInterval(interval);
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % sections.length;
            showSlide(currentIndex);
        }, 3000);
    }

    function handleResize() {
        if (window.innerWidth < 768) {
            createDots();
            showSlide(currentIndex);
            startAutoSlide();
        } else {
            clearInterval(interval);
            dotsContainer.innerHTML = "";
            sections.forEach(section => {
                section.classList.add("active");
                section.style.display = "flex";
            });
        }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    // Intersection Observer for Additional Animations
    observeElements(".ai-section, .sec-4 h2, .service-item", el => el.classList.add("in-view"));
});