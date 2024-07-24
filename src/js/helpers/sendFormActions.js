import {scrollFunctional} from "./scrollFunctional";
import {openModal} from "./openModalFunctional";
import {clearFormFields} from "./createFormValidation";
import {clearFiles} from "./fileInputInitialization";

export function sendFormActions(form, success = true) {
    form.classList.remove('load');
    if (success) {
        const inputs = form.querySelectorAll('.js-form-input'),
            filesLists = form.querySelectorAll('.js-form-files');

        openModal('success');
        clearFormFields(inputs);
        clearFiles(filesLists);
        scrollFunctional('disable');
    }
}