import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EmployeeService from '../Services/EmployeeService';
const Report = ({navigation}) => {
  const [employeeDetailsScoreList, setEmployeeDetailsScoreList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    EmployeeService.getEmployeesWithKpiScores()
      .then(employeeDetails => setEmployeeDetailsScoreList(employeeDetails))
      .catch(error => console.error(error));
  };
  const handleItemClick = employeeDetailsScore => {
    // Pass employee data to PerformanceFragment
    // You need to implement replaceFragment function in your navigation logic
    // This example assumes you are using react-navigation
    navigation.navigate('Performance', {id: employeeDetailsScore.employee.id});
    Alert.alert('Successfully');
  };
  const handleSearch = query => {
    setSearchQuery(query);
    const filtered = employeeDetailsScoreList.filter(item =>
      item.employee.name.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredData(filtered);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Report</Text>
        <Ionicons name="arrow-forward-circle" size={25} color="white" />
      </View>
      <View
        style={{
          alignItems: 'center',
          paddingTop: 10,
          flexDirection: 'row',
          // marginRight: 19,
          backgroundColor: '#EEEEEE',
        }}>
        <TextInput
          placeholderTextColor="gray"
          placeholder="Search"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <Ionicons
          name="search-circle"
          size={40}
          color="#02367B"
          style={{paddingBottom: 10}}
        />
      </View>
      <View style={styles.listItemHeader}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Rank</Text>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Name</Text>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Average</Text>
      </View>

      <FlatList
        data={employeeDetailsScoreList}
        renderItem={({item, index}) => (
          <ScrollView style={styles.scrollView}>
            <TouchableOpacity
              style={styles.listItem}
              onPress={item => handleItemClick(item)}>
              <Text style={styles.rank}>#{index + 1}</Text>
              <Text style={styles.name}>{item.employee.name}</Text>
              <Text style={styles.average}>{item.totalScore}%</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
        keyExtractor={item => item.employee.id.toString()}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
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
  },
  scrollView: {
    backgroundColor: '#f3f3f3',
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
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  name: {
    fontSize: 16,
    color: Colors.dark,
  },
  average: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark,
  },
});
export default Report;
/* setEmployeeDetailsScoreList(employeeDetails);
console.log(employeeDetailsScoreList.name.toString()); */
