'use strict';

let button = document.querySelector('.navigation__menu');
let navigation = document.querySelector('.navigation');

button.addEventListener('click', () => {
    navigation.classList.toggle('navigation_active');
    document.body.style.overflow = navigation.classList.contains('navigation_active') ? 'hidden' : '';
});