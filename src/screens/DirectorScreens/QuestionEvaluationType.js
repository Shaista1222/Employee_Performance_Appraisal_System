import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import SessionService from '../Services/SessionService';
import EmployeeService from '../Services/EmployeeService';
import QuestionaireServiceListner from '../Services/QuestionaireServiceListner';
import CourseServiceListener from '../Services/CourseServiceListener';
import EvaluatorService from '../Services/EvaluatorService';

const QuestionEvaluationType = ({navigation}) => {
  const [sessionList, setSessionList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [evaluationTypeList, setEvaluationTypeList] = useState([]);
  const [teacherCoursesList, setTeacherCoursesList] = useState([]);
  const [evaluatorList, setEvaluatorList] = useState({});
  const [selectedSession, setSelectedSession] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedEvaluationType, setSelectedEvaluationType] = useState('');
  const [selectedTeacherCourse, setSelectedTeacherCourse] = useState('');
  const [loading, setLoading] = useState(true);
  const [employeeId, setEmployeeId] = useState('');
  const [courseID , setCourseId] = useState('');
  const [sessionID , setSessionId] = useState('');
  const [evaluationTypeID, setEvaluationTypeId] = useState('');

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await SessionService.getSessions();
        setSessionList(data);
        console.log(data);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };

    const fetchEmployee = async () => {
      try {
        const data = await EmployeeService.getEmployees();
        setEmployeeList(data);
        console.log(data);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };

    const fetchEvaluationType = async () => {
      try {
        const data = await QuestionaireServiceListner.getQuestionnaireTypes();
        setEvaluationTypeList(data);
        console.log(data);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };

    const fetchTeacherCourses = async () => {
      try {
        const data = await CourseServiceListener.getCourses();
        setTeacherCoursesList(data);
        console.log('Data ', data);
        console.log(data);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };

    fetchSession();
    fetchEmployee();
    fetchEvaluationType();
    fetchTeacherCourses();
  }, []);

  useEffect(() => {
    const fetchEvaluators = async () => {
      try {
        const data = await EvaluatorService.getEvaluators(
          employeeId,
          evaluationTypeID,
          sessionID ,
          courseID ,
        );
        setEvaluatorList(data);
        console.log('Data of evaluator', data);
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (employeeId && evaluationTypeID && sessionID  && courseID ) {
      fetchEvaluators();
    }
  }, [employeeId, evaluationTypeID, sessionID , courseID ]);

  useEffect(() => {
    if (selectedEmployee) {
      setEmployeeId(selectedEmployee);
      console.log('Selected Employee:', selectedEmployee);
    }
  }, [selectedEmployee]);

  useEffect(() => {
    if (selectedSession) {
      setSessionId(selectedSession);
      console.log('Selected Session:', selectedSession);
    }
  }, [selectedSession]);

  useEffect(() => {
    if (selectedEvaluationType) {
      setEvaluationTypeId(selectedEvaluationType);
      console.log('Selected Evaluation Type:', selectedEvaluationType);
    }
  }, [selectedEvaluationType]);

  useEffect(() => {
    if (selectedTeacherCourse) {
      setCourseId(selectedTeacherCourse);
      console.log('Selected Teacher Course:', selectedTeacherCourse);
    }
  }, [selectedTeacherCourse]);

  const handleNavigateToScore = (employeeID1, employeeID2) => {
    console.log(employeeID1, employeeID2, sessionID , evaluationTypeID, courseID );
    navigation.navigate('Scores', {employeeID1, employeeID2, sessionID , evaluationTypeID,courseID });
  };

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>Scores</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.showPerformance}>
          <Picker
            selectedValue={selectedEmployee}
            onValueChange={itemValue => setSelectedEmployee(itemValue)}
            style={styles.picker}
            dropdownIconColor="black"
            mode="dropdown">
            <Picker.Item label="--Select Employee--" value="" />
            {employeeList.map((emp, index) => (
              <Picker.Item key={index} label={emp.name} value={emp.id} />
            ))}
          </Picker>
        </View>
        <View style={styles.showPerformance}>
          <Picker
            selectedValue={selectedSession}
            onValueChange={itemValue => setSelectedSession(itemValue)}
            style={styles.picker}
            dropdownIconColor="black"
            mode="dropdown">
            <Picker.Item label="--Select Session--" value="" />
            {sessionList.map((session, index) => (
              <Picker.Item
                key={index}
                label={session.title}
                value={session.id}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.showPerformance}>
          <Picker
            selectedValue={selectedEvaluationType}
            onValueChange={itemValue => setSelectedEvaluationType(itemValue)}
            style={styles.picker}
            dropdownIconColor="black"
            mode="dropdown">
            <Picker.Item label="--Select Evaluation Type--" value="" />
            {evaluationTypeList.map((evaluationType, index) => (
              <Picker.Item
                key={index}
                label={evaluationType.name}
                value={evaluationType.id}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.showPerformance}>
          <Picker
            selectedValue={selectedTeacherCourse}
            onValueChange={itemValue => setSelectedTeacherCourse(itemValue)}
            style={styles.picker}
            dropdownIconColor="black"
            mode="dropdown">
            <Picker.Item label="--Select Teacher course--" value="" />
            {teacherCoursesList.map((teacherCourses, index) => (
              <Picker.Item
                key={index}
                label={teacherCourses.title}
                value={teacherCourses.id}
              />
            ))}
          </Picker>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            {evaluatorList.employees && evaluatorList.employees.length > 0 && (
              <FlatList
                data={evaluatorList.employees}
                renderItem={({item}) => (
                  <View style={styles.BoxDesign}>
                    <TouchableOpacity
                      onPress={() => handleNavigateToScore(item.id, employeeId)}
                      style={{fontWeight: 'bold'}}>
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={item => item.id.toString()}
              />
            )}
            {evaluatorList.students && evaluatorList.students.length > 0 && (
              <FlatList
                data={evaluatorList.students}
                renderItem={({item}) => (
                  <View style={styles.BoxDesign}>
                    <TouchableOpacity
                      onPress={() => handleNavigateToScore(item.id, employeeId)}
                      style={{fontWeight: 'bold'}}>
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={item => item.id.toString()}
              />
            )}
          </>
        )}
      </View>
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
  label: {
    fontSize: 16,
    color: 'black',
    marginVertical: 10,
  },
  BoxDesign: {
    color: '#708090',
    fontSize: 18,
    borderColor: 'red',
    margin: 10,
    backgroundColor: '#d2b48c',
    padding: 10,
    borderRadius: 10,
  },
  picker: {
    color: 'black',
    width: '100%',
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
});

export default QuestionEvaluationType;
