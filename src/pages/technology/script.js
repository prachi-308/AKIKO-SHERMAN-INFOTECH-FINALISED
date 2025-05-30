const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
import { observeElements } from '../../scripts/utils.js';
import '../../scripts/components.js';
import '../../styles/global.css';
import '../../styles/components.css';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    if (!gsap || !ScrollTrigger) {
        console.error('GSAP or ScrollTrigger not loaded.');
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

    // Scroll Animation
    observeElements('.animate-on-scroll', el => el.classList.add('visible'));

    // Technology Banner Animations
    gsap.fromTo('.banner-content', {
        opacity: 0,
        y: 50
    }, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out'
    });
    gsap.fromTo('.sec-2 h1', {
        opacity: 0,
        y: 50
    }, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.sec-2',
            start: 'top 100%',
            toggleActions: 'play none none none'
        }
    });
    // Section 2 Animation
    gsap.fromTo(' .sec-2 h2, .sec-2 .tech-container', {
        opacity: 0,
        y: 50
    }, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.sec-2',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    // Section 3 Animations
    gsap.fromTo('.main-heading, .sub-heading, .options li, .right-panel h2, .right-panel p, .icon-item', {
        opacity: 0,
        y: 30
    }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.sec-3',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    // Toggle Options for Section 3
    window.toggleOptions = function(section) {
        const options = document.getElementById(`${section}-options`);
        const heading = document.querySelector(`.sub-heading[onclick="toggleOptions('${section}')"]`);
        if (options.style.maxHeight && options.style.maxHeight !== '0px') {
            options.style.maxHeight = '0px';
            heading.classList.remove('active');
        } else {
            document.querySelectorAll('.options').forEach(opt => opt.style.maxHeight = '0px');
            document.querySelectorAll('.sub-heading').forEach(h => h.classList.remove('active'));
            options.style.maxHeight = options.scrollHeight + 'px';
            heading.classList.add('active');
        }
    };

    // Toggle Sidebar for Section 3
    window.toggleSidebar = function() {
        const leftPanel = document.getElementById('leftPanel');
        leftPanel.classList.toggle('expanded');
        leftPanel.classList.toggle('collapsed');

        // Force reflow to ensure smooth transition
        leftPanel.style.display = 'none';
        void leftPanel.offsetWidth; // Trigger reflow
        leftPanel.style.display = leftPanel.classList.contains('expanded') ? 'block' : 'none';
    };

    // Collapse menu on outside click
    document.addEventListener('click', (event) => {
        const leftPanel = document.getElementById('leftPanel');
        const toggleBtn = document.querySelector('.toggle-btn');

        // Check if the click is outside the left panel and toggle button
        if (!leftPanel.contains(event.target) && !toggleBtn.contains(event.target)) {
            if (leftPanel.classList.contains('expanded')) {
                leftPanel.classList.remove('expanded');
                leftPanel.classList.add('collapsed');
                leftPanel.style.display = 'none'; // Ensure it's hidden
            }
        }
    });

    // Show Content for Section 3
    window.showContent = function(section) {
        // Remove active class from all options
        document.querySelectorAll('.options li').forEach(li => li.classList.remove('active'));
        // Add active class to the clicked option
        const clickedOption = document.querySelector(`.options li[onclick="showContent('${section}')"]`);
        if (clickedOption) {
            clickedOption.classList.add('active');
        }

        const contentArea = document.getElementById('contentArea');
        let content = '';
        switch (section) {
            case 'general-purpose':
                content = `
                    <h2>General-Purpose Programming</h2>
                    <p>Languages powering a wide range of applications.</p>
                    <div class="icon-container">
                        <div class="icon-item">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" loading="lazy" decoding="async">
                            <span>Java</span>
                        </div>
                        <div class="icon-item">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" loading="lazy" decoding="async">
                            <span>Python</span>
                        </div>
                        <div class="icon-item">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" alt="PHP" loading="lazy" decoding="async">
                            <span>PHP</span>
                        </div>
                        <div class="icon-item">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node" loading="lazy" decoding="async">
                            <span>Node</span>
                        </div>
                    </div>
                `;
                break;
            case 'data-science':
                content = `
                        <h2>Data Science</h2>
                        <p>Tools for data analysis and machine learning.</p>
                        <div class="icon-container">
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python">
                                <span>Python</span>
                            </div>
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" alt="Scikit Learn">
                                <span>Scikit Learn</span>
                            </div>
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="Tensor Flow">
                                <span>Tensor Flow</span>
                            </div>
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" alt="PyTorch">
                                <span>PyTorch</span>
                            </div>
                            <div class="icon-item">
                                <img src="/assets/rapidminer.webp" alt="RapidMiner">
                                <span>RapidMiner</span>
                            </div>
                            <div class="icon-item">
                                <img src="/assets/tableau.svg" alt="Tableau">
                                <span>Tableau</span>
                            </div>
                            <div class="icon-item">
                                <img src="/assets/power-bi.png" alt="Power BI">
                                <span>Power BI</span>
                            </div>
                            <div class="icon-item">
                                <img src="/assets/qlikveiw.webp" alt="QlikView">
                                <span>QlikView</span>
                            </div>
                        </div>
                    `;
                break;
            case 'mobile-app':
                content = `
                        <h2>Mobile App Development</h2>
                        <p>Technologies for building mobile applications.</p>
                        <div class="icon-container">
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" alt="iOS">
                                <span>iOS</span>
                            </div>
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg" alt="Android">
                                <span>Android</span>
                            </div>
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xamarin/xamarin-original.svg" alt="Xamarin">
                                <span>Xamarin</span>
                            </div>
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg" alt="Ionic">
                                <span>Ionic</span>
                            </div>
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React Native">
                                <span>React Native</span>
                            </div>
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" alt="Flutter">
                                <span>Flutter</span>
                            </div>
                        </div>
                    `;
                break;
            case 'javascript':
                content = `
                        <h2>JavaScript</h2>
                        <p>Technologies for dynamic web experiences.</p>
                        <div class="icon-container">
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" alt="Angular">
                                <span>Angular</span>
                            </div>
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node">
                                <span>Node</span>
                            </div>
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React Native">
                                <span>React Native</span>
                            </div>
                        </div>
                    `;
                break;
            case 'ui-libraries':
                content = `
                        <h2>UI Libraries</h2>
                        <p>Libraries for building responsive interfaces.</p>
                        <div class="icon-container">
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" alt="Angular">
                                <span>Angular</span>
                            </div>
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg" alt="Ionic">
                                <span>Ionic</span>
                            </div>
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React Native">
                                <span>React Native</span>
                            </div>
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google ARCore">
                                <span>Google ARCore</span>
                            </div>
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" alt="Unity 3D">
                                <span>Unity 3D</span>
                            </div>
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg" alt="Unreal Engine">
                                <span>Unreal Engine</span>
                            </div>
                        </div>
                    `;
                break;
            case 'markup-essentials':
                content = `
                        <h2>Markup Essentials</h2>
                        <p>Core technologies for web design.</p>
                        <div class="icon-container">
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5">
                                <span>HTML5</span>
                            </div>
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3">
                                <span>CSS3</span>
                            </div>
                        </div>
                    `;
                break;
            case 'frameworks':
                content = `
                        <h2>Frameworks</h2>
                        <p>Back-end frameworks for scalable applications.</p>
                        <div class="icon-container">
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg" alt="ASP.net">
                                <span>ASP.net</span>
                            </div>
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node">
                                <span>Node</span>
                            </div>
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java">
                                <span>Java</span>
                            </div>
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" alt="PHP">
                                <span>PHP</span>
                            </div>
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-original.svg" alt="Visual Studio">
                                <span>Visual Studio</span>
                            </div>
                        </div>
                    `;
                break;
            case 'databases':
                content = `
                        <h2>Databases</h2>
                        <p>Reliable database solutions.</p>
                        <div class="icon-container">
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL">
                                <span>MySQL</span>
                            </div>
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg" alt="SQL Server">
                                <span>SQL Server</span>
                            </div>
                        </div>
                    `;
                break;
            case 'api-development':
                content = `
                        <h2>API Development</h2>
                        <p>Technologies for seamless integrations.</p>
                        <div class="icon-container">
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node">
                                <span>Node</span>
                            </div>
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg" alt="Apache">
                                <span>Apache</span>
                            </div>
                        </div>
                    `;
                break;
            case 'microservices':
                content = `
                        <h2>Microservices Architecture</h2>
                        <p>Tools for modular and scalable architecture.</p>
                        <div class="icon-container">
                            <div class="icon-item">
                                <img src="/assets/pega2.png" alt="Pega">
                                <span>Pega</span>
                            </div>
                            <div class="icon-item">
                                <img src="/assets/blueprism.png" alt="Blueprism">
                                <span>Blueprism</span>
                            </div>
                        </div>
                    `;
                break;
            case 'ai-frameworks':
                content = `
                        <h2>AI & ML Frameworks</h2>
                        <p>Frameworks for advanced AI/ML solutions.</p>
                        <div class="icon-container">
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" alt="Scikit Learn">
                                <span>Scikit Learn</span>
                            </div>
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="Tensor Flow">
                                <span>Tensor Flow</span>
                            </div>
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" alt="PyTorch">
                                <span>PyTorch</span>
                            </div>
                        </div>
                    `;
                break;
            case 'natural-language-processing':
                content = `
                        <h2>Natural Language Processing</h2>
                        <p>Technologies for language understanding.</p>
                        <div class="icon-container">
                            <div class="icon-item">
                                <img src="/assets/speech-recognition.png" alt="Speech Recognition">
                                <span>Speech Recognition</span>
                            </div>
                            <div class="icon-item">
                                <img src="/assets/virtual-agents.webp" alt="Virtual Agents">
                                <span>Virtual Agents</span>
                            </div>
                        </div>
                    `;
                break;
            case 'genai':
                content = `
                        <h2>Generative AI</h2>
                        <p>Innovative AI solutions.</p>
                        <div class="icon-container">
                            <div class="icon-item">
                                <img src="/assets/openai.png" alt="Virtual Agents">
                                <span>OpenAI GPT</span>
                            </div>
                            <div class="icon-item">
                                <img src="/assets/gemini.png" alt="Virtual Agents">
                                <span>Google Gemini</span>
                            </div>
                            <div class="icon-item">
                                <img src="/assets/meta.png" alt="Virtual Agents">
                                <span>Meta LLaMA</span>
                            </div>
                            <div class="icon-item">
                                <img src="/assets/claude.png" alt="Virtual Agents">
                                <span>Claude</span>
                            </div>
                            <div class="icon-item">
                                <img src="/assets/langchain.png" alt="Virtual Agents">
                                <span>LangChain</span>
                            </div>
                        </div>
                    `;
                break;
            case 'cms':
                content = `
                        <h2>Content Management Systems</h2>
                        <p>Platforms for content management.</p>
                        <div class="icon-container">
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg" alt="Wordpress">
                                <span>Wordpress</span>
                            </div>
                            <div class="icon-item">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/drupal/drupal-original.svg" alt="Drupal">
                                <span>Drupal</span>
                            </div>
                        </div>
                    `;
                break;
            case 'blockchain-platform':
                content = `
                        <h2>Blockchain Platforms</h2>
                        <p>Decentralized solutions.</p>
                        <div class="icon-container">
                            <div class="icon-item">
                                <img src="/assets/ethereum.png" alt="Ethereum">
                                <span>Ethereum</span>
                            </div>
                            <div class="icon-item">
                                <img src="/assets/hyperledger.jpeg" alt="Hyperledger Fabric">
                                <span>Hyperledger Fabric</span>
                            </div>
                            <div class="icon-item">
                                <img src="/assets/ripple.png" alt="Ripple">
                                <span>Ripple</span>
                            </div>
                            <div class="icon-item">
                                <img src="/assets/quorum.png" alt="Quorum">
                                <span>Quorum</span>
                            </div>
                            <div class="icon-item">
                                <img src="/assets/corda.png" alt="Corda">
                                <span>Corda</span>
                            </div>
                        </div>
                    `;
                break;
            case 'smart-contract':
                content = `
                        <h2>Smart Contract Development</h2>
                        <p>Secure contract solutions.</p>
                        <div class="icon-container">
                            <div class="icon-item">
                                <img src="/assets/ethereum.png" alt="Ethereum">
                                <span>Ethereum</span>
                            </div>
                            <div class="icon-item">
                                <img src="/assets/corda.png" alt="Corda">
                                <span>Corda</span>
                            </div>
                        </div>
                    `;
                break;
            case 'search-engine':
                content = `
                        <h2>Search Engine Strategies</h2>
                        <p>Enhance visibility.</p>
                        <div class="icon-container">
                            <div class="icon-item">
                                <img src="/assets/seo.png" alt="SEO">
                                <span>SEO</span>
                            </div>
                            <div class="icon-item">
                                <img src="/assets/sem.png" alt="SEM">
                                <span>SEM</span>
                            </div>
                        </div>
                    `;
                break;
            case 'ad-promo':
                content = `
                        <h2>Advertising & Promotion</h2>
                        <p>Boost reach.</p>
                        <div class="icon-container">
                            <div class="icon-item">
                                <img src="/assets/ppc.png" alt="PPC">
                                <span>PPC</span>
                            </div>
                        </div>
                    `;
                break;
            case 'content-engagement':
                content = `
                        <h2>Content & Engagement</h2>
                        <p>Engage audiences.</p>
                        <div class="icon-container">
                            <div class="icon-item">
                                <img src="/assets/smm.png" alt="SMM">
                                <span>SMM</span>
                            </div>
                            <div class="icon-item">
                                <img src="/assets/content-market.png" alt="Content Marketing">
                                <span>Content Marketing</span>
                            </div>
                            <div class="icon-item">
                                <img src="/assets/email-market.png" alt="Email Marketing">
                                <span>Email Marketing</span>
                            </div>
                        </div>
                    `;
                break;
            default:
                content = "<h2>Select a Category</h2><p>Choose an option from the left to explore our expertise.</p>";
        }
        contentArea.innerHTML = content;

        // Re-apply animations to new content
        gsap.fromTo('#contentArea h2, #contentArea p, #contentArea .icon-item', {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        });

        // Collapse the menu after selecting an option (on mobile)
        if (window.innerWidth <= 768) {
            const leftPanel = document.getElementById('leftPanel');
            if (leftPanel.classList.contains('expanded')) {
                leftPanel.classList.remove('expanded');
                leftPanel.classList.add('collapsed');
                leftPanel.style.display = 'none';
            }
        }
    };

    // Initialize Section 3
    toggleOptions('programming-Languages');
    showContent('general-purpose');

    function initFooterAnimation() {
        const footer = document.querySelector('footer');
        if (!footer) {
            console.warn('Footer not found. Retrying...');
            setTimeout(initFooterAnimation, 100);
            return;
        }
        gsap.fromTo(footer, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: '.sec-3',
                start: 'bottom 80%',
                toggleActions: 'play none none none'
            }
        });
    }
    initFooterAnimation();
});
