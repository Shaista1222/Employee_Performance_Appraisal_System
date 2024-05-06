import React from 'react';
import { View, Text, TextInput } from 'react-native';

class WeightageAdjustmentAdapter extends React.Component {
    render() {
        const { kpiList } = this.props;
        return (
            <View>
                {kpiList.map((kpi, index) => (
                    <View key={index}>
                        <Text>{kpi.name}</Text>
                        <TextInput
                            placeholder="Enter weightage"
                            keyboardType="numeric"
                            onChangeText={(text) => {/* handle weightage change */}}
                        />
                    </View>
                ))}
            </View>
        );
    }
}

export default WeightageAdjustmentAdapter;
