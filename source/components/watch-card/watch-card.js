'use strict';

class WatchCard {
    constructor(card) {
        this.card = card;
        this.basket = this.card.querySelector('.watch-card__basket');
        this.favourite = this.card.querySelector('.watch-card__favourite');
        this.name = this.card.querySelector('.watch-card__name').textContent.toUpperCase();
        this.price = parseFloat(this.card.querySelector('.watch-card__price').textContent);
        this.image = this.card.querySelector('.watch-card__image').src;
        this.id = this.card.dataset.id;

        ['basket', 'favourite'].forEach(target => {
            this[target].addEventListener('click', () => {
                if (this[target].classList.contains(`watch-card__${target}_added`)) this.remove(target);
                else this.add(target);
            });

            document.addEventListener(`deleted-${target}-product`, (event) => {
                if (event.detail.id !== this.id) return;
                this[target].classList.remove(`watch-card__${target}_added`);
            });
        });
    }

    get product() {
        return {
            name: this.name,
            price: this.price,
            image: this.image,
            id: this.id,
        };
    }

    add(where) {
        this[where].classList.add(`watch-card__${where}_added`);
        let eventAdd = new CustomEvent(`add-${where}-product`, {
            detail: this.product,
        });
        document.dispatchEvent(eventAdd);
    }

    remove(where) {
        this[where].classList.remove(`watch-card__${where}_added`);
        let eventDelete = new CustomEvent(`delete-${where}-product`, {
            detail: this.product,
        });
        document.dispatchEvent(eventDelete);
    }
}

let cards = Array.from(document.querySelectorAll('.watch-card'));
cards.forEach(card => new WatchCard(card));