import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Evaluator = () => {
  const [selectedEvaluator, setSelectedEvaluator] = useState();
  const [selectedEvaluatee, setSelectedEvaluatee] = useState({});
  const evaluatees = [
    'Nadia',
    'Naseer Ahmed Sajid',
    'Qasim Shehzad',
    'Muhammad Ihsan',
    'Shahid Abid',
    'Umar Farooq',
    'Zahid Ahmad',
    'Amir Rasheed',
  ];

  const toggleEvaluatee = name => {
    setSelectedEvaluatee(prevState => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const selectAllEvaluatees = () => {
    const newState = {};
    evaluatees.forEach(evaluatee => {
      newState[evaluatee] = true;
    });
    setSelectedEvaluatee(newState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Evaluators</Text>

      <Picker
        selectedValue={selectedEvaluator}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedEvaluator(itemValue)
        }
        style={styles.picker}>
        {/* Dynamically load evaluators here */}
        <Picker.Item label="Munir Ahmed" value="munirAhmed" />
      </Picker>

      <ScrollView style={styles.scrollView}>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={selectAllEvaluatees}>
          <Text style={styles.selectButtonText}>Select All</Text>
        </TouchableOpacity>
        {evaluatees.map((evaluatee, index) => (
          <TouchableOpacity
            key={index}
            style={styles.checkboxContainer}
            onPress={() => toggleEvaluatee(evaluatee)}>
            <Text style={styles.checkboxLabel}>{evaluatee}</Text>
            <View
              style={[
                styles.checkbox,
                selectedEvaluatee[evaluatee] && styles.checkboxSelected,
              ]}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  picker: {
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginRight: 8,
    fontSize: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#FFF',
  },
  checkboxSelected: {
    backgroundColor: '#000',
  },
  selectButton: {
    backgroundColor: '#DDD',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  selectButtonText: {
    fontSize: 16,
  },
});

export default Evaluator;
