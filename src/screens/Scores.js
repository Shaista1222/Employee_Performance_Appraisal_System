import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import SessionService from './Services/SessionService';
import EmployeeService from './Services/EmployeeService';
import { Picker } from '@react-native-picker/picker';
import { FlatList } from 'react-native-gesture-handler';
import EvaluatonScores from './Services/EvaluatonScores';
import QuestionaireServiceListner from './Services/QuestionaireServiceListner';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Scores() {
  const [sessionList, setSessionList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [evaluationScoreList, setEvaluationScoreList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employeeId, setEmployeeId] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [evaluationTypeList, setEvaluationTypeList] = useState([]);
  const [selectedEvaluationType, setSelectedEvaluationType] = useState('');
  const [evaluationTypeId, setEvaluationTypeId] = useState('');

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await SessionService.getSessions();
        setSessionList(data);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };

    const fetchEmployee = async () => {
      try {
        const data = await EmployeeService.getEmployees();
        setEmployeeList(data);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };

    const fetchEvaluationType = async () => {
      try {
        const data = await QuestionaireServiceListner.getQuestionnaireTypes();
        setEvaluationTypeList(data);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };

    fetchSession();
    fetchEmployee();
    fetchEvaluationType();
  }, []);

  useEffect(() => {
    const fetchEvaluationScore = async () => {
      if (employeeId && sessionId && evaluationTypeId) {
        setLoading(true);
        try {
          const data = await EvaluatonScores.getEmployeeQuestionScore(
            employeeId,
            sessionId,
            evaluationTypeId
          );
          setEvaluationScoreList(data);
        } catch (error) {
          Alert.alert('Error', error.message);
        }
        setLoading(false);
      }
    };

    fetchEvaluationScore();
  }, [employeeId, sessionId, evaluationTypeId]);

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

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>Scores</Text>
      </View>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Text style={styles.label}>Employee</Text>
            <View style={styles.showPerformance}>
              <Picker
                selectedValue={selectedEmployee}
                onValueChange={(itemValue) => setSelectedEmployee(itemValue)}
                style={styles.picker}
                dropdownIconColor="black"
                mode="dropdown"
              >
                {employeeList.map((emp, index) => (
                  <Picker.Item key={index} label={emp.name} value={emp.id} />
                ))}
              </Picker>
            </View>
            <Text style={styles.label}>Session</Text>
            <View style={styles.showPerformance}>
              <Picker
                selectedValue={selectedSession}
                onValueChange={(itemValue) => setSelectedSession(itemValue)}
                style={styles.picker}
                dropdownIconColor="black"
                mode="dropdown"
              >
                {sessionList.map((session, index) => (
                  <Picker.Item key={index} label={session.title} value={session.id} />
                ))}
              </Picker>
            </View>
            <Text style={styles.label}>Evaluation Type</Text>
            <View style={styles.showPerformance}>
              <Picker
                selectedValue={selectedEvaluationType}
                onValueChange={(itemValue) => setSelectedEvaluationType(itemValue)}
                style={styles.picker}
                dropdownIconColor="black"
                mode="dropdown"
              >
                {evaluationTypeList.map((evaluationType, index) => (
                  <Picker.Item key={index} label={evaluationType.name} value={evaluationType.id} />
                ))}
              </Picker>
            </View>
            <FlatList
              data={evaluationScoreList}
              renderItem={({ item }) => (
                <View style={styles.BoxDesign}>
                  <Text style={{ fontWeight: 'bold' }}>{item.question.question}</Text>
                  <Text>
                    {item.obtainedScore}/{item.totalScore}
                  </Text>
                </View>
              )}
              keyExtractor={(item) => item.question.id.toString()}
            />
          </>
        )}
      </View>
    </>
  );
}

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
