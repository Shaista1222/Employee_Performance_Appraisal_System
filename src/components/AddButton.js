import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import {COLORS} from '../theme/theme';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Questionaire from '../screens/DirectorScreens/Questionaire';
import Evaluation from '../screens/DirectorScreens/Evaluation';
import ShowPerformance from '../screens/DirectorScreens/ShowPerformance';
const Stack = createStackNavigator();

const AddButton = ({opened, toggleOpened}) => {
  const navigation = useNavigation();
  const animation = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: opened ? 1 : 0,
      duration: 300,
      friction: 2,
      useNativeDriver: false,
    }).start();
  }, [opened, animation]);

  const opacity = {
    opacity: animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    }),
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('ShowPerformance')}>
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -60],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -50],
                    }),
                  },
                ],
              },
            ]}>
            <View style={styles.itemIcon}>
              <MatIcon name="view-dashboard-edit" size={30} color="white" />
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Questionaire')}>
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -100],
                    }),
                  },
                ],
              },
            ]}>
            <View style={styles.itemIcon}>
              <MatIcon name="opera" size={30} color="white" />
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Evaluation')}>
          <Animated.View
            style={[
              styles.item,
              opacity,
              {
                transform: [
                  {
                    translateX: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 60],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -50],
                    }),
                  },
                ],
              },
            ]}>
            <View style={styles.itemIcon}>
              <MatIcon name="file-question" size={30} color="white" />
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={toggleOpened}
          style={styles.addButton}>
          <Animated.View
            style={[
              styles.addButtonInner,
              {
                transform: [
                  {
                    rotate: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '45deg'],
                    }),
                  },
                ],
              },
            ]}>
            <View style={styles.itemIcon}>
              <Ionicons name="settings" size={30} color="white" />
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};
export const AppNavigator = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="ShowPerformance" component={ShowPerformance} />
      <Stack.Screen name="Questionaire" component={Questionaire} />
      <Stack.Screen name="Evaluation" component={Evaluation} />
      {/* Add more screens if needed */}
     {/*  <Stack.Screen
        name="Add"
        component={AddButton} // Render AddButton as a screen
        options={{
          tabBarButton: () => (
            <AddButton navigation={navigation} /> // Pass navigation prop to AddButton
          ),
        }}
      /> */}
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    height: 0,
  },
  box: {
    position: 'relative',
    width: 60,
    height: 60,
    marginTop: -30,
  },
  addButton: {
    shadowColor: COLORS.dark,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  addButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  addButtonIcon: {
    width: 40,
    height: 40,
    tintColor: COLORS.white,
  },
  item: {
    position: 'absolute',
    top: 5,
    left: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemIcon: {
    width: 32,
    height: 32,
    tintColor: COLORS.white,
  },
});

export default AddButton;
