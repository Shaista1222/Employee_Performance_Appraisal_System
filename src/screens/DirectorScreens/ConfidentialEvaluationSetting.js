import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker"; // Import DateTimePickerModal package

const ConfidentialEvaluationSetting = () => {
    const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const showStartTimePicker = () => {
        setStartTimePickerVisible(true);
    };

    const hideStartTimePicker = () => {
        setStartTimePickerVisible(false);
    };

    const handleStartTimeConfirm = (date) => {
        setStartTime(date.toLocaleTimeString());
        hideStartTimePicker();
    };

    const showEndTimePicker = () => {
        setEndTimePickerVisible(true);
    };

    const hideEndTimePicker = () => {
        setEndTimePickerVisible(false);
    };

    const handleEndTimeConfirm = (date) => {
        setEndTime(date.toLocaleTimeString());
        hideEndTimePicker();
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={showStartTimePicker}>
                <Text>Start Time: {startTime}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isStartTimePickerVisible}
                mode="time"
                onConfirm={handleStartTimeConfirm}
                onCancel={hideStartTimePicker}
            />

            <TouchableOpacity onPress={showEndTimePicker}>
                <Text>End Time: {endTime}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isEndTimePickerVisible}
                mode="time"
                onConfirm={handleEndTimeConfirm}
                onCancel={hideEndTimePicker}
            />

            <Button title="Save" onPress={() => { /* Implement save action */ }} />
        </View>
    );
};

export default ConfidentialEvaluationSetting;
