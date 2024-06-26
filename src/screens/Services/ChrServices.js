import IPAddress from '../../../IPAddress';

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('chr', {
    name: file.name,
    type: file.type,
    uri: file.uri,
  });

  try {
    const response = await fetch(`${IPAddress}/ClassHeldReport/UploadFile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    console.log('Response Status:', response.status);

    if (response.ok) {
      return { success: true, message: 'File uploaded successfully' };
    } else {
      const errorData = await response.json();
      return { success: false, message: errorData.message };
    }
  } catch (error) {
    console.log('Error Data:', error.message);
    return { success: false, message: error.message };
  }
};

export { uploadFile };
