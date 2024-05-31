document.addEventListener('DOMContentLoaded', function () {
    const parent = document.querySelector('.js-slider-parent'),
        pagination = parent.querySelector('.js-hero-pagination'),
        header = document.querySelector('.js-header');

    let activeTheme = 'vologodskiy-plombir'; //При загрузке страницы слайдер начинается с Вологодского пломбира
    header.classList.add(activeTheme);

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
    });

    const brandsSlider = new Swiper(".js-brands-slider", {
        loop: false,
        navigation: {
            nextEl: ".brands__slider-next",
            prevEl: ".brands__slider-prev",
        },
        spaceBetween: 10,
        breakpoints: {
            320: {
                slidesPerView: 1.07,
            },
            767: {
                slidesPerView: 4.85,
            }
        }
    });

    heroSlider.on('slideChange', function () {
        setTimeout(() => {
            let newTheme = parent.querySelector('.js-brands-slide.swiper-slide-active').getAttribute('data-theme');
            pagination.classList.remove(activeTheme);
            header.classList.remove(activeTheme);
            pagination.classList.add(newTheme);
            header.classList.add(newTheme)
            activeTheme = newTheme;
        }, 100)
    });
});