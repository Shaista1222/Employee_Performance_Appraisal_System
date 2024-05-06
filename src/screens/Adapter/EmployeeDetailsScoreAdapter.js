import React from 'react';
import { View, Text } from 'react-native';

class EmployeeDetailsScoreAdapter extends React.Component {
    render() {
        const { employeeDetailsList } = this.props;
        return (
            <View>
                {employeeDetailsList.map((employee, index) => (
                    <View key={index}>
                        <Text>{`#${index + 1}`}</Text>
                        <Text>{employee.employee.name}</Text>
                        <Text>{`${employee.totalScore}%`}</Text>
                    </View>
                ))}
            </View>
        );
    }
}

export default EmployeeDetailsScoreAdapter;
