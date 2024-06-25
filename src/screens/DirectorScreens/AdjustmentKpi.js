import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import KpiService from '../Services/KpiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdjustmentKpi = ({ route, navigation }) => {
  const { kpiData, kpiList } = route.params;
  const [adjustedWeightages, setAdjustedWeightages] = useState({});
  const [session_id, setSession_id] = useState();

  const [newKpiWeightage, setNewKpiWeightage] = useState(
    kpiData?.weightage?.weightage?.toString() || ''
  );
  const [totalWeightageExceeds, setTotalWeightageExceeds] = useState(false);
  useEffect(() => {
       const retrieveSessionData = async () => {
      try {
        const sessionData = await AsyncStorage.getItem('currentSession');
        if (sessionData) {
          const parsedSessionData = JSON.parse(sessionData);
          setSession_id(parsedSessionData.id);
        } else {
          console.log('Data not found in AsyncStorage', { sessionData });
          Alert.alert('Error', 'Session not found');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
        console.error('Error retrieving data:', error);
      }
    };

    retrieveSessionData();
  }, []);

  useEffect(() => {
    if (kpiList) {
      const initialWeightages = {};
      kpiList.forEach(kpi => {
        initialWeightages[kpi.id] = kpi.kpiWeightage.weightage.toString();
      });
      setAdjustedWeightages(initialWeightages);
    }
  }, [kpiList]);

  useEffect(() => {
    const adjustedTotalWeightage = Object.values(adjustedWeightages).reduce(
      (total, weightage) => total + parseInt(weightage || 0),
      parseInt(newKpiWeightage)
    );

    setTotalWeightageExceeds(adjustedTotalWeightage > 100);
  }, [adjustedWeightages, newKpiWeightage]);

  const handleWeightageChange = (kpiId, value) => {
    setAdjustedWeightages({
      ...adjustedWeightages,
      [kpiId]: value,
    });
  };

  const handleSaveOrUpdateKpi = async () => {
    const adjustedTotalWeightage = Object.values(adjustedWeightages).reduce(
      (total, weightage) => total + parseInt(weightage || 0),
      parseInt(newKpiWeightage)
    );

    if (adjustedTotalWeightage > 100) {
      Alert.alert(
        'Error',
        'Total weightage exceeds 100%. Please adjust the values.'
      );
    } else {
      try {
        if (kpiList.length != null)  {
          // Update existing KPIs
          const updatedKpiList = kpiList.map(kpi => ({
            ...kpi,
            session_id,
            kpiWeightage: {
              ...kpi.kpiWeightage,
              weightage: parseInt(adjustedWeightages[kpi.id]),
            },
          }));

          console.log(JSON.stringify(updatedKpiList));
          await KpiService.putKpi(updatedKpiList);
          Alert.alert('Success', 'KPI updated successfully!');
        } 
        if (kpiData != null) {
          // Add a new KPI
          console.log(JSON.stringify(kpiData));
          const newKpi = await KpiService.postKpi({
            ...kpiData,
            kpiWeightage: {
              weightage: parseInt(newKpiWeightage),
            }
          });
          console.log('New KPI added:', newKpi);
          Alert.alert('Success', 'New KPI added successfully!');
        }
      } catch (error) {
        console.error('Failed to adjust KPIs:', error);
        Alert.alert('Error', `Failed to adjust KPIs: ${error.message}`);
      }

      navigation.goBack();
    }
  };

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>KPI Adjustment</Text>
      </View>
      <View style={styles.container}>
        <ScrollView>
          {totalWeightageExceeds && (
            <Text style={styles.errorText}>
              Total weightage exceeds 100%. Please adjust the values.
            </Text>
          )}
          {kpiData?.kpi?.name && (
            <>
              <Text style={styles.label}>KPI: {kpiData.kpi.name}</Text>
              <TextInput
                style={styles.input}
                value={newKpiWeightage}
                onChangeText={setNewKpiWeightage}
                keyboardType="numeric"
              />
            </>
          )}
          {kpiList?.map((kpi, index) => (
            <View key={index} style={styles.kpiContainer}>
              <Text style={styles.label}>{kpi.name}</Text>
              {adjustedWeightages[kpi.id] !== undefined && (
                <TextInput
                  style={styles.input}
                  value={adjustedWeightages[kpi.id]}
                  onChangeText={value => handleWeightageChange(kpi.id, value)}
                  keyboardType="numeric"
                />
              )}
            </View>
          ))}
          <TouchableOpacity
            style={[
              styles.button,
              totalWeightageExceeds ? styles.buttonError : styles.buttonSuccess,
            ]}
            onPress={handleSaveOrUpdateKpi}
          >
            <Text style={styles.buttonText}>
              {kpiData ? 'Update' : 'Save'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#f5f5f5',
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
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonSuccess: {
    backgroundColor: '#6360dc',
  },
  buttonError: {
    backgroundColor: '#dc6360',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: '#dc6360',
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: 'black',
  },
  kpiContainer: {
    marginBottom: 6,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 4,
    color: 'black',
  },
});

export default AdjustmentKpi;
