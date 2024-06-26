import IPAddress from '../../../IPAddress';
export default EmployeeQuestionScoreService= {
  
    async getEmployeeQuestionScore(employeeID, sessionID, evaluationTypeID) {
        try {
            const response = await fetch(`${IPAddress}/EmployeeQuestionsScore/GetEmployeeQuestionsScore?employeeID=${employeeID}&sessionID=${sessionID}`)
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


