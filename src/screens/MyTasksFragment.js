// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, ToastAndroid } from 'react-native';
// import { TaskService } from './TaskService'; // Import your TaskService if available
// import { MyTasksListItem } from './MyTasksListItem'; // Import your MyTasksListItem if available

// const MyTasksFragment = () => {
//     const [taskWithEmployeesList, setTaskWithEmployeesList] = useState([]);
//     const employeeID = 1;

//     useEffect(() => {
//         const fetchEmployeeTasks = async () => {
//             try {
//                 const tasksWithEmployees = await TaskService.getEmployeeTasks(employeeID);
//                 setTaskWithEmployeesList(tasksWithEmployees);
//             } catch (error) {
//                 ToastAndroid.show(error.message, ToastAndroid.SHORT);
//             }
//         };

//         fetchEmployeeTasks();

//         // Cleanup function
//         return () => {
//             // Perform any cleanup if needed
//         };
//     }, []);

//     const renderTaskItem = ({ item }) => (
//         <MyTasksListItem task={item} />
//     );

//     return (
//         <View>
//             <FlatList
//                 data={taskWithEmployeesList}
//                 renderItem={renderTaskItem}
//                 keyExtractor={(item) => item.id.toString()}
//             />
//         </View>
//     );
// };

// export default MyTasksFragment;
