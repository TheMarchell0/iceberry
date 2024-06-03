document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.js-header'),
        url = window.location.href,
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
});