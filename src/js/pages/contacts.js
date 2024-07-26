import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import Choices from "choices.js";
import 'choices.js/public/assets/styles/choices.min.css';
import {fileInputInitialization} from "../helpers/fileInputInitialization";
import {phoneMaskInitialization} from "../helpers/phoneMaskInitialization";
import {createFormValidation} from "../helpers/createFormValidation";
import {openModalFunctional} from "../helpers/openModalFunctional";
import {createTabsFunctional} from "../helpers/createTabsFunctional";

document.addEventListener('DOMContentLoaded', function () {
    const infoContentBlocks = document.querySelectorAll('.js-option-content'),
        elements = document.querySelectorAll('.js-choices-select'),
        contactsSelect = document.querySelector('.js-contacts-select'),
        forms = document.querySelectorAll('.js-form'),
        screenWidth = window.innerWidth;

    fileInputInitialization(forms);
    phoneMaskInitialization();
    openModalFunctional();
    createFormValidation(forms);
    createTabsFunctional();


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

    contactsSelect.addEventListener('change', function() {
        const value = contactsSelect.value;
        for (let infoContentBlock of infoContentBlocks) {
            if (infoContentBlock.classList.contains('info_active') && infoContentBlock.getAttribute('data-value-content') !== value) {
                infoContentBlock.classList.remove('info_active')
            }

            if (infoContentBlock.getAttribute('data-value-content') === value) {
                infoContentBlock.classList.add('info_active')
            }
        }
    });


    for (let infoContentBlock of infoContentBlocks) {
        const items = infoContentBlock.querySelectorAll('.swiper-slide').length;

        if ((items > 3) || (items  === 3 && screenWidth < 1024) || (items === 2 && screenWidth < 660)) {

            if (!infoContentBlock.classList.contains('info__options-item_slider')) {
                infoContentBlock.classList.add('info__options-item_slider');
            }

            const infoSlider = new Swiper(infoContentBlock.querySelector('.js-info-slider'), {
                loop: false,
                navigation: {
                    nextEl: infoContentBlock.querySelector('.info__slider-next'),
                    prevEl: infoContentBlock.querySelector('.info__slider-prev'),
                },
                spaceBetween: 21,
                breakpoints: {
                    320: {
                        slidesPerView: '1.11',
                        spaceBetween: 10,
                    },
                    660: {
                        slidesPerView: '2',
                    },
                    1024: {
                        slidesPerView: '3',
                    },
                },
            });
        }
    }
})

function openInfoContent() {

}