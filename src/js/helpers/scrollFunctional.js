const body = document.body,
    scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

export function scrollFunctional(action) {
    if (action === 'disable') {
        body.style.paddingRight = `${scrollbarWidth}px`;
        body.classList.add('no-scroll');
    } else {
        body.style.paddingRight = '';
        body.classList.remove('no-scroll');
    }
}