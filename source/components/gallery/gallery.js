'use strict';

let gallery = document.querySelector('.gallery');
let largeImage = document.querySelector('.gallery__main-img');
let ul = document.querySelector('.gallery__preview');
let current = 1;
let prev = document.querySelector('.gallery__button_prev');
let next = document.querySelector('.gallery__button_next');

// slice (1) потому что по первой картинке не должен срабатывать клик
Array.from(ul.children).slice(1).forEach((li, index) => {
    // index + 1 - потому что был slice(1)
    li.addEventListener('click', () => selectImage(index + 1));
});

prev.addEventListener('click', () => selectImage(current - 1));
next.addEventListener('click', () => selectImage(current + 1));

function selectImage(index) {
    let active = ul.children[current];
    if (active) active.classList.remove('gallery__item_active');
    if (index < 1) index = ul.children.length - 1;
    if (index > ul.children.length - 1) index = 1;

    let li = ul.children[index];
    li.classList.add('gallery__item_active');
    let img = li.querySelector('.gallery__image');
    largeImage.src = img.src;
    current = index;
}