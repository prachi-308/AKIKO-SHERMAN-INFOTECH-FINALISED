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
    gsap.fromTo('.orange-container', { opacity: 0, y: 100, rotateX: -60 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.5, ease: 'power3.out' });
    gsap.fromTo('.orange-container .description', { opacity: 0, y: 50, rotateX: -30 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, delay: 0.5, ease: 'power3.out' });
    gsap.fromTo('.content-container', { opacity: 0, y: 150, rotateX: 60 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.5, ease: 'power3.out' });
    gsap.fromTo('.content-description', { opacity: 0, y: 50, rotateX: -20 }, { opacity: 1, y: 0, rotateX: 0, duration: 1, delay: 0.5, ease: 'power3.out' });

    // Parallax Effect
    gsap.to('.parallax', { y: '10%', scale: 1.15, ease: 'none', scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: true } });

    // Quote Section Animation
    gsap.fromTo('.quote p', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.quote', start: 'top 100%' } });
    gsap.fromTo('.quote hr', { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.8, delay: 0.3, ease: 'power3.out', scrollTrigger: { trigger: '.quote', start: 'top 80%' } });

    // Technical Profiles Section Animations and Scroll Control
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
    gsap.fromTo('.middle-section', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.middle-section', start: 'top 80%' } });

    // Pause Scrolling on Hover and Arrow Controls
    const profilesRow = document.querySelector('.profiles-row');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const profiles = document.querySelectorAll('.profile');
    let currentIndex = 0;

    // Debug logs to verify element selection
    console.log('Profiles Row:', profilesRow);
    console.log('Left Arrow:', leftArrow);
    console.log('Right Arrow:', rightArrow);
    console.log('Profiles Count:', profiles.length);

    if (profilesRow && leftArrow && rightArrow && profiles.length) {
        // Hover pause/resume
        profilesRow.addEventListener('mouseenter', () => profilesRow.classList.add('paused'));
        profilesRow.addEventListener('mouseleave', () => profilesRow.classList.remove('paused'));

        const scrollToProfile = (index) => {
            if (index < 0 || index >= profiles.length / 2) return; // Limit to original 16 profiles
            profilesRow.classList.add('paused');
            // Reset CSS animation to avoid conflicts
            profilesRow.style.animation = 'none';
            profilesRow.offsetHeight; // Force reflow
            const profileWidth = profiles[0] ? profiles[0].offsetWidth + 16 : 136; // Fallback width (120px + 16px margin)
            console.log('Profile Width:', profileWidth, 'Index:', index); // Debug width
            const scrollPosition = -profileWidth * index;
            gsap.to(profilesRow, {
                x: scrollPosition,
                duration: 0.5,
                ease: 'power2.out',
                overwrite: 'auto', // Overwrite any conflicting animations
                onComplete: () => {
                    setTimeout(() => {
                        profilesRow.classList.remove('paused');
                        profilesRow.style.animation = ''; // Restore CSS animation
                    }, 3000); // Resume auto-scroll after 3s
                }
            });
            currentIndex = index;
        };

        leftArrow.addEventListener('click', (e) => {
            console.log('Left Arrow Clicked'); // Debug click
            scrollToProfile(currentIndex - 1);
        });

        rightArrow.addEventListener('click', (e) => {
            console.log('Right Arrow Clicked'); // Debug click
            scrollToProfile(currentIndex + 1);
        });

        // Accessibility: Allow keyboard navigation
        leftArrow.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                console.log('Left Arrow Keydown'); // Debug keydown
                leftArrow.click();
            }
        });
        rightArrow.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                console.log('Right Arrow Keydown'); // Debug keydown
                rightArrow.click();
            }
        });
    } else {
        console.error('Missing elements: Profiles Row, Arrows, or Profiles not found.');
    }

    // Key Offerings Section Animations
    gsap.fromTo('.section-title', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.key-offerings', start: 'top 80%' } });
    gsap.utils.toArray('.offering-card').forEach((card, index) => {
        gsap.fromTo(card, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, delay: index * 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.key-offerings', start: 'top 80%' } });
    });

    // Footer Animation
    gsap.fromTo('footer', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: '.key-offerings', start: 'bottom 80%' } });

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

    // Intersection Observer for Additional Animations
    observeElements('.profile, .middle-section, .section-title, .offering-card', el => el.classList.add('in-view'));
});
