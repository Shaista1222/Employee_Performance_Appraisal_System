import IPAddress from "../../IPAddress";

export const postStudentEvaluation = async (studentEvaluations) => {
  try {
    const response = await fetch(`http://${IPAddress}/api/Evaluation/PostStudentEvaluation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentEvaluations),
    });
    if (!response.ok) {
      console.log(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
