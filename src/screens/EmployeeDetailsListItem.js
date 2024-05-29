// src/components/EmployeeDetailsListItem.js
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Alert,Text } from 'react-native';
import EmployeeService from './Services/EmployeeService';

const EmployeeDetailsListItem = ({ route, navigation }) => {
  const { employeeDetails } = route.params;

  const [employee, setEmployee] = useState(employeeDetails.employee);

  const handleUpdateEmployee = async () => {
    try {
      await EmployeeService.putEmployee(employee);
      Alert.alert('Success', 'Employee updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', `Failed to update employee: ${error.message}`);
    }
  };

  const handleInputChange = (field, value) => {
    setEmployee({ ...employee, [field]: value });
  };

  return (
    <>
    <View style={styles.header}>
      <Text style={styles.headerText}>Employee</Text>
    </View>
    <View style={styles.itemContainer}>
      <TextInput
        style={styles.input}
        value={employee.name}
        onChangeText={(text) => handleInputChange('name', text)}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={employee.email}
        onChangeText={(text) => handleInputChange('email', text)}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={employee.password}
        onChangeText={(text) => handleInputChange('password', text)}
        placeholder="Password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        value={employee.salary}
        onChangeText={(text) => handleInputChange('salary', text)}
        placeholder="Salary"
        placeholderTextColor='gray'
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={employee.doj}
        onChangeText={(text) => handleInputChange('doj', text)}
        placeholder="Date of Joining"
      />
      <TextInput
        style={styles.input}
        value={employee.department_id.toString()}
        onChangeText={(text) => handleInputChange('department_id', text)}
        placeholder="Department ID"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={employee.designation_id.toString()}
        onChangeText={(text) => handleInputChange('designation_id', text)}
        placeholder="Designation ID"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={employee.employee_type_id.toString()}
        onChangeText={(text) => handleInputChange('employee_type_id', text)}
        placeholder="Employee Type ID"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateEmployee}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color:'black',
  },
  updateButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#6360DC',
    borderRadius: 5,
    alignItems: 'center',
  },
  header: {
    paddingTop: 10,
    backgroundColor: '#6360DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  updateButtonText: {
    color: '#fff',
  },
});

export default EmployeeDetailsListItem;
