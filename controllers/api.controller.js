import FormValidator from "../assets/js/form/form.validator.js";
import CandidateEntity from "../entities/candidate.entity.js";
import CandidateService from "../services/candidate.service.js";
export default class ApiController {
    constructor() {
        this.candidateService = new CandidateService();
        this.validator = new FormValidator();
    }

    saveCandidateData = async (req, res) => {
        let response = {
            areThereErrors: true,
            errorGenericMessage:
                "C'è stato un errore nel salvataggio, riprova piú tardi",
        };
        try {
            let formFieldsWithValues = req.body;
            let validationResult = null;
            if (formFieldsWithValues && formFieldsWithValues.length > 0) {
                validationResult =
                    this.validator.validateForm(formFieldsWithValues);
            }
            if (validationResult && !validationResult.areThereErrors) {
                let savingResult = await this.saveCandidate(formFieldsWithValues);
                if (!savingResult.areThereErrors) {
                    response = validationResult;
                }
            } else {
                response = validationResult;
            }
        } catch (e) {
            console.log(e);
            response = {
                areThereErrors: true,
                errorGenericMessage:
                    "C'è stato un errore nel salvataggio, riprova piú tardi",
            };
        }

        return res.status(201).json(response);
    };

    async saveCandidate(formFieldsWithValues) {
        let candidate = new CandidateEntity();
        formFieldsWithValues.forEach((formField) => {
            switch (formField.name) {
                case "name":
                    candidate.name = formField.value;
                    break;
                case "surname":
                    candidate.surname = formField.value;
                    break;
                case "email":
                    candidate.email = formField.value;
                    break;
                case "tel":
                    candidate.phone = formField.value;
                    break;
                case "usernameGitHub":
                    candidate.githubName = formField.value;
                    break;
                case "marketing":
                    candidate.isMaketingAllowed = formField.value;
                    break;
                case "file":
                    candidate.files = formField.value;
                    break;
                default:
                    break;
            }
        });
        let outcome =  await this.candidateService.saveCandidate(candidate);
        if (!outcome.areThereErrors) {
            this.candidateService.sendEmail(candidate);
        }
        return outcome;
    }
}
