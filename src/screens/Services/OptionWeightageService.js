// services/OptionWeightageService.js
import IPAddress from '../../../IPAddress';

const OptionWeightageService = {
    getOptionsWeightage: async () => {
    try {
      const response = await fetch(
        `${IPAddress}/OptionsWeightage/GetOptionsWeightages`,
      );
      if (!response.ok) {
        Alert.alert('Failed to fetch confidential questions');
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  putOptionsWeightage: async optionWeightageList => {
    try {
      const response = await fetch(
        `${IPAddress}/OptionsWeightage/PutOptionsWeightage`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(optionWeightageList),
        },
      );
      if (!response.ok) throw new Error('Failed to update options weightage');
      return await response.json();
    } catch (error) {
      throw new Error(`Error updating options weightage: ${error.message}`);
    }
  },
};

export default OptionWeightageService;
