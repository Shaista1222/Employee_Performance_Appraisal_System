import React from 'react';
import {TabContextProvider} from '../../context/TabContext';
import HODTabsNavigator from './HODTabsNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <TabContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="HODMain"
            component={HODTabsNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TabContextProvider>
  );
};

export default MainNavigator;
