// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   FlatList,
// } from 'react-native';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import EmployeeService from '../Services/EmployeeService';

// const Report = () => {
//   const [employeeDetailsScoreList, setEmployeeDetailsScoreList] = useState([]);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = () => {
//     EmployeeService.getEmployeesWithKpiScores(
//       (employeeDetails) => {
//         setEmployeeDetailsScoreList(employeeDetails);
//       },
//       (errorMessage) => {
//         Alert.alert(errorMessage, ToastAndroid.SHORT);
//       }
//     );
//   };

//   const handleItemClick = (employeeDetailsScore) => {
//     // Pass employee data to PerformanceFragment
//     // You need to implement replaceFragment function in your navigation logic
//     // This example assumes you are using react-navigation
//     navigation.navigate('Performance', { id: employeeDetailsScore.employee.id });
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Report</Text>
//         <Ionicons name="arrow-forward-circle" size={25} color="white" />
//       </View>
//       <View
//         style={{
//           alignItems: 'center',
//           paddingTop: 10,
//           flexDirection: 'row',
//           backgroundColor: '#EEEEEE',
//         }}>
//         <TextInput
//           placeholderTextColor="gray"
//           placeholder="Search"
//           style={styles.searchInput}
//         />
//         <Ionicons
//           name="search-circle"
//           size={40}
//           color="#02367B"
//           style={{ paddingBottom: 10 }}
//         />
//       </View>
//       <View style={styles.listItemHeader}>
//         <Text style={{ color: 'white', fontWeight: 'bold' }}>Rank</Text>
//         <Text style={{ color: 'white', fontWeight: 'bold' }}>Name</Text>
//         <Text style={{ color: 'white', fontWeight: 'bold' }}>Average</Text>
//       </View>
//       <FlatList
//         data={employeeDetailsScoreList}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => handleItemClick(item)}>
//             <Text style={styles.name}>{item.employee.name}</Text>
//           </TouchableOpacity>
//         )}
//         keyExtractor={(item) => item.employee.id.toString()}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'pastel',
//   },
//   header: {
//     paddingTop: 10,
//     backgroundColor: '#6360DC',
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingLeft: 12,
//     paddingRight: 12,
//   },
//   headerText: {
//     fontSize: 24,
//     color: '#fff',
//     marginBottom: 10,
//   },
//   searchInput: {
//     height: 40,
//     width: '80%',
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 10,
//     marginBottom: 10,
//     marginLeft: 24,
//     borderColor: 'purple',
//   },
//   listItemHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#02367B',
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   listItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   rank: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: Colors.dark,
//   },
//   name: {
//     fontSize: 16,
//     color: Colors.dark,
//   },
//   average: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: Colors.dark,
//   },
// });

// export default Report;



// // import React from 'react';
// // import { View, Text } from 'react-native';
// // import Task from './Models/Task';
// // import Employee from './Models/Employee';

// // class TaskWithEmployees {
// //   constructor(task, assignedTo, assignedBy) {
// //     this.task = task;
// //     this.assignedTo = assignedTo;
// //     this.assignedBy = assignedBy;
// //   }

// //   static fromJson(json) {
// //     const task = Task.fromJson(json.task);
// //     const assignedTo = Employee.fromJson(json.assigned_to);
// //     const assignedBy = Employee.fromJson(json.assigned_by);
// //     return new TaskWithEmployees(task, assignedTo, assignedBy);
// //   }
// // }

// // export default TaskWithEmployees;








// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, ToastAndroid, FlatList } from 'react-native';
// import EmployeeService from './services/EmployeeService'; // Import your service files
// import EmployeeDetailsScoreAdapter from './adapter/EmployeeDetailsScoreAdapter';

// const DirectorReportFragment = () => {
//   const [employeeDetailsScoreList, setEmployeeDetailsScoreList] = useState([]);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = () => {
//     EmployeeService.getEmployeesWithKpiScores(
//       // onSuccess callback
//       (employeeDetails) => {
//         setEmployeeDetailsScoreList(employeeDetails);
//       },
//       // onFailure callback
//       (errorMessage) => {
//         ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
//       }
//     );
//   };

//   const handleItemClick = (employeeDetailsScore) => {
//     // Pass employee data to PerformanceFragment
//     // You need to implement replaceFragment function in your navigation logic
//     // This example assumes you are using react-navigation
//     navigation.navigate('PerformanceFragment', { id: employeeDetailsScore.employee.id });
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={employeeDetailsScoreList}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => handleItemClick(item)}>
//             <Text>{item.employee.name}</Text>
//           </TouchableOpacity>
//         )}
//         keyExtractor={(item) => item.employee.id.toString()}
//       />
//     </View>
//   );
// };

// export default DirectorReportFragment;
// ///////////////////////////




// // import React, { useState, useEffect } from 'react';
// // import { View, Text, StyleSheet, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
// // import TaskService from './TaskService'; // Assuming TaskService is implemented separately

// // export default function TaskFragment() {
// //   const [selectedTaskType, setSelectedTaskType] = useState(0);
// //   const [taskWithEmployeesList, setTaskWithEmployeesList] = useState([]);
// //   const [tabIndex, setTabIndex] = useState(0);

// //   useEffect(() => {
// //     _handleTabSelection(tabIndex);
// //   }, [tabIndex]);

// //   const _handleTabSelection = (index) => {
// //     setSelectedTaskType(index);
// //     const taskService = new TaskService();
// //     switch (index) {
// //       case 0:
// //         taskService.getTasks({
// //           onSuccess: (tasksWithEmployees) => {
// //             setTaskWithEmployeesList(tasksWithEmployees);
// //           },
// //           onFailure: (errorMessage) => {
// //             alert(errorMessage.toString());
// //           },
// //         });
// //         break;
// //       case 1:
// //         taskService.getPendingTasks({
// //           onSuccess: (tasksWithEmployees) => {
// //             setTaskWithEmployeesList(tasksWithEmployees);
// //           },
// //           onFailure: (errorMessage) => {
// //             alert(errorMessage.toString());
// //           },
// //         });
// //         break;
// //       case 2:
// //         taskService.getCompletedTasks({
// //           onSuccess: (tasksWithEmployees) => {
// //             setTaskWithEmployeesList(tasksWithEmployees);
// //           },
// //           onFailure: (errorMessage) => {
// //             alert(errorMessage.toString());
// //           },
// //         });
// //         break;
// //       default:
// //         break;
// //     }
// //   };

// //   const renderTaskList = (tasks) => {
// //     return tasks.map((taskWithEmployees, index) => {
// //       const task = taskWithEmployees.task;
// //       const assignedTo = taskWithEmployees.assignedTo;
// //       const assignedBy = taskWithEmployees.assignedBy;

// //       return (
// //         <View key={index} style={styles.card}>
// //           <Text style={styles.boldText}>Task:</Text>
// //           <Text style={styles.text}>{task.taskDescription}</Text>
// //           <Text style={styles.boldText}>Due:</Text>
// //           <Text style={styles.text}>{task.dueDate.toString()}</Text>
// //           <Text style={styles.boldText}>Weightage:</Text>
// //           <Text style={styles.text}>{task.weightage.toString()}</Text>
// //           <Text style={styles.boldText}>Assigned To:</Text>
// //           <Text style={styles.text}>{assignedTo.name}</Text>
// //           <Text style={styles.boldText}>Assigned By:</Text>
// //           <Text style={styles.text}>{assignedBy.name}</Text>
// //           <View style={styles.row}>
// //             <TextInput style={styles.input} placeholder="Enter Score" />
// //             <Button title="OK" onPress={() => {}} />
// //           </View>
// //         </View>
// //       );
// //     });
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.header}>
// //         <Text style={styles.headerText}>Task</Text>
// //       </View>
// //       <View style={styles.tabBar}>
// //         <TouchableOpacity style={tabIndex === 0 ? styles.tabActive : styles.tab} onPress={() => setTabIndex(0)}>
// //           <Text style={styles.tabText}>All</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity style={tabIndex === 1 ? styles.tabActive : styles.tab} onPress={() => setTabIndex(1)}>
// //           <Text style={styles.tabText}>Pending</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity style={tabIndex === 2 ? styles.tabActive : styles.tab} onPress={() => setTabIndex(2)}>
// //           <Text style={styles.tabText}>Completed</Text>
// //         </TouchableOpacity>
// //       </View>
// //       <ScrollView style={styles.scrollView}>
// //         {renderTaskList(task)}
// //       </ScrollView>
// //       <TouchableOpacity style={styles.fab} onPress={() => AddEmployeeTasks()}>
// //         <Text style={styles.fabText}>+</Text>
// //       </TouchableOpacity>
// //       <View style={styles.bottomBar}>
// //         <TouchableOpacity
// //           style={selectedTaskType === 0 ? styles.bottomBarItemActive : styles.bottomBarItem}
// //           onPress={() => {}}
// //         >
// //           <Text style={styles.bottomBarText}>Task</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity
// //           style={selectedTaskType === 1 ? styles.bottomBarItemActive : styles.bottomBarItem}
// //           onPress={() => {}}
// //         >
// //           <Text style={styles.bottomBarText}>Report</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity
// //           style={selectedTaskType === 2 ? styles.bottomBarItemActive : styles.bottomBarItem}
// //           onPress={() => {}}
// //         >
// //           <Text style={styles.bottomBarText}>Evaluation</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity style={styles.bottomBarItem} onPress={() => {}}>
// //           <Text style={styles.bottomBarText}>Setting</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#ffffff',
// //   },
// //   header: {
// //     backgroundColor: '#2196F3',
// //     paddingVertical: 10,
// //     alignItems: 'center',
// //   },
// //   headerText: {
// //     color: '#ffffff',
// //     fontWeight: 'bold',
// //     fontSize: 20,
// //   },
// //   tabBar: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //     paddingVertical: 10,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#CCCCCC',
// //   },
// //   tab: {
// //     flex: 1,
// //     alignItems: 'center',
// //   },
// //   tabActive: {
// //     flex: 1,
// //     alignItems: 'center',
// //     borderBottomWidth: 2,
// //     borderBottomColor: '#2196F3',
// //   },
// //   tabText: {
// //     fontSize: 16,
// //   },
// //   scrollView: {
// //     flex: 1,
// //   },
// //   card: {
// //     marginVertical: 8,
// //     marginHorizontal: 16,
// //     padding: 16,
// //     borderRadius: 8,
// //     backgroundColor: '#F5F5F5',
// //   },
// //   boldText: {
// //     fontWeight: 'bold',
// //     fontSize: 16,
// //   },
// //   text: {
// //     fontSize: 18,
// //   },
// //   row: {
// //     flexDirection: 'row',
// //     marginTop: 16,
// //   },
// //   input: {
// //     flex: 1,
// //     borderColor: '#CCCCCC',
// //     borderWidth: 1,
// //     borderRadius: 4,
// //     paddingHorizontal: 10,
// //   },
// //   fab: {
// //     position: 'absolute',
// //     bottom: 20,
// //     right: 20,
// //     backgroundColor: '#2196F3',
// //     width: 56,
// //     height: 56,
// //     borderRadius: 28,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     elevation: 4,
// //   },
// //   fabText: {
// //     fontSize: 24,
// //     color: '#FFFFFF',
// //   },
// //   bottomBar: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //     borderTopWidth: 1,
// //     borderTopColor: '#CCCCCC',
// //   },
// //   bottomBarItem: {
// //     flex: 1,
// //     alignItems: 'center',
// //     paddingVertical: 10,
// //   },
// //   bottomBarItemActive: {
// //     flex: 1,
// //     alignItems: 'center',
// //     paddingVertical: 10,
// //     backgroundColor: '#2196F3',
// //   },
// //   bottomBarText: {
// //     fontSize: 16,
// //   },
// // });
