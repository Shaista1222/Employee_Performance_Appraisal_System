import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import uploadChr from '../Services/ChrServices'; // Ensure the path is correct

const AddClassHeldReport = () => {
  const [singleFile, setSingleFile] = useState(null);

  const handleUpload = () => {
    uploadChr(setSingleFile);
  };

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>Class Held Report</Text>
      </View>
      <View style={styles.mainBody}>
        {singleFile != null ? (
          <Text style={styles.textStyle}>
            File Name: {singleFile.name ? singleFile.name : ''}
            {'\n'}
            Type: {singleFile.type ? singleFile.type : ''}
            {'\n'}
            File Size: {singleFile.size ? singleFile.size : ''}
            {'\n'}
            URI: {singleFile.uri ? singleFile.uri : ''}
            {'\n'}
          </Text>
        ) : null}
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={handleUpload}>
          <Text style={styles.buttonTextStyle}>Select File</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={handleUpload}>
          <Text style={styles.buttonTextStyle}>Upload File</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFF',
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
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    backgroundColor: 'black',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
    color: 'white',
  },
});

export default AddClassHeldReport;
