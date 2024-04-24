import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import QuestionaireServiceListner from '../../Services/QuestionaireServiceListner';
import {postStudentEvaluation} from '../../Services/EvaluationServiceListener'; // Import your postStudentEvaluation function


const Evaluate = ({route}) => {
  const [question, setQuestion] = useState([]);
  const [optionWeightage, setOptionWeightage] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({}); // State to store selected options
  const { teacherId, sessionId, studentId, courseId } = route.params;
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const studentQuestions =
        await QuestionaireServiceListner.getStudentQuestions();
      setQuestion(studentQuestions);

      const optionWeightages =
        await QuestionaireServiceListner.getOptionsWeightages();
      setOptionWeightage(optionWeightages);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle selection of option for each question
  const handleSelectOption = (questionIndex, option) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionIndex]: option,
    });
  };

  // Function to handle evaluation submission
  const handleStudentEvaluation = async () => {
    try {
      const studentEvaluations = question.map((item, index) => {
        const selectedOption = selectedOptions[index];
        const selectedOptionData = optionWeightage.find(
          option => option.name === selectedOption,
        ); // Assuming the option has a 'name' property
        return {
          studentId: studentId,
          sessionId: sessionId,
          employeeId: teacherId,
          questionId: item.id,
          score: selectedOptionData ? selectedOptionData.score : 0, // Assuming score is available in the option data
          courseId: courseId,
        };
      });
      const evaluate = await postStudentEvaluation(studentEvaluations);
      console.log(evaluate);
      setSelectedOptions({});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>Evaluate</Text>
      </View>
      <FlatList
        style={styles.container}
        data={question}
        renderItem={({item, index}) => (
          <View style={styles.questionContainer}>
            <Text style={styles.question}>{`${index + 1}. ${
              item.question
            }`}</Text>
            <View style={styles.optionsContainer}>
              {optionWeightage.map((option, optionIndex) => (
                <View key={optionIndex} style={styles.option}>
                  <RadioButton
                    status={
                      selectedOptions[index] === option
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => handleSelectOption(index, option)}
                  />
                  <Text style={styles.optionLabel}>{option.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={() => (
          <TouchableOpacity
            style={styles.button}
            onPress={handleStudentEvaluation}
            disabled={!Object.keys(selectedOptions).length} // Disable button if no options are selected
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  questionContainer: {
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  optionsContainer: {
    flexDirection: 'column',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionLabel: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 28,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Evaluate;
