import IPAddress from '../../../IPAddress';
const EmployeeCoursePerformanceService = {
  getEmployeeCoursePerformance: async (employeeID, sessionID, courseID) => {
    try {
      const response = await fetch(
        `${IPAddress}/EmployeeCoursePerformance/employeeCoursePerformance?employeeID=${employeeID}&sessionID=${sessionID}&courseID=${courseID}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getEmployeeCoursesPerformance: async (teacherID, sessionID) => {
    try {
      const response = await fetch(
        `${IPAddress}/EmployeeCoursePerformance/GetEmployeeCoursesPerformance?teacherID=${teacherID}&sessionID=${sessionID}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch employee courses performance');
      }
      const data = await response.json();
      console.log("Data",data);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

//   getEmployeeCoursesPerformance: async (employeeID, sessionID, coursesIds) => {
//     try {
//       const response = await fetch(
//         `${IPAddress}/EmployeeCoursePerformance/GetEmployeeCoursesPerformance`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             employeeID,
//             sessionID,
//             coursesIds,
//           }),
//         },
//       );

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error fetching employee courses performance:', error);
//       throw error;
//     }
//   },

export default EmployeeCoursePerformanceService;
