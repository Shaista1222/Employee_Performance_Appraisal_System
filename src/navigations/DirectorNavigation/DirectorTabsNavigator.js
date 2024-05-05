import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTabMenu} from '../../context/TabContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import MatCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Report from '../../screens/DirectorScreens/Report';
import Task from '../../screens/Task';
import OptionsModal from './OptionsModal'; // Import OptionsModal
import {COLORS} from '../../theme/theme';
import Evaluator from '../../screens/DirectorScreens/Evaluator';
import OptionWeightage from '../../screens/DirectorScreens/OptionWeightage';

const Tab = createBottomTabNavigator();

const DirectorTabsNavigator = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {opened, toggleOpened} = useTabMenu();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

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
          component={Task}
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
          name="Report"
          component={Report}
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
          name="Settings"
          component={() => null} // Render an empty component for the plus button
          options={{
            tabBarButton: ({focused}) => (
              <TouchableOpacity
                style={[styles.tabIconContainer, focused && styles.focusedTab]}
                onPress={() => toggleModal()}>
                <FontIcon
                  name="plus"
                  size={25}
                  color={focused ? COLORS.primary : COLORS.dark}
                />
              </TouchableOpacity>
            ),
          }}
          listeners={{
            tabPress: e => opened && e.preventDefault(),
          }}
        />
        <Tab.Screen
          name="Evaluators"
          component={Evaluator}
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
          name="Options Weightage"
          component={OptionWeightage}
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

      {/* Render the OptionsModal */}
      <OptionsModal visible={modalVisible} onClose={toggleModal} />
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

export default DirectorTabsNavigator;
