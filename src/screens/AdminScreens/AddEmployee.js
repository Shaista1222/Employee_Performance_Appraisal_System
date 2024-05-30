import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Modal, TextInput, Alert} from 'react-native';
import CommonData from '../DirectorScreens/CommonData';
import {Picker} from '@react-native-picker/picker';
import {Button} from 'react-native-paper';
import DesignationService from '../Services/DesignationService';
import DepartmentService from '../Services/DepartmentService';
import EmployeeService from '../Services/EmployeeService';

const AddEmployee = ({visible, onClose}) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedPersonType, setSelectedPersonType] = useState('');
  const [selectedRoleDepartment, setSelectedDepartment] = useState('');
  const [employeeTypeList, setEmployeeTypeList] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [employeePassword, setEmployeePassword] = useState('');
  const [employeeSalary, setEmployeeSalary] = useState('');
  const [employeeJoiningDate, setEmployeeJoiningDate] = useState('');

  useEffect(() => {
    fetchEmployeeTypes();
    fetchDesignations();
    fetchDepartments();
  }, []);

  const fetchDesignations = async () => {
    try {
      DesignationService.getDesignations()
        .then(Designation => {
          setDesignationList(Designation);
          console.log('Designation');
        })
        .catch(error => console.error(error));
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const fetchDepartments = async () => {
    try {
      DepartmentService.getDepartments()
        .then(departments => setDepartmentList(departments))
        .catch(error => console.error(error));
      // setTaskList(tasks);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  const fetchEmployeeTypes = async () => {
    try {
      EmployeeService.getEmployeeTypes()
        .then(employeeTypes => setEmployeeTypeList(employeeTypes))
        .catch(error => console.error(error));
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleAddEmployee = async () => {
    const employeeData = {
      name: employeeName,
      email: employeeEmail,
      password: employeePassword,
      employee_type_id: selectedPersonType,
      salary: employeeSalary,
      doj: employeeJoiningDate,
      deleted:false,
      department_id: selectedRoleDepartment,
      designation_id:selectedRole ,
    };
  
    try {
      if (
        !selectedRole ||
        !employeeName ||
        !employeeEmail ||
        !employeePassword ||
        !employeeJoiningDate ||
        !employeeSalary ||
        !selectedPersonType ||
        !selectedRoleDepartment
      ) {
        alert('Please fill out employee information.');
      } else {
        const newEmployee = await EmployeeService.postEmployee(employeeData);
        console.log('New employee added:', newEmployee);
        onClose();
      }
    } catch (error) {
      alert(`Failed to add employee: ${error.message}`);
    }
  };
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Add Employee</Text>
          <TextInput
            placeholderTextColor="gray"
            style={styles.input}
            onChangeText={setEmployeeName}
            value={employeeName}
            placeholder="Enter Employee name"
          />
          <TextInput
            placeholderTextColor="gray"
            style={styles.input}
            onChangeText={setEmployeeEmail}
            value={employeeEmail}
            placeholder="Enter Employee email"
          />
          <TextInput
            placeholderTextColor="gray"
            style={styles.input}
            onChangeText={setEmployeePassword}
            value={employeePassword}
            placeholder="Enter Employee Password"
          />
          <TextInput
            placeholderTextColor="gray"
            style={styles.input}
            onChangeText={setEmployeeSalary}
            value={employeeSalary}
            placeholder="Enter Employee Salary"
          />

          <TextInput
            placeholderTextColor="gray"
            style={styles.input}
            onChangeText={setEmployeeJoiningDate}
            value={employeeJoiningDate}
            placeholder="Enter Employee Joining Date"
          />
          <View>
            <View style={styles.showPerformance}>
              <Picker
                selectedValue={selectedRole}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedRole(itemValue)
                }
                style={styles.picker}
                dropdownIconColor="black"
                dropdownIconComponent={() => (
                  <FontAwesome5 name="caret-down" size={18} color="black" />
                )}
                mode="dropdown">
                <Picker.Item label="Role" />
                {designationList.map((designation, index) => (
                  <Picker.Item
                    key={index}
                    label={designation.name}
                    value={designation.id}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.showPerformance}>
              <Picker
                selectedValue={selectedPersonType}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedPersonType(itemValue)
                }
                style={styles.picker}
                dropdownIconColor="black"
                dropdownIconComponent={() => (
                  <FontAwesome5 name="caret-down" size={18} color="black" />
                )}
                mode="dropdown">
                <Picker.Item label="Employee Type" />

                {employeeTypeList.map((personType, index) => (
                  <Picker.Item
                    key={index}
                    label={personType.title}
                    value={personType.id}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.showPerformance}>
              <Picker
                selectedValue={selectedRoleDepartment}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedDepartment(itemValue)
                }
                style={styles.picker}
                dropdownIconColor="black"
                dropdownIconComponent={() => (
                  <FontAwesome5 name="caret-down" size={18} color="black" />
                )}
                mode="dropdown">
                <Picker.Item label="Role Department" />

                {departmentList.map((department, index) => (
                  <Picker.Item
                    key={index}
                    label={department.name}
                    value={department.id}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <View style={styles.buttonRow}>
            <Button
              style={styles.button}
              textColor="white"
              labelStyle={styles.buttonText}
              onPress={onClose}>
              Cancel
            </Button>
            <Button
              style={styles.saveButton}
              textColor="white"
              labelStyle={styles.buttonText}
              onPress={handleAddEmployee}>
              Save
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
    color: 'black',
  },
  picker: {
    height: 50,
    width: '100%',
    color: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  button: {
    backgroundColor: 'crimson',
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: 'green',
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    backgroundColor: 'gray',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: 200,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
  picker: {
    color: 'black',
    width: '100%',
  },

  datePicker: {
    height: 40,
    width: 200,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showPerformance: {
    height: 40,
    width: 200,
    marginVertical: 10,
    borderWidth: 1,
    paddingBottom: 16,
    color: 'black',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // borderWidth:1
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  tabActive: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
  },
  tabLayout: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    // paddingLeft:21
  },
});

export default AddEmployee;
