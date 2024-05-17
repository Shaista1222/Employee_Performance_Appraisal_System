import React from 'react';
import {View, Modal, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
const OptionsModal = ({visible, onClose}) => {
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
              // navigation.navigate('DirectorMain', {screen: 'DirectorMain'});
            }}>
            <Text style={styles.buttonText}>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Option 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Option 3</Text>
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
    paddingTop: 400,
    fontSize: 12,
  },
  modalView: {
    backgroundColor: '#02367B',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
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
    width: 70,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  },
});

export default OptionsModal;
