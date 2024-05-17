import React, { useEffect, useState } from 'react';
import { View, Text, Spinner } from 'react-native';
import { DepartmentService } from '../Services/DepartmentService';
import { DesignationService } from '../Services/DesignationService';
import { EmployeeService } from '../Services/EmployeeService';

const AddGroupKpi = () => {
    const [designationList, setDesignationList] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);
    const [employeeTypeList, setEmployeeTypeList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const designationData = await DesignationService.getDesignations();
                const departmentData = await DepartmentService.getDepartments();
                const employeeTypeData = await EmployeeService.getEmployeeTypes();

                setDesignationList(designationData);
                setDepartmentList(departmentData);
                setEmployeeTypeList(employeeTypeData);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <View>
            <Text>Group KPI Fragment</Text>
            {/* Render your spinners here with data from state */}
        </View>
    );
};

export default AddGroupKpi;
