export default class CandidateApi {
    constructor() {}

    async saveCandidate(candidate) {
        try {
            return await candidate.save(candidate);
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
