import { Alert } from "react-native";
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
    console.log('Full response:', response);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response text:', errorText);
      throw new Error(`Network response was not ok: ${response.statusText} (${response.status})`);
    }
    const data = await response.json();
    console.log('Fetched sub KPIs:', data);
    return data;
  } catch (error) {
    console.error('Error fetching sub KPIs:', error);
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

export const getSubKpiEmployeePerformance = async (employeeID, sessionID) => {
  try {
    const response = await fetch(`${IPAddress}/EmployeeSubKpiPerformance/GetSubKpiEmployeePerformance?employeeID=${employeeID}&sessionID=${sessionID}`);
    if (!response.ok) {
      Alert('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getSubKpiMultiEmployeePerformance = async (employeeIDs, sessionID) => {
  try {
    // Create URLSearchParams object to handle multiple query parameters
    const params = new URLSearchParams();
    employeeIDs.forEach(id => params.append('employeeIDs', id));
    params.append('sessionID', sessionID);

    // Construct the full URL with query parameters
    const url = `${IPAddress}/EmployeeSubKpiPerformance/GetSubKpiMultiEmployeePerformance?${params.toString()}`;

    const response = await fetch(url);
    console.log(response);
    if (!response.ok) {
      Alert.alert('Network response was not ok');
      return [];
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching sub-KPI performance data:', error);
    Alert.alert('Error', error.message);
    return [];
  }
};
