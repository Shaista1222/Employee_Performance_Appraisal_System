import { Alert } from "react-native";
import IPAddress from "../../../IPAddress";

 const DepartmentService = {

     fetchDepartments:async(endpoint) =>{
      try {
        const response = await fetch(`${IPAddress}/Department/${endpoint}`);
        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }
        return await response.json();
      } catch (error) {
        throw new Error(`Something went wrong while fetching departments: ${error.message}`);
      }
    },
  
     getDepartments:async function() {
      return this.fetchDepartments('GetDepartments');
    }
  
    // populateDepartmentSpinner(departmentList, setItems)=> {
    //   if (departmentList && departmentList.length > 0) {
    //     const names = departmentList.map(department => department.name);
    //     setItems(names);
    //   } else {
    //     Alert.alert('Department list is empty', ToastAndroid.LONG);
    //   }
    // }
  }
  export default DepartmentService;