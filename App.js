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
import MainApp from './MainApp';
const Stack = createStackNavigator();

const App = () => {
  return (
    <MainApp/>
  );
};

export default App;
