import IPAddress from "../../../IPAddress";

export const getAvailableSubKpis = async (sessionID) => {
  try {
    const response = await fetch(`${IPAddress}/SubKpi/getAvailableSubKpis?sessionID=${sessionID}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getSubKPIs = async (sessionID) => {
  try {
    const response = await fetch(`${IPAddress}/SubKpi/getSubKPIs?sessionID=${sessionID}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getSubKPIsOfKpi = async (kpi_id, sessionID) => {
  try {
    const response = await fetch(`${IPAddress}/SubKpi/getSubKPIsOfKpi?kpi_id=${kpi_id}&sessionID=${sessionID}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
