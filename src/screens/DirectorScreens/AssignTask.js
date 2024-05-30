import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Picker} from '@react-native-picker/picker';
import {Button, TextInput} from 'react-native-paper';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import DepartmentService from '../Services/DepartmentService';
import EmployeeService from '../Services/EmployeeService';
import DesignationService from '../Services/DesignationService';
import TaskService from '../Services/TaskService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Individual = ({
  taskDescription,
  setTaskDescription,
  taskWeightage,
  setTaskWeightage,
  showStartTimePicker,
  startTime,
  day,
  personId,
  setPersonId,
  setSelectedPerson,
  selectedPerson,
  employeeList = [],
  onClose,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.tabContent}>
      <TextInput
        label="Task Description"
        mode="outlined"
        multiline
        style={styles.input}
        onChangeText={setTaskDescription}
        value={taskDescription}
        placeholder="Enter Task Description"
      />
      <View style={styles.pickerContainer}>
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
        label="Task Weightage"
        mode="outlined"
        style={styles.input}
        onChangeText={setTaskWeightage}
        value={taskWeightage}
        placeholder="Enter Task Weightage"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.datePicker} onPress={showStartTimePicker}>
        <Text style={{color: 'black'}}>
          Due Date: {startTime} {day}
        </Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <Button mode="contained" style={styles.cancelButton} onPress={onClose}>
          Cancel
        </Button>
        <Button
          mode="contained"
          style={styles.saveButton}
          onPress={async () => {
            try {
              const sessionId = await AsyncStorage.getItem('currentSession');
              const employeeId = await AsyncStorage.getItem('employee');
              const sid = JSON.parse(sessionId);
              const empid = JSON.parse(employeeId);
              console.log(sid, empid.employee.id);
              if (!sessionId || !empid) {
                Alert.alert('Error', 'ID not found');
                return;
              }

              if (
                !taskDescription ||
                !selectedPerson ||
                !taskWeightage ||
                !startTime
              ) {
                Alert.alert(
                  'Error',
                  'Please fill in all the task information.',
                );
                return;
              }

              const task = {
                assigned_to_id: personId,
                assigned_by_id: empid.employee.id,
                task_description: taskDescription,
                status: 0,
                weightage: parseInt(taskWeightage),
                due_date: startTime,
                assigned_date: new Date().toISOString(),
                session_id: sid.id,
              };

              console.log(task);

              const response = await TaskService.postTask(task);
              console.log(response);
              if (response) {
                Alert.alert('Success', 'Task saved successfully');
                onClose();
              } else {
                const errorData = await response.json();
                console.error('Error saving task:', errorData);
                Alert.alert(
                  'Error',
                  `Something went wrong while adding task: ${errorData}`,
                );
              }
            } catch (error) {
              console.error('Error saving task:', error);
              Alert.alert(
                'Error',
                `Something went wrong while adding task: ${error}`,
              );
            }
          }}>
          Save
        </Button>
      </View>
    </ScrollView>
  );
};

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
  departmentId,
  designationId,
  personTypeId,
  onClose,
}) => (
  <ScrollView contentContainerStyle={styles.tabContent}>
    <TextInput
      label="Task Description"
      mode="outlined"
      multiline
      style={styles.input}
      onChangeText={setTaskDescription}
      value={taskDescription}
      placeholder="Enter Task Description"
    />
    <View style={styles.pickerContainer}>
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
    <View style={styles.pickerContainer}>
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
    <View style={styles.pickerContainer}>
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
      label="Task Weightage"
      mode="outlined"
      style={styles.input}
      onChangeText={setTaskWeightage}
      value={taskWeightage}
      placeholder="Enter Task Weightage"
      keyboardType="numeric"
    />
    <TouchableOpacity style={styles.datePicker} onPress={showStartTimePicker}>
      <Text style={{color: 'black'}}>
        Due Date: {startTime} {day}
      </Text>
    </TouchableOpacity>
    <View style={styles.buttonContainer}>
      <Button mode="contained" style={styles.cancelButton} onPress={onClose}>
        Cancel
      </Button>
      <Button
        mode="contained"
        style={styles.saveButton}
        onPress={async () => {
          try {
            const sessionId = await AsyncStorage.getItem('currentSession');
              const employeeId = await AsyncStorage.getItem('employee');
              const sid = JSON.parse(sessionId);
              const empid = JSON.parse(employeeId);
              console.log(sid.id, empid.employee.id);
              if (!sessionId || !empid) {
                Alert.alert('Error', 'ID not found');
                return;
              }

            if (
              !taskDescription ||
              !selectedDepartment ||
              !selectedDesignation ||
              !selectedPersonType ||
              !taskWeightage ||
              !startTime
            ) {
              Alert.alert('Error', 'Please fill in all the task information.');
              return;
            }

            const taskWithRole = {
              department_id: departmentId,
              designation_id: designationId,
              employee_type_id: personTypeId,
              assigned_by_id: empid.employee.id,
              task_description: taskDescription,
              status: false,
              weightage: taskWeightage,
              due_date: startTime,
              assigned_date: new Date(),
              session_id: sid.id,
            };

            const response = await TaskService.postRoleBasedTask(taskWithRole);
            console.log(response);
            if (response) {
              Alert.alert('Success', 'Task saved successfully');
              onClose();
            } else {
              const errorData = await response.json();
              console.error('Error saving task:', errorData);
              Alert.alert(
                'Error',
                `Something went wrong while adding task: ${errorData}`,
              );
            }
          } catch (error) {
            console.error('Error saving task:', error);
            Alert.alert(
              'Error',
              `Something went wrong while adding task: ${error}`,
            );
          }
        }}>
        Save
      </Button>
    </View>
  </ScrollView>
);

const AssignTask = ({visible, onClose}) => {
  const [selectedPerson, setSelectedPerson] = useState('');
  const [personId, setPersonId] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [designationId, setDesignationId] = useState('');
  const [personTypeId, setPersonTypeId] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');
  const [selectedPersonType, setSelectedPersonType] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskWeightage, setTaskWeightage] = useState('');
  const [startTime, setStartTime] = useState('');
  const [day, setDay] = useState('');
  const [employeeList, setEmployeeList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [employeeTypeList, setEmployeeTypeList] = useState([]);
  const [index, setIndex] = useState(0);
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [routes] = useState([
    {key: 'first', title: 'Individual'},
    {key: 'second', title: 'Role-Based'},
  ]);

  useEffect(() => {
    fetchEmployees();
    fetchDesignations();
    fetchDepartments();
    fetchEmployeeType();
  }, []);
  useEffect(() => {
    if (selectedPerson) {
      setPersonId(selectedPerson);
      console.log('Selected Evaluation Type:', selectedPerson);
    }
  }, [selectedPerson]);
  useEffect(() => {
    if (selectedPerson) {
      setPersonId(selectedPerson);
      console.log('Selected Evaluation Type:', selectedPerson);
    }
  }, [selectedPerson]);
  useEffect(() => {
    if (selectedDepartment) {
      setDepartmentId(selectedDepartment);
      console.log('Selected Evaluation Type:', selectedDepartment);
    }
  }, [selectedDepartment]);
  useEffect(() => {
    if (selectedDesignation) {
      setDesignationId(selectedDesignation);
      console.log('Selected Evaluation Type:', selectedDesignation);
    }
  }, [selectedDesignation]);
  useEffect(() => {
    if (selectedPersonType) {
      setPersonTypeId(selectedPersonType);
      console.log('Selected Evaluation Type:', selectedPersonType);
    }
  }, [selectedPersonType]);

  const fetchEmployees = async () => {
    const employees = await EmployeeService.getEmployees();
    setEmployeeList(employees);
  };

  const fetchDesignations = async () => {
    const designations = await DesignationService.getDesignations();
    setDesignationList(designations);
  };

  const fetchDepartments = async () => {
    const departments = await DepartmentService.getDepartments();
    setDepartmentList(departments);
  };

  const fetchEmployeeType = async () => {
    const employeeTypes = await EmployeeService.getEmployeeTypes();
    setEmployeeTypeList(employeeTypes);
  };

  const showStartTimePicker = () => {
    setStartTimePickerVisible(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisible(false);
  };

  const handleConfirmStartTime = date => {
    const formattedTime = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const dayString = date.toLocaleDateString([], {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
    setStartTime(formattedTime);
    setDay(dayString);
    hideStartTimePicker();
  };

  const renderScene = SceneMap({
    first: () => (
      <Individual
        personId={personId}
        setPersonId={setPersonId}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
        taskWeightage={taskWeightage}
        setTaskWeightage={setTaskWeightage}
        showStartTimePicker={showStartTimePicker}
        startTime={startTime}
        day={day}
        selectedPerson={selectedPerson}
        setSelectedPerson={setSelectedPerson}
        employeeList={employeeList}
        onClose={onClose}
      />
    ),
    second: () => (
      <RoleBased
        departmentId={departmentId}
        designationId={designationId}
        personTypeId={personTypeId}
        setDepartmentId={setDepartmentId}
        setDesignationId={setDesignationId}
        setPersonTypeId={setPersonTypeId}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
        selectedDesignation={selectedDesignation}
        setSelectedDesignation={setSelectedDesignation}
        designationList={designationList}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        departmentList={departmentList}
        selectedPersonType={selectedPersonType}
        setSelectedPersonType={setSelectedPersonType}
        employeeTypeList={employeeTypeList}
        taskWeightage={taskWeightage}
        setTaskWeightage={setTaskWeightage}
        showStartTimePicker={showStartTimePicker}
        startTime={startTime}
        day={day}
        onClose={onClose}
      />
    ),
  });

  return (
    <Modal visible={visible} onRequestClose={onClose} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Assign Task</Text>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: 300}}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{backgroundColor: 'blue'}}
              style={{backgroundColor: 'white'}}
              labelStyle={{color: 'black'}}
            />
          )}
        />
        <DateTimePickerModal
          isVisible={isStartTimePickerVisible}
          mode="datetime"
          onConfirm={handleConfirmStartTime}
          onCancel={hideStartTimePicker}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    color: 'black',
  },
  datePicker: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: 'red',
    flex: 1,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: 'green',
    flex: 1,
    marginLeft: 10,
  },
});

export default AssignTask;
