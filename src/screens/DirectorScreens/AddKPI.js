import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import DepartmentService from '../Services/DepartmentService';
import { getSubKPIs } from '../Services/SubKpiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function AddKpi() {
  const [departmentList, setDepartmentList] = useState([]);
  const [subKpiList, setSubKpiList] = useState([]);
  const [sessionId, setSessionId] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSubKpi, setSelectedSubKpi] = useState('');
  const [kpiTitle, setKpiTitle] = useState('');
  const [kpiWeightage, setKpiWeightage] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const departmentData = await DepartmentService.getDepartments();
        setDepartmentList(departmentData);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch departments');
      }
    };
    const retrieveSessionData = async () => {
      try {
        const sessionData = await AsyncStorage.getItem('currentSession');
        if (sessionData) {
          const parsedSessionData = JSON.parse(sessionData);
          setSessionId(parsedSessionData);
          await fetchSubKPIs(parsedSessionData);
        } else {
          console.log('Data not found in AsyncStorage', { sessionData });
          Alert.alert('Error', 'Session not found');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
        console.error('Error retrieving data:', error);
      }
    };
    const fetchSubKPIs = async () => {
      try {
        const subKpi = await getSubKPIs(sessionId);
        setSubKpiList(subKpi);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch sub KPIs');
      }
    };

    retrieveSessionData();
    fetchDepartments();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor="gray"
        style={styles.input}
        onChangeText={setKpiTitle}
        value={kpiTitle}
        placeholder="Enter KPI title"
      />
      <Text style={styles.label}>Select Department</Text>
      <View style={styles.showPerformance}>
        <Picker
          selectedValue={selectedDepartment}
          onValueChange={itemValue => setSelectedDepartment(itemValue)}
          style={styles.picker}
          dropdownIconColor="black"
          mode="dropdown"
        >
          {departmentList.length > 0 ? (
            departmentList.map((department, index) => (
              <Picker.Item
                key={index}
                label={department.name}
                value={department.id}
              />
            ))
          ) : (
            <Picker.Item label="No department available" value="" />
          )}
        </Picker>
      </View>
      <Text style={styles.label}>Select Sub KPI</Text>
      <View style={styles.showPerformance}>
        <Picker
          selectedValue={selectedSubKpi}
          onValueChange={itemValue => setSelectedSubKpi(itemValue)}
          style={styles.picker}
          dropdownIconColor="black"
          mode="dropdown"
        >
          {subKpiList.length > 0 ? (
            subKpiList.map((subKpi, index) => (
              <Picker.Item key={index} label={subKpi.name} value={subKpi.id} />
            ))
          ) : (
            <Picker.Item label="No sub KPI available" value="" />
          )}
        </Picker>
      </View>
      <TextInput
        placeholderTextColor="gray"
        style={styles.input}
        onChangeText={setKpiWeightage}
        value={kpiWeightage}
        placeholder="Enter weightage"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log('saved')}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

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
  input: {
    height: 25,
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    color: 'black',
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
