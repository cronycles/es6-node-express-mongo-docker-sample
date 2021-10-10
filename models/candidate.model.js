import mongoose from 'mongoose';

class Candidate extends mongoose.Schema {
    constructor() {
        const candidate = super({
            name: String,
            surname: String,
            email: String,
            phone: String,
            githubName: String,
            isMaketingAllowed: Boolean,
            files: Array
        });

        return candidate;
    }
}

export default mongoose.model("Candidate", new Candidate());
