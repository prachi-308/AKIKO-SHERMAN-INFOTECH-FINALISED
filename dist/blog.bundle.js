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

/***/ "./src/pages/blog/script.js":
/*!**********************************!*\
  !*** ./src/pages/blog/script.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/utils.js */ \"./src/scripts/utils.js\");\n/* harmony import */ var _scripts_components_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/components.js */ \"./src/scripts/components.js\");\n/* harmony import */ var _styles_global_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../styles/global.css */ \"./src/styles/global.css\");\n/* harmony import */ var _styles_components_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../styles/components.css */ \"./src/styles/components.css\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.css */ \"./src/pages/blog/style.css\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nvar gsap = window.gsap;\nvar ScrollTrigger = window.ScrollTrigger;\n\n\n\n\n\n\n// Carousel Functionality\nvar currentSlide = 0;\nvar autoScrollInterval = null;\nvar touchStartX = 0;\nvar touchEndX = 0;\nfunction goToSlide(index) {\n  var carousel = document.querySelector('.carousel');\n  var slides = document.querySelectorAll('.carousel-item');\n  if (index < 0 || index >= slides.length) return;\n  console.log(\"Navigating to slide \".concat(index));\n  currentSlide = index;\n  carousel.style.transform = \"translateX(-\".concat(currentSlide * 100, \"%)\");\n  updateControls();\n  resetAutoScroll();\n}\nfunction updateControls() {\n  var controls = document.querySelectorAll('.carousel-controls button');\n  controls.forEach(function (control, index) {\n    control.classList.toggle('active', index === currentSlide);\n  });\n}\nfunction nextSlide() {\n  var slides = document.querySelectorAll('.carousel-item');\n  goToSlide((currentSlide + 1) % slides.length);\n}\nfunction resetAutoScroll() {\n  if (autoScrollInterval) clearInterval(autoScrollInterval);\n  autoScrollInterval = setInterval(nextSlide, 5000);\n}\n\n// Category Filtering\nwindow.filterPosts = function (category) {\n  console.log(\"Filtering posts for category: \".concat(category));\n  var blogCards = document.querySelectorAll('.blog-card');\n  var categoryItems = document.querySelectorAll('.category-section ul li');\n  var categoryTitle = document.querySelector('.category-section h3');\n\n  // Normalize category for comparison\n  var normalizedCategory = category.toLowerCase();\n  var isAll = normalizedCategory === 'all';\n\n  // Update active states\n  categoryItems.forEach(function (item) {\n    var itemCategory = item.textContent.trim().toLowerCase();\n    item.classList.toggle('active-category', itemCategory === normalizedCategory);\n  });\n  categoryTitle.classList.toggle('active-category', isAll);\n\n  // Filter blog cards\n  blogCards.forEach(function (card) {\n    var cardCategory = card.getAttribute('data-category').toLowerCase();\n    var shouldShow = isAll || cardCategory === normalizedCategory;\n    card.style.display = shouldShow ? 'block' : 'none';\n  });\n};\nvar initializeGSAP = function initializeGSAP() {\n  var gsap = window.gsap;\n  var ScrollTrigger = window.ScrollTrigger;\n  if (!gsap || !ScrollTrigger) {\n    console.error('GSAP or ScrollTrigger not loaded.');\n    return;\n  }\n  gsap.registerPlugin(ScrollTrigger);\n  if (document.querySelector('footer')) {\n    gsap.fromTo('footer', {\n      opacity: 0,\n      y: 50\n    }, {\n      opacity: 1,\n      y: 0,\n      duration: 1,\n      ease: 'power4.out',\n      scrollTrigger: {\n        trigger: '.additional-blog-posts',\n        start: 'bottom 80%',\n        toggleActions: 'play none none none'\n      }\n    });\n  } else {\n    console.warn('Footer element not found for GSAP animation.');\n  }\n};\ndocument.addEventListener('DOMContentLoaded', function () {\n  // Image Optimizer\n  var ImageOptimizer = /*#__PURE__*/function () {\n    function ImageOptimizer() {\n      _classCallCheck(this, ImageOptimizer);\n      this.optimizeImages();\n    }\n    return _createClass(ImageOptimizer, [{\n      key: \"optimizeImages\",\n      value: function optimizeImages() {\n        document.querySelectorAll('img').forEach(function (img) {\n          if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');\n          if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');\n        });\n      }\n    }]);\n  }();\n  new ImageOptimizer();\n\n  // Scroll Animations\n  (0,_scripts_utils_js__WEBPACK_IMPORTED_MODULE_0__.observeElements)('.animate-on-scroll', function (el) {\n    el.classList.add('visible');\n    console.log('Element made visible:', el);\n  });\n\n  // Wait for footer to load before initializing GSAP\n  var footerDiv = document.querySelector('[data-include=\"/components/footer.html\"]');\n  if (footerDiv) {\n    footerDiv.addEventListener('include-loaded', initializeGSAP);\n  } else {\n    initializeGSAP();\n  }\n\n  // Initialize Carousel\n  var carousel = document.querySelector('.carousel');\n  var controls = document.querySelectorAll('.carousel-controls button');\n  controls.forEach(function (control, index) {\n    control.addEventListener('click', function () {\n      console.log(\"Clicked carousel dot \".concat(index));\n      goToSlide(index);\n    });\n  });\n  carousel.addEventListener('mouseenter', function () {\n    if (autoScrollInterval) clearInterval(autoScrollInterval);\n    console.log('Carousel auto-scroll paused');\n  });\n  carousel.addEventListener('mouseleave', function () {\n    resetAutoScroll();\n    console.log('Carousel auto-scroll resumed');\n  });\n  carousel.addEventListener('touchstart', function (e) {\n    e.preventDefault();\n    touchStartX = e.changedTouches[0].screenX;\n  }, {\n    passive: false\n  });\n  carousel.addEventListener('touchend', function (e) {\n    touchEndX = e.changedTouches[0].screenX;\n    var difference = touchStartX - touchEndX;\n    if (difference > 50) nextSlide();else if (difference < -50) goToSlide(currentSlide === 0 ? document.querySelectorAll('.carousel-item').length - 1 : currentSlide - 1);\n  }, {\n    passive: true\n  });\n  resetAutoScroll();\n\n  // Initialize with 'all' category\n  filterPosts('all');\n});\n\n//# sourceURL=webpack://akiko-sherman-infotech-finalized-new-chnges/./src/pages/blog/script.js?");

/***/ }),

/***/ "./src/pages/blog/style.css":
/*!**********************************!*\
  !*** ./src/pages/blog/style.css ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://akiko-sherman-infotech-finalized-new-chnges/./src/pages/blog/style.css?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/pages/blog/script.js");
/******/ 	
/******/ })()
;