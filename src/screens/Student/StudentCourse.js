import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import CourseServiceListener from '../Services/CourseServiceListener';
import {
  checkConfidentialPin,
  checkDegreeExitEligibility,
} from '../Services/EvaluationTimeServices';
import { Student } from '../Services/Student';
import { TextInput } from 'react-native-paper';
import EvaluationService from '../Services/EvaluationService';

const StudentCourse = ({ navigation }) => {
  const [studentCourseList, setStudentCourseList] = useState([]);
  const [studentUser, setStudentUser] = useState(null);
  const [currentSessionData, setCurrentSessionData] = useState(null);
  const [studentSessionTeacherList, setStudentSessionTeacherList] = useState([]);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'student', title: 'Student' },
    { key: 'degreeExit', title: 'Degree Exit' },
    { key: 'confidential', title: 'Confidential' },
  ]);

  const pinInputRef = useRef(null);

  useEffect(() => {
    const retrieveStudentData = async () => {
      try {
        const sessionData = await AsyncStorage.getItem('currentSession');
        const user = await AsyncStorage.getItem('userObject');
        if (sessionData && user) {
          const parsedSessionData = JSON.parse(sessionData);
          const parsedUser = JSON.parse(user);
          setCurrentSessionData(parsedSessionData);
          setStudentUser(parsedUser);
        } else {
          Alert.alert('Error', 'Student session or ID not found');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
        console.error('Error retrieving student data:', error);
      }
    };

    retrieveStudentData();
  }, []);

  useEffect(() => {
    if (studentUser && currentSessionData) {
      fetchStudentCourses(studentUser.id, currentSessionData.id);
    }
  }, [studentUser, currentSessionData]);

  useEffect(() => {
    if (studentUser && currentSessionData) {
      studentSessionTeacher(studentUser.id, currentSessionData.id);
    }
  }, [studentUser, currentSessionData]);

  const studentSessionTeacher = async (studentID, sessionID) => {
    try {
      const response = await Student.getStudentSessionTeacher(studentID, sessionID);
      setStudentSessionTeacherList(response);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const fetchStudentCourses = async (studentID, sessionID) => {
    try {
      const courses = await CourseServiceListener.getStudentCourses(studentID, sessionID);
      if (courses && courses.length > 0) {
        setStudentCourseList(courses);
      } else {
        console.log('No courses found for the student.');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      Alert.alert('Error', 'Failed to fetch courses. Please try again later.');
    }
  };

  const handleCoursePress = courseID => {
    navigation.navigate('CourseTeacher', {
      studentID: studentUser.id,
      sessionID: currentSessionData.id,
      courseID: courseID,
    });
  };

  const evaluateTeacher = async (evaluateeID, type) => {
    try {
      const result = await EvaluationService.isEvaluated(
        studentUser.id,
        evaluateeID,
        0,
        currentSessionData.id,
        type,
      );
      if (result==true) {
        Alert.alert('You have already evaluated this teacher');
        return;
      } else {
        navigation.navigate('EvaluationQuestionnaire', {
          evaluateeID,
          courseID:0,
          questionByType: type,
        });
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const checkEligibilityAndNavigate = async () => {
    if (!studentUser) return;
    try {
      const eligibility = await checkDegreeExitEligibility(studentUser.id);
      console.log(eligibility);
      if (eligibility && eligibility.supervisor_id) {
        await evaluateTeacher(eligibility.supervisor_id, 'degree exit');
      } else {
        Alert.alert(
          'Notice',
          'You are not eligible for degree exit evaluation.',
        );
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handlePress = async (id) => {
    await evaluateTeacher(id, 'confidential');
  };

  const StudentRoute = () => (
    <View style={styles.container}>
      <FlatList
        data={studentCourseList}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.onClick}
            onPress={() => handleCoursePress(item.id)}>
            <Text style={styles.courseList}>
              {item.course_code} - {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const DegreeExitRoute = () => (
    <View style={styles.container}>
      <Text style={{ color: 'black', fontSize: 23, marginBottom: 10 }}>
        Checking eligibility...
      </Text>
    </View>
  );

  const ConfidentialRoute = () => {
    const [userEvaluationPin, setUserEvaluationPin] = useState('');
    const [verifiedPin, setVerifiedPin] = useState(false);

    const handleInputChange = text => {
      setUserEvaluationPin(text);
    };

    const confidentialPin = useCallback(async () => {
      if (!userEvaluationPin) {
        Alert.alert('Error', 'Please enter a PIN');
        return;
      }
      try {
        console.log('Sending PIN:', userEvaluationPin);
        const evaluationPin = await checkConfidentialPin(
          currentSessionData.id,
          userEvaluationPin,
        );
        if (evaluationPin === true) {
          setVerifiedPin(true);
          console.log('PIN verified successfully');
          setUserEvaluationPin('');
        } else {
          Alert.alert('Error', 'Incorrect PIN');
        }
      } catch (error) {
        console.error('Error in confidentialPin:', error);
        Alert.alert('Error', error.message || 'Network request failed');
      }
    }, [userEvaluationPin, verifiedPin]);

    return (
      <View style={styles.container}>
        {!verifiedPin ? (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextInput
              style={styles.input}
              value={userEvaluationPin}
              onChangeText={handleInputChange}
              placeholder="Type here..."
              keyboardType="numeric"
              maxLength={6}
            />
            <TouchableOpacity style={styles.button} onPress={confidentialPin}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={studentSessionTeacherList}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.onClick}
                onPress={() => handlePress(item.id)}>
                <Text style={styles.courseList}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    );
  };

  const renderScene = SceneMap({
    student: StudentRoute,
    degreeExit: DegreeExitRoute,
    confidential: ConfidentialRoute,
  });

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>Course</Text>
      </View>
      <View style={{ backgroundColor: 'brown', padding: 4 }}>
        {studentUser && (
          <>
            <Text style={styles.student}>{studentUser.name}</Text>
            <Text style={styles.student}>{studentUser.arid_no}</Text>
            <Text style={styles.student}>
              {studentUser.discipline}-{studentUser.section}
            </Text>
          </>
        )}
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={newIndex => {
          setIndex(newIndex);
          if (routes[newIndex].key === 'degreeExit') {
            checkEligibilityAndNavigate();
          }
        }}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: '#6360DC' }}
          />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 50,
    width: '70%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  button: {
    width: '26%',
    borderRadius: 4,
    backgroundColor: '#6360DC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  onClick: {
    backgroundColor: '#bfc5cc',
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 5,
  },
  courseList: {
    color: 'black',
    fontSize: 20,
  },
  title: {
    backgroundColor: 'brown',
    padding: 10,
  },
  titleText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  student: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

export default StudentCourse;
