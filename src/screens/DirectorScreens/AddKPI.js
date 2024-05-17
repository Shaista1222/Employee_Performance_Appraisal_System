import React, { useState } from 'react';
import { View } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import AddGeneralKpi from './AddGeneralKpi';
import AddGroupKpi from './AddGroupKpi';
import AddIndividualKpi from './AddIndividualKpi';

const AddKpi = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'general', title: 'General' },
        { key: 'group', title: 'Group' },
        { key: 'individual', title: 'Individual' },
        // Add more routes for additional tabs
    ]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'general':
                return <AddGeneralKpi />;
            case 'group':
                return <AddGroupKpi />;
            case 'individual':
                return <AddIndividualKpi />;
            // Add more cases for additional tabs
            default:
                return null;
        }
    };

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: 'blue' }}
        />
    );

    return (
        <View style={{ flex: 1 }}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
            />
        </View>
    );
};

export default AddKpi;