import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import SessionService from '../Services/SessionService';
import EmployeeService from '../Services/EmployeeService';
import CourseServiceListener from '../Services/CourseServiceListener';
import {Picker} from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EmployeeCoursePerformanceService from '../Services/EmployeeCoursePerformanceService';
import {
  MultipleEmployeeQuestionPerformanceChart,
  MultipleEmployeeCourseBarChartComponent,
  MultipleEmployeeKPIBarChartComponent,
} from './ComparisonBarChart';
import EmployeeKPIPerformance from '../Services/EmployeeKPIPerformance';
import QuestionaireServiceListner from '../Services/QuestionaireServiceListner';
import {getMultiEmployeeQuestionScore} from '../Services/QuestionsScores';

const PerformanceComparison = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Course Comparison'},
    {key: 'second', title: 'KPI Comparison'},
    {key: 'third', title: 'Question Comparison'},
    {key: 'fourth', title: 'Sub KPI Comparison'},

  ]);

  const [courseList, setCourseList] = useState([]);
  const [sessionList, setSessionList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [evaluationTypeList, setEvaluationTypeList] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [selectedEvaluationType, setSelectedEvaluationType] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [isEmployeeDropdownVisible, setIsEmployeeDropdownVisible] = useState(false);
  const [isCourseDropdownVisible, setIsCourseDropdownVisible] = useState(false);
  const [performanceData, setPerformanceData] = useState([]);
  const [kpiPerformanceData, setKPIPerformanceData] = useState([]);
  const [questionPerformanceData, setQuestionPerformanceData] = useState([]);
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
    const fetchEmployees = async () => {
      try {
        const data = await EmployeeService.getEmployees();
        setEmployeeList(data || []);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await CourseServiceListener.getCourses();
        setCourseList(data || []);
        if (data && data.length > 0) {
          setSelectedCourse([data[0].id]);
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchEvaluationType = async () => {
      try {
        const data = await QuestionaireServiceListner.getQuestionnaireTypes();
        setEvaluationTypeList(data || []);
        if (data && data.length > 0) {
          setSelectedEvaluationType(data[0].id);
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };
    fetchEvaluationType();
  }, []);

  const toggleEmployeeSelection = id => {
    if (selectedEmployees.includes(id)) {
      setSelectedEmployees(
        selectedEmployees.filter(employeeId => employeeId !== id),
      );
    } else {
      setSelectedEmployees([...selectedEmployees, id]);
    }
  };

  const toggleCourseSelection = id => {
    if (selectedCourse.includes(id)) {
      setSelectedCourse(selectedCourse.filter(courseId => courseId !== id));
    } else {
      setSelectedCourse([...selectedCourse, id]);
    }
  };
  const fetchQuestionPerformanceData = async () => {
    try {
      const response = await getMultiEmployeeQuestionScore(
        selectedEmployees,
        selectedEvaluationType,
        selectedSession,
      );
      console.log('API response:', response);
      setQuestionPerformanceData(response || []);
    } catch (error) {
      Alert.alert('Error', error.message);
      setQuestionPerformanceData([]);
    }
  };

  const fetchPerformanceData = async () => {
    try {
      const response = await EmployeeCoursePerformanceService.getMultiEmployeeCourseScore(
        selectedEmployees,
        selectedCourse,
        selectedSession,
      );
      setPerformanceData(response);
      console.log("Response", response);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  const fetchKPIPerformanceData = async () => {
    try {
      const response = await EmployeeKPIPerformance.compareEmployeeKpiScore(
        selectedEmployees, selectedSession
      );
      setKPIPerformanceData(response);
      console.log("Response getting",response)
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const EmployeeDropdown = () => (
    <View>
      <TouchableOpacity
        style={styles.pickerContainer}
        onPress={() =>
          setIsEmployeeDropdownVisible(!isEmployeeDropdownVisible)
        }>
        <Text style={styles.pickerText}>Select Employees</Text>
        <Ionicons
          name={isEmployeeDropdownVisible ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#000"
        />
      </TouchableOpacity>
      {isEmployeeDropdownVisible && (
        <View style={styles.dropdown}>
          <FlatList
            data={employeeList}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.checkboxContainer}>
                <CheckBox
                  value={selectedEmployees.includes(item.id)}
                  onValueChange={() => toggleEmployeeSelection(item.id)}
                />
                <Text style={styles.label}>{item.name}</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );

  const CourseDropdown = () => (
    <View>
      <TouchableOpacity
        style={styles.pickerContainer}
        onPress={() => setIsCourseDropdownVisible(!isCourseDropdownVisible)}>
        <Text style={styles.pickerText}>Select Course</Text>
        <Ionicons
          name={isCourseDropdownVisible ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#000"
        />
      </TouchableOpacity>
      {isCourseDropdownVisible && (
        <View style={styles.dropdown}>
          <FlatList
            data={courseList}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.checkboxContainer}>
                <CheckBox
                  value={selectedCourse.includes(item.id)}
                  onValueChange={() => toggleCourseSelection(item.id)}
                />
                <Text style={styles.label}>{item.title}</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
const FirstRoute = () => (
    <View style={styles.container}>
      <Text style={styles.label}>Session</Text>
      <View style={styles.showPerformance}>
        <Picker
          selectedValue={selectedSession}
          onValueChange={(itemValue) => setSelectedSession(itemValue)}
          style={styles.picker}
          dropdownIconColor="black"
          mode="dropdown">
          {sessionList.length > 0 ? (
            sessionList.map((session, index) => (
              <Picker.Item key={index} label={session.title} value={session.id} />
            ))
          ) : (
            <Picker.Item label="No sessions available" value="" />
          )}
        </Picker>
      </View>
      <Text style={styles.label}>Course</Text>
      <View style={styles.showPerformance}>
        <CourseDropdown />
      </View>
      <Text style={styles.label}>Employee</Text>
      <View style={styles.showPerformance}>
        <EmployeeDropdown />
      </View>
      <TouchableOpacity style={styles.button} onPress={fetchPerformanceData}>
        <Text style={styles.buttonText}>Show Performance</Text>
      </TouchableOpacity>
      {performanceData.length > 0 ? (
        <MultipleEmployeeCourseBarChartComponent performanceData={performanceData} />
      ) : (
        <Text>No data to display</Text>
      )}
    </View>
  );


  const ThirdRoute = () => (
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
      <Text style={styles.label}>Evaluation Type</Text>

      <View style={styles.showPerformance}>
        <Picker
          selectedValue={selectedEvaluationType}
          onValueChange={itemValue => setSelectedEvaluationType(itemValue)}
          style={styles.picker}
          dropdownIconColor="black"
          mode="dropdown">
          {evaluationTypeList.length > 0 ? (
            evaluationTypeList.map((evaluationType, index) => (
              <Picker.Item
                key={index}
                label={evaluationType.name}
                value={evaluationType.id}
              />
            ))
          ) : (
            <Picker.Item label="No evaluation type available" value="" />
          )}
        </Picker>
      </View>
      <Text style={styles.label}>Employee</Text>
      <View style={styles.showPerformance}>
        <EmployeeDropdown />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={fetchQuestionPerformanceData}>
        <Text style={styles.buttonText}>Show Performance</Text>
      </TouchableOpacity>
      {questionPerformanceData.length > 0 && (
        <MultipleEmployeeQuestionPerformanceChart
          data={questionPerformanceData}
        />
      )}
    </View>
  );

  const SecondRoute = () => (
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
      <Text style={styles.label}>Employee</Text>
      <View style={styles.showPerformance}>
        <EmployeeDropdown />
      </View>
      <TouchableOpacity style={styles.button} onPress={fetchKPIPerformanceData}>
        <Text style={styles.buttonText}>Show Performance</Text>
      </TouchableOpacity>
      {kpiPerformanceData.length > 0 ? (
        <MultipleEmployeeKPIBarChartComponent
          kpiPerformanceData={kpiPerformanceData}
        />
      ) : (
        <Text>No KPI performance data available</Text>
      )}
    </View>
  );
  
  const FourthRoute = () => (
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
      <Text style={styles.label}>Employee</Text>
      <View style={styles.showPerformance}>
        <EmployeeDropdown />
      </View>
      <TouchableOpacity style={styles.button} onPress={fetchKPIPerformanceData}>
        <Text style={styles.buttonText}>Show Performance</Text>
      </TouchableOpacity>
      {/* {kpiPerformanceData.length > 0 && (
        <MultipleEmployeeKPIBarChartComponent
          kpiPerformanceData={kpiPerformanceData}
        />
      )} */}
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
      default:
        return null;
    }
  };

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>Comparison</Text>
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
    borderWidth: 1,
    borderColor: '#ccc',
  },
  pickerContainer: {
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  pickerText: {
    color: '#000',
  },
  dropdown: {
    maxHeight: 300,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#6360DC',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PerformanceComparison;
