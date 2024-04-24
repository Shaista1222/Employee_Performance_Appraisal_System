class Student {
    constructor(id, name, aridNo, semester, section, cgpa, discipline, password) {
      this.id = id;
      this.name = name;
      this.aridNo = aridNo;
      this.semester = semester;
      this.section = section;
      this.cgpa = cgpa;
      this.discipline = discipline;
      this.password = password;
    }
  
    getId() {
      return this.id;
    }
  
    getName() {
      return this.name;
    }
  
    getAridNo() {
      return this.aridNo;
    }
  
    getSemester() {
      return this.semester;
    }
  
    getSection() {
      return this.section;
    }
  
    getCgpa() {
      return this.cgpa;
    }
  
    getDiscipline() {
      return this.discipline;
    }
  
    getPassword() {
      return this.password;
    }
  
    setId(id) {
      this.id = id;
    }
  
    setName(name) {
      this.name = name;
    }
  
    setAridNo(aridNo) {
      this.aridNo = aridNo;
    }
  
    setSemester(semester) {
      this.semester = semester;
    }
  
    setSection(section) {
      this.section = section;
    }
  
    setCgpa(cgpa) {
      this.cgpa = cgpa;
    }
  
    setDiscipline(discipline) {
      this.discipline = discipline;
    }
  
    setPassword(password) {
      this.password = password;
    }
  }
  
  export default Student;
  