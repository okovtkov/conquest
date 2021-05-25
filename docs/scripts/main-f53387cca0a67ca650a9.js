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

/***/ "./components/gallery/gallery.js":
/*!***************************************!*\
  !*** ./components/gallery/gallery.js ***!
  \***************************************/
/***/ (() => {

eval("\r\n\r\nfunction galleryFunction() {\r\n    let largeImage = document.querySelector('.gallery__main-img');\r\n    let ul = document.querySelector('.gallery__preview');\r\n    let current = 1;\r\n    let prev = document.querySelector('.gallery__button_prev');\r\n    let next = document.querySelector('.gallery__button_next');\r\n\r\n    // slice (1) потому что по первой картинке не должен срабатывать клик\r\n    Array.from(ul.children).slice(1).forEach((li, index) => {\r\n        // index + 1 - потому что был slice(1)\r\n        li.addEventListener('click', () => selectImage(index + 1));\r\n    });\r\n\r\n    prev.addEventListener('click', () => selectImage(current - 1));\r\n    next.addEventListener('click', () => selectImage(current + 1));\r\n\r\n    function selectImage(index) {\r\n        let active = ul.children[current];\r\n        if (active) active.classList.remove('gallery__item_active');\r\n        if (index < 1) index = ul.children.length - 1;\r\n        if (index > ul.children.length - 1) index = 1;\r\n\r\n        let li = ul.children[index];\r\n        li.classList.add('gallery__item_active');\r\n        let img = li.querySelector('.gallery__image');\r\n        largeImage.src = img.src;\r\n        current = index;\r\n    }\r\n}\r\n\r\nlet gallery = document.querySelector('.gallery');\r\nif (gallery) galleryFunction();\n\n//# sourceURL=webpack:///./components/gallery/gallery.js?");

/***/ }),

/***/ "./components/navigation/navigation.js":
/*!*********************************************!*\
  !*** ./components/navigation/navigation.js ***!
  \*********************************************/
/***/ (() => {

eval("\r\n\r\nlet button = document.querySelector('.navigation__menu');\r\nlet navigation = document.querySelector('.navigation');\r\n\r\nbutton.addEventListener('click', () => {\r\n    navigation.classList.toggle('navigation_active');\r\n    document.body.style.overflow = navigation.classList.contains('navigation_active') ? 'hidden' : '';\r\n});\n\n//# sourceURL=webpack:///./components/navigation/navigation.js?");

/***/ }),

/***/ "./components/range/range.js":
/*!***********************************!*\
  !*** ./components/range/range.js ***!
  \***********************************/
/***/ (() => {

eval("\r\n\r\nclass Ball {\r\n    constructor(ball, strip) {\r\n        this.element = ball;\r\n        /** @type {HTMLElement} */\r\n        this.strip = strip;\r\n\r\n        this.element.addEventListener('mousedown', () => this.start());\r\n    }\r\n\r\n    start() {\r\n        let moveHandler = (event) => this.move(event);\r\n        document.addEventListener('mousemove', moveHandler);\r\n        document.addEventListener('mouseup', function mouseUp() {\r\n            document.removeEventListener('mouseup', mouseUp);\r\n            document.removeEventListener('mousemove', moveHandler);\r\n        });\r\n    }\r\n\r\n    move(event) {\r\n        let x = event.clientX - this.strip.getBoundingClientRect().left;\r\n        if (x < 0) x = 0;\r\n        if (x > this.strip.clientWidth) x = this.strip.clientWidth;\r\n\r\n        this.element.dispatchEvent(new CustomEvent('want-move', {\r\n            detail: {x}\r\n        }));\r\n    }\r\n}\r\n\r\nclass Range {\r\n    constructor(range) {\r\n        this.element = range;\r\n        this.maxPrice = Number(this.element.dataset.max);\r\n        this.minPrice = Number(this.element.dataset.min);\r\n        this.strip = this.element.querySelector('.range__strip');\r\n        this.minBall = new Ball(this.element.querySelector('.range__ball_min'), this.strip);\r\n        this.maxBall = new Ball(this.element.querySelector('.range__ball_max'), this.strip);\r\n\r\n        this.disableInputs();\r\n        this.minMove(this.minPrice);\r\n        this.maxMove(this.maxPrice);\r\n\r\n        this.minBall.element.addEventListener('input', (e) => this.minMove(e.target.value));\r\n        this.maxBall.element.addEventListener('input', (e) => this.maxMove(e.target.value));\r\n        this.minBall.element.addEventListener('want-move', (event) => {\r\n            let price = this.coordToPrice(event);\r\n            this.minMove(price);\r\n        });\r\n        this.maxBall.element.addEventListener('want-move', (event) => {\r\n            let price = this.coordToPrice(event);\r\n            this.maxMove(price);\r\n        });\r\n    }\r\n\r\n    minMove(value) {\r\n        let minInput = this.element.querySelector('.range__price_min');\r\n        let maxInput = this.element.querySelector('.range__price_max');\r\n        let price = Math.min(Number(value), Number(maxInput.value));\r\n        this.minBall.element.style.left = price / this.maxPrice * 100 + '%';\r\n        maxInput.min = price;\r\n        minInput.value = price;\r\n    }\r\n\r\n    maxMove(value) {\r\n        let minInput = this.element.querySelector('.range__price_min');\r\n        let maxInput = this.element.querySelector('.range__price_max');\r\n        let price = Math.max(Number(minInput.value), Number(value));\r\n        this.maxBall.element.style.left = price / this.maxPrice * 100 + '%';\r\n        minInput.max = price;\r\n        maxInput.value = price;\r\n    }\r\n\r\n    coordToPrice(event) {\r\n        let x = event.detail.x;\r\n        let percent = 100 / this.strip.clientWidth * x;\r\n        let price = this.maxPrice / 100 * percent;\r\n        return price.toFixed(0);\r\n    }\r\n\r\n    disableInputs() {\r\n        let minInput = this.element.querySelector('.range__price_min');\r\n        let maxInput = this.element.querySelector('.range__price_max');\r\n        minInput.disabled = true;\r\n        maxInput.disabled = true;\r\n    }\r\n}\r\n\r\nlet ranges = Array.from(document.querySelectorAll('.range'));\r\nranges.forEach(range => new Range(range));\n\n//# sourceURL=webpack:///./components/range/range.js?");

/***/ }),

/***/ "./components/slider/slider.js":
/*!*************************************!*\
  !*** ./components/slider/slider.js ***!
  \*************************************/
/***/ (() => {

eval("\r\n\r\nfunction sliderFunction() {\r\n    let prev = document.querySelector('.slider__button_prev');\r\n    let next = document.querySelector('.slider__button_next');\r\n    let slider = document.querySelector('.slider');\r\n    let items = Array.from(document.querySelectorAll('.slider__item'));\r\n    let current = 0;\r\n    let styles = getComputedStyle(document.querySelector('.slider__item'));\r\n    let width = parseFloat(styles.width) + parseFloat(styles.marginRight);\r\n\r\n    slider.addEventListener('click', (event) => {\r\n        if (event.target.closest('.slider__button_prev') === prev) scroll(-1);\r\n        if (event.target.closest('.slider__button_next') === next) scroll(1);\r\n    });\r\n\r\n    function scroll(n) {\r\n        let visibleCards = Math.floor(slider.clientWidth / items[0].clientWidth);\r\n        current += n;\r\n        if (current < 0) current = items.length - visibleCards;\r\n        if (current > items.length - visibleCards) current = 0;\r\n        let item = document.querySelector('.slider__item');\r\n        item.style.marginLeft = -(current * width) + 'px';\r\n    }\r\n}\r\n\r\nlet slider = document.querySelector('.slider');\r\nif (slider) sliderFunction();\n\n//# sourceURL=webpack:///./components/slider/slider.js?");

/***/ }),

/***/ "./components/watch-info/watch-info.js":
/*!*********************************************!*\
  !*** ./components/watch-info/watch-info.js ***!
  \*********************************************/
/***/ (() => {

eval("\r\n\r\nlet links = Array.from(document.querySelectorAll('.watch-info__about a'));\r\nlinks.forEach(link => {\r\n    link.addEventListener('click', (event) => enable(link, event));\r\n});\r\n\r\nfunction enable(link, event) {\r\n    if (event) event.preventDefault();\r\n    let active = document.querySelector('.watch-info__content_active');\r\n    if (active) active.classList.remove('watch-info__content_active');\r\n    let activeLink = document.querySelector('.watch-info__link_active');\r\n    if (activeLink) activeLink.classList.remove('watch-info__link_active');\r\n\r\n    let id = link.getAttribute('href').slice(1);\r\n    let target = document.getElementById(id);\r\n    target.classList.add('watch-info__content_active');\r\n    link.classList.add('watch-info__link_active');\r\n}\n\n//# sourceURL=webpack:///./components/watch-info/watch-info.js?");

/***/ }),

/***/ "./javascript/main.js":
/*!****************************!*\
  !*** ./javascript/main.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_navigation_navigation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/navigation/navigation.js */ \"./components/navigation/navigation.js\");\n/* harmony import */ var _components_navigation_navigation_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_navigation_navigation_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_gallery_gallery_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/gallery/gallery.js */ \"./components/gallery/gallery.js\");\n/* harmony import */ var _components_gallery_gallery_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_gallery_gallery_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_slider_slider_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/slider/slider.js */ \"./components/slider/slider.js\");\n/* harmony import */ var _components_slider_slider_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_components_slider_slider_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_watch_info_watch_info_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/watch-info/watch-info.js */ \"./components/watch-info/watch-info.js\");\n/* harmony import */ var _components_watch_info_watch_info_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_components_watch_info_watch_info_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _components_range_range_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/range/range.js */ \"./components/range/range.js\");\n/* harmony import */ var _components_range_range_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_components_range_range_js__WEBPACK_IMPORTED_MODULE_4__);\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./javascript/main.js?");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./javascript/main.js");
/******/ 	
/******/ })()
;