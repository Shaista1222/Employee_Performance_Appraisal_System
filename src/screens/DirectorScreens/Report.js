import React from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Report = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Report</Text>
        <Ionicons name="arrow-forward-circle" size={25} color='white' />
      </View>
      <View
        style={{
          alignItems: 'center',
          paddingTop: 10,
          flexDirection: 'row',
          // marginRight: 19,
          backgroundColor:"#EEEEEE"
        }}>
        <TextInput placeholderTextColor='gray' placeholder="Search" style={styles.searchInput} />
        <Ionicons name="search-circle" size={40} color='#02367B' style={{paddingBottom:10}}/>
      </View>
      <View style={styles.listItemHeader}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Rank</Text>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Name</Text>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Average</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {/* List of rankings */}
        <View style={styles.listItem}>
          <Text style={styles.rank}>#1</Text>
          <Text style={styles.name}>Sadaf Gul</Text>
          <Text style={styles.average}>86%</Text>
        </View>
        {/* ... Repeat for each item ... */}
      </ScrollView>
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
