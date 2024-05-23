// components/MyTasksFragment.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import MyTasksAdapter from './Adapter/MyTasksAdapter';
import TaskService from './Services/TaskService';

const MyTasksFragment = () => {
  const [taskWithEmployeesList, setTaskWithEmployeesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async employeeID => {
      try {
        const tasks = await TaskService.getEmployeeTasks(employeeID);
        if (tasks.length === 0) {
          Alert.alert('No tasks found');
        } else {
          setTaskWithEmployeesList(tasks);
          console.log(tasks)
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks(7);
  }, []);

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
            keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
            renderItem={({ item }) => <MyTasksAdapter tasks={[item]} />}
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
