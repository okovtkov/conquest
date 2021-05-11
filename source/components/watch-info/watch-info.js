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