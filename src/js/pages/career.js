document.addEventListener('DOMContentLoaded', function () {
    const parent = document.querySelector('.js-vacancies-parent'),
        screenWidth = window.innerWidth,
        vacancies = parent.querySelector('.js-vacancies-content'),
        vacanciesLength = vacancies.querySelectorAll('.js-vacancies-child').length;
    let dropdowns;

    checkDropdowns();

    function checkDropdowns() {
        dropdowns = parent.querySelectorAll('.choices__list--dropdown .choices__item');

        if (dropdowns.length > 0) {
            for (let dropdown of dropdowns) {
                console.log(dropdown.innerHTML)
            }
        } else {setTimeout(checkDropdowns, 200)}
    }

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

    if (vacanciesLength > 2) {
        vacancies.classList.add('active');

        const vacanciesSlider = new Swiper(".js-vacancies-slider", {
            loop: false,
            navigation: {
                nextEl: ".vacancies__slider-next",
                prevEl: ".vacancies__slider-prev",
            },
            slidesPerView: 'auto',
        });
    }

    const element = parent.querySelector('.js-vacancies-select');
    const choices = new Choices(element, {
        searchEnabled: false,
        position: 'bottom',
        itemSelectText: '',
        openState: 'is-open',
    });


    const fileWrapper = document.querySelector('.js-file-wrapper'),
        fileInput = fileWrapper.querySelector('.js-file-input'),
        fileLabel = fileWrapper.querySelector('.js-file-label');

    console.log(fileWrapper)

    fileInput.addEventListener('change', function() {
        if (fileInput.files.length > 0) {
            fileWrapper.classList.add('complete');
            fileLabel.innerHTML = fileInput.files[0].name;
        }
    });
});