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

eval("\n\nfunction galleryFunction() {\n    let largeImage = document.querySelector('.gallery__main-img');\n    let ul = document.querySelector('.gallery__preview');\n    let current = 1;\n    let prev = document.querySelector('.gallery__button_prev');\n    let next = document.querySelector('.gallery__button_next');\n\n    // slice (1) потому что по первой картинке не должен срабатывать клик\n    Array.from(ul.children).slice(1).forEach((li, index) => {\n        // index + 1 - потому что был slice(1)\n        li.addEventListener('click', () => selectImage(index + 1));\n    });\n\n    prev.addEventListener('click', () => selectImage(current - 1));\n    next.addEventListener('click', () => selectImage(current + 1));\n\n    function selectImage(index) {\n        let active = ul.children[current];\n        if (active) active.classList.remove('gallery__item_active');\n        if (index < 1) index = ul.children.length - 1;\n        if (index > ul.children.length - 1) index = 1;\n\n        let li = ul.children[index];\n        li.classList.add('gallery__item_active');\n        let img = li.querySelector('.gallery__image');\n        largeImage.src = img.src;\n        current = index;\n    }\n}\n\nlet gallery = document.querySelector('.gallery');\nif (gallery) galleryFunction();\n\n//# sourceURL=webpack:///./components/gallery/gallery.js?");

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

eval("\n\nclass ProductList {\n    constructor(element) {\n        this.element = element;\n        this.container = element.querySelector('.product-list__container');\n        this.isOpen = false;\n        this.name = element.dataset.name;\n        this.products = this.loadFromLocalStorage();\n\n        let toggler = element.querySelector('.product-list__button');\n\n        toggler.addEventListener('click', () => {\n            if (this.isOpen) this.close();\n            else this.open();\n        });\n        document.addEventListener(`add-${this.name}-product`, (event) => this.add(event.detail));\n        document.addEventListener(`delete-${this.name}-product`, (event) => this.delete(event.detail));\n    }\n\n    open() {\n        if (this.isOpen) return;\n        let that = this;\n        this.container.classList.add('product-list__container_active');\n        this.isOpen = true;\n\n        document.addEventListener('click', function listener(event) {\n            if (that.containsElement(event.target)) return;\n            that.close();\n            document.removeEventListener('click', listener);\n        }, true);\n    }\n\n    close() {\n        this.container.classList.remove('product-list__container_active');\n        this.isOpen = false;\n    }\n\n    add(product) {\n        this.addToMarkup(product);\n        this.products.push(product);\n        this.saveToLocalStorage();\n    }\n\n    addToMarkup(product) {\n        let ul = this.element.querySelector('.product-list__list');\n        let li = document.createElement('li');\n        li.classList.add('product-list__item');\n        li.dataset.id = product.id;\n        li.innerHTML = `\n            <img src=\"${product.image}\" class=\"product-list__image\" alt=\"картинка с заказом\">\n            <div class=\"product-list__text\">\n                <span class=\"product-list__name\">${product.name}</span>\n                <span class=\"product-list__price\">${product.price} ₽</span>\n            </div>\n            <button class=\"product-list__close\"></button>\n        `;\n\n        ul.append(li);\n        let close = li.querySelector('.product-list__close');\n        close.addEventListener('click', () => this.delete(product));\n        this.sum(product.price);\n        this.count();\n\n        let event = new CustomEvent(`added-${this.name}-product`, { detail: product });\n        document.dispatchEvent(event);\n    }\n\n    delete(product) {\n        let productIndex = this.products.findIndex((item) => product.id === item.id);\n        this.products.splice(productIndex, 1);\n        this.saveToLocalStorage();\n\n        let li = this.element.querySelector(`.product-list__item[data-id=\"${product.id}\"]`);\n        let price = parseFloat(li.querySelector('.product-list__price').textContent);\n        li.remove();\n        this.sum(-price);\n        this.count();\n\n        let event = new CustomEvent(`deleted-${this.name}-product`, { detail: product });\n        document.dispatchEvent(event);\n    }\n\n    sum(price) {\n        let sum = this.element.querySelector('.product-list__sum');\n        let currentSum = parseFloat(sum.textContent);\n        currentSum += price;\n        sum.textContent = `${currentSum} ₽`;\n    }\n\n    containsElement(target) {\n        if (target === this.element) return true;\n        if (target === null) return false;\n        return this.containsElement(target.parentElement);\n    }\n\n    count() {\n        let count = this.element.querySelector('.product-list__count');\n        let num = Array.from(this.element.querySelectorAll('.product-list__item'));\n        count.textContent = num.length;\n        let display = num <= 0 ? 'none' : 'block';\n        count.style.display = display;\n    }\n\n    loadFromLocalStorage() {\n        let json = localStorage.getItem(this.name);\n        if (!json) return [];\n        let products = JSON.parse(json);\n        products.forEach(item => this.addToMarkup(item));\n        return products;\n    }\n\n    saveToLocalStorage() {\n        let json = JSON.stringify(this.products);\n        localStorage.setItem(this.name, json);\n    }\n}\n\nlet productLists = Array.from(document.querySelectorAll('.product-list'));\nproductLists.forEach(product => new ProductList(product));\n\n//# sourceURL=webpack:///./components/product-list/product-list.js?");

/***/ }),

/***/ "./components/range/range.js":
/*!***********************************!*\
  !*** ./components/range/range.js ***!
  \***********************************/
/***/ (() => {

eval("\n\nclass Ball {\n    constructor(ball, strip) {\n        this.element = ball;\n        /** @type {HTMLElement} */\n        this.strip = strip;\n\n        this.element.addEventListener('mousedown', () => this.start());\n        this.element.addEventListener('touchstart', () => this.start());\n    }\n\n    start() {\n        let moveHandler = (event) => this.move(event);\n        let stopHandler = (event) => {\n            console.log(event.type);\n            document.removeEventListener('mouseup', stopHandler);\n            document.removeEventListener('touchend', stopHandler);\n            document.removeEventListener('mousemove', moveHandler);\n            document.removeEventListener('touchmove', moveHandler);\n        };\n\n        document.addEventListener('mousemove', moveHandler);\n        document.addEventListener('mouseup', stopHandler);\n        document.addEventListener('touchmove', moveHandler);\n        document.addEventListener('touchend', stopHandler);\n    }\n\n    move(event) {\n        let clientX = event.clientX || event.touches[0].clientX;\n        let x = clientX - this.strip.getBoundingClientRect().left;\n        if (x < 0) x = 0;\n        if (x > this.strip.clientWidth) x = this.strip.clientWidth;\n\n        this.element.dispatchEvent(new CustomEvent('want-move', {\n            detail: {x}\n        }));\n    }\n}\n\nclass Range {\n    constructor(range) {\n        this.element = range;\n        this.maxPrice = Number(this.element.dataset.max);\n        this.minPrice = Number(this.element.dataset.min);\n        this.strip = this.element.querySelector('.range__strip');\n        this.minBall = new Ball(this.element.querySelector('.range__ball_min'), this.strip);\n        this.maxBall = new Ball(this.element.querySelector('.range__ball_max'), this.strip);\n        this.minInput = this.element.querySelector('.range__price_min');\n        this.maxInput = this.element.querySelector('.range__price_max');\n\n        this.disableInputs();\n        this.addClearListener();\n        this.minMove(this.minPrice);\n        this.maxMove(this.maxPrice);\n\n        this.minBall.element.addEventListener('input', (e) => this.minMove(e.target.value));\n        this.maxBall.element.addEventListener('input', (e) => this.maxMove(e.target.value));\n        this.minBall.element.addEventListener('want-move', (event) => {\n            let price = this.coordToPrice(event);\n            this.minMove(price);\n        });\n        this.maxBall.element.addEventListener('want-move', (event) => {\n            let price = this.coordToPrice(event);\n            this.maxMove(price);\n        });\n    }\n\n    minMove(value) {\n        let price = Math.min(Number(value), Number(this.maxInput.value));\n        this.minBall.element.style.left = price / this.maxPrice * 100 + '%';\n        this.maxInput.min = price;\n        this.minInput.value = price;\n        this.smallRange();\n    }\n\n    maxMove(value) {\n        let price = Math.max(Number(this.minInput.value), Number(value));\n        this.maxBall.element.style.left = price / this.maxPrice * 100 + '%';\n        this.minInput.max = price;\n        this.maxInput.value = price;\n        this.smallRange();\n    }\n\n    coordToPrice(event) {\n        let x = event.detail.x;\n        let percent = 100 / this.strip.clientWidth * x;\n        let price = this.maxPrice / 100 * percent;\n        return price.toFixed(0);\n    }\n\n    disableInputs() {\n        this.minInput.disabled = true;\n        this.maxInput.disabled = true;\n    }\n\n    smallRange() {\n        let diff = this.maxInput.value - this.minInput.value;\n        this.maxInput.classList.toggle('range__price_top', diff < 45000);\n    }\n\n    addClearListener() {\n        let form = this.element.closest('form');\n        if (!form) return;\n        form.addEventListener('reset', () => {\n            this.minMove(this.minPrice);\n            this.maxMove(this.maxPrice);\n        });\n    }\n}\n\nlet ranges = Array.from(document.querySelectorAll('.range'));\nranges.forEach(range => new Range(range));\n\n//# sourceURL=webpack:///./components/range/range.js?");

/***/ }),

/***/ "./components/select/select.js":
/*!*************************************!*\
  !*** ./components/select/select.js ***!
  \*************************************/
/***/ (() => {

eval("\n\nlet select = document.querySelector('.select');\nlet active = document.querySelector('.select__option_active');\nlet options = document.querySelector('.select__options');\n\nif (select) {\n    select.addEventListener('click', () => {\n        options.classList.toggle('select__options_active');\n    });\n}\n\nif (options) {\n    options.addEventListener('click', (event) => {\n        active.textContent = event.target.textContent;\n    });\n}\n\n//# sourceURL=webpack:///./components/select/select.js?");

/***/ }),

/***/ "./components/slider/slider.js":
/*!*************************************!*\
  !*** ./components/slider/slider.js ***!
  \*************************************/
/***/ (() => {

eval("\n\nfunction sliderFunction() {\n    let prev = document.querySelector('.slider__button_prev');\n    let next = document.querySelector('.slider__button_next');\n    let slider = document.querySelector('.slider');\n    let items = Array.from(document.querySelectorAll('.slider__item'));\n    let current = 0;\n    let styles = getComputedStyle(document.querySelector('.slider__item'));\n    let width = parseFloat(styles.width) + parseFloat(styles.marginRight);\n\n    slider.addEventListener('click', (event) => {\n        if (event.target.closest('.slider__button_prev') === prev) scroll(-1);\n        if (event.target.closest('.slider__button_next') === next) scroll(1);\n    });\n\n    function scroll(n) {\n        let visibleCards = Math.floor(slider.clientWidth / items[0].clientWidth);\n        current += n;\n        if (current < 0) current = items.length - visibleCards;\n        if (current > items.length - visibleCards) current = 0;\n        let item = document.querySelector('.slider__item');\n        item.style.marginLeft = -(current * width) + 'px';\n    }\n}\n\nlet slider = document.querySelector('.slider');\nif (slider) sliderFunction();\n\n//# sourceURL=webpack:///./components/slider/slider.js?");

/***/ }),

/***/ "./components/watch-card/watch-card.js":
/*!*********************************************!*\
  !*** ./components/watch-card/watch-card.js ***!
  \*********************************************/
/***/ (() => {

eval("\n\nclass WatchCard {\n    constructor(card) {\n        this.card = card;\n        this.basket = this.card.querySelector('.watch-card__basket');\n        this.favourite = this.card.querySelector('.watch-card__favourite');\n        this.name = this.card.querySelector('.watch-card__name').textContent.toUpperCase();\n        this.price = parseFloat(this.card.querySelector('.watch-card__price').textContent);\n        this.image = this.card.querySelector('.watch-card__image').src;\n        this.id = this.card.dataset.id;\n\n        ['basket', 'favourite'].forEach(target => {\n            this[target].addEventListener('click', () => {\n                if (this[target].classList.contains(`watch-card__${target}_added`)) this.remove(target);\n                else this.add(target);\n            });\n\n            document.addEventListener(`added-${target}-product`, (event) => {\n                if (event.detail.id !== this.id) return;\n                this[target].classList.add(`watch-card__${target}_added`);\n            });\n\n            document.addEventListener(`deleted-${target}-product`, (event) => {\n                if (event.detail.id !== this.id) return;\n                this[target].classList.remove(`watch-card__${target}_added`);\n            });\n        });\n    }\n\n    get product() {\n        return {\n            name: this.name,\n            price: this.price,\n            image: this.image,\n            id: this.id,\n        };\n    }\n\n    add(where) {\n        this[where].classList.add(`watch-card__${where}_added`);\n        let eventAdd = new CustomEvent(`add-${where}-product`, {\n            detail: this.product,\n        });\n        document.dispatchEvent(eventAdd);\n    }\n\n    remove(where) {\n        this[where].classList.remove(`watch-card__${where}_added`);\n        let eventDelete = new CustomEvent(`delete-${where}-product`, {\n            detail: this.product,\n        });\n        document.dispatchEvent(eventDelete);\n    }\n}\n\nlet cards = Array.from(document.querySelectorAll('.watch-card'));\ncards.forEach(card => new WatchCard(card));\n\n//# sourceURL=webpack:///./components/watch-card/watch-card.js?");

/***/ }),

/***/ "./components/watch-info/watch-info.js":
/*!*********************************************!*\
  !*** ./components/watch-info/watch-info.js ***!
  \*********************************************/
/***/ (() => {

eval("\r\n\r\nlet links = Array.from(document.querySelectorAll('.watch-info__about a'));\r\nlinks.forEach(link => {\r\n    link.addEventListener('click', (event) => enable(link, event));\r\n});\r\n\r\nfunction enable(link, event) {\r\n    if (event) event.preventDefault();\r\n    let active = document.querySelector('.watch-info__content_active');\r\n    if (active) active.classList.remove('watch-info__content_active');\r\n    let activeLink = document.querySelector('.watch-info__link_active');\r\n    if (activeLink) activeLink.classList.remove('watch-info__link_active');\r\n\r\n    let id = link.getAttribute('href').slice(1);\r\n    let target = document.getElementById(id);\r\n    target.classList.add('watch-info__content_active');\r\n    link.classList.add('watch-info__link_active');\r\n}\r\n\r\nclass WatchInfo {\r\n    constructor() {\r\n        this.favourite = document.querySelector('.watch-info__favourite');\r\n        this.basket = document.querySelector('.watch-info__button');\r\n        this.name = document.querySelector('.watch-info__title').textContent.toUpperCase();\r\n        this.price = parseFloat(document.querySelector('.watch-info__price').textContent);\r\n        this.image = document.querySelector('.gallery__main-img').src;\r\n        this.product = {\r\n            name: this.name,\r\n            price: this.price,\r\n            image: this.image,\r\n        };\r\n\r\n        ['basket', 'favourite'].forEach(item => {\r\n            this[item].addEventListener('click', () => {\r\n                if (this[item].classList.contains(`watch-info__${item}_added`)) this.remove(item);\r\n                else this.add(item);\r\n            });\r\n\r\n            document.addEventListener(`added-${item}-product`, (event) => {\r\n                if (event.detail.id !== this.id) return;\r\n                this[item].classList.add(`watch-info__${item}_added`);\r\n            });\r\n\r\n            document.addEventListener(`deleted-${item}-product`, (event) => {\r\n                if (event.detail.id !== this.id) return;\r\n                this[item].classList.remove(`watch-info__${item}_added`);\r\n            });\r\n        });\r\n    }\r\n\r\n    add(where) {\r\n        this[where].classList.add(`watch-info__${where}_added`);\r\n        let eventAdd = new CustomEvent(`add-${where}-product`, {\r\n            detail: this.product,\r\n        });\r\n        document.dispatchEvent(eventAdd);\r\n    }\r\n\r\n    remove(where) {\r\n        this[where].classList.remove(`watch-info__${where}_added`);\r\n        let eventDelete = new CustomEvent(`delete-${where}-product`, {\r\n            detail: this.product,\r\n        });\r\n        document.dispatchEvent(eventDelete);\r\n    }\r\n}\r\n\r\nlet watchInfo = document.querySelector('.watch-info');\r\n\r\nif (watchInfo) new WatchInfo();\n\n//# sourceURL=webpack:///./components/watch-info/watch-info.js?");

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