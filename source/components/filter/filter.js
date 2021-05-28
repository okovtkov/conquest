'use strict';

let button = document.querySelector('.filter__button');
let filter = document.querySelector('.filter__form');
let reset = document.querySelector('.filter__reset');

button.addEventListener('click', () => {
    filter.classList.toggle('filter__form_active');
});

reset.addEventListener('click', () => {
    let minBall = document.querySelector('.range__ball_min');
    let maxBall = document.querySelector('.range__ball_max');

    minBall.style.left = 0;
    maxBall.style.left = 100 + '%';
});

