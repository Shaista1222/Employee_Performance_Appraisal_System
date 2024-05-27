// src/components/EmployeeDetailsListItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmployeeDetailsListItem = ({ employee }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{employee.name}</Text>
      <Text>{employee.position}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontWeight: 'bold',
  },
});

export default EmployeeDetailsListItem;
