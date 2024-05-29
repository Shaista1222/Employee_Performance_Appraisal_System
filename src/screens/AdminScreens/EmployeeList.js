// src/components/EmployeeList.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import EmployeeService from '../Services/EmployeeService';
import AddEmployee from './AddEmployee';
import AntDesign from 'react-native-vector-icons/AntDesign';

const EmployeeList = ({ navigation }) => {
  const [employeeDetailsList, setEmployeeDetailsList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchEmployeeDetails();
  }, []);

  const fetchEmployeeDetails = async () => {
    try {
      const employeeDetails = await EmployeeService.getEmployeesWithDetails();
      setEmployeeDetailsList(employeeDetails);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleAddEmployee = () => {
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await EmployeeService.deleteEmployee(id);
      Alert.alert('Success', 'Employee deleted successfully');
      setEmployeeDetailsList((prevList) => 
        prevList.filter((employeeDetails) => employeeDetails.employee.id !== id)
      );
    } catch (error) {
      Alert.alert('Error', `Failed to delete employee: ${error.message}`);
    }
  };

  const handleItemPress = (employeeDetails) => {
    navigation.navigate('EmployeeDetailsListItem', { employeeDetails });
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Employee</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={employeeDetailsList}
          keyExtractor={(item) => item.employee.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <TouchableOpacity onPress={() => handleItemPress(item)}>
                <Text style={styles.textName}>{item.employee.name}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnDelete}
                onPress={() => handleDelete(item.employee.id)}
              >
                <AntDesign name="delete" size={18} color="white" />
              </TouchableOpacity>
            </View>
          )}
        />
        <TouchableOpacity style={styles.fab} onPress={handleAddEmployee}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
        <AddEmployee
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'gray',
    justifyContent: 'space-between',
  },
  textName: {
    fontSize: 18,
    flex: 1,
    color: 'white',
  },
  btnDelete: {
    padding: 5,
  },
  deleteIcon: {
    width: 20,
    height: 20,
  },
  item: {
    padding: 16,
    backgroundColor: '#BEBEBE',
    marginBottom: 8,
    borderRadius: 4,
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
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    backgroundColor: '#6360DC',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  fabText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
});

export default EmployeeList;
