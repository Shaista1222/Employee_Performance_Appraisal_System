// src/EmployeeList.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import EmployeeService from './Services/EmployeeService';
import EmployeeDetailsListItem from './EmployeeDetailsListItem';

const EmployeeList = ({ navigation }) => {
  const [employeeDetailsList, setEmployeeDetailsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employees = await EmployeeService.getEmployeesWithDetails();
        setEmployeeDetailsList(employees);
        console.log(employees)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const filteredEmployees = employeeDetailsList.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredEmployees}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('EmployeeDetails', { employee: item })}>
            <EmployeeDetailsListItem employee={item} />
          </TouchableOpacity>
        )}
      />
      <Button
        title="Add Employee"
        onPress={() => navigation.navigate('AddEmployee')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default EmployeeList;
