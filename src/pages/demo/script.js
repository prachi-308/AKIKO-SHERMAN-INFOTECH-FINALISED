const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
import { observeElements } from '../../scripts/utils.js';
import '../../scripts/components.js';
import '../../styles/global.css';
import '../../styles/components.css';
import './style.css';
document.addEventListener('DOMContentLoaded', () => {
    const includeElements = document.querySelectorAll('[data-include]');
    includeElements.forEach(async(element) => {
        const src = element.getAttribute('data-include');
        try {
            const response = await fetch(src);
            if (!response.ok) throw new Error(`Failed to load component: ${src}`);
            element.innerHTML = await response.text();
            element.dispatchEvent(new Event('include-loaded'));
        } catch (error) {
            console.error(error);
        }
    });

    const navIcon = document.querySelector('.icon');
    if (navIcon) {
        navIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            const navUl = document.querySelector('nav ul');
            navUl.classList.toggle('show');
        });
    }

    document.addEventListener('click', (e) => {
        const navUl = document.querySelector('nav ul');
        const icon = document.querySelector('.icon');
        if (navUl && icon && !navUl.contains(e.target) && !icon.contains(e.target) && navUl.classList.contains('show')) {
            navUl.classList.remove('show');
            document.querySelectorAll('.drop-menu').forEach(dropdown => {
                dropdown.style.display = 'none';
            });
            document.querySelectorAll('.dropdown-arrow').forEach(arrow => {
                arrow.style.transform = 'rotate(0deg)';
            });
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.blog-post-container').forEach(item => {
        observer.observe(item);
    });

    if (window.gsap && window.ScrollTrigger) {
        gsap.fromTo('footer', {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: '.blog-post-container',
                start: 'bottom 80%',
                toggleActions: 'play none none none'
            }
        });
    }

    class ImageOptimizer {
        static optimizeImages() {
            document.querySelectorAll('img').forEach(img => {
                if (!img.hasAttribute('loading')) {
                    img.setAttribute('loading', 'lazy');
                }
            });
        }
    }
    ImageOptimizer.optimizeImages();
});