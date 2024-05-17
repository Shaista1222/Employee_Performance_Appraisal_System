import React, {useState, useEffect} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Picker} from '@react-native-picker/picker';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  Alert,
} from 'react-native';
import {Button} from 'react-native-paper';
import DepartmentService from '../Services/DepartmentService';
import EmployeeService from '../Services/EmployeeService';
import DesignationService from '../Services/DesignationService';
import {TabView, SceneMap} from 'react-native-tab-view';

const FirstRoute = () => <View style={{flex: 1, backgroundColor: '#ff4081'}} />;

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});
const AssignTask = ({visible, onClose}) => {
  const [session, setSession] = useState('');
  const [selectedPerson, setSelectedPerson] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedPersonType, setSelectedPersonType] = useState('');
  const [selectedRoleDepartment, setSelectedDepartment] = useState('');
  const [taskWeightage, setTaskWeightage] = useState('');
  const [employeeList, setEmployeeList] = useState([]);
  const [employeeTypeList, setEmployeeTypeList] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [dueDate, setDueDate] = useState(new Date());
  const [taskDescription, setTaskDescription] = useState('');
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [day, setDay] = useState('');

  useEffect(() => {
    fetchEmployees();
    fetchEmployeeTypes();
    fetchDesignations();
    fetchDepartments();
  }, []);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'First'},
    {key: 'second', title: 'Second'},
  ]);

  const fetchEmployees = async () => {
    try {
      EmployeeService.getEmployees()
        .then(employees => setEmployeeList(employees))
        .catch(error => console.error(error));
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

  const showStartTimePicker = () => {
    setStartTimePickerVisible(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisible(false);
  };

  const handleStartTimeConfirm = date => {
    setStartTime(date.toLocaleTimeString());
    hideStartTimePicker();
  };
  const handleStartDayConfirm = date => {
    const options = {weekday: 'long'}; // 'long' for the full weekday name, e.g., "Monday"
    const dayOfWeek = date.toLocaleDateString(undefined, options);
    setDay(dayOfWeek);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Add Task</Text>
          {/* <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{width: 20, height: 20}}
            tabBarStyle={styles.tabBar}
          /> */}
          <TextInput
            placeholderTextColor="gray"
            style={styles.input}
            onChangeText={setTaskDescription}
            value={taskDescription}
            placeholder="Enter Task Description"
          />
          <View style={styles.showPerformance}>
            <Picker
              selectedValue={selectedPerson}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedPerson(itemValue)
              }
              style={styles.picker}
              dropdownIconColor="black"
              dropdownIconComponent={() => (
                <FontAwesome5 name="caret-down" size={18} color="black" />
              )}
              mode="dropdown">
              {employeeList.map((employee, index) => (
                <Picker.Item
                  key={index}
                  label={employee.name}
                  value={employee.id}
                />
              ))}
            </Picker>
          </View>

          <View style={{display: 'none'}}>
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

          <TextInput
            placeholderTextColor="gray"
            style={styles.input}
            onChangeText={setTaskWeightage}
            value={taskWeightage}
            placeholder="Select Task Weightage"
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.input} onPress={showStartTimePicker}>
            <Text style={{color: 'black'}}>
              Due Date: {startTime} {day}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isStartTimePickerVisible}
            mode="datetime"
            onConfirm={date => {
              handleStartTimeConfirm(date);
              handleStartDayConfirm(date);
            }}
            onCancel={hideStartTimePicker}
          />

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
              onPress={() => console.log('Save task')}>
              Save
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
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

export default AssignTask;
