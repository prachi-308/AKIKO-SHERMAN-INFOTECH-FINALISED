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

    // Hero Section Animations
    gsap.fromTo('.parallax .header', { opacity: 0, y: 100, rotateX: -60 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.5, ease: 'power3.out' });
    gsap.fromTo('.parallax .header h1', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 });
    gsap.fromTo('.parallax .header p', { opacity: 0, y: 50, rotateX: -30 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, delay: 0.8, ease: 'power3.out' });
    gsap.fromTo('.blur-container', { opacity: 0, y: 150, rotateX: 60 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.5, ease: 'power3.out', delay: 1 });

    // Animate Feature Boxes in Hero Section
    const boxes = document.querySelectorAll('.parallax .box');
    boxes.forEach((box, index) => {
        gsap.fromTo(box, { opacity: 0, y: 50, scale: 0.9 }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 1.2 + (index * 0.2)
        });
    });

    gsap.fromTo('.parallax .description', { opacity: 0, y: 50, rotateX: -20 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, delay: 1.8, ease: 'power3.out' });

    // Parallax Effect
    gsap.to('.parallax', { y: '5%', scale: 1.1, ease: 'none', scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: true } });

    // Scroll Animations for Sections
    const animateElements = document.querySelectorAll('.scroll-animate');
    animateElements.forEach((element, index) => {
        const animationType = element.classList.contains('fadeInUp') ? 'fadeInUp' :
            element.classList.contains('fadeInLeft') ? 'fadeInLeft' :
            element.classList.contains('fadeInRight') ? 'fadeInRight' :
            element.classList.contains('fadeInScale') ? 'fadeInScale' : 'fadeInUp';

        const animationProps = {
            opacity: 0,
            y: animationType === 'fadeInUp' ? 80 : 0,
            x: animationType === 'fadeInLeft' ? -80 : animationType === 'fadeInRight' ? 80 : 0,
            scale: animationType === 'fadeInScale' ? 0.8 : 1
        };

        gsap.fromTo(element, animationProps, {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            delay: index * 0.15
        });
    });

    // Section 3 Specific Animations
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        gsap.fromTo(card, { opacity: 0, y: 80, scale: 0.9 }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.4,
            ease: 'back.out(1.4)',
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            delay: index * 0.2
        });
    });

    // Footer Animation (Conditional)
    const footer = document.querySelector('footer');
    if (footer) {
        document.addEventListener('footerLoaded', () => {
            gsap.fromTo('footer', { opacity: 0, y: 80 }, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power4.out',
                scrollTrigger: { trigger: 'footer', start: 'top 90%' }
            });
        });
    }

    // Tab Switching Logic
    window.switchTab = function(tabNumber) {
        const tabs = document.querySelectorAll('.tab');
        const contentArea = document.getElementById('tab-content');
        tabs.forEach(tab => tab.classList.remove('active'));
        tabs[tabNumber - 1].classList.add('active');

        let content = '';
        switch (tabNumber) {
            case 1:
                content = '<h2>Key Features</h2>' +
                    '<div class="features-grid">' +
                    '<div class="feature-item"><div class="feature-icon"><svg class="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg></div><div><h4 class="feature-title">Online Metering</h4></div></div>' +
                    '<div class="feature-item"><div class="feature-icon"><svg class="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg></div><div><h4 class="feature-title">Water Quality Surveillance</h4></div></div>' +
                    '<div class="feature-item"><div class="feature-icon"><svg class="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg></div><div><h4 class="feature-title">Asset Management</h4></div></div>' +
                    '<div class="feature-item"><div class="feature-icon"><svg class="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg></div><div><h4 class="feature-title">Smart Monitoring Dashboards</h4></div></div>' +
                    '<div class="feature-item"><div class="feature-icon"><svg class="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg></div><div><h4 class="feature-title">Integration with Water Bodies</h4></div></div>' +
                    '<div class="feature-item"><div class="feature-icon"><svg class="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg></div><div><h4 class="feature-title">Complaint Handling</h4></div></div>' +
                    '</div>' +
                    '<p>A specialized application designed to monitor water quality and facilitate the collection of water bills from customers. It plays a vital role in supporting the "Har Ghar Jal" mission by ensuring efficient water management.</p>';
                break;
            case 2:
                content = '<p>Explore our other solutions, including cloud computing, Salesforce implementation, and staffing support.</p>';
                break;
            default:
                content = '<h2>Key Features</h2>' +
                    '<div class="features-grid">' +
                    '<div class="feature-item"><div class="feature-icon"><svg class="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg></div><div><h4 class="feature-title">Online Metering</h4></div></div>' +
                    '<div class="feature-item"><div class="feature-icon"><svg class="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg></div><div><h4 class="feature-title">Water Quality Surveillance</h4></div></div>' +
                    '<div class="feature-item"><div class="feature-icon"><svg class="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg></div><div><h4 class="feature-title">Asset Management</h4></div></div>' +
                    '<div class="feature-item"><div class="feature-icon"><svg class="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg></div><div><h4 class="feature-title">Smart Monitoring Dashboards</h4></div></div>' +
                    '<div class="feature-item"><div class="feature-icon"><svg class="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg></div><div><h4 class="feature-title">Integration with Water Bodies</h4></div></div>' +
                    '<div class="feature-item"><div class="feature-icon"><svg class="icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg></div><div><h4 class="feature-title">Complaint Handling</h4></div></div>' +
                    '</div>' +
                    '<p>A specialized application designed to monitor water quality and facilitate the collection of water bills from customers. It plays a vital role in supporting the "Har Ghar Jal" mission by ensuring efficient water management.</p>';
        }
        contentArea.innerHTML = content;

        // Animate new content
        gsap.fromTo(contentArea.children, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' });
    };

    // Initial Tab Load
    if (document.getElementById('tab-content')) window.switchTab(1);

    // Utility: Scroll to Section
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 50,
                behavior: 'smooth'
            });
        }
    };
});
