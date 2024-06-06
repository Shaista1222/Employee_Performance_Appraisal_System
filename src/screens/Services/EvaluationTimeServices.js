import { Alert } from "react-native";
import IPAddress from "../../../IPAddress";
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Something went wrong');
  }
  return response.json();
};

export const isEvaluationTime = async (sessionID, evaluationType) => {
  try {
    const response = await fetch(`${IPAddress}/EvaluationTime/isEvaluationTime?sessionID=${sessionID}&evaluationType${evaluationType}`);
    return handleResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const checkDegreeExitEligibility = async (studentID) => {
  try {
    const response = await fetch(`${IPAddress}/EvaluationTime/checkDegreeExitEligibility?studentID=${studentID}`);
    // return JSON.parse(response);
    return handleResponse(response);
  } catch (error) {
    Alert(' You are not eligible for degree exit evaluation');
  }
};

export const checkConfidentialPin = async (sessionID, pin) => {
  try {
    const response = await fetch(`${IPAddress}/EvaluationTime/checkConfidentialPin?sessionID=${sessionID}&pin=${pin}`);
    return handleResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const postEvaluationTime = async (evaluationTime) => {
  try {
    const response = await fetch(`${IPAddress}/EvaluationTime/PostEvaluationTime`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(evaluationTime),
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const putEvaluationTime = async (evaluationTime) => {
  try {
    const response = await fetch(`${IPAddress}/EvaluationTime/putEvaluationTime`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(evaluationTime),
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};
