import IPAddress from "../../../IPAddress"
const EmployeeKPIPerformance={

    getKpiEmployeePerformance: async(employeeID,sessionID)=>{
        return await fetch(`${IPAddress}/EmployeeKpiPerformance/GetKpiEmployeePerformance?employeeID=${employeeID}&sessionID=${sessionID}`)
        .then(async response => {
          if (!response.ok) {
            throw new Error('Failed to fetch Employee Kpi Performance');
          }
          // const res =  response.json();
          // console.log(response.json());
          return await response.json();
        });
    },
    compareKpiEmployeePerformanceYearly: async(employeeIDs,year,Kpi_id)=>{
      return await fetch(`${IPAddress}/EmployeeKpiPerformance/CompareKpiEmployeePerformanceYearly?employeeIDs=${employeeIDs}&year=${year}&Kpi_id=${Kpi_id}`)
      .then(async response => {
        if (!response.ok) {
          throw new Error('Failed to fetch Employee Kpi Performance yearly');
        }
        // const res =  response.json();
        // console.log(response.json());
        return await response.json();
      });
  },
    compareEmployeeKpiScore : async (employeeIds, session_id) => {
      try {
        const payload = {
          employeeIds,
          session_id,
        };
        console.log('Sending request to:', `${IPAddress}/EmployeeKpiPerformance/CompareKpiEmployeePerformance`);
        console.log('Payload:', payload);
    
        const response = await fetch(
          `${IPAddress}/EmployeeKpiPerformance/CompareKpiEmployeePerformance`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          },
        );
    
        if (!response.ok) {
          console.error('Response status:', response.status);
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        console.log('Response Data:', data);
        return data;
      } catch (error) {
        console.error('Error fetching employee Multiple KPI performance:', error);
        throw error;
      }
    },
    async getEmployeeKpiScoreMultiSession(employeeID, startingSessionID, endingSessionID) {
      try {
        const response = await fetch(`${IPAddress}/EmployeeKpiPerformance/employeeKpiScoreMultiSession?employeeID=${employeeID}&startingSessionID=${startingSessionID}&endingSession=${endingSessionID}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw error;
      }
    }
}
export default EmployeeKPIPerformance