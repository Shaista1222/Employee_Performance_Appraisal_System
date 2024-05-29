import {Alert} from 'react-native';
import IPAddress from '../../../IPAddress';

const EmployeeService = {
  fetchEmployees: async endpoint => {
    try {
      const response = await fetch(`${IPAddress}/Employee/${endpoint}`);
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      return await response.json();
    } catch (error) {
      throw new Error(
        `Something went wrong while fetching employees: ${error.message}`,
      );
    }
  },

  getEmployees: async function () {
    return this.fetchEmployees('GetEmployees');
  },

  async getEmployeesWithDetails() {
    return this.fetchEmployees('GetEmployeesWithDetails');
  },
  getEmployeeTypes: async function () {
    return this.fetchEmployees('GetEmployeeTypes');
  },
  async getEmployeesWithKpiScores(sessionID) {
    try {
      const response = await fetch(
        `${IPAddress}/Employee/GetEmployeesWithKpiScores?sessionID=${sessionID}`,
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(
          `Failed to fetch Employees With Kpi Scores: ${response.statusText}`,
        );
      }
    } catch (error) {
      throw new Error(
        `Something went wrong while fetching Employees With Kpi Scores: ${error.message}`,
      );
    }
  },
  putEmployee: async function (employee) {
    try {
      const response = await fetch(`${IPAddress}/Employee/PutEmployee`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });
      if (!response.ok) {
        throw new Error('Failed to update employee');
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Something went wrong while updating employee: ${error.message}`);
    }
  },

  deleteEmployee: async function (id) {
    try {
      const response = await fetch(`${IPAddress}/Employee/DeleteEmployee?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Something went wrong while deleting employee: ${error.message}`);
    }
  },
   postEmployee :async function(employee) {
    try {
      const response = await fetch(`${IPAddress}/Employee/PostEmployee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`Failed to post employee: ${response.statusText}`);
      }
    } catch (error) {
      Alert.alert('Error', `Something went wrong while posting employee: ${error.message}`);
      throw error;
    }
  }
}
export default EmployeeService;
