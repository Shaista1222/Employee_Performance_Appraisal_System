import IPAddress from "../../../IPAddress"
const EmployeeKPIPerformance={

    getKpiEmployeePerformance: async(employeeID,sessionID)=>{
        return await fetch(`${IPAddress}/EmployeeKpiPerformance/GetKpiEmployeePerformance?employeeID=${employeeID}&sessionID=${10}`)
        .then(async response => {
          if (!response.ok) {
            throw new Error('Failed to fetch Employee Kpi Performance');
          }
          // const res =  response.json();
          // console.log(response.json());
          return await response.json();
        });
    }

}
export default EmployeeKPIPerformance