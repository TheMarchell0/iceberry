document.addEventListener('DOMContentLoaded', function () {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 1024) {
        const awardsSlider = new Swiper(".js-awards-slider", {
            loop: false,
            navigation: {
                nextEl: ".awards__slider-next",
                prevEl: ".awards__slider-prev",
            },
            spaceBetween: 10,
            breakpoints: {
                320: {
                    slidesPerView: 2,
                },
                767: {
                    slidesPerView: 3
                }
            }
        });
    }
});