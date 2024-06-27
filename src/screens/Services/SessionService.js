import IPAddress from '../../../IPAddress';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SessionService = {
  getCurrentSession: async () => {
    try {
      const response = await fetch(`${IPAddress}/Session/GetCurrentSession`);

      if (!response.ok) {
        throw new Error('Failed to fetch student courses');
      }
      console.log(response.body);
      const data = await response.json();
      await AsyncStorage.setItem('currentSession', JSON.stringify(data));
      return {ok: response.ok, status: response.status, data};
    } catch (error) {
      throw new Error('Failed to fetch session');
    }
  },
  getYears: async () => {
    try {
      const response = await fetch(`${IPAddress}/Session/GetYears`);
      if (!response.ok) {
        throw new Error('Failed to fetch Years');
      }
      return await response.json();
    } catch (error) {
      throw new Error('Something went wrong while fetching years');
    }
  },
  getSessions: async () => {
    try {
      const response = await fetch(`${IPAddress}/Session/GetSessions`);
      if (!response.ok) {
        throw new Error('Failed to fetch sessions');
      }
      return await response.json();
    } catch (error) {
      throw new Error('Something went wrong while fetching sessions');
    }
  },
  postSession:async(session)=> {
    try {
      const response = await fetch(`${IPAddress}/Session/PostSession`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(session),
      });
      if (!response.ok) {
        throw new Error('Failed to post session');
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Failed to post session');
    }
  },
};

export default SessionService;
