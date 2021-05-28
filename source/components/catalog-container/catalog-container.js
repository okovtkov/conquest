'use strict';

let cards = Array.from(document.querySelectorAll('.catalog-container__item'));

cards.forEach((card, index) => {
    card.style.order = index;
});

let adCard = document.querySelector('.catalog-container__item_ad');
adCard.style.order = 4;