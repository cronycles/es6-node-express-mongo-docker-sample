export default class FormValidator {
    constructor() {
        
    }

    validateForm = (formFields) => {
        let outcome = { areThereErrors: false, fieldsWithError: [] };

        formFields.forEach((formField) => {
            const formFieldName = formField.name;
            const formFieldValue = formField.value;
            if (formField.isRequired && (!formFieldValue || formFieldValue.length == 0)) {
                outcome.areThereErrors = true;
                outcome.fieldsWithError.push({
                    name: formFieldName,
                    errorText: formField.isRequiredErrorText,
                });
            } else {
                const formFieldType = formField.type;
                let isValid = true;
                switch (formFieldType) {
                    case "tel":
                        isValid = this.validatePhone(formFieldValue);
                        break;
                    case "email":
                        isValid = this.validateEmail(formFieldValue);
                        break;
                }
                if (!isValid) {
                    outcome.areThereErrors = true;
                    outcome.fieldsWithError.push({
                        name: formFieldName,
                        errorText: formField.invalidTextError,
                    });
                }
            }
        });

        return outcome;
    };

    validatePhone = (phone) => {
        const re =
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return re.test(phone);
    };

    validateEmail = (email) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    validateFile = (file) => {
        let outcome = true;
        if (file.type != 'application/pdf' ) {
            outcome = false;
        }
        if (file.size > 1572864) {
            outcome = false;
        }
        return outcome;
    }
}
