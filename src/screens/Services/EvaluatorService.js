import {Alert} from 'react-native';
import IPAddress from '../../../IPAddress';

const EvaluatorService = {
  async getEvaluatees(evaluatorID, sessionID) {
    try {
      const response = await fetch(
        `${IPAddress}/Evaluator/GetEvaluatees?evaluatorID=${evaluatorID}&sessionID=${sessionID}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch evaluatees');
      }
      return await response.json();
    } catch (error) {
      throw new Error(
        `Something went wrong while fetching evaluatees: ${error.message}`,
      );
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
        throw new Error(response.statusText);
      }

      const data = await response.json();
      Alert('Evaluator added successfully');
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default EvaluatorService;
