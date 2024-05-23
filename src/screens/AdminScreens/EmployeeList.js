import React, {useEffect, useState} from 'react';
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

const EmployeeList = ({navigation}) => {
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

  const handleItemPress = employeeDetails => {
    navigation.navigate('EmployeeDetails', {employeeDetails});
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Employee</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={employeeDetailsList}
          keyExtractor={item => item.employee.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleItemPress(item)}>
              <Text style={styles.title}>{item.employee.name}</Text>
            </TouchableOpacity>
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
  item: {
    padding: 16,
    backgroundColor: '#f9c2ff',
    marginBottom: 8,
    borderRadius: 4,
  },
  title: {
    fontSize: 18,
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
