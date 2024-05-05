import IPAddress from '../../../IPAddress';

const TaskService = {
  fetchTasks: async (endpoint) => {
    try {
      const response = await fetch(`http://${IPAddress}/api/Task/${endpoint}`);
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
    return await this.fetchTasks('pendingTasks');
  },

  getCompletedTasks: async function() {
    return await this.fetchTasks('completedTasks');
  },
  
  getEmployeeTasks: async function(employeeId) {
    return await this.fetchTasks(`employeeTasks/${employeeId}`);
  },

  postTask: async function(task) {
    try {
      const response = await fetch(`http://${IPAddress}/api/Task/PostTask`, {
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
       ` http://${IPAddress}/api/Task/roleBasedTasks`,
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