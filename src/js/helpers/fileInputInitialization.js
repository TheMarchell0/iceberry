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
        console.log('stalo: '+maxLength+' '+fileList.children.length)

        fileDelete.addEventListener('click', () => {
            if (fileList.children.length > 1 && fileList.children.length <= maxLength) {
                console.log('bolwe 1 i menshe 4')
                fileListItem.remove();
            }
            else if (maxLength == fileList.children.length) {
                console.log('4')
            }
            else {
                console.log('1')
                fileListItem.classList.remove('complete');
                fileLabel.textContent = 'Добавить'
                fileInput.value = '';
            }
        });

        fileInput.addEventListener('change', function () {
            console.log('bilo: '+maxLength+' '+fileList.children.length)
            if (fileInput.files.length > 0) {
                fileListItem.classList.add('complete');
                fileLabel.textContent = fileInput.files[0].name;
                if (maxLength > fileList.children.length) {
                    const fileTemplate =
                        `<li class="form__files-item js-files-list-item">
                        <input type="file" id="${fileList.id}-file_${inputId}"
                               class="form__files-input js-files-input">
                            <label for="${fileList.id}-file_${inputId}"
                                   class="form__files-text js-files-label">Добавить</label>
                            <span class="form__files-delete js-files-delete">X</span>
                    </li>`;

                    fileList.insertAdjacentHTML('beforeend', fileTemplate);
                    createFileInputFunctional(fileList);
                }
            }
        });
    }
}