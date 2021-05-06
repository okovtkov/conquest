'use strict';

let gallery = document.querySelector('.gallery');
let largeImage = document.querySelector('.gallery__main-img');
let ul = document.querySelector('.gallery__preview');
let current = 0;
let prev = document.querySelector('.gallery__button_prev');
let next = document.querySelector('.gallery__button_next');

Array.from(ul.children).forEach((li, index) => {
    li.addEventListener('click', () => selectImage(index));
});

prev.addEventListener('click', () => selectImage(current - 1));
next.addEventListener('click', () => selectImage(current + 1));

function selectImage(index) {
    let active = ul.children[current];
    if (active) active.classList.remove('gallery__item_active');
    if (index < 0) index = ul.children.length - 1;
    if (index > ul.children.length - 1) index = 0;

    let li = ul.children[index];
    li.classList.add('gallery__item_active');
    let img = li.querySelector('.gallery__image');
    largeImage.src = img.src;
    current = index;
}

// function slider(num) {
//     let index;
//     ul.forEach((li, index) => {
//         let radio = li.querySelector('.gallery__radio:checked');
//         if (radio) {
//             index = parseFloat(radio.id);
//             alert(index);
//         }
//     });
// }