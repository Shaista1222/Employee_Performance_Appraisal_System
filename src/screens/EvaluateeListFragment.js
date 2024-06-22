import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EvaluatorService from './Services/EvaluatorService';
import {getTeacherJuniors} from './Services/JuniorEmployeeService';
import EvaluationService from './Services/EvaluationService';
import CourseServiceListener from './Services/CourseServiceListener';

const EvaluateeList = ({evaluatees, onPress}) => (
  <FlatList
    data={evaluatees}
    renderItem={({item}) => (
      <TouchableOpacity onPress={() => onPress(item.id)}>
        <View style={styles.itemContainer}>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )}
    keyExtractor={item =>
      item.id ? item.id.toString() : Math.random().toString()
    }
  />
);

const JuniorEvaluateeList = ({evaluatees, onPress}) => (
  <FlatList
    data={evaluatees}
    renderItem={({item}) => (
      <TouchableOpacity
        onPress={() => onPress(item.employee.id, item.course.id)}>
        <View style={styles.itemContainer}>
          <Text style={styles.name}>{item.employee.name}</Text>
          <Text style={styles.name}>{item.course.title}</Text>
        </View>
      </TouchableOpacity>
    )}
    keyExtractor={item =>
      item.employee.id ? item.employee.id.toString() : Math.random().toString()
    }
  />
);

const EvaluateeListFragment = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'peer', title: 'Peer'},
    {key: 'junior', title: 'Junior'},
  ]);

  const [evaluateeList, setEvaluateeList] = useState([]);
  const [juniorList, setJuniorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employeeUser, setEmployeeUser] = useState(null);
  const [currentSessionData, setCurrentSessionData] = useState(null);
  const [teacherCourseList, setTeacherCourseList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const retrieveEmployeeData = async () => {
      try {
        const sessionData = await AsyncStorage.getItem('currentSession');
        const user = await AsyncStorage.getItem('employee');
        if (sessionData && user) {
          setCurrentSessionData(JSON.parse(sessionData));
          setEmployeeUser(JSON.parse(user));
        } else {
          Alert.alert('Error', 'Session or employee data not found');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };
    retrieveEmployeeData();
  }, []);

  useEffect(() => {
    if (employeeUser && employeeUser.employee && currentSessionData) {
      fetchEvaluatees(employeeUser.employee.id, currentSessionData.id);
      fetchJuniors(employeeUser.employee.id, currentSessionData.id);
    }
  }, [employeeUser, currentSessionData]);

  const fetchEvaluatees = async (evaluatorID, sessionID) => {
    try {
      const data = await EvaluatorService.getEvaluatees(evaluatorID, sessionID);
      setEvaluateeList(data);
    } catch (error) {
      Alert.alert('Error fetching evaluatees', error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTeacherCourses = async (teacherID, sessionID) => {
    try {
      const data = await CourseServiceListener.getTeacherCourses(
        teacherID,
        sessionID,
      );
      setTeacherCourseList(data);
    } catch (error) {
      Alert.alert('Error fetching teacher courses', error.message);
    }
  };

  const fetchJuniors = async (evaluatorID, sessionID) => {
    try {
      const data = await getTeacherJuniors(evaluatorID, sessionID);
      setJuniorList(data);
    } catch (error) {
      Alert.alert('Error fetching juniors', error.message);
    } finally {
      setLoading(false);
    }
  };

  const evaluate = async (evaluateeID, type, courseID) => {
    try {
      const alreadyEvaluated = await EvaluationService.isEvaluated(
        employeeUser.employee.id,
        evaluateeID,
        courseID,
        currentSessionData.id,
        type,
      );

      console.log('isEvaluated response:', alreadyEvaluated);

      if (alreadyEvaluated == true) {
        Alert.alert('You have already evaluated this teacher');
        return;
      } else {
        navigation.navigate('EvaluationQuestionnaire', {
          evaluateeID,
          courseID,
          teacherId: 0,
          questionByType: type,
        });
      }
    } catch (error) {
      console.error('Error in evaluation check:', error);
      Alert.alert('Error', error.message || 'An unexpected error occurred.');
    }
  };

  const handlePeerPress = async id => {
    setSelectedEmployee(id);
    fetchTeacherCourses(id, currentSessionData.id);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{color: 'black'}}>Loading...</Text>
      </View>
    );
  }

  const renderScene = SceneMap({
    peer: () => (
      <View style={styles.scene}>
        <EvaluateeList evaluatees={evaluateeList} onPress={handlePeerPress} />
        {selectedEmployee && teacherCourseList.length > 0 && (
          <ScrollView>
            <Text style={styles.name}>Courses for selected employee:</Text>
            {teacherCourseList.map(course => (
              <View style={styles.itemContainer} key={course.id}>
                <TouchableOpacity
                  onPress={() => evaluate(selectedEmployee, 'peer', course.id)}>
                  <Text style={styles.name}>{course.title}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    ),
    junior: () => (
      <View style={styles.scene}>
        <JuniorEvaluateeList
          evaluatees={juniorList}
          onPress={(id, courseID) => evaluate(id, 'senior', courseID)}
        />
      </View>
    ),
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.label}
    />
  );

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: Dimensions.get('window').width}}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#6360DC',
  },
  indicator: {
    backgroundColor: '#fff',
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default EvaluateeListFragment;
