import React, { useState, useEffect } from 'react';
import { View, Text, Button, ToastAndroid } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native'; // Import RadioButtonRN or similar component
import QuestionnaireService from '../Services/QuestionnaireService'; // Import your QuestionnaireService component

const EvaluationQuestionnaireAdapter = ({ question }) => {
  const [optionsWeightageList, setOptionsWeightageList] = useState([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);

  useEffect(() => {
    const fetchOptionsWeightages = async () => {
      try {
        const optionsWeightages = await QuestionnaireService.getOptionsWeightages();
        setOptionsWeightageList(optionsWeightages);
      } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    };

    fetchOptionsWeightages();
  }, []);

  const handleOptionSelect = (selectedOption) => {
    setSelectedOptionIndex(selectedOption.index);
    ToastAndroid.show(selectedOption.label, ToastAndroid.SHORT);
  };

  return (
    <View>
      <Text>{question.question}</Text>
      <RadioButtonRN
        data={optionsWeightageList.map((option) => ({ label: option.name }))}
        initial={selectedOptionIndex}
        selectedBtn={(e) => handleOptionSelect(e)}
      />
    </View>
  );
};

export default EvaluationQuestionnaireAdapter;
