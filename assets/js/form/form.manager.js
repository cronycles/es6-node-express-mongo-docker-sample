import FormFieldModel from "./form.field.model.js";
import FormManagerView from "./form.manager.view.js";
import FormValidator from "./form.validator.js";

export default class FormManager {
    constructor() {
        this.view = new FormManagerView();
        this.validator = new FormValidator();
        this.view.enableDragAndDropArea();
        this.formFields = [
            new FormFieldModel({ name: "name" }),
            new FormFieldModel({ name: "surname" }),
            new FormFieldModel({
                name: "email",
                type: "email",
                invalidTextError: "L'indirizzo email inserito non è valido",
            }),
            new FormFieldModel({
                name: "tel",
                type: "tel",
                invalidTextError: "Il numero di telefono non è valido",
            }),
            new FormFieldModel({ name: "usernameGitHub" }),
            new FormFieldModel({ name: "marketing", type: "checkbox" }),
            new FormFieldModel({ name: "trattamento-cv", type: "checkbox" }),
            new FormFieldModel({ name: "file", type: "file" }),
        ];

        this.view.onChangeCVAuthorizationCheckbox((isChecked)=> {
            if(isChecked) {
                this.view.enableForm();
            }
            else {
                this.view.disableForm();
            }
        });

        this.view.onSubmitForm(async () => {
            this.view.resetForm();
            let formFieldsWithValues = this.view.setValuesToFormFields(
                this.formFields
            );
            let validationResult =
                this.validator.validateForm(formFieldsWithValues);
            if (validationResult.areThereErrors) {
                this.view.showErrors(validationResult);
            } else {
                await this.sendForm(formFieldsWithValues);
            }
        });
    }
    sendForm = async (formFieldsWithValues) => {
        try {
            let validationResult = await $.ajax({
                type: "POST",
                url: "/carriera/lead-web-developer",
                contentType: "application/json",
                data: JSON.stringify(formFieldsWithValues),
            });
            if (validationResult.areThereErrors) {
                this.view.showErrors(validationResult);
            } else {
                this.view.showOk();
            }
        } catch (e) {
            this.view.showErrors(null, true);
        }
    };
}
