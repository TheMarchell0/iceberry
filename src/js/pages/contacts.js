document.addEventListener('DOMContentLoaded', function () {
    const parent = document.querySelector('.js-info-parent'),
        parentContainer = parent.querySelector('.js-info-container'),
        infoSliderBlock = parent.querySelector('.js-info-slider'),
        element = parent.querySelector('.js-info-select'),
        screenWidth = window.innerWidth,
        choices = new Choices(element, {
            searchEnabled: false,
            position: 'bottom',
            itemSelectText: '',
            openState: 'is-open',
        });

    const infoSlider = new Swiper(infoSliderBlock, {
        loop: false,
        navigation: {
            nextEl: ".info__slider-next",
            prevEl: ".info__slider-prev",
        },
        spaceBetween: 20,
        breakpoints: {
            320: {
                slidesPerView: '1',
            },
            600: {
                slidesPerView: '2',
            },
            1024: {
                slidesPerView: '3',
            },
            1400: {
                slidesPerView: '4.01',
            }
        },
        on: {
            reachEnd: function () {
                if (screenWidth >= 1400) {
                    parentContainer.classList.add('decor-left');
                    parentContainer.classList.remove('decor-right');
                }
            },
            fromEdge: function () {
                if (!infoSlider.isEnd && screenWidth >= 1400) {
                    parentContainer.classList.remove('decor-left');
                    parentContainer.classList.add('decor-right');
                }
            },
        },
    });

    if (screenWidth >= 1441) {
        infoSliderBlock.classList.add('swiper-overflow-hidden');
    }
})