import DragAndDropArea from "./drag.and.drop.js";

export default class FormManagerView {
    constructor() {
        this.formSelector = "#user-form";
        this.dragAndDropArea = null;
    }

    enableDragAndDropArea = () => {
        this.dragAndDropArea = new DragAndDropArea();
    }

    onChangeCVAuthorizationCheckbox = (callback) => {
        $(`input[name=trattamento-cv]`)
            .off("change")
            .on("change", function (e) {
                e.preventDefault();
                callback(this.checked);
            });
    };

    enableForm = () => {
        $(':input[type="submit"]').prop("disabled", false);
    };

    disableForm = () => {
        $(':input[type="submit"]').prop("disabled", true);
    };

    onSubmitForm = (callback) => {
        $(this.formSelector)
            .off("submit")
            .on("submit", function (e) {
                e.preventDefault();
                callback();
            });
    };

    resetForm = () => {
        $(".not-valid").hide();
        $(".general-error").hide();
        $(".generic-error").hide();
        $(".form-ok").hide();
    };

    setValuesToFormFields = (formFields) => {
        formFields.forEach((formField) => {
            let inputValue = "";
            if(formField.type == "checkbox") {
                inputValue = $(`input[name=${formField.name}]`).prop("checked") ? "1" : "0";
            }
            else if(formField.type == "file") {
                inputValue = this.dragAndDropArea.files;
            }
            else {
                inputValue = $(`input[name=${formField.name}]`).val();
            }
            formField.value = inputValue;
        });
        return formFields;
    };

    showErrors = (validationResult, isGeneric = false) => {
        if(isGeneric || !validationResult.fieldsWithError) {
            $(".generic-error").show();
        }
        else {
            $(".general-error").show();
            const fieldsWithError = validationResult.fieldsWithError;
            fieldsWithError.forEach((fieldWithError) => {
                const fieldName = fieldWithError.name;
                const $input = $(`input[name=${fieldName}]`);
                const $errorTextDiv = $input.nextAll('.not-valid:first');
                $errorTextDiv.html(fieldWithError.errorText);
                $errorTextDiv.show();
            });
        }
    };

    showOk = () => {
        this.resetForm();
        $(".form-ok").show();
    };
}
