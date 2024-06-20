import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Alert,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import TaskAdapter from './Adapter/TaskAdapter';
import TaskService from './Services/TaskService';
import DepartmentService from './Services/DepartmentService';
import EmployeeService from './Services/EmployeeService';
import DesignationService from './Services/DesignationService';
import AssignTask from './DirectorScreens/AssignTask';
import TaskEditModal from './TaskEditModal';

const Task = () => {
  const layout = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [taskList, setTaskList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [employeeTypeList, setEmployeeTypeList] = useState([]);
  const [designationList, setDesignationList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [dueDate, setDueDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState(null);

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
      DesignationService.getDesignations()
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
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleTabChange = index => {
    setSelectedTabIndex(index);
    loadTasksForSelectedTab(index);
  };

  const loadTasksForSelectedTab = async index => {
    try {
      let tasks = [];
      switch (index) {
        case 0:
          tasks = await TaskService.getTasks();
          break;
        case 1:
          tasks = await TaskService.getPendingTasks();
          break;
        case 2:
          tasks = await TaskService.getCompletedTasks();
          break;
        default:
          break;
      }
      setTaskList(tasks);
      console.log('Tasks loaded:', tasks);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  const handleOkButtonPress = async task => {
    console.log('handleOkButtonPress:', task);
    try {
      await TaskService.putTask(
        task.task,
        updatedTask => {
          Alert.alert('Success', `score updated successfully!`);
          loadTasksForSelectedTab(selectedTabIndex);
        },
        error => {
          console.error(error);
          Alert.alert('Error', error.message);
        },
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  const handleEditButtonPress = task => {
    console.log('handleEditButtonPress:', task);
    setSelectedTask(task);
    setEditModalVisible(true);
  };
  const handleSaveEdit = async updatedTask => {
    console.log('handleSaveEdit:', updatedTask);
    try {
      await TaskService.putTask(
        updatedTask,
        () => {
          Alert.alert('Success', `Task  updated successfully!`);
          loadTasksForSelectedTab(selectedTabIndex);
          setEditModalVisible(false);
        },
        error => {
          console.error(error);
          Alert.alert('Error', error.message);
        },
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  const handleDeleteButtonPress = async taskId => {
    try {
      await TaskService.deleteTask(taskId);
      Alert.alert('Success', 'Task deleted successfully!');
      loadTasksForSelectedTab(selectedTabIndex);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'tab1':
      case 'tab2':
      case 'tab3':
        return (
          <View style={styles.scrollView}>
            <TaskAdapter
              tasks={taskList}
              onOkButtonPress={handleOkButtonPress}
              onEditButtonPress={handleEditButtonPress}
              onDeleteButtonPress={handleDeleteButtonPress}
            />
          </View>
        );
      default:
        return null;
    }
  };

  const handleAddTask = () => {
    setModalVisible(true);
  };

  const handleDueDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setDueDate(currentDate);
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Task</Text>
      </View>

      <TabView
        navigationState={{
          index: selectedTabIndex,
          routes: [
            {key: 'tab1', title: 'All'},
            {key: 'tab2', title: 'Pending'},
            {key: 'tab3', title: 'Complete'},
          ],
        }}
        renderScene={renderScene}
        onIndexChange={handleTabChange}
        initialLayout={{width: layout.width}}
        renderTabBar={props => (
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
      <AssignTask
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      {selectedTask && (
        <TaskEditModal
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          task={selectedTask.task}
          onSave={handleSaveEdit}
        />
      )}
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
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    color: 'black',
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
