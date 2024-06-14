import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { PieChart } from 'react-native-chart-kit';
import SessionService from '../Services/SessionService';
import KpiService from '../Services/KpiService';

const Kpi = ({ navigation }) => {
  const [sessionList, setSessionList] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [kpis, setKpis] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sessions = await SessionService.getSessions();
        setSessionList(sessions);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchSessions();
  }, []);

  useEffect(() => {
    if (selectedSessionId !== null) {
      fetchKPIs(selectedSessionId);
    }
  }, [selectedSessionId]);

  const fetchKPIs = async (sessionId) => {
    setIsLoading(true);
    setError(null);
    try {
      const kpiData = await KpiService.getSessionKPIs(sessionId);
      if (!kpiData) {
        throw new Error('No KPI data received');
      }
      console.log('KPI Data:', kpiData); // Log the fetched data
      const parsedKpis = parseKpiData(kpiData);
      console.log('Parsed KPIs:', parsedKpis); // Log the parsed KPIs
      setKpis(parsedKpis);
      setIsLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message || 'Unknown error occurred');
      setIsLoading(false);
    }
  };

  const parseKpiData = (kpiData) => {
    const kpis = [];
    kpiData.forEach((group) => {
      const groupKpi = group.groupKpi;
      const kpiList = group.kpiList.map((kpi) => ({
        name: kpi.name,
        weightage: kpi.kpiWeightage.weightage,
        color: getRandomColor(), // Generate color for each KPI
      }));
      const totalWeightage = kpiList.reduce((sum, kpi) => sum + kpi.weightage, 0);
      if (totalWeightage < 100) {
        kpiList.push({
          name: 'Remaining',
          weightage: 100 - totalWeightage,
          color: '#FFFFFF',
        });
      }
      kpis.push({ groupKpi, kpiList });
    });
    return kpis;
  };

  const handleSessionSelection = (sessionId) => {
    setSelectedSessionId(sessionId);
    console.log('Selected session ID:', sessionId);
  };

  const handleAddKpi = () => {
    navigation.navigate('AddKpi')
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KPI Fragment</Text>
      <Button title="Add KPI" onPress={handleAddKpi} />
      <Picker
        selectedValue={selectedSessionId}
        dropdownIconColor='black'
        style={styles.picker}
        onValueChange={(itemValue) => handleSessionSelection(itemValue)}
      >
        {sessionList.map((session) => (
          <Picker.Item key={session.id} label={session.title} value={session.id} />
        ))}
      </Picker>
      <ScrollView>
        {kpis.map((group, index) => {
          console.log(`Group ${index} KPI Count:`, group.kpiList.length); 
          return (
            <View key={index}>
              <Text style={styles.groupTitle}>Group: {group.groupKpi ? group.groupKpi.name : 'Ungrouped'}</Text>
              {group.kpiList.length > 0 && (
                <ScrollView horizontal>
                  <View>
                    <PieChart
                      data={group.kpiList.map((kpi) => ({
                        name: kpi.name,
                        population: kpi.weightage,
                        color: kpi.color,
                        legendFontColor: '#7F7F7F',
                        legendFontSize: 15,
                      }))}
                      width={600} // Increased width for horizontal scroll
                      height={400} // Increased height for vertical scroll
                      chartConfig={{
                        backgroundGradientFrom: '#1E2923',
                        backgroundGradientTo: '#08130D',
                        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                      }}
                      accessor="population"
                      backgroundColor="transparent"
                      paddingLeft="15"
                      hasLegend={false} // Disable default legend
                    />
                    <View style={styles.legendContainer}>
                      {group.kpiList.map((kpi, kpiIndex) => (
                        <View key={kpiIndex} style={styles.legendItem}>
                          <View style={[styles.legendColorBox, { backgroundColor: kpi.color }]} />
                          <Text style={styles.legendText}>{kpi.name} ({kpi.weightage}%)</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </ScrollView>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: 'black',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
    color: 'black',
  },
  groupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
    paddingRight: 500,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
  },
  legendColorBox: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#7F7F7F',
  },
});

export default Kpi;
