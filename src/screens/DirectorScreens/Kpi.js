import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { PieChart } from 'react-native-chart-kit';
import SessionService from '../Services/SessionService';
import KpiService from '../Services/KpiService';
import DepartmentService from '../Services/DepartmentService';

const Kpi = ({ navigation }) => {
  const [sessionList, setSessionList] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [departmentList, setDepartmentList] = useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
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
    const fetchDepartments = async () => {
      try {
        const departments = await DepartmentService.getDepartments();
        setDepartmentList(departments);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchDepartments();
    fetchSessions();
  }, []);

  useEffect(() => {
    if (selectedSessionId !== null && selectedDepartmentId !== null) {
      fetchKPIs(selectedSessionId, selectedDepartmentId);
    }
  }, [selectedSessionId, selectedDepartmentId]);

  const fetchKPIs = async (sessionId, departmentId) => {
    setIsLoading(true);
    setError(null);
    try {
      const kpiData = await KpiService.getSessionKPIs(sessionId);
      if (!kpiData) {
        throw new Error('No KPI data received');
      }
      const filteredKpis = kpiData.filter(
        kpiGroup => kpiGroup.departmentId === departmentId,
      );
      const parsedKpis = parseKpiData(filteredKpis);
      setKpis(parsedKpis);
      setIsLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message || 'Unknown error occurred');
      setIsLoading(false);
    }
  };

  const parseKpiData = kpiData => {
    const kpis = [];
    kpiData.forEach(group => {
      const groupKpi = group.groupKpi;
      const kpiList = group.kpiList.map(kpi => ({
        ...kpi,
        color: getRandomColor(),
      }));
      const totalWeightage = kpiList.reduce(
        (sum, kpi) => sum + kpi.kpiWeightage.weightage,
        0,
      );
      // if (totalWeightage < 100) {
      //   kpiList.push({
      //     id: null,
      //     name: 'Remaining',
      //     kpiWeightage: { weightage: 100 - totalWeightage },
      //     color: '#FFFFFF',
      //   });
      // }
      kpis.push({ groupKpi, kpiList });
    });
    return kpis;
  };
  

  const handleSessionSelection = sessionId => {
    setSelectedSessionId(sessionId);
  };

  const handleDepartmentSelection = departmentId => {
    setSelectedDepartmentId(departmentId);
  };

  const handleAddKpi = () => {
    navigation.navigate('AddKpi');
  };

  const handleKpiClick = (kpiList, kpi) => {
    navigation.navigate('UpdatingKpi', { kpiList, kpi });
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
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>KPI</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleAddKpi}>
          <Text style={styles.buttonText}>Add KPI</Text>
        </TouchableOpacity>
        <View style={styles.showPerformance}>
          <Picker
            selectedValue={selectedSessionId}
            dropdownIconColor="black"
            style={styles.picker}
            onValueChange={handleSessionSelection}>
            <Picker.Item label="--Select Session--" value={null} />
            {sessionList.map(session => (
              <Picker.Item
                key={session.id}
                label={session.title}
                value={session.id}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.showPerformance}>
          <Picker
            selectedValue={selectedDepartmentId}
            dropdownIconColor="black"
            style={styles.picker}
            onValueChange={handleDepartmentSelection}>
            <Picker.Item label="--Select Department--" value={null} />
            {departmentList.map(department => (
              <Picker.Item
                key={department.id}
                label={department.name}
                value={department.id}
              />
            ))}
          </Picker>
        </View>

        <ScrollView>
  {kpis.map((group, index) => (
    <View key={index}>
      <Text style={styles.groupTitle}>
        Group: {group.groupKpi ? group.groupKpi.name : 'Ungrouped'}
      </Text>
      {group.kpiList.length > 0 && (
        <ScrollView horizontal>
          <View>
            <PieChart
              data={group.kpiList.map(kpi => ({
                name: kpi.name,
                population: kpi.kpiWeightage.weightage,
                color: kpi.color,
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              }))}
              width={600}
              height={400}
              chartConfig={{
                backgroundGradientFrom: '#1E2923',
                backgroundGradientTo: '#08130D',
                color: (opacity = 1) =>
                  `rgba(26, 255, 146, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              hasLegend={false}
              onDataPointClick={({ index }) =>
                handleKpiClick(group.kpiList[index])
              }
            />
            <View style={styles.legendContainer}>
              {group.kpiList.map((kpi, kpiIndex) => (
                <TouchableOpacity 
                  key={kpiIndex} 
                  style={styles.legendItem} 
                  onPress={() => handleKpiClick(group.kpiList, kpi)}>
                  <View
                    style={[
                      styles.legendColorBox,
                      { backgroundColor: kpi.color },
                    ]}
                  />
                  <Text style={styles.legendText}>
                    {kpi.name} ({kpi.kpiWeightage.weightage}%)
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  ))}
</ScrollView>

      </View>
    </>
  );
};

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
    paddingTop: 10,
    backgroundColor: '#6360DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  picker: {
    color: 'black',
    width: '100%',
  },
  showPerformance: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#6360DC',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
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
    margin: 8,
  },
  legendColorBox: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  legendText: {
    fontSize: 16,
    color: 'black',
  },
});

export default Kpi;
