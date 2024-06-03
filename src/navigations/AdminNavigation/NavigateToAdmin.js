import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { TabContextProvider } from "../../context/TabContext";
import AdminTabsNavigator from "./AdminTabsNavigator";

const Stack = createNativeStackNavigator();

const NavigateToAdmin = () => {
  return (
    <TabContextProvider>
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="AdminMain" component={AdminTabsNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
  </TabContextProvider>
  );
};

export default NavigateToAdmin;
