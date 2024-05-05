// Import necessary modules and components
import {ToastAndroid, Spinner} from 'react-native';
import {useState} from 'react';
// import { Spinner } from '@ui-kitten/components'; // Import your Spinner component
import QuestionaireServiceListner from './QuestionaireServiceListner';

const QuestionnaireService = () => {
  const postQuestion = (question, onSuccess, onFailure) => {
    QuestionaireServiceListner.postQuestion(question)
      .then(response => {
        if (response.data) {
          onSuccess(response.data);
        } else {
          onFailure(response.message);
        }
      })
      .catch(error => {
        onFailure('Something went wrong while adding question');
      });
  };

  const getEvaluationQuestionnaire = (
    questionnaireType,
    onSuccess,
    onFailure,
  ) => {
    QuestionaireServiceListner.getQuestionnaireByType(questionnaireType)
      .then(response => {
        if (response.data) {
          onSuccess(response.data);
        } else {
          onFailure(response.message);
        }
      })
      .catch(error => {
        onFailure('Something went wrong while fetching questionnaire');
      });
  };

  // Implement other methods similarly

  const populateSpinner = (questionnaireTypeList, spinner) => {
    if (questionnaireTypeList && questionnaireTypeList.length > 0) {
      const titles = getQuestionnairTypeTitles(questionnaireTypeList);
      spinner.setItems(titles);
    } else {
      ToastAndroid.show('Questionnaire type list is empty', ToastAndroid.LONG);
    }
  };

  const getQuestionnairTypeTitles = questionnaireTypeList => {
    return questionnaireTypeList.map(
      questionnaireType => questionnaireType.name,
    );
  };

  return {
    postQuestion,
    getEvaluationQuestionnaire,
    // Add other methods here
    populateSpinner,
    getQuestionnairTypeTitles,
  };
};

export default QuestionnaireService;
