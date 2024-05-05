// Define the Course class
class Course {
    constructor(id, title, courseCode) {
      this.id = id;
      this.title = title;
      this.courseCode = courseCode;
    }
  
    // Getter and setter methods for id
    getId() {
      return this.id;
    }
    setId(id) {
      this.id = id;
    }
  
    // Getter and setter methods for title
    getTitle() {
      return this.title;
    }
    setTitle(title) {
      this.title = title;
    }
  
    // Getter and setter methods for course code
    getCourseCode() {
      return this.courseCode;
    }
    setCourseCode(courseCode) {
      this.courseCode = courseCode;
    }
  }
  
  export default Course;
  