import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

const MyTasksAdapter = ({ tasks }) => {
  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.task_description}</ListItem.Title>
        <ListItem.Subtitle>Due: {new Date(item.due_date).toLocaleDateString()}</ListItem.Subtitle>
        <ListItem.Subtitle>By: {item.assigned_by_id}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
