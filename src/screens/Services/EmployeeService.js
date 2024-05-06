import { Alert } from 'react-native';
import IPAddress from '../../../IPAddress';

 const EmployeeService ={
  
    fetchEmployees: async (endpoint) => {
      try {
        const response = await fetch(`${IPAddress}/Employee/${endpoint}`);
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        return await response.json();
      } catch (error) {
        throw new Error(`Something went wrong while fetching employees: ${error.message}`);
      }
    },
  
    getEmployees: async function() {
      return this.fetchEmployees('GetEmployees');
    },
  
    async getEmployeesWithDetails() {
      return this.fetchEmployees('GetEmployeesWithDetails');
    },

    getEmployeesWithKpiScores: async function() {
      return this.fetchEmployees('GetEmployeesWithKpiScores');
    },
  
    getEmployeeTypes: async function() {
      return this.fetchEmployees('GetEmployeeTypes');
    },
  
    populateEmployeesSpinner: function(employeeList, setItems) {
      if (employeeList && employeeList.length > 0) {
        const names = employeeList.map(employee => employee.name);
        setItems(names);
      } else {
        Alert.alert('Employee list is empty', ToastAndroid.LONG);
      }
    },
  
    populateEmployeeTypeSpinner:function(employeeTypeList, setItems) {
      if (employeeTypeList && employeeTypeList.length > 0) {
        const titles = employeeTypeList.map(type => type.title);
        setItems(titles);
      } else {
        Alert.alert('Employee type list is empty', ToastAndroid.LONG);
      }
    }
  }
  export  default EmployeeService