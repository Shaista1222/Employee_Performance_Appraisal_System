import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import EvaluatorService from './Services/EvaluatorService';
import AsyncStorage from '@react-native-async-storage/async-storage';
const EvaluateeListFragment = ({navigation}) => {
  const [evaluateeList, setEvaluateeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employeeUser, setEmployeeUser] = useState(null);
  const [currentSessionData, setCurrentSessionData] = useState(null);
  const questionByType = 'peer';
  useEffect(() => {
    const retrieveEmployeeData = async () => {
      try {
        const sessionData = await AsyncStorage.getItem('currentSession');
        const user = await AsyncStorage.getItem('employee');
        console.log(sessionData, user);
        console.log(sessionData, user)
        if (sessionData && user) {
          const sesionObjectString = JSON.stringify(sessionData)
          const parsedSessionData = JSON.parse(sessionData);
          console.log(parsedSessionData)
          const parsedUser = JSON.parse(user);
          console.log(parsedSessionData, parsedUser);
          setCurrentSessionData(parsedSessionData);
          setEmployeeUser(parsedUser);
        } else {
          Alert.alert('Error', 'Session or employee data not found');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
        console.error('Error retrieving data:', error);
      }
    };
    retrieveEmployeeData();
  }, []);

  useEffect(() => {
    if (employeeUser && employeeUser.employee && currentSessionData) {
      fetchEvaluatees(employeeUser.employee.id, currentSessionData.id);
    }
  }, [employeeUser, currentSessionData]);

  const fetchEvaluatees = async (evaluatorID, sessionID) => {
    try {
      const data = await EvaluatorService.getEvaluatees(evaluatorID, sessionID);
      setEvaluateeList(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handleItemPress = evaluateeID => {
    navigation.navigate('EvaluationQuestionnaire', {
      evaluateeID,
      questionByType,
    });
  };

  /*
    const evaluateTeacher = async (teacherId) => {
    try {
      const result = await EvaluationService.isEvaluated(studentID, teacherId, courseID, sessionID, 'Confidential');
      if (result) {
        Alert.alert('You have already evaluated this teacher');
      } else {
        navigation.navigate('EvaluationQuestionnaire', { teacherId, courseID });
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  */
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{color: 'black'}}>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>Evaluate</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={evaluateeList}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleItemPress(item.id)}>
              <View style={styles.itemContainer}>
                <Text style={styles.name}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default EvaluateeListFragment;

// http://192.168.0.106/api/Evaluator/GetEvaluatees?evaluatorID=4&sessionID=11
