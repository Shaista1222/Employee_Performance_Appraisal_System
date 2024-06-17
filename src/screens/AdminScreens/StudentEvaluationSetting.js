import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import {Button} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {postEvaluationTime} from '../Services/EvaluationTimeServices';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import EmployeeService from '../Services/EmployeeService';
import {CheckBox} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Student} from '../Services/Student';

const StudentEvaluation = () => {
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const showStartTimePicker = () => {
    setStartTimePickerVisible(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisible(false);
  };

  const handleStartTimeConfirm = date => {
    const formattedDate = date.toISOString();
    setStartTime(formattedDate);
    console.log(`Start Time set to: ${formattedDate}`);
    hideStartTimePicker();
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisible(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisible(false);
  };

  const handleEndTimeConfirm = date => {
    const formattedDate = date.toISOString();
    setEndTime(formattedDate);
    console.log(`End Time set to: ${formattedDate}`);
    hideEndTimePicker();
  };

  const handleSave = async () => {
    try {
      const sessionId = await AsyncStorage.getItem('currentSession');
      console.log(`Session ID from AsyncStorage: ${sessionId}`);
      const sid = JSON.parse(sessionId);
      console.log(`Parsed Session ID: ${sid.id}`);

      if (!sessionId) {
        Alert.alert('Error', 'Session ID not found.');
        return;
      }

      if (!startTime || !endTime) {
        Alert.alert('Error', 'Start Time and End Time must be set.');
        return;
      }

      const evaluationTime = {
        start_time: startTime,
        end_time: endTime,
        evaluation_type: 'student',
        session_id: sid.id,
      };

      console.log('Sending evaluation time data to server:', evaluationTime);

      const response = await postEvaluationTime(evaluationTime);
      console.log(`Response from server: ${JSON.stringify(response)}`);
      if (response && (response.success || response.id)) {
        Alert.alert('Success', 'Evaluation time saved successfully.');
      } else {
        Alert.alert('Error', response.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Student Evaluation</Text>
        <View style={styles.dateTimeContainer}>
          <TouchableOpacity style={styles.input} onPress={showStartTimePicker}>
            <Text style={styles.dateTime}>
              Start Time:{' '}
              {startTime ? new Date(startTime).toLocaleString() : ''}
            </Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isStartTimePickerVisible}
          mode="datetime"
          onConfirm={handleStartTimeConfirm}
          onCancel={hideStartTimePicker}
        />
        <View style={styles.dateTimeContainer}>
          <TouchableOpacity style={styles.input} onPress={showEndTimePicker}>
            <Text style={styles.dateTime}>
              End Time: {endTime ? new Date(endTime).toLocaleString() : ''}
            </Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isEndTimePickerVisible}
          mode="datetime"
          onConfirm={handleEndTimeConfirm}
          onCancel={hideEndTimePicker}
        />
        <Button
          style={styles.saveButton}
          textColor="white"
          labelStyle={styles.buttonText}
          onPress={handleSave}>
          Save
        </Button>
      </View>
    </SafeAreaView>
  );
};

const ShortlistStudent = () => {
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [isStudentDropdownVisible, setIsStudentDropdownVisible] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await Student.getStudentsBySection(semester, section);
        setStudentList(data || []);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };
    if (semester && section) {
      fetchStudents();
    }
  }, [semester, section]);

  const toggleStudentSelection = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter((studentId) => studentId !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  const StudentDropdown = () => (
    <View>
      <TouchableOpacity
        style={styles.pickerContainer}
        onPress={() => setIsStudentDropdownVisible(!isStudentDropdownVisible)}
      >
        <Text style={styles.pickerText}>--Select Student--</Text>
        <Ionicons
          name={isStudentDropdownVisible ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#000"
        />
      </TouchableOpacity>
      {isStudentDropdownVisible && (
        <View style={styles.dropdown}>
          <FlatList
            data={studentList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.checkboxContainer}>
                <CheckBox
                  checked={selectedStudents.includes(item.id)}
                  onPress={() => toggleStudentSelection(item.id)}
                />
                <Text style={styles.label}>{item.name}</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const sessionData = await AsyncStorage.getItem('currentSession');
        if (sessionData) {
          const parsedSessionData = JSON.parse(sessionData);
          setSessionId(parsedSessionData.id);
        } else {
          Alert.alert('Error', 'Session not found');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
        console.error('Error retrieving data:', error);
      }
    };
    retrieveData();
  }, []);

  const handleConfidentialStudent = async () => {
    if (!semester || !section || selectedStudents.length === 0) {
      alert('Please fill out all fields.');
      return;
    }
  
    const studentData = selectedStudents.map((studentId) => ({
      session_id: sessionId,
      student_id: studentId,
    }));
  
    try {
      const response = await Student.postConfidentialEvaluatorStudents(studentData);
      alert('Student evaluator added successfully.');
      console.log('Student evaluator added:', response);
    } catch (error) {
      alert(`Failed to add student: ${error.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholderTextColor="gray"
        style={styles.input}
        onChangeText={setSemester}
        value={semester}
        placeholder="Enter semester"
        keyboardType="numeric"
        maxLength={1}
      />
      <TextInput
        placeholderTextColor="gray"
        style={styles.input}
        onChangeText={setSection}
        value={section}
        maxLength={1}
        placeholder="Enter Section"
      />
      <View style={styles.showPerformance}>
        <StudentDropdown />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleConfidentialStudent}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const renderScene = SceneMap({
  first: StudentEvaluation,
  second: ShortlistStudent,
});

const StudentEvaluationSetting = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Student Evaluation'},
    {key: 'second', title: 'Shortlist Student'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: '100%'}}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{backgroundColor: '#d35400'}}
          style={{backgroundColor: '#f5f5f5'}}
          labelStyle={{color: 'black'}}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  button: {
    padding: 12,
    backgroundColor: '#6360DC',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    width: '80%',
    alignItems: 'center',
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
  saveButton: {
    backgroundColor: '#3a7ca5',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
  },
  label: {
    fontSize: 16,
    color: 'black',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#d35400',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    padding: 7,
    marginBottom: 16,
    color: 'black',
    alignItems: 'center',
  },
  dateTimeContainer: {
    marginBottom: 10,
    color: 'black',
    width: '90%',
  },
  dateTime: {
    fontSize: 16,
    color: 'black',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerContainer: {
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showPerformance: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default StudentEvaluationSetting;
