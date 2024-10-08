import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

document.addEventListener('DOMContentLoaded', function () {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 1024) {
        const assortmentSlider = new Swiper(".js-assortment-slider", {
            loop: false,
            navigation: {
                nextEl: ".assortment__slider-next",
                prevEl: ".assortment__slider-prev",
            },
            width: 310,
        });
    }
});