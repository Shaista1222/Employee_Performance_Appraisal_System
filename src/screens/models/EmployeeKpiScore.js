
// EmployeeKpiScore.js
class EmployeeKpiScore {
    constructor(kpi_id, employee_id, session_id, score, total_score) {
        this.kpi_id = kpi_id;
        this.employee_id = employee_id;
        this.session_id = session_id;
        this.score = score;
        this.total_score = total_score;
    }

    getKpi_id() {
        return this.kpi_id;
    }

    setKpi_id(kpi_id) {
        this.kpi_id = kpi_id;
    }

    getEmployee_id() {
        return this.employee_id;
    }

    setEmployee_id(employee_id) {
        this.employee_id = employee_id;
    }

    getSession_id() {
        return this.session_id;
    }

    setSession_id(session_id) {
        this.session_id = session_id;
    }

    getScore() {
        return this.score;
    }

    setScore(score) {
        this.score = score;
    }

    getTotal_score() {
        return this.total_score;
    }

    setTotal_score(total_score) {
        this.total_score = total_score;
    }
}

export default EmployeeKpiScore;
