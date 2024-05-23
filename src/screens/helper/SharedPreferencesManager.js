import AsyncStorage from '@react-native-async-storage/async-storage';

const SharedPreferencesManager = {
  PREF_NAME: 'MyAppPref',
  KEY_SESSION_ID: 'sessionId',
  KEY_USER_ID: 'userId',
  KEY_USER_TYPE: 'userType',
  KEY_USER_OBJECT: 'userObject',
  KEY_IS_CONFIDENTIAL: 'isConfidential',

  setKeyIsConfidential: async (isConfidential) => {
    try {
      await AsyncStorage.setItem(
        SharedPreferencesManager.KEY_IS_CONFIDENTIAL,
        JSON.stringify(isConfidential)
      );
    } catch (error) {
      console.error('Error setting confidential flag:', error);
    }
  },

  isConfidential: async () => {
    try {
      const value = await AsyncStorage.getItem(
        SharedPreferencesManager.KEY_IS_CONFIDENTIAL
      );
      return value ? JSON.parse(value) : false;
    } catch (error) {
      console.error('Error getting confidential flag:', error);
      return false;
    }
  },

  saveStudentUserDetails: async (student) => {
    try {
      const userJson = JSON.stringify(student);
      await AsyncStorage.setItem(SharedPreferencesManager.KEY_USER_OBJECT, userJson);
    } catch (error) {
      console.error('Error saving student user details:', error);
    }
  },

  saveEmployeeUserDetails: async (employee) => {
    try {
      const userJson = JSON.stringify(employee);
      await AsyncStorage.setItem(SharedPreferencesManager.KEY_USER_OBJECT, userJson);
    } catch (error) {
      console.error('Error saving employee user details:', error);
    }
  },

  saveSessionId: async (sessionId) => {
    try {
      await AsyncStorage.setItem(
        SharedPreferencesManager.KEY_SESSION_ID,
        sessionId.toString()
      );
    } catch (error) {
      console.error('Error saving session ID:', error);
    }
  },

  getSessionId: async () => {
    try {
      const sessionId = await AsyncStorage.getItem(SharedPreferencesManager.KEY_SESSION_ID);
      return sessionId ? parseInt(sessionId, 10) : 0;
    } catch (error) {
      console.error('Error getting session ID:', error);
      return 0;
    }
  },

  getUserId: async () => {
    try {
      return await AsyncStorage.getItem(SharedPreferencesManager.KEY_USER_ID);
    } catch (error) {
      console.error('Error getting user ID:', error);
      return null;
    }
  },

  getUserType: async () => {
    try {
      return await AsyncStorage.getItem(SharedPreferencesManager.KEY_USER_TYPE);
    } catch (error) {
      console.error('Error getting user type:', error);
      return null;
    }
  },

  getStudentUserObject: async () => {
    try {
      const userJson = await AsyncStorage.getItem(SharedPreferencesManager.KEY_USER_OBJECT);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error('Error getting student user object:', error);
      return null;
    }
  },

  getEmployeeUserObject: async () => {
    try {
      const userJson = await AsyncStorage.getItem(SharedPreferencesManager.KEY_USER_OBJECT);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error('Error getting employee user object:', error);
      return null;
    }
  },

  logoutUser: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing session details:', error);
    }
  },
};

export default SharedPreferencesManager;
