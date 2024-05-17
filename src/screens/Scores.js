import React, {useEffect, useState} from 'react';
import {View, Text, Spinner, StyleSheet} from 'react-native';
import SessionService from './Services/SessionService';
import EmployeeService from './Services/EmployeeService';
import {Picker} from '@react-native-picker/picker';
import EmployeeQuestionScoreService from './Services/EmployeeQuestionScoreService';
import {FlatList} from 'react-native-gesture-handler';
import EvaluatonScores from './Services/EvaluatonScores';
export default function Scores() {
  const [sessionList, setSessionList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedSession, setSelectedSession] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [evaluationScoreList, setEvaluationScoreList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await SessionService.getSessions();
        setSessionList(data);
      } catch (error) {
        Alert.alert(error.message);
      }
    };
    const fetchEmployee = async () => {
      try {
        const data = await EmployeeService.getEmployees();
        setEmployeeList(data);
      } catch (error) {
        Alert.alert(error.message);
      }
    };
    const fetchEvaluationScore = async (
      employeeID,
      sessionID,
      evaluationTypeID,
    ) => {
      try {
        const data = await EvaluatonScores.getEmployeeQuestionScore(
          employeeID,
          sessionID,
          evaluationTypeID,
        );
        setEvaluationScoreList(data);
      } catch (error) {
        Alert.alert(error.message);
      }
    };
    fetchEvaluationScore(employeeId, sessionId, 2);
    fetchEmployee();
    fetchSession();
  }, []);
  useEffect(() => {
    if (selectedEmployee !== null) {
      setEmployeeId(selectedEmployee);
      console.log(selectedEmployee);
    }
  }, [selectedEmployee]);

  useEffect(() => {
    if (selectedSession !== null) {
      setSessionId(selectedSession);
      console.log(selectedSession);
    }
  }, [selectedSession]);

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>Scores</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Employee</Text>
        <View style={styles.showPerformance}>
          <Picker
            selectedValue={selectedEmployee}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedEmployee(itemValue)
            }
            style={styles.picker}
            dropdownIconColor="black"
            dropdownIconComponent={() => (
              <FontAwesome5 name="caret-down" size={18} color="black" />
            )}
            mode="dropdown">
            {employeeList.map((emp, index) => (
              <Picker.Item key={index} label={emp.name} value={emp.id} />
            ))}
          </Picker>
        </View>
        <Text style={styles.label}>Session</Text>
        <View style={styles.showPerformance}>
          <Picker
            selectedValue={selectedSession}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedSession(itemValue)
            }
            style={styles.picker}
            dropdownIconColor="black"
            dropdownIconComponent={() => (
              <FontAwesome5 name="caret-down" size={18} color="black" />
            )}
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
        <FlatList
          data={evaluationScoreList}
          renderItem={({item}) => (
            <View style={styles.BoxDesign}>
              <Text style={{fontWeight: 'bold'}}>{item.question.question}</Text>
              <Text>{item.obtainedScore}/{item.totalScore}</Text>
            </View>
          )}
          keyExtractor={item => item.question.id.toString()}
        />
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
    // borderWidth:1
  },
  label: {
    fontSize: 16,
    color: 'black',
  },

  BoxDesign: {
    color: '#708090',
    fontSize: 18,
    borderColor: 'red',
    margin: 10,
    backgroundColor: '#d2b48c',
    marginBottom: 10,
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

/* 
 {loading ? (
        <ActivityIndicator />
      ) : errorMessage ? (
        <Text>{errorMessage}</Text>
      ) : (
        <View>
          <Text>Scores Fragment</Text>
          <View>
            {sessionList.map(session => (
              <Text style={{sty}} key={session.id}>
                {session.title}
              </Text>
            ))}
          </View>
        </View>
      )}
*/
