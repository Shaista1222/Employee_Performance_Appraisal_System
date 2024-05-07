// import React, { useEffect, useState } from 'react';
// import { View, Text, ListView, ToastAndroid } from 'react-native';
// import { EvaluationQuestionnaireFragment } from './EvaluationQuestionnaireFragment'; // Import your EvaluationQuestionnaireFragment if available
// import { EvaluatorService } from '../network/services/EvaluatorService'; // Import your EvaluatorService if available
// import { replaceFragment } from '../helper/FragmentUtils'; // Import your FragmentUtils if available
// import { SharedPreferencesManager } from '../helper/SharedPreferencesManager'; // Import your SharedPreferencesManager if available

// const EvaluateeListFragment = ({ fragmentContainerId }) => {
//     const [evaluateeList, setEvaluateeList] = useState([]);
//     const [evaluateeNames, setEvaluateeNames] = useState([]);
//     const [evaluatorID, setEvaluatorID] = useState(null);
//     const [sessionID, setSessionID] = useState(null);
//     const [evaluationType, setEvaluationType] = useState(null);

//     const evaluatorService = new EvaluatorService(); // Instantiate your EvaluatorService
//     const sharedPreferencesManager = new SharedPreferencesManager(); // Instantiate your SharedPreferencesManager

//     useEffect(() => {
//         // Retrieve evaluatorID, sessionID, and evaluationType from SharedPreferencesManager
//         const employeeUserObject = sharedPreferencesManager.getEmployeeUserObject();
//         setEvaluatorID(employeeUserObject.employee.id);
//         setSessionID(sharedPreferencesManager.getSessionId());
//         setEvaluationType(employeeUserObject.employeeType.title);

//         // Fetch evaluatees from the service
//         evaluatorService.getEvaluatees(
//             evaluatorID,
//             sessionID,
//             (evaluatees) => {
//                 setEvaluateeList(evaluatees);
//                 setEvaluateeNames(evaluatees.map(e => e.name));
//             },
//             (errorMessage) => {
//                 ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
//             }
//         );
//     }, []); // Empty dependency array to ensure this runs only once

//     const handleItemPress = (position) => {
//         const selectedEmployee = evaluateeList[position];
//         const evaluateeID = selectedEmployee.id;

//         // Navigate to the EvaluationQuestionnaireFragment
//         // Pass necessary props like evaluateeID, sessionID, evaluationType, and fragmentContainerId
//         // Implement the navigation logic according to your React Navigation setup
//     };

//     return (
//         <View>
//             <ListView
//                 dataSource={evaluateeNames}
//                 renderRow={(rowData, sectionID, rowID) => (
//                     <Text onPress={() => handleItemPress(rowID)}>{rowData}</Text>
//                 )}
//             />
//         </View>
//     );
// };

// export default EvaluateeListFragment;
