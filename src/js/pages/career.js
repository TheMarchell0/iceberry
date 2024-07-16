import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import Choices from "choices.js";
import 'choices.js/public/assets/styles/choices.min.css';
import {fileInputInitialization} from "../helpers/fileInputInitialization";
import {phoneMaskInitialization} from "../helpers/phoneMaskInitialization";
import createFormValidation from "../helpers/createFormValidation";
import {openModalFunctional} from "../helpers/openModalFunctional";

document.addEventListener('DOMContentLoaded', function () {
    const parent = document.querySelector('.js-vacancies-parent'),
        parentContainer = parent.querySelector('.js-vacancies-container'),
        screenWidth = window.innerWidth,
        vacanciesSliderBlock = parent.querySelector('.js-vacancies-slider'),
        vacancies = parent.querySelector('.js-vacancies-content'),
        vacanciesLength = vacancies.querySelectorAll('.swiper-slide').length,
        forms = document.querySelectorAll('.js-form');
    let dropdowns;

    checkDropdowns();
    fileInputInitialization(forms);
    phoneMaskInitialization();
    openModalFunctional();
    createFormValidation(forms);

    function checkDropdowns() {
        dropdowns = parent.querySelectorAll('.choices__list--dropdown .choices__item');

        if (dropdowns.length > 0) {
            for (let dropdown of dropdowns) {
                console.log(dropdown.innerHTML)
            }
        } else {
            setTimeout(checkDropdowns, 200)
        }
    }

    const heroSlider = new Swiper(".js-hero-slider", {
        loop: true,
        pagination: {
            el: '.hero__pagination',
            type: 'bullets',
            clickable: true,
        },
        effect: 'fade',
        allowTouchMove: false,
        speed: 800,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });

    if ((screenWidth <= 1024 && vacanciesLength > 3) || vacanciesLength > 3) {
        vacancies.classList.add('active');

        const vacanciesSlider = new Swiper(".js-vacancies-slider", {
            loop: false,
            navigation: {
                nextEl: ".vacancies__slider-next",
                prevEl: ".vacancies__slider-prev",
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
                    slidesPerView: '3.575',
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
                    if (!vacanciesSlider.isEnd && screenWidth >= 1400) {
                        parentContainer.classList.remove('decor-left');
                        parentContainer.classList.add('decor-right');
                    }
                },
            },
        });

        parent.classList.add('active');
        vacanciesSliderBlock.classList.add('swiper-overflow-hidden');
        vacancies.classList.add('active');
        if (screenWidth >= 1400) {
            parentContainer.classList.add('decor', 'decor-right');
        }
    }

    const element = parent.querySelector('.js-vacancies-select');
    const specificType = element.getAttribute('data-select-type');
    const choices = new Choices(element, {
        searchEnabled: false,
        position: 'bottom',
        itemSelectText: '',
        openState: 'is-open',
        classNames: {
            containerOuter: `choices choices_${specificType}`,
        }
    });
});