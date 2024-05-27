import { Alert } from 'react-native';
import IPAddress from '../../../IPAddress';

const QuestionaireServiceListner = {
   postQuestion:async(question)=> {
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

   getEvaluationQuestionnaire:async(questionnaireType)=> {
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
  putOptionsWeightage: async (optionWeightageList) => {
    // try {
    //   const response = await fetch(`${IPAddress}/Questionnaire/`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(optionWeightageList),
    //   });
    //   if (!response.ok) throw new Error('Failed to update options weightage');
    //   return await response.json();
    // } catch (error) {
    //   throw new Error(`Error updating options weightage: ${error.message}`);
    // }
  },
  getStudentQuestions: async () => {
    try {
      const response = await fetch(
        `${IPAddress}/Questionnaire/GetStudentQuestions`,
      );
      if (!response.ok) {
        Alert.alert('Failed to fetch Student questions');
      }
      return await response.json();
    } catch (error) {
      Alert.alert(error.message);
    }
  },
  getPeerQuestions: async () => {
    try {
      const response = await fetch(
        `${IPAddress}/Questionnaire/GetPeerQuestions`,
      );
      if (!response.ok) {
        Alert.alert('Failed to fetch peer questions');
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

  getQuestionnaireByTypeID: async questionnaireTypeID => {
    try {
      const response = await fetch(
        `${IPAddress}/Questionnaire/GetQuestionnaireByTypeId?questionnaireTypeId=${questionnaireTypeID}`,
      );
      if (!response.ok) {
        Alert.alert('Failed to fetch questionnaire by type');
      }
      return await response.json();
    } catch (error) {
      Alert.alert(error.message);
    }
  },
  getQuestionnaireByType: async questionnaireType => {
    try {
      const response = await fetch(
        `${IPAddress}/Questionnaire/GetQuestionnaireByType?questionnaireType=${questionnaireType}`,
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
