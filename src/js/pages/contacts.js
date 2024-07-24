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
    const parent = document.querySelector('.js-info-parent'),
        infoSliderBlock = parent.querySelector('.js-info-slider'),
        elements = document.querySelectorAll('.js-choices-select'),
        forms = document.querySelectorAll('.js-form');

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