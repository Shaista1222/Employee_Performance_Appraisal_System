import React from 'react';
import { View, Text } from 'react-native';

class EmployeeDetailsListAdapter extends React.Component {
    render() {
        const { employeeDetailsList } = this.props;
        return (
            <View>
                {employeeDetailsList.map((employee, index) => (
                    <View key={index}>
                        <Text>{employee.employee.name}</Text>
                    </View>
                ))}
            </View>
        );
    }
}

export default EmployeeDetailsListAdapter;
