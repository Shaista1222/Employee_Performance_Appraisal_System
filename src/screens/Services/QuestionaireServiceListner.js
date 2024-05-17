import { Alert } from 'react-native';
import IPAddress from '../../../IPAddress';

const QuestionaireServiceListner = {
  async postQuestion(question) {
    try {
      const response = await fetch(`${IPAddress}/Questionnaire/postQuestion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(question),
      });
      if (!response.ok) {
        throw new Error('Failed to post question');
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to post question');
    }
  },

  async getEvaluationQuestionnaire(questionnaireType) {
    try {
      const response = await fetch(`${IPAddress}/Questionnaire/questionnaire/${questionnaireType}`);
      if (!response.ok) {
        throw new Error('Failed to fetch questionnaire');
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch questionnaire');
    }
  },

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
  getQuestionnairTypeTitles(questionnaireTypeList) {
    return questionnaireTypeList.map(type => type.name);
  }
};

export default QuestionaireServiceListner;
