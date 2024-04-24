import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';
import {Button} from 'react-native-paper';
// Dummy data for the options weightage
const data = [
  {key: 'Poor', value: 0},
  {key: 'Average', value: 4},
  {key: 'Good', value: 8},
  {key: 'Excellent', value: 12},
];

const ListItem = ({item, onIncrement}) => (
  <View style={styles.listItem}>
    <Text style={styles.text}>{item.key}</Text>
    <TextInput value={String(item.value)} style={styles.input} />
    <TouchableOpacity
      style={styles.button}
      onPress={() => onIncrement(item.key)}>
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
  </View>
);

const OptionWeightage = () => {
  const [options, setOptions] = useState(data);

  const handleIncrement = key => {
    const newOptions = options.map(item => {
      if (item.key === key) {
        return {...item, value: item.value + 1};
      }
      return item;
    });
    setOptions(newOptions);
  };

  return (
    <>
     <View style={styles.title}>
        <Text style={styles.titleText}>Option Weightage</Text>
      </View>
    <View style={styles.container}>
      <FlatList
        data={options}
        renderItem={({item}) => (
          <ListItem item={item} onIncrement={handleIncrement} />
        )}
        keyExtractor={item => item.key}
      />
      {/* <View style={styles.footer}> */}
      <Button
        style={styles.saveButton}
        textColor="white"
        labelStyle={styles.buttonText}
        onPress={() => console.log('Save task')}>
        Save
      </Button>
      {/* </View> */}
      {/* Add your bottom navigation component here */}
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#f4f4f4',
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
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    margin: 5,
    width: 50,
    color: 'black',
  },
  button: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: 'green',
    marginLeft: 150,
    marginBottom:160,
    alignItems: 'center',
    justifyContent: 'center',
    width:40
  },

  footer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});

export default OptionWeightage;
