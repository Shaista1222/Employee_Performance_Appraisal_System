// EmployeeRole.js
import Designation from './Designation'; // Import the Designation class if it's in a separate file
import Department from './Department'; // Import the Department class if it's in a separate file
import EmployeeType from './EmployeeType'; // Import the EmployeeType class if it's in a separate file

class EmployeeRole {
    constructor(designation, department, employeeType) {
        this.designation = designation;
        this.department = department;
        this.employeeType = employeeType;
    }

    getDesignation() {
        return this.designation;
    }

    setDesignation(designation) {
        this.designation = designation;
    }

    getDepartment() {
        return this.department;
    }

    setDepartment(department) {
        this.department = department;
    }

    getEmployeeType() {
        return this.employeeType;
    }

    setEmployeeType(employeeType) {
        this.employeeType = employeeType;
    }
}

export default EmployeeRole;
