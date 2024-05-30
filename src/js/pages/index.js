document.addEventListener('DOMContentLoaded', function () {
    const awardsParent = document.querySelector('.js-awards-parent'),
        buyParent = document.querySelector('.js-buy-parent'),
        awardsContent = document.querySelector('.js-awards-content'),
        buyContent = document.querySelector('.js-buy-content'),
        awardsContentItems = awardsContent.querySelectorAll('.swiper-slide').length,
        buyContentItems = buyContent.querySelectorAll('.swiper-slide').length,
        screenWidth = window.innerWidth;

    if (screenWidth <= 1024) {
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
    }

    if (screenWidth <= 1024 || awardsContentItems > 6) {
        const awardsSlider = new Swiper(".js-awards-slider", {
            loop: false,
            navigation: {
                nextEl: ".awards__slider-next",
                prevEl: ".awards__slider-prev",
            },
            spaceBetween: 31,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                370: {
                    slidesPerView: 2.03,
                    spaceBetween: 10,
                },
                767: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                1024: {
                    slidesPerView: 6,
                }
            }
        });
        awardsParent.classList.add('active');
        awardsContent.classList.add('active');
    }


    if (screenWidth <= 1024 || buyContentItems > 4) {
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
                },
                1024: {
                    slidesPerView: 3,
                },
                1400: {
                    slidesPerView: 4,
                }
            }
        });
        buyParent.classList.add('active');
        buyContent.classList.add('active');
    }
});