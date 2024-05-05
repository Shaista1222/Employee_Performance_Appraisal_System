import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Alert,
} from 'react-native';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import IPAddress from '../../IPAddress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SessionServiceListner from './Services/SessionServiceListner';

const Login = () => {
  const navigation = useNavigation();
  const [emailOrAridNo, setEmailOrArid] = useState('');
  const [password, setPassword] = useState('');
  

  const loginToEmployee = async (emailOrAridNo, password) => {
    try {
      const response = await fetch(
        `http://${IPAddress}/api/Login/Login?emailOrAridNo=${emailOrAridNo}&password=${password}`,
      );
      const user = await response.json();

      if (response.ok) {
        if (user) {
          if (user.designation.name === 'Director') {
            navigation.navigate('DirectorMain', {screen: 'DirectorMain'});
          } else if (user.designation.name === 'HOD') {
            navigation.navigate('HodMain');
          } else if (user.designation.name === 'Teacher') {
            navigation.navigate('FacultyMain');
          } else if (
            user.designation.name === 'Administrative' &&
            user.employeeType.title === 'Administrative Staff'
          ) {
            navigation.navigate('AdminMainActivity');
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

  const storeStudentData = async (studentUser) => {
    try {
      if (studentUser!=null) {
        await AsyncStorage.setItem('studentUser', JSON.stringify(studentUser));
      } else {
        console.error('Error storing student data');
      }
    } catch (error) {
      console.error('Error storing student data:', error);
    }
  };  
  const storeSessionData = async (session) => {
    try {
      if (session!=null) {
        await AsyncStorage.setItem('session', JSON.stringify(session));
      } else {
        console.error('Error storing session data');
      }
    } catch (error) {
      console.error('Error storing student data:', error);
    }
  };

  const loginStudent = async (emailOrAridNo, password) => {
    try {
      const response = await fetch(
        `http://${IPAddress}/api/Login/Login?emailOrAridNo=${emailOrAridNo}&password=${password}`,
      );
      if (!response.ok) {
        Alert.alert(
          'Failed to login. Please check your credentials and try again.',
        );
        return;
      }

      const user = await response.json();
      console.log('Response:', response.status, user);

      if (user.arid_no == emailOrAridNo && user.password == password) {
        await storeStudentData(user);
        const sessionResponse = await SessionServiceListner.getCurrentSession();
      const sessionData = await sessionResponse.json();

      // Store session data
      await storeSessionData(sessionData);
        navigation.navigate('StudentMain');
      } else {
        Alert.alert('Incorrect email/ARID number or password.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error('Login error:', error);
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
            onChangeText={text => setEmailOrArid(text)}
            style={styles.input}
            placeholderTextColor="gray"
            placeholder="Enter Email or Arid No"></TextInput>
        </View>
        <View style={styles.topPad}>
          <TextInput
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry={true}
            placeholderTextColor="gray"
            placeholder="Enter Password"></TextInput>
        </View>
        <View style={styles.topPad}>
          <Button
            style={styles.button}
            textColor="white"
            labelStyle={styles.buttonText}
            onPress={handleLogin}>
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
    borderRadius: 100 / 2,
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
    /* marginTop: 150,
    marginLeft: 100, */
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
  },
});

export default Login;
