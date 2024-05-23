import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';

const Evaluation = ({navigation}) => {
  const [selectedSession, setSelectedSession] = useState('spring-2024');

  const setPeerEvaluation = () => {
    navigation.navigate('PeerEvaluation');
  };
  const setConfidentialEvaluation = () => {
    navigation.navigate('ConfidentialEvaluation');
  };

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>Evaluation</Text>
      </View>
      <View style={styles.container}>
        {/* <View style={styles.dropdownContainer}> */}
        <View style={styles.showPerformance}>
          <Picker
            selectedValue={selectedSession}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedSession(itemValue)
            }
            style={styles.picker}
            dropdownIconColor="black"
            dropdownIconComponent={() => (
              <MaterialCommunityIcons
                name="caret-down"
                size={18}
                color="black"
              />
            )}
            mode="dropdown">
            <Picker.Item label="Spring" value="spring" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={setPeerEvaluation}>
          <Text style={{color: 'black'}}>SET PEER EVALUATION</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={setConfidentialEvaluation}>
          <Text style={{color: 'black'}}>SET CONFIDENTIAL EVALUATION</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  picker: {
    flex: 1,
    color: 'black',
  },
  button: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    color: 'black',
  },
  showPerformance: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'gray',
    width: '80%',
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
});

export default Evaluation;
