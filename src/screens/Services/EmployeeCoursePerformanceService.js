import IPAddress from "../../../IPAddress";
const EmployeeCoursePerformanceService = {
  getEmployeeCoursePerformance: async (employeeID, sessionID, courseID) => {
    try {
      const response = await fetch(`${IPAddress}/EmployeeCoursePerformance/employeeCoursePerformance?employeeID=${employeeID}&sessionID=${sessionID}&courseID=${courseID}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getEmployeeCoursesPerformance: async (employeeCoursesPerformanceRequest) => {
    try {
      const response = await fetch(`${IPAddress}/EmployeeCoursePerformance/employeeCoursesPerformance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeCoursesPerformanceRequest)
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Define other methods similarly
};

export default EmployeeCoursePerformanceService;
