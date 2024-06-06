import React, { useEffect, useState } from 'react';
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

const StudentCourse = ({ navigation }) => {
  const [studentCourseList, setStudentCourseList] = useState([]);
  const [studentUser, setStudentUser] = useState(null);
  const [currentSessionData, setCurrentSessionData] = useState(null);

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
      console.log(studentUser.name, currentSessionData.id)
      fetchStudentCourses(studentUser.id, currentSessionData.id);
    }
  }, [studentUser, currentSessionData]);

  const fetchStudentCourses = async (studentID, sessionID) => {
    try {
      const courses = await CourseServiceListener.getStudentCourses(studentID, sessionID);
      if (courses && courses.length > 0) {
        setStudentCourseList(courses);
        console.log('Student')
      } else {
        console.log('No courses found for the student.');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      Alert.alert('Error', 'Failed to fetch courses. Please try again later.');
    }
  };

  const handleCoursePress = (courseID) => {
    console.log(studentUser.id);
    navigation.navigate('CourseTeacher', {
      studentID: studentUser.id,
      sessionID: currentSessionData.id,
      courseID: courseID,
    });
  };

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>Course</Text>
      </View>
      <View style={{ backgroundColor: 'brown' }}>
        {studentUser && (
          <>
            <Text style={styles.student}>{studentUser.name}</Text>
            <Text style={styles.student}>{studentUser.arid_no}</Text>
            <Text style={styles.student}>{studentUser.discipline}-{studentUser.section}</Text>
          </>
        )}
      </View>

      <View style={styles.container}>
        <FlatList
          data={studentCourseList}
          keyExtractor={(item) => item.id.toString()} // Ensure id is converted to string
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.onClick}
              onPress={() => handleCoursePress(item.id)}
            >
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
    marginTop: 150,
    backgroundColor: '#f5f5f5',
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
