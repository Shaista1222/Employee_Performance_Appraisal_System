import IPAddress from '../../../IPAddress';

const TaskService = {
  fetchTasks: async endpoint => {
    try {
      const response = await fetch(`${IPAddress}/Task/${endpoint}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      return await response.json();
    } catch (error) {
      throw new Error(
        `  Something went wrong while fetching tasks: ${error.message}`,
      );
    }
  },

  getTasks: async function () {
    return await this.fetchTasks('GetTasks');
  },

  getPendingTasks: async function () {
    return await this.fetchTasks('GetPendingTasks');
  },

  getCompletedTasks: async function () {
    return await this.fetchTasks('GetCompletedTasks');
  },

  getEmployeeTasks: async function (employeeID) {
    return await this.fetchTasks(`GetEmployeeTasks?employeeID=${employeeID}`);
  },

  postTask: async function (task) {
    try {
      const response = await fetch(`${IPAddress}/Task/PostTask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error('Failed to add task');
      }
      return await response.json();
    } catch (error) {
      throw new Error(
        `Something went wrong while adding task: ${error}`,
      );
    }
  },

  postRoleBasedTask: async function (taskWithRole) {
    try {
      const response = await fetch(`${IPAddress}/Task/PostRoleBasedTask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskWithRole),
      });
      if (!response.ok) {
        throw new Error('Failed to add role-based task');
      }
      return await response.json();
    } catch (error) {
      throw new Error(
        ` Something went wrong while adding role-based task: ${error.message}`,
      );
    }
  },
  putTask: async function (task, onSuccess, onFailure) {
    try {
      const response = await fetch(`${IPAddress}/Task/PutTask`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const updatedTask = await response.json();
      onSuccess(updatedTask);
    } catch (error) {
      onFailure(error.message || 'Failed to update task');
    }
  },

  deleteTask: async (id) => {
    try {
      const response = await fetch(`${IPAddress}/Task/DeleteTask?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete Task');
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Error deleting Task: ${error.message}`);
    }
  },
};
export default TaskService;
