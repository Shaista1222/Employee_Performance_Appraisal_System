import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, FlatList, StyleSheet } from 'react-native';
import QuestionaireServiceListner from './Services/QuestionaireServiceListner';
import EvaluationQuestionnaireAdapter from './Adapter/EvaluationQuestionnaireAdapter';
import EvaluationService from './Services/EvaluationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EvaluationQuestionnaireFragment = ({ route }) => {
  const { evaluateeID, questionByType, courseID, teacherId } = route.params;
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
        const questions = await QuestionaireServiceListner.getQuestionnaireByType(questionByType);
        setQuestionsList(questions);
        console.log(questions);
      } catch (error) {
        Alert.alert('Error', error.message);
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
        const user = await AsyncStorage.getItem('userObject');
        const employeeId = await AsyncStorage.getItem('employee');
        if (sessionData && user && employeeId) {
          setSessionId(JSON.parse(sessionData));
          setStudentId(JSON.parse(user));
          setEmployeeId(JSON.parse(employeeId));
        } else {
          Alert.alert('Error', 'Student session or ID not found');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
        console.error('Error retrieving student data:', error);
      }
    };
    retrieveData();
  }, []);

  const handleAnswerSelection = (questionId, answer) => {
    setSelectedAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleStudentEvaluation = async () => {
    try {
      const optionWeightage = await QuestionaireServiceListner.getOptionsWeightages();
      const studentEvaluations = questionsList.map(item => {
        const selectedOption = selectedAnswers[item.id];
        const selectedOptionData = optionWeightage.find(option => option.name === selectedOption);
        return {
          student_id: studentID,
          session_id: sessionID,
          teacher_id: teacherId,
          question_id: item.id,
          score: selectedOptionData ? selectedOptionData.score : 0,
          course_id: courseID,
        };
      });
      const evaluate = await EvaluationService.postStudentEvaluation(studentEvaluations);
      console.log(evaluate);
      setSelectedAnswers({});
    } catch (err) {
      console.log(err);
    }
  };

  const handleDirectorEvaluation = async () => {
    try {
      const optionWeightage = await QuestionaireServiceListner.getOptionsWeightages(); // Fetch weightages once
      const directorEvaluations = questionsList.map(item => {
        const selectedOption = selectedAnswers[item.id];
        const selectedOptionData = optionWeightage.find(option => option.name === selectedOption);
        return {
          evaluator_id: employeeID.employee.id,
          evaluatee_id: evaluateeID,
          question_id: item.id,
          session_id: sessionID,
          score: selectedOptionData ? selectedOptionData.score : 0,
        };
      });
      const evaluate = await EvaluationService.postDirectorEvaluation(directorEvaluations);
      console.log(evaluate);
      setSelectedAnswers({});
    } catch (err) {
      console.log(err);
    }
  };

  const handlePeerEvaluation = async () => {
    try {
      const optionWeightage = await QuestionaireServiceListner.getOptionsWeightages(); // Fetch weightages once
      const peerEvaluations = questionsList.map(item => {
        const selectedOption = selectedAnswers[item.id];
        const selectedOptionData = optionWeightage.find(option => option.name === selectedOption);
        return {
          evaluator_id: employeeID.employee.id,
          evaluatee_id: evaluateeID,
          question_id: item.id,
          session_id: sessionID,
          score: selectedOptionData ? selectedOptionData.score : 0,
        };
      });
      const evaluate = await EvaluationService.postPeerEvaluation(peerEvaluations);
      console.log(evaluate);
      setSelectedAnswers({});
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = () => {
    if (questionByType === 'student') handleStudentEvaluation();
    else if (questionByType === 'director') handleDirectorEvaluation();
    else if (questionByType === 'peer') handlePeerEvaluation(); // Fix: added parentheses to call the function
    else {
      Alert.alert('Please Login');
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={{ color: 'black' }}>Loading...</Text>
        </View>
      ) : (
        <>
          <View style={styles.title}>
            <Text style={styles.titleText}>Evaluate</Text>
          </View>
          <FlatList
            data={questionsList}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <EvaluationQuestionnaireAdapter
                question={item}
                onAnswerSelection={handleAnswerSelection}
              />
            )}
            contentContainerStyle={styles.listContent}
          />
          <View style={styles.buttonContainer}>
            <Button onPress={handleSubmit} title="Submit" color="#6360DC" />
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
