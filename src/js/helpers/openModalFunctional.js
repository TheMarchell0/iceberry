import {isValid} from "./createFormValidation";

export function openModalFunctional() {
    const body = document.body,
        modal = document.querySelector('.js-modal'),
        triggerButtons = document.querySelectorAll('.js-modal-trigger'),
        modalWrapper = modal.querySelector('.js-modal-wrapper'),
        modalSuccess = modal.querySelector('.js-modal-success'),
        openModal = (modalType) => {
            modal.classList.add('active', 'modal-anim-open');
            lockScroll();
            modal.classList.remove('modal-anim-close');
            if (modalType === 'modal') {
                modalWrapper.classList.remove('disable');
            } else if (modalType === 'success') {
                if (modalWrapper && !modalWrapper.classList.contains('disable')) {
                    modalWrapper.classList.add('disable');
                }
                modalSuccess.classList.remove('disable');
            }
        };

    const closeButtons = modal.querySelectorAll('.js-close-modal');

    closeButtons.forEach(closeButton => {
        closeButton.addEventListener('click', () => closeModal());
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function closeModal() {
        if (modal) {
            modal.classList.replace('modal-anim-open', 'modal-anim-close');
            modal.addEventListener('animationend', () => {
                modal.classList.remove('active', 'modal-anim-close');
                unlockScroll();
                if (modalWrapper && !modalWrapper.classList.contains('disable')) {
                    modalWrapper.classList.add('disable');
                }
                modalSuccess.classList.add('disable');
            }, {once: true});
        }
    }

    function lockScroll() {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        body.style.paddingRight = `${scrollbarWidth}px`;
        body.classList.add('no-scroll');
    }

    function unlockScroll() {
        body.style.paddingRight = '';
        body.classList.remove('no-scroll');
    }

    triggerButtons.forEach(triggerButton => {
        triggerButton.addEventListener('click', () => {
            setTimeout(() => {
                if (triggerButton.classList.contains('js-submit-button')) {
                    if (isValid) {
                        openModal('success');
                    }
                } else {
                    openModal('modal');
                }
            }, 50)
        });
    });
}