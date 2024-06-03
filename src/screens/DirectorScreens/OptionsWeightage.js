import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  ToastAndroid,
} from 'react-native';
import OptionWeightageService from '../Services/OptionWeightageService';

const OptionsWeightage = () => {
  const [optionWeightageList, setOptionWeightageList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptionsWeightage = async () => {
      try {
        const optionsWeightages =
          await OptionWeightageService.getOptionsWeightage();
        setOptionWeightageList(optionsWeightages);
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOptionsWeightage();
  }, []);

  const handleSave = async () => {
    try {
      await OptionWeightageService.putOptionsWeightage(optionWeightageList);
      Alert.alert('Options weightage updated successfully');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleWeightageChange = (index, weightage) => {
    const updatedList = [...optionWeightageList];
    updatedList[index].weightage = weightage;
    setOptionWeightageList(updatedList);
  };

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>Option Weightage</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            {optionWeightageList.map((option, index) => (
              <View key={index} style={styles.optionContainer}>
                <Text style={styles.optionTitle}>{option.name}</Text>
                <TextInput
                  style={styles.optionInput}
                  value={(option.weightage || 0).toString()}
                  onChangeText={text => {
                    if (!isNaN(text) && text !== '') {
                      handleWeightageChange(index, parseInt(text, 10));
                    } else {
                      handleWeightageChange(index, 0); // Ensure you handle invalid input correctly
                    }
                  }}
                  keyboardType="numeric"
                />
              </View>
            ))}
            <View style={styles.buttonContainer}>
              <Button onPress={handleSave} title="Save" color="#6360DC" />
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flexGrow: 1,
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
  buttonContainer: {
    position: 'absolute',
    bottom: 160,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  optionContainer: {
    marginBottom: 20,
  },
  optionTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  optionInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    color: 'black',
  },
});

export default OptionsWeightage;
