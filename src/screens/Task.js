import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import TaskAdapter from './Adapter/TaskAdapter';
import TaskService from './Services/TaskService';
import {Button as PaperButton} from 'react-native-paper';
import DepartmentService from './Services/DepartmentService';
import EmployeeService from './Services/EmployeeService';
import DesignationService from './Services/DesignationService';
import AssignTask from './DirectorScreens/AssignTask';

const Task = () => {
  const layout = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [taskList, setTaskList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [employeeTypeList, setEmployeeTypeList] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [dueDate, setDueDate] = useState(new Date());
  const [taskDescription, setTaskDescription] = useState('');
  const [weightage, setWeightage] = useState('');

  // useEffect(() => {
  //   loadTasksForSelectedTab(tabIndex);
  // }, [tabIndex]);
  useEffect(() => {
    fetchTasks();
    fetchEmployees();
    fetchEmployeeTypes();
    fetchDesignations();
    fetchDepartments();
    loadTasksForSelectedTab();
  }, []);

  const fetchTasks = async () => {
    try {
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const fetchEmployees = async () => {
    try {
      EmployeeService.getEmployees()
        .then(employees => setEmployeeList(employees))
        .catch(error => console.error(error));
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  const fetchEmployeeTypes = async () => {
    try {
      EmployeeService.getEmployeeTypes()
        .then(employeeTypes => setEmployeeTypeList(employeeTypes))
        .catch(error => console.error(error));
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const fetchDesignations = async () => {
    try {
      DesignationService.getDesignation()
        .then(Designation => setDesignationList(Designation))
        .catch(error => console.error(error));
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const fetchDepartments = async () => {
    try {
      DepartmentService.getDepartments()
        .then(departments => setDepartmentList(departments))
        .catch(error => console.error(error));
      // setTaskList(tasks);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleTabChange = index => {
    setSelectedTabIndex(index);
    loadTasksForSelectedTab(index);
  };
  const loadTasksForSelectedTab = index => {
    switch (index) {
      case 0:
        TaskService.getTasks()
          .then(tasks => {
            setTaskList(tasks);
            console.log(tasks);
          })
          .catch(error => console.error(error));
        break;
      case 1:
        TaskService.getPendingTasks()
          .then(tasks => setTaskList(tasks))
          .catch(error => console.error(error));
        break;
      case 2:
        TaskService.getCompletedTasks()
          .then(tasks => setTaskList(tasks))
          .catch(error => console.error(error));
        break;
      default:
        break;
    }
  };
  const handleOkButtonPress = async (task) => {
    try {
      await TaskService.putTask(task.task);
      Alert.alert('Success', `Task ${task.task.task_description} updated successfully!`);
      loadTasksForSelectedTab(selectedTabIndex);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'tab1':
      case 'tab2':
      case 'tab3':
        return (
          <View style={styles.scrollView}>
            <TaskAdapter tasks={taskList} onOkButtonPress={handleOkButtonPress} />
          </View>
        );
      default:
        return null;
    }
  };

  const handleAddTask = () => {
    setModalVisible(true);
  };

  const renderTaskItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => handleTaskItemClick(item)}>
        <View>{/* Render task item */}</View>
      </TouchableOpacity>
    );
  };
  const handleTaskItemClick = task => {
    // Handle task item click
    Alert.alert('Task Clicked', `Task ID: ${task.id}`);
  };

  const handleDueDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setDueDate(currentDate);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Task</Text>
      </View>

      <TabView
        navigationState={{
          index: selectedTabIndex,
          routes: [
            { key: 'tab1', title: 'All' },
            { key: 'tab2', title: 'Pending' },
            { key: 'tab3', title: 'Complete' },
          ],
        }}
        renderScene={renderScene}
        onIndexChange={handleTabChange}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            activeColor="black"
            inactiveColor="gray"
            {...props}
            scrollEnabled
            style={styles.tabBar}
          />
        )}
      />
      <TouchableOpacity style={styles.fab} onPress={handleAddTask}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
      <AssignTask visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
  },
  tabLayout: {
    flex: 1,
    // backgroundColor: '#f4f4f4',
  }, 
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  header: {
    paddingTop: 10,
    backgroundColor: '#6360DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    backgroundColor: 'gray',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  tabActive: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
  },
  tabText: {
    fontSize: 26,
    color: 'black',
  },
  scrollView: {
    flex: 1,
  },
  card: {
    // marginVertical: 8,
    // marginHorizontal: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    color: 'black',
    // marginBottom:12
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    margin: 16,
  },
  input: {
    flex: 1,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    backgroundColor: '#6360DC',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  fabText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
  },
});

export default Task;
