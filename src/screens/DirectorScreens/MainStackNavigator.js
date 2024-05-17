import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Report from './Report';
import Performance from './Performance';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Report"
        component={Report}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Performance"
        component={Performance}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
