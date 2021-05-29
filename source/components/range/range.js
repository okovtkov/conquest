'use strict';

class Ball {
    constructor(ball, strip) {
        this.element = ball;
        /** @type {HTMLElement} */
        this.strip = strip;

        this.element.addEventListener('mousedown', () => this.start());
        this.element.addEventListener('touchstart', () => this.start());
    }

    start() {
        let moveHandler = (event) => this.move(event);
        let stopHandler = (event) => {
            console.log(event.type);
            document.removeEventListener('mouseup', stopHandler);
            document.removeEventListener('touchend', stopHandler);
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('touchmove', moveHandler);
        };

        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', stopHandler);
        document.addEventListener('touchmove', moveHandler);
        document.addEventListener('touchend', stopHandler);
    }

    move(event) {
        let clientX = event.clientX || event.touches[0].clientX;
        let x = clientX - this.strip.getBoundingClientRect().left;
        if (x < 0) x = 0;
        if (x > this.strip.clientWidth) x = this.strip.clientWidth;

        this.element.dispatchEvent(new CustomEvent('want-move', {
            detail: {x}
        }));
    }
}

class Range {
    constructor(range) {
        this.element = range;
        this.maxPrice = Number(this.element.dataset.max);
        this.minPrice = Number(this.element.dataset.min);
        this.strip = this.element.querySelector('.range__strip');
        this.minBall = new Ball(this.element.querySelector('.range__ball_min'), this.strip);
        this.maxBall = new Ball(this.element.querySelector('.range__ball_max'), this.strip);
        this.minInput = this.element.querySelector('.range__price_min');
        this.maxInput = this.element.querySelector('.range__price_max');

        this.disableInputs();
        this.minMove(this.minPrice);
        this.maxMove(this.maxPrice);

        this.minBall.element.addEventListener('input', (e) => this.minMove(e.target.value));
        this.maxBall.element.addEventListener('input', (e) => this.maxMove(e.target.value));
        this.minBall.element.addEventListener('want-move', (event) => {
            let price = this.coordToPrice(event);
            this.minMove(price);
        });
        this.maxBall.element.addEventListener('want-move', (event) => {
            let price = this.coordToPrice(event);
            this.maxMove(price);
        });
    }

    minMove(value) {
        let price = Math.min(Number(value), Number(this.maxInput.value));
        this.minBall.element.style.left = price / this.maxPrice * 100 + '%';
        this.maxInput.min = price;
        this.minInput.value = price;
        this.smallRange();
    }

    maxMove(value) {
        let price = Math.max(Number(this.minInput.value), Number(value));
        this.maxBall.element.style.left = price / this.maxPrice * 100 + '%';
        this.minInput.max = price;
        this.maxInput.value = price;
        this.smallRange();
    }

    coordToPrice(event) {
        let x = event.detail.x;
        let percent = 100 / this.strip.clientWidth * x;
        let price = this.maxPrice / 100 * percent;
        return price.toFixed(0);
    }

    disableInputs() {
        this.minInput.disabled = true;
        this.maxInput.disabled = true;
    }

    smallRange() {
        let diff = this.maxInput.value - this.minInput.value;
        this.maxInput.classList.toggle('range__price_top', diff < 45000);
    }
}

let ranges = Array.from(document.querySelectorAll('.range'));
ranges.forEach(range => new Range(range));