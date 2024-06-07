import Choices from 'choices.js';

document.addEventListener('DOMContentLoaded', function () {
    const screenWidth = window.innerWidth;

    const heroSlider = new Swiper(".js-hero-slider", {
        loop: true,
        pagination: {
            el: '.hero__pagination',
            type: 'bullets',
            clickable: true,
        },
        effect: 'fade',
        slidesPerView: 1,
        allowTouchMove: false,
        speed: 800,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });


    if (screenWidth <= 1024) {
        const brandsDescrSlider = new Swiper(".js-brands-descr-slider", {
            loop: false,
            navigation: {
                nextEl: ".brands-descr__slider-next",
                prevEl: ".brands-descr__slider-prev",
            },
            spaceBetween: 20,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                350: {
                    slidesPerView: 1.112,
                },
                700: {
                    slidesPerView: 2,
                }
            }
        });
    }

    const element = document.querySelector('.select');
    const choices = new Choices(element, {
        searchEnabled: false,
        position: 'bottom',
        itemSelectText: ''
    });
});