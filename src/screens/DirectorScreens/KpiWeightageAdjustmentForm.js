import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const KpiWeightageAdjustmentForm = ({ route }) => {
    const { pieChartValues, pieChartTitles } = route.params;
    const [inputValues, setInputValues] = useState(pieChartValues);

    const calculateTotalSum = () => {
        let sum = 0;
        inputValues.forEach(value => {
            sum += parseFloat(value) || 0;
        });
        return sum;
    };

    const distributeAdjustment = (adjustment, excludeIndex) => {
        const totalSumExcluding = calculateTotalSum();
        const totalAdjustment = inputValues.reduce((acc, value, index) => {
            if (index !== excludeIndex) {
                const adjustmentRatio = parseFloat(value) / totalSumExcluding;
                const individualAdjustment = adjustmentRatio * adjustment;
                inputValues[index] = parseFloat(value) - individualAdjustment;
                return acc + individualAdjustment;
            }
            return acc;
        }, 0);

        if (excludeIndex !== null) {
            inputValues[excludeIndex] = parseFloat(inputValues[excludeIndex]) - (adjustment - totalAdjustment);
        }

        setInputValues([...inputValues]);
    };

    return (
        <View>
            {pieChartTitles.map((title, index) => (
                <View key={index}>
                    <Text>{title}</Text>
                    <TextInput
                        value={inputValues[index].toString()}
                        onChangeText={(text) => {
                            const newValue = parseFloat(text) || 0;
                            const adjustment = newValue - parseFloat(inputValues[index]) || 0;
                            inputValues[index] = newValue;
                            setInputValues([...inputValues]);

                            const totalSum = calculateTotalSum();
                            if (totalSum > 100) {
                                distributeAdjustment(100 - totalSum, index);
                            }
                        }}
                    />
                </View>
            ))}
            <Button
                title="Save"
                onPress={() => {
                    // Implement your save logic here using inputValues
                }}
            />
        </View>
    );
};

export default KpiWeightageAdjustmentForm;
