// Task.js

export default class Task {
    constructor(
      id,
      assigned_to_id,
      assigned_by_id,
      task_description,
      status,
      weightage,
      due_date,
      score,
      assigned_date,
      session_id
    ) {
      this.id = id;
      this.assigned_to_id = assigned_to_id;
      this.assigned_by_id = assigned_by_id;
      this.task_description = task_description;
      this.status = status;
      this.weightage = weightage;
      this.due_date = due_date;
      this.score = score;
      this.assigned_date = assigned_date;
      this.session_id = session_id;
    }
  
    getId() {
      return this.id;
    }
  
    getAssignedToId() {
      return this.assigned_to_id;
    }
  
    getAssignedById() {
      return this.assigned_by_id;
    }
  
    getTaskDescription() {
      return this.task_description;
    }
  
    getStatus() {
      return this.status;
    }
  
    getWeightage() {
      return this.weightage;
    }
  
    getDueDate() {
      return this.due_date;
    }
  
    getScore() {
      return this.score;
    }
  
    getAssignedDate() {
      return this.assigned_date;
    }
  
    getSessionId() {
      return this.session_id;
    }
  }
  