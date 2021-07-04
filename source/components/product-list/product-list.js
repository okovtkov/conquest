'use strict';

class ProductList {
    constructor(element) {
        this.element = element;
        this.container = element.querySelector('.product-list__container');
        this.isOpen = false;
        let toggler = element.querySelector('.product-list__button');

        toggler.addEventListener('click', () => {
            if (this.isOpen) this.close();
            else this.open();
        });
        document.addEventListener('add-product', (event) => this.add(event.detail));
        document.addEventListener('delete-product', (event) => this.delete(event.detail));
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
    }

    delete(product) {
        let li = this.element.querySelector(`.product-list__item[data-id="${product.id}"]`);
        let price = parseFloat(li.querySelector('.product-list__price').textContent);
        this.sum(-price);
        li.remove();

        let event = new CustomEvent('deleted-product', { detail: product });
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
}

let productLists = Array.from(document.querySelectorAll('.product-list'));
productLists.forEach(product => new ProductList(product));