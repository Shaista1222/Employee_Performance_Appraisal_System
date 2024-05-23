import IPAddress from '../../../IPAddress';

const EvaluatorService = {
  async getEvaluatees(evaluatorID, sessionID) {
    try {
      const response = await fetch(`${IPAddress}/Evaluator/GetEvaluatees?evaluatorID=${evaluatorID}&sessionID=${sessionID}`);
      if (!response.ok) {
        throw new Error('Failed to fetch evaluatees');
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Something went wrong while fetching evaluatees: ${error.message}`);
    }
  }
};

export default EvaluatorService;
