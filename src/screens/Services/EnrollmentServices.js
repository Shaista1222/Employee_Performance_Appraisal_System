import IPAddress from '../../../IPAddress';

const uploadEnrollmentFile = async (file) => {
  const formData = new FormData();
  formData.append('enrollment', {
    name: file.name,
    type: file.type,
    uri: file.uri,
  });

  try {
    const response = await fetch(`${IPAddress}/Enrollment/UploadFile`, {
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
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: 'An unknown error occurred' };
      }
      return { success: false, message: errorData.message };
    }
  } catch (error) {
    console.log('Error Data:', error.message);
    return { success: false, message: error.message };
  }
};

export { uploadEnrollmentFile };
