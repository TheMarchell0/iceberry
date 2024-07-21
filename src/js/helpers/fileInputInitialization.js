import {v4 as uuidv4} from 'uuid';
import {isValid} from "./createFormValidation";

export function fileInputInitialization(forms) {
    for (let form of forms) {
        const filesLists = form.querySelectorAll('.js-form-files');

        const submitButton = form.querySelector('.js-submit-button');

        submitButton.addEventListener('click', () => {
            setTimeout(() => {
                if (isValid) {
                    clearFiles(filesLists);
                }
            }, 50)
        })

        filesLists.forEach(filesList => {
            createFileInputFunctional(filesList);
        });
    }

    function clearFiles(fileLists) {
        for (let fileList of fileLists) {
            while (fileList.firstChild) {
                fileList.removeChild(fileList.firstChild);
            }
            createNewItem(fileList);
        }
    }

    function createNewItem(fileList) {
        const inputId = uuidv4().substring(0, 6),
            fileTemplate =
                `<li class="form__files-item js-files-list-item">
                        <input type="file" id="${fileList.id}-file_${inputId}"
                               class="form__files-input js-files-input js-form-input js-form-input_required" name="Прикрепленный файл">
                            <label for="${fileList.id}-file_${inputId}"
                                   class="form__files-text js-files-label">Добавить</label>
                            <span class="form__files-delete js-files-delete">X</span>
                    </li>`;

        fileList.insertAdjacentHTML('beforeend', fileTemplate);
        createFileInputFunctional(fileList);
    }

    function createFileInputFunctional(fileList) {
        const fileListItem = fileList.querySelectorAll(`.js-files-list-item`)[fileList.querySelectorAll(`.js-files-list-item`).length - 1],
            fileInput = fileListItem.querySelector('.js-files-input'),
            fileLabel = fileListItem.querySelector('.js-files-label'),
            fileDelete = fileListItem.querySelector('.js-files-delete'),
            maxLength = fileList.getAttribute('data-max-files');

        fileDelete.addEventListener('click', () => {
            const completeChildren = Array.from(fileList.children).filter(child => child.classList.contains('complete'));
            fileListItem.remove();

            if (completeChildren.length == maxLength) {
                createNewItem(fileList)
            }
        });

        fileInput.addEventListener('change', function () {
            if (fileInput.files.length > 0) {
                if (!fileListItem.classList.contains('complete')) {
                    fileListItem.classList.add('complete');
                    fileLabel.textContent = fileInput.files[0].name;
                    if (maxLength > fileList.children.length) {
                        createNewItem(fileList);
                    }
                } else {
                    fileLabel.textContent = fileInput.files[0].name;
                }

                if (fileInput.classList.contains('error')) {
                    fileInput.classList.remove('error');
                }
            }
        });
    }
}