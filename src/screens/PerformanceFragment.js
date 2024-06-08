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
    {key: 'second', title: 'kpi'},
    {key: 'third', title: 'Comparison'},
    {key: 'fourth', title: 'Course-Comparison'},
  ]);

  const [courseList, setCourseList] = useState([]);
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
                await EmployeeCoursePerformanceService.getEmployeeCoursesPerformance(
                  employeeUser.employee.id,
                  sessionID,
                  [course.id],
                );

              const obtainedScore =
                performanceData.length > 0 ? performanceData[0].average : 0;

              return {
                ...course,
                obtainedScore: obtainedScore,
              };
            }),
          );
          setCourseList(coursesWithPerformance || []);
        } catch (error) {
          Alert.alert('Error', error.message);
        }
      };
      fetchTeacherCourses(employeeUser.employee.id, selectedSession);
    }
  }, [selectedSession, employeeUser]);

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
          setEmployeeKpiPerformance(data || []);
        } catch (error) {
          console.log(error);
          Alert.alert('Error ..', error.message);
        }
      };

      fetchEmployeeKpiPerformance(employeeUser.employee.id, selectedSession);
    }
  }, [selectedSession]);

  const FirstRoute = () => (
    <View>
     
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
      {courseList.map((course, index) => (
        <EmployeeCourseBarChartComponent key={index} course={course} />
      ))}
    </View>
  );

  const SecondRoute = () => (
    <View>
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
