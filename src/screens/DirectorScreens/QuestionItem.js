import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {Menu, MenuItem} from 'react-native-material-menu';
const questions = [
    {
      id: '1',
      text: "How would you rate the teacher's communication skills with students?",
    },
    // ... other questions
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
        }}>
        <Text>{question.text}</Text>
        <Menu
          ref={setMenuRef}
          button={
            <TouchableOpacity onPress={showMenu}>
              <Text>⋮</Text>
            </TouchableOpacity>
          }>
          <MenuItem onPress={updateItem}>Update</MenuItem>
          <MenuItem onPress={deleteItem}>Delete</MenuItem>
        </Menu>
      </View>
    );
  };