// src/screens/Performance.js
import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import {View, Text, StyleSheet, Alert, useWindowDimensions, TouchableOpacity} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import SessionService from '../Services/SessionService';
import {
  EmployeeCourseBarChartComponent,
  SessionBarChartComponent,
  QuestionScoreBarChartComponent,
  EmployeeSubKpiBarChartComponent,
  EmployeeSubBarChartComponent,
} from './ShowPerformance';
import EmployeeKPIPerformance from '../Services/EmployeeKPIPerformance';
import EmployeeCoursePerformanceService from '../Services/EmployeeCoursePerformanceService';
import {getQuestionsScores} from '../Services/QuestionsScores';
import QuestionaireServiceListner from '../Services/QuestionaireServiceListner';
import {getSubKPIs, getSubKpiEmployeePerformance} from '../Services/SubKpiServices';

const Performance = ({route}) => {
  const {employee} = route.params;
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'KPI'},
    {key: 'second', title: 'Sub KPI'},
    {key: 'third', title: 'Course'},
    {key: 'fourth', title: 'Question'},
    // {key: 'fifth', title: 'Sub'},

  ]);

  const [courseList, setCourseList] = useState([]);
  const [sessionList, setSessionList] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [filteredPerformance, setFilteredPerformance] = useState([]);
  const [filteredSubKpiPerformance, setFilteredSubKpiPerformance] = useState(
    [],
  );
  const [evaluationQuestionScore, setEvaluationQuestionScore] = useState([]);
  const [employeeKpiPerformance, setEmployeeKpiPerformance] = useState([]);
  const [subKpiList, setSubKpiList] = useState([]);
  const [evaluationTypeId, setEvaluationTypeId] = useState('');
  const [subKpiId, setSubKpiId] = useState('');
  const [selectedEvaluationType, setSelectedEvaluationType] = useState('');
  const [evaluationTypeList, setEvaluationTypeList] = useState([]);
  const [employeeSubKpiPerformance, setEmployeeSubKpiPerformance] = useState(
    [],
  );
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
    const fetchSubKpi = async () => {
      try {
        const data = await getSubKPIs(selectedSession);
        setSubKpiList(data || []);
        if (data && data.length > 0) {
          setSubKpiId(data[0].id);
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };
    fetchSubKpi(selectedSession)
    fetchSessions();
  }, []);
  useEffect(() => {
    if (selectedSession && employee) {
      const fetchTeacherCourses = async (teacherID, sessionID) => {
        try {
          const courses =
            await EmployeeCoursePerformanceService.getEmployeeCoursesPerformance(
              teacherID,
              sessionID,
            );
          setCourseList(courses || []);
        } catch (error) {
          Alert.alert('Error', error.message);
        }
      };
      fetchTeacherCourses(employee.id, selectedSession);
    }
  }, [selectedSession, employee]);

  useEffect(() => {
    if (employee) {
      const filtered = employeeKpiPerformance.filter(
        item => item.employee_id == employee.id,
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

      fetchEmployeeKpiPerformance(employee.id, selectedSession);
    }
  }, [selectedSession]);
  useEffect(() => {
    if (selectedSession) {
      const fetchEmployeeSubKpiPerformance = async (employeeID, sessionID) => {
        try {
          const data = await getSubKpiEmployeePerformance(
            employeeID,
            sessionID,
          );
          setEmployeeSubKpiPerformance(data || []);
          console.log('Data of SubKPI', data);
        } catch (error) {
          console.log(error);
          Alert.alert('Error ..', error.message);
        }
      };

      fetchEmployeeSubKpiPerformance(employee.id, selectedSession);
    }
  }, [selectedSession]);

  useEffect(() => {
    if (employee) {
      const filtered = employeeSubKpiPerformance.filter(
        item => item.employee_id == employee.id,
      );
      console.log('Filtered Sub KPI Performance:', filtered);
      setFilteredSubKpiPerformance(filtered);
    }
  }, [employeeSubKpiPerformance, selectedSession]);

  useEffect(() => {
    const fetchEvaluationType = async () => {
      try {
        const data = await QuestionaireServiceListner.getQuestionnaireTypes();
        setEvaluationTypeList(data);
        console.log(data);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };
    fetchEvaluationType();
  }, []);

  useEffect(() => {
    if (selectedEvaluationType) {
      setEvaluationTypeId(selectedEvaluationType);
      console.log('Selected Evaluation Type:', selectedEvaluationType);
    }
  }, [selectedEvaluationType]);

  useEffect(() => {
    const fetchQuestionScores = async () => {
      try {
        const data = await getQuestionsScores(
          employee.id,
          selectedSession,
          evaluationTypeId,
        );
        setEvaluationQuestionScore(data);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };

    fetchQuestionScores();
  }, [employee.id, selectedSession, evaluationTypeId]);

  // const toggleSessionSelection = id => {
  //   if (selectedSessions.includes(id)) {
  //     setSelectedSessions(
  //       selectedEmployees.filter(sessionId => sessionId !== id),
  //     );
  //   } else {
  //     setSelectedSessions([...selectedSessions, id]);
  //   }
  // };
  // const SessionDropdown = () => (
  //   <View>
  //     <TouchableOpacity
  //       style={styles.pickerContainer}
  //       onPress={() =>
  //         setIsSessionDropdownVisible(!isSessionDropdownVisible)
  //       }>
  //       <Text style={styles.pickerText}>Select Employees</Text>
  //       <Ionicons
  //         name={isSessionDropdownVisible ? 'chevron-up' : 'chevron-down'}
  //         size={20}
  //         color="#000"
  //       />
  //     </TouchableOpacity>
  //     {isEmployeeDropdownVisible && (
  //       <View style={styles.dropdown}>
  //         <FlatList
  //           data={sessionList}
  //           keyExtractor={item => item.id.toString()}
  //           renderItem={({item}) => (
  //             <View style={styles.checkboxContainer}>
  //               <CheckBox
  //                 value={selectedSession.includes(item.id)}
  //                 onValueChange={() => toggleSessionSelection(item.id)}
  //               />
  //               <Text style={styles.label}>{item.name}</Text>
  //             </View>
  //           )}
  //         />
  //       </View>
  //     )}
  //   </View>
  // );
  const FirstRoute = () => (
    <View>
      <View style={{backgroundColor: 'brown', padding: 6}}>
        <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
          {employee.name}
        </Text>
      </View>
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
  const SecondRoute = () => (
    <View>
      <View style={{backgroundColor: 'brown', padding: 6}}>
        <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
          {employee.name}
        </Text>
      </View>
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
        <EmployeeSubKpiBarChartComponent
          kpiPerformanceData={filteredSubKpiPerformance}
        />
      )}
    </View>
  );

  const ThirdRoute = () => (
    <View>
      <View style={{backgroundColor: 'brown', padding: 6}}>
        <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
          {employee ? employee.name : 'Loading...'}
        </Text>
      </View>
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
      {courseList.length > 0 ? (
        <EmployeeCourseBarChartComponent courses={courseList} />
      ) : (
        <Text>No courses available</Text>
      )}
    </View>
  );

  const FourthRoute = () => (
    <View>
      <View style={{backgroundColor: 'brown', padding: 6}}>
        <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>
          {employee.name}
        </Text>
      </View>
      <Text style={styles.label}>Question Score</Text>
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
      <Text style={styles.label}>Evaluation Type</Text>
      <View style={styles.showPerformance}>
        <Picker
          selectedValue={selectedEvaluationType}
          onValueChange={itemValue => setSelectedEvaluationType(itemValue)}
          style={styles.picker}
          dropdownIconColor="black"
          mode="dropdown">
          {evaluationTypeList.map((evaluationType, index) => (
            <Picker.Item
              key={index}
              label={evaluationType.name}
              value={evaluationType.id}
            />
          ))}
        </Picker>
      </View>
      <QuestionScoreBarChartComponent data={evaluationQuestionScore} />
    </View>
  );
  const FifthRoute = () => (
    <View>
      <View style={{ backgroundColor: 'brown', padding: 6 }}>
        <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
          {employee.name}
        </Text>
      </View>
      <View style={styles.showPerformance}>
        <Picker
          selectedValue={selectedSession}
          onValueChange={(itemValue) => setSelectedSession(itemValue)}
          style={styles.picker}
          dropdownIconColor="black"
          mode="dropdown"
        >
          <Picker.Item label="--Select Session--" />
          {sessionList.length > 0 ? (
            sessionList.map((session, index) => (
              <Picker.Item key={index} label={session.title} value={session.id} />
            ))
          ) : (
            <Picker.Item label="No sessions available" value="" />
          )}
        </Picker>
      </View>
      <View style={styles.showPerformance}>
        <Picker
          selectedValue={subKpiId}
          onValueChange={(itemValue) => setSubKpiId(itemValue)}
          style={styles.picker}
          dropdownIconColor="black"
          mode="dropdown"
        >
          <Picker.Item label="--Select Sub KPI--" />
          {subKpiList.length > 0 ? (
            subKpiList.map((subKpi, index) => (
              <Picker.Item key={index} label={subKpi.name} value={subKpi.id} />
            ))
          ) : (
            <Picker.Item label="No Sub-KPI available" value="" />
          )}
        </Picker>
      </View>
      {selectedSession && (
        <EmployeeSubBarChartComponent
          kpiPerformanceData={filteredSubKpiPerformance}
          selectedSubKpiId={subKpiId}
        />
      )}
    </View>
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
        // case 'fifth':
        //   return <FifthRoute />;
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
    padding: 6,
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
