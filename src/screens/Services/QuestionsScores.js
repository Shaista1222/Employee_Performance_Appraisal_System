// src/Services/QuestionsScores.js
import { Alert } from 'react-native';
import IPAddress from '../../../IPAddress';

const getQuestionsScores = async (employeeID, sessionID, evaluationTypeID) => {
  try {
    const response = await fetch(
      `${IPAddress}/QuestionsScores/GetQuestionsScoresByEvaluationId?employeeID=${employeeID}&sessionID=${sessionID}&evaluationTypeID=${evaluationTypeID}`
    );
    if (!response.ok) {
      Alert.alert('Network response was not ok');
      return;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default {
  getQuestionsScores,
};
