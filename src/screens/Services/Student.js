import {Alert} from 'react-native';
import IPAddress from '../../../IPAddress';

export const Student = {
  async getStudentSessionTeacher(studentID, sessionID) {
    try {
      const response = await fetch(
        `${IPAddress}/Student/GetStudentSessionTeacher?studentID=${studentID}&sessionID=${sessionID}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      return await response.json();
    } catch (error) {
      Alert(error.message);
    }
  },
};
