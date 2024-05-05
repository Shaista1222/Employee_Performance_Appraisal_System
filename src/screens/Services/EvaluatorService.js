import IPAddress from '../../../IPAddress';
export default class EvaluatorService {

    async getEvaluatees(evaluatorID, sessionID) {
      try {
        const response = await fetch(`http://${IPAddress}/api/Evaluator/evaluatees?evaluatorID=${evaluatorID}&sessionID=${sessionID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch evaluatees');
        }
        return await response.json();
      } catch (error) {
        throw new Error(`Something went wrong while fetching evaluatees: ${error.message}`);
      }
    }
  }
  