// EmployeeQuestionScore.js
import Question from './Question'; // Import the Question class if it's in a separate file

class EmployeeQuestionScore {
    constructor(question, obtainedScore, totalScore) {
        this.question = question;
        this.obtainedScore = obtainedScore;
        this.totalScore = totalScore;
    }

    getQuestion() {
        return this.question;
    }

    setQuestion(question) {
        this.question = question;
    }

    getObtainedScore() {
        return this.obtainedScore;
    }

    setObtainedScore(obtainedScore) {
        this.obtainedScore = obtainedScore;
    }

    getTotalScore() {
        return this.totalScore;
    }

    setTotalScore(totalScore) {
        this.totalScore = totalScore;
    }
}

export default EmployeeQuestionScore;
