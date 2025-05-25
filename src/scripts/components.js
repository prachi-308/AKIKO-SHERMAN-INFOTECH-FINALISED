import '../styles/components.css';

export async function initNavigation() {
    const nav = document.querySelector('nav');
    if (!nav) {
        console.error('Navigation failed: nav element not found. Check navigation.html inclusion.');
        return;
    }

    const hamburgerIcon = document.querySelector('nav .icon');
    const navMenu = document.querySelector('nav ul');
    const dropdownArrows = document.querySelectorAll('.dropdown-arrow');

    if (!hamburgerIcon || !navMenu) {
        console.error('Navigation failed: .icon or nav ul not found. Check navigation.html structure.');
        return;
    }

    console.log('Navigation elements found. Initializing...');

    // Fixed navigation on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('fixed-nav');
        } else {
            nav.classList.remove('fixed-nav');
        }
    });

    // Hamburger menu toggle with click and touch support
    const toggleMenu = (e) => {
        e.stopPropagation();
        e.preventDefault();
        navMenu.classList.toggle('show');
        console.log('Hamburger menu toggled:', navMenu.classList.contains('show') ? 'opened' : 'closed');
        console.log('Menu display style:', window.getComputedStyle(navMenu).display);
    };

    // Remove existing listeners to avoid conflicts
    const newHamburgerIcon = hamburgerIcon.cloneNode(true);
    hamburgerIcon.parentNode.replaceChild(newHamburgerIcon, hamburgerIcon);

    // Add both click and touchstart events for better mobile support
    newHamburgerIcon.addEventListener('click', toggleMenu);
    newHamburgerIcon.addEventListener('touchstart', toggleMenu);

    // Close menu on outside click, but exclude clicks inside navMenu
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1160 && navMenu.classList.contains('show')) {
            if (!navMenu.contains(e.target) && !newHamburgerIcon.contains(e.target)) {
                navMenu.classList.remove('show');
                console.log('Hamburger menu closed due to outside click');

                // Close all dropdowns
                dropdownArrows.forEach(arrow => {
                    const dropdown = arrow.parentElement.nextElementSibling;
                    if (dropdown) {
                        dropdown.classList.remove('show');
                        arrow.style.transform = 'rotate(0deg)';
                    }
                });
            }
        }
    });

    // Close menu when selecting an option (mobile), but exclude dropdown toggles
    navMenu.querySelectorAll('ul li a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 1160) {
                const isDropdownToggle = link.querySelector('.dropdown-arrow');
                if (!isDropdownToggle) {
                    navMenu.classList.remove('show');
                    console.log('Hamburger menu closed after selecting an option');
                }
            }
        });
    });

    // Dropdown menu handling for mobile and desktop
    dropdownArrows.forEach(arrow => {
        const parentLink = arrow.parentElement;
        const dropdown = parentLink.nextElementSibling;

        if (!dropdown) {
            console.error(`Dropdown not found for ${parentLink.textContent}. Check navigation.html structure.`);
            return;
        }

        const toggleDropdown = (e) => {
            if (window.innerWidth <= 1160) {
                e.preventDefault();
                e.stopPropagation();
                dropdown.classList.toggle('show');
                arrow.style.transform = dropdown.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
                console.log(`Dropdown toggled for ${parentLink.textContent}: ${dropdown.classList.contains('show') ? 'visible' : 'hidden'}`);
            }
        };

        parentLink.addEventListener('click', toggleDropdown);
        parentLink.addEventListener('touchstart', toggleDropdown);

        // Close dropdowns on outside click
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1160 && !parentLink.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
                arrow.style.transform = 'rotate(0deg)';
                console.log(`Dropdown closed for ${parentLink.textContent}`);
            }
        });
    });

    console.log('Navigation initialized successfully');
}

export function initFooter() {
    console.log('Footer initialized');
}

function initializeChatbot(attempt = 1, maxAttempts = 5) {
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const inputContainer = document.getElementById('chatbot-input-container');

    if (!chatbotIcon || !chatbotWindow || !chatbotClose || !chatbotMessages || !chatbotInput || !chatbotSend || !inputContainer) {
        if (attempt < maxAttempts) {
            console.log(`Chatbot attempt ${attempt}/${maxAttempts}: Elements not found, retrying in ${100 * attempt}ms`);
            return setTimeout(() => initializeChatbot(attempt + 1, maxAttempts), 100 * attempt);
        }
        console.error('Chatbot failed: Required elements not found after max retries. Check if <div data-include="chatbot"> exists.');
        return;
    }

    console.log('Chatbot initialized');

    // Responses using template literals
    const responses = {
        "hi": `Hello! Welcome to Akiko Sherman Infotech, a CMMI Level-3 certified IT leader with 25+ years of innovation. Choose a page to explore:`,
        "hello": `Hi there! I'm your guide to Akiko Sherman Infotech’s tech universe. With 500+ projects, we’re transforming industries. Select a page:`,
        "how are you": `I’m powered up and ready to assist! Curious about our solutions? Pick a page:`,
        "bye": `See you soon! Reach out at info@shermanindia.com if you need us!`,
        "about company": `Akiko Sherman Infotech Pvt Ltd is a CMMI Level-3 certified IT company with 25+ years of experience, delivering 500+ eGovernance and Enterprise IT projects. Visit our <a href='/company.html'>Company Page</a> or select a page:`,
        "company": `We’re Akiko Sherman Infotech, a tech pioneer with 25+ years and 500+ projects. Learn more on our <a href='/company.html'>Company Page</a> or choose a page:`,
        "yes": `Awesome! Let’s connect you with our experts. Redirecting to the Contact page...`,
        "no": `Do you have any other doubts, or would you like to go back to the main menu?`,
        "default": `Hmm, that’s a tricky one! Our expert team at Akiko Sherman Infotech can dive deeper. Want to reach out to them? Reply 'Yes' or 'No'.`
    };

    // Redirect map for all pages and sub-options
    const redirectMap = {
        "home": "/home.html",
        "company": "/company.html",
        "services": "/services.html",
        "solutions": "/solutions.html",
        "technologies": "/technology.html",
        "blog": "/blog.html",
        "contact": "/contact.html",
        "ai & ml": "/ai.html",
        "e-governance": "/egov.html",
        "e-commerce": "/ecom.html",
        "web & mobility": "/web.html",
        "salesforce implementation": "/salesforce.html",
        "staffing & support": "/staffing.html",
        "farm2plate": "/farm2plate.html",
        "infracon": "/infracon.html",
        "land acquisition": "/land.html",
        "owc": "/owc.html",
        "tamra": "/tamra.html",
        "smart meter": "/smartmeter.html"
    };

    // Top-level page options for initial selection
    const pageOptions = [
        { label: "Home", key: "home" },
        { label: "Company", key: "company" },
        { label: "Services", key: "services" },
        { label: "Solutions", key: "solutions" },
        { label: "Technologies", key: "technologies" },
        { label: "Blog", key: "blog" },
        { label: "Contact", key: "contact" }
    ];

    // Services options for secondary selection
    const serviceOptions = [
        { label: "AI & ML", key: "ai & ml" },
        { label: "E-Governance", key: "e-governance" },
        { label: "E-commerce", key: "e-commerce" },
        { label: "Web & Mobility", key: "web & mobility" },
        { label: "Salesforce Implementation", key: "salesforce implementation" },
        { label: "Staffing & Support", key: "staffing & support" }
    ];

    // Solutions options for secondary selection
    const solutionOptions = [
        { label: "Farm2Plate", key: "farm2plate" },
        { label: "Infracon", key: "infracon" },
        { label: "Land Acquisition", key: "land acquisition" },
        { label: "OWC", key: "owc" },
        { label: "Tamra", key: "tamra" },
        { label: "Smart Meter", key: "smart meter" }
    ];

    // Load chat history from sessionStorage
    let chatHistory = JSON.parse(sessionStorage.getItem('chatHistory')) || [];
    let awaitingContactResponse = false;
    let awaitingDoubtResponse = false;
    let hasShownButtonInstruction = false;

    function saveChatHistory() {
        sessionStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }

    function loadChatHistory() {
        chatbotMessages.innerHTML = '';
        hasShownButtonInstruction = false;
        chatHistory.forEach(msg => {
            addMessage(msg.text, msg.sender, false);
        });
    }

    function toggleChatbot() {
        chatbotWindow.classList.toggle('hidden');
        if (!chatbotWindow.classList.contains('hidden')) {
            loadChatHistory();
            chatbotInput.focus();
        }
    }

    function displayMainMenu() {
        const menuContainer = document.createElement('div');
        menuContainer.className = 'message bot button-menu';

        pageOptions.forEach(opt => {
            const button = document.createElement('button');
            button.textContent = opt.label;
            button.className = 'main-nav-btn';
            button.onclick = () => {
                addMessage(opt.label, 'user');
                if (opt.key === "services") {
                    displayServicesMenu();
                } else if (opt.key === "solutions") {
                    displaySolutionsMenu();
                } else {
                    const response = `Taking you to the ${opt.key} page...`;
                    addMessage(response, 'bot');
                    speak(response);
                    setTimeout(() => window.location.href = redirectMap[opt.key], 1500);
                }
            };
            menuContainer.appendChild(button);
        });

        chatbotMessages.appendChild(menuContainer);

        if (!hasShownButtonInstruction) {
            const instruction = document.createElement('div');
            instruction.className = 'message bot';
            const instructionText = document.createElement('div');
            instructionText.className = 'text';
            instructionText.textContent = 'You can click on any button to go to a specific page.';
            instruction.appendChild(document.createElement('img')).src = 'assets/bot.png';
            instruction.firstChild.className = 'avatar';
            instruction.appendChild(instructionText);
            chatbotMessages.appendChild(instruction);

            hasShownButtonInstruction = true;
        }

        saveChatHistory();
    }

    function displayServicesMenu() {
        const message = `Services are:-`;
        addMessage(message, 'bot');

        const menuContainer = document.createElement('div');
        menuContainer.className = 'message bot button-menu';

        serviceOptions.forEach(opt => {
            const button = document.createElement('button');
            button.textContent = opt.label;
            button.className = 'sub-nav-btn';
            button.onclick = () => {
                addMessage(opt.label, 'user');
                const response = `Taking you to the ${opt.key} page...`;
                addMessage(response, 'bot');
                speak(response);
                setTimeout(() => window.location.href = redirectMap[opt.key], 1500);
            };
            menuContainer.appendChild(button);
        });

        chatbotMessages.appendChild(menuContainer);
        saveChatHistory();
    }

    function displaySolutionsMenu() {
        const message = `Solutions`;
        addMessage(message, 'bot');

        const menuContainer = document.createElement('div');
        menuContainer.className = 'message bot button-menu';

        solutionOptions.forEach(opt => {
            const button = document.createElement('button');
            button.textContent = opt.label;
            button.className = 'sub-nav-btn';
            button.onclick = () => {
                addMessage(opt.label, 'user');
                const response = `Taking you to the ${opt.key} page...`;
                addMessage(response, 'bot');
                speak(response);
                setTimeout(() => window.location.href = redirectMap[opt.key], 1500);
            };
            menuContainer.appendChild(button);
        });

        chatbotMessages.appendChild(menuContainer);
        saveChatHistory();
    }

    function addMessage(message, sender = 'bot', save = true) {
        const messageContainer = document.createElement('div');
        messageContainer.className = `message ${sender}`;

        const avatar = document.createElement('img');
        avatar.src = sender === 'user' ? 'assets/user.png' : 'assets/bot.png';
        avatar.className = 'avatar';

        const text = document.createElement('div');
        text.className = 'text';
        text.innerHTML = message;

        messageContainer.appendChild(avatar);
        messageContainer.appendChild(text);
        chatbotMessages.appendChild(messageContainer);

        if (["hi", "hello", "how are you", "about company", "company"].some(key => responses[key] === message)) {
            displayMainMenu();
        }

        if (message === responses["default"]) {
            const buttonMenu = document.createElement('div');
            buttonMenu.className = 'message bot button-menu';

            const yesBtn = document.createElement('button');
            yesBtn.textContent = 'Yes';
            yesBtn.className = 'contact-yes-btn';
            yesBtn.onclick = () => {
                addMessage('Yes', 'user');
                sendMessage('yes');
            };

            const noBtn = document.createElement('button');
            noBtn.textContent = 'No';
            noBtn.className = 'contact-no-btn';
            noBtn.onclick = () => {
                addMessage('No', 'user');
                sendMessage('no');
            };

            buttonMenu.appendChild(yesBtn);
            buttonMenu.appendChild(noBtn);
            chatbotMessages.appendChild(buttonMenu);
            awaitingContactResponse = true;
        }

        if (message === responses["no"]) {
            const buttonMenu = document.createElement('div');
            buttonMenu.className = 'message bot button-menu';

            const yesDoubtBtn = document.createElement('button');
            yesDoubtBtn.textContent = 'Yes, I have doubts';
            yesDoubtBtn.className = 'doubt-btn';
            yesDoubtBtn.onclick = () => {
                addMessage('Yes, I have doubts', 'user');
                addMessage('Please type your query, and I’ll help you out!', 'bot');
                awaitingDoubtResponse = true;
            };

            const backBtn = document.createElement('button');
            backBtn.textContent = 'Back to Main Menu';
            backBtn.className = 'menu-return-btn';
            backBtn.onclick = () => {
                addMessage('Back to Main Menu', 'user');
                addMessage('Here’s the main menu:', 'bot');
                displayMainMenu();
            };

            buttonMenu.appendChild(yesDoubtBtn);
            buttonMenu.appendChild(backBtn);
            chatbotMessages.appendChild(buttonMenu);
        }

        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        if (save) {
            chatHistory.push({ text: message, sender });
            saveChatHistory();
        }
    }

    function speak(text) {
        const speech = new SpeechSynthesisUtterance(text.replace(/<[^>]+>/g, ''));
        speech.lang = 'en-US';
        speechSynthesis.speak(speech);
    }

    function showTypingIndicator() {
        const typing = document.createElement('div');
        typing.className = 'typing-indicator';
        typing.innerHTML = '<span></span><span></span><span></span>';
        chatbotMessages.appendChild(typing);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        return typing;
    }

    function sendMessage(overrideMessage = null) {
        if (!chatbotWindow.classList.contains('hidden')) chatbotInput.focus();
        const userMessage = overrideMessage || chatbotInput.value.trim();
        if (!userMessage) return;

        if (!overrideMessage) {
            addMessage(userMessage, 'user');
            chatbotInput.value = "";
        }

        const lower = userMessage.toLowerCase();

        if (awaitingContactResponse && (lower === "yes" || lower === "no")) {
            const response = responses[lower];
            const typing = showTypingIndicator();
            setTimeout(() => {
                typing.remove();
                addMessage(response, 'bot');
                speak(response);
                if (lower === "yes") {
                    setTimeout(() => window.location.href = redirectMap["contact"], 1500);
                }
                awaitingContactResponse = false;
            }, 500);
            return;
        }

        if (awaitingDoubtResponse) {
            const response = responses["default"];
            const typing = showTypingIndicator();
            setTimeout(() => {
                typing.remove();
                addMessage(response, 'bot');
                speak(response);
                awaitingDoubtResponse = false;
            }, 500);
            return;
        }

        if (lower.includes("company") || lower.includes("about company")) {
            const response = responses["company"];
            const typing = showTypingIndicator();
            setTimeout(() => {
                typing.remove();
                addMessage(response, 'bot');
                speak(response);
                setTimeout(() => window.location.href = redirectMap["company"], 1500);
            }, 500);
            return;
        }

        for (const key in redirectMap) {
            if (lower.includes(key)) {
                const response = `Taking you to our ${key} page...`;
                const typing = showTypingIndicator();
                setTimeout(() => {
                    typing.remove();
                    addMessage(response, 'bot');
                    speak(response);
                    setTimeout(() => window.location.href = redirectMap[key], 1500);
                }, 500);
                return;
            }
        }

        const botResponse = responses[lower] || responses["default"];
        const typing = showTypingIndicator();
        setTimeout(() => {
            typing.remove();
            addMessage(botResponse, 'bot');
            speak(botResponse);
        }, 500);
    }

    if (!document.getElementById('chatbot-mic')) {
        const micButton = document.createElement('button');
        micButton.innerHTML = '🎤';
        micButton.id = 'chatbot-mic';
        micButton.title = 'Speak';
        micButton.className = 'chatbot-mic';
        micButton.onclick = listenVoice;
        inputContainer.appendChild(micButton);
    }

    function listenVoice() {
        try {
            const recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = 'en-US';
            recognition.start();

            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                chatbotInput.value = transcript;
                sendMessage();
            };

            recognition.onerror = function() {
                addMessage("Oops, I didn't catch that. Try speaking again!", 'bot');
            };
        } catch (err) {
            addMessage("Voice recognition isn't supported in this browser. Try typing instead!", 'bot');
        }
    }

    chatbotIcon.onclick = toggleChatbot;
    chatbotClose.onclick = toggleChatbot;
    chatbotSend.onclick = () => sendMessage();
    chatbotInput.onkeypress = (e) => { if (e.key === 'Enter') sendMessage(); };

    if (!chatHistory.length) {
        setTimeout(() => addMessage("Welcome to Akiko Sherman Infotech Pvt Ltd! We’re a CMMI Level-3 certified IT leader with 25+ years of innovation, delivering 500+ projects. Choose a page:", 'bot'), 500);
    } else {
        loadChatHistory();
    }
}

async function includeHTML() {
    console.log('includeHTML started');
    const elements = document.querySelectorAll('[data-include]');

    for (const element of elements) {
        let includePath = element.getAttribute('data-include');
        console.log(`Attempting to load component: ${includePath}`);

        const componentMap = {
            'navigation': 'components/navigation.html',
            'footer': 'components/footer.html',
            'chatbot': 'components/chatbot.html'
        };

        const file = componentMap[includePath] || `components/${includePath}.html`;

        try {
            console.log(`Fetching ${file}`);
            const response = await fetch(file);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} for ${file}`);
            }
            const html = await response.text();
            console.log(`Successfully loaded ${file}`);
            element.innerHTML = html;

            if (includePath === 'navigation') {
                await initNavigation();
            } else if (includePath === 'footer') {
                initFooter();
            } else if (includePath === 'chatbot') {
                initializeChatbot();
            }
        } catch (error) {
            console.error(`Failed to load ${file}:`, error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired, calling includeHTML');
    includeHTML();
});

if (module.hot) {
    module.hot.accept(() => {
        console.log('Hot module replacement triggered, reloading includeHTML');
        includeHTML();
    });
}
