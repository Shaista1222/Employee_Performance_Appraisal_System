import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import EmployeeService from './Services/EmployeeService';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const TaskEditModal = ({visible, onClose, task, onSave}) => {
  const [taskDescription, setTaskDescription] = useState(task.task_description);
  const [dueDate, setDueDate] = useState(new Date(task.due_date));
  const [weightage, setWeightage] = useState(task.weightage);
  const [assignedTo, setAssignedTo] = useState(task.assigned_to_id);
  const [employeeList, setEmployeeList] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      const fetchedEmployeeTypes = await EmployeeService.getEmployees();
      setEmployeeList(fetchedEmployeeTypes);
    } catch (error) {
      Alert.alert('Error', `Failed to fetch dropdown data: ${error.message}`);
    }
  };

  const handleSave = () => {
    const updatedTask = {
      ...task,
      task_description: taskDescription,
      due_date: dueDate.toISOString(),
      weightage: weightage,
      assigned_to_id: assignedTo,
    };
    onSave(updatedTask);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setDueDate(date);
    hideDatePicker();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Edit Task</Text>
        <TextInput
          style={styles.input}
          value={taskDescription}
          onChangeText={setTaskDescription}
          placeholder="Task Description"
        />
        <TouchableOpacity onPress={showDatePicker} style={styles.input}>
          <Text style={styles.dateText}>{dueDate.toDateString()}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <TextInput
          style={styles.input}
          value={weightage.toString()}
          onChangeText={text => {
            if (!isNaN(text) && text !== '') {
              setWeightage(parseInt(text));
            } else {
              setWeightage(0);
            }
          }}
          placeholder="Weightage"
          keyboardType="numeric"
        />

        <Picker
          selectedValue={assignedTo}
          style={styles.picker}
          onValueChange={itemValue => setAssignedTo(itemValue)}>
          {employeeList.map(employee => (
            <Picker.Item
              key={employee.id}
              label={employee.name}
              value={employee.id}
            />
          ))}
        </Picker>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'black',
  },
  dateText: {
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  saveBtn: {
    backgroundColor: '#32CD32',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
    color: 'black',
  },
});

export default TaskEditModal;
