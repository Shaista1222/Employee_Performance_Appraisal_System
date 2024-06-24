import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import KpiService from '../Services/KpiService';
import DepartmentService from '../Services/DepartmentService';
import {getSubKPIs} from '../Services/SubKpiServices';

const AddKpi = ({navigation}) => {
  const [departmentList, setDepartmentList] = useState([]);
  const [sessionId, setSessionId] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [kpiTitle, setKpiTitle] = useState('');
  const [kpiWeightage, setKpiWeightage] = useState('');
  const [existingWeightage, setExistingWeightage] = useState(0);
  const [existingKpis, setExistingKpis] = useState([]);
  const [subKpiList, setSubKpiList] = useState([]);
  const [selectedSubKpis, setSelectedSubKpis] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const departmentData = await DepartmentService.getDepartments();
        setDepartmentList(departmentData || []);
        if (departmentData && departmentData.length > 0) {
          setSelectedDepartment(departmentData[0].id);
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch departments');
      }
    };

    const retrieveSessionData = async () => {
      try {
        const sessionData = await AsyncStorage.getItem('currentSession');
        if (sessionData) {
          const parsedSessionData = JSON.parse(sessionData);
          setSessionId(parsedSessionData.id);
        } else {
          console.log('Data not found in AsyncStorage', {sessionData});
          Alert.alert('Error', 'Session not found');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
        console.error('Error retrieving data:', error);
      }
    };

    retrieveSessionData();
    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchExistingWeightage = async () => {
      if (sessionId && selectedDepartment) {
        try {
          const kpis = await KpiService.getSessionKPIs(sessionId);
          const departmentKpis = kpis.find(
            kpi => kpi.departmentId === selectedDepartment,
          );
          const totalWeightage = departmentKpis
            ? departmentKpis.kpiList.reduce(
                (total, kpi) => total + parseFloat(kpi.kpiWeightage.weightage),
                0,
              )
            : 0;
          setExistingWeightage(totalWeightage);
          setExistingKpis(departmentKpis ? departmentKpis.kpiList : []);
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'Failed to fetch existing KPIs');
        }
      }
    };
    fetchExistingWeightage();
  }, [sessionId, selectedDepartment]);

  const updateSelectedSubKpi = itemValue => {
    const subKpi = subKpiList.find(item => item.id === itemValue);
    if (subKpi && !selectedSubKpis.find(item => item.id === subKpi.id)) {
      setSelectedSubKpis([...selectedSubKpis, {...subKpi, weightage: ''}]);
    }
  };

  useEffect(() => {
    const fetchSubKPIs = async () => {
      if (sessionId) {
        try {
          const subKpi = await getSubKPIs(sessionId);
          setSubKpiList(subKpi);
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'Failed to fetch sub KPIs');
        }
      }
    };

    fetchSubKPIs();
  }, [sessionId]);

  const updateWeightage = (id, weightage) => {
    setSelectedSubKpis(prev =>
      prev.map(item => (item.id === id ? {...item, weightage} : item)),
    );
  };

  const deleteSubKpi = id => {
    setSelectedSubKpis(prev => prev.filter(item => item.id !== id));
  };

  const handleNext = () => {
    const totalSubWeightage = selectedSubKpis.reduce(
      (total, subKpi) => total + parseFloat(subKpi.weightage || 0),
      0,
    );
    const totalWeightage = parseFloat(kpiWeightage || 0) + totalSubWeightage;

    if (totalWeightage + existingWeightage > 100) {
      navigation.navigate('AdjustmentKpi', {
        kpiName: kpiTitle,
        kpiWeightage: parseFloat(kpiWeightage),
        existingKpis,
        totalWeightage,
        existingWeightage,
        selectedSubKpis,
      });
    } else {
      // Code to handle the case when the total weightage does not exceed 100%
      Alert.alert('Success', 'KPI added successfully');
    }
  };

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>Add KPI</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          placeholderTextColor="gray"
          style={styles.input}
          onChangeText={setKpiTitle}
          value={kpiTitle}
          placeholder="Enter KPI title"
        />
        <Text style={styles.label}>Select Department</Text>
        <View style={styles.showPerformance}>
          <Picker
            selectedValue={selectedDepartment}
            onValueChange={itemValue => setSelectedDepartment(itemValue)}
            style={styles.picker}
            dropdownIconColor="black"
            mode="dropdown">
            <Picker.Item label="--Select Department--" />
            {departmentList.length > 0 ? (
              departmentList.map((department, index) => (
                <Picker.Item
                  key={index}
                  label={department.name}
                  value={department.id}
                />
              ))
            ) : (
              <Picker.Item label="No department available" value="" />
            )}
          </Picker>
        </View>
        <Text style={styles.label}>Select Sub KPI</Text>
        <View style={styles.showPerformance}>
          <Picker
            selectedValue={null} // No initial selection
            onValueChange={itemValue => updateSelectedSubKpi(itemValue)}
            style={styles.picker}
            dropdownIconColor="black"
            mode="dropdown">
            <Picker.Item label="--Select Sub KPI--" />
            {subKpiList.length > 0 ? (
              subKpiList.map((subKpi, index) => (
                <Picker.Item
                  key={index}
                  label={subKpi.name}
                  value={subKpi.id}
                />
              ))
            ) : (
              <Picker.Item label="No sub KPI available" value="" />
            )}
          </Picker>
        </View>
        <TextInput
          placeholderTextColor="gray"
          style={styles.input}
          onChangeText={setKpiWeightage}
          value={kpiWeightage}
          placeholder="Enter KPI weightage"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <FlatList
          data={selectedSubKpis}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.subKpiContainer}>
              <Text style={styles.label}>{item.name}</Text>
              <TextInput
                placeholder="weightage"
                value={item.weightage}
                onChangeText={text => updateWeightage(item.id, text)}
                style={styles.listInput}
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteSubKpi(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
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
  input: {
    height: 25,
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
  listInput: {
    height: 20,
    width: '30%',
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
  label: {
    fontSize: 16,
    color: 'black',
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
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#6360dc',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  subKpiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginTop: 5,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: '#dc6360',
    borderRadius: 5,
  },
});

export default AddKpi;
