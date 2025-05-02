import '../styles/components.css';

export function initNavigation() {
    const navToggle = document.querySelector('.icon');
    const navMenu = document.querySelector('nav ul');
    const dropdownArrows = document.querySelectorAll('.dropdown-arrow');
    const nav = document.querySelector('nav');

    // Scroll event listener for fixed navigation
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('fixed-nav');
        } else {
            nav.classList.remove('fixed-nav');
        }
    });

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('show');
            console.log('Mobile menu toggled');
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                dropdownArrows.forEach(arrow => {
                    const dropdown = arrow.parentElement.nextElementSibling;
                    dropdown.style.display = 'none';
                    arrow.style.transform = 'rotate(0deg)';
                });
                console.log('Mobile menu closed');
            }
        });
    }

    dropdownArrows.forEach(arrow => {
        const parentLink = arrow.parentElement;
        const dropdown = parentLink.nextElementSibling;

        parentLink.addEventListener('click', (e) => {
            if (window.innerWidth <= 968) {
                e.preventDefault();
                e.stopPropagation();
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                arrow.style.transform = dropdown.style.display === 'block' ? 'rotate(180deg)' : 'rotate(0deg)';
                console.log(`Dropdown toggled for ${parentLink.textContent}`);
            }
        });

        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 968 && !parentLink.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.style.display = 'none';
                arrow.style.transform = 'rotate(0deg)';
                console.log(`Dropdown closed for ${parentLink.textContent}`);
            }
        });
    });
}

export function initFooter() {
    console.log('Footer initialized - no animations here');
}

function includeHTML() {
    document.querySelectorAll('[data-include]').forEach(element => {
        const includePath = element.getAttribute('data-include');
        const file = `/components/${includePath}.html`; // e.g., /components/navigation.html
        console.log('Fetching:', file);
        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.text();
            })
            .then(html => {
                element.innerHTML = html;
                console.log(`${includePath} loaded`);
                if (includePath === 'navigation') initNavigation();
                if (includePath === 'footer') initFooter();
            })
            .catch(error => console.error(`Include failed for ${file}:`, error));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    includeHTML();
    const checkIncludes = setInterval(() => {
        const navigation = document.querySelector('[data-include="navigation"]');
        const footer = document.querySelector('[data-include="footer"]');
        if (navigation && navigation.innerHTML && footer && footer.innerHTML) {
            clearInterval(checkIncludes);
            initNavigation();
            initFooter();
            console.log('Navigation and footer initialized');
        }
    }, 100);
});

if (module.hot) {
    module.hot.accept(() => {
        console.log('Components.js updated via HMR');
        includeHTML();
        initNavigation();
        initFooter();
    });
}