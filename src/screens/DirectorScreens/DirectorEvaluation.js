// src/EmployeeList.js
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import EmployeeService from '../Services/EmployeeService';
import EvaluationService from '../Services/EvaluationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmployeeList = ({navigation}) => {
  const [employeeDetailsList, setEmployeeDetailsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [sessionID, setSessionId] = useState('');
  const [employeeID, setEmployeeId] = useState('');
  const questionByType = 'director';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const employees = await EmployeeService.getEmployees();
        setEmployeeDetailsList(employees);
        setFilteredEmployees(employees);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const retrieveData = async () => {
      try {
        const sessionData = await AsyncStorage.getItem('currentSession');
        const user = await AsyncStorage.getItem('employee');
        console.log('Retrieved data from AsyncStorage', {sessionData, user});

        if (sessionData && user) {
          const parsedSessionData = JSON.parse(sessionData);
          const parsedUser = JSON.parse(user);

          setSessionId(parsedSessionData);
          setEmployeeId(parsedUser);

          console.log('Parsed Data', {parsedSessionData, parsedUser});
        } else {
          console.log('Data not found in AsyncStorage', {sessionData, user});
          Alert.alert('Error', 'session or employee ID not found');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
        console.error('Error retrieving data:', error);
      }
    };
    retrieveData();
  }, []);
  const handleSearch = query => {
    setSearchQuery(query);
    if (query) {
      const filtered = employeeDetailsList.filter(employee =>
        employee.name.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employeeDetailsList);
    }
  };
  // const handleItemPress = (evaluateeID) => {
  //   navigation.navigate('EvaluationQuestionnaire', {evaluateeID,questionByType});
  // };

  const handleItemPress = async evaluateeID => {
    try {
      const result = await EvaluationService.isEvaluated(
        employeeID.employee.id,
        evaluateeID,
        0,
        sessionID.id,
        questionByType,
      );
      if (result == true) {
        Alert.alert('You have already evaluated this teacher');
        return;
      } else {
        navigation.navigate('EvaluationQuestionnaire', {
          evaluateeID,
          questionByType,
        });
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Evaluation</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholderTextColor="black"
          placeholder="Search employees"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <FlatList
          data={filteredEmployees}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleItemPress(item.id)}>
              <View style={styles.itemContainer}>
                <Text style={styles.name}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    paddingTop: 10,
    backgroundColor: '#6360DC',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    color: 'black',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
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

export default EmployeeList;
