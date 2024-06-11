import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert, Button, Text, ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EvaluatorService from '../Services/EvaluatorService';
import EmployeeService from '../Services/EmployeeService';
import {CheckBox} from 'react-native-elements'; 

const Evaluator = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEvaluator, setSelectedEvaluator] = useState(null);
  const [selectedEvaluatees, setSelectedEvaluatees] = useState([]);
  const [evaluateeList, setEvaluateeList] = useState([]);
  const [sessionID, setSessionID] = useState(null);

  useEffect(() => {
    const fetchSessionID = async () => {
      try {
        const sessionId = await AsyncStorage.getItem('currentSession');
        const parsedSessionId = JSON.parse(sessionId);
        setSessionID(parsedSessionId.id);
      } catch (error) {
        Alert.alert('Error', 'Failed to retrieve session ID');
      }
    };
  
    fetchSessionID();
    fetchEmployees();
  }, []);
  

  const fetchEmployees = async () => {
    try {
      const data = await EmployeeService.getEmployees();
      setEmployeeList(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch employees');
    }
  };

  const handleEvaluatorChange = evaluatorId => {
    setSelectedEvaluator(evaluatorId);
    const updatedEvaluateeList = employeeList.filter(
      employee => employee.id !== evaluatorId,
    );
    setEvaluateeList(updatedEvaluateeList);
    setSelectedEvaluatees([]);
  };

  const handleCheckboxChange = (employeeId, isChecked) => {
    if (isChecked) {
      setSelectedEvaluatees(prev => [...prev, employeeId]);
    } else {
      setSelectedEvaluatees(prev => prev.filter(id => id !== employeeId));
    }
  };

  const handleSelectAll = isChecked => {
    if (isChecked) {
      setSelectedEvaluatees(evaluateeList.map(employee => employee.id));
    } else {
      setSelectedEvaluatees([]);
    }
  };

  const handleSave = async () => {
    if (!sessionID) {
      Alert.alert('Error', 'Session ID is missing');
      return;
    }
    if (!selectedEvaluator) {
      Alert.alert('Error', 'Evaluator is not selected');
      return;
    }
    if (selectedEvaluatees.length === 0) {
      Alert.alert('Error', 'No evaluatees selected');
      return;
    }
  
    try {
      const evaluatorEvaluates = {
        evaluator_id: selectedEvaluator,
        session_id: sessionID,
        evaluatee_ids: selectedEvaluatees,
      };
  
      console.log('Saving evaluator evaluates:', evaluatorEvaluates);
  
      const result = await EvaluatorService.postEvaluator(evaluatorEvaluates);
      console.log('Save result:', result);
    } catch (error) {
      console.error('Save error details:', error);
      console.error('Save error response:', error.response ? error.response.data : 'No response data');
      Alert.alert('Error', `Failed to save evaluator evaluates: ${error.message}`);
    }
  };
  
  
  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>Evaluator</Text>
      </View>
      <View style={styles.container}>
        <Picker
          selectedValue={selectedEvaluator}
          onValueChange={itemValue => handleEvaluatorChange(itemValue)}
          style={styles.picker}
          dropdownIconColor="black"
          mode="dropdown">
          <Picker.Item label="Select Evaluator" value="" />
          {employeeList.map(employee => (
            <Picker.Item
              key={employee.id}
              label={employee.name}
              value={employee.id}
            />
          ))}
        </Picker>
        <Text style={{color: 'black', fontSize: 15}}>Select Evaluatee</Text>
        <ScrollView style={styles.scrollView}>
          {evaluateeList.length > 0 && (
            <CheckBox
              title="Select All"
              checked={selectedEvaluatees.length === evaluateeList.length}
              onPress={() =>
                handleSelectAll(
                  selectedEvaluatees.length !== evaluateeList.length,
                )
              }
            />
          )}

          {evaluateeList.map(employee => (
            <CheckBox
              key={employee.id}
              title={employee.name}
              checked={selectedEvaluatees.includes(employee.id)}
              onPress={() =>
                handleCheckboxChange(
                  employee.id,
                  !selectedEvaluatees.includes(employee.id),
                )
              }
            />
          ))}
        </ScrollView>

        <Button
          title="Save"
          onPress={handleSave}
          disabled={!selectedEvaluator || selectedEvaluatees.length === 0}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  picker: {
    marginVertical: 8,
    color: 'black',
  },
  scrollView: {
    marginVertical: 8,
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

export default Evaluator;
