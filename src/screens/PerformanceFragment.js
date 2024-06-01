// screens/PerformanceScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Button } from 'react-native-paper';
import { BarChart, PieChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SessionService from './Services/SessionService';
import { Picker } from '@react-native-picker/picker';

const screenWidth = Dimensions.get('window').width;

const PerformanceFragment = () => {
  const [employeeID, setEmployeeID] = useState('');
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedFromSession, setSelectedFromSession] = useState(null);
  const [selectedToSession, setSelectedToSession] = useState(null);
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    fetchSessions();
    retrieveEmployeeData();
  }, []);

  const retrieveEmployeeData = async () => {
    try {
      const user = await AsyncStorage.getItem('employee');
      if (user) {
        const parsedUser = JSON.parse(user);
        setEmployeeID(parsedUser);
      } else {
        Alert.alert('Error', 'Session or employee data not found');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error('Error retrieving data:', error);
    }
  };

  const fetchSessions = async () => {
    try {
      const data = await SessionService.getSessions();
      setSessions(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const fetchPieData = async (sessionId) => {
    // Fetch pie chart data based on sessionId and update the state
  };

  const fetchBarData = async (fromSessionId, toSessionId) => {
    // Fetch bar chart data based on fromSessionId and toSessionId and update the state
  };

  const handleSessionChange = (sessionId) => {
    setSelectedSession(sessionId);
    fetchPieData(sessionId);
  };

  const handleFromSessionChange = (sessionId) => {
    setSelectedFromSession(sessionId);
    fetchBarData(sessionId, selectedToSession);
  };

  const handleToSessionChange = (sessionId) => {
    setSelectedToSession(sessionId);
    fetchBarData(selectedFromSession, sessionId);
  };

  const renderPickerItems = () => {
    return sessions.map(session => (
      <Picker.Item key={session.id} label={session.title} value={session.id} />
    ));
  };

  const renderPieChart = () => (
    <PieChart
      data={pieData}
      width={screenWidth}
      height={220}
      chartConfig={chartConfig}
      accessor={"score"}
      backgroundColor={"transparent"}
      paddingLeft={"15"}
      absolute
    />
  );

  const renderBarChart = () => (
    <BarChart
      data={barData}
      width={screenWidth}
      height={220}
      chartConfig={chartConfig}
      verticalLabelRotation={30}
    />
  );

  const renderScene = SceneMap({
    pie: renderPieChart,
    bar: renderBarChart,
  });

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'pie', title: 'Pie Chart' },
    { key: 'bar', title: 'Bar Chart' },
  ]);

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, 
    barPercentage: 0.5,
    useShadowColorFromDataset: false, 
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedSession}
        onValueChange={(itemValue) => handleSessionChange(itemValue)}
      >
        {renderPickerItems()}
      </Picker>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: screenWidth }}
        renderTabBar={props => <TabBar {...props} />}
      />
      <Button mode="contained" onPress={() => fetchPieData(selectedSession)}>Show</Button>
      <Button mode="contained" onPress={() => fetchBarData(selectedFromSession, selectedToSession)}>Compare</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default PerformanceFragment;
