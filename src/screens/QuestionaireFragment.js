import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Modal,
    TextInput,
    Alert,
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import { Picker } from '@react-native-picker/picker';
  import { Menu, MenuItem } from 'react-native-material-menu';
  import { Button } from 'react-native-paper';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//   import QuestionaireServiceListner from '../Services/QuestionaireServiceListner';
  import QuestionaireServiceListner from './Services/QuestionaireServiceListner';
  export const QuestionItem = ({ question }) => {
    let _menu = null;
  
    const setMenuRef = (ref) => {
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
        <Text style={{ color: 'black' }}>{question.question}</Text>
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
          <MenuItem style={{ color: 'black' }} onPress={updateItem}>
            Update
          </MenuItem>
          <MenuItem onPress={deleteItem}>Delete</MenuItem>
        </Menu>
      </View>
    );
  };
  
  export const AddQuestion = ({ visible, onClose, onSave }) => {
    const [questionText, setQuestionText] = useState('');
  
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add Question</Text>
  
            <TextInput
              placeholderTextColor="gray"
              style={styles.input}
              onChangeText={setQuestionText}
              value={questionText}
              placeholder="Enter question"
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
                onPress={() => {
                  onSave(questionText);
                  setQuestionText('');
                  onClose();
                }}>
                Save
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  
  const QuestionnaireFragment = () => {
    const [selectedEvaluation, setSelectedEvaluation] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [questionsList, setQuestionsList] = useState([]);
    const [questionnaireTypes, setQuestionnaireTypes] = useState([]);
    const [questionnaireTypeId, setQuestionnaireTypeId] = useState('');
  
    useEffect(() => {
      const fetchQuestionnaire = async () => {
        try {
          const data = await QuestionaireServiceListner.getQuestionnaireTypes();
          setQuestionnaireTypes(data);
        } catch (error) {
          Alert.alert(error.message);
        }
      };
  
      fetchQuestionnaire();
    }, []);
  
    useEffect(() => {
      const fetchQuestionnaireByType = async (questionnaireTypeId) => {
        try {
          const data = await QuestionaireServiceListner.getQuestionnaireByType(
            questionnaireTypeId,
          );
          setQuestionsList(data);
        } catch (error) {
          Alert.alert(error.message);
        }
      };
  
      if (questionnaireTypeId) {
        fetchQuestionnaireByType(questionnaireTypeId);
      }
    }, [questionnaireTypeId]);
  
    const handleSaveQuestion = async (questionText) => {
      try {
        const question = {
          question: questionText,
          type_id: questionnaireTypeId,
          deleted: false,
        };
        const savedQuestion = await QuestionaireServiceListner.postQuestion(question);
        setQuestionsList((prevQuestions) => [...prevQuestions, savedQuestion]);
      } catch (error) {
        Alert.alert(error.message);
      }
    };
  
    return (
      <>
        <View style={styles.title}>
          <Text style={styles.titleText}>Questionnaire</Text>
        </View>
        <View style={styles.container}>
          <Picker
            selectedValue={selectedEvaluation}
            onValueChange={(itemValue) => {
              setSelectedEvaluation(itemValue);
              setQuestionnaireTypeId(itemValue);
            }}
            style={{ color: 'black' }}
            dropdownIconColor="black"
            mode="dropdown">
            <Picker.Item label="Select Questionnaire Type" value="" />
            {questionnaireTypes.map((questionnaireType) => (
              <Picker.Item
                key={questionnaireType.id}
                label={questionnaireType.name}
                value={questionnaireType.id}
              />
            ))}
          </Picker>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>ADD QUESTION</Text>
          </TouchableOpacity>
          <AddQuestion
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSave={handleSaveQuestion}
          />
          <FlatList
            data={questionsList}
            renderItem={({ item, index }) => (
              <View style={styles.BoxDesign}>
                <Text style={{ fontWeight: 'bold' }}>
                  Q{index + 1}: {item.question}
                </Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
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
    },
    BoxDesign: {
      color: '#708090',
      fontSize: 18,
      borderColor: 'red',
      margin: 10,
      backgroundColor: '#d2b48c',
      marginBottom: 10,
      padding: 10,
      borderRadius: 10,
    },
  });
  
  export default QuestionnaireFragment;
  