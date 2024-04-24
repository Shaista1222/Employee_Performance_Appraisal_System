import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ConfidentialEvaluation = () => {
  const [pin, setPin] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Confidential Evaluation</Text>
        <Text style={styles.label}>Enter Pin</Text>
        <TextInput
          placeholderTextColor="gray"
          style={styles.input}
          value={pin}
          onChangeText={setPin}
          keyboardType="numeric"
          placeholder="Enter your pin"
        />
        <View style={styles.dateTimeContainer}>
          <Text style={styles.label}>Start Time</Text>
          <View style={styles.dateTime}>
            <Text>Wed Mar 06 00:38:38 GMT+05:00</Text>
            <Icon name="calendar-today" size={24} />
          </View>
        </View>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.label}>End Time</Text>
          <View style={styles.dateTime}>
            <Text>Wed Mar 06 00:38:44 GMT+05:00</Text>
            <Icon name="calendar-today" size={24} />
          </View>
        </View>
        <Button title="SAVE" onPress={() => console.log('Save Pressed')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    width: '80%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#d35400',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    height: 40,
    borderColor: '#333',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  dateTimeContainer: {
    marginBottom: 16,
    color: 'black',
  },
  dateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    color: 'black',
  },
});

export default ConfidentialEvaluation;
