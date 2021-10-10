export default class FormFieldModel {
    constructor (model) {
        this.name = model.name;
        this.type = model.type || "text";
        this.isRequired = model.isRequired || true;
        this.isRequiredErrorText = model.isRequiredErrorText || "Il campo è richiesto";
        this.invalidTextError = model.invalidTextError || "il testo inserito non è valido";
        this.value = "";
      }
}