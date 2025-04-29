const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
import { observeElements } from '../../scripts/utils.js';
import '../../scripts/components.js';
import '../../styles/global.css';
import '../../styles/components.css';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    // Wait for components to load
    const waitForComponents = () => {
        return new Promise((resolve) => {
            const checkComponents = () => {
                const navigation = document.querySelector('nav');
                const footer = document.querySelector('footer');
                const statsSection = document.querySelector('.stats-section');
                const statItems = document.querySelectorAll('.stat-item');
                if (navigation && footer && statsSection && statItems.length > 0) {
                    console.log('Components loaded: navigation, footer, stats-section, and stat-items are present.');
                    console.log(`Found ${statItems.length} stat items`);
                    resolve();
                } else {
                    console.log('Waiting for components...');
                    console.log('Nav:', !!navigation, 'Footer:', !!footer, 'Stats Section:', !!statsSection, 'Stat Items:', statItems.length);
                    setTimeout(checkComponents, 100);
                }
            };
            checkComponents();
        });
    };

    waitForComponents().then(() => {
        try {
            if (typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') {
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

            // Animate all elements with animate-on-scroll class
            const animatedElements = gsap.utils.toArray('.animate-on-scroll');
            console.log('Total elements with animate-on-scroll:', animatedElements.length);
            animatedElements.forEach((element, index) => {
                console.log(`Setting up animation for element ${index}:`, element.className);

                // Check if the element is a stat-item (for counter animation)
                const isStatItem = element.classList.contains('stat-item');
                // Apply stagger for grouped elements (e.g., inside hero-content, features-grid)
                const stagger = element.closest('.hero-content') || element.closest('.features-grid') || element.closest('.header') || element.closest('.row') || element.closest('.accordion') || element.closest('.container') ? 0.2 : 0;

                gsap.fromTo(element, { opacity: 0, y: 50 }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: stagger,
                    ease: 'power3.out',
                    overwrite: 'auto',
                    immediateRender: true,
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                        onEnter: () => {
                            console.log(`Animation triggered for element ${index} (${element.className})`);
                            if (isStatItem) {
                                const counter = element.querySelector('.stat-value');
                                if (counter && !counter.hasAttribute('data-counted')) { // Check if already counted
                                    console.log(`Counter found for stat item ${index}:`, counter);
                                    counter.setAttribute('data-counted', 'true'); // Mark as counted
                                    animateCounter(counter);
                                } else if (!counter) {
                                    console.warn(`No .stat-value found for stat item ${index}`);
                                }
                            }
                        },
                        // Removed onEnterBack to prevent replay of counter animation
                    }
                });
            });

            // Footer Animation (not using animate-on-scroll class)
            const footer = document.querySelector('footer');
            if (footer) {
                gsap.fromTo(footer, { opacity: 0, y: 50 }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    overwrite: 'auto',
                    scrollTrigger: {
                        trigger: '.sec-7',
                        start: 'bottom 85%',
                        toggleActions: 'play none none none',
                        onEnter: () => console.log('Footer animation triggered'),
                    }
                });
            } else {
                console.warn('No footer element found for animation');
            }

            // Accordion Functionality
            const accordionItems = document.querySelectorAll('.accordion-item');
            if (accordionItems.length > 0) {
                accordionItems.forEach(item => {
                    item.addEventListener('click', () => {
                        accordionItems.forEach(i => i.classList.remove('active'));
                        item.classList.add('active');
                    });
                });
            }

            // Counting Effect for Stats
            function animateCounter(counter) {
                const target = parseFloat(counter.getAttribute('data-target') || 0);
                const originalText = counter.textContent.trim();
                const hasPlus = originalText.includes('+');
                const isLakh = originalText.includes('Lac') || originalText.includes('Lakh');
                const isCrore = originalText.includes('Cr');

                let start = 0;
                const duration = 2000;
                const step = (timestamp) => {
                    if (!start) start = timestamp;
                    const progress = Math.min((timestamp - start) / duration, 1);
                    const currentValue = progress * target;

                    if (isLakh) {
                        const formattedValue = currentValue.toFixed(1);
                        counter.textContent = `${formattedValue} Lac`;
                    } else if (isCrore) {
                        const formattedValue = Math.floor(currentValue);
                        counter.textContent = `${formattedValue}${hasPlus ? '+' : ''} Cr`;
                    } else {
                        const formattedValue = Math.floor(currentValue);
                        counter.textContent = `${formattedValue}${hasPlus ? '+' : ''}`;
                    }

                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        counter.textContent = originalText; // Reset to original text
                    }
                };

                requestAnimationFrame(step);
            }
        } catch (error) {
            console.error('Error in script.js:', error);
        }
    });
});