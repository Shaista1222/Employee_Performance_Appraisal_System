import {Alert} from 'react-native';
import IPAddress from '../../../IPAddress';

export default DesignationService= {
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
  },
  async getDesignations() {
    return this.fetchDesignations('GetDesignations');
  },

}
