import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { uploadEnrollmentFile } from '../Services/EnrollmentServices';
import { Button, Text, Card, Title, Paragraph, Snackbar } from 'react-native-paper';

const Enrollment = () => {
  const [file, setFile] = useState(null);
  const [visible, setVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.xls, DocumentPicker.types.xlsx],
      });
      setFile(res[0]);
      console.log("Picked File:", res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Canceled');
      } else {
        Alert.alert('Unknown Error: ' + JSON.stringify(err));
      }
    }
  };

  const handleUploadFile = async () => {
    if (!file) {
      Alert.alert('Please select a file first');
      return;
    }

    const result = await uploadEnrollmentFile(file);

    if (result.success) {
      setSnackbarMessage(result.message);
    } else {
      setSnackbarMessage(result.message);
    }
    setVisible(true);
  };

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>Enrollment Upload</Text>
      </View>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Upload Enrollment File</Title>
            <Paragraph>Please select an Excel file to upload the enrollment data.</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" onPress={pickFile} style={styles.button}>Pick Excel File</Button>
          </Card.Actions>
        </Card>
        {file && <Text style={styles.fileName}>{file.name}</Text>}
        <Button mode="contained" onPress={handleUploadFile} style={styles.uploadButton}>Upload File</Button>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={Snackbar.DURATION_SHORT}
        style={styles.snackbar}
      >
        {snackbarMessage}
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginBottom: 20,
    width: '90%',
  },
  button: {
    marginVertical: 10,
    backgroundColor: '#6360DC',
  },
  uploadButton: {
    marginTop: 20,
    backgroundColor: '#6360DC',
  },
  fileName: {
    marginVertical: 8,
    color: 'black',
  },
  title: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#6360DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 24,
    color: '#fff',
  },
  snackbar: {
    backgroundColor: '#6360DC',
  },
});

export default Enrollment;
