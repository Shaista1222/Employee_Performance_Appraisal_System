import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Alert,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import LoginService from './Services/LoginService';

const Login = () => {
  const navigation = useNavigation();
  const [emailOrAridNo, setEmailOrAridNo] = useState('');
  const [password, setPassword] = useState('');

  const loginToEmployee = async (emailOrAridNo, password) => {
    try {
      console.log('Attempting to log in as employee:', emailOrAridNo);
      const response = await LoginService.loginEmployee(emailOrAridNo, password);
      console.log('Response from employee login:', response);

      if (response.ok) {
        const user = response.data; // Assuming the user data is in response.data
        if (user) {
          if (user.designation.name === 'Director') {
            navigation.navigate('DirectorMain', { screen: 'DirectorMain' });
          } else if (user.designation.name === 'HOD') {
            navigation.navigate('HodMain');
          } else if (user.designation.name === 'Teacher') {
            navigation.navigate('FacultyMain');
          } else if (
            user.designation.name === 'Administrative' &&
            user.employeeType.title === 'Administrative Staff'
          ) {
            navigation.navigate('AdminMain');
          }
        }
      } else {
        Alert.alert('Login failed');
      }
    } catch (error) {
      Alert.alert('Login failed');
      console.error('Error:', error);
    }
  };

  const loginStudent = async (emailOrAridNo, password) => {
    try {
      console.log('Attempting to log in as student:', emailOrAridNo);
      const response = await LoginService.loginStudent(emailOrAridNo, password);
      console.log('Response from student login:', response);

      if (response.status == 200) {
        const data = response.data;
        console.log('Student data:', data);
        navigation.navigate('StudentMain');
      } else {
        Alert.alert(response.status);
      }
    } catch (error) {
      Alert.alert(error.message);
      console.error('Error:', error);
    }
  };

  const handleLogin = () => {
    if (emailOrAridNo.toUpperCase().includes('ARID')) {
      if (emailOrAridNo === '' || password === '') {
        Alert.alert('Please enter ARID and password');
        return;
      }
      loginStudent(emailOrAridNo, password);
    } else {
      if (emailOrAridNo === '' || password === '') {
        Alert.alert('Please enter email and password');
        return;
      }
      loginToEmployee(emailOrAridNo, password);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>Login</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.topPad}>
          <TextInput
            value={emailOrAridNo}
            onChangeText={setEmailOrAridNo}
            style={styles.input}
            placeholderTextColor="gray"
            placeholder="Enter Email or Arid No"
          />
        </View>
        <View style={styles.topPad}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry={true}
            placeholderTextColor="gray"
            placeholder="Enter Password"
          />
        </View>
        <View style={styles.topPad}>
          <Button
            style={styles.button}
            textColor="white"
            labelStyle={styles.buttonText}
            onPress={handleLogin}
          >
            Login
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 60,
  },
  container: {
    backgroundColor: '#6360DC',
    paddingTop: 80,
    paddingLeft: 140,
  },
  stretch: {
    width: 80,
    height: 90,
    resizeMode: 'stretch',
    borderWidth: 5,
    borderRadius: 50,
  },
  input: {
    width: 250,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  },
  text: {
    color: 'white',
    fontSize: 34,
    margin: 15,
    fontWeight: 'bold',
  },
  topPad: {
    paddingTop: 21,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#6360DC',
    width: 150,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
  },
});

export default Login;
