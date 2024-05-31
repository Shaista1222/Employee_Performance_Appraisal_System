import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTabMenu} from '../../context/TabContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import MatCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Report from '../../screens/DirectorScreens/Report';
import Task from '../../screens/DirectorScreens/Tasks';
import OptionsModal from './OptionsModal'; // Import OptionsModal
import {COLORS} from '../../theme/theme';
import Evaluator from '../../screens/DirectorScreens/Evaluator';
import OptionWeightage from '../../screens/DirectorScreens/OptionsWeightage';
import EvaluateeListFragment from '../../screens/EvaluateeListFragment';
import MyTasksFragment from '../../screens/MyTasksFragment';
import PerformanceFragment from '../../screens/PerformanceFragment';
import MyScores from '../../screens/MyScores';

const Tab = createBottomTabNavigator();

const EmployeeTabsNavigator = () => {
  const {opened, toggleOpened} = useTabMenu();

  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        initialRouteName="Task"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}>
        <Tab.Screen
          name="Task"
          component={MyTasksFragment}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.tabIconContainer}>
                <FontIcon
                  name="tasks"
                  size={25}
                  color={focused ? COLORS.primary : COLORS.dark}
                />
              </View>
            ),
          }}
          listeners={{
            tabPress: e => opened && e.preventDefault(),
          }}
        />
        <Tab.Screen
          name="Performnace"
          component={PerformanceFragment}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.tabIconContainer}>
                <Ionicons
                  name="bar-chart-sharp"
                  size={25}
                  color={focused ? COLORS.primary : COLORS.dark}
                />
              </View>
            ),
          }}
          listeners={{
            tabPress: e => opened && e.preventDefault(),
          }}
        />
        <Tab.Screen
          name="Evaluatees"
          component={EvaluateeListFragment}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.tabIconContainer}>
                <MatCommunity
                  name="bookmark-check-outline"
                  size={30}
                  color={focused ? COLORS.primary : COLORS.dark}
                />
              </View>
            ),
          }}
          listeners={{
            tabPress: e => opened && e.preventDefault(),
          }}
        />

        <Tab.Screen
          name="My Scores"
          component={MyScores}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.tabIconContainer}>
                <FontIcon
                  name="weight"
                  size={25}
                  color={focused ? COLORS.primary : COLORS.dark}
                />
              </View>
            ),
          }}
          listeners={{
            tabPress: e => opened && e.preventDefault(),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 32,
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderTopColor: 'transparent',
    shadowColor: COLORS.dark,
    shadowOffset: {
      height: 6,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EmployeeTabsNavigator;
