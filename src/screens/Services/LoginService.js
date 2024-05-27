import IPAddress from '../../../IPAddress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SessionService from './SessionService';

const LoginService = {
  async loginStudent(emailOrAridNo, password) {
    console.log(
      `Attempting student login with:\nEmail/AridNo: ${emailOrAridNo}\nPassword: ${password}`,
    );
    try {
      const response = await fetch(
        `${IPAddress}/Login/Login?emailOrAridNo=${emailOrAridNo}&password=${password}`,
      );
      SessionService.getCurrentSession();
      const data = await response.json();
      console.log('Student login response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch student');
      }

      await AsyncStorage.setItem('userObject', JSON.stringify(data));
      return {ok: response.ok, status: response.status, data};
    } catch (error) {
      console.error('Error during student login:', error);
      throw error;
    }
  },

  async loginEmployee(emailOrAridNo, password) {
    console.log(
      `Attempting employee login with:\nEmail/AridNo: ${emailOrAridNo}\nPassword: ${password}`,
    );
    try {
      const response = await fetch(
        `${IPAddress}/Login/Login?emailOrAridNo=${emailOrAridNo}&password=${password}`,
      );
      SessionService.getCurrentSession();
      const data = await response.json();
      console.log('Employee login response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      await AsyncStorage.setItem('employee', JSON.stringify(data));
      return {ok: response.ok, status: response.status, data};
    } catch (error) {
      console.error('Error during employee login:', error);
      throw error;
    }
  },
};

export default LoginService;
