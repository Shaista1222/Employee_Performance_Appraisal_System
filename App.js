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
import MainStackNavigator from './src/screens/DirectorScreens/MainStackNavigator';
import Performance from './src/screens/DirectorScreens/Performance';
import Scores from './src/screens/Scores';
import Task from './src/screens/Task';
import Questionaire, { QuestionItem } from './src/screens/DirectorScreens/Questionaire';
// import PerformanceFragment from './src/screens/PerformanceFragment';
const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <Questionaire />
    </>
    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{ headerShown: false }}>
    //     <Stack.Screen name="Login" component={Login} />
    //     <Stack.Screen name="NavigateToDirector" component={NavigateToDirector} />
    //     <Stack.Screen name="DirectorMain" component={DirectorTabsNavigator} />
    //     <Stack.Screen name="NavigateToHOD" component={NavigateToHOD} />
    //     <Stack.Screen name="HODMain" component={HODTabsNavigator} />
    //     <Stack.Screen name="NavigateToFaculty" component={NavigateToFaculty} />
    //     <Stack.Screen name="FacultyMain" component={FacultyTabsNavigator} />
    //     {/* <Stack.Screen name='MainStackNavigator' component={MainStackNavigator} /> */}
    //     <Stack.Screen name='Performance' component={Performance} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default App;

//          {/* <Stack.Screen name="NavigateToStudent" component={NavigateToStudent} />
//          <Stack.Screen name="StudentMain" component={StudentHome} /> */}
//        </Stack.Navigator>
//      </NavigationContainer>
//   );
// };

// export default App;
