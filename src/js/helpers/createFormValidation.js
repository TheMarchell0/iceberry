export let isValid = false;

export function createFormValidation(forms) {
    for (let form of forms) {
        const submitButton = form.querySelector('.js-submit-button'),
            dateInputs = form.querySelectorAll('.js-date-input');
        let inputs = form.querySelectorAll('.js-form-input'),
            deleteButtons = form.querySelectorAll('.js-files-delete');

        function removeEventListeners(inputs, deleteButtons) {
            for (let input of inputs) {
                if (input.classList.contains('js-files-input')) {
                    input.removeEventListener('change', refreshFileInputs);
                }
            }

            for (let deleteButton of deleteButtons) {
                deleteButton.removeEventListener('click', refreshFileInputs);
            }
        }


        function refreshFileInputs() {
            removeEventListeners(inputs, deleteButtons);
            inputs = form.querySelectorAll('.js-form-input');
            deleteButtons = form.querySelectorAll('.js-files-delete');
            for (let input of inputs) {
                if (input.classList.contains('js-files-input')) {
                    input.addEventListener('change', refreshFileInputs);
                }
            }
            for (let deleteButton of deleteButtons) {
                deleteButton.addEventListener('click', refreshFileInputs);
            }
        }

        function validateEmail(email) {
            const emailRegex = /\S+@\S+\.\S+/;
            return emailRegex.test(email);
        }

        function validateFile(fileInput) {
            console.log(fileInput)
            const fileInputLength = Array.from(inputs).filter(input => input.classList.contains('js-files-input')).length;
            const validate = fileInputLength === 1 && fileInput.files.length === 0;
            return validate;
        }

        function validatePhone(phoneInput) {
            const phoneRegex = /^(\+7 \(\d{3}\) \d{3}-\d{2}-\d{2})$/;
            return phoneRegex.test(phoneInput)
        }

        function validateInput(input) {
            const isEmailInput = input.classList.contains('js-email-input');
            const isFileInput = input.classList.contains('js-files-input');
            const isPhoneInput = input.classList.contains('js-phone-input');
            const value = input.value.trim();
            const isEmpty = value === '';
            input.classList.remove('error', 'email-error');

            if (isEmpty && !isFileInput) {
                input.classList.add('error');
            } else {
                input.classList.add('touched');

                if (isEmailInput && !validateEmail(value)) {
                    input.classList.add('error', 'email-error');
                }

                if (isFileInput && validateFile(input)) {
                    input.classList.add('error', 'file-error');
                }

                if (isPhoneInput && !validatePhone(value)) {
                    input.classList.add('error', 'phone-error');
                }
            }
        }

        function checkAllFieldsValid() {
            const allValid = Array.from(inputs).every((input) => {
                return !input.classList.contains('error') && !input.classList.contains('email-error');
            });

            if (allValid) {
                // Объект для отправки данных
                /*var formData = {};
                inputs.forEach((input) => {
                    const field = input.querySelector('.modal__form-input');
                    formData[field.name] = field.value;
                });
                fetch('https://script.google.com/macros/s/AKfycbzWtnv7MOYlXeUUGwSiv06WfFLTfmo-0N0IAowCCKn8kSWaqx_cS6YIzwhneQ4YhqX5/exec', {
                    method: 'POST',
                    body: new URLSearchParams(formData).toString(),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    mode: 'cors'
                })
                    .then(response => response.text())
                    .then(result => {
                        successMessage.classList.remove('hidden');
                        formContent.classList.add('hidden');
                        clearFormFields();
                        console.log('Success:', result);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });*/
            }

            return allValid;
        }

        function clearFormFields() {
            inputs.forEach((input) => {
                input.value = '';
                input.classList.remove('touched');
            });
        }

        submitButton.addEventListener('click', (e) => {
            e.preventDefault();

            inputs.forEach(input => {
                validateInput(input);
            });

            if (checkAllFieldsValid()) {
                isValid = true;
                clearFormFields();
                setTimeout(() => isValid = false, 1000) // TODO: убрать таймаут, переместить в fetch при успешной отправке данных
                setTimeout(()=> {
                    refreshFileInputs();
                }, 50)
            }
        });

        inputs.forEach((input) => {
            input.addEventListener('input', () => {
                validateInput(input);

                if (input.classList.contains('js-files-input')) {
                    refreshFileInputs()
                }
            });

            input.addEventListener('change', () => {
                input.classList.add('touched');
            });
        });

        for (let dateInput of dateInputs) {
            dateInput.addEventListener('input', function (e) {
                let input = e.target.value;
                if (/^\d{2}\.\d{2}\.\d{4}$/.test(input)) {
                    let parts = input.split('.');
                    let day = parseInt(parts[0], 10);
                    let month = parseInt(parts[1], 10);
                    let year = parseInt(parts[2], 10);

                    if (month > 12) {
                        month = 12;
                    }

                    let currentYear = new Date().getFullYear();
                    if (year > currentYear || year < 2005) {
                        year = currentYear;
                    }

                    let daysInMonth = new Date(year, month, 0).getDate();
                    if (day > daysInMonth) {
                        day = daysInMonth;
                    }

                    input = `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;
                } else {
                    input = input.replace(/\D/g, '').substring(0, 8);
                    input = input.replace(/(\d{2})(\d)/, '$1.$2');
                    input = input.replace(/(\d{2})(\d)/, '$1.$2');
                }

                e.target.value = input;
            });
        }
    }
}

export default createFormValidation;
