import IPAddress from "../../../IPAddress";

EvaluationPinService = {
  async postConfidentialEvaluationPin(evaluationPin) {
    try {
      const response = await fetch(
        `${IPAddress}/EvaluationPin/postConfidentialEvaluationPin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(evaluationPin),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to post evaluation PIN');
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  },
};

export default EvaluationPinService;
