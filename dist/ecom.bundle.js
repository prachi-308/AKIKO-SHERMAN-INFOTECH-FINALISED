/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/pages/e-commerce/script.js":
/*!****************************************!*\
  !*** ./src/pages/e-commerce/script.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/utils.js */ \"./src/scripts/utils.js\");\n/* harmony import */ var _scripts_components_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/components.js */ \"./src/scripts/components.js\");\n/* harmony import */ var _styles_global_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../styles/global.css */ \"./src/styles/global.css\");\n/* harmony import */ var _styles_components_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../styles/components.css */ \"./src/styles/components.css\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.css */ \"./src/pages/e-commerce/style.css\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nvar gsap = window.gsap;\nvar ScrollTrigger = window.ScrollTrigger;\n\n\n\n\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  if (!gsap || !ScrollTrigger) {\n    console.error('GSAP or ScrollTrigger not loaded. Check script order in HTML.');\n    return;\n  }\n  gsap.registerPlugin(ScrollTrigger);\n\n  // Image Optimization\n  var ImageOptimizer = /*#__PURE__*/function () {\n    function ImageOptimizer() {\n      _classCallCheck(this, ImageOptimizer);\n      this.optimizeImages();\n    }\n    return _createClass(ImageOptimizer, [{\n      key: \"optimizeImages\",\n      value: function optimizeImages() {\n        document.querySelectorAll('img').forEach(function (img) {\n          if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');\n          if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');\n        });\n      }\n    }]);\n  }();\n  new ImageOptimizer();\n\n  // Scroll Animation Logic\n  (0,_scripts_utils_js__WEBPACK_IMPORTED_MODULE_0__.observeElements)('.animate-on-scroll:not(.parallax .animate-on-scroll)', function (el) {\n    return el.classList.add('visible');\n  });\n\n  // Hero Section Animations\n  gsap.fromTo('.orange-container', {\n    opacity: 0,\n    y: 100,\n    rotateX: -60\n  }, {\n    opacity: 1,\n    y: 0,\n    rotateX: 0,\n    duration: 1.5,\n    ease: 'power3.out'\n  });\n  gsap.fromTo('.orange-container .description', {\n    opacity: 0,\n    y: 50,\n    rotateX: -30\n  }, {\n    opacity: 1,\n    y: 0,\n    rotateX: 0,\n    duration: 1,\n    delay: 0.5,\n    ease: 'power3.out'\n  });\n  gsap.fromTo('.content-container', {\n    opacity: 0,\n    y: 150,\n    rotateX: 60\n  }, {\n    opacity: 1,\n    y: 0,\n    rotateX: 0,\n    duration: 1.5,\n    ease: 'power3.out'\n  });\n  gsap.fromTo('.content-description', {\n    opacity: 0,\n    y: 50,\n    rotateX: -20\n  }, {\n    opacity: 1,\n    y: 0,\n    rotateX: 0,\n    duration: 1,\n    delay: 0.5,\n    ease: 'power3.out'\n  });\n\n  // Parallax Effect\n  gsap.to('.parallax', {\n    y: '20%',\n    ease: 'none',\n    scrollTrigger: {\n      trigger: '.hero-section',\n      start: 'top top',\n      end: 'bottom top',\n      scrub: 0.5\n    }\n  });\n\n  // Parallax Section Animation\n  function revealImages() {\n    var images = document.querySelectorAll('.website-img, .logo-img');\n    var windowHeight = window.innerHeight;\n    images.forEach(function (image, index) {\n      var imageTop = image.getBoundingClientRect().top;\n      if (imageTop < windowHeight - 150) {\n        setTimeout(function () {\n          image.classList.add('visible');\n        }, index * 300);\n      }\n    });\n  }\n  window.addEventListener('scroll', function () {\n    return requestAnimationFrame(revealImages);\n  });\n  window.addEventListener('load', revealImages);\n  function parallaxBackground() {\n    var background = document.querySelector('.background');\n    var scrollPosition = window.pageYOffset;\n    background.style.transform = \"translateY(\".concat(scrollPosition * 0.9, \"px)\");\n  }\n  window.addEventListener('scroll', function () {\n    return requestAnimationFrame(parallaxBackground);\n  });\n  window.addEventListener('load', parallaxBackground);\n\n  // Feature Carousel Setup\n  var container = document.getElementById('featuresContainer');\n  var wrapper = document.getElementById('featuresWrapper');\n  var scrollIndicator = document.getElementById('scrollIndicator');\n  var cards = document.querySelectorAll('.feature-card');\n  var currentPage = 0;\n  var cardsPerPage = 3;\n  var totalPages = Math.ceil(cards.length / cardsPerPage);\n  var autoScrollInterval;\n  var isHovering = false;\n  var touchStartX = 0;\n  var touchEndX = 0;\n  function setupCarousel() {\n    if (window.innerWidth <= 1024 && window.innerWidth > 767) {\n      cardsPerPage = 2;\n      totalPages = Math.ceil(cards.length / cardsPerPage);\n    } else if (window.innerWidth <= 767) {\n      cardsPerPage = 1;\n      totalPages = cards.length;\n    } else {\n      cardsPerPage = 3;\n      totalPages = Math.ceil(cards.length / cardsPerPage);\n    }\n    scrollIndicator.innerHTML = '';\n    var _loop = function _loop(i) {\n      var dot = document.createElement('span');\n      dot.className = 'dot';\n      if (i === currentPage) dot.classList.add('active');\n      dot.addEventListener('click', function () {\n        return goToPage(i);\n      });\n      scrollIndicator.appendChild(dot);\n    };\n    for (var i = 0; i < totalPages; i++) {\n      _loop(i);\n    }\n    updateCarousel();\n  }\n  function goToPage(page) {\n    currentPage = page;\n    updateCarousel();\n  }\n  function updateCarousel() {\n    var translateX = -(currentPage * 100 / cardsPerPage);\n    wrapper.style.transform = \"translateX(\".concat(translateX, \"%)\");\n    document.querySelectorAll('.dot').forEach(function (dot, index) {\n      dot.classList.toggle('active', index === currentPage);\n    });\n  }\n  function nextPage() {\n    currentPage = currentPage >= totalPages - 1 ? 0 : currentPage + 1;\n    updateCarousel();\n  }\n  function prevPage() {\n    currentPage = currentPage <= 0 ? totalPages - 1 : currentPage - 1;\n    updateCarousel();\n  }\n  function startAutoScroll() {\n    clearInterval(autoScrollInterval);\n    if (!isHovering) {\n      autoScrollInterval = setInterval(nextPage, 4000);\n    }\n  }\n  container.addEventListener('mouseenter', function () {\n    isHovering = true;\n    clearInterval(autoScrollInterval);\n  });\n  container.addEventListener('mouseleave', function () {\n    isHovering = false;\n    startAutoScroll();\n  });\n  container.addEventListener('touchstart', function (e) {\n    touchStartX = e.changedTouches[0].screenX;\n    clearInterval(autoScrollInterval);\n  }, {\n    passive: true\n  });\n  container.addEventListener('touchend', function (e) {\n    touchEndX = e.changedTouches[0].screenX;\n    handleSwipe();\n    startAutoScroll();\n  }, {\n    passive: true\n  });\n  function handleSwipe() {\n    var difference = touchStartX - touchEndX;\n    if (difference > 50) nextPage();else if (difference < -50) prevPage();\n  }\n  window.addEventListener('resize', setupCarousel);\n  setupCarousel();\n  startAutoScroll();\n\n  // E-Commerce Card Reveal\n  function revealCards() {\n    var cards = document.querySelectorAll('.ecommerce-card');\n    var windowHeight = window.innerHeight;\n    cards.forEach(function (card, index) {\n      var cardTop = card.getBoundingClientRect().top;\n      if (cardTop < windowHeight - 100) {\n        setTimeout(function () {\n          return card.classList.add('reveal');\n        }, index * 150);\n      }\n    });\n  }\n  window.addEventListener('scroll', function () {\n    return requestAnimationFrame(revealCards);\n  });\n  window.addEventListener('load', revealCards);\n\n  // Mouse Hover Effect for Cards\n  document.querySelectorAll('.ecommerce-card').forEach(function (card) {\n    card.addEventListener('mousemove', function (e) {\n      var rect = card.getBoundingClientRect();\n      var x = e.clientX - rect.left;\n      var y = e.clientY - rect.top;\n      var centerX = rect.width / 2;\n      var centerY = rect.height / 2;\n      var rotateX = (y - centerY) / 25;\n      var rotateY = (centerX - x) / 25;\n      card.style.transform = \"perspective(1000px) rotateX(\".concat(rotateX, \"deg) rotateY(\").concat(rotateY, \"deg) scale(1.03) translateY(-10px)\");\n      card.style.boxShadow = \"0 12px 30px rgba(74, 144, 226, 0.2)\";\n    });\n    card.addEventListener('mouseleave', function () {\n      card.style.transform = 'translateY(0) scale(1)';\n      card.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';\n    });\n  });\n\n  // Navigation Logic\n  var icon = document.querySelector('.icon');\n  var navUl = document.querySelector('nav ul');\n  icon.addEventListener('click', function (e) {\n    e.stopPropagation();\n    navUl.classList.toggle('show');\n  });\n  document.addEventListener('click', function (e) {\n    if (!navUl.contains(e.target) && !icon.contains(e.target) && navUl.classList.contains('show')) {\n      navUl.classList.remove('show');\n      document.querySelectorAll('.drop-menu').forEach(function (dropdown) {\n        return dropdown.style.display = 'none';\n      });\n      document.querySelectorAll('.dropdown-arrow').forEach(function (arrow) {\n        return arrow.style.transform = 'rotate(0deg)';\n      });\n    }\n  });\n  var dropdownArrows = document.querySelectorAll('.dropdown-arrow');\n  dropdownArrows.forEach(function (arrow) {\n    arrow.parentElement.addEventListener('click', function (e) {\n      if (window.innerWidth <= 1160) {\n        e.preventDefault();\n        e.stopPropagation();\n        var dropdown = arrow.nextElementSibling;\n        var isVisible = dropdown.style.display === 'block';\n        dropdown.style.display = isVisible ? 'none' : 'block';\n        arrow.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';\n      }\n    });\n  });\n  document.addEventListener('click', function (e) {\n    if (window.innerWidth <= 1160) {\n      dropdownArrows.forEach(function (arrow) {\n        var dropdown = arrow.parentElement.nextElementSibling;\n        if (!arrow.parentElement.contains(e.target) && !dropdown.contains(e.target)) {\n          dropdown.style.display = 'none';\n          arrow.style.transform = 'rotate(0deg)';\n        }\n      });\n    }\n  });\n\n  // Footer Animation\n  gsap.fromTo('footer', {\n    opacity: 0,\n    y: 50\n  }, {\n    opacity: 1,\n    y: 0,\n    duration: 1,\n    ease: 'power4.out',\n    scrollTrigger: {\n      trigger: '.ecommerce-section',\n      start: 'bottom 80%',\n      toggleActions: 'play none none none'\n    }\n  });\n\n  // Tech Item Hover Animation\n  gsap.utils.toArray('.tech-item').forEach(function (item) {\n    item.addEventListener('mouseenter', function () {\n      gsap.to(item, {\n        x: 5,\n        duration: 0.3,\n        ease: 'power2.out'\n      });\n    });\n    item.addEventListener('mouseleave', function () {\n      gsap.to(item, {\n        x: 0,\n        duration: 0.3,\n        ease: 'power2.out'\n      });\n    });\n  });\n\n  // Tab Switching\n  window.switchTab = function (tabNumber) {\n    var tabs = document.querySelectorAll('.tab');\n    tabs.forEach(function (tab, index) {\n      if (index + 1 === tabNumber) {\n        tab.classList.add('active');\n        gsap.to(tab, {\n          z: 30,\n          rotateX: 0,\n          duration: 0.5,\n          ease: 'power2.out'\n        });\n      } else {\n        tab.classList.remove('active');\n        gsap.to(tab, {\n          z: 0,\n          rotateX: 10,\n          duration: 0.5,\n          ease: 'power2.out'\n        });\n      }\n    });\n  };\n});\n\n//# sourceURL=webpack://akiko-sherman-infotech-finalized-new-chnges/./src/pages/e-commerce/script.js?");

/***/ }),

/***/ "./src/pages/e-commerce/style.css":
/*!****************************************!*\
  !*** ./src/pages/e-commerce/style.css ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://akiko-sherman-infotech-finalized-new-chnges/./src/pages/e-commerce/style.css?");

/***/ }),

/***/ "./src/scripts/components.js":
/*!***********************************!*\
  !*** ./src/scripts/components.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initFooter: () => (/* binding */ initFooter),\n/* harmony export */   initNavigation: () => (/* binding */ initNavigation)\n/* harmony export */ });\n/* harmony import */ var _styles_components_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/components.css */ \"./src/styles/components.css\");\n\nfunction initNavigation() {\n  var navToggle = document.querySelector('.icon');\n  var navMenu = document.querySelector('nav ul');\n  var dropdownArrows = document.querySelectorAll('.dropdown-arrow');\n  if (navToggle && navMenu) {\n    navToggle.addEventListener('click', function (e) {\n      e.stopPropagation();\n      navMenu.classList.toggle('show');\n    });\n    document.addEventListener('click', function (e) {\n      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('show')) {\n        navMenu.classList.remove('show');\n        dropdownArrows.forEach(function (arrow) {\n          var dropdown = arrow.parentElement.nextElementSibling;\n          dropdown.style.display = 'none';\n          arrow.style.transform = 'rotate(0deg)';\n        });\n      }\n    });\n  }\n  dropdownArrows.forEach(function (arrow) {\n    var parentLink = arrow.parentElement;\n    var dropdown = parentLink.nextElementSibling;\n    parentLink.addEventListener('click', function (e) {\n      if (window.innerWidth <= 968) {\n        e.preventDefault();\n        e.stopPropagation();\n        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';\n        arrow.style.transform = dropdown.style.display === 'block' ? 'rotate(180deg)' : 'rotate(0deg)';\n      }\n    });\n    document.addEventListener('click', function (e) {\n      if (window.innerWidth <= 968 && !parentLink.contains(e.target) && !dropdown.contains(e.target)) {\n        dropdown.style.display = 'none';\n        arrow.style.transform = 'rotate(0deg)';\n      }\n    });\n  });\n}\nfunction initFooter() {\n  // Placeholder for shared footer interactivity (e.g., social link clicks)\n  console.log('Footer initialized - no animations here');\n  // Example: Add click tracking for social links if needed\n  // document.querySelectorAll('.social-icon').forEach(link => {\n  //     link.addEventListener('click', () => console.log('Social link clicked'));\n  // });\n}\nfunction includeHTML() {\n  document.querySelectorAll('[data-include]').forEach(function (element) {\n    var file = '/' + element.getAttribute('data-include') + '.html'; // Changed to root path\n    console.log('Fetching:', file);\n    fetch(file).then(function (response) {\n      if (!response.ok) throw new Error(\"HTTP error! status: \".concat(response.status));\n      return response.text();\n    }).then(function (html) {\n      element.innerHTML = html;\n      console.log(\"\".concat(element.getAttribute('data-include'), \" loaded\"));\n      if (element.getAttribute('data-include') === 'navigation') initNavigation();\n      if (element.getAttribute('data-include') === 'footer') initFooter();\n    })[\"catch\"](function (error) {\n      return console.error('Include failed:', error);\n    });\n  });\n}\ndocument.addEventListener('DOMContentLoaded', function () {\n  includeHTML(); // Load HTML first\n  var checkIncludes = setInterval(function () {\n    var navigation = document.querySelector('[data-include=\"navigation\"]');\n    var footer = document.querySelector('[data-include=\"footer\"]');\n    if (navigation && navigation.innerHTML && footer && footer.innerHTML) {\n      clearInterval(checkIncludes);\n      initNavigation();\n      initFooter();\n    }\n  }, 100);\n});\nif (false) {}\n\n//# sourceURL=webpack://akiko-sherman-infotech-finalized-new-chnges/./src/scripts/components.js?");

/***/ }),

/***/ "./src/scripts/utils.js":
/*!******************************!*\
  !*** ./src/scripts/utils.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   observeElements: () => (/* binding */ observeElements),\n/* harmony export */   throttle: () => (/* binding */ throttle)\n/* harmony export */ });\n// src/scripts/utils.js\nfunction throttle(func, delay) {\n  var lastCall = 0;\n  return function () {\n    var now = new Date().getTime();\n    if (now - lastCall < delay) return;\n    lastCall = now;\n    return func.apply(void 0, arguments);\n  };\n}\nfunction observeElements(selector, callback) {\n  var observer = new IntersectionObserver(function (entries) {\n    entries.forEach(function (entry) {\n      if (entry.isIntersecting) callback(entry.target);\n    });\n  }, {\n    threshold: 0.1\n  });\n  var elements = document.querySelectorAll(selector);\n  if (elements && elements.length > 0) {\n    elements.forEach(function (el) {\n      return observer.observe(el);\n    });\n  } else {\n    console.warn(\"No elements found for selector: \".concat(selector));\n    var singleElement = document.querySelector(selector);\n    if (singleElement) observer.observe(singleElement);\n  }\n  return observer;\n}\n\n//# sourceURL=webpack://akiko-sherman-infotech-finalized-new-chnges/./src/scripts/utils.js?");

/***/ }),

/***/ "./src/styles/components.css":
/*!***********************************!*\
  !*** ./src/styles/components.css ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://akiko-sherman-infotech-finalized-new-chnges/./src/styles/components.css?");

/***/ }),

/***/ "./src/styles/global.css":
/*!*******************************!*\
  !*** ./src/styles/global.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://akiko-sherman-infotech-finalized-new-chnges/./src/styles/global.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/pages/e-commerce/script.js");
/******/ 	
/******/ })()
;