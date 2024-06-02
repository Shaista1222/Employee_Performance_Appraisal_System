import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/theme';

class EmployeeDetailsScoreAdapter extends React.Component {
    render() {
        const { employeeDetailsScore, onPress, index } = this.props;
        return (
            <TouchableOpacity onPress={() => onPress(employeeDetailsScore.employee)}>
                <View style={styles.listItem}>
                    <Text style={styles.rank}>{`#${index + 1}`}</Text>
                    <Text style={styles.name}>{employeeDetailsScore.employee.name}</Text>
                    <Text style={styles.average}>{`${employeeDetailsScore.totalScore}%`}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    rank: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.dark,
    },
    name: {
        fontSize: 16,
        color: COLORS.dark,
    },
    average: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.dark,
    },
});

export default EmployeeDetailsScoreAdapter;
