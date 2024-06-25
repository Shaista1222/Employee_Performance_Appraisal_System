import { Alert } from 'react-native';
import IPAddress from '../../../IPAddress';

const EvaluatorService = {
  async getEvaluatees(evaluatorID, sessionID) {
    try {
      const response = await fetch(
        `${IPAddress}/Evaluator/GetEvaluatees?evaluatorID=${evaluatorID}&sessionID=${sessionID}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch evaluatees');
      }
      return await response.json();
    } catch (error) {
      Alert.alert('Error', `Something went wrong while fetching evaluatees: ${error.message}`);
      throw error; // Ensure the error is propagated
    }
  },
    async getEvaluators(employeeID,evaluationTypeID,sessionID ,courseID) {
      try {
        const response = await fetch(
          `${IPAddress}/Evaluator/GetEvaluatees?employeeID=${employeeID}&evaluationTypeID=${evaluationTypeID}&sessionID=${sessionID}&courseID=${courseID}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch evaluators');
        }
        return await response.json();
      } catch (error) {
        Alert.alert('Error', `Something went wrong while fetching evaluators: ${error.message}`);
        throw error; 
      }
    },
  
  async postEvaluator(evaluatorEvaluatees) {
    try {
      const response = await fetch(`${IPAddress}/Evaluator/PostEvaluator`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(evaluatorEvaluatees),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      Alert.alert('Success', 'Evaluator added successfully');
      return data;
    } catch (error) {
      Alert.alert('Error', `Failed to save evaluator evaluates: ${error.message}`);
      throw error;
    }
  },
};

export default EvaluatorService;
