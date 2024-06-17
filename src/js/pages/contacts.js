document.addEventListener('DOMContentLoaded', function () {
    const parent = document.querySelector('.js-info-parent'),
        parentContainer = parent.querySelector('.js-info-container'),
        infoSliderBlock = parent.querySelector('.js-info-slider'),
        elements = document.querySelectorAll('.js-choices-select'),
        screenWidth = window.innerWidth,
        tabs = document.querySelectorAll('.js-tab'),
        tabForms = document.querySelectorAll('.js-tab-form')

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const activeTab = tab.getAttribute('data-tab');
            const activeForm = document.querySelector(`.js-${activeTab}-form`);

            tabForms.forEach(form => form.classList.remove('active'));
            tabs.forEach(item => item.classList.remove('active'));

            activeForm.classList.add('active');
            tab.classList.add('active');
        });
    });

    for (let element of elements) {
        const specificType = element.getAttribute('data-select-type');
        choices = new Choices(element, {
            searchEnabled: false,
            position: 'bottom',
            itemSelectText: '',
            openState: 'is-open',
            classNames: {
                containerOuter: `choices choices_${specificType}`,
            }
        });
    }

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