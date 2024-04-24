import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  DatePickerAndroid,
} from 'react-native';
import {Button} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
const AssignTask = ({visible, onClose}) => {
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedPerson, setSelectedPerson] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [taskWeightage, setTaskWeightage] = useState('');
  const [dueDate, setDueDate] = useState(new Date());

  /* const openDatePicker = async () => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: dueDate,
        // Use spinner or default for the Android date picker mode
        mode: 'spinner',
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        setDueDate(new Date(year, month, day));
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }; */
 /*  const handleDateChange = (date) => {
    // You can handle the date change here
    // For example, set the dueDate state
    setDueDate(new Date(date));
  }; */


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Add Task</Text>

          <TextInput
            placeholderTextColor="gray"
            style={styles.input}
            onChangeText={setTaskDescription}
            value={taskDescription}
            placeholder="Enter Task Description"
          />

          {/* Replace Picker with your choice of dropdown library */}
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
            <Picker.Item label="Select Employee" value="employee" />
          </Picker>

          {/* Replace Picker with your choice of dropdown library */}
          <Picker
            selectedValue={selectedRole}
            onValueChange={(itemValue, itemIndex) => setSelectedRole(itemValue)}
            style={styles.picker}
            dropdownIconColor="black"
            dropdownIconComponent={() => (
              <FontAwesome5 name="caret-down" size={18} color="black" />
            )}
            mode="dropdown">
            <Picker.Item label="Select Role" value="role" />
          </Picker>

          <TextInput
            placeholderTextColor="gray"
            style={styles.input}
            onChangeText={setTaskWeightage}
            value={taskWeightage}
            placeholder="Select Task Weightage"
            keyboardType="numeric"
          />

          {/* <TouchableOpacity onPress={openDatePicker} style={styles.datePicker}>
            <Text style={{color: 'black'}}>Select Due Date</Text>
          </TouchableOpacity>

          <Text>{dueDate.toDateString()}</Text>
 */}
          <View style={styles.buttonRow}>
            <Button
              style={styles.button}
              textColor="white"
              labelStyle={styles.buttonText}
              onPress={onClose}>Cancel</Button>
            <Button
              style={styles.saveButton}
              textColor="white"
              labelStyle={styles.buttonText}
              onPress={() => console.log('Save task')}>Save</Button>
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
  justifyContent: 'center',},

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
    color: 'black'
  },
  picker: {
    backgroundColor: 'white',
    color: 'black',
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    // paddingLeft:21
  },
});

export default AssignTask;
