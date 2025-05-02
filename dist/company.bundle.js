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

/***/ "./src/pages/company/script.js":
/*!*************************************!*\
  !*** ./src/pages/company/script.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/pages/company/style.css\");\n/* harmony import */ var _scripts_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/utils.js */ \"./src/scripts/utils.js\");\n/* harmony import */ var _scripts_components_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../scripts/components.js */ \"./src/scripts/components.js\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n\nvar gsap = window.gsap;\nvar ScrollTrigger = window.ScrollTrigger;\n\n\nvar ImageOptimizer = /*#__PURE__*/function () {\n  function ImageOptimizer() {\n    _classCallCheck(this, ImageOptimizer);\n    this.optimizeImages();\n  }\n  return _createClass(ImageOptimizer, [{\n    key: \"optimizeImages\",\n    value: function optimizeImages() {\n      document.querySelectorAll('img').forEach(function (img) {\n        if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');\n        if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');\n      });\n    }\n  }]);\n}();\nvar optimizeCarousel = function optimizeCarousel() {\n  var items = document.querySelectorAll('#carousel div');\n  var titles = document.querySelectorAll('#titles-descriptions .title-description');\n  var dots = document.querySelectorAll('.dot');\n  var currentIndex = 3;\n  var autoSlideInterval;\n  if (!items.length || !titles.length || !dots.length) {\n    console.warn('Carousel elements missing in DOM');\n    return;\n  }\n  var updateCarousel = function updateCarousel() {\n    requestAnimationFrame(function () {\n      items.forEach(function (item, index) {\n        item.className = '';\n        if (index === currentIndex) item.classList.add('selected');else if (index === (currentIndex - 1 + items.length) % items.length) item.classList.add('prev');else if (index === (currentIndex - 2 + items.length) % items.length) item.classList.add('prevLeftSecond');else if (index === (currentIndex + 1) % items.length) item.classList.add('next');else if (index === (currentIndex + 2) % items.length) item.classList.add('nextRightSecond');else if (index < (currentIndex - 2 + items.length) % items.length) item.classList.add('hideLeft');else item.classList.add('hideRight');\n      });\n      titles.forEach(function (title, index) {\n        title.classList.toggle('active', index === currentIndex % titles.length);\n        if (title.classList.contains('active')) checkScrollForElement(title);\n      });\n      dots.forEach(function (dot, index) {\n        return dot.classList.toggle('active', index === currentIndex % dots.length);\n      });\n      checkScrollForDots();\n    });\n  };\n  var checkScrollForElement = function checkScrollForElement(element) {\n    var windowHeight = window.innerHeight;\n    var rect = element.getBoundingClientRect();\n    if (rect.top <= windowHeight * 0.85 && rect.bottom >= 0) element.classList.add('visible');else element.classList.remove('visible');\n  };\n  var checkScrollForDots = function checkScrollForDots() {\n    var windowHeight = window.innerHeight;\n    var dotsContainer = document.querySelector('.dots-container');\n    if (!dotsContainer) {\n      console.warn('No .dots-container element found in the DOM');\n      return;\n    }\n    var rect = dotsContainer.getBoundingClientRect();\n    if (rect.top <= windowHeight * 0.85 && rect.bottom >= 0) {\n      dots.forEach(function (dot, index) {\n        return setTimeout(function () {\n          return dot.classList.add('visible');\n        }, index * 100);\n      });\n    } else {\n      dots.forEach(function (dot) {\n        return dot.classList.remove('visible');\n      });\n    }\n  };\n  var checkScroll = (0,_scripts_utils_js__WEBPACK_IMPORTED_MODULE_1__.throttle)(function () {\n    var activeTitle = document.querySelector('.title-description.active');\n    if (activeTitle) checkScrollForElement(activeTitle);\n    checkScrollForDots();\n  }, 100);\n  dots.forEach(function (dot) {\n    dot.addEventListener('click', function () {\n      currentIndex = parseInt(dot.getAttribute('data-index'));\n      updateCarousel();\n      resetAutoSlide();\n    });\n  });\n  var startAutoSlide = function startAutoSlide() {\n    autoSlideInterval = setInterval(function () {\n      currentIndex = (currentIndex + 1) % items.length;\n      updateCarousel();\n    }, 5000);\n  };\n  var resetAutoSlide = function resetAutoSlide() {\n    clearInterval(autoSlideInterval);\n    startAutoSlide();\n  };\n  window.addEventListener('scroll', checkScroll);\n  window.addEventListener('load', function () {\n    setTimeout(checkScroll, 100);\n    startAutoSlide();\n    updateCarousel();\n  });\n  updateCarousel();\n};\nvar optimizeClientsScroll = function optimizeClientsScroll() {\n  var clientsRow = document.querySelector('.clients-row');\n  if (!clientsRow) {\n    console.warn('No .clients-row element found in the DOM');\n    return;\n  }\n  var clients = document.querySelectorAll('.client');\n  clientsRow.innerHTML += clientsRow.innerHTML;\n  var scrollAnimations = document.querySelectorAll('.scroll-animation');\n  var checkScroll = (0,_scripts_utils_js__WEBPACK_IMPORTED_MODULE_1__.throttle)(function () {\n    scrollAnimations.forEach(function (element) {\n      var elementTop = element.getBoundingClientRect().top;\n      var elementBottom = element.getBoundingClientRect().bottom;\n      if (elementTop < window.innerHeight && elementBottom > 0) element.classList.add('animate');else element.classList.remove('animate');\n    });\n  }, 100);\n  window.addEventListener('scroll', checkScroll);\n  checkScroll();\n};\ndocument.addEventListener('DOMContentLoaded', function () {\n  if (!gsap || !ScrollTrigger) {\n    console.error('GSAP or ScrollTrigger not loaded. Check script order in HTML.');\n    return;\n  }\n  gsap.registerPlugin(ScrollTrigger);\n  new ImageOptimizer();\n  optimizeCarousel();\n  optimizeClientsScroll();\n  gsap.to('.parallax', {\n    y: '10%',\n    scale: 1.15,\n    ease: 'none',\n    scrollTrigger: {\n      trigger: '.hero-section',\n      start: 'top top',\n      end: 'bottom top',\n      scrub: true\n    }\n  });\n  gsap.fromTo('.orange-container', {\n    opacity: 0,\n    y: 100,\n    rotateX: -60,\n    scale: 0.95\n  }, {\n    opacity: 1,\n    y: 0,\n    rotateX: 0,\n    scale: 1,\n    duration: 1.5,\n    ease: 'power4.out'\n  });\n  gsap.fromTo('.orange-container .description', {\n    opacity: 0,\n    y: 50\n  }, {\n    opacity: 1,\n    y: 0,\n    duration: 1,\n    delay: 0.5,\n    ease: 'power4.out'\n  });\n  var statObserver = new IntersectionObserver(function (entries) {\n    entries.forEach(function (entry) {\n      if (entry.isIntersecting) {\n        entry.target.classList.add('visible');\n        statObserver.unobserve(entry.target);\n      }\n    });\n  }, {\n    threshold: 0.1\n  });\n  document.querySelectorAll('.stat').forEach(function (stat) {\n    return statObserver.observe(stat);\n  });\n  document.querySelectorAll('.count').forEach(function (count) {\n    gsap.fromTo(count, {\n      textContent: 0\n    }, {\n      textContent: count.getAttribute('data-target'),\n      duration: 2,\n      ease: 'power1.out',\n      snap: {\n        textContent: 1\n      },\n      scrollTrigger: {\n        trigger: count,\n        start: 'top 80%'\n      }\n    });\n  });\n  gsap.fromTo('.software-innovation .content', {\n    opacity: 0,\n    y: 100\n  }, {\n    opacity: 1,\n    y: 0,\n    duration: 1.2,\n    ease: 'power3.out',\n    scrollTrigger: {\n      trigger: '.software-innovation',\n      start: 'top 80%'\n    }\n  });\n  gsap.fromTo('.software-innovation .grid', {\n    opacity: 0,\n    x: 50\n  }, {\n    opacity: 1,\n    x: 0,\n    duration: 1.2,\n    ease: 'power3.out',\n    scrollTrigger: {\n      trigger: '.software-innovation',\n      start: 'top 80%'\n    }\n  });\n  gsap.to('.banner-parallax', {\n    y: '15%',\n    scale: 1.1,\n    ease: 'none',\n    scrollTrigger: {\n      trigger: '.banner',\n      start: 'top top',\n      end: 'bottom top',\n      scrub: true\n    }\n  });\n  gsap.fromTo('.banner-left', {\n    opacity: 0,\n    x: -100\n  }, {\n    opacity: 1,\n    x: 0,\n    duration: 1.2,\n    ease: 'power3.out',\n    scrollTrigger: {\n      trigger: '.banner',\n      start: 'top 80%'\n    }\n  });\n  gsap.fromTo('.banner-right', {\n    opacity: 0,\n    x: 100\n  }, {\n    opacity: 1,\n    x: 0,\n    duration: 1.2,\n    ease: 'power3.out',\n    scrollTrigger: {\n      trigger: '.banner',\n      start: 'top 80%'\n    }\n  });\n  gsap.fromTo('.solution-item', {\n    opacity: 0,\n    y: 50\n  }, {\n    opacity: 1,\n    y: 0,\n    duration: 1,\n    stagger: 0.2,\n    ease: 'power3.out',\n    scrollTrigger: {\n      trigger: '.solutions',\n      start: 'top 80%'\n    }\n  });\n  gsap.fromTo('.mission-vision-values .card', {\n    opacity: 0,\n    y: 50,\n    scale: 0.95\n  }, {\n    opacity: 1,\n    y: 0,\n    scale: 1,\n    duration: 1,\n    stagger: 0.3,\n    ease: 'elastic.out(1, 0.7)',\n    scrollTrigger: {\n      trigger: '.mission-vision-values',\n      start: 'top 80%',\n      toggleActions: 'play none none reverse'\n    }\n  });\n\n  // Add footer animation with check\n  var checkFooter = setInterval(function () {\n    var footer = document.querySelector('footer');\n    if (footer) {\n      clearInterval(checkFooter);\n      console.log('Footer found, applying animation');\n      gsap.fromTo('footer', {\n        opacity: 0,\n        y: 50\n      }, {\n        opacity: 1,\n        y: 0,\n        duration: 1,\n        ease: 'power4.out',\n        scrollTrigger: {\n          trigger: '.sec-8',\n          start: 'bottom 80%',\n          toggleActions: 'play none none none'\n        }\n      });\n    }\n  }, 300); // Increased interval for reliability\n});\n\n//# sourceURL=webpack://akiko-sherman-infotech-finalized-new-chnges/./src/pages/company/script.js?");

/***/ }),

/***/ "./src/pages/company/style.css":
/*!*************************************!*\
  !*** ./src/pages/company/style.css ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://akiko-sherman-infotech-finalized-new-chnges/./src/pages/company/style.css?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/pages/company/script.js");
/******/ 	
/******/ })()
;