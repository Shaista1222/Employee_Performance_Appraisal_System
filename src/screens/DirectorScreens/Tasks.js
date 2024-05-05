import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import AssignTask from './AssignTask';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Picker} from '@react-native-picker/picker';
const takCategory = ['All', 'pending', 'completed'];
const Task = () => {
  const [selectedEvaluator, setSelectedEvaluator] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);

  const handleValueChange = (itemValue, itemIndex) =>
    setSelectedEvaluator(itemValue);
  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>Task</Text>
      </View>
      <Picker
        selectedValue={selectedEvaluator}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedEvaluator(itemValue)
        }
        style={styles.picker}
        dropdownIconColor="black"
        dropdownIconComponent={() => (
          <FontAwesome5 name="caret-down" size={18} color="black" />
        )}
        mode="dropdown">
        <Picker.Item label="All" value="All" />
      </Picker>
      <View style={styles.container}>
        <View style={styles.taskContainer}>
          <TouchableOpacity
            style={styles.headerText}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Assign Task</Text>
          </TouchableOpacity>
          <AssignTask
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
          <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>
              Craft a comprehensive course syllabus for Computer Science 101...
            </Text>
            <View style={styles.detailsContainer}>
              <Text style={styles.dateText}>Due: 28 Feb 2022 19:00 GMT</Text>
              <Text style={styles.assigneeText}>To: Zahid Ahmed</Text>
              <Text style={styles.authorText}>By: Jamil Sarwar</Text>
              <Text style={styles.authorText}>Weightage 10</Text>
            </View>
            <TextInput
              placeholderTextColor="gray"
              style={styles.input}
              placeholder="Enter Score"
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 10,
  },
  title: {
    paddingTop: 10,
    backgroundColor: '#6360DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  picker: {
    backgroundColor: 'white',
    color: 'black',
  },
  taskContainer: {
    borderRadius: 6,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor: '#02367B',
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
    alignItems: 'center',
  },
  taskCard: {
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  detailsContainer: {
    marginTop: 5,
  },
  dateText: {
    fontSize: 14,
    color: 'black',
  },
  assigneeText: {
    fontSize: 14,
    color: 'black',
  },
  authorText: {
    fontSize: 14,
    marginBottom: 10,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 8,
    borderRadius: 4,
    marginTop: 10,
    color: 'black',
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Task;
