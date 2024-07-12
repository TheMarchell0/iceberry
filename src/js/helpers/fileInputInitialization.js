import {v4 as uuidv4} from 'uuid';

export function fileInputInitialization() {
    const filesLists = document.querySelectorAll('.js-form-files');

    filesLists.forEach(filesList => {
        createFileInputFunctional(filesList);
    });

    function createFileInputFunctional(fileList) {
        const fileListItem = fileList.querySelectorAll(`.js-files-list-item`)[fileList.querySelectorAll(`.js-files-list-item`).length - 1],
            fileInput = fileListItem.querySelector('.js-files-input'),
            fileLabel = fileListItem.querySelector('.js-files-label'),
            fileDelete = fileListItem.querySelector('.js-files-delete'),
            maxLength = fileList.getAttribute('data-max-files'),
            inputId = uuidv4().substring(0, 6);

        fileDelete.addEventListener('click', () => {
            const completeChildren = Array.from(fileList.children).filter(child => child.classList.contains('complete'));
            fileListItem.remove();

            if (completeChildren.length == maxLength) {
                createNewItem()
            }
        });

        fileInput.addEventListener('change', function () {
            if (fileInput.files.length > 0) {
                if (!fileListItem.classList.contains('complete')) {
                    fileListItem.classList.add('complete');
                    fileLabel.textContent = fileInput.files[0].name;
                    if (maxLength > fileList.children.length) {
                        createNewItem();
                    }
                } else {
                    fileLabel.textContent = fileInput.files[0].name;
                }

                if (fileInput.classList.contains('error')) {
                    fileInput.classList.remove('error');
                }
            }
        });

        function createNewItem() {
            const fileTemplate =
                `<li class="form__files-item js-files-list-item">
                        <input type="file" id="${fileList.id}-file_${inputId}"
                               class="form__files-input js-files-input js-form-input">
                            <label for="${fileList.id}-file_${inputId}"
                                   class="form__files-text js-files-label">Добавить</label>
                            <span class="form__files-delete js-files-delete">X</span>
                    </li>`;

            fileList.insertAdjacentHTML('beforeend', fileTemplate);
            createFileInputFunctional(fileList);
        }
    }
}