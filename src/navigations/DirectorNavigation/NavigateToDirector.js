import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import TabsNavigator from "./DirectorTabsNavigator";
import { TabContextProvider } from "../../context/TabContext";
import DirectorTabsNavigator from "./DirectorTabsNavigator";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <TabContextProvider>
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="DirectorMain" component={DirectorTabsNavigator } />
    </Stack.Navigator>
  </NavigationContainer>
  </TabContextProvider>
  );
};

export default MainNavigator;
