import IPAddress from "../../../IPAddress";

export const isEvaluated = async (studentId, teacherId, courseId, sessionId, evaluationType) => {
  try {
    const response = await fetch(`http://${IPAddress}/api/Evaluation/isEvaluated?studentId=${studentId}&teacherId=${teacherId}&courseId=${courseId}&sessionId=${sessionId}&evaluationType=${evaluationType}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseBody = await response.text();
    return responseBody === 'true'; // Assuming the response is a string 'true' or 'false'
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};


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
