import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

const TaskAdapter = ({task, onOkButtonPress}) => {
  if (!task) {
    return;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.highlightedTest}>Task: </Text>
      <Text style={styles.simpleText}>{task.task_description}</Text>
      <View style={styles.dueDate}>
        <Text style={styles.highlightedTest}>Due: </Text>
        <Text style={styles.simpleText}>
          {new Date(task.due_date).toGMTString()}
        </Text>
        <Text style={styles.highlightedTest}>To: </Text>
        <Text style={styles.simpleText}>{task.assigned_to.name}</Text>
      </View>
      <View style={styles.dueDate}>
        <Text style={styles.highlightedTest}>Weightage: </Text>
        <Text style={styles.simpleText}>{task.weightage}</Text>
        <Text style={styles.highlightedTest}>By: </Text>
        <Text style={styles.simpleText}>{task.assigned_by.name}</Text>
      </View>
      <View style={styles.scoreContainer}>
        <TextInput style={styles.scoreInput} placeholder="Enter Score" />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => onOkButtonPress(task)}>
          <Text style={{color: 'black', fontSize: 20}}>Ok</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  taskDescription: {
    flex: 1,
    color: 'black',
    fontSize: 15,
  },
  dueDate: {
    flex: 2,
    color: 'black',
    flexDirection: 'row',
    paddingRight: 12,
    fontSize: 17,
    // justifyContent:'space-between'
  },
  scoreInput: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 5,
    color: 'black',
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'black',
    marginTop: 12,
  },
  btn: {
    backgroundColor: '#D3D3D3',
    width: 56,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TaskAdapter;
