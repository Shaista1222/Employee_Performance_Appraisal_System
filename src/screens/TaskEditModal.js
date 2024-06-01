import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const TaskEditModal = ({ visible, onClose, task, onSave }) => {
  const [taskDescription, setTaskDescription] = useState(task.task_description);
  const [dueDate, setDueDate] = useState(task.due_date);
  const [weightage, setWeightage] = useState(task.weightage);

  const handleSave = () => {
    const updatedTask = { ...task, task_description: taskDescription, due_date: dueDate, weightage: weightage };
    onSave(updatedTask);
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
        <TextInput
          style={styles.input}
          value={dueDate}
          onChangeText={setDueDate}
          placeholder="Due Date"
        />
        <TextInput
          style={styles.input}
          value={weightage.toString()}
          onChangeText={text => setWeightage(parseInt(text))}
          placeholder="Weightage"
          keyboardType="numeric"
        />
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color:'black'
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
});

export default TaskEditModal;
