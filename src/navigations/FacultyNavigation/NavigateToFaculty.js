import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import TabsNavigator from "./FacultyTabsNavigator";
import { TabContextProvider } from "../../context/TabContext";
import FacultyTabsNavigator from "./FacultyTabsNavigator";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <TabContextProvider>
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="FacultyMain" component={FacultyTabsNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
  </TabContextProvider>
  );
};

export default MainNavigator;
