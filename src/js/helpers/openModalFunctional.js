import {scrollFunctional} from "./scrollFunctional";

const modal = document.querySelector('.js-modal'),
    triggerButtons = document.querySelectorAll('.js-modal-trigger'),
    modalWrapper = modal.querySelector('.js-modal-wrapper'),
    modalSuccess = modal.querySelector('.js-modal-success'),
    closeButtons = modal.querySelectorAll('.js-close-modal');

export function openModalFunctional() {
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

    triggerButtons.forEach(triggerButton => {
        triggerButton.addEventListener('click', () => {
            openModal('modal');
        });
    });

    function closeModal() {
        if (modal) {
            modal.classList.replace('modal-anim-open', 'modal-anim-close');
            modal.addEventListener('animationend', () => {
                modal.classList.remove('active', 'modal-anim-close');
                scrollFunctional('enable');
                if (modalWrapper && !modalWrapper.classList.contains('disable')) {
                    modalWrapper.classList.add('disable');
                }
                modalSuccess.classList.add('disable');
            }, {once: true});
        }
    }
}

export function openModal(modalType) {
    modal.classList.add('active', 'modal-anim-open');
    scrollFunctional('disable');
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