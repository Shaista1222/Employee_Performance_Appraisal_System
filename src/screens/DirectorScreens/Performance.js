import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import {View, Text, StyleSheet, Alert, useWindowDimensions} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import CourseServiceListener from '../Services/CourseServiceListener';
import SessionService from '../Services/SessionService';
import {BarChartComponent, SessionBarChartComponent} from './ShowPerformance';
import EmployeeKPIPerformance from '../Services/EmployeeKPIPerformance';

const Performance = ({route}) => {
  const {employee} = route.params;
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Course'},
    {key: 'second', title: 'Session'},
    {key: 'third', title: 'Comparison'},
    {key: 'fourth', title: 'Course-Comparison'},
  ]);

  const [courseList, setCourseList] = useState([]);
  const [sessionList, setSessionList] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [filteredPerformance, setFilteredPerformance] = useState([]);

  const [employeeKpiPerformance, setEmployeeKpiPerformance] = useState([]);

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
    if (selectedSession) {
      const fetchTeacherCourses = async (teacherID, sessionID) => {
        try {
          const data = await CourseServiceListener.getTeacherCourses(
            teacherID,
            sessionID,
          );
          setCourseList(data || []);
          if (data && data.length > 0) {
            setSelectedCourse(data[0].id);
          }
        } catch (error) {
          Alert.alert('Error', error.message);
        }
      };

      fetchTeacherCourses(employee.id, selectedSession);
    }
  }, [selectedSession]);

  useEffect(() => {
    const filtered = employeeKpiPerformance.filter(
      item => item.employee_id == employee.id,
    );
    setFilteredPerformance(filtered);
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

      fetchEmployeeKpiPerformance(employee.id, selectedSession);
    }
  }, [selectedSession]);

  console.log('Employee ID:', employee.id);
  console.log('Selected Session:', selectedSession);
  console.log('Employee KPI Performance:', employeeKpiPerformance);

  console.log('Filtered Performance:', filteredPerformance);

  const FirstRoute = () => (
    <>
      <View style={{backgroundColor: 'brown', padding: 4}}>
        <Text style={styles.topName}>{employee.name}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Course</Text>
        <Picker
          selectedValue={selectedCourse}
          onValueChange={itemValue => setSelectedCourse(itemValue)}
          style={styles.picker}
          dropdownIconColor="black"
          mode="dropdown">
          {courseList.length > 0 ? (
            courseList.map((course, index) => (
              <Picker.Item key={index} label={course.title} value={course.id} />
            ))
          ) : (
            <Picker.Item label="No courses available" value="" />
          )}
        </Picker>
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
        {selectedCourse && selectedSession && (
          <BarChartComponent data={filteredPerformance} />
        )}
      </View>
    </>
  );

  const SecondRoute = () => (
    <>
      <View
        style={{
          backgroundColor: 'brown',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.topName}>{employee.name}</Text>
      </View>
      <View style={styles.container}>
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
        <SessionBarChartComponent />
      </View>
    </>
  );

  const ThirdRoute = () => (
    <View style={{flex: 1, backgroundColor: '#ff4081'}} />
  );

  const FourthRoute = () => (
    <View style={{flex: 1, backgroundColor: '#673ab7'}} />
  );

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute />;
      case 'second':
        return <SecondRoute />;
      case 'third':
        return <ThirdRoute />;
      case 'fourth':
        return <FourthRoute />;
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
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f5f5f5',
  },
  showPerformance: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
  },
  label: {
    fontSize: 16,
    color: 'black',
  },
  picker: {
    color: 'black',
    width: '100%',
  },
  pickerCompare: {
    color: 'black',
    width: '45%',
  },
  topName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  tabBar: {
    backgroundColor: '#ffffff',
    height: 45,
    marginVertical: -8,
  },
});

export default Performance;
