import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import QuestionaireServiceListner from '../Services/QuestionaireServiceListner';

const EvaluationQuestionnaireAdapter = ({ question, onAnswerSelection }) => {
  const [optionsWeightageList, setOptionsWeightageList] = useState([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);

  useEffect(() => {
    const fetchOptionsWeightages = async () => {
      try {
        const optionsWeightages = await QuestionaireServiceListner.getOptionsWeightages();
        setOptionsWeightageList(optionsWeightages);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };

    fetchOptionsWeightages();
  }, []);

  const handleOptionSelect = (selectedOption) => {
    setSelectedOptionIndex(selectedOption.index);
    onAnswerSelection(question.id, selectedOption.label);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.question}</Text>
      <RadioButtonRN
        data={optionsWeightageList.map((option) => ({ label: option.name }))}
        initial={selectedOptionIndex}
        selectedBtn={(e) => handleOptionSelect(e)}
        boxStyle={styles.radioButton}
        textStyle={styles.radioButtonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  questionText: {
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
  },
  radioButton: {
    marginBottom: 10,
  },
  radioButtonText: {
    fontSize: 16,
    color: 'black',
  },
});

export default EvaluationQuestionnaireAdapter;
