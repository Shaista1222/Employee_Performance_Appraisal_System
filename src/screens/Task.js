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
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {TabView, SceneMap} from 'react-native-tab-view';
import TaskAdapter from './Adapter/TaskAdapter';
import TaskService from './Services/TaskService';
import {Button as PaperButton} from 'react-native-paper';

const Task = () => {
  const layout = useWindowDimensions();
  const [tasks, setTasks] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [taskDescription, setTaskDescription] = useState('');
  const [taskWeightage, setTaskWeightage] = useState('');

  useEffect(() => {
    loadTasksForSelectedTab(tabIndex);
  }, [tabIndex]);

  const loadTasksForSelectedTab = index => {
    switch (index) {
      case 0:
        TaskService.getTasks()
          .then(tasks => setTasks(tasks))
          .catch(error => console.error(error));
        break;
      case 1:
        TaskService.getPendingTasks()
          .then(tasks => setTasks(tasks))
          .catch(error => console.error(error));
        break;
      case 2:
        TaskService.getCompletedTasks()
          .then(tasks => setTasks(tasks))
          .catch(error => console.error(error));
        break;
      default:
        break;
    }
  };

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'tab1':
        return <TaskAdapter tasks={tasks} />;
      case 'tab2':
        return <TaskAdapter tasks={tasks} />;
      case 'tab3':
        return <TaskAdapter tasks={tasks} />;
      default:
        return null;
    }
  };

  const handleTabChange = index => {
    setTabIndex(index);
  };

  const handleAddTask = () => {
    setModalVisible(true);
  };

  const handleDateTimePickerConfirm = selectedDate => {
    setDueDate(selectedDate);
    setModalVisible(false); // Hide modal when date is confirmed
  };

  const handleSaveTask = () => {
    // Implement logic to save task
    setModalVisible(false);
  };

  /* const renderTaskList = tasks => {
    return tasks.map((taskWithEmployees, index) => {
      const task = taskWithEmployees.task;
      const assignedTo = taskWithEmployees.assignedTo;
      const assignedBy = taskWithEmployees.assignedBy;

      return (
        <View key={index} style={styles.card}>
          <Text style={styles.boldText}>Task:</Text>
          <Text style={styles.text}>{task.taskDescription || ''}</Text>
          <Text style={styles.boldText}>Due:</Text>
          <Text style={styles.text}>
            {task.dueDate ? task.dueDate.toString() : ''}
          </Text>
          <Text style={styles.boldText}>Weightage:</Text>
          <Text style={styles.text}>
            {task.weightage ? task.weightage.toString() : ''}
          </Text>
          <Text style={styles.boldText}>Assigned To:</Text>
          <Text style={styles.text}>{assignedTo ? assignedTo.name : ''}</Text>
          <Text style={styles.boldText}>Assigned By:</Text>
          <Text style={styles.text}>{assignedBy ? assignedBy.name : ''}</Text>
          <View style={styles.row}>
            <TextInput style={styles.input} placeholder="Enter Score" />
            <Button title="OK" onPress={() => {}} />
          </View>
        </View>
      );
    });
  }; */

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Task</Text>
      </View>
      <TabView
        navigationState={{
          index: tabIndex,
          routes: [
            {key: 'tab1', title: 'All'},
            {key: 'tab2', title: 'Pending'},
            {key: 'tab3', title: 'Complete'},
          ],
        }}
        renderScene={renderScene}
        onIndexChange={handleTabChange}
        initialLayout={{width: layout.width}}
        style={styles.tabLayout}
      />

      <ScrollView style={styles.scrollView}>{TaskAdapter(tasks)}</ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Task Description"
              onChangeText={text => setTaskDescription(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Task Weightage"
              onChangeText={text => setTaskWeightage(text)}
            />
            <DateTimePickerModal
              isVisible={modalVisible}
              mode="datetime"
              date={dueDate}
              onConfirm={handleDateTimePickerConfirm}
              onCancel={() => setModalVisible(false)}
            />
            <PaperButton mode="contained" onPress={handleSaveTask}>
              Save Task
            </PaperButton>
            <PaperButton onPress={() => setModalVisible(false)}>
              Cancel
            </PaperButton>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.fab} onPress={handleAddTask}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  tabLayout: {
    flex: 1,
    // backgroundColor: '#f4f4f4',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    color: 'black',
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
});

export default Task;
