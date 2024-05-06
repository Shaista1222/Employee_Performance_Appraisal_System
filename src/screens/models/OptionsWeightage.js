// OptionsWeightage.js
class OptionsWeightage {
    constructor(id, name, weightage) {
        this.id = id;
        this.name = name;
        this.weightage = weightage;
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

    getWeightage() {
        return this.weightage;
    }

    setWeightage(weightage) {
        this.weightage = weightage;
    }
}

export default OptionsWeightage;
