import IPAddress from '../../../IPAddress';

const TaskService = {
  fetchTasks: async (endpoint) => {
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

  getTasks: async function() {
    return await this.fetchTasks('GetTasks');
  },
  
  getPendingTasks: async function() {
    return await this.fetchTasks('GetPendingTasks');
  },

  getCompletedTasks: async function() {
    return await this.fetchTasks('GetCompletedTasks');
  },
  
  getEmployeeTasks: async function(employeeId) {
    return await this.fetchTasks(`GetEmployeeTasks/${employeeId}`);
  },

  postTask: async function(task) {
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
        `Something went wrong while adding task: ${error.message}`,
      );
    }
  },

  postRoleBasedTask: async function(taskWithRole) {
    try {
      const response = await fetch(
       ` ${IPAddress}/Task/PostRoleBasedTask`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskWithRole),
        },
      );
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
};
export default TaskService;