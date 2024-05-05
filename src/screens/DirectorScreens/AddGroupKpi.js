import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import { Spinner } from 'native-base'; // Assuming you're using native-base for spinners
import SessionServiceListner from '../Services/SessionServiceListner';
import DesignationService from '../Services/DesignationService';
import DepartmentService from '../Services/DepartmentService';
import EmployeeService from '../Services/EmployeeService';

const AddGroupKpi = () => {
    const [sessionList, setSessionList] = useState([]);
    const [designationList, setDesignationList] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);
    const [employeeTypeList, setEmployeeTypeList] = useState([]);

    useEffect(() => {
        // Simulating service calls
        const getSessionData = async () => {
            SessionServiceListner.getSessions()
            .then(sessions => setSessionList(sessions))
            .catch(error => console.error(error));
        };

            const getDesignationData = async () => {
                DesignationService.getDesignationData()
                .then(designationList => setDesignationList(designationList))
                .catch(error => console.error(error));
            };

       
            const getDepartmentData = async () => {
                DepartmentService.getDepartmentData()
                .then(departmentList => setDepartmentList(departmentList))
                .catch(error => console.error(error));
            };
        
            const getEmployeeTypeData = async () => {
                EmployeeService.getEmployeeTypes()
                .then(employeeTypeList => setEmployeeTypeList(employeeTypeList))
                .catch(error => console.error(error));
            };

        getSessionData();
        getDesignationData();
        getDepartmentData();
        getEmployeeTypeData();
    }, []);

    return (
        <View>
            {/* Render your spinners here */}
        </View>
    );
};

export default AddGroupKpi;
