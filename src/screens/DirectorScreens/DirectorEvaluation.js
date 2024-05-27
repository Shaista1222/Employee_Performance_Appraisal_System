// src/EmployeeList.js
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, FlatList, StyleSheet,TouchableOpacity} from 'react-native';
import EmployeeService from '../Services/EmployeeService';

const EmployeeList = ({navigation}) => {
  const [employeeDetailsList, setEmployeeDetailsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const questionByType='director'
  useEffect(() => {
    const fetchData = async () => {
      try {
        const employees = await EmployeeService.getEmployees();
        setEmployeeDetailsList(employees);
        setFilteredEmployees(employees);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = query => {
    setSearchQuery(query);
    if (query) {
      const filtered = employeeDetailsList.filter(employee =>
        employee.name.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employeeDetailsList);
    }
  };
  const handleItemPress = evaluateeID => {
    navigation.navigate('EvaluationQuestionnaire', {evaluateeID,questionByType});
  };


  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Evaluation</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholderTextColor='black'
          placeholder="Search employees"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <FlatList
          data={filteredEmployees}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            
            <TouchableOpacity onPress={() => handleItemPress(item.id)}>
              <View style={styles.itemContainer}>
                <Text style={styles.name}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    paddingTop: 10,
    backgroundColor: '#6360DC',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    color: 'black',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontWeight: 'bold',
    color:'black'
  },
});

export default EmployeeList;
