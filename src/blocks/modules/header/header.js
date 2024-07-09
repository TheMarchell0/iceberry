document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.js-header'),
        url = window.location.href,
        menuItems = document.querySelectorAll('.js-menu-item'),
        triggerButton = header.querySelector('.js-trigger-mobile-menu'),
        mobileMenu = header.querySelector('.js-mobile-menu'),
        container = header.querySelector('.js-header-container'),
        brands = ['filevskoe',
            'vologodskiy-plombir',
            'jemchujina-rossii',
            'ot-deda-moroza',
            'vkuslandia'
        ];

    const brandTheme = brands.find(brand => url.includes(`/brands/${brand}`))?.split('/').pop();

    if (brandTheme) {
        header.classList.add(brandTheme);
    }

    for (let menuItem of menuItems) {
        const link = menuItem.querySelector('a').getAttribute('href').replace(/^\//, ''),
            modifyUrl = url.substring(url.indexOf('/', 8)).replace(/^\//, '');
        if (modifyUrl === link) {
            menuItem.classList.add('active')
        }
    }

    triggerButton.addEventListener('click', () => {
        container.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        triggerButton.classList.toggle('open');
    })
});