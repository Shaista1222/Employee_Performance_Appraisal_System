// EmployeeDetailsScore.js
import EmployeeDetails from './EmployeeDetails'; // Import the EmployeeDetails class if it's in a separate file

class EmployeeDetailsScore extends EmployeeDetails {
    constructor(employee, designation, department, employeeType, totalScore) {
        super(employee, designation, department, employeeType);
        this.totalScore = totalScore;
    }

    getTotalScore() {
        return this.totalScore;
    }

    setTotalScore(totalScore) {
        this.totalScore = totalScore;
    }
}

export default EmployeeDetailsScore;
