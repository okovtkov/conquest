'use strict';

let select = document.querySelector('.select');
let active = document.querySelector('.select__option_active');
let options = document.querySelector('.select__options');

select.addEventListener('click', () => {
    options.classList.toggle('select__options_active');
});

options.addEventListener('click', (event) => {
    active.textContent = event.target.textContent;
});