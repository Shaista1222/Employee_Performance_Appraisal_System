import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, useWindowDimensions} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import SessionService from './Services/SessionService';
import EmployeeKPIPerformance from './Services/EmployeeKPIPerformance';
import {
  EmployeeCourseBarChartComponent,
  SessionBarChartComponent,
} from './DirectorScreens/ShowPerformance';
import CourseServiceListener from './Services/CourseServiceListener';
import EmployeeCoursePerformanceService from './Services/EmployeeCoursePerformanceService';

const PerformanceFragment = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Course'},
    {key: 'second', title: 'Session'},
    {key: 'third', title: 'Comparison'},
    {key: 'fourth', title: 'Course-Comparison'},
  ]);

  const [courseList, setCourseList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courseId, setCourseId] = useState('');
  const [sessionList, setSessionList] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [filteredPerformance, setFilteredPerformance] = useState([]);
  const [employeeUser, setEmployeeUser] = useState('');
  const [employeeKpiPerformance, setEmployeeKpiPerformance] = useState([]);

  useEffect(() => {
    const retrieveEmployeeData = async () => {
      try {
        const user = await AsyncStorage.getItem('employee');
        if (user) {
          const parsedUser = JSON.parse(user);
          setEmployeeUser(parsedUser);
        } else {
          Alert.alert('Error', 'Employee data not found');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
        console.error('Error retrieving data:', error);
      }
    };
    retrieveEmployeeData();
  }, []);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await SessionService.getSessions();
        setSessionList(data || []);
        if (data && data.length > 0) {
          setSelectedSession(data[0].id);
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };

    fetchSessions();
  }, []);

  useEffect(() => {
    if (selectedSession && employeeUser) {
      const fetchTeacherCourses = async (teacherID, sessionID) => {
        try {
          const courses = await CourseServiceListener.getTeacherCourses(
            teacherID,
            sessionID,
          );
          const coursesWithPerformance = await Promise.all(
            courses.map(async course => {
              const performanceData =
                await EmployeeCoursePerformanceService.getEmployeeCoursePerformance(
                  employeeUser.employee.id,
                  sessionID,
                  course.id,
                );
              return {
                ...course,
                employeeQuestionScores:
                  performanceData.employeeQuestionScores || [],
              };
            }),
          );
          console.log(courses);
          setCourseList(coursesWithPerformance || []);
          if (coursesWithPerformance && coursesWithPerformance.length > 0) {
            setCourseId(coursesWithPerformance[0].id);
          }
        } catch (error) {
          Alert.alert('Error', error.message);
        }
      };

      fetchTeacherCourses(employeeUser.employee.id, selectedSession);
    }
  }, [selectedSession, employeeUser]);

  // useEffect(() => {
  //   if (selectedSession && courseId) {
  //     const fetchEmployeeCoursePerformance = async (employeeID, sessionID, courseID) => {
  //       try {
  //         const data = await EmployeeCoursePerformanceService.getEmployeeCoursePerformance(
  //           employeeID,
  //           sessionID,
  //           courseID,
  //         );
  //         setEmployeeKpiPerformance(data.employeeQuestionScores || []);
  //       } catch (error) {
  //         Alert.alert('Error', error.message);
  //       }
  //     };

  //     fetchEmployeeCoursePerformance(
  //       employeeUser.employee.id,
  //       selectedSession,
  //       courseId,
  //     );
  //   }
  // }, [selectedSession, courseId]);

  useEffect(() => {
    if (employeeUser && employeeUser.employee) {
      const filtered = employeeKpiPerformance.filter(
        item => item.employee_id == employeeUser.employee.id,
      );
      setFilteredPerformance(filtered);
    }
  }, [employeeKpiPerformance, selectedSession]);

  useEffect(() => {
    if (selectedSession) {
      const fetchEmployeeKpiPerformance = async (employeeID, sessionID) => {
        try {
          const data = await EmployeeKPIPerformance.getKpiEmployeePerformance(
            employeeID,
            sessionID,
          );
          console.log('new data : ' + data);
          setEmployeeKpiPerformance(data || []);
        } catch (error) {
          console.log(error);
          Alert.alert('Error ..', error.message);
        }
      };

      fetchEmployeeKpiPerformance(employeeUser.employee.id, selectedSession);
    }
  }, [selectedSession]);

  // console.log('Employee ID:', employeeUser.employee.id);
  console.log('Selected Session:', selectedSession);
  console.log('Employee KPI Performance:', employeeKpiPerformance);
  console.log('Filtered Performance:', filteredPerformance);

  const FirstRoute = () => (
    <View>
      <Text>Session Route</Text>
      <Text style={styles.label}>Session</Text>
      <View style={styles.showPerformance}>
        <Picker
          selectedValue={selectedSession}
          onValueChange={itemValue => setSelectedSession(itemValue)}
          style={styles.picker}
          dropdownIconColor="black"
          mode="dropdown">
          {sessionList.length > 0 ? (
            sessionList.map((session, index) => (
              <Picker.Item
                key={index}
                label={session.title}
                value={session.id}
              />
            ))
          ) : (
            <Picker.Item label="No sessions available" value="" />
          )}
        </Picker>
      </View>
      <Text>Course Route</Text>
      {courseList.map((course, index) => (
        <EmployeeCourseBarChartComponent
          key={index}
          data={course.employeeQuestionScores.map(score => ({
            kpi_title: course.title, 
            score: score.obtainedScore,
          }))}
        />
      ))}
    </View>
  );

  const SecondRoute = () => (
    <View>
      <Text>Session Route</Text>
      <Text style={styles.label}>Session</Text>
      <View style={styles.showPerformance}>
        <Picker
          selectedValue={selectedSession}
          onValueChange={itemValue => setSelectedSession(itemValue)}
          style={styles.picker}
          dropdownIconColor="black"
          mode="dropdown">
          {sessionList.length > 0 ? (
            sessionList.map((session, index) => (
              <Picker.Item
                key={index}
                label={session.title}
                value={session.id}
              />
            ))
          ) : (
            <Picker.Item label="No sessions available" value="" />
          )}
        </Picker>
      </View>
      {selectedSession && (
        <SessionBarChartComponent data={filteredPerformance} />
      )}
    </View>
  );

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute />;
      case 'second':
        return <SecondRoute />;
      // Third and Fourth Routes
      default:
        return null;
    }
  };

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>Report</Text>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={props => (
          <TabBar
            activeColor={'black'}
            inactiveColor={'gray'}
            {...props}
            scrollEnabled={true}
            style={styles.tabBar}
          />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingTop: 10,
    backgroundColor: '#6360DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 24,
    color: '#fff',
  },
  tabBar: {
    backgroundColor: '#ffffff',
    height: 45,
    marginVertical: -8,
  },
  label: {
    fontSize: 16,
    color: 'black',
  },
  picker: {
    color: 'black',
    width: '100%',
  },
  showPerformance: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default PerformanceFragment;
