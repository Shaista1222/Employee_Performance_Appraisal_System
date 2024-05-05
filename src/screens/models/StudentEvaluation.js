class StudentEvaluation {
    constructor(student_id, session_id, teacher_id, question_id, score, course_id) {
      this.student_id = student_id;
      this.session_id = session_id;
      this.teacher_id = teacher_id;
      this.question_id = question_id;
      this.score = score;
      this.course_id = course_id;
    }
  
    getStudent_id() {
      return this.student_id;
    }
  
    getSession_id() {
      return this.session_id;
    }
  
    getTeacher_id() {
      return this.teacher_id;
    }
  
    getQuestion_id() {
      return this.question_id;
    }
  
    getScore() {
      return this.score;
    }
  
    getCourse_id() {
      return this.course_id;
    }
  
    setStudent_id(student_id) {
      this.student_id = student_id;
    }
  
    setSession_id(session_id) {
      this.session_id = session_id;
    }
  
    setTeacher_id(teacher_id) {
      this.teacher_id = teacher_id;
    }
  
    setQuestion_id(question_id) {
      this.question_id = question_id;
    }
  
    setScore(score) {
      this.score = score;
    }
  
    setCourse_id(course_id) {
      this.course_id = course_id;
    }
  }
  
  export default StudentEvaluation;
  