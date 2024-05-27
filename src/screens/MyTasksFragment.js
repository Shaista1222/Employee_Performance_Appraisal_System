import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import MyTasksAdapter from './Adapter/MyTasksAdapter';
import TaskService from './Services/TaskService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyTasksFragment = () => {
  const [taskWithEmployeesList, setTaskWithEmployeesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employeeUser, setEmployeeUser] = useState(null);

  useEffect(() => {
    const retrieveEmployeeData = async () => {
      try {
        const user = await AsyncStorage.getItem('employee');
        if (user) {
          const parsedUser = JSON.parse(user);
          setEmployeeUser(parsedUser);
        } else {
          Alert.alert('Error', 'Session or employee data not found');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
        console.error('Error retrieving data:', error);
      }
    };
    retrieveEmployeeData();
  }, []);

  useEffect(() => {
    if (employeeUser && employeeUser.employee) {
      fetchTasks(employeeUser.employee.id);
    }
  }, [employeeUser]);

  const fetchTasks = async (employeeID) => {
    try {
      const tasks = await TaskService.getEmployeeTasks(employeeID);
      if (tasks.length === 0) {
        Alert.alert('No tasks found');
      } else {
        setTaskWithEmployeesList(tasks);
        console.log(tasks);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskUpdate = async (task) => {
    try {
      await TaskService.putTask(task, (updatedTask) => {
        // Remove the task from the local state
        setTaskWithEmployeesList((prevTasks) =>
          prevTasks.filter((t) => t.task.id !== updatedTask.id)
        );
        Alert.alert('Success', 'Task updated successfully');
      }, (errorMessage) => {
        Alert.alert('Error', errorMessage);
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to update task');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Tasks</Text>
      </View>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={taskWithEmployeesList}
            keyExtractor={(item) => item.task.id?.toString() || Math.random().toString()}
            renderItem={({ item }) => <MyTasksAdapter task={item} onUpdateTask={handleTaskUpdate} />} // Pass the task and update handler
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingTop: 10,
    backgroundColor: '#6360DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
});

export default MyTasksFragment;
