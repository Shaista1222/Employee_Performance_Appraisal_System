import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function TaskItem({task}) {
  if (!task) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.taskDescription}>{task.task.task_description}</Text>
      <Text style={styles.dueDate}>
        Due: {new Date(task.task.due_date).toGMTString()}
      </Text>
      <Text style={styles.assignedTo}>TO: {task.assigned_to.name}</Text>
      <Text style={styles.weightage}>Weightage: {task.task.weightage}</Text>
      <Text style={styles.assignedBy}>By: {task.assigned_by.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  dueDate: {
    color: '#888',
    marginBottom: 5,
  },
  assignedTo: {
    marginBottom: 5,
  },
  weightage: {
    marginBottom: 5,
  },
  assignedBy: {
    color: '#888',
  },
});
