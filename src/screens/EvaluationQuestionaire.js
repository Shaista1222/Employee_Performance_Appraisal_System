// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, ToastAndroid } from 'react-native';
// import { ListView } from '@react-native-community/listview'; // Import ListView if not already installed
// // import EvaluationQuestionnaireAdapter from './EvaluationQuestionnaireAdapter'; // Import your EvaluationQuestionnaireAdapter component
// import QuestionnaireService from './Services/QuestionnaireService'; // Import your QuestionnaireService component

// const EvaluationQuestionnaire = ({ evaluateeID, courseID, evaluationType, fragmentContainerId }) => {
//   const [questionsList, setQuestionsList] = useState([]);
//   const [selectedAnswers, setSelectedAnswers] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         const questions = await QuestionnaireService.getEvaluationQuestionnaire(evaluationType);
//         setQuestionsList(questions);
//       } catch (error) {
//         ToastAndroid.show(error.message, ToastAndroid.SHORT);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [evaluationType]);

//   const handleAnswerSelection = (questionId, answer) => {
//     setSelectedAnswers((prevAnswers) => {
//       const updatedAnswers = [...prevAnswers];
//       const index = updatedAnswers.findIndex((pair) => pair[0] === questionId);

//       if (index !== -1) {
//         updatedAnswers[index][1] = answer;
//       } else {
//         updatedAnswers.push([questionId, answer]);
//       }

//       return updatedAnswers;
//     });
//   };

//   const handleSubmit = () => {
//     // Handle submission logic here
//     console.log('Selected Answers:', selectedAnswers);
//   };

//   return (
//     <View>
//       {isLoading ? (
//         <Text>Loading...</Text>
//       ) : (
//         <>
//           <ListView
//             dataSource={questionsList}
//             renderRow={(question) => (
//               <EvaluationQuestionnaireAdapter
//                 question={question}
//                 onAnswerSelection={handleAnswerSelection}
//               />
//             )}
//           />
//           <Button title="Submit" onPress={handleSubmit} />
//         </>
//       )}
//     </View>
//   );
// };

// export default EvaluationQuestionnaireFragment;
