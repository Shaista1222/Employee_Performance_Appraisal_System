import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-paper';

const AdjustmentKpi = ({ route, navigation }) => {
  const {
    kpiName,
    kpiWeightage,
    existingKpis = [],
    totalWeightage,
    existingWeightage,
    selectedSubKpis = [],
  } = route.params;
  const [adjustedWeightages, setAdjustedWeightages] = useState({});
  const [newKpiWeightage, setNewKpiWeightage] = useState(
    kpiWeightage.toString(),
  );
  const [totalWeightageExceeds, setTotalWeightageExceeds] = useState(false);

  useEffect(() => {
    const initialWeightages = {};
    existingKpis.forEach((kpi) => {
      initialWeightages[kpi.id] = kpi.kpiWeightage.weightage.toString();
    });
    setAdjustedWeightages(initialWeightages);
  }, [existingKpis]);

  useEffect(() => {
    const adjustedTotalWeightage = Object.values(adjustedWeightages).reduce(
      (total, weightage) => total + parseFloat(weightage || 0),
      existingWeightage - parseFloat(newKpiWeightage),
    );

    setTotalWeightageExceeds(adjustedTotalWeightage + parseFloat(newKpiWeightage) > 100);
  }, [adjustedWeightages, newKpiWeightage, existingWeightage]);

  const handleWeightageChange = (kpiId, value) => {
    setAdjustedWeightages({
      ...adjustedWeightages,
      [kpiId]: value,
    });
  };

  const handleSaveAdjustedKpi = () => {
    const adjustedTotalWeightage = Object.values(adjustedWeightages).reduce(
      (total, weightage) => total + parseFloat(weightage || 0),
      existingWeightage - parseFloat(newKpiWeightage),
    );

    if (adjustedTotalWeightage + parseFloat(newKpiWeightage) > 100) {
      Alert.alert(
        'Error',
        'Total weightage exceeds 100%. Please adjust the values.',
      );
    } else {
      console.log(
        'Adjusted KPI data:',
        adjustedWeightages,
        'New KPI weightage:',
        newKpiWeightage,
      );
      Alert.alert('Adjusted KPI saved successfully');
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
          <Text style={styles.label}>New KPI : {kpiName}</Text>
          <TextInput
            style={styles.input}
            value={newKpiWeightage}
            onChangeText={setNewKpiWeightage}
            keyboardType="numeric"
          />
          {existingKpis.map((kpi, index) => (
            <View key={index} style={styles.kpiContainer}>
              <Text style={styles.label}>{kpi.name}</Text>
              <TextInput
                style={styles.input}
                value={
                  adjustedWeightages[kpi.id] !== undefined
                    ? adjustedWeightages[kpi.id]
                    : ''
                }
                onChangeText={(value) => handleWeightageChange(kpi.id, value)}
                keyboardType="numeric"
              />
            </View>
          ))}
          <TouchableOpacity
            style={[styles.button, totalWeightageExceeds ? styles.buttonError : styles.buttonSuccess]}
            onPress={handleSaveAdjustedKpi}>
            <Text style={styles.buttonText}>Save</Text>
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
