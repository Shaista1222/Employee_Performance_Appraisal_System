// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, Alert } from 'react-native';
// import QuestionnaireAdapter from './path/to/QuestionnaireAdapter'; // Adjust the import path as necessary
// import QuestionnaireServiceListener from '../Services/QuestionaireServiceListner';
// const EvaluationQuestionnaire = () => {
//   const [questionsList, setQuestionsList] = useState([]);

//   useEffect(() => {
//     fetchConfidentialQuestions();
//   }, []);

//   const fetchConfidentialQuestions = async () => {
//     try {
//       const questions = await QuestionnaireServiceListener.getConfidentialQuestions();
//       setQuestionsList(questions);
//     } catch (error) {
//       Alert.alert(error.message, ToastAndroid.SHORT);
//     }
//   };

//   const renderQuestionnaireItem = ({ item }) => {
//     return (
//       <View>
//         <Text>{item.question}</Text>
//         {/* Render other details if needed */}
//       </View>
//     );
//   };

//   return (
//     <View>
//       <Text>Evaluation Questionnaire</Text>
//       <FlatList
//         data={questionsList}
//         renderItem={renderQuestionnaireItem}
//         keyExtractor={(item, index) => index.toString()}
//       />
//     </View>
//   );
// };

// export default EvaluationQuestionnaire;
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const EvaluationQuestionaire = () => {
  return (
    <View>
      <Text>EvaluationQuestionaire</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
export default EvaluationQuestionaire

