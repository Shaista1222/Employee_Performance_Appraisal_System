// KpiWeightage.js
class KpiWeightage {
    constructor(kpi_id, session_id, weightage) {
        this.kpi_id = kpi_id;
        this.session_id = session_id;
        this.weightage = weightage;
    }

    getKpi_id() {
        return this.kpi_id;
    }

    setKpi_id(kpi_id) {
        this.kpi_id = kpi_id;
    }

    getSession_id() {
        return this.session_id;
    }

    setSession_id(session_id) {
        this.session_id = session_id;
    }

    getWeightage() {
        return this.weightage;
    }

    setWeightage(weightage) {
        this.weightage = weightage;
    }
}

export default KpiWeightage;
