import {Alert} from 'react-native';
import IPAddress from '../../../IPAddress';

export default class DesignationService {
  async fetchDesignations(endpoint) {
    try {
      const response = await fetch(
        `${IPAddress}/Designation/${endpoint}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch designations');
      }
      return await response.json();
    } catch (error) {
      throw new Error(
        `Something went wrong while fetching designations: ${error.message}`,
      );
    }
  }

  async getDesignations() {
    return this.fetchDesignations('designations');
  }

  populateDesignationSpinner(designationList, setItems) {
    if (designationList && designationList.length > 0) {
      const names = designationList.map(designation => designation.name);
      setItems(names);
    } else {
      Alert.alert('Designation list is empty', ToastAndroid.LONG);
    }
  }
}
