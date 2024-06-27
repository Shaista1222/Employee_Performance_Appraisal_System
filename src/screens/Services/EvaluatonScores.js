import IPAddress from '../../../IPAddress';
export default EvaluationScores= {
    async getEmployeeQuestionScore(employeeID, sessionID, evaluationTypeID) {
        try {
            const response = await fetch(`${IPAddress}/EvaluationScores/GetQuestionsScoresByEvaluationId?employeeID=${employeeID}&sessionID=${sessionID}&evaluationTypeId=${evaluationTypeID}`)
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error(`Failed to fetch scores: ${response.statusText}`);
            }
        } catch (error) {
            throw new Error(`Something went wrong while fetching scores: ${error.message}`);
        }
    },
    async getQuestionsScoresByEvaluationId(employeeID, sessionID, evaluationTypeID){
        try {
            const response = await fetch(`${IPAddress}/EvaluationScores/GetQuestionsScoresByEvaluationId?employeeID=${employeeID}&sessionID=${sessionID}&evaluationTypeId=${evaluationTypeID}`)
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error(`Failed to fetch scores: ${response.statusText}`);
            }
        } catch (error) {
            throw new Error(`Something went wrong while fetching Questions scores: ${error.message}`);
        }
    },
    async getQuestionsScores(employeeID1,employeeID2, sessionID, evaluationTypeID,courseID,){
        try {
            const response = await fetch(`${IPAddress}/EvaluationScores/GetQuestionsScores?employeeID1=${employeeID1}&employeeID2=${employeeID2}&sessionID=${sessionID}&evaluationTypeId=${evaluationTypeID}&courseID=${courseID}`)
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error(`Failed to fetch scores: ${response.statusText}`);
            }
        } catch (error) {
            throw new Error(`Something went wrong while fetching Questions scores: ${error.message}`);
        }
    },
    
}
