import IPAddress from '../../../IPAddress';
export default EvaluationService = {
  async isEvaluated(studentId, teacherId, courseId, sessionId, evaluationType) {
    try {
      const response = await fetch(
        `${IPAddress}/Evaluation/isEvaluated?studentId=${studentId}&teacherId=${teacherId}&courseId=${courseId}&sessionId=${sessionId}&evaluationType=${evaluationType}`,
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseBody = await response.text();
      return responseBody === 'true'; 
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  },

  async postStudentEvaluation(studentEvaluations) {
    try {
      const response = await fetch(
        `${IPAddress}/Evaluation/PostStudentEvaluation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(studentEvaluations),
        },
      );
      if (!response.ok) {
        console.log(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  async postDirectorEvaluation(DirectorEvaluations) {
    try {
      const response = await fetch(
        `${IPAddress}/Evaluation/PostDirectorEvaluation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(DirectorEvaluations),
        },
      );
      if (!response.ok) {
        console.log(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  async postPeerEvaluation(PeerEvaluation) {
    try {
      const response = await fetch(
        `${IPAddress}/Evaluation/PostPeerEvaluation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(PeerEvaluation),
        },
      );
      if (!response.ok) {
        console.log(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  async postSupervisorEvaluation(SupervisorEvaluation) {
    try {
      const response = await fetch(
        `${IPAddress}/Evaluation/PostSupervisorEvaluation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(SupervisorEvaluation),
        },
      );
      if (!response.ok) {
        console.log(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  async postSeniorTeacherEvaluation(SeniorTeacherEvaluation) {
    try {
      const response = await fetch(
        `${IPAddress}/Evaluation/PostSeniorTeacherEvaluation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(SeniorTeacherEvaluation),
        },
      );
      if (!response.ok) {
        console.log(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  async postDegreeExitEvaluation(DegreeExitEvaluation) {
    try {
      const response = await fetch(
        `${IPAddress}/Evaluation/PostDegreeExitEvaluation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(DegreeExitEvaluation),
        },
      );
      if (!response.ok) {
        console.log(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  async postConfidentialEvaluation(ConfidentialEvaluation) {
    try {
      const response = await fetch(
        `${IPAddress}/Evaluation/PostConfidentialEvaluation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ConfidentialEvaluation),
        },
      );
      if (!response.ok) {
        console.log(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
};
