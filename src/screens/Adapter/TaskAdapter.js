import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';

const TaskAdapter = ({ tasks, onOkButtonPress, onEditButtonPress, onDeleteButtonPress }) => {
  const renderItem = ({ item }) => (
    <View style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Text style={styles.highlightedTest}>Task: </Text>
        <Text style={styles.simpleText}>{item.task.task_description}</Text>

        <View style={styles.dueDate}>
          <Text style={styles.highlightedTest}>Due: </Text>
          <Text style={styles.simpleText}>{new Date(item.task.due_date).toGMTString()}</Text>
        </View>
        <View style={styles.dueDate}>
          <Text style={styles.highlightedTest}>To: </Text>
          <Text style={styles.simpleText}>{item.assigned_to.name}</Text>
        </View>
        <View style={styles.dueDate}>
          <Text style={styles.highlightedTest}>Weightage: </Text>
          <Text style={styles.simpleText}>{item.task.weightage}</Text>
          <View style={styles.portionSpacing}>
            <Text style={styles.highlightedTest}>By: </Text>
            <Text style={styles.simpleText}>{item.assigned_by.name}</Text>
          </View>
        </View>
        <View style={styles.scoreContainer}>
          <TextInput
            style={styles.scoreInput}
            placeholder="Enter Score"
            placeholderTextColor="gray"
            keyboardType="numeric"
            onChangeText={text => (item.task.score = parseInt(text))}
          />
          <TouchableOpacity style={styles.btn} onPress={() => onOkButtonPress(item)}>
            <Text style={{ color: 'black', fontSize: 20 }}>Ok</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editBtn} onPress={() => onEditButtonPress(item)}>
            <Text style={{ color: 'black', fontSize: 20 }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteBtn} onPress={() => onDeleteButtonPress(item.task.id)}>
            <Text style={{ color: 'black', fontSize: 20 }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  highlightedTest: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  simpleText: {
    color: 'black',
    fontSize: 17,
  },
  dueDate: {
    flexDirection: 'row',
    fontSize: 17,
  },
  portionSpacing: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    color: 'black',
  },
  btn: {
    backgroundColor: '#32CD32',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editBtn: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 5,
  },
  deleteBtn: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
  },
});

export default TaskAdapter;
