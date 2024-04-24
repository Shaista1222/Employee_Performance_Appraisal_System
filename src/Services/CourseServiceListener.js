import IPAddress from '../../IPAddress';

const CourseServiceListener = {
  getCourses: async() => {
    return fetch(`http://${IPAddress}/api/Course/GetCourses`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        return response.json();
      });
  },
  getTeacherCourses: async(teacherID) => {
    return fetch(`http://${IPAddress}/api/Course/GetTeacherCourses?teacherID=${teacherID}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch teacher courses');
        }
        return response.json();
      });
  },
  getStudentCourses: async(studentID, sessionID) => {
    return fetch(`http://${IPAddress}/api/Course/GetStudentCourses?studentID=${studentID}&sessionID=${sessionID}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch student courses');
        }
        return response.json();
      });
  },
  getCourseTeachers: async(studentID, courseID, sessionID) => {
    return fetch(`http://${IPAddress}/api/Course/GetCourseTeachers?studentID=${studentID}&courseID=${courseID}&sessionID=${sessionID}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch course teachers');
        }
        return response.json();
      });
  }
  
};

export default CourseServiceListener;
