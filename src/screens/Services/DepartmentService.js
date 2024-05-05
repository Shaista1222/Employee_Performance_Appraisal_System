import { Alert } from "react-native";
import IPAddress from "../../../IPAddress";

export default class DepartmentService {

    async fetchDepartments(endpoint) {
      try {
        const response = await fetch(`http://${IPAddress}/api/Department/${endpoint}`);
        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }
        return await response.json();
      } catch (error) {
        throw new Error(`Something went wrong while fetching departments: ${error.message}`);
      }
    }
  
    async getDepartments() {
      return this.fetchDepartments('departments');
    }
  
    populateDepartmentSpinner(departmentList, setItems) {
      if (departmentList && departmentList.length > 0) {
        const names = departmentList.map(department => department.name);
        setItems(names);
      } else {
        Alert.alert('Department list is empty', ToastAndroid.LONG);
      }
    }
  }
  