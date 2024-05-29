document.addEventListener('DOMContentLoaded', function () {
        const heroSlider = new Swiper(".js-hero-slider", {
            loop: true,
            pagination: {
                el: '.hero__pagination',
                type: 'bullets',
                clickable: true,
            },
            effect: 'fade',
            speed: 800,
            autoplay: {
                delay: 5000,
            },
            slidesPerView: 1,
        });

    heroSlider.on('slideChange', function () {
        console.log(1);
    });
});