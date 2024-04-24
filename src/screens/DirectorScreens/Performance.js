import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const KPI = () => {
  const [course, setCourse] = useState('');
  const [session, setSession] = useState('');
  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>Report</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.subtitle}>Naseer Ahmed Sajid</Text>

        <Text style={styles.label}>Course</Text>
        <Picker
          selectedValue={course}
          onValueChange={(itemValue, itemIndex) => setCourse(itemValue)}
          style={{color: 'black'}}
          dropdownIconColor="black"
          dropdownIconComponent={() => (
            <FontAwesome5 name="caret-down" size={18} color="black" />
          )}
          mode="dropdown">
          <Picker.Item label="Operating Systems" value="operatingSystems" />
        </Picker>
        {/* Show prformance */}
        <Text style={styles.label}>Session</Text>
        <View style={styles.showPerformance}>
          <Picker
            selectedValue={session}
            setSession={(itemValue, itemIndex) => setSession(itemValue)}
            style={styles.picker}
            dropdownIconColor="black"
            dropdownIconComponent={() => (
              <FontAwesome5 name="caret-down" size={18} color="black" />
            )}
            mode="dropdown">
            <Picker.Item label="--Session--" value="spring2024" />
          </Picker>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>SHOW</Text>
          </TouchableOpacity>
        </View>
        {/* compare performanec */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.label}>From:</Text>
          <Text style={{paddingRight: 180, fontSize: 16, color: 'black'}}>
            To:
          </Text>
        </View>
        <View style={styles.showPerformance}>
          <Picker
            selectedValue={session}
            setSession={(itemValue, itemIndex) => setSession(itemValue)}
            style={styles.pickerCompare}
            dropdownIconColor="black"
            dropdownIconComponent={() => (
              <FontAwesome5 name="caret-down" size={18} color="black" />
            )}
            mode="dropdown">
            <Picker.Item label="spring2024" value="spring2024" />
          </Picker>
          <Picker
            selectedValue={session}
            setSession={(itemValue, itemIndex) => setSession(itemValue)}
            style={styles.pickerCompare}
            dropdownIconColor="black"
            dropdownIconComponent={() => (
              <FontAwesome5 name="caret-down" size={18} color="black" />
            )}
            mode="dropdown">
            <Picker.Item label="spring2024" value="spring2024" />
          </Picker>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Compare</Text>
          </TouchableOpacity>
        </View>
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
  showPerformance: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // borderWidth:1
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
  subtitle: {
    fontSize: 18,
    color: 'grey',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    color: 'black',
  },
  button: {
    backgroundColor: '#6a51ae',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
  picker: {
    color: 'black',
    width: '50%',
  },
  pickerCompare: {
    color: 'black',
    width: '35%',
  },
});

export default KPI;
