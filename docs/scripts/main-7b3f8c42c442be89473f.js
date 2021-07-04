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

/***/ "./components/filter/filter.js":
/*!*************************************!*\
  !*** ./components/filter/filter.js ***!
  \*************************************/
/***/ (() => {

eval("\n\nlet button = document.querySelector('.filter__button');\nlet filter = document.querySelector('.filter__form');\n\nif (button) {\n    button.addEventListener('click', () => {\n        filter.classList.toggle('filter__form_active');\n    });\n}\n\n//# sourceURL=webpack:///./components/filter/filter.js?");

/***/ }),

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

/***/ "./components/product-list/product-list.js":
/*!*************************************************!*\
  !*** ./components/product-list/product-list.js ***!
  \*************************************************/
/***/ (() => {

eval("\r\n\r\nclass ProductList {\r\n    constructor(element) {\r\n        this.element = element;\r\n        this.container = element.querySelector('.product-list__container');\r\n        this.isOpen = false;\r\n        let toggler = element.querySelector('.product-list__button');\r\n\r\n        toggler.addEventListener('click', () => {\r\n            if (this.isOpen) this.close();\r\n            else this.open();\r\n        });\r\n        document.addEventListener('add-product', (event) => this.add(event.detail));\r\n        document.addEventListener('delete-product', (event) => this.delete(event.detail));\r\n    }\r\n\r\n    open() {\r\n        if (this.isOpen) return;\r\n        let that = this;\r\n        this.container.classList.add('product-list__container_active');\r\n        this.isOpen = true;\r\n\r\n        document.addEventListener('click', function listener(event) {\r\n            if (that.containsElement(event.target)) return;\r\n            that.close();\r\n            document.removeEventListener('click', listener);\r\n        }, true);\r\n    }\r\n\r\n    close() {\r\n        this.container.classList.remove('product-list__container_active');\r\n        this.isOpen = false;\r\n    }\r\n\r\n    add(product) {\r\n        let ul = this.element.querySelector('.product-list__list');\r\n\r\n        let li = document.createElement('li');\r\n        li.classList.add('product-list__item');\r\n        li.dataset.id = product.id;\r\n        li.innerHTML = `\r\n            <img src=\"${product.image}\" class=\"product-list__image\" alt=\"картинка с заказом\">\r\n            <div class=\"product-list__text\">\r\n                <span class=\"product-list__name\">${product.name}</span>\r\n                <span class=\"product-list__price\">${product.price}</span>\r\n            </div>\r\n            <button class=\"product-list__close\"></button>\r\n        `;\r\n\r\n        ul.append(li);\r\n        let close = li.querySelector('.product-list__close');\r\n        close.addEventListener('click', () => this.delete(product));\r\n        this.sum(product.price);\r\n    }\r\n\r\n    delete(product) {\r\n        let li = this.element.querySelector(`.product-list__item[data-id=\"${product.id}\"]`);\r\n        let price = parseFloat(li.querySelector('.product-list__price').textContent);\r\n        this.sum(-price);\r\n        li.remove();\r\n\r\n        let event = new CustomEvent('deleted-product', { detail: product });\r\n        document.dispatchEvent(event);\r\n    }\r\n\r\n    sum(price) {\r\n        let sum = this.element.querySelector('.product-list__sum');\r\n        let currentSum = parseFloat(sum.textContent);\r\n        currentSum += price;\r\n        sum.textContent = `${currentSum} ₽`;\r\n    }\r\n\r\n    containsElement(target) {\r\n        if (target === this.element) return true;\r\n        if (target === null) return false;\r\n        return this.containsElement(target.parentElement);\r\n    }\r\n}\r\n\r\nlet productLists = Array.from(document.querySelectorAll('.product-list'));\r\nproductLists.forEach(product => new ProductList(product));\n\n//# sourceURL=webpack:///./components/product-list/product-list.js?");

/***/ }),

/***/ "./components/range/range.js":
/*!***********************************!*\
  !*** ./components/range/range.js ***!
  \***********************************/
/***/ (() => {

eval("\r\n\r\nclass Ball {\r\n    constructor(ball, strip) {\r\n        this.element = ball;\r\n        /** @type {HTMLElement} */\r\n        this.strip = strip;\r\n\r\n        this.element.addEventListener('mousedown', () => this.start());\r\n        this.element.addEventListener('touchstart', () => this.start());\r\n    }\r\n\r\n    start() {\r\n        let moveHandler = (event) => this.move(event);\r\n        let stopHandler = (event) => {\r\n            console.log(event.type);\r\n            document.removeEventListener('mouseup', stopHandler);\r\n            document.removeEventListener('touchend', stopHandler);\r\n            document.removeEventListener('mousemove', moveHandler);\r\n            document.removeEventListener('touchmove', moveHandler);\r\n        };\r\n\r\n        document.addEventListener('mousemove', moveHandler);\r\n        document.addEventListener('mouseup', stopHandler);\r\n        document.addEventListener('touchmove', moveHandler);\r\n        document.addEventListener('touchend', stopHandler);\r\n    }\r\n\r\n    move(event) {\r\n        let clientX = event.clientX || event.touches[0].clientX;\r\n        let x = clientX - this.strip.getBoundingClientRect().left;\r\n        if (x < 0) x = 0;\r\n        if (x > this.strip.clientWidth) x = this.strip.clientWidth;\r\n\r\n        this.element.dispatchEvent(new CustomEvent('want-move', {\r\n            detail: {x}\r\n        }));\r\n    }\r\n}\r\n\r\nclass Range {\r\n    constructor(range) {\r\n        this.element = range;\r\n        this.maxPrice = Number(this.element.dataset.max);\r\n        this.minPrice = Number(this.element.dataset.min);\r\n        this.strip = this.element.querySelector('.range__strip');\r\n        this.minBall = new Ball(this.element.querySelector('.range__ball_min'), this.strip);\r\n        this.maxBall = new Ball(this.element.querySelector('.range__ball_max'), this.strip);\r\n        this.minInput = this.element.querySelector('.range__price_min');\r\n        this.maxInput = this.element.querySelector('.range__price_max');\r\n\r\n        this.disableInputs();\r\n        this.addClearListener();\r\n        this.minMove(this.minPrice);\r\n        this.maxMove(this.maxPrice);\r\n\r\n        this.minBall.element.addEventListener('input', (e) => this.minMove(e.target.value));\r\n        this.maxBall.element.addEventListener('input', (e) => this.maxMove(e.target.value));\r\n        this.minBall.element.addEventListener('want-move', (event) => {\r\n            let price = this.coordToPrice(event);\r\n            this.minMove(price);\r\n        });\r\n        this.maxBall.element.addEventListener('want-move', (event) => {\r\n            let price = this.coordToPrice(event);\r\n            this.maxMove(price);\r\n        });\r\n    }\r\n\r\n    minMove(value) {\r\n        let price = Math.min(Number(value), Number(this.maxInput.value));\r\n        this.minBall.element.style.left = price / this.maxPrice * 100 + '%';\r\n        this.maxInput.min = price;\r\n        this.minInput.value = price;\r\n        this.smallRange();\r\n    }\r\n\r\n    maxMove(value) {\r\n        let price = Math.max(Number(this.minInput.value), Number(value));\r\n        this.maxBall.element.style.left = price / this.maxPrice * 100 + '%';\r\n        this.minInput.max = price;\r\n        this.maxInput.value = price;\r\n        this.smallRange();\r\n    }\r\n\r\n    coordToPrice(event) {\r\n        let x = event.detail.x;\r\n        let percent = 100 / this.strip.clientWidth * x;\r\n        let price = this.maxPrice / 100 * percent;\r\n        return price.toFixed(0);\r\n    }\r\n\r\n    disableInputs() {\r\n        this.minInput.disabled = true;\r\n        this.maxInput.disabled = true;\r\n    }\r\n\r\n    smallRange() {\r\n        let diff = this.maxInput.value - this.minInput.value;\r\n        this.maxInput.classList.toggle('range__price_top', diff < 45000);\r\n    }\r\n\r\n    addClearListener() {\r\n        let form = this.element.closest('form');\r\n        if (!form) return;\r\n        form.addEventListener('reset', () => {\r\n            this.minMove(this.minPrice);\r\n            this.maxMove(this.maxPrice);\r\n        });\r\n    }\r\n}\r\n\r\nlet ranges = Array.from(document.querySelectorAll('.range'));\r\nranges.forEach(range => new Range(range));\n\n//# sourceURL=webpack:///./components/range/range.js?");

/***/ }),

/***/ "./components/select/select.js":
/*!*************************************!*\
  !*** ./components/select/select.js ***!
  \*************************************/
/***/ (() => {

eval("\r\n\r\nlet select = document.querySelector('.select');\r\nlet active = document.querySelector('.select__option_active');\r\nlet options = document.querySelector('.select__options');\r\n\r\nif (select) {\r\n    select.addEventListener('click', () => {\r\n        options.classList.toggle('select__options_active');\r\n    });\r\n}\r\n\r\nif (options) {\r\n    options.addEventListener('click', (event) => {\r\n        active.textContent = event.target.textContent;\r\n    });\r\n}\n\n//# sourceURL=webpack:///./components/select/select.js?");

/***/ }),

/***/ "./components/slider/slider.js":
/*!*************************************!*\
  !*** ./components/slider/slider.js ***!
  \*************************************/
/***/ (() => {

eval("\r\n\r\nfunction sliderFunction() {\r\n    let prev = document.querySelector('.slider__button_prev');\r\n    let next = document.querySelector('.slider__button_next');\r\n    let slider = document.querySelector('.slider');\r\n    let items = Array.from(document.querySelectorAll('.slider__item'));\r\n    let current = 0;\r\n    let styles = getComputedStyle(document.querySelector('.slider__item'));\r\n    let width = parseFloat(styles.width) + parseFloat(styles.marginRight);\r\n\r\n    slider.addEventListener('click', (event) => {\r\n        if (event.target.closest('.slider__button_prev') === prev) scroll(-1);\r\n        if (event.target.closest('.slider__button_next') === next) scroll(1);\r\n    });\r\n\r\n    function scroll(n) {\r\n        let visibleCards = Math.floor(slider.clientWidth / items[0].clientWidth);\r\n        current += n;\r\n        if (current < 0) current = items.length - visibleCards;\r\n        if (current > items.length - visibleCards) current = 0;\r\n        let item = document.querySelector('.slider__item');\r\n        item.style.marginLeft = -(current * width) + 'px';\r\n    }\r\n}\r\n\r\nlet slider = document.querySelector('.slider');\r\nif (slider) sliderFunction();\n\n//# sourceURL=webpack:///./components/slider/slider.js?");

/***/ }),

/***/ "./components/watch-card/watch-card.js":
/*!*********************************************!*\
  !*** ./components/watch-card/watch-card.js ***!
  \*********************************************/
/***/ (() => {

eval("\r\n\r\nclass WatchCard {\r\n    constructor(card) {\r\n        this.card = card;\r\n        this.basket = this.card.querySelector('.watch-card__basket');\r\n        this.name = this.card.querySelector('.watch-card__name').textContent.toUpperCase();\r\n        this.price = parseFloat(this.card.querySelector('.watch-card__price').textContent);\r\n        this.image = this.card.querySelector('.watch-card__image').src;\r\n        this.id = this.card.dataset.id;\r\n\r\n        this.basket.addEventListener('click', () => {\r\n            if (this.card.classList.contains('watch-card_added')) {\r\n                this.remove();\r\n            } else {\r\n                this.add();\r\n            }\r\n        });\r\n\r\n        document.addEventListener('deleted-product', (event) => {\r\n            if (event.detail.id !== this.id) return;\r\n            this.card.classList.remove('watch-card_added');\r\n        });\r\n    }\r\n\r\n    get product() {\r\n        return {\r\n            name: this.name,\r\n            price: this.price,\r\n            image: this.image,\r\n            id: this.id,\r\n        };\r\n    }\r\n\r\n    add() {\r\n        this.card.classList.add('watch-card_added');\r\n        let eventAdd = new CustomEvent('add-product', {\r\n            detail: this.product,\r\n        });\r\n        document.dispatchEvent(eventAdd);\r\n    }\r\n\r\n    remove() {\r\n        this.card.classList.remove('watch-card_added');\r\n        let eventDelete = new CustomEvent('delete-product', {\r\n            detail: this.product,\r\n        });\r\n        document.dispatchEvent(eventDelete);\r\n    }\r\n}\r\n\r\nlet cards = Array.from(document.querySelectorAll('.watch-card'));\r\ncards.forEach(card => new WatchCard(card));\n\n//# sourceURL=webpack:///./components/watch-card/watch-card.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_navigation_navigation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/navigation/navigation.js */ \"./components/navigation/navigation.js\");\n/* harmony import */ var _components_navigation_navigation_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_navigation_navigation_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_gallery_gallery_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/gallery/gallery.js */ \"./components/gallery/gallery.js\");\n/* harmony import */ var _components_gallery_gallery_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_gallery_gallery_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_slider_slider_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/slider/slider.js */ \"./components/slider/slider.js\");\n/* harmony import */ var _components_slider_slider_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_components_slider_slider_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_watch_info_watch_info_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/watch-info/watch-info.js */ \"./components/watch-info/watch-info.js\");\n/* harmony import */ var _components_watch_info_watch_info_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_components_watch_info_watch_info_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _components_range_range_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/range/range.js */ \"./components/range/range.js\");\n/* harmony import */ var _components_range_range_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_components_range_range_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _components_filter_filter_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/filter/filter.js */ \"./components/filter/filter.js\");\n/* harmony import */ var _components_filter_filter_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_components_filter_filter_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _components_select_select_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/select/select.js */ \"./components/select/select.js\");\n/* harmony import */ var _components_select_select_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_components_select_select_js__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _components_watch_card_watch_card_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/watch-card/watch-card.js */ \"./components/watch-card/watch-card.js\");\n/* harmony import */ var _components_watch_card_watch_card_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_components_watch_card_watch_card_js__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _components_product_list_product_list_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/product-list/product-list.js */ \"./components/product-list/product-list.js\");\n/* harmony import */ var _components_product_list_product_list_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_components_product_list_product_list_js__WEBPACK_IMPORTED_MODULE_8__);\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./javascript/main.js?");

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