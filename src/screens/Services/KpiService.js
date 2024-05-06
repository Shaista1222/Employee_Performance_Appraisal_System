import IPAddress from '../../../IPAddress';

export default class KpiService {
  async getKpis() {
    try {
      const response = await fetch(`${IPAddress}/KPI/kpis`);
      if (!response.ok) {
        throw new Error('Failed to fetch KPIs');
      }
      return await response.json();
    } catch (error) {
      throw new Error(
        `Something went wrong while fetching KPIs: ${error.message}`,
      );
    }
  }

  async postKpi(kpiData) {
    try {
      const response = await fetch(`${IPAddress}/KPI/kpis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(kpiData),
      });
      if (!response.ok) {
        throw new Error('Failed to add KPI');
      }
      return await response.json();
    } catch (error) {
      throw new Error(
        `Something went wrong while adding KPI: ${error.message}`,
      );
    }
  }
}
