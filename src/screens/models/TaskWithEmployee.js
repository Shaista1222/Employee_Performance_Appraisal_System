// TaskWithEmployees.js
import Task from './Task'
import Employee from './Employee'

export default class TaskWithEmployee {
  constructor(task, assignedTo, assignedBy) {
    this.task = task;
    this.assignedTo = assignedTo;
    this.assignedBy = assignedBy;
  }

  static fromJson(json) {
    const task = Task.fromJson(json.task);
    const assignedTo = Employee.fromJson(json.assigned_to);
    const assignedBy = Employee.fromJson(json.assigned_by);
    return new TaskWithEmployees(task, assignedTo, assignedBy);
  }
}
/* export default class TaskWithEmployees {
    constructor(task, assigned_to, assigned_by) {
      this.task = task;
      this.assigned_to = assigned_to;
      this.assigned_by = assigned_by;
    }
  
    getTask() {
      return this.task;
    }
  
    getAssignedTo() {
      return this.assigned_to;
    }
  
    getAssignedBy() {
      return this.assigned_by;
    }
  }
   */