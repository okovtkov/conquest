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

eval("\r\n\r\nlet gallery = document.querySelector('.gallery');\r\nlet largeImage = document.querySelector('.gallery__main-img');\r\nlet ul = document.querySelector('.gallery__preview');\r\nlet current = 0;\r\nlet prev = document.querySelector('.gallery__button_prev');\r\nlet next = document.querySelector('.gallery__button_next');\r\n\r\nArray.from(ul.children).forEach((li, index) => {\r\n    li.addEventListener('click', () => selectImage(index));\r\n});\r\n\r\nprev.addEventListener('click', () => selectImage(current - 1));\r\nnext.addEventListener('click', () => selectImage(current + 1));\r\n\r\nfunction selectImage(index) {\r\n    let active = ul.children[current];\r\n    if (active) active.classList.remove('gallery__item_active');\r\n    if (index < 0) index = ul.children.length - 1;\r\n    if (index > ul.children.length - 1) index = 0;\r\n\r\n    let li = ul.children[index];\r\n    li.classList.add('gallery__item_active');\r\n    let img = li.querySelector('.gallery__image');\r\n    largeImage.src = img.src;\r\n    current = index;\r\n}\r\n\r\n// function slider(num) {\r\n//     let index;\r\n//     ul.forEach((li, index) => {\r\n//         let radio = li.querySelector('.gallery__radio:checked');\r\n//         if (radio) {\r\n//             index = parseFloat(radio.id);\r\n//             alert(index);\r\n//         }\r\n//     });\r\n// }\n\n//# sourceURL=webpack:///./components/gallery/gallery.js?");

/***/ }),

/***/ "./components/navigation/navigation.js":
/*!*********************************************!*\
  !*** ./components/navigation/navigation.js ***!
  \*********************************************/
/***/ (() => {

eval("\r\n\r\nlet button = document.querySelector('.navigation__menu');\r\nlet navigation = document.querySelector('.navigation');\r\n\r\nbutton.addEventListener('click', () => {\r\n    navigation.classList.toggle('navigation_active');\r\n    document.body.style.overflow = navigation.classList.contains('navigation_active') ? 'hidden' : '';\r\n});\n\n//# sourceURL=webpack:///./components/navigation/navigation.js?");

/***/ }),

/***/ "./components/slider/slider.js":
/*!*************************************!*\
  !*** ./components/slider/slider.js ***!
  \*************************************/
/***/ (() => {

eval("\r\n\r\nlet prev = document.querySelector('.slider__button_prev');\r\nlet next = document.querySelector('.slider__button_next');\r\nlet slider = document.querySelector('.slider');\r\nlet items = Array.from(document.querySelectorAll('.slider__item'));\r\nlet current = 0;\r\nlet styles = getComputedStyle(document.querySelector('.slider__item'));\r\nlet width = parseFloat(styles.width) + parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);\r\n\r\nslider.addEventListener('click', (event) => {\r\n    if (event.target.closest('.slider__button_prev') === prev) scroll(-1);\r\n    if (event.target.closest('.slider__button_next') === next) scroll(1);\r\n});\r\n\r\nfunction scroll(n) {\r\n    let visibleCards = Math.floor(slider.clientWidth / items[0].clientWidth);\r\n    current += n;\r\n    if (current < 0) current = items.length - visibleCards;\r\n    if (current > items.length - visibleCards) current = 0;\r\n    let container = document.querySelector('.slider__container');\r\n    container.style.left = -(current * width) + 'px';\r\n}\n\n//# sourceURL=webpack:///./components/slider/slider.js?");

/***/ }),

/***/ "./javascript/main.js":
/*!****************************!*\
  !*** ./javascript/main.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_navigation_navigation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/navigation/navigation.js */ \"./components/navigation/navigation.js\");\n/* harmony import */ var _components_navigation_navigation_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_navigation_navigation_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_gallery_gallery_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/gallery/gallery.js */ \"./components/gallery/gallery.js\");\n/* harmony import */ var _components_gallery_gallery_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_gallery_gallery_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_slider_slider_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/slider/slider.js */ \"./components/slider/slider.js\");\n/* harmony import */ var _components_slider_slider_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_components_slider_slider_js__WEBPACK_IMPORTED_MODULE_2__);\n\r\n\r\n\n\n//# sourceURL=webpack:///./javascript/main.js?");

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