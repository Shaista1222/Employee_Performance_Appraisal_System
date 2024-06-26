import { Alert } from 'react-native';
import IPAddress from '../../../IPAddress';

export const Student = {
  getStudentSessionTeacher: async function (studentID, sessionID) {
    try {
      const response = await fetch(
        `${IPAddress}/Student/GetStudentSessionTeacher?studentID=${studentID}&sessionID=${sessionID}`
      );
      if (!response.ok) {
        Alert.alert('Failed to fetch student session teacher');
      }
      return await response.json();
    } catch (error) {
      Alert.alert(error.message);
    }
  },
  getStudentsBySection: async function (semester, section) {
    try {
      const response = await fetch(
        `${IPAddress}/Student/GetStudentsBySection?semester=${semester}&section=${section}`
      );
      if (!response.ok) {
        Alert.alert('Failed to fetch students by section and semester');
      }
      return await response.json();
    } catch (error) {
      Alert.alert(error.message);
    }
  },
  postConfidentialEvaluatorStudents: async function (confidentialEvaluatorStudents) {
    try {
      const response = await fetch(
        `${IPAddress}/Student/PostConfidentialEvaluatorStudents`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(confidentialEvaluatorStudents),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(
          `Network response was not ok: ${response.status} - ${response.statusText} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Error posting confidential evaluator students:', error);
      throw error;
    }
  },
};
