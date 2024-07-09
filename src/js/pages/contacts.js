import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import Choices from "choices.js";
import 'choices.js/public/assets/styles/choices.min.css';

document.addEventListener('DOMContentLoaded', function () {
    const parent = document.querySelector('.js-info-parent'),
        infoSliderBlock = parent.querySelector('.js-info-slider'),
        elements = document.querySelectorAll('.js-choices-select'),
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
        let choices = new Choices(element, {
            searchEnabled: false,
            position: 'bottom',
            itemSelectText: '',
            openState: 'is-open',
            classNames: {
                containerOuter: `choices choices_${specificType}`,
            },
            shouldSort: false,
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
                slidesPerView: '1.11',
                spaceBetween: 10,
            },
            600: {
                slidesPerView: '2',
            },
            1024: {
                slidesPerView: '3',
            },
        },
    });
})