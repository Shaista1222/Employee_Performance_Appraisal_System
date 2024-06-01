// src/components/EmployeeDetailsListItem.js
import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import EmployeeService from './Services/EmployeeService';
import DepartmentService from './Services/DepartmentService';
import DesignationService from './Services/DesignationService';

const EmployeeDetailsListItem = ({ route, navigation }) => {
  const { employeeDetails } = route.params;

  const [employee, setEmployee] = useState(employeeDetails.employee);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      const fetchedDepartments = await DepartmentService.getDepartments();
      const fetchedDesignations = await DesignationService.getDesignations();
      const fetchedEmployeeTypes = await EmployeeService.getEmployeeTypes();

      setDepartments(fetchedDepartments);
      setDesignations(fetchedDesignations);
      setEmployeeTypes(fetchedEmployeeTypes);
    } catch (error) {
      Alert.alert('Error', `Failed to fetch dropdown data: ${error.message}`);
    }
  };

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
          value={employee.salary.toString()}
          onChangeText={(text) => handleInputChange('salary', text)}
          placeholder="Salary"
          placeholderTextColor="gray"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          value={employee.doj}
          onChangeText={(text) => handleInputChange('doj', text)}
          placeholder="Date of Joining"
        />
        <Picker
          selectedValue={employee.department_id}
          style={styles.picker}
          onValueChange={(itemValue) =>
            handleInputChange('department_id', itemValue)
          }
        >
          {departments.map((department) => (
            <Picker.Item
              key={department.id}
              label={department.name}
              value={department.id}
            />
          ))}
        </Picker>
        <Picker
          selectedValue={employee.designation_id}
          style={styles.picker}
          onValueChange={(itemValue) =>
            handleInputChange('designation_id', itemValue)
          }
        >
          {designations.map((designation) => (
            <Picker.Item
              key={designation.id}
              label={designation.name}
              value={designation.id}
            />
          ))}
        </Picker>
        <Picker
          selectedValue={employee.employee_type_id}
          style={styles.picker}
          onValueChange={(itemValue) =>
            handleInputChange('employee_type_id', itemValue)
          }
        >
          {employeeTypes.map((employeeType) => (
            <Picker.Item
              key={employeeType.id}
              label={employeeType.title}
              value={employeeType.id}
            />
          ))}
        </Picker>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdateEmployee}
        >
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
    color: 'black',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
    color: 'black',
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
