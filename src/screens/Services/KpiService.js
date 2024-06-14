// services/KpiService.js
import IPAddress from '../../../IPAddress';

KpiService = {
  async getKpis() {
    try {
      const response = await fetch(`${IPAddress}/KPI/GetKPIs`);
      if (!response.ok) {
        throw new Error('Failed to fetch KPIs');
      }
      return await response.json();
    } catch (error) {
      throw new Error(
        `Something went wrong while fetching KPIs: ${error.message}`,
      );
    }
  },

  async postGroupKpi(groupKpiWithWeightage) {
    try {
      const response = await fetch(`${IPAddress}/KPI/PostGroupKpi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(groupKpiWithWeightage),
      });
      if (!response.ok) {
        throw new Error('Failed to add Group KPI');
      }
      return await response.json();
    } catch (error) {
      throw new Error(
        `Something went wrong while adding Group KPI: ${error.message}`,
      );
    }
  },

  async postEmployeeKpi(employeeKpi) {
    try {
      const response = await fetch(`${IPAddress}/KPI/PostEmployeeKpi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeKpi),
      });
      if (!response.ok) {
        throw new Error('Failed to add Employee KPI');
      }
      return await response.json();
    } catch (error) {
      throw new Error(
        `Something went wrong while adding Employee KPI: ${error.message}`,
      );
    }
  },
  async getSessionKPIs(sessionID) {
    try {
      const response = await fetch(
        `${IPAddress}/KPI/GetSessionKPIs?sessionID=${sessionID}`,
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  },

  async getKpis() {
    try {
      const response = await fetch(`${IPAddress}/KPI/getKpis`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  async getGroupKpi(groupID, sessionID) {
    try {
      const response = await fetch(
        `${IPAddress}/KPI/getKpiGroup?groupID=${groupID}&sessionID=${sessionID}`,
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  async postGeneralKpi(kpiWithSubKpiWeightages) {
    try {
      const response = await fetch(`${IPAddress}/KPI/postGeneralKpi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(kpiWithSubKpiWeightages),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  async postGroupKpi(groupKpiWithWeightage) {
    try {
      const response = await fetch(`${IPAddress}/KPI/postGroupKpi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(groupKpiWithWeightage),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  async postEmployeeKpi(employeeKpi) {
    try {
      const response = await fetch(`${IPAddress}/KPI/postEmployeeKpi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeKpi),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
  async postKpi(kpiWithSubKpis) {
    try {
      console.log('Sending KPI Data:', JSON.stringify(kpiWithSubKpis, null, 2));

      const response = await fetch(`${IPAddress}/KPI/PostKpi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(kpiWithSubKpis),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(
          `Network response was not ok: ${response.status} - ${response.statusText}`,
        );
      }

      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Error posting KPI:', error);
      throw error;
    }
  },
};
export default KpiService;
