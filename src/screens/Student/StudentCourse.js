import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CourseServiceListener from '../Services/CourseServiceListener';

const StudentCourse = ({navigation}) => {
  const [studentCourseList, setStudentCourseList] = useState([]);
  const [studentUser, setStudentUser] = useState(null);
  const [currentSessionData, setCurrentSessionData] = useState(null);

  useEffect(() => {
    retrieveStudentData();
  }, []);

  const retrieveStudentData = async () => {
    try {
      const sessionData = JSON.parse(await AsyncStorage.getItem('session'));
      const user = JSON.parse(await AsyncStorage.getItem('studentUser'));
      console.log(user, sessionData); // Check if you're getting the expected data here
      if (sessionData && user) {
        setCurrentSessionData(sessionData);
        setStudentUser(user);
        fetchStudentCourses(user.id, sessionData.id);
      } else {
        Alert.alert('Error', 'Student session or ID not found in AsyncStorage');
      }
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
      console.log('Fetched courses:', courses); // Check if courses are fetched correctly
      if (courses && courses.length > 0) {
        setStudentCourseList(courses); // Update studentCourseList only if courses are not empty
      } else {
        console.log('No courses found for the student.');
      }
    } catch (error) {
      console.error('Error fetching courses:', error); // Log any errors that occur during fetching
      Alert.alert('Error', 'Failed to fetch courses. Please try again later.');
    }
  };

  const handleCoursePress = courseID => {
    navigation.navigate('CourseTeacher', {
      studentID: studentUser.id,
      sessionID: currentSessionData.id,
      courseID: courseID, // Make sure to include the courseID parameter
    });
  };

  console.log('Rendering with studentCourseList:', studentCourseList); // Check if studentCourseList is populated

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>Course</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={studentCourseList}
          keyExtractor={item => item.id.toString()} // Ensure id is converted to string
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 250,
    backgroundColor: '#f5f5f5',
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
    // width:'100%'
  },
  onClick: {
    marginTop: 2,
    width: '100%',
  },
});

export default StudentCourse;
