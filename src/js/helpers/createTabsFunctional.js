export function createTabsFunctional() {
    const tabs = document.querySelectorAll('.js-tab'),
        tabForms = document.querySelectorAll('.js-tab-form');

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
}