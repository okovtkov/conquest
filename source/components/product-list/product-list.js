'use strict';

class ProductList {
    constructor(element) {
        this.element = element;
        this.container = element.querySelector('.product-list__container');
        this.isOpen = false;
        this.name = element.dataset.name;
        let toggler = element.querySelector('.product-list__button');

        toggler.addEventListener('click', () => {
            if (this.isOpen) this.close();
            else this.open();
        });
        document.addEventListener(`add-${this.name}-product`, (event) => this.add(event.detail));
        document.addEventListener(`delete-${this.name}-product`, (event) => this.delete(event.detail));
    }

    open() {
        if (this.isOpen) return;
        let that = this;
        this.container.classList.add('product-list__container_active');
        this.isOpen = true;

        document.addEventListener('click', function listener(event) {
            if (that.containsElement(event.target)) return;
            that.close();
            document.removeEventListener('click', listener);
        }, true);
    }

    close() {
        this.container.classList.remove('product-list__container_active');
        this.isOpen = false;
    }

    add(product) {
        let ul = this.element.querySelector('.product-list__list');

        let li = document.createElement('li');
        li.classList.add('product-list__item');
        li.dataset.id = product.id;
        li.innerHTML = `
            <img src="${product.image}" class="product-list__image" alt="картинка с заказом">
            <div class="product-list__text">
                <span class="product-list__name">${product.name}</span>
                <span class="product-list__price">${product.price}</span>
            </div>
            <button class="product-list__close"></button>
        `;

        ul.append(li);
        let close = li.querySelector('.product-list__close');
        close.addEventListener('click', () => this.delete(product));
        this.sum(product.price);
        this.count();
    }

    delete(product) {
        let li = this.element.querySelector(`.product-list__item[data-id="${product.id}"]`);
        let price = parseFloat(li.querySelector('.product-list__price').textContent);
        li.remove();
        this.sum(-price);
        this.count();

        let event = new CustomEvent(`deleted-${this.name}-product`, { detail: product });
        document.dispatchEvent(event);
    }

    sum(price) {
        let sum = this.element.querySelector('.product-list__sum');
        let currentSum = parseFloat(sum.textContent);
        currentSum += price;
        sum.textContent = `${currentSum} ₽`;
    }

    containsElement(target) {
        if (target === this.element) return true;
        if (target === null) return false;
        return this.containsElement(target.parentElement);
    }

    count() {
        let count = this.element.querySelector('.product-list__count');
        let num = Array.from(this.element.querySelectorAll('.product-list__item'));
        count.textContent = num.length;
        let display = num <= 0 ? 'none' : 'block';
        count.style.display = display;
    }
}

let productLists = Array.from(document.querySelectorAll('.product-list'));
productLists.forEach(product => new ProductList(product));