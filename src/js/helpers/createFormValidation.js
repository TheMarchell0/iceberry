import {sendForm} from "./sendForm";

const maxFileSize = 5 * 1024 * 1024,
    phoneRegex = /^(\+7 \(\d{3}\) \d{3}-\d{2}-\d{2})$/,
    emailRegex = /\S+@\S+\.\S+/,
    allowedFormats = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'txt', 'xls', 'xlsx', 'csv', 'ppt', 'pptx', 'mp3', 'wav', 'mp4', 'avi', 'mov'];

export function createFormValidation(forms) {
    for (let form of forms) {
        const submitButton = form.querySelector('.js-submit-button'),
            dateInputs = form.querySelectorAll('.js-date-input');
        let inputs = form.querySelectorAll('.js-form-input'),
            deleteButtons = form.querySelectorAll('.js-files-delete');

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
            return emailRegex.test(email);
        }


        function validateFile(fileInput) {
            const fileInputLength = Array.from(inputs).filter(input => input.classList.contains('js-files-input')).length;
            const firstItemEmpty = fileInputLength == 1 && fileInput.files.length === 0;

            if (firstItemEmpty) { //Если не прикреплено ни одного файла, то валидация провалена
                return false;
            }

            if (!firstItemEmpty && fileInput.files.length === 0) { // Если хотя бы один файл прикреплен и проходит валидацию, то убираем проверку для оставшегося пустого инпута с текстом "Добавить"
                return true;
            }

            const file = fileInput.files[0];
            const fileExtension = file.name.split('.').pop().toLowerCase();

            if (!allowedFormats.includes(fileExtension)) {
                alert('Недопустимый формат файла. Пожалуйста, прикрепите файл в одном из допустимых форматов.');
                return false;
            }

            if (file.size > maxFileSize) {
                alert('Размер одного из прикреплённых файлов превышает максимально допустимый.')
                return false; // Если размер файла превышает максимальный размер, возвращаем false
            }

            return true; // Все проверки пройдены, файл валиден
        }

        function validatePhone(phoneInput) {
            return phoneRegex.test(phoneInput)
        }

        function validateInput(input) {
            if (input.classList.contains('js-form-input_required')) {
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

                    if (isFileInput && !validateFile(input)) {
                        input.classList.add('error', 'file-error');
                    }
                    if (isPhoneInput && !validatePhone(value)) {
                        input.classList.add('error', 'phone-error');
                    }
                }
            }
        }

        function checkAllFieldsValid() {
            const allValid = Array.from(inputs).every((input) => {
                return !input.classList.contains('error') && !input.classList.contains('email-error');
            });

            if (allValid) {
                sendForm(form, inputs, refreshFileInputs);
            }
        }

        submitButton.addEventListener('click', (e) => {
            e.preventDefault();

            inputs.forEach(input => {
                validateInput(input);
            });

            checkAllFieldsValid();
        });
    }
}

export function clearFormFields(inputs) {
    inputs.forEach((input) => {
        input.value = '';
        input.classList.remove('touched');
    });
}
