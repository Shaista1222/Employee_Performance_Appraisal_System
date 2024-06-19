import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import CourseServiceListener from '../Services/CourseServiceListener';
import {
  checkConfidentialPin,
  checkDegreeExitEligibility,
} from '../Services/EvaluationTimeServices';
import {Student} from '../Services/Student';

const StudentCourse = ({navigation}) => {
  const [studentCourseList, setStudentCourseList] = useState([]);
  const [studentUser, setStudentUser] = useState(null);
  const [currentSessionData, setCurrentSessionData] = useState(null);
  const [userEvaluationPin, setUserEvaluationPin] = useState('');
  const [verifiedPin, setVerifiedPin] = useState(false);
  const [studentSessionTeacherList, setStudentSessionTeacherList] = useState(
    [],
  );
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'student', title: 'Student'},
    {key: 'degreeExit', title: 'Degree Exit'},
    {key: 'confidential', title: 'Confidential'},
  ]);

  const pinInputRef = useRef(null); // Ref for the TextInput

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
      const response = await Student.getStudentSessionTeacher(
        studentID,
        sessionID,
      );
      setStudentSessionTeacherList(response);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const fetchStudentCourses = async (studentID, sessionID) => {
    try {
      const courses = await CourseServiceListener.getStudentCourses(
        studentID,
        sessionID,
      );
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

  const handlePress = id => {
    navigation.navigate('EvaluationQuestionnaire', {
      questionByType: 'confidential',
      evaluateeID: id,
    });
  };

  const checkEligibilityAndNavigate = async () => {
    if (!studentUser) return;
    try {
      const eligibility = await checkDegreeExitEligibility(studentUser.id);
      console.log(eligibility);
      if (eligibility && eligibility.supervisor_id) {
        navigation.navigate('EvaluationQuestionnaire', {
          evaluateeID: eligibility.supervisor_id,
          questionByType: 'degree exit',
        });
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
        pinInputRef.current.blur(); // Blur TextInput after PIN verification
      } else {
        Alert.alert('Error', 'Incorrect PIN');
      }
    } catch (error) {
      console.error('Error in confidentialPin:', error);
      Alert.alert('Error', error.message || 'Network request failed');
    }
  }, [userEvaluationPin, currentSessionData]);

  const StudentRoute = () => (
    <View style={styles.container}>
      <FlatList
        data={studentCourseList}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
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
      <Text style={{color: 'black', fontSize: 23, marginBottom: 10}}>
        Checking eligibility...
      </Text>
    </View>
  );

  const ConfidentialRoute = () => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {!verifiedPin ? (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextInput
              ref={pinInputRef}
              style={styles.input}
              placeholder="Enter pin"
              keyboardType="numeric"
              placeholderTextColor="gray"
              value={userEvaluationPin}
              maxLength={6}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => confidentialPin()}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={studentSessionTeacherList}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.onClick}
                onPress={() => handlePress(item.id)}>
                <Text style={styles.courseList}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );

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
      <View style={{backgroundColor: 'brown', padding: 4}}>
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
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={newIndex => {
          setIndex(newIndex);
          if (routes[newIndex].key === 'degreeExit') {
            checkEligibilityAndNavigate();
          }
        }}
        initialLayout={{width: Dimensions.get('window').width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{backgroundColor: 'white'}}
            style={{backgroundColor: '#6360DC'}}
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
    color: 'black',
  },
  button: {
    width: '26%',
    borderRadius: 4,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  student: {
    fontSize: 20,
    color: '#fff',
  },
  title: {
    paddingTop: 10,
    backgroundColor: '#6360DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  courseList: {
    backgroundColor: '#C0C0C0',
    color: 'black',
    padding: 7,
    fontSize: 20,
    fontFamily: 'sans-serif',
  },
  onClick: {
    marginTop: 2,
    width: '100%',
  },
});

export default StudentCourse;
