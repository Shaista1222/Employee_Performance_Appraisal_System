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
import Performance from './src/screens/DirectorScreens/Performance';
import Scores from './src/screens/Scores';
import QuestionnaireFragment from './src/screens/QuestionaireFragment';
import EvaluationQuestionnaireFragment from './src/screens/EvaluationQuestionnaireFragment';
import EvaluateeListFragment from './src/screens/EvaluateeListFragment';
import PeerEvaluationSetting from './src/screens/DirectorScreens/PeerEvaluationSetting';
import Evaluation from './src/screens/DirectorScreens/Evaluation';
import ConfidentialEvaluationSetting from './src/screens/DirectorScreens/ConfidentialEvaluationSetting';
import NavigateToAdmin from './src/navigations/AdminNavigation/NavigateToAdmin';
import AdminTabsNavigator from './src/navigations/AdminNavigation/AdminTabsNavigator';
import DirectorEvaluation from './src/screens/DirectorScreens/DirectorEvaluation';
import EmployeeDetailsListItem from './src/screens/EmployeeDetailsListItem';
import Kpi from './src/screens/DirectorScreens/Kpi';
import PerformanceComparison from './src/screens/DirectorScreens/PerformanceComparison';
import AddKpi from './src/screens/DirectorScreens/AddKpi';
const Stack = createStackNavigator();
const MainApp = () => {
  return (
   
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
        <Stack.Screen name="NavigateToAdmin" component={NavigateToAdmin} />
        <Stack.Screen name="AdminMain" component={AdminTabsNavigator} />
        <Stack.Screen
          name="EmployeeDetailsListItem"
          component={EmployeeDetailsListItem}
        />
        <Stack.Screen name="Performance" component={Performance} />
        <Stack.Screen name="EvaluateeList" component={EvaluateeListFragment} />
        <Stack.Screen name="Kpi" component={Kpi} />
        <Stack.Screen name="PerformanceComparison" component={PerformanceComparison} />
        <Stack.Screen name="AddKpi" component={AddKpi} />

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
  )
}

export default MainApp
