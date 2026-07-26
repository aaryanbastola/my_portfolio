class ImageSlider {
    constructor(selector) {
        this.slider = document.querySelector(selector);
        if (!this.slider) return;

        this.track = this.slider.querySelector('.slider-track');
        this.slides = Array.from(this.track.children);
        this.prevBtn = this.slider.querySelector('.prev');
        this.nextBtn = this.slider.querySelector('.next');
        this.dotsContainer = this.slider.querySelector('.slider-dots');
        this.autoslideInterval = 3000; 

        this.currentIndex = 0;
        this.dots = [];
        this.autoslideTimer = null;

        this.init();
    }

    init() {
        this.createDots();
        this.bindEvents();
        this.updateSlidePosition();
        this.startAutoslide();
        this.addHoverEvents();
    }

    startAutoslide() {
        this.autoslideTimer = setInterval(() => {
            this.nextSlide();
        }, this.autoslideInterval);
    }

    stopAutoslide() {
        clearInterval(this.autoslideTimer);
        this.autoslideTimer = null;
    }

    addHoverEvents() {
        this.slider.addEventListener('mouseenter', () => this.stopAutoslide());
        this.slider.addEventListener('mouseleave', () => this.startAutoslide());
    }

    createDots() {
        if (!this.dotsContainer) return;

        this.dotsContainer.innerHTML = '';
        this.dots = [];

        this.slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                this.currentIndex = index;
                this.updateSlidePosition();
            });
            this.dotsContainer.appendChild(dot);
            this.dots.push(dot);
        });
    }

    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    updateSlidePosition() {
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;
        this.updateDots();
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlidePosition();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSlidePosition();
    }

    bindEvents() {
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }

        window.addEventListener('resize', () => this.updateSlidePosition());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ImageSlider('#slider');
});