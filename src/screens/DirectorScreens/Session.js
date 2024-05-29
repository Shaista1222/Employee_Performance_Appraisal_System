import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import SessionService from '../Services/SessionService';

const Session = () => {
  const [session, setSession] = useState('');

  const handleSave = async () => {
    if (!session.trim()) {
      Alert.alert('Validation Error', 'Session cannot be empty');
      return;
    }

    try {
      const newSession = { title: session }; // Ensure the session object has the correct structure
      const response = await SessionService.postSession(newSession);
      Alert.alert('Success', 'Session saved successfully');
      setSession('');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to save session');
      console.error('Failed to post session:', error); // Log error for debugging
    }
  };

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>Session</Text>
      </View>
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <TextInput
            placeholderTextColor="gray"
            style={styles.input}
            onChangeText={setSession}
            value={session}
            placeholder="Enter Session"
            keyboardType="default"
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  input: {
    height: 40,
    width: 200,
    marginVertical: 7,
    borderWidth: 1,
    padding: 8,
    borderColor: 'gray',
    color: 'black',
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
});

export default Session;
