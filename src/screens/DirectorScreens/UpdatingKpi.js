import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Picker } from '@react-native-picker/picker';
import { getSubKPIs, getSubKPIsOfKpi } from '../Services/SubKpiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-paper';

const UpdatingKpi = ({ route, navigation }) => {
  const { kpiList, kpi } = route.params;
  console.log('KPI data: ', kpi);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'old', title: 'Old' },
    { key: 'new', title: 'New' },
  ]);

  const [kpiTitle, setKpiTitle] = useState(kpi?.name || '');
  const [kpiWeightage, setKpiWeightage] = useState(
    kpi.kpiWeightage?.weightage.toString() || '',
  );
  const [subKpiList, setSubKpiList] = useState([]);
  const [selectedSubKpis, setSelectedSubKpis] = useState([]);
  const [sessionId, setSessionId] = useState('');
  const [subKpiOfKpiList, setSubKpiOfKpiList] = useState([]);
  const [subKpiDelList, setSubKpiDelList] = useState([]);

  console.log(kpiTitle);
  useEffect(() => {
    const retrieveSessionData = async () => {
      try {
        const sessionData = await AsyncStorage.getItem('currentSession');
        if (sessionData) {
          const parsedSessionData = JSON.parse(sessionData);
          setSessionId(parsedSessionData.id);
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

    const fetchSubKpiOfKpi = async () => {
      if (sessionId && kpi) {
        try {
          const subKpi = await getSubKPIsOfKpi(kpi.id, sessionId);
          console.log('data' + JSON.stringify(subKpi));
          setSubKpiOfKpiList(subKpi);
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'Failed to fetch sub KPIs');
        }
      }
    };
    fetchSubKpiOfKpi();
    fetchSubKPIs();
  }, [kpi, sessionId]);

  const updateSelectedSubKpi = itemValue => {
    const subKpi = subKpiList.find(item => item.id === itemValue);
    if (subKpi && !selectedSubKpis.find(item => item.id === subKpi.id)) {
      setSelectedSubKpis([...selectedSubKpis, { ...subKpi, weightage: '' }]);
    }
  };

  const updateWeightage = (id, weightage) => {
    setSelectedSubKpis(prev =>
      prev.map(item => (item.id === id ? { ...item, weightage } : item)),
    );
  };

  const updateOldSubKpiWeightage = (id, weightage) => {
    setSubKpiOfKpiList(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, subKpiWeightage: { ...item.subKpiWeightage, weightage } }
          : item,
      ),
    );
  };

  const OldTab = () => (
    <FlatList
      style={styles.scene}
      data={subKpiOfKpiList}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.subKpiContainer}>
          <Text style={styles.label}>{item.name}</Text>
          <TextInput
            placeholder="Enter weightage"
            placeholderTextColor='black'
            value={item.subKpiWeightage?.weightage.toString()}
            onChangeText={text => updateOldSubKpiWeightage(item.id, text)}
            style={styles.listInput}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteOldSubKpi(item)}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );

  const NewTab = () => (
    <FlatList
      style={styles.scene}
      data={selectedSubKpis}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
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
  );

  const renderScene = SceneMap({
    old: OldTab,
    new: NewTab,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.labelText}
    />
  );

  const deleteSubKpi = id => {
    setSelectedSubKpis(prev => prev.filter(item => item.id !== id));
  };

  const deleteOldSubKpi = item => {
    setSubKpiOfKpiList(prev => prev.filter(kpiItem => kpiItem.id !== item.id));
    setSubKpiDelList(prev => [...prev, item]);
    console.log('deleted sub kp name', item.name);
  };

  const handleNext = () => {
    const combinedSubKpis = [...subKpiOfKpiList, ...selectedSubKpis];

    const updatedKpi = {
      id: kpi.id,
      name: kpiTitle,
      session_id: sessionId,
      kpiWeightage: {
        session_id: sessionId,
        weightage: kpiWeightage,
      },
      subKpiWeightages: combinedSubKpis.map(subKpi => subKpi.subKpiWeightage),
      deletedSubKpis: subKpiDelList,
    };

    const updatedKpiList = kpiList.filter(item => item.id !== kpi.id);
    updatedKpiList.push(updatedKpi);

    console.log('updated :'+JSON.stringify(updatedKpiList));

    navigation.navigate('AdjustmentKpi', {
      kpiList: updatedKpiList,
    });
  };

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>Update KPI</Text>
      </View>
      <FlatList
        style={styles.scene}
        data={[]}
        ListHeaderComponent={
          <>
            <TextInput
              placeholderTextColor="black"
              style={styles.input}
              placeholder="Enter KPI Title"
              onChangeText={setKpiTitle}
              value={kpiTitle}
            />
            <TextInput
              placeholderTextColor="black"
              style={styles.input}
              placeholder="Enter KPI Weightage"
              onChangeText={setKpiWeightage}
              value={kpiWeightage}
              keyboardType="numeric"
            />
            <View style={styles.showPerformance}>
              <Picker
                selectedValue={null}
                onValueChange={itemValue => updateSelectedSubKpi(itemValue)}
                style={styles.picker}
                dropdownIconColor="black"
                mode="dropdown">
                <Picker.Item label="--Select Sub KPI--" value="" />
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
            <TouchableOpacity style={styles.saveButton} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              renderTabBar={renderTabBar}
            />
          </>
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  tabBar: {
    backgroundColor: '#6360DC',
  },
  indicator: {
    backgroundColor: '#fff',
    height: 3,
  },
  labelText: {
    fontSize: 14,
    color: '#fff',
    textTransform: 'capitalize',
  },
  subKpiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
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
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  saveButton: {
    padding: 10,
    backgroundColor: '#6360dc',
    borderRadius: 5,
    marginBottom: 10,
  },
  deleteButton: {
    padding: 5,
    backgroundColor: 'red',
    borderRadius: 5,
  },
});

export default UpdatingKpi;
