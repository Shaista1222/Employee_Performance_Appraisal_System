import { Alert } from "react-native";
import IPAddress from "../../../IPAddress";

const getTeacherJuniors = async (teacherID, sessionID) => {
  try {
    const response = await fetch(`${IPAddress}/JuniorEmployee/GetTeacherJuniors?teacherID=${teacherID}&sessionID=${sessionID}`);
    if (!response.ok) {
      Alert('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    Alert(error);
  }
};

export default { getTeacherJuniors };
