import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/Login';
import NavigateToDirector from './src/navigations/DirectorNavigation/NavigateToDirector';
import DirectorTabsNavigator from './src/navigations/DirectorNavigation/DirectorTabsNavigator';
import NavigateToHOD from './src/navigations/HODNavigation/NavigateToHOD';
import HODTabsNavigator from './src/navigations/HODNavigation/HODTabsNavigator';
import NavigateToFaculty from './src/navigations/FacultyNavigation/NavigateToFaculty';
import FacultyTabsNavigator from './src/navigations/FacultyNavigation/FacultyTabsNavigator';
import NavigateToStudent from './src/navigations/Student/NavigateToStudent';
import StudentHome from './src/navigations/Student/StudentHome';
import Evaluate from './src/screens/Student/Evaluate';
import CourseTeacher from './src/screens/Student/CourseTeacher';
import Task from './src/screens/Task';
import Report from './src/screens/DirectorScreens/Report';
import Performance from './src/screens/DirectorScreens/Performance';
import AddKPI from './src/screens/DirectorScreens/AddKPI';
import ConfidentialEvaluation from './src/screens/DirectorScreens/ConfidentialEvaluation';
import ConfidentialEvaluationSetting from './src/screens/DirectorScreens/ConfidentialEvaluationSetting';
// import AddIndividualKpi from './src/screens/DirectorScreens/AddIndividualKpi';
const Stack = createStackNavigator();

const App = () => {
  return (

    <ConfidentialEvaluation/>
  //  /* /* /* /* /* /* /*  {/* <NavigationContainer>
  //   <Stack.Navigator screenOptions={{ headerShown: false }}>
  //     <Stack.Screen name="Login" component={Login} />
  //     <Stack.Screen name="NavigateToDirector" component={NavigateToDirector} />
  //     <Stack.Screen name="DirectorMain" component={DirectorTabsNavigator} />
  //     <Stack.Screen name="NavigateToHOD" component={NavigateToHOD} />
  //     <Stack.Screen name="HODMain" component={HODTabsNavigator} />
  //     <Stack.Screen name="NavigateToFaculty" component={NavigateToFaculty} />
  //     <Stack.Screen name="FacultyMain" component={FacultyTabsNavigator} />
  //     <Stack.Screen name="NavigateToStudent" component={NavigateToStudent} />
  //     <Stack.Screen name="StudentMain" component={StudentHome} />
  //   </Stack.Navigator>
  // </NavigationContainer> */} */ */ */ */ */ */ */
  );
};

export default App;
/*  <>
      <Task />
    </> */