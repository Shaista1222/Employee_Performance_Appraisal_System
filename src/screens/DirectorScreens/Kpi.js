import React, {useState, useEffect} from 'react';
import {View, Text, Button, Spinner} from 'react-native';
// import AddKpi from './AddKpi';
import { PieChart } from 'react-native-chart-kit';
import SessionService from '../Services/SessionService';

const Kpi = () => {
  const [sessionList, setSessionList] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sessions = await SessionService.getSessions();
        setSessionList(sessions);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSessions();
  }, []);

  const handleSessionSelection = sessionId => {
    setSelectedSessionId(sessionId);
    // Perform actions with the selected session ID
    console.log('Selected session ID:', sessionId);
  };

  const handleAddKpi = () => {
    // Navigate to AddKpiFragment
    // You need to implement your navigation logic here
    console.log('Navigate to Add KPI');
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View>
      <Text>KPI Fragment</Text>
      <Button title="Add KPI" onPress={handleAddKpi} />

      {/* Render your session spinner here */}
      {/* Replace this with your session spinner */}
      <Button
        title="Select Session"
        onPress={() => handleSessionSelection(1)}
      />

      {/* Render your pie chart here */}
      {/* Example of using react-native-chart-kit PieChart */}
      <PieChart
        data={[
          {name: 'Administrative', population: 20, color: '#ff0000'},
          {name: 'Academic', population: 25, color: '#00ff00'},
          {name: 'Punctuality', population: 25, color: '#0000ff'},
          {name: 'Project', population: 30, color: '#ffff00'},
        ]}
        width={300}
        height={200}
        chartConfig={{
          backgroundGradientFrom: '#1E2923',
          backgroundGradientTo: '#08130D',
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />
    </View>
  );
};

export default Kpi;
