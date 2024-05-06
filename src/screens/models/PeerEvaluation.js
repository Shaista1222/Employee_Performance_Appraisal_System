// PeerEvaluation.js
class PeerEvaluation {
    constructor(evaluator_id, evaluatee_id, question_id, session_id, score) {
        this.evaluator_id = evaluator_id;
        this.evaluatee_id = evaluatee_id;
        this.question_id = question_id;
        this.session_id = session_id;
        this.score = score;
    }

    getEvaluator_id() {
        return this.evaluator_id;
    }

    setEvaluator_id(evaluator_id) {
        this.evaluator_id = evaluator_id;
    }

    getEvaluatee_id() {
        return this.evaluatee_id;
    }

    setEvaluatee_id(evaluatee_id) {
        this.evaluatee_id = evaluatee_id;
    }

    getQuestion_id() {
        return this.question_id;
    }

    setQuestion_id(question_id) {
        this.question_id = question_id;
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
}

export default PeerEvaluation;
