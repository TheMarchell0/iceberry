import {sendFormActions} from "./sendFormActions";

const scriptID = 'AKfycbxk11_wxwQhCUF8oaECdcvzB17M8ukvnWi6QgRYGXdiOQ5hAnydd49IMtnCRYKbsnHE';


export function sendForm(form, inputs, refreshFileInputs) {
    form.classList.add('load');

    let formData = new FormData(),
        uploadFiles = [],
        promiseList = [],
        formType = form.getAttribute('data-send-to');

    inputs.forEach((input) => {
        if (input.type === 'file' && input.files.length > 0) {
            const file = input.files[0];
            const fr = new FileReader();
            let promise = new Promise((resolve) => {
                fr.onload = (event) => {
                    try {
                        let fileInfo = {
                            fileArray: [...new Int8Array(event.target.result)],
                            filename: file.name,
                            mimeType: file.type,
                        };
                        uploadFiles.push(fileInfo);
                        resolve();
                    } catch (error) {
                        console.error('Ошибка при обработке файла:', error);
                        resolve();
                    }
                };

                fr.onerror = () => {
                    console.error('Ошибка чтения файла:', file.name);
                    resolve();
                };

                fr.readAsArrayBuffer(file);
            });
            promiseList.push(promise);
            
        } else if (input.type !== 'file') {
            formData.append(input.name, input.value);
        }
    });

    formData.append('Sheet', formType);
    Promise.all(promiseList).then(() => {
        formData.append('files', JSON.stringify(uploadFiles));
        fetch(`https://script.google.com/macros/s/${scriptID}/exec`, {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    // Неуспешный ответ
                    throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
                }
            })
            .then(result => {
                sendFormActions(form);
                refreshFileInputs();
            })
            .catch(error => {
                sendFormActions(form,false);
            });
    });
}