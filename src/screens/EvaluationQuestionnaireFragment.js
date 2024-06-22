import React, {useState, useEffect} from 'react';
import {View, Text, Button, Alert, FlatList, StyleSheet} from 'react-native';
import QuestionaireServiceListner from './Services/QuestionaireServiceListner';
import EvaluationQuestionnaireAdapter from './Adapter/EvaluationQuestionnaireAdapter';
import EvaluationService from './Services/EvaluationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EvaluationQuestionnaireFragment = ({route}) => {
  const {evaluateeID, questionByType, courseID, teacherId} = route.params;
  const [questionsList, setQuestionsList] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [sessionID, setSessionId] = useState('');
  const [studentID, setStudentId] = useState('');
  const [employeeID, setEmployeeId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching questions for type:', questionByType);
        const questions =
          await QuestionaireServiceListner.getQuestionnaireByType(
            questionByType,
          );
        setQuestionsList(questions);
        console.log('Fetched questions:', questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
        Alert.alert(
          'Error',
          'Failed to fetch questions. Please try again later.',
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [questionByType]);

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const sessionData = await AsyncStorage.getItem('currentSession');
        const user = await AsyncStorage.getItem('employee');
        console.log('Retrieved data from AsyncStorage', {sessionData, user});

        if (sessionData && user) {
          const parsedSessionData = JSON.parse(sessionData);
          const parsedUser = JSON.parse(user);

          setSessionId(parsedSessionData);
          setEmployeeId(parsedUser);

          console.log('Parsed Data', {parsedSessionData, parsedUser});
        } else {
          console.log('Data not found in AsyncStorage', {sessionData, user});
          Alert.alert('Error', 'session or employee ID not found');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
        console.error('Error retrieving data:', error);
      }
    };
    retrieveData();
    retrieveStudentData();
  }, []);

  const retrieveStudentData = async () => {
    try {
      const studentUser = await AsyncStorage.getItem('userObject');

      if (studentUser) {
        const parsedStudent = JSON.parse(studentUser);
        setStudentId(parsedStudent);

        console.log('Parsed Data', {parsedStudent});
      } else {
        console.log('Data not found in AsyncStorage');
        Alert.alert('Error', 'Student ID not found');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error('Error retrieving data:', error);
    }
  };

  const handleAnswerSelection = (questionId, answer) => {
    setSelectedAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const areAllQuestionsAnswered = () => {
    return questionsList.every(question =>
      selectedAnswers.hasOwnProperty(question.id),
    );
  };

  const calculateScore = (selectedOption, optionWeightage) => {
    const selectedOptionData = optionWeightage.find(
      option => option.name === selectedOption,
    );
    return selectedOptionData ? selectedOptionData.weightage : 0;
  };

  const handleStudentEvaluation = async () => {
    try {
      await retrieveStudentData();
      const optionWeightage =
        await QuestionaireServiceListner.getOptionsWeightages();
      const studentEvaluations = questionsList.map(item => {
        const selectedOption = selectedAnswers[item.id];
        const score = calculateScore(selectedOption, optionWeightage);
        return {
          student_id: studentID.id,
          session_id: sessionID.id,
          teacher_id: evaluateeID,
          question_id: item.id,
          score,
          course_id: courseID,
        };
      });
      console.log(studentEvaluations);
      const evaluate = await EvaluationService.postStudentEvaluation(
        studentEvaluations,
      );
      if (evaluate) {
        Alert.alert('Successfully Evaluated');
      }
      console.log('Evaluation response:', evaluate);
      setSelectedAnswers({});
    } catch (err) {
      console.error('Error during student evaluation:', err);
    }
  };

  const handleDegreeExitEvaluation = async () => {
    try {
      await retrieveStudentData();
      const optionWeightage =
        await QuestionaireServiceListner.getOptionsWeightages();
      const studentEvaluations = questionsList.map(item => {
        const selectedOption = selectedAnswers[item.id];
        const score = calculateScore(selectedOption, optionWeightage);
        return {
          student_id: studentID.id,
          supervisor_id: evaluateeID,
          question_id: item.id,
          session_id: sessionID.id,
          score,
        };
      });
      console.log(studentEvaluations);
      const evaluate = await EvaluationService.postDegreeExitEvaluation(
        studentEvaluations,
      );
      if (evaluate) {
        Alert.alert('Successfully Evaluated');
      }
      console.log('Evaluation response:', evaluate);
      setSelectedAnswers({});
    } catch (err) {
      console.error('Error during student evaluation:', err);
    }
  };

  const handleDirectorEvaluation = async () => {
    try {
      const optionWeightage =
        await QuestionaireServiceListner.getOptionsWeightages();
      const directorEvaluations = questionsList.map(item => {
        const selectedOption = selectedAnswers[item.id];
        const score = calculateScore(selectedOption, optionWeightage);
        return {
          evaluator_id: studentID.id,
          session_id: sessionID.id,
          evaluatee_id: evaluateeID,
          question_id: item.id,
          score,
        };
      });
      const evaluate = await EvaluationService.postDirectorEvaluation(
        directorEvaluations,
      );
      if (evaluate) {
        Alert.alert('Successfully Evaluated');
      }
      console.log('Evaluation response:', evaluate);
      setSelectedAnswers({});
    } catch (err) {
      console.error('Error during director evaluation:', err);
    }
  };

  const handlePeerEvaluation = async () => {
    try {
      const optionWeightage =
        await QuestionaireServiceListner.getOptionsWeightages();
      const peerEvaluations = questionsList.map(item => {
        const selectedOption = selectedAnswers[item.id];
        const score = calculateScore(selectedOption, optionWeightage);
        return {
          evaluator_id: employeeID.employee.id,
          evaluatee_id: evaluateeID,
          session_id: sessionID.id,
          course_id: courseID,
          question_id: item.id,
          score,
        };
      });
      console.log(peerEvaluations)
      const evaluate = await EvaluationService.postPeerEvaluation(
        peerEvaluations,
      );
      if (evaluate) {
        Alert.alert('Successfully Evaluated');
      }
      console.log('Evaluation response:', evaluate);
      setSelectedAnswers({});
    } catch (err) {
      console.error('Error during peer evaluation:', err);
    }
  };
  const handleConfidentialEvaluation = async () => {
    try {
      const optionWeightage =
        await QuestionaireServiceListner.getOptionsWeightages();
      const confidentialEvaluations = questionsList.map(item => {
        const selectedOption = selectedAnswers[item.id];
        const score = calculateScore(selectedOption, optionWeightage);
        return {
          student_id: studentID.id,
          teacher_id: evaluateeID,
          question_id: item.id,
          session_id: sessionID.id,
          score,
        };
      });
      console.log(confidentialEvaluations)
      const evaluate = await EvaluationService.postConfidentialEvaluation(
        confidentialEvaluations,
      );

      if (evaluate) {
        Alert.alert('Successfully Evaluated');
      }
      console.log('Evaluation response:', evaluate);
      setSelectedAnswers({});
    } catch (err) {
      console.error('Error during Confidential evaluation:', err);
    }
  };
  const handleJuniorEvaluation = async () => {
    try {
      const optionWeightage =
        await QuestionaireServiceListner.getOptionsWeightages();
      const juniorEvaluations = questionsList.map(item => {
        const selectedOption = selectedAnswers[item.id];
        const score = calculateScore(selectedOption, optionWeightage);
        return {
          senior_teacher_id: employeeID.employee.id,
          junior_teacher_id: evaluateeID,
          question_id: item.id,
          course_id: courseID,
          session_id: sessionID.id,
          score,
        };
      });
      console.log('Junior evaluations:', juniorEvaluations);
      const evaluate = await EvaluationService.postSeniorTeacherEvaluation(
        juniorEvaluations,
      );
      if (evaluate) {
        Alert.alert('Successfully evaluated');
      }
      console.log('Evaluation response:', evaluate);
      setSelectedAnswers({});
    } catch (err) {
      console.error('Error during junior evaluation:', err);
    }
  };

  const handleSubmit = () => {
    if (questionByType === 'student') handleStudentEvaluation();
    else if (questionByType === 'director') handleDirectorEvaluation();
    else if (questionByType === 'peer') handlePeerEvaluation();
    else if (questionByType === 'senior') handleJuniorEvaluation();
    else if (questionByType === 'degree exit') handleDegreeExitEvaluation();
    else if (questionByType === 'confidential') handleConfidentialEvaluation();
    else {
      Alert.alert('Please Login');
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={{color: 'black'}}>Loading...</Text>
        </View>
      ) : (
        <>
          <View style={styles.title}>
            <Text style={styles.titleText}>Evaluate</Text>
          </View>
          <FlatList
            data={questionsList}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <EvaluationQuestionnaireAdapter
                question={item}
                onAnswerSelection={handleAnswerSelection}
              />
            )}
            contentContainerStyle={styles.listContent}
          />
          <View style={styles.buttonContainer}>
            <Button
              onPress={handleSubmit}
              title="Submit"
              color="#6360DC"
              disabled={!areAllQuestionsAnswered()}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  listContent: {
    paddingBottom: 80,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  title: {
    paddingTop: 10,
    backgroundColor: '#6360DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
});

export default EvaluationQuestionnaireFragment;
