import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import CourseServiceListener from '../../Services/CourseServiceListener';
const CourseTeacher = ({route, navigation}) => {
  const {studentID, sessionID, courseID} = route.params;
  const [TeacherCourseList, setTeacherCourseList] = useState([]);
  const handleTeacherClick = (teacherId, courseId) => {
    navigation.navigate('EvaluateTeacher', {
      teacherId: teacherId,
      sessionId: sessionID,
      studentId: studentID,
      courseId: courseId,
    });
  };

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
              onPress={() => handleTeacherClick(item.teacherId)}>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 250,
    backgroundColor: '#f5f5f5',
  },
  onClick: {
    marginTop: 2,
    backgroundColor: '#f5f5f5',
    // width:'100%'
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
    width:'100%'    
  },
});

export default CourseTeacher;
