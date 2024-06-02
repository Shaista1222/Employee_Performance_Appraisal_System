import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EmployeeService from '../Services/EmployeeService';
import EmployeeDetailsScoreAdapter from '../Adapter/EmployeeDetailsScoreAdapter';

const Report = ({ navigation }) => {
  const [employeeDetailsScoreList, setEmployeeDetailsScoreList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEmployeeDetailsScoreList, setFilteredEmployeeDetailsScoreList] = useState([]);

  useEffect(() => {
    const fetchData = async (sessionID) => {
      console.log('working');
      try {
        const data = await EmployeeService.getEmployeesWithKpiScores(sessionID);
        console.log(data);
        setEmployeeDetailsScoreList(data);
        setFilteredEmployeeDetailsScoreList(data);
      } catch (error) {
        Alert.alert(error.message);
      }
    };

    fetchData(10);
  }, []);

  const handleListItemClick = (employee) => {
    navigation.navigate('Performance', { employee });
  };

  const handleSearch = query => {
    setSearchQuery(query);
    const filteredList = employeeDetailsScoreList.filter(employee =>
      employee.employee.name.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredEmployeeDetailsScoreList(filteredList);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Report</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="black"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <Ionicons
          name="search-circle"
          size={40}
          color="#02367B"
          style={{ paddingBottom: 10 }}
        />
      </View>
      <View style={styles.listItemHeader}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Rank</Text>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Name</Text>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Average</Text>
      </View>
      <FlatList
        data={filteredEmployeeDetailsScoreList}
        renderItem={({ item, index }) => (
          <EmployeeDetailsScoreAdapter
            employeeDetailsScore={item}
            index={index}
            onPress={handleListItemClick}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pastel',
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
  },
  searchContainer: {
    alignItems: 'center',
    paddingTop: 10,
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
  },
  searchInput: {
    height: 40,
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    marginLeft: 24,
    borderColor: 'purple',
    color: 'black',
    fontSize: 19,
  },
  listItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#02367B',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Report;
