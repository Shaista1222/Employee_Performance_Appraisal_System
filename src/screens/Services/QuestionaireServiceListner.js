import { Alert } from 'react-native';
import IPAddress from '../../../IPAddress';

const QuestionaireServiceListner = {
  getConfidentialQuestions: async () => {
    try {
      const response = await fetch(
        `${IPAddress}/Questionnaire/GetConfidentialQuestions`,
      );
      if (!response.ok) {
        Alert.alert('Failed to fetch confidential questions');
      }
      return await response.json();
    } catch (error) {
      Alert.alert(error.message);
    }
  },
  getOptionsWeightages: async () => {
    try {
      const response = await fetch(
        `${IPAddress}/Questionnaire/GetOptionsWeightages`,
      );
      if (!response.ok) {
        Alert.alert('Failed to fetch confidential questions');
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getStudentQuestions: async () => {
    try {
      const response = await fetch(
        `${IPAddress}/Questionnaire/GetStudentQuestions`,
      );
      if (!response.ok) {
        Alert.alert('Failed to fetch confidential questions');
      }
      return await response.json();
    } catch (error) {
      Alert.alert(error.message);
    }
  },
  getQuestionnaireTypes: async () => {
    try {
      const response = await fetch(
        `${IPAddress}/Questionnaire/GetQuestionnaireTypes`,
      );
      if (!response.ok) {
        Alert.alert('Failed to fetch questionnaire types');
      }
      return await response.json();
    } catch (error) {
      Alert.alert(error.message);
    }
  },

  getQuestionnaireByType: async questionnaireTypeId => {
    try {
      const response = await fetch(
        `${IPAddress}/Questionnaire/GetQuestionnaireByType?questionnaireTypeId=${questionnaireTypeId}`,
      );
      if (!response.ok) {
        Alert.alert('Failed to fetch questionnaire by type');
      }
      return await response.json();
    } catch (error) {
      Alert.alert(error.message);
    }
  },
};

export default QuestionaireServiceListner;
