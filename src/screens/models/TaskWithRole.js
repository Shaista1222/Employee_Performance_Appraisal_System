// TaskWithRole.js

export default class TaskWithRole {
    constructor(task, role) {
      this.task = task;
      this.role = role;
    }
  
    getTask() {
      return this.task;
    }
  
    getRole() {
      return this.role;
    }
  }
  