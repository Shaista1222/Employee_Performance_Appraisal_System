import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Picker} from '@react-native-picker/picker';
import {Button, TextInput} from 'react-native-paper';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import DepartmentService from '../Services/DepartmentService';
import EmployeeService from '../Services/EmployeeService';
import DesignationService from '../Services/DesignationService';
import TaskService, {
  postTask,
  postRoleBasedTask,
} from '../Services/TaskService'; // Assuming you import these API methods
import AsyncStorage from '@react-native-async-storage/async-storage';

const Individual = ({
  taskDescription,
  setTaskDescription,
  taskWeightage,
  setTaskWeightage,
  showStartTimePicker,
  startTime,
  day,
  selectedPerson,
  setSelectedPerson,
  employeeList = [],
  onClose,
}) => (
  <View style={styles.tabContent}>
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
        onValueChange={itemValue => setSelectedPerson(itemValue)}
        style={styles.picker}
        dropdownIconColor="black"
        mode="dropdown">
        {employeeList.map(employee => (
          <Picker.Item
            key={employee.id}
            label={employee.name}
            value={employee.id}
          />
        ))}
      </Picker>
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
          onPress={async () => {
            try {
              const sessionId = await AsyncStorage.getItem('currentSession');
              const employeeId = await AsyncStorage.getItem('employee');
              console.log(`Session ID from AsyncStorage: ${sessionId}`);
              const sid = JSON.parse(sessionId);
              const empid=JSON.parse(employeeId)
              console.log(`Parsed Session ID: ${sid.id}`);

              if (!sessionId || !empid) {
                Alert.alert('Error', 'Id not foun',sid,empid);
                return;
              }

              if (
                !taskDescription ||
                !selectedPerson ||
                !taskWeightage ||
                !startTime
              ) {
                Alert.alert('Error', 'please fill the task information.');
                return;
              }
              const task = {
                assigned_to_id: selectedPerson,
                assigned_by_id: empid,
                task_description: taskDescription,
                status: false,
                weightage: taskWeightage,
                due_date: startTime,
                assigned_date: new Date(),
                session_id: sid,
              };
              await TaskService.postTask(task);
              console.log('Task saved successfully');
              onClose();
            } catch (error) {
              console.error('Error saving task:', error.message);
            }
          }}>
          Save
        </Button>
      </View>
    </TouchableOpacity>
  </View>
);

const RoleBased = ({
  taskDescription,
  setTaskDescription,
  selectedDesignation,
  setSelectedDesignation,
  designationList = [],
  selectedDepartment,
  setSelectedDepartment,
  departmentList = [],
  selectedPersonType,
  setSelectedPersonType,
  employeeTypeList = [],
  taskWeightage,
  setTaskWeightage,
  showStartTimePicker,
  startTime,
  day,
  onClose,
}) => (
  <View style={styles.tabContent}>
    <TextInput
      placeholderTextColor="gray"
      style={styles.input}
      onChangeText={setTaskDescription}
      value={taskDescription}
      placeholder="Enter Task Description"
    />
    <View style={styles.showPerformance}>
      <Picker
        selectedValue={selectedDesignation}
        onValueChange={itemValue => setSelectedDesignation(itemValue)}
        style={styles.picker}
        dropdownIconColor="black"
        mode="dropdown">
        {designationList.map(designation => (
          <Picker.Item
            key={designation.id}
            label={designation.name}
            value={designation.id}
          />
        ))}
      </Picker>
    </View>

    <View style={styles.showPerformance}>
      <Picker
        selectedValue={selectedDepartment}
        onValueChange={itemValue => setSelectedDepartment(itemValue)}
        style={styles.picker}
        dropdownIconColor="black"
        mode="dropdown">
        {departmentList.map(department => (
          <Picker.Item
            key={department.id}
            label={department.name}
            value={department.id}
          />
        ))}
      </Picker>
    </View>

    <View style={styles.showPerformance}>
      <Picker
        selectedValue={selectedPersonType}
        onValueChange={itemValue => setSelectedPersonType(itemValue)}
        style={styles.picker}
        dropdownIconColor="black"
        mode="dropdown">
        {employeeTypeList.map(employeeType => (
          <Picker.Item
            key={employeeType.id}
            label={employeeType.title}
            value={employeeType.id}
          />
        ))}
      </Picker>
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
        onPress={async () => {
          try {
            const sessionId = await AsyncStorage.getItem('currentSession');
              const employeeId = await AsyncStorage.getItem('employee');
              console.log(`Session ID from AsyncStorage: ${sessionId}`);
              const sid = JSON.parse(sessionId);
              const empid=JSON.parse(employeeId)
              console.log(`Parsed Session ID: ${sid.id}`);

              if (!sessionId || !empid) {
                Alert.alert('Error', 'Id not foun',sid,empid);
                return;
              }

              if (
                !taskDescription ||
                !selectedDepartment ||
                !selectedDesignation||
                !selectedPersonType||
                !taskWeightage ||
                !startTime
              ) {
                Alert.alert('Error', 'please fill the task information.');
                return;
              }
              const taskWithRole = {
                department_id: selectedDepartment,
                designation_id:selectedDesignation,
                employee_type_id:selectedPersonType,
                assigned_by_id: empid,
                task_description: taskDescription,
                status: false,
                weightage: taskWeightage,
                due_date: startTime,
                assigned_date: new Date(),
                session_id: sid,
              };
            await TaskService.postRoleBasedTask(taskWithRole);
            console.log('Role-based task saved successfully');
            onClose(); // Close modal after successful save
          } catch (error) {
            console.error('Error saving role-based task:', error.message);
          }
        }}>
        Save
      </Button>
    </View>
  </View>
);

const AssignTask = ({visible, onClose}) => {
  const [selectedPerson, setSelectedPerson] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');
  const [selectedPersonType, setSelectedPersonType] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskWeightage, setTaskWeightage] = useState('');
  const [employeeList, setEmployeeList] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [employeeTypeList, setEmployeeTypeList] = useState([]);

  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [index, setIndex] = useState(0);
  const [day, setDay] = useState('');
  const [routes] = useState([
    {key: 'first', title: 'Individual'},
    {key: 'second', title: 'Role Based'},
  ]);

  useEffect(() => {
    fetchEmployees();
    fetchDesignations();
    fetchDepartments();
    fetchEmployeeType();
  }, []);

  const fetchEmployees = async () => {
    try {
      const employees = await EmployeeService.getEmployees();
      setEmployeeList(employees);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const fetchDesignations = async () => {
    try {
      const designations = await DesignationService.getDesignations();
      setDesignationList(designations);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const fetchDepartments = async () => {
    try {
      const departments = await DepartmentService.getDepartments();
      setDepartmentList(departments);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const fetchEmployeeType = async () => {
    try {
      const employeeTypes = await EmployeeService.getEmployeeTypes();
      setEmployeeTypeList(employeeTypes);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // const showStartTimePicker = () => {
  //   setStartTimePickerVisible(true);
  // };

  // const hideStartTimePicker = () => {
  //   setStartTimePickerVisible(false);
  // };

  // const handleStartTimeConfirm = date => {
  //   setStartTime(date.toLocaleTimeString());
  //   hideStartTimePicker();
  // };

  // const handleStartDayConfirm = date => {
  //   const options = {weekday: 'long'};
  //   const dayOfWeek = date.toLocaleDateString(undefined, options);
  //   setDay(dayOfWeek);
  // };
  const showStartTimePicker = () => {
    setStartTimePickerVisible(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisible(false);
  };

  const handleStartTimeConfirm = date => {
    const formattedDate = date.toISOString();
    setStartTime(formattedDate);
    hideStartTimePicker();
  };
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.labelStyle}
    />
  );

  const renderScene = SceneMap({
    first: () => (
      <Individual
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
        selectedPerson={selectedPerson}
        setSelectedPerson={setSelectedPerson}
        employeeList={employeeList}
        taskWeightage={taskWeightage}
        setTaskWeightage={setTaskWeightage}
        showStartTimePicker={showStartTimePicker}
        startTime={startTime}
        day={day}
      />
    ),
    second: () => (
      <RoleBased
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
        selectedPerson={selectedPerson}
        setSelectedPerson={setSelectedPerson}
        employeeList={employeeList}
        taskWeightage={taskWeightage}
        setTaskWeightage={setTaskWeightage}
        showStartTimePicker={showStartTimePicker}
        startTime={startTime}
        day={day}
        selectedDesignation={selectedDesignation}
        setSelectedDesignation={setSelectedDesignation}
        designationList={designationList}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        departmentList={departmentList}
        selectedPersonType={selectedPersonType}
        setSelectedPersonType={setSelectedPersonType}
        employeeTypeList={employeeTypeList}
      />
    ),
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Add Task</Text>

          <View style={styles.tabContainer}>
            <TabView
              navigationState={{index, routes}}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{width: 300}}
              renderTabBar={renderTabBar}
            />
          </View>
          <DateTimePickerModal
            isVisible={isStartTimePickerVisible}
            mode="datetime"
            onConfirm={date => {
              handleStartTimeConfirm(date);
              // handleStartDayConfirm(date);
            }}
            onCancel={hideStartTimePicker}
          />
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    width: '85%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabBar: {
    backgroundColor: '#3a7ca5',
  },
  indicator: {
    backgroundColor: 'white',
  },
  labelStyle: {
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: 250,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
  picker: {
    color: 'black',
    width: '100%',
  },
  showPerformance: {
    height: 40,
    width: 250,
    marginVertical: 10,
    borderWidth: 1,
    paddingBottom: 16,
    color: 'black',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 15,
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
  tabContainer: {
    height: 500,
    width: '100%',
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default AssignTask;
