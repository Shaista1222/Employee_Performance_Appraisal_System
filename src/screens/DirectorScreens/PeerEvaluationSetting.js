import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postEvaluationTime } from '../Services/EvaluationTimeServices'; // Adjust the import path as necessary

const PeerEvaluationSetting = () => {
  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const showStartTimePicker = () => {
    setStartTimePickerVisible(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisible(false);
  };

  const handleStartTimeConfirm = date => {
    const formattedDate = date.toISOString(); // Ensure it's in ISO format
    setStartTime(formattedDate);
    console.log(`Start Time set to: ${formattedDate}`);
    hideStartTimePicker();
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisible(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisible(false);
  };

  const handleEndTimeConfirm = date => {
    const formattedDate = date.toISOString(); // Ensure it's in ISO format
    setEndTime(formattedDate);
    console.log(`End Time set to: ${formattedDate}`);
    hideEndTimePicker();
  };

  const handleSave = async () => {
    try {
      const sessionId = await AsyncStorage.getItem('currentSession');
      console.log(`Session ID from AsyncStorage: ${sessionId}`);
      const sid = JSON.parse(sessionId);
      console.log(`Parsed Session ID: ${sid.id}`);

      if (!sessionId) {
        Alert.alert('Error', 'Session ID not found.');
        return;
      }

      if (!startTime || !endTime) {
        Alert.alert('Error', 'Start Time and End Time must be set.');
        return;
      }

      const evaluationTime = {
        start_time: startTime,
        end_time: endTime,
        evaluation_type: 'peer',
        session_id: sid.id
      };

      console.log('Sending evaluation time data to server:', evaluationTime);

      const response = await postEvaluationTime(evaluationTime);
      console.log(`Response from server: ${JSON.stringify(response)}`);

      // Check for success
      if (response && (response.success || response.id)) {
        Alert.alert('Success', 'Evaluation time saved successfully.');
      } else {
        Alert.alert('Error', response.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Peer Evaluation</Text>
        <View style={styles.dateTimeContainer}>
          <TouchableOpacity style={styles.input} onPress={showStartTimePicker}>
            <Text style={styles.dateTime}>Start Time: {startTime ? new Date(startTime).toLocaleString() : ''}</Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isStartTimePickerVisible}
          mode="datetime"
          onConfirm={handleStartTimeConfirm}
          onCancel={hideStartTimePicker}
        />
        <View style={styles.dateTimeContainer}>
          <TouchableOpacity style={styles.input} onPress={showEndTimePicker}>
            <Text style={styles.dateTime}>End Time: {endTime ? new Date(endTime).toLocaleString() : ''}</Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isEndTimePickerVisible}
          mode="datetime"
          onConfirm={handleEndTimeConfirm}
          onCancel={hideEndTimePicker}
        />
        <Button
          style={styles.saveButton}
          textColor="white"
          labelStyle={styles.buttonText}
          onPress={handleSave}
        >
          Save
        </Button>
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
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    width: '80%',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#3a7ca5',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#d35400',
    textAlign: 'center',
  },
  input: {
    width: 200,
    borderWidth: 1,
    padding: 7,
    color: 'black',
    alignItems: 'center',
  },
  dateTimeContainer: {
    marginBottom: 16,
    color: 'black',
  },
  dateTime: {
    fontSize: 16,
    color: 'black',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PeerEvaluationSetting;
