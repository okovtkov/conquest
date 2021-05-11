'use strict';

let prev = document.querySelector('.slider__button_prev');
let next = document.querySelector('.slider__button_next');
let slider = document.querySelector('.slider');
let items = Array.from(document.querySelectorAll('.slider__item'));
let current = 0;
let styles = getComputedStyle(document.querySelector('.slider__item'));
let width = parseFloat(styles.width) + parseFloat(styles.marginRight);

slider.addEventListener('click', (event) => {
    if (event.target.closest('.slider__button_prev') === prev) scroll(-1);
    if (event.target.closest('.slider__button_next') === next) scroll(1);
});

function scroll(n) {
    let visibleCards = Math.floor(slider.clientWidth / items[0].clientWidth);
    current += n;
    if (current < 0) current = items.length - visibleCards;
    if (current > items.length - visibleCards) current = 0;
    let item = document.querySelector('.slider__item');
    item.style.marginLeft = -(current * width) + 'px';
}