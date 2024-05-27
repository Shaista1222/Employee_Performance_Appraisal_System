import React from 'react';
import {FlatList, View, Text, Button, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';

const MyTasksAdapter = ({task, onUpdateTask}) => {
  const renderItem = ({item}) => {
    const taskDetails = item.task;
    return (
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{taskDetails.task_description}</ListItem.Title>
          <ListItem.Subtitle>
            Due: {new Date(taskDetails.due_date).toLocaleDateString()}
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            By: {taskDetails.assigned_by_id}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Button
          title="Done"
          
          style={styles.button}
          onPress={() => {
            const updatedTask = {...taskDetails, status: 1}; // Assuming status 1 means 'Done'
            onUpdateTask(updatedTask);
          }}
        />
      </ListItem>
    );
  };

  return (
    <FlatList
      data={[task]} // Wrap the single task in an array
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
  button: {
    backgroundColor: '#6360DC',
    width: 150,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
