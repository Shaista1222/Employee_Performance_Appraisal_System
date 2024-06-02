import IPAddress from '../../../IPAddress';

const CourseServiceListener = {
  getCourses: async() => {
    return fetch(`${IPAddress}/Course/GetCourses`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        return response.json();
      });
  },
  getTeacherCourses: async(teacherID,sessionID) => {
    return fetch(`${IPAddress}/Course/GetTeacherCourses?teacherID=${teacherID}&sessionID=${sessionID}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch teacher courses');
        }
        return response.json();
      });
  },
  getStudentCourses: async(studentID, sessionID) => {
    return fetch(`${IPAddress}/Course/GetStudentCourses?studentID=${studentID}&sessionID=${sessionID}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch student courses');
        }
        return response.json();
      });
  },
  getCourseTeachers: async(studentID, courseID, sessionID) => {
    return fetch(`${IPAddress}/Course/GetCourseTeachers?studentID=${studentID}&courseID=${courseID}&sessionID=${sessionID}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch course teachers');
        }
        return response.json();
      });
  }
  
};

export default CourseServiceListener;

/*
getStudentCourses: async (studentID, sessionID) => {
    try {
        const response = await fetch(`${IPAddress}/Course/GetStudentCourses?studentID=${studentID}&sessionID=${sessionID}`);
        if (!response.ok) {
            throw new Error('Failed to fetch student courses');
        }
        const data = await response.json();
        await AsyncStorage.setItem('student', JSON.stringify(data));
        return data;
    } catch (error) {
        throw error;
    }
}


*/ 