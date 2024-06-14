// import React, {useEffect, useState} from 'react';
// import {View, Text, Spinner, TextInput} from 'react-native';
// import {DepartmentService} from '../Services/DepartmentService';
// import {DesignationService} from '../Services/DesignationService';
// import {EmployeeService} from '../Services/EmployeeService';

// const AddGroupKpi = () => {
//   const [designationList, setDesignationList] = useState([]);
//   const [departmentList, setDepartmentList] = useState([]);
//   const [employeeTypeList, setEmployeeTypeList] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const designationData = await DesignationService.getDesignations();
//         const departmentData = await DepartmentService.getDepartments();
//         const employeeTypeData = await EmployeeService.getEmployeeTypes();
//         // const subKpi = await SubKpiService.getSubKpi();
//         setDesignationList(designationData);
//         setDepartmentList(departmentData);
//         setEmployeeTypeList(employeeTypeData);
//         setIsLoading(false);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, []);

//   if (isLoading) {
//     return <Spinner />;
//   }

//   return (
//     <View>
//       <TextInput
//         label="Task Description"
//         mode="outlined"
//         multiline
//         style={styles.input}
//         onChangeText={setTaskDescription}
//         value={taskDescription}
//         placeholder="Enter Task Description"
//       />
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={selectedPerson}
//           onValueChange={itemValue => setSelectedPerson(itemValue)}
//           style={styles.picker}
//           dropdownIconColor="black"
//           mode="dropdown">
//           {employeeList.map(employee => (
//             <Picker.Item
//               key={employee.id}
//               label={employee.name}
//               value={employee.id}
//             />
//           ))}
//         </Picker>
//       </View>
//       <TextInput
//         label="Task Weightage"
//         mode="outlined"
//         style={styles.input}
//         onChangeText={setTaskWeightage}
//         value={taskWeightage}
//         placeholder="Enter Task Weightage"
//         keyboardType="numeric"
//       />
//       <View style={styles.buttonContainer}>
//         <Button mode="contained" style={styles.cancelButton} onPress={onClose}>
//           Cancel
//         </Button>
//       </View>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   input: {
//     marginBottom: 20,
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 5,
//     marginBottom: 20,
//   },
//   picker: {
//     height: 50,
//     color: 'black',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   cancelButton: {
//     backgroundColor: 'red',
//     flex: 1,
//     marginRight: 10,
//   },
//   saveButton: {
//     backgroundColor: 'green',
//     flex: 1,
//     marginLeft: 10,
//   },
// });

// export default AddGroupKpi;
