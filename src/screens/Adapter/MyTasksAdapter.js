import React from 'react';
import { View, Text } from 'react-native';

class MyTasksAdapter extends React.Component {
    render() {
        const { tasks } = this.props;
        return (
            <View>
                {tasks.map((task, index) => (
                    <View key={index}>
                        <Text>{task.task.task_description}</Text>
                        <Text>{`Due: ${new Date(task.task.due_date).toGMTString()}`}</Text>
                        <Text>{`By: ${task.assigned_by.name}`}</Text>
                    </View>
                ))}
            </View>
        );
    }
}

export default MyTasksAdapter;
