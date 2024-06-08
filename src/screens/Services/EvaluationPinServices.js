import IPAddress from '../../../IPAddress';
//don't
const EvaluationPinService = {
  postConfidentialEvaluationPin: async (pin, sessionID) => {
    try {
      const response = await fetch(
        `${IPAddress}/EvaluationPin/PostConfidentialEvaluationPin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pin,
            sessionID,
          }),
        },
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          `Server error: ${errorResponse.message || response.status}`,
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching pin:', error.message);
      throw error;
    }
  },
};

export default EvaluationPinService;
