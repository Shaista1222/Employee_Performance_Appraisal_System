import { AsyncStorage } from 'react-native';

class SharedPreferencesManager {
    static PREF_NAME = 'MyAppPref';
    static KEY_SESSION_ID = 'sessionId';
    static KEY_USER_ID = 'userId';
    static KEY_USER_TYPE = 'userType';
    static KEY_USER_OBJECT = 'userObject';

    // Save student user details
    static async saveStudentUserDetails(student) {
        try {
            await AsyncStorage.setItem(SharedPreferencesManager.KEY_USER_OBJECT, JSON.stringify(student));
        } catch (error) {
            console.error('Error saving student user details:', error);
        }
    }

    // Save employee user details
    static async saveEmployeeUserDetails(employee) {
        try {
            await AsyncStorage.setItem(SharedPreferencesManager.KEY_USER_OBJECT, JSON.stringify(employee));
        } catch (error) {
            console.error('Error saving employee user details:', error);
        }
    }

    // Save session ID
    static async saveSessionId(sessionId) {
        try {
            await AsyncStorage.setItem(SharedPreferencesManager.KEY_SESSION_ID, sessionId.toString());
        } catch (error) {
            console.error('Error saving session ID:', error);
        }
    }

    // Get session ID
    static async getSessionId() {
        try {
            const sessionId = await AsyncStorage.getItem(SharedPreferencesManager.KEY_SESSION_ID);
            return sessionId ? parseInt(sessionId) : 0;
        } catch (error) {
            console.error('Error getting session ID:', error);
            return 0;
        }
    }

    // Get user ID
    static async getUserId() {
        try {
            return await AsyncStorage.getItem(SharedPreferencesManager.KEY_USER_ID);
        } catch (error) {
            console.error('Error getting user ID:', error);
            return null;
        }
    }

    // Get user type
    static async getUserType() {
        try {
            return await AsyncStorage.getItem(SharedPreferencesManager.KEY_USER_TYPE);
        } catch (error) {
            console.error('Error getting user type:', error);
            return null;
        }
    }

    // Get student user object
    static async getStudentUserObject() {
        try {
            const userJson = await AsyncStorage.getItem(SharedPreferencesManager.KEY_USER_OBJECT);
            return userJson ? JSON.parse(userJson) : null;
        } catch (error) {
            console.error('Error getting student user object:', error);
            return null;
        }
    }

    // Get employee user object
    static async getEmployeeUserObject() {
        try {
            const userJson = await AsyncStorage.getItem(SharedPreferencesManager.KEY_USER_OBJECT);
            return userJson ? JSON.parse(userJson) : null;
        } catch (error) {
            console.error('Error getting employee user object:', error);
            return null;
        }
    }

    // Clear session details (logout)
    static async logoutUser() {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.error('Error clearing session details:', error);
        }
    }
}

export default SharedPreferencesManager;
