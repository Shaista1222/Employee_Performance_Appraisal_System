import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {Menu, MenuItem} from 'react-native-material-menu';
import {Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const questions = [
  {
    id: '1',
    text: "How would you rate the teacher's communication skills with students?",
  },
  {
    id: '2',
    text: "How would you rate the teacher's communication skills with students?",
  },
  {
    id: '3',
    text: "How would you rate the teacher's communication skills with students?",
  },
  {
    id: '4',
    text: "How would you rate the teacher's communication skills with students?",
  },
  {
    id: '5',
    text: "How would you rate the teacher's communication skills with students?",
  },
  // Add more questions here
];

export const QuestionItem = ({question}) => {
  let _menu = null;

  const setMenuRef = ref => {
    _menu = ref;
  };

  const showMenu = () => {
    _menu.show();
  };

  const hideMenu = () => {
    _menu.hide();
  };

  const deleteItem = () => {
    // Handle the deletion of the item
    hideMenu();
  };

  const updateItem = () => {
    // Handle the update of the item
    hideMenu();
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f4f4f4',
      }}>
      <Text style={{color: 'black'}}>{question.text}</Text>
      <Menu
        ref={setMenuRef}
        button={
          <TouchableOpacity onPress={showMenu}>
           
              <MaterialCommunityIcons
                name="dots-vertical"
                color="blue"
                size={24}
                onPress={showMenu}
              />
            
          </TouchableOpacity>
        }>
        <MenuItem onPress={updateItem}>Update</MenuItem>
        <MenuItem onPress={deleteItem}>Delete</MenuItem>
      </Menu>
    </View>
  );
};
export const AddQuestion = ({visible, onClose}) => {
  const [taskDescription, setTaskDescription] = useState('');
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Add Task</Text>

          <TextInput
            placeholderTextColor="gray"
            style={styles.input}
            onChangeText={setTaskDescription}
            value={taskDescription}
            placeholder="Enter question Description"
          />
          <View style={styles.buttonRow}>
            <Button
              style={styles.buttonCancel}
              textColor="white"
              labelStyle={styles.buttonText}
              onPress={onClose}>
              Cancel
            </Button>
            <Button
              style={styles.saveButton}
              textColor="white"
              labelStyle={styles.buttonText}
              onPress={() => console.log('Save task')}>
              Save
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const Questionaire = () => {
  const [Evaluation, setEvaluation] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>Questionnaire</Text>
      </View>
      <View style={styles.container}>
        <Picker
          selectedValue={Evaluation}
          onValueChange={(itemValue, itemIndex) => setEvaluation(itemValue)}
          style={{color: 'black'}}
          dropdownIconColor="black"
          mode="dropdown">
          <Picker.Item label="Questionnaire Type" value="PeerEvaluation" />
        </Picker>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>ADD QUESTION</Text>
        </TouchableOpacity>
        <AddQuestion
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
        <FlatList
          data={questions}
          keyExtractor={item => item.id}
          renderItem={({item}) => <QuestionItem question={item} />}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
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
  button: {
    backgroundColor: '#6a51ae',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  buttonCancel: {
    backgroundColor: 'crimson',
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: 'green',
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  //   buttonText: {
  //     fontSize: 14,
  //   },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: 200,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    // paddingLeft:21
  },
});

export default Questionaire;
