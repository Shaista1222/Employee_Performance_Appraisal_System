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
    // async compareEmployeeKpiScore(employeeIdsWithSession) {
    //   try {
    //     const response = await fetch(`${IPAddress}/EmployeeKpiPerformance/compareEmployeeKpiScore`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(employeeIdsWithSession),
    //     });
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     const data = await response.json();
    //     return data;
    //   } catch (error) {
    //     throw error;
    //   }
    // },
    compareEmployeeKpiScore: async (employeeIds, sessionId) => {
      try {
        const payload = {
          employeeIds,
          sessionId,
        };
        console.log('Sending request to:', `${IPAddress}/EmployeeKpiPerformance/compareEmployeeKpiScore`);
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