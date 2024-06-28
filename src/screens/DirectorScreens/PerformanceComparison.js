import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  useWindowDimensions, // Ensure this is imported correctly,
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
  MultipleEmployeeSubKpiBarChartComponent,
  MultipleEmployeeSingleSubKpi,
  MultipleEmployeeYearlyPerformance,
  SingleEmployeeKpiPerformance,
  BarChartComponent,
  MultipleSessionEmployeeKPI,
} from './ComparisonBarChart';
import EmployeeKPIPerformance from '../Services/EmployeeKPIPerformance';
import QuestionaireServiceListner from '../Services/QuestionaireServiceListner';
import {getMultiEmployeeQuestionScore} from '../Services/QuestionsScores';
import {
  getSubKPIs,
  getSubKpiMultiEmployeePerformance,
} from '../Services/SubKpiServices';
import KpiService from '../Services/KpiService';

const PerformanceComparison = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Course '},
    {key: 'second', title: 'KPI '},
    {key: 'third', title: 'Question '},
    {key: 'fourth', title: 'Sub KPI '},
    {key: 'fifth', title: 'Single Sub KPI '},
    {key: 'sixth', title: 'Yearly-KPI '},
    {key: 'seventh', title: 'session '},
    {key: 'eightth', title: 'Multi-session '},
  ]);

  const [courseList, setCourseList] = useState([]);
  const [sessionList, setSessionList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [evaluationTypeList, setEvaluationTypeList] = useState([]);
  const [kpisList, setKpisList] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [selectedEvaluationType, setSelectedEvaluationType] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [isEmployeeDropdownVisible, setIsEmployeeDropdownVisible] =
    useState(false);
  const [subKpiList, setSubKpiList] = useState([]);
  const [subKpiId, setSubKpiId] = useState('');
  const [performanceYearlyList, setPerformanceYearlyList] = useState([]);
  const [yearsList, setYearsList] = useState([]);
  const [yearId, setYearId] = useState('');
  const [kpisId, setKpisId] = useState('');
  const [isCourseDropdownVisible, setIsCourseDropdownVisible] = useState(false);
  const [performanceData, setPerformanceData] = useState([]);
  const [kpiPerformanceData, setKPIPerformanceData] = useState([]);
  const [questionPerformanceData, setQuestionPerformanceData] = useState([]);
  const [subKPIPerformanceData, setSubKPIPerformanceData] = useState([]);
  const [singleEmployeePerformanceList, setSingleEmployeePerformanceList] =
    useState([]);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [isSessionDropdownVisible, setIsSessionDropdownVisible] =
    useState(false);
  const [able, setAble] = useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [
    multiSessionEmployeePerformanceList,
    setMultiSessionEmployeePerformanceList,
  ] = useState([]);
  const [
    multiSessionEmployeeKpiPerformanceList,
    setMultiSessionEmployeeKpiPerformanceList,
  ] = useState([]);

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
    setEmployeeId(selectedEmployee);
    console.log(selectedEmployee);
  }, [selectedEmployee]);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await EmployeeService.getEmployees();
        setEmployeeList(data || []);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };
    const fetchSubKpi = async () => {
      try {
        const data = await getSubKPIs(selectedSession);
        // console.log("Data",data);
        setSubKpiList(data || []);
        if (data && data.length > 0) {
          setSubKpiId(data[0].id);
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };
    const fetchKpis = async () => {
      try {
        const data = await KpiService.getKpis();
        console.log('Data', data);
        // const kpi=[{id:0,name:'All'}]
        // kpi.append(data);
        setKpisList(data || []);
        if (data && data.length > 0) {
          setKpisId(data[0].id);
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };
    const fetchYears = async () => {
      try {
        const data = await SessionService.getYears();
        console.log('Data years', data);
        setYearsList(data || []);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };

    fetchYears();
    fetchKpis();
    fetchSubKpi(selectedSession);
    fetchEmployees();
  }, [selectedSession]);

  useEffect(() => {
    fetchEmployeePerformanceYearly(selectedEmployees, yearId, kpisId);
  }, [selectedEmployees, yearId, kpisId]);
  const fetchEmployeePerformanceYearly = async () => {
    try {
      const data =
        await EmployeeKPIPerformance.compareKpiEmployeePerformanceYearly(
          selectedEmployees,
          yearId,
          kpisId,
        );
      console.log('Performance years', selectedEmployees, yearId, kpisId);
      if (selectedEmployees.length != 0) {
        setPerformanceYearlyList(data || []);
      }
      // console.log(data)
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  //////////////////
  useEffect(() => {
    fetchSingleEmployeeKpiPerformance(
      selectedEmployees,
      selectedSession,
      kpisId,
    );
  }, [selectedEmployees, selectedSession, kpisId]);
  const fetchMultiSessionEmployeeKpiPerformance = async () => {
    try {
      const data =
        await EmployeeKPIPerformance.getCompareMultiSessionKpiEmployeePerformance(
          employeeId,
          selectedSessions,
          kpisId,
        );
      console.log('Multi', data);
      console.log('Performance Multi', employeeId, selectedSessions, kpisId);
      if (selectedSessions.length != 0) {
        if (kpisId != 0) {
          // setAble(true)
          setMultiSessionEmployeePerformanceList(data || []);
        } //else {
        //   setSingleEmployeePerformanceList(kpiPerformanceData);
        // }
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  /////////////
  // useEffect(() => {
  //   fetchSingleEmployeeKpiPerformance(selectedSessions, employeeId);
  // }, [selectedSessions, employeeId]);
  // const fetchMultiSessionAllKpiPerformance = async () => {
  //   try {
  //     const data =
  //       await EmployeeKPIPerformance.compareMultiSessionAllKpiEmployeePerformance(
  //         selectedSessions,
  //         employeeId,
  //       );
  //     console.log(
  //       'Performance Multi all kpi',
  //       selectedSessions,
  //       employeeId,
  //     );
  //     if (selectedEmployees.length != 0) {
  //       if (kpisId != 0) {
  //         // setAble(true);
  //         setSingleEmployeePerformanceList(data || []);
  //       } else {
  //         setSingleEmployeePerformanceList(kpiPerformanceData);
  //       }
  //     }
  //   } catch (error) {
  //     Alert.alert('Error', error.message);
  //   }
  // };

  useEffect(() => {
    fetchSingleEmployeeKpiPerformance(
      selectedEmployees,
      selectedSession,
      kpisId,
    );
  }, [selectedEmployees, selectedSession, kpisId]);
  const fetchSingleEmployeeKpiPerformance = async () => {
    // if (kpisId != 0) {
      try {
        const data =
          await EmployeeKPIPerformance.compareSingleEmployeeKpiPerformance(
            selectedEmployees,
            selectedSession,
            kpisId,
          );
        console.log(
          'Performance single',
          selectedEmployees,
          selectedSession,
          kpisId,
        );
        if (selectedSessions.length != 0) {
          setSingleEmployeePerformanceList(data || []);
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      }
  };
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
      if (selectedEmployees.length != 0) {
        setQuestionPerformanceData(response || []);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
      setQuestionPerformanceData([]);
    }
  };

  const fetchPerformanceData = async () => {
    try {
      const response =
        await EmployeeCoursePerformanceService.getMultiEmployeeCourseScore(
          selectedEmployees,
          selectedCourse,
          selectedSession,
        );
      if (selectedEmployees.length != 0) {
        setPerformanceData(response);
      }
      console.log('Response', response);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  const fetchKPIPerformanceData = async () => {
    try {
      const response = await EmployeeKPIPerformance.compareEmployeeKpiScore(
        selectedEmployees,
        selectedSession,
      );
      if (selectedEmployees.length != 0) {
        setKPIPerformanceData(response);
      }
      console.log('Response getting', response);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  const fetchSubKpiPerformanceData = async () => {
    try {
      console.log('Fetching Sub KPI Performance Data with:', {
        selectedEmployees,
        selectedSession,
      });
      const response = await getSubKpiMultiEmployeePerformance(
        selectedEmployees,
        selectedSession,
      );
      console.log('Sub KPI Performance Data Response:', response);
      if (response && response.length > 0 && selectedEmployees.length != 0) {
        setSubKPIPerformanceData(response);
      } else {
        Alert.alert(
          'No Data',
          'No Sub KPI Performance Data available for the selected criteria.',
        );
        setSubKPIPerformanceData([]);
      }
    } catch (error) {
      console.error('Error fetching Sub KPI Performance Data:', error);
      Alert.alert('Error', 'Failed to fetch Sub KPI Performance Data.');
      setSubKPIPerformanceData([]);
    }
  };
  const filteredSingleSubKpiPerformanceData = subKPIPerformanceData.map(
    empData => ({
      ...empData,
      subKpiPerformances: empData.subKpiPerformances.filter(
        subKpi => subKpi.subkpi_id === subKpiId,
      ),
    }),
  );
  const toggleSessionSelection = id => {
    if (selectedSessions.includes(id)) {
      setSelectedSessions(
        selectedSessions.filter(sessionId => sessionId !== id),
      );
    } else {
      setSelectedSessions([...selectedSessions, id]);
    }
  };
  const SessionDropdown = () => (
    <View>
      <TouchableOpacity
        style={styles.pickerContainer}
        onPress={() => setIsSessionDropdownVisible(!isSessionDropdownVisible)}>
        <Text style={styles.pickerText}>Select Session</Text>
        <Ionicons
          name={isSessionDropdownVisible ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#000"
        />
      </TouchableOpacity>
      {isSessionDropdownVisible && (
        <View style={styles.dropdown}>
          <FlatList
            data={sessionList}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.checkboxContainer}>
                <CheckBox
                  value={selectedSessions.includes(item.id)}
                  onValueChange={() => toggleSessionSelection(item.id)}
                />
                <Text style={styles.label}>{item.title}</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
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
            renderItem={({item}) => (
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
            renderItem={({item}) => (
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
        <MultipleEmployeeCourseBarChartComponent
          performanceData={performanceData}
        />
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
      <TouchableOpacity
        style={styles.button}
        onPress={fetchSubKpiPerformanceData}>
        <Text style={styles.buttonText}>Show Performance</Text>
      </TouchableOpacity>
      {subKPIPerformanceData.length > 0 && (
        <MultipleEmployeeSubKpiBarChartComponent
          subKPIPerformanceData={subKPIPerformanceData}
        />
      )}
    </View>
  );

  const FifthRoute = () => (
    <View style={styles.container}>
      <View style={styles.showPerformance}>
        <Picker
          selectedValue={selectedSession}
          onValueChange={itemValue => setSelectedSession(itemValue)}
          style={styles.picker}
          dropdownIconColor="black"
          mode="dropdown">
          <Picker.Item label="--Select Session--" />
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
      <View style={styles.showPerformance}>
        <Picker
          selectedValue={subKpiId}
          onValueChange={itemValue => setSubKpiId(itemValue)}
          style={styles.picker}
          dropdownIconColor="black"
          mode="dropdown">
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
      <Text style={styles.label}>Employee</Text>
      <View style={styles.showPerformance}>
        <EmployeeDropdown />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={fetchSubKpiPerformanceData}>
        <Text style={styles.buttonText}>Show Performance</Text>
      </TouchableOpacity>
      {filteredSingleSubKpiPerformanceData.length > 0 && (
        <MultipleEmployeeSingleSubKpi
          subKPIPerformanceData={filteredSingleSubKpiPerformanceData}
        />
      )}
    </View>
  );
  const SixthRoute = () => (
    <View style={styles.container}>
      <View style={styles.showPerformance}>
        <Picker
          selectedValue={kpisId}
          onValueChange={itemValue => setKpisId(itemValue)}
          style={styles.picker}
          dropdownIconColor="black"
          mode="dropdown">
          <Picker.Item label="--Select Kpi--" />
          {kpisList.length > 0 ? (
            kpisList.map((kpis, index) => (
              <Picker.Item key={index} label={kpis.name} value={kpis.id} />
            ))
          ) : (
            <Picker.Item label="No Kpi available" value="" />
          )}
        </Picker>
      </View>
      <View style={styles.showPerformance}>
        <Picker
          selectedValue={yearId}
          onValueChange={itemValue => setYearId(itemValue)}
          style={styles.picker}
          dropdownIconColor="black"
          mode="dropdown">
          <Picker.Item label="--Select Year--" />
          {yearsList.length > 0 ? (
            yearsList.map((year, index) => (
              <Picker.Item key={index} label={year} value={year} />
            ))
          ) : (
            <Picker.Item label="No years available" value="" />
          )}
        </Picker>
      </View>
      {/* <Text style={styles.label}>Employee</Text> */}
      <View style={styles.showPerformance}>
        <EmployeeDropdown />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={fetchEmployeePerformanceYearly}>
        <Text style={styles.buttonText}>Show Performance</Text>
      </TouchableOpacity>
      {performanceYearlyList.length > 0 ? (
        <MultipleEmployeeYearlyPerformance
          performanceYearlyList={performanceYearlyList}
        />
      ) : (
        <Text>No KPI performance data available</Text>
      )}
    </View>
  );
  const SeventhRoute = () => (
    <View style={styles.container}>
      <View style={styles.showPerformance}>
        <Picker
          selectedValue={selectedSession}
          onValueChange={itemValue => setSelectedSession(itemValue)}
          style={styles.picker}
          dropdownIconColor="black"
          mode="dropdown">
          <Picker.Item label="--Select Session--" />
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
      <View style={styles.showPerformance}>
        <EmployeeDropdown />
      </View>
      <View style={styles.showPerformance}>
        <Picker
          selectedValue={kpisId}
          onValueChange={itemValue => setKpisId(itemValue)}
          style={styles.picker}
          dropdownIconColor="black"
          mode="dropdown">
          <Picker.Item label="All" key={0} value={0} />
          {kpisList.length > 0 ? (
            kpisList.map((kpis, index) => (
              <Picker.Item key={index} label={kpis.name} value={kpis.id} />
            ))
          ) : (
            <Picker.Item label="No Kpi available" value="" />
          )}
        </Picker>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={fetchSingleEmployeeKpiPerformance}>
        <Text style={styles.buttonText}>Show Performance</Text>
      </TouchableOpacity>
      {singleEmployeePerformanceList.length > 0 ? (
        <SingleEmployeeKpiPerformance
          singleEmployeePerformanceList={singleEmployeePerformanceList}
        />
      ) : (
        <Text>No session performance data available</Text>
      )}
      {kpiPerformanceData.length > 0 ? (
        <MultipleEmployeeKPIBarChartComponent
          kpiPerformanceData={kpiPerformanceData}
        />
      ) : (
        <Text>No session performance data available</Text>
      )}
      {/* {kpisId==0?(
        kpiPerformanceData.length > 0 ? (
        <MultipleEmployeeKPIBarChartComponent
          kpiPerformanceData={kpiPerformanceData}
        />
      ) : (
        <Text>No KPI performance data available</Text>
      )
      ):(
      {singleEmployeePerformanceList.length > 0 ? (
        <MultipleEmployeeKPIBarChartComponent
          singleEmployeePerformanceList={singleEmployeePerformanceList}
        />
      ) : (
        <Text>No session performance data available</Text>
      )})} */}
    </View>
  );
  const EightRoute = () => (
    <View style={styles.container}>
      <View style={styles.showPerformance}>
        <Picker
          selectedValue={employeeId}
          onValueChange={itemValue => setEmployeeId(itemValue)}
          style={styles.picker}
          dropdownIconColor="black"
          mode="dropdown">
          <Picker.Item label="--Select employee--" />
          {employeeList.length > 0 ? (
            employeeList.map((emp, index) => (
              <Picker.Item key={index} label={emp.name} value={emp.id} />
            ))
          ) : (
            <Picker.Item label="No employees available" value="" />
          )}
        </Picker>
      </View>
      <View style={styles.showPerformance}>
        <Picker
          selectedValue={kpisId}
          onValueChange={itemValue => setKpisId(itemValue)}
          style={styles.picker}
          dropdownIconColor="black"
          mode="dropdown">
          <Picker.Item label="All" key={0} value={0} />
          {kpisList.length > 0 ? (
            kpisList.map((kpis, index) => (
              <Picker.Item key={index} label={kpis.name} value={kpis.id} />
            ))
          ) : (
            <Picker.Item label="No Kpi available" value="" />
          )}
        </Picker>
      </View>
      {/* <Text style={styles.label}>Employee</Text> */}
      <View style={styles.showPerformance}>
        <SessionDropdown />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={fetchMultiSessionEmployeeKpiPerformance}>
        <Text style={styles.buttonText}>Show Performance</Text>
      </TouchableOpacity>
      {multiSessionEmployeePerformanceList.length > 0 ? (
        <BarChartComponent
          multiSessionEmployeePerformanceList={
            multiSessionEmployeePerformanceList
          }
        />
      ) : (
        <Text>No KPI performance data available</Text>
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
      case 'fifth':
        return <FifthRoute />;
      case 'sixth':
        return <SixthRoute />;
      case 'seventh':
        return <SeventhRoute />;
      case 'eightth':
        return <EightRoute />;
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
    marginTop: 6,
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
