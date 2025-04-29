const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
import { observeElements } from '../../scripts/utils.js';
import '../../scripts/components.js'; // Import to ensure navigation logic is available
import '../../styles/global.css'; // Import global styles
import '../../styles/components.css'; // Import components styles
import './style.css'; // Import page-specific styles

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

    // Scroll Animation Logic
    observeElements('.animate-on-scroll:not(.parallax .animate-on-scroll)', el => el.classList.add('visible'));

    // Tech Stack Generation
    const techStack = {
        fullStack: [
            { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
            { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
            { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
            { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
            { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
            { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
            { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
            { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" }
        ],
        cloudDevOps: [
            { name: "AWS", icon: "/assets/aws-logo.png" },
            { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
            { name: "Google Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
            { name: "GitHub Actions", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
            { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
            { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" }
        ],
        hyperAutomation: [
            { name: "Power Automate", icon: "/assets/power-automate.png" },
            { name: "Power BI", icon: "/assets/power-bi.png" },
            { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
            { name: "NLTK", icon: "/assets/NLTK.png" },
            { name: "spaCy", icon: "/assets/spacy.png" }
        ]
    };

    function createTechCards(sectionId, techArray) {
        const section = document.getElementById(sectionId);
        techArray.forEach(tech => {
            const card = document.createElement("div");
            card.classList.add("tech-card", "animate-on-scroll");
            card.innerHTML = `<img src="${tech.icon}" alt="${tech.name}"><span>${tech.name}</span>`;
            section.appendChild(card);
        });
    }

    createTechCards("fullStack", techStack.fullStack);
    createTechCards("cloudDevOps", techStack.cloudDevOps);
    createTechCards("hyperAutomation", techStack.hyperAutomation);

    // Footer Animation
    gsap.fromTo('footer', { opacity: 0, y: 50 }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.sec-5', start: 'bottom 80%', toggleActions: 'play none none none' }
    });
});