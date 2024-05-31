import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import SessionService from './Services/SessionService';
import EmployeeService from './Services/EmployeeService';
import EvaluatonScores from './Services/EvaluatonScores';
import QuestionaireServiceListner from './Services/QuestionaireServiceListner';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyScores = () => {
  const [sessionList, setSessionList] = useState([]);
  //   const [employeeList, setEmployeeList] = useState([]);
  const [evaluationTypeList, setEvaluationTypeList] = useState([]);
  const [evaluationScoreList, setEvaluationScoreList] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  //   const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedEvaluationType, setSelectedEvaluationType] = useState('');
  const [loading, setLoading] = useState(true);
  const [employeeId, setEmployeeId] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [evaluationTypeId, setEvaluationTypeId] = useState('');

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

    const retrieveData = async () => {
      try {
        const user = await AsyncStorage.getItem('employee');
        console.log('Retrieved data from AsyncStorage', {user});

        if (user) {
          const parsedUser = JSON.parse(user);
          setEmployeeId(parsedUser.employee.id);

          console.log('Parsed Data', {parsedUser});
        } else {
          console.log('Data not found in AsyncStorage', {user});
          Alert.alert('Error', 'Student, session or employee ID not found');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
        console.error('Error retrieving data:', error);
      }
    };
    retrieveData();

    const fetchEvaluationType = async () => {
      try {
        const data = await QuestionaireServiceListner.getQuestionnaireTypes();
        setEvaluationTypeList(data);
        console.log(data);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };

    fetchSession();
    fetchEvaluationType();
  }, []);

  useEffect(() => {
    const fetchEvaluationScore = async (
      employeeID,
      sessionID,
      evaluationTypeID,
    ) => {
      if (employeeId && sessionId && evaluationTypeId) {
        setLoading(true);
        try {
          const data = await EvaluatonScores.getEmployeeQuestionScore(
            employeeID,
            sessionID,
            evaluationTypeID,
          );
          setEvaluationScoreList(data);
        } catch (error) {
          Alert.alert('Error', error.message);
        }
        setLoading(false);
      }
    };

    fetchEvaluationScore(employeeId, sessionId, evaluationTypeId);
  }, [employeeId, sessionId, evaluationTypeId]);

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

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>Scores</Text>
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
            {sessionList.map((session, index) => (
              <Picker.Item
                key={index}
                label={session.title}
                value={session.id}
              />
            ))}
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
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <FlatList
              data={evaluationScoreList}
              renderItem={({item}) => (
                <View style={styles.BoxDesign}>
                  <Text style={{fontWeight: 'bold'}}>
                    {item.question.question}
                  </Text>
                  <Text>
                    {item.obtainedScore}/{item.totalScore}
                  </Text>
                </View>
              )}
              keyExtractor={item => item.question.id.toString()}
            />
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

export default MyScores;
