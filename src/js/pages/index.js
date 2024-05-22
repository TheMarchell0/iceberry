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
                    slidesPerView: 2.3,
                },
                767: {
                    slidesPerView: 3
                }
            }
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
                    slidesPerView: 2,
                }
            }
        });

        const buySlider = new Swiper(".js-buy-slider", {
            loop: false,
            navigation: {
                nextEl: ".buy__slider-next",
                prevEl: ".buy__slider-prev",
            },
            spaceBetween: 20,
            breakpoints: {
                320: {
                    slidesPerView: 1.07,
                },
                767: {
                    slidesPerView: 2,
                }
            }
        });
    }
});