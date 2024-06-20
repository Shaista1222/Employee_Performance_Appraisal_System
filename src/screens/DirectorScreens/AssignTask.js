import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
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
  const handleDescriptionChange = useCallback(
    text => {
      setTaskDescription(text);
    },
    [setTaskDescription],
  );

  const handleWeightageChange = useCallback(
    text => {
      setTaskWeightage(text);
    },
    [setTaskWeightage],
  );

  return (
    <ScrollView contentContainerStyle={styles.tabContent}>
      <TextInput
        label="Task Description"
        mode="outlined"
        multiline
        style={styles.input}
        onChangeText={handleDescriptionChange}
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
        onChangeText={handleWeightageChange}
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
      onChangeText={setTaskDescription} // Ensure this function is correctly passed
      value={taskDescription} // Ensure this is bound to the state variable
      placeholder="Enter Task Description"
    />
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedDesignation}
        onValueChange={itemValue => setSelectedDesignation(itemValue)}
        style={styles.picker}
        dropdownIconColor="black"
        mode="dropdown">
        <Picker.Item label="Select Designation" />
        {designationList.map(designation => (
          <Picker.Item
            key={designation.id}
            label={designation.name}
            value={designation}
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
        <Picker.Item label="Select Department" />
        {departmentList.map(department => (
          <Picker.Item
            key={department.id}
            label={department.name}
            value={department}
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
        <Picker.Item label="Select Person Type" />
        {employeeTypeList.map(employeeType => (
          <Picker.Item
            key={employeeType.id}
            label={employeeType.title}
            value={employeeType}
          />
        ))}
      </Picker>
    </View>

    <TextInput
      label="Task Weightage"
      mode="outlined"
      style={styles.input}
      onChangeText={setTaskWeightage} // Ensure this function is correctly passed
      value={taskWeightage} // Ensure this is bound to the state variable
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
              assigned_to_id: 1,
              assigned_by_id: empid.employee.id,
              task_description: taskDescription,
              status: 0,
              weightage: parseInt(taskWeightage),
              due_date: startTime,
              assigned_date: new Date().toISOString(),
              session_id: sid.id,
              department_id: departmentId,
              designation_id: designationId,
              person_type_id: personTypeId,
            };

            console.log(taskWithRole);

            const response = await TaskService.postTask(taskWithRole);
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

const AssignTask = ({
  isVisible,
  onClose,
  // employeeList = [],
  // designationList = [],
  // departmentList = [],
  // employeeTypeList = [],
}) => {
  const [taskDescription, setTaskDescription] = useState('');
  const [taskWeightage, setTaskWeightage] = useState('');
  const [startTime, setStartTime] = useState('');
  const [day, setDay] = useState('');
  const [personId, setPersonId] = useState('');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedPersonType, setSelectedPersonType] = useState(null);
  const [departmentId, setDepartmentId] = useState(null);
  const [designationId, setDesignationId] = useState(null);
  const [personTypeId, setPersonTypeId] = useState(null);
  const [index, setIndex] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [employeeTypeList, setEmployeeTypeList] = useState([]);

  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [routes] = useState([
    {key: 'individual', title: 'Individual'},
    {key: 'roleBased', title: 'Role Based'},
  ]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  useEffect(() => {
    fetchEmployees();
    fetchDesignations();
    fetchDepartments();
    fetchEmployeeType();
  }, []);
  useEffect(() => {
    if (selectedPerson) {
      setPersonId(selectedPerson);
      console.log('Selected person:', selectedPerson);
    }
  }, [selectedPerson]);

  useEffect(() => {
    if (selectedDepartment) {
      setDepartmentId(selectedDepartment);
      console.log('Selected department:', selectedDepartment);
    }
  }, [selectedDepartment]);
  useEffect(() => {
    if (selectedDesignation) {
      setDesignationId(selectedDesignation);
      console.log('Selected designation:', selectedDesignation);
    }
  }, [selectedDesignation]);
  useEffect(() => {
    if (selectedPersonType) {
      setPersonTypeId(selectedPersonType);
      console.log('Selected person type:', selectedPersonType);
    }
  }, [selectedPersonType]);

  const fetchEmployees = async () => {
    const employees = await EmployeeService.getEmployees();
    setEmployeeList(employees);
  };

  const fetchDesignations = async () => {
    const designations = await DesignationService.getDesignations();
    setDesignationList(designations);
    console.log(designations);
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

  useEffect(() => {
    // Fetch initial data here if necessary
  }, []);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'individual':
        return (
          <Individual
            taskDescription={taskDescription}
            setTaskDescription={setTaskDescription}
            taskWeightage={taskWeightage}
            setTaskWeightage={setTaskWeightage}
            showStartTimePicker={showStartTimePicker}
            startTime={startTime}
            day={day}
            personId={personId}
            setPersonId={setPersonId}
            setSelectedPerson={setSelectedPerson}
            selectedPerson={selectedPerson}
            employeeList={employeeList}
            onClose={onClose}
          />
        );
      case 'roleBased':
        return (
          <RoleBased
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
            departmentId={departmentId}
            designationId={designationId}
            personTypeId={personTypeId}
            onClose={onClose}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal visible={isVisible} onRequestClose={onClose} animationType="slide">
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <View style={styles.container}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={props => (
            <TabBar {...props} indicatorStyle={styles.tabBarIndicator} />
          )}
          initialLayout={{ width: '100%' }}
        />
        <DateTimePickerModal
          isVisible={isStartTimePickerVisible}
          mode="datetime"
          onConfirm={handleConfirmStartTime}
          onCancel={hideStartTimePicker}
        />
      </View>
    </KeyboardAvoidingView>
  </Modal>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContent: {
    padding: 10,
  },
  input: {
    marginVertical: 10,
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
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  saveButton: {
    backgroundColor: 'green',
  },
  tabBarIndicator: {
    backgroundColor: 'black',
  },
});

export default AssignTask;
