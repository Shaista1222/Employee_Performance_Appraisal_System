import IPAddress from '../../../IPAddress';
class EmployeeQuestionScoreService {
  
    async getEmployeeQuestionScore(employeeID, sessionID, evaluationTypeID) {
        try {
            const response = await fetch(`${IPAddress}/EmployeeQuestionsScoreController/GetEmployeeQuestionsScore?employeeID=${employeeID}&sessionID=${sessionID}`)
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error(`Failed to fetch scores: ${response.statusText}`);
            }
        } catch (error) {
            throw new Error(`Something went wrong while fetching scores: ${error.message}`);
        }
    }
}

export default EmployeeQuestionScoreService;
