// src/scripts/utils.js
export function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) return;
        lastCall = now;
        return func(...args);
    };
}

export function observeElements(selector, callback) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) callback(entry.target);
        });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll(selector);
    if (elements && elements.length > 0) {
        elements.forEach(el => observer.observe(el));
    } else {
        console.warn(`No elements found for selector: ${selector}`);
        const singleElement = document.querySelector(selector);
        if (singleElement) observer.observe(singleElement);
    }
    return observer;
}