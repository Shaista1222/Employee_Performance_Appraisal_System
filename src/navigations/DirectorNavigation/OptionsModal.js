import React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Evaluation from '../../screens/DirectorScreens/Evaluation';
import Scores from '../../screens/Scores';
import DirectorEvaluation from '../../screens/DirectorScreens/DirectorEvaluation';
import QuestionnaireFragment from '../../screens/QuestionaireFragment';

const OptionsModal = ({ visible, onClose }) => {
  const navigation = useNavigation();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Add your options here */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Evaluation'); // Ensure 'Evaluation' is correctly registered in your navigator
            }}>
            <Text style={styles.buttonText}>Evaluation</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('QuestionnaireFragment'); // Ensure 'QuestionnaireFragment' is correctly registered in your navigator
            }}>
            <Text style={styles.buttonText}>Questionaire</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Scores'); // Ensure 'Scores' is correctly registered in your navigator
            }}>
            <Text style={styles.buttonText}>Scores</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('DirectorEvaluation'); // Ensure 'DirectorEvaluation' is correctly registered in your navigator
            }}>
            <Text style={styles.buttonText}>Director Evaluation</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // Add navigation or logic for 'Session' here
            }}>
            <Text style={styles.buttonText}>Session</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeText}>
              <MatIcon name="keyboard-arrow-down" size={25} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 300,
    fontSize: 12,
  },
  modalView: {
    backgroundColor: '#02367B',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: '50%',
  },
  closeText: {
    alignSelf: 'flex-end',
    marginTop: 10,
    color: 'blue',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 3,
    padding: 2,
    width: '100%',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  },
});

export default OptionsModal;
