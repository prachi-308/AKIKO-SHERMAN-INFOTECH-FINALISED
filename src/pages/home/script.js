const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
gsap.registerPlugin(ScrollTrigger);
import { observeElements } from '../../scripts/utils.js';
import '../../scripts/components.js';
import '../../styles/global.css';
import '../../styles/components.css';
import './style.css';

// Utility: Throttle function to limit execution rate
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

// Utility: Debounce function to prevent rapid clicks
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Lazy Load Images
document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll(".lazy-img");

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute("data-src");
                if (src) {
                    img.src = src;
                    img.removeAttribute("data-src");
                    img.classList.remove("lazy-img");
                    observer.unobserve(img);
                }
            }
        });
    }, { rootMargin: "50px 0px" });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// ImageOptimizer class for lazy loading and optimization
class ImageOptimizer {
    constructor() {
        this.optimizeImages();
    }
    optimizeImages() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.setAttribute('src', img.getAttribute('data-src'));
            img.removeAttribute('data-src');
            if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
            if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
        });
    }
}
new ImageOptimizer();

// Home Slider Functionality
const btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".bg-slide");
const contents = document.querySelectorAll(".content");
const sliderNavigation = document.querySelector(".slider-navigation");
let currentIndex = 0;
const totalSlides = slides.length;

function sliderNav(index) {
    btns.forEach(btn => btn.classList.remove("active"));
    slides.forEach(slide => slide.classList.remove("active"));
    contents.forEach(content => content.classList.remove("active"));

    btns[index].classList.add("active");
    slides[index].classList.add("active");
    contents[index].classList.add("active");

    // GSAP animations for content elements
    const heading = contents[index].querySelector("h1");
    const paragraph = contents[index].querySelector("p");
    const button = contents[index].querySelector("button");

    gsap.fromTo(heading, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
    gsap.fromTo(paragraph, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 });
    gsap.fromTo(button, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.4 });
}

function autoSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    sliderNav(currentIndex);
}

window.addEventListener("load", () => {
    if (slides.length > 0 && contents.length > 0 && btns.length > 0) {
        sliderNav(0);
        gsap.fromTo(sliderNavigation, { opacity: 0 }, { opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 });
        console.log("Page loaded, initializing slider");
    } else {
        console.error("Slider elements not found:", { slides, contents, btns });
    }
});

let slideInterval = setInterval(autoSlide, 5000);

btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        clearInterval(slideInterval);
        sliderNav(i);
        currentIndex = i;
        slideInterval = setInterval(autoSlide, 5000);
    });
});

// Portfolio Slider Functionality// Portfolio Slider Functionality
// Portfolio Slider Functionality
let currentIndex1 = 0;
let autoSlideInterval;
let isTransitioning = false;

// Cache DOM elements for portfolio slider
const sliderContainer = document.querySelector('.slider-container');
const sliderItems = document.querySelectorAll('.slider-item');
const progressBars = document.querySelectorAll('.progress-bar');
const portfolioContent = document.querySelector('.portfolio-content');
const portfolioSlider = document.querySelector('.portfolio-slider');
const portfolioSection = document.querySelector('.portfolio-section');

// Cache itemWidth and totalSlides1
let itemWidth = 0;
let totalSlides1 = sliderItems.length;

// Clone slides for infinite loop
let isSliderInitialized = false;

function initInfiniteSlider() {
    if (isSliderInitialized) {
        console.log('Slider already initialized');
        return;
    }
    if (!sliderContainer || !portfolioSlider || !portfolioSection) {
        console.error('Portfolio slider elements missing:', {
            sliderContainer,
            portfolioSlider,
            portfolioSection
        });
        return;
    }
    if (totalSlides1 === 0) {
        console.error('No slider items found. Check .slider-item elements in HTML.');
        return;
    }
    isSliderInitialized = true;
    console.log(`Initializing slider with ${totalSlides1} items`);

    // Remove existing clones to prevent duplication
    const existingClones = sliderContainer.querySelectorAll('.slider-item.clone');
    existingClones.forEach(clone => clone.remove());

    // Update itemWidth
    itemWidth = sliderItems[0] ? sliderItems[0].offsetWidth + 20 : 500;
    if (itemWidth === 500) {
        console.warn('Using fallback item width (500px). Elements may be hidden or not rendered.');
    }

    // Clone all slides and append them
    sliderItems.forEach((item, index) => {
        const clone = item.cloneNode(true);
        clone.classList.add('clone');
        clone.dataset.index = index;
        sliderContainer.appendChild(clone);
    });

    // Update the slider container width
    sliderContainer.style.width = `${(totalSlides1 * 2) * itemWidth}px`;
}

// Update slider position
function updateSlider(transition = true) {
    if (!sliderContainer || totalSlides1 === 0) {
        console.warn('Cannot update slider: container or slides missing');
        return;
    }
    sliderContainer.style.transition = transition ? 'transform 0.5s ease-in-out' : 'none';
    sliderContainer.style.transform = `translateX(-${currentIndex1 * itemWidth}px)`;
    resetProgress();
}

// Move to next slide
function nextSlide() {
    if (isTransitioning || totalSlides1 === 0) {
        console.log('Next slide skipped:', { isTransitioning, totalSlides1 });
        return;
    }
    isTransitioning = true;
    currentIndex1++;
    updateSlider(true);
    if (currentIndex1 >= totalSlides1) {
        setTimeout(() => {
            currentIndex1 = 0;
            updateSlider(false);
            isTransitioning = false;
        }, 500);
    } else {
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
}

// Move to previous slide
function prevSlide() {
    if (isTransitioning || totalSlides1 === 0) {
        console.log('Prev slide skipped:', { isTransitioning, totalSlides1 });
        return;
    }
    isTransitioning = true;
    currentIndex1--;
    if (currentIndex1 < 0) {
        currentIndex1 = totalSlides1 - 1;
        updateSlider(false);
        setTimeout(() => {
            updateSlider(true);
            isTransitioning = false;
        }, 0);
    } else {
        updateSlider(true);
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
}

// Reset progress bars
function resetProgress() {
    progressBars.forEach(bar => {
        gsap.to(bar, { width: '0%', duration: 0.2, ease: 'power2.out' });
    });
    const progressIndex = currentIndex1 % totalSlides1;
    if (progressBars[progressIndex]) {
        gsap.to(progressBars[progressIndex], { width: '100%', duration: 3, ease: 'linear' });
    }
}

function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(nextSlide, 1500);
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

function matchSliderHeight() {
    requestAnimationFrame(() => {
        if (window.innerWidth > 540 && portfolioContent && portfolioSlider) {
            const contentHeight = portfolioContent.offsetHeight;
            portfolioSlider.style.height = `${contentHeight}px`;
        } else if (portfolioSlider) {
            portfolioSlider.style.height = 'auto';
        }
    });
}

// Expose nextSlide and prevSlide to the global scope for onclick
window.nextSlide = debounce(() => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
}, 300);

window.prevSlide = debounce(() => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
}, 300);

// Throttle the updateSlider and matchSliderHeight for resize events
const throttledUpdateSlider = throttle(() => {
    if (sliderItems.length > 0) {
        itemWidth = sliderItems[0] ? sliderItems[0].offsetWidth + 20 : 500;
        sliderContainer.style.width = `${(totalSlides1 * 2) * itemWidth}px`;
        updateSlider(false);
    } else {
        console.warn('No slider items found on resize');
    }
}, 100);

const throttledMatchSliderHeight = throttle(matchSliderHeight, 100);

// Initialize slider on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    console.time('SliderInitialization');
    if (sliderItems.length > 0) {
        initInfiniteSlider();
        resetProgress();
        matchSliderHeight();
        startAutoSlide();
        if (portfolioSection) {
            portfolioSection.addEventListener('mouseenter', stopAutoSlide);
            portfolioSection.addEventListener('mouseleave', startAutoSlide);
        } else {
            console.warn('portfolioSection not found, hover events not added');
        }
        const leftArrow = document.querySelector('.arrow.left');
        const rightArrow = document.querySelector('.arrow.right');
        if (leftArrow) {
            leftArrow.addEventListener('click', window.prevSlide);
        } else {
            console.warn('Left arrow not found');
        }
        if (rightArrow) {
            rightArrow.addEventListener('click', window.nextSlide);
        } else {
            console.warn('Right arrow not found');
        }
        window.addEventListener('resize', () => {
            throttledUpdateSlider();
            throttledMatchSliderHeight();
        });
    } else {
        console.error('Slider initialization failed: No .slider-item elements found');
    }
    console.timeEnd('SliderInitialization');
}); // Blog Functionality
function changeBlog(image, title, description, url) {
    const mainImage = document.querySelector('#main-image-custom');
    const mainTitle = document.querySelector('#main-title-custom');
    const mainDescription = document.querySelector('#main-description-custom');
    const readMoreBtn = document.querySelector('.read-more-btn-custom');

    if (!mainImage || !mainTitle || !mainDescription || !readMoreBtn) {
        console.error('Error: Blog elements missing', { mainImage, mainTitle, mainDescription, readMoreBtn });
        return;
    }

    gsap.to([mainImage, mainTitle, mainDescription], {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
            const img = new Image();
            img.src = image;
            img.onload = () => {
                mainImage.src = image;
                mainTitle.textContent = title;
                mainDescription.textContent = description;
                readMoreBtn.onclick = () => window.location.href = url;
                gsap.to([mainImage, mainTitle, mainDescription], {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            };
            img.onerror = () => {
                console.error(`Failed to load image: ${image}`);
                mainImage.src = '/assets/fallback-blog.png';
                mainTitle.textContent = title;
                mainDescription.textContent = description;
                readMoreBtn.onclick = () => window.location.href = url;
                gsap.to([mainImage, mainTitle, mainDescription], {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            };
        }
    });
}

// GSAP Scroll Animations
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded, initializing GSAP animations");

    // Section 2 Animations
    const sec2 = document.querySelector('.sec-2');
    const solution = document.querySelector('.solution');
    const gridContainer = document.querySelector('.grid-container');
    if (sec2 && solution && gridContainer) {
        gsap.to(solution, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sec2,
                start: "top 80%",
                toggleActions: "play none none none",
                onEnter: () => console.log("Solution animation triggered"),
            }
        });

        gsap.to(solution.querySelector("p"), {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.2,
            scrollTrigger: {
                trigger: sec2,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        gsap.to(".grid-item", {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: gridContainer,
                start: "top 80%",
                toggleActions: "play none none none",
                onEnter: () => console.log("Grid items animation triggered"),
            }
        });
    } else {
        console.error("One or more sec-2 elements not found:", { sec2, solution, gridContainer });
    }

    // Section 3 Animations
    const sec3 = document.querySelector('.sec-3');
    if (sec3) {
        gsap.to(sec3, {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: sec3,
                start: "top 80%",
                toggleActions: "play none none none",
                onEnter: () => console.log("Sec-3 animation triggered")
            }
        });

        gsap.to(".header-section h1", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sec3,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        gsap.to(".cmmi", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.2,
            scrollTrigger: {
                trigger: sec3,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        gsap.to(".why-choose-us", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.4,
            scrollTrigger: {
                trigger: sec3,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        gsap.to(".clients-section-title p", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.6,
            scrollTrigger: {
                trigger: sec3,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        gsap.to(".clients-section", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.8,
            scrollTrigger: {
                trigger: sec3,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        gsap.to('.parallax', {
            backgroundPositionY: "50%",
            ease: "none",
            scrollTrigger: {
                trigger: '.parallax',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    } else {
        console.error("Sec-3 not found");
    }

    // Restart clients row animation on load
    const clientsRow = document.querySelector('.clients-row');
    if (clientsRow) {
        clientsRow.style.animation = 'none';
        void clientsRow.offsetWidth;
        clientsRow.style.animation = 'scroll 40s linear infinite';
    }

    // Custom Section Animations
    gsap.from(".custom-section-bg", {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".custom-section-bg",
            start: "top 80%",
            toggleActions: "play none none none",
            onEnter: () => console.log("Custom section animation triggered"),
            onLeave: () => console.log("Custom section left viewport"),
            onEnterBack: () => console.log("Custom section re-entered")
        }
    });

    gsap.from(".custom-content-wrapper", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: {
            trigger: ".custom-section-bg",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    gsap.from(".custom-cta-button", {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 0.4,
        scrollTrigger: {
            trigger: ".custom-section-bg",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    // Blog Section Animations
    gsap.from(".blog-section-custom", {
        opacity: 0,
        y: 100,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".blog-section-custom",
            start: "top 80%",
            toggleActions: "play none none none",
            onEnter: () => console.log("Blog section animation triggered"),
            onLeave: () => console.log("Blog section left viewport"),
            onEnterBack: () => console.log("Blog section re-entered")
        }
    });

    gsap.from(".blog-title-custom", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".blog-section-custom",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    gsap.from(".blog-main-custom", {
        opacity: 0,
        x: -50,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".blog-section-custom",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    gsap.from(".blog-list-custom", {
        opacity: 0,
        x: 50,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".blog-section-custom",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    // Portfolio Section Animations
    gsap.to(".portfolio-section", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".portfolio-section",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    gsap.to(".portfolio-content", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".portfolio-section",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    gsap.to(".explore-btn", {
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: ".portfolio-content",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    gsap.to(".portfolio-slider", {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".portfolio-slider",
            start: "top 90%",
            toggleActions: "play none none none"
        }
    });

    gsap.to(".slider-item", {
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".portfolio-slider",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });
});

// Lazy-load footer animation
function initializeFooterAnimation() {
    const footer = document.querySelector('footer');
    if (!footer) {
        setTimeout(initializeFooterAnimation, 100);
        return;
    }

    ScrollTrigger.create({
        trigger: '.contact-section',
        start: 'bottom 80%',
        onEnter: () => {
            gsap.fromTo(footer, {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power4.out'
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', initializeFooterAnimation);

// Fallback to ensure visibility
document.addEventListener("DOMContentLoaded", () => {
    const customSection = document.querySelector('.custom-section-bg');
    const blogSection = document.querySelector('.blog-section-custom');

    // Immediate visibility check
    if (customSection) {
        gsap.set(customSection, { opacity: 1, y: 0 });
        gsap.set(".custom-content-wrapper", { opacity: 1, y: 0 });
        gsap.set(".custom-cta-button", { opacity: 1, scale: 1 });
    }

    if (blogSection) {
        gsap.set(blogSection, { opacity: 1, y: 0 });
        gsap.set(".blog-title-custom", { opacity: 1, y: 0 });
        gsap.set(".blog-main-custom", { opacity: 1, x: 0 });
        gsap.set(".blog-list-custom", { opacity: 1, x: 0 });
        gsap.set(".blog-item-custom", { opacity: 1, y: 0 });
    }

    // Delayed fallback for slow loads
    setTimeout(() => {
        if (customSection && window.getComputedStyle(customSection).opacity === '0') {
            console.warn("Custom section not visible, applying fallback");
            gsap.set(customSection, { opacity: 1, y: 0 });
            gsap.set(".custom-content-wrapper", { opacity: 1, y: 0 });
            gsap.set(".custom-cta-button", { opacity: 1, scale: 1 });
        }

        if (blogSection && window.getComputedStyle(blogSection).opacity === '0') {
            console.warn("Blog section not visible, applying fallback");
            gsap.set(blogSection, { opacity: 1, y: 0 });
            gsap.set(".blog-title-custom", { opacity: 1, y: 0 });
            gsap.set(".blog-main-custom", { opacity: 1, x: 0 });
            gsap.set(".blog-list-custom", { opacity: 1, x: 0 });
            gsap.set(".blog-item-custom", { opacity: 1, y: 0 });
        }
    }, 1000);
});
