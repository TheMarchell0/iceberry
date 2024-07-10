import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import Choices from "choices.js";
import 'choices.js/public/assets/styles/choices.min.css';
import {fileInputInitialization} from "../helpers/fileInputInitialization";

document.addEventListener('DOMContentLoaded', function () {
    const parent = document.querySelector('.js-info-parent'),
        infoSliderBlock = parent.querySelector('.js-info-slider'),
        elements = document.querySelectorAll('.js-choices-select'),
        tabs = document.querySelectorAll('.js-tab'),
        tabForms = document.querySelectorAll('.js-tab-form');

    fileInputInitialization();

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

    const dateInputs = document.querySelectorAll('.js-date-input');

    for (let dateInput of dateInputs) {
        dateInput.addEventListener('input', function(e) {
            let input = e.target.value;
            if (/^\d{2}\.\d{2}\.\d{4}$/.test(input)) {
                let parts = input.split('.');
                let day = parseInt(parts[0], 10);
                let month = parseInt(parts[1], 10);
                let year = parseInt(parts[2], 10);

                if (month > 12) {
                    month = 12;
                }

                let currentYear = new Date().getFullYear();
                if (year > currentYear || year < 2005) {
                    year = currentYear;
                }

                let daysInMonth = new Date(year, month, 0).getDate();
                if (day > daysInMonth) {
                    day = daysInMonth;
                }

                input = `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;
            } else {
                input = input.replace(/\D/g, '').substring(0, 8);
                input = input.replace(/(\d{2})(\d)/, '$1.$2');
                input = input.replace(/(\d{2})(\d)/, '$1.$2');
            }

            e.target.value = input;
        });
    }
})