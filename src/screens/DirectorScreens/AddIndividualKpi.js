import React from 'react';
import { View, Text, Spinner } from 'react-native';
import { CommonData } from './CommonData';

const AddIndividualKpiFragment = () => {
    const [names, setNames] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const commonData = new CommonData();
                const generatedNames = await commonData.generateNames();
                setNames(generatedNames);
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
            <Text>Individual KPI Fragment</Text>
            {/* Render your spinner here with data from state */}
        </View>
    );
};

export default AddIndividualKpiFragment;
