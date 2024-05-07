// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { BottomNavigation } from 'react-native-paper'; // Import BottomNavigation from your UI library
// import { DirectorReportFragment } from './DirectorReportFragment'; // Import your DirectorReportFragment if available
// import { TaskFragment } from './TaskFragment'; // Import your TaskFragment if available

// const MainActivity = () => {
//     const [index, setIndex] = useState(0); // Current selected tab index
//     const [routes] = useState([
//         { key: 'report', title: 'Report', icon: 'chart-areaspline' },
//         { key: 'tasks', title: 'Tasks', icon: 'clipboard-check' },
//         { key: 'settings', title: 'Settings', icon: 'dots-horizontal' },
//     ]);

//     const renderScene = ({ route }) => {
//         switch (route.key) {
//             case 'report':
//                 return <DirectorReportFragment />;
//             case 'tasks':
//                 return <TaskFragment />;
//             case 'settings':
//                 return <SettingsFragment />;
//             default:
//                 return null;
//         }
//     };

//     const handleNavigation = (newIndex) => {
//         setIndex(newIndex);
//         // Handle navigation logic based on newIndex
//     };

//     const renderTabBar = (props) => (
//         <BottomNavigation
//             {...props}
//             activeColor="#ffffff"
//             inactiveColor="#8e8e93"
//             barStyle={{ backgroundColor: '#6200ee' }}
//             shifting={false}
//         />
//     );

//     return (
//         <View style={{ flex: 1 }}>
//             <View style={{ flex: 1 }}>
//                 {renderScene({ route: routes[index] })}
//             </View>
//             <BottomNavigation
//                 navigationState={{ index, routes }}
//                 onIndexChange={handleNavigation}
//                 renderScene={renderScene}
//                 renderTabBar={renderTabBar}
//             />
//         </View>
//     );
// };

// export default MainActivity;
