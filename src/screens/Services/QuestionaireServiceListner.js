import { Alert } from 'react-native';
import IPAddress from '../../../IPAddress';

const QuestionaireServiceListner = {
  getConfidentialQuestions: async () => {
    try {
      const response = await fetch(
        `http://${IPAddress}/api/Questionnaire/GetConfidentialQuestions`,
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
        `http://${IPAddress}/api/Questionnaire/GetOptionsWeightages`,
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
        `http://${IPAddress}/api/Questionnaire/GetStudentQuestions`,
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
        `http://${IPAddress}/api/Questionnaire/GetQuestionnaireTypes`,
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
        `http://${IPAddress}/api/Questionnaire/GetQuestionnaireByType?questionnaireTypeId=${questionnaireTypeId}`,
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
