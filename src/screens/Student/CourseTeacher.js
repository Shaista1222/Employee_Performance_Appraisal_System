import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import CourseServiceListener from '../Services/CourseServiceListener';
import EvaluationService from '../Services/EvaluationService';

const CourseTeacher = ({route, navigation}) => {
  const {studentID, sessionID, courseID} = route.params;
  const [TeacherCourseList, setTeacherCourseList] = useState([]);

  useEffect(() => {
    CourseTeachers(studentID, courseID, sessionID);
  }, []);

  const CourseTeachers = async (studentID, courseID, sessionID) => {
    try {
      const teachers = await CourseServiceListener.getCourseTeachers(
        studentID,
        courseID,
        sessionID,
      );
      console.log('Fetched teachers:', teachers);
      if (teachers && teachers.length > 0) {
        setTeacherCourseList(teachers);
      } else {
        console.log('No courses found for the student.');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      Alert.alert('Error', 'Failed to fetch courses. Please try again later.');
    }
  };

  const evaluateTeacher = async (evaluateeID, type) => {
    try {
      console.log(studentID, evaluateeID, courseID, sessionID);
      const result = await EvaluationService.isEvaluated(
        studentID,
        evaluateeID,
        courseID,
        sessionID,
        'student',
      );
      if (result==true) {
        Alert.alert('You have already evaluated this teacher');
        return;
      } else {
        navigation.navigate('EvaluationQuestionnaire', {
          evaluateeID,
          courseID,
          questionByType: type,
        });
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  
  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>Teachers</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={TeacherCourseList}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.onClick}
              onPress={() => evaluateTeacher(item.id, 'student')}>
              <Text style={styles.courseList}>{item.name}</Text>
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
    marginTop: 250,
    backgroundColor: '#f5f5f5',
  },
  onClick: {
    marginTop: 2,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CourseTeacher;
