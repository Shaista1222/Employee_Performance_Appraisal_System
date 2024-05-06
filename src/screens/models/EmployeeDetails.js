// EmployeeDetails.js (continued)
class EmployeeDetails {
    constructor(employee, designation, department, employeeType) {
        this.employee = employee;
        this.designation = designation;
        this.department = department;
        this.employeeType = employeeType;
    }

    set employee(employee) {
        this.employee = employee;
    }

    get department() {
        return this.department;
    }

    set department(department) {
        this.department = department;
    }

    get designation() {
        return this.designation;
    }

    set designation(designation) {
        this.designation = designation;
    }

    get employeeType() {
        return this.employeeType;
    }

    set employeeType(employeeType) {
        this.employeeType = employeeType;
    }
}

export default EmployeeDetails;
