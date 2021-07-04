'use strict';

class WatchCard {
    constructor(card) {
        this.card = card;
        this.basket = this.card.querySelector('.watch-card__basket');
        this.name = this.card.querySelector('.watch-card__name').textContent.toUpperCase();
        this.price = parseFloat(this.card.querySelector('.watch-card__price').textContent);
        this.image = this.card.querySelector('.watch-card__image').src;
        this.id = this.card.dataset.id;

        this.basket.addEventListener('click', () => {
            if (this.card.classList.contains('watch-card_added')) {
                this.remove();
            } else {
                this.add();
            }
        });

        document.addEventListener('deleted-product', (event) => {
            if (event.detail.id !== this.id) return;
            this.card.classList.remove('watch-card_added');
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

    add() {
        this.card.classList.add('watch-card_added');
        let eventAdd = new CustomEvent('add-product', {
            detail: this.product,
        });
        document.dispatchEvent(eventAdd);
    }

    remove() {
        this.card.classList.remove('watch-card_added');
        let eventDelete = new CustomEvent('delete-product', {
            detail: this.product,
        });
        document.dispatchEvent(eventDelete);
    }
}

let cards = Array.from(document.querySelectorAll('.watch-card'));
cards.forEach(card => new WatchCard(card));