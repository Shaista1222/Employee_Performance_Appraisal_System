import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';

const MyTasksAdapter = ({ task, onUpdateTask }) => {
  const renderItem = ({ item }) => {
    const taskDetails = item.task;
    return (
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={styles.title}>{taskDetails.task_description}</ListItem.Title>
          <ListItem.Subtitle style={styles.subtitle}>
            Due: {new Date(taskDetails.due_date).toLocaleDateString()}
          </ListItem.Subtitle>
          <ListItem.Subtitle style={styles.subtitle}>
            By: {taskDetails.assigned_by_id}
          </ListItem.Subtitle>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                const updatedTask = { ...taskDetails, status: 1 }; 
                onUpdateTask(updatedTask);
              }}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <FlatList
      data={[task]} 
      renderItem={renderItem}
      keyExtractor={item =>
        item.task.id?.toString() || Math.random().toString()
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 10, 
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#D3D3D3',
    width: 100, 
    height: 40, 
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5, 
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
  },
});

export default MyTasksAdapter;
