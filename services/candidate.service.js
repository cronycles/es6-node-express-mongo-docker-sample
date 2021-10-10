import CandidateApi from "../api/candidate.api.js";
import Candidate from "../models/candidate.model.js";
import nodemailer from "nodemailer";
import emailConfig from "../email.config.js";
export default class CandidateService {
    constructor() {
        this.api = new CandidateApi();
    }

    async saveCandidate(candidateObject) {
        let outcome = {
            areThereErrors: true,
            errorGenericMessage: "errore generico",
            user: null,
        };
        try {
            let candidateToBeSaved = new Candidate({
                name: candidateObject.name,
                surname: candidateObject.surname,
                email: candidateObject.email,
                phone: candidateObject.phone,
                githubName: candidateObject.githubName,
                isMaketingAllowed: candidateObject.isMaketingAllowed,
                files: candidateObject.files,
            });

            let candidateSaved = await this.api.saveCandidate(
                candidateToBeSaved
            );

            if (candidateSaved) {
                outcome.errorGenericMessage = "";
                outcome.areThereErrors = false;
            }
            return outcome;
        } catch (e) {
            let outcome = {
                areThereErrors: true,
                errorGenericMessage: e,
                user: null,
            };
            return outcome;
        }
    }

    sendEmail(candidateObject) {
        try {
            if (emailConfig.isEnabled) {
                var transporter = nodemailer.createTransport({
                    service: emailConfig.service,
                    auth: {
                        user: emailConfig.user,
                        pass: emailConfig.pass,
                    },
                });

                var mailOptions = {
                    from: "info@koodit.com",
                    to: candidateObject.email,
                    subject: "Candidatura inviata",
                    text: "La tua candidatura è stata inviata",
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Email sent: " + info.response);
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }
    }
}
