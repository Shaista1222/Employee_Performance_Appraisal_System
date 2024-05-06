// KPI.js
import KpiWeightage from './KpiWeightage'; // Import the KpiWeightage class if it's in a separate file

class KPI {
    constructor(id, name, kpiWeightage) {
        this.id = id;
        this.name = name;
        this.kpiWeightage = kpiWeightage;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getKpiWeightage() {
        return this.kpiWeightage;
    }

    setKpiWeightage(kpiWeightage) {
        this.kpiWeightage = kpiWeightage;
    }
}

export default KPI;
