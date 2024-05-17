import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Import DateTimePickerModal package
import { Button } from 'react-native-paper';
const ConfidentialEvaluationSetting = () => {
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
    setStartTime(date.toLocaleTimeString());
    hideStartTimePicker();
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisible(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisible(false);
  };

  const handleEndTimeConfirm = date => {
    setEndTime(date.toLocaleTimeString());
    hideEndTimePicker();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Confidential Evaluation</Text>
        <View style={styles.dateTimeContainer}>
          <TouchableOpacity style={styles.input} onPress={showStartTimePicker}>
            <Text style={styles.dateTime}>Start Time: {startTime}</Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isStartTimePickerVisible}
          mode="time"
          onConfirm={handleStartTimeConfirm}
          onCancel={hideStartTimePicker}
        />
        <View style={styles.dateTimeContainer}>
          <TouchableOpacity style={styles.input} onPress={showEndTimePicker}>
            <Text style={styles.dateTime}>End Time: {endTime}</Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isEndTimePickerVisible}
          mode="time"
          onConfirm={handleEndTimeConfirm}
          onCancel={hideEndTimePicker}
        />
         <Button
              style={styles.saveButton}
              textColor="white"
              labelStyle={styles.buttonText}
              onPress={() => console.log('Save task')}>
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
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    width: '80%',
    // justifyContent: 'center',
    alignItems: 'center'
  },
  saveButton: {
    backgroundColor: '#3a7ca5',
    marginLeft: 10,
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
    // justifyContent: 'space-between',
    color: 'black',
  },
});
export default ConfidentialEvaluationSetting;
