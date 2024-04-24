class Question {
  constructor(id, question, deleted, type_id) {
    this.id = id;
    this.question = question;
    this.deleted = deleted;
    this.type_id = type_id;
  }
  getId() {
    return this.id;
  }
  setId(id) {
    this.id = id;
  }
  getQuestion() {
    return question;
}

setQuestion(question) {
    this.question = question;
}

getDeleted() {
    return deleted;
}

setDeleted(deleted) {
    this.deleted = deleted;
}

getType_id() {
    return type_id;
}

setType_id(type_id) {
    this.type_id = type_id;
}
}

export default Question;

/* 
  package com.example.biitemployeeperformanceappraisalsystem.models;

public class Question {
    private int id;
    private String question;
    private Boolean deleted;
    private Integer type_id;

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public Integer getType_id() {
        return type_id;
    }

    public void setType_id(Integer type_id) {
        this.type_id = type_id;
    }
}
 */
