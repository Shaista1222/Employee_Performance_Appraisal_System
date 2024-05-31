import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EvaluatorService from './Services/EvaluatorService';
import {getTeacherJuniors} from './Services/JuniorEmployeeService';

const EvaluateeList = ({ evaluatees, onPress }) => (
  <FlatList
    data={evaluatees}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => onPress(item.id)}>
        <View style={styles.itemContainer}>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )}
    keyExtractor={item => item.id.toString()}
  />
);

const EvaluateeListFragment = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'peer', title: 'Peer' },
    { key: 'junior', title: 'Junior' },
  ]);

  const [evaluateeList, setEvaluateeList] = useState([]);
  const [juniorList, setJuniorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [employeeUser, setEmployeeUser] = useState(null);
  const [currentSessionData, setCurrentSessionData] = useState(null);

  useEffect(() => {
    const retrieveEmployeeData = async () => {
      try {
        const sessionData = await AsyncStorage.getItem('currentSession');
        const user = await AsyncStorage.getItem('employee');
        if (sessionData && user) {
          const parsedSessionData = JSON.parse(sessionData);
          const parsedUser = JSON.parse(user);
          setCurrentSessionData(parsedSessionData);
          setEmployeeUser(parsedUser);
        } else {
          Alert.alert('Error', 'Session or employee data not found');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };
    retrieveEmployeeData();
  }, []);

  useEffect(() => {
    if (employeeUser && employeeUser.employee && currentSessionData) {
      fetchEvaluatees(employeeUser.employee.id, currentSessionData.id);
      fetchJuniors(employeeUser.employee.id, currentSessionData.id);
    }
  }, [employeeUser, currentSessionData]);

  const fetchEvaluatees = async (evaluatorID, sessionID) => {
    try {
      const data = await EvaluatorService.getEvaluatees(evaluatorID, sessionID);
      setEvaluateeList(data);
      setLoading(false);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const fetchJuniors = async (evaluatorID, sessionID) => {
    try {
      const data = await getTeacherJuniors(evaluatorID, sessionID);
      setJuniorList(data);
      setLoading(false);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handleItemPress = (evaluateeID, type) => {
    navigation.navigate('EvaluationQuestionnaire', {
      evaluateeID,
      questionByType: type,
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: 'black' }}>Loading...</Text>
      </View>
    );
  }

  const renderScene = SceneMap({
    peer: () => (
      <View style={styles.scene}>
        <EvaluateeList evaluatees={evaluateeList} onPress={(id) => handleItemPress(id, 'peer')} />
      </View>
    ),
    junior: () => (
      <View style={styles.scene}>
        <EvaluateeList evaluatees={juniorList} onPress={(id) => handleItemPress(id, 'junior')} />
      </View>
    ),
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.label}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: '#6360DC',
  },
  indicator: {
    backgroundColor: '#fff',
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default EvaluateeListFragment;
