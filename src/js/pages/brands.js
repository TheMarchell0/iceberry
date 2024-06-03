document.addEventListener('DOMContentLoaded', function () {
    const parent = document.querySelector('.js-slider-parent'),
        pagination = parent.querySelector('.js-hero-pagination'),
        header = document.querySelector('.js-header'),
        screenWidth = window.innerWidth;

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
        speed: 800,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
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

    const brandsSlider = new Swiper(".js-brands-slider", {
        loop: false,
        navigation: {
            nextEl: ".brands__slider-next",
            prevEl: ".brands__slider-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            350: {
                slidesPerView: 2.03,
                spaceBetween: 10,
            },
            767: {
                slidesPerView: 3,
            },
            1400: {
                slidesPerView: 5.1,
                spaceBetween: 80,
            }
        }
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
});