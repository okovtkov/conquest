'use strict';

class Ball {
    constructor(ball, strip) {
        this.element = ball;
        /** @type {HTMLElement} */
        this.strip = strip;

        this.element.addEventListener('pointerdown', () => this.start());
    }

    start() {
        let moveHandler = (event) => this.move(event);
        document.addEventListener('pointermove', moveHandler);
        document.addEventListener('pointerup', function pointerUp() {
            document.removeEventListener('pointerup', pointerUp);
            document.removeEventListener('pointermove', moveHandler);
        });
    }

    move(event) {
        let x = event.clientX - this.strip.getBoundingClientRect().left;
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
        let minInput = this.element.querySelector('.range__price_min');
        let maxInput = this.element.querySelector('.range__price_max');
        let price = Math.min(Number(value), Number(maxInput.value));
        this.minBall.element.style.left = price / this.maxPrice * 100 + '%';
        maxInput.min = price;
        minInput.value = price;
        this.smallRange();
    }

    maxMove(value) {
        let minInput = this.element.querySelector('.range__price_min');
        let maxInput = this.element.querySelector('.range__price_max');
        let price = Math.max(Number(minInput.value), Number(value));
        this.maxBall.element.style.left = price / this.maxPrice * 100 + '%';
        minInput.max = price;
        maxInput.value = price;
        this.smallRange();
    }

    coordToPrice(event) {
        let x = event.detail.x;
        let percent = 100 / this.strip.clientWidth * x;
        let price = this.maxPrice / 100 * percent;
        return price.toFixed(0);
    }

    disableInputs() {
        let minInput = this.element.querySelector('.range__price_min');
        let maxInput = this.element.querySelector('.range__price_max');
        minInput.disabled = true;
        maxInput.disabled = true;
    }

    smallRange() {
        let minInput = this.element.querySelector('.range__price_min');
        let maxInput = this.element.querySelector('.range__price_max');
        let diff = maxInput.value - minInput.value;
        maxInput.classList.toggle('range__price_top', diff < 45000);
    }
}

let ranges = Array.from(document.querySelectorAll('.range'));
ranges.forEach(range => new Range(range));