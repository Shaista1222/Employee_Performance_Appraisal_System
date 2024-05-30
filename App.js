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
import MainStackNavigator from './src/screens/DirectorScreens/MainStackNavigator';
import Performance from './src/screens/DirectorScreens/Performance';
import Scores from './src/screens/Scores';
import Task from './src/screens/Task';
import QuestionnaireFragment from './src/screens/QuestionaireFragment';
import EvaluationQuestionnaireFragment from './src/screens/EvaluationQuestionnaireFragment';
import EvaluateeListFragment from './src/screens/EvaluateeListFragment';
import MyTasksFragment from './src/screens/MyTasksFragment';
import OptionsWeightage from './src/screens/DirectorScreens/OptionsWeightage';
import PeerEvaluationSetting from './src/screens/DirectorScreens/PeerEvaluationSetting';
import Evaluation from './src/screens/DirectorScreens/Evaluation';
import ConfidentialEvaluationSetting from './src/screens/DirectorScreens/ConfidentialEvaluationSetting';
import NavigateToAdmin from './src/navigations/AdminNavigation/NavigateToAdmin';
import AdminTabsNavigator from './src/navigations/AdminNavigation/AdminTabsNavigator';
import EmployeeDetails from './src/screens/Adapter/EmployeeDetailsListAdapter';
import PerformanceFragment from './src/screens/PerformanceFragment';
import Evaluator from './src/screens/DirectorScreens/Evaluator';
import DirectorEvaluation from './src/screens/DirectorScreens/DirectorEvaluation';
import AddEmployee from './src/screens/AdminScreens/AddEmployee';
import EmployeeDetailsListItem from './src/screens/EmployeeDetailsListItem';
import Report from './src/screens/DirectorScreens/Report';
import EmployeeList from './src/screens/AdminScreens/EmployeeList';
import StudentEvaluationSetting from './src/screens/AdminScreens/StudentEvaluationSetting';
import AddClassHeldReport from './src/screens/AdminScreens/AddClassHeldReport';
import Session from './src/screens/DirectorScreens/Session';
const Stack = createStackNavigator();

const App = () => {
  return (
    // <Task/>
  //   <NavigationContainer>
  //   <Stack.Navigator
  //     screenOptions={{headerShown: false}}
  //     initialRouteName="Evaluation">
  //     <Stack.Screen name="Evaluation" component={Evaluation} />
  //     <Stack.Screen name="PeerEvaluation" component={PeerEvaluationSetting} />
  //     <Stack.Screen
  //       name="ConfidentialEvaluation"
  //       component={ConfidentialEvaluationSetting}
  //     />
  // </Stack.Navigator>
  // </NavigationContainer>
  //   <NavigationContainer>
  //   <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="EmployeeList">
  //     <Stack.Screen name="EmployeeList" component={EmployeeList} />
  //     <Stack.Screen name="EmployeeDetailsListItem" component={EmployeeDetailsListItem} />
  //   </Stack.Navigator>
  // </NavigationContainer>
    // <Task/>
    // <NavigationContainer>
  //   <Stack.Navigator>
  //     <Stack.Screen name="Employee" component={EmployeeList} />
  //     {/* <Stack.Screen name="EmployeeDetails" component={EmployeeDetailsListItem} /> */}
  //   </Stack.Navigator>
  //  </NavigationContainer> 
    // <DirectorEvaluation />
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Performance">
    //     <Stack.Screen name="Performance" component={PerformanceFragment} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    // <NavigationContainer>
    //   <Stack.Navigator
    //     screenOptions={{headerShown: false}}
    //     initialRouteName="AdminMain">
    //     <Stack.Screen name="NavigateToAdmin" component={NavigateToAdmin} />
    //     <Stack.Screen name="AdminMain" component={AdminTabsNavigator} />
    //     <Stack.Screen name="EmployeeDetails" component={EmployeeDetails} />

    //   </Stack.Navigator>
    // </NavigationContainer>
    // <MyTasksFragment/>
   
    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="EvaluateeList">
    //     <Stack.Screen name="EvaluateeList" component={EvaluateeListFragment} />
    //     <Stack.Screen name="EvaluationQuestionnaire" component={EvaluationQuestionnaireFragment} />
    //   </Stack.Navigator>
    //  </NavigationContainer>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="NavigateToDirector"
          component={NavigateToDirector}
        />
     <Stack.Screen name="DirectorMain" component={DirectorTabsNavigator} />
        <Stack.Screen name="NavigateToHOD" component={NavigateToHOD} />
        <Stack.Screen name="HODMain" component={HODTabsNavigator} />
        <Stack.Screen name="NavigateToFaculty" component={NavigateToFaculty} />
        <Stack.Screen name="FacultyMain" component={FacultyTabsNavigator} />
        <Stack.Screen name="NavigateToStudent" component={NavigateToStudent} />
         <Stack.Screen name="StudentMain" component={StudentHome} />
        <Stack.Screen name="Performance" component={Performance} />
        <Stack.Screen name="EvaluateeList" component={EvaluateeListFragment} />
        <Stack.Screen
          name="EvaluationQuestionnaire"
          component={EvaluationQuestionnaireFragment}
        />
        <Stack.Screen name="Evaluation" component={Evaluation} />
        <Stack.Screen name="Scores" component={Scores} />
        <Stack.Screen
          name="DirectorEvaluation"
          component={DirectorEvaluation}
        />
        <Stack.Screen
          name="QuestionnaireFragment"
          component={QuestionnaireFragment}
        />
        <Stack.Screen name="PeerEvaluation" component={PeerEvaluationSetting} />
        <Stack.Screen
          name="ConfidentialEvaluation"
          component={ConfidentialEvaluationSetting}
        />
      </Stack.Navigator>
     </NavigationContainer>  
  );
};

export default App;
