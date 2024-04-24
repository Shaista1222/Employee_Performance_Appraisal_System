// import React, { useState, useEffect } from 'react';
// import { View, Text, Picker, ToastAndroid } from 'react-native';
// import QuestionnaireServiceListener from './QuestionaireServiceListner'; // Adjust the import path as necessary

// const QuestionnaireService = ({}) => {
//   const [questionnaireTypes, setQuestionnaireTypes] = useState([]);
//   const [selectedType, setSelectedType] = useState('');
  
//   useEffect(() => {
//     // Fetch questionnaire types when component mounts
//     fetchQuestionnaireTypes();
//   }, []);

//   const fetchQuestionnaireTypes = async () => {
//     try {
//       const response = await QuestionnaireServiceListener.getQuestionnaireTypes();
//       setQuestionnaireTypes(response);
//     } catch (error) {
//       ToastAndroid.show('Failed to fetch questionnaire types', ToastAndroid.LONG);
//     }
//   };

//   const renderQuestionnaireTypes = () => {
//     return (
//       <Picker
//         selectedValue={selectedType}
//         onValueChange={(itemValue, itemIndex) => setSelectedType(itemValue)}
//       >
//         {questionnaireTypes.map(type => (
//           <Picker.Item key={type.id} label={type.name} value={type.id} />
//         ))}
//       </Picker>
//     );
//   };

//   return (
//     <View>
//       <Text>Select Questionnaire Type:</Text>
//       {renderQuestionnaireTypes()}
//     </View>
//   );
// };

// export default QuestionnaireService;
