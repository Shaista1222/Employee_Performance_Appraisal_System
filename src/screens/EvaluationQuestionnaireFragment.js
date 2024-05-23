import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import QuestionaireServiceListner from './Services/QuestionaireServiceListner';
import EvaluationQuestionnaireAdapter from './Adapter/EvaluationQuestionnaireAdapter';

const EvaluationQuestionnaireFragment = ({route, navigation}) => {
  const {evaluateeID} = route.params;
  const [questionsList, setQuestionsList] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const type = 'peer';
  useEffect(() => {
    const fetchData = async questionnaireType => {
      try {
        setIsLoading(true);
        const questions =
          await QuestionaireServiceListner.getQuestionnaireByType(
            questionnaireType,
          );
        setQuestionsList(questions);
        console.log(questions);
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(type);
  }, []);

  const handleAnswerSelection = (questionId, answer) => {
    setSelectedAnswers(prevAnswers => {
      const updatedAnswers = [...prevAnswers];
      const index = updatedAnswers.findIndex(pair => pair[0] === questionId);

      if (index !== -1) {
        updatedAnswers[index][1] = answer;
      } else {
        updatedAnswers.push([questionId, answer]);
      }

      return updatedAnswers;
    });
  };

  const handleSubmit = () => {
    // Handle submission logic here
    console.log('Selected Answers:', selectedAnswers);
  };

  return (
    <View>
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
    paddingBottom: 80, // Ensure there's space at the bottom for the button
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
