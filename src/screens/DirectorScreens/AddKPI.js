import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid, Spinner
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const AddKPI = () => {
  const [session, setSession] = useState([]);
  const [employeeType, setEmployeeType] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [department, setDepartment] = useState([]);
  const [employee, setEmployee] = useState('');
  const [subKpi, setSubKpi] = useState('');
  const [weightage, setWeightage] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sessionService = new SessionService();
        const sessions = await sessionService.getSessions();
        setSessionList(sessions);
      } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      }
    };

    const fetchDesignations = async () => {
      try {
        const designationService = new DesignationService();
        const designations = await designationService.getDesignations();
        setDesignationList(designations);
      } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      }
    };

    const fetchDepartments = async () => {
      try {
        const departmentService = new DepartmentService();
        const departments = await departmentService.getDepartments();
        setDepartmentList(departments);
      } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      }
    };

    const fetchEmployeeTypes = async () => {
      try {
        const employeeService = new EmployeeService();
        const employeeTypes = await employeeService.getEmployeeTypes();
        setEmployeeTypeList(employeeTypes);
      } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching data
      }
    };

    fetchSessions();
    fetchDesignations();
    fetchDepartments();
    fetchEmployeeTypes();
  }, []);


  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>KPI</Text>
      </View>
      {isLoading ? (
        <Spinner color="blue" />
      ) : (
      <View style={styles.container}>
        <TextInput style={styles.input}  placeholderTextColor="gray" placeholder="Enter Title" />
        <Picker
          selectedValue={session}
          setSession={(itemValue, itemIndex) => setSession(itemValue)}
          style={styles.picker}
          dropdownIconColor="black"
          dropdownIconComponent={() => (
            <FontAwesome5 name="caret-down" size={18} color="black" />
          )}
          mode="dropdown">
          <Picker.Item label="Spring-2024" value="spring2024" />
        </Picker>
        <Picker
          selectedValue={employeeType}
          onValueChange={(itemValue, itemIndex) => setEmployeeType(itemValue)}
          style={styles.picker}
          dropdownIconColor="black"
          dropdownIconComponent={() => (
            <FontAwesome5 name="caret-down" size={18} color="black" />
          )}
          mode="dropdown">
          <Picker.Item label="Senior Teacher" value="senior" />
        </Picker>
        <Picker
          selectedValue={designation}
          onValueChange={(itemValue, itemIndex) => setDesignation(itemValue)}
          style={styles.picker}
          dropdownIconColor="black"
          dropdownIconComponent={() => (
            <FontAwesome5 name="caret-down" size={18} color="black" />
          )}
          mode="dropdown">
          <Picker.Item label="Teacher" value="teacher" />
        </Picker>
        <Picker
          selectedValue={department}
          onValueChange={(itemValue, itemIndex) => setDepartment(itemValue)}
          style={styles.picker}
          dropdownIconColor="black"
          dropdownIconComponent={() => (
            <FontAwesome5 name="caret-down" size={18} color="black" />
          )}
          mode="dropdown">
          <Picker.Item label="Department" value="departement" />
        </Picker>
        <Picker
          selectedValue={employee}
          onValueChange={(itemValue, itemIndex) => setEmployee(itemValue)}
          style={styles.picker}
          dropdownIconColor="black"
          dropdownIconComponent={() => (
            <FontAwesome5 name="caret-down" size={18} color="black" />
          )}
          mode="dropdown">
          <Picker.Item label="--Select Employee--" value="employee" />
        </Picker>
        <Picker
          selectedValue={subKpi}
          onValueChange={(itemValue, itemIndex) => setSubKpi(itemValue)}
          style={styles.picker}
          dropdownIconColor="black"
          dropdownIconComponent={() => (
            <FontAwesome5 name="caret-down" size={18} color="black" />
          )}
          mode="dropdown">
          <Picker.Item label="Peer Evaluation" value="peer" />
        </Picker>
        {/* Repeat Picker for other dropdowns like Employee Type, Designation, Department, Employee, Sub Kpi with their respective state hooks */}

        <TextInput
         placeholderTextColor="gray" 
          style={styles.input}
          placeholder="Enter Weightage"
          keyboardType="numeric"
          onChangeText={setWeightage}
          value={weightage}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <View style={styles.summary}>
          <Text>
            {subKpi} {weightage}
          </Text>
          {/*    <TouchableOpacity>
            <Text style={styles.deleteText}>—</Text>
          </TouchableOpacity> */}
        </View>
      </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    paddingTop: 10,
    backgroundColor: '#6360DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    // borderWidth: 1,
    // borderColor: 'gray',
    // padding: 10,
    // marginBottom: 20,
    // borderRadius: 5,
    color: 'black',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    // paddingHorizontal: 10,
  },
  picker: {
    marginBottom: 10,
    color: 'black',
  },
  button: {
    backgroundColor: 'purple',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  deleteText: {
    fontSize: 24,
    color: 'red',
  },
  pickerContainer: {
    backgroundColor: 'white', // Background color of the picker
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
  },
  picker: {
    color: 'black', // Text color
    height: 40, // Set a fixed height for the picker
  },
  arrowIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    marginTop: -8, // Adjust based on the arrow icon size
  },
});

export default AddKPI;
