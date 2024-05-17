import React, { useState, useEffect } from 'react';
import { View, Text, ToastAndroid } from 'react-native';
import CommonData from './DirectorScreens/CommonData';
import { SessionService } from './SessionService'; // Import your SessionService if available
import { Tab, Tabs, TabHeading, Spinner } from 'native-base'; // Import your preferred UI components

const PerformanceFragment = () => {
    const [sessionList, setSessionList] = useState([]);
    const [selectedSessionId, setSelectedSessionId] = useState(null);
    const [fromSessionId, setFromSessionId] = useState(null);
    const [toSessionId, setToSessionId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const sessionService = new SessionService();
                const sessions = await sessionService.getSessions();
                setSessionList(sessions);
                setLoading(false);
            } catch (error) {
                ToastAndroid.show(error.message, ToastAndroid.SHORT);
                setLoading(false);
            }
        };

        fetchSessions();

        // Cleanup function
        return () => {
            // Perform any cleanup if needed
        };
    }, []);

    const renderTabs = () => {
        if (loading) {
            return <Spinner color="blue" />;
        }

        return (
            <Tabs>
                <Tab heading={<TabHeading><Text>Performance Type 1</Text></TabHeading>}>
                    <Text>Content for Performance Type 1</Text>
                </Tab>
                <Tab heading={<TabHeading><Text>Performance Type 2</Text></TabHeading>}>
                    <Text>Content for Performance Type 2</Text>
                </Tab>
            </Tabs>
        );
    };

    return (
        <View>
            <View>
                {/* Your course spinner */}
            </View>
            <View>
                {/* Your session spinners */}
            </View>
            <View>
                {renderTabs()}
            </View>
        </View>
    );
};

export default PerformanceFragment;
