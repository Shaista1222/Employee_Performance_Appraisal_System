import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';

const Evaluation = () => {
  const [selectedSession, setSelectedSession] = useState('spring-2024');

  // Handler for setting peer evaluation
  const setPeerEvaluation = () => {
    // Your code to set peer evaluation
  };

  // Handler for setting confidential evaluation
  const setConfidentialEvaluation = () => {
    // Your code to set confidential evaluation
  };

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={selectedSession}
          onValueChange={(itemValue, itemIndex) => setSelectedSession(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Spring-2024" value="spring-2024" />
          {/* Add other sessions here */}
        </Picker>
        <MaterialCommunityIcons name="chevron-down" size={24} />
      </View>

      <TouchableOpacity style={styles.button} onPress={setPeerEvaluation}>
        <Text>SET PEER EVALUATION</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={setConfidentialEvaluation}>
        <Text>SET CONFIDENTIAL EVALUATION</Text>
      </TouchableOpacity>
 {/* Your code for displaying the Peer and Confidential times goes here */}
 </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  picker: {
    flex: 1,
  },
  button: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  // Add other styles as needed
});

export default Evaluation;