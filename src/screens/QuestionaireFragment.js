import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import {Button} from 'react-native-paper';
import QuestionaireServiceListner from './Services/QuestionaireServiceListner';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const AddQuestion = ({visible, onClose, onSave}) => {
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

export const UpdateQuestion = ({visible, onClose, onSave, initialText}) => {
  const [questionText, setQuestionText] = useState(initialText);

  useEffect(() => {
    setQuestionText(initialText);
  }, [initialText]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Update Question</Text>

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
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [questionsList, setQuestionsList] = useState([]);
  const [questionnaireTypes, setQuestionnaireTypes] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);

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

  const fetchQuestionnaireByType = async questionnaireTypeId => {
    try {
      const data = await QuestionaireServiceListner.getQuestionnaireByTypeID(
        questionnaireTypeId,
      );
      setQuestionsList(data);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    if (selectedEvaluation !== '') {
      fetchQuestionnaireByType(selectedEvaluation);
    }
  }, [selectedEvaluation]);

  const handleSaveQuestion = async questionText => {
    try {
      const question = {
        question: questionText,
        type_id: selectedEvaluation,
        deleted: false,
      };
      const savedQuestion = await QuestionaireServiceListner.postQuestion(
        question,
      );
      setQuestionsList(prevQuestions => [...prevQuestions, savedQuestion]);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handleUpdateQuestion = async updatedText => {
    try {
      const updatedQuestion = {
        ...currentQuestion,
        question: updatedText,
      };
      const result = await QuestionaireServiceListner.putQuestion(
        updatedQuestion,
      );
      setQuestionsList(prevQuestions =>
        prevQuestions.map(q => (q.id === result.id ? result : q)),
      );
      setCurrentQuestion(null);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const handleDeleteQuestion = async questionId => {
    console.log(questionId);
    try {
      await QuestionaireServiceListner.deleteQuestion(questionId);
      setQuestionsList(prevQuestions =>
        prevQuestions.filter(q => q.id !== questionId),
      );
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  
  const openUpdateModal = question => {
    setCurrentQuestion(question);
    setUpdateModalVisible(true);
  };

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>Questionnaire</Text>
      </View>
      <View style={styles.container}>
        <Picker
          selectedValue={selectedEvaluation}
          onValueChange={itemValue => {
            setSelectedEvaluation(itemValue);
          }}
          style={{color: 'black'}}
          dropdownIconColor="black"
          mode="dropdown">
          <Picker.Item label="Select Questionnaire Type" value="" />
          {questionnaireTypes.map(questionnaireType => (
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
        {currentQuestion && (
          <UpdateQuestion
            visible={updateModalVisible}
            onClose={() => setUpdateModalVisible(false)}
            onSave={handleUpdateQuestion}
            initialText={currentQuestion.question}
          />
        )}
        <FlatList
          data={questionsList}
          renderItem={({item, index}) => (
            <View style={styles.itemContainer}>
              <Text style={styles.questionText}>
                Q{index + 1}: {item.question}
              </Text>
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  onPress={() => openUpdateModal(item)}
                  style={styles.iconButton}>
                  <MaterialCommunityIcons
                    name="pencil"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteQuestion(item.id)}
                  style={styles.iconButton}>
                  <MaterialCommunityIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
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
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f4f4f4',
    marginBottom: 10,
    borderRadius: 5,
  },
  questionText: {
    color: 'black',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginHorizontal: 2,
  },
});

export default QuestionnaireFragment;
