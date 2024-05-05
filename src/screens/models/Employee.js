    class Employee {
        constructor(
          id,
          name,
          email,
          password,
          employeeTypeId,
          salary,
          doj,
          deleted,
          departmentId,
          designationId
        ) {
          this.id = id;
          this.name = name;
          this.email = email;
          this.password = password;
          this.employeeTypeId = employeeTypeId;
          this.salary = salary;
          this.doj = doj;
          this.deleted = deleted;
          this.departmentId = departmentId;
          this.designationId = designationId;
        }      
  }
  
  export default Employee;
  