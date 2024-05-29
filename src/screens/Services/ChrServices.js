import DocumentPicker from 'react-native-document-picker';
import IPAddress from '../../../IPAddress'; 

const uploadChr = async (setSingleFile) => {
  try {
    // Pick a file
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });

    if (res) {
      const file = res;
      const fileUri = file.uri;
      const fileType = file.type;
      const fileName = file.name;

      setSingleFile(file);

      const formData = new FormData();
      formData.append('chr', {
        uri: fileUri,
        type: fileType,
        name: fileName,
      });

      const response = await fetch(`http://${IPAddress}/ClassHeldReport/UploadFile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
        alert('File uploaded successfully');
      } else {
        console.error('Failed to upload file: ', response.statusText);
        alert(`Failed to upload file: ${response.statusText}`);
      }
    }
  } catch (err) {
    setSingleFile(null);
    if (DocumentPicker.isCancel(err)) {
      console.log('User canceled the picker');
      alert('Canceled');
    } else {
      console.error('Error uploading file: ', err);
      alert(`Error uploading file: ${err.message}`);
    }
  }
};

export default uploadChr;
