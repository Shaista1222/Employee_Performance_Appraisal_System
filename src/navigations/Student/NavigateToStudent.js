import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {TabContextProvider} from '../../context/TabContext';
import StudentHome from './StudentHome';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <TabContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="StudentMain"
            component={StudentHome}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TabContextProvider>
  );
};

export default MainNavigator;
