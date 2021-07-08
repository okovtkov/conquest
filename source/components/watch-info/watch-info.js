'use strict';

let links = Array.from(document.querySelectorAll('.watch-info__about a'));
links.forEach(link => {
    link.addEventListener('click', (event) => enable(link, event));
});

function enable(link, event) {
    if (event) event.preventDefault();
    let active = document.querySelector('.watch-info__content_active');
    if (active) active.classList.remove('watch-info__content_active');
    let activeLink = document.querySelector('.watch-info__link_active');
    if (activeLink) activeLink.classList.remove('watch-info__link_active');

    let id = link.getAttribute('href').slice(1);
    let target = document.getElementById(id);
    target.classList.add('watch-info__content_active');
    link.classList.add('watch-info__link_active');
}

class WatchInfo {
    constructor() {
        this.favourite = document.querySelector('.watch-info__favourite');
        this.basket = document.querySelector('.watch-info__button');
        this.name = document.querySelector('.watch-info__title').textContent.toUpperCase();
        this.price = parseFloat(document.querySelector('.watch-info__price').textContent);
        this.image = document.querySelector('.gallery__main-img').src;
        this.product = {
            name: this.name,
            price: this.price,
            image: this.image,
        };

        ['basket', 'favourite'].forEach(item => {
            this[item].addEventListener('click', () => {
                if (this[item].classList.contains(`watch-info__${item}_added`)) this.remove(item);
                else this.add(item);
            });

            document.addEventListener(`added-${item}-product`, (event) => {
                if (event.detail.id !== this.id) return;
                this[item].classList.add(`watch-info__${item}_added`);
            });

            document.addEventListener(`deleted-${item}-product`, (event) => {
                if (event.detail.id !== this.id) return;
                this[item].classList.remove(`watch-info__${item}_added`);
            });
        });
    }

    add(where) {
        this[where].classList.add(`watch-info__${where}_added`);
        let eventAdd = new CustomEvent(`add-${where}-product`, {
            detail: this.product,
        });
        document.dispatchEvent(eventAdd);
    }

    remove(where) {
        this[where].classList.remove(`watch-info__${where}_added`);
        let eventDelete = new CustomEvent(`delete-${where}-product`, {
            detail: this.product,
        });
        document.dispatchEvent(eventDelete);
    }
}

let watchInfo = document.querySelector('.watch-info');

if (watchInfo) new WatchInfo();