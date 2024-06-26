import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const EmployeeDetails = ({employeeDetailsList, parentActivity}) => {
  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.textName}>{item.name}</Text>
      <TouchableOpacity
        style={styles.btnDelete}
        onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteIcon}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const handleDelete = id => {
    // Implement delete functionality
  };

  return (
    <FlatList
      data={employeeDetailsList}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'black',
  },
  textName: {
    fontSize: 18,
    flex: 1,
  },
  btnDelete: {
    padding: 5,
  },
  deleteIcon: {
    width: 20,
    height: 20,
  },
});

export default EmployeeDetails;
