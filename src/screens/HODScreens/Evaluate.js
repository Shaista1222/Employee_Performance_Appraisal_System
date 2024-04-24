import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const questions = [
  {
    question:
      "How would you rate the teacher's communication skills with students?",
    options: ['Poor', 'Average', 'Good', 'Excellent'],
  },
  {
    question:
      'How effective is the teacher in providing timely and constructive feedback to students on their academic performance?',
    options: ['Poor', 'Average', 'Good', 'Excellent'],
  },
  {
    question:
      "How would you rate the teacher's communication skills with students?",
    options: ['Poor', 'Average', 'Good', 'Excellent'],
  },
  {
    question:
      'How effective is the teacher in providing timely and constructive feedback to students on their academic performance?',
    options: ['Poor', 'Average', 'Good', 'Excellent'],
  },{
    question:
      "How would you rate the teacher's communication skills with students?",
    options: ['Poor', 'Average', 'Good', 'Excellent'],
  },
  {
    question:
      'How effective is the teacher in providing timely and constructive feedback to students on their academic performance?',
    options: ['Poor', 'Average', 'Good', 'Excellent'],
  },{
    question:
      'How effective is the teacher in providing timely and constructive feedback to students on their academic performance?',
    options: ['Poor', 'Average', 'Good', 'Excellent'],
  },{
    question:
      "How would you rate the teacher's communication skills with students?",
    options: ['Poor', 'Average', 'Good', 'Excellent'],
  },
  {
    question:
      'How effective is the teacher in providing timely and constructive feedback to students on their academic performance?',
    options: ['Poor', 'Average', 'Good', 'Excellent'],
  },
  // ... Add other questions in the same format
];

const Evaluate = () => {
  // This state will hold the scores for each question
  const [scores, setScores] = useState({});

  const handleSelectOption = (questionIndex, option) => {
    setScores({
      ...scores,
      [questionIndex]: option,
    });
  };

  return (
    <>
     <View style={styles.title}>
        <Text style={styles.titleText}>Evaluate</Text>
      </View>
    <ScrollView style={styles.container}>
      {/* <Text style={styles.title}>Evaluate</Text> */}
      {questions.map((question, qIndex) => (
        <View key={qIndex} style={styles.questionContainer}>
          <Text style={styles.question}>{question.question}</Text>
          <View style={styles.optionsContainer}>
            {question.options.map((option, oIndex) => (
              <TouchableOpacity
                key={oIndex}
                style={styles.option}
                onPress={() => handleSelectOption(qIndex, option)}>
                <View
                  style={[
                    styles.radioCircle,
                    scores[qIndex] === option && styles.selectedRadioCircle,
                  ]}>
                  {scores[qIndex] === option && (
                    <View style={styles.selectedRadioButton} />
                  )}
                </View>
                <Text style={styles.optionLabel}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
      {/* You can add a submit button here */}
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
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
  // title: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   marginBottom: 20,
  //   textAlign: 'center',
  //   color:'black',
  //   backgroundColor:'#6360DC',
  // },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
  },
  optionsContainer: {
    flexDirection: 'row',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    color:'black'
  },
  selectedRadioCircle: {
    borderColor: '#3D6DCC',
  },
  selectedRadioButton: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#3D6DCC',
  },
  optionLabel: {
    fontSize: 16,
    color:'black',
    paddingRight:6
  },
  // ... Add more styles if needed
});

export default Evaluate;
