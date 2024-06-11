// src/Services/QuestionsScores.js
import {Alert} from 'react-native';
import IPAddress from '../../../IPAddress';

export const getQuestionsScores = async (
  employeeID,
  sessionID,
  evaluationTypeID,
) => {
  try {
    const response = await fetch(
      `${IPAddress}/QuestionsScores/GetQuestionsScoresByEvaluationId?employeeID=${employeeID}&sessionID=${sessionID}&evaluationTypeID=${evaluationTypeID}`,
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
export const getMultiEmployeeQuestionScore = async (
  employeeIds,
  evaluationTypeId,
  sessionId,
) => {
  try {
    const payload = {
      employeeIds,
      evaluationTypeId,
      sessionId,
    };
    console.log(
      'Sending request to:',
      `${IPAddress}/QuestionsScores/GetMultiEmployeeQuestionsScores`,
    );
    console.log('Payload:', payload);

    const response = await fetch(
      `${IPAddress}/QuestionsScores/GetMultiEmployeeQuestionsScores`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      console.error('Response status:', response.status);
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      'Error fetching employee Multiple question performance:',
      error,
    );
    throw error;
  }
};
