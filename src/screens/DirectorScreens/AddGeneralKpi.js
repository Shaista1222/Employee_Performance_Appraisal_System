// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, TextInput, Spinner } from 'react-native';
// // import { CommonData } from './CommonData';
// import { KpiWeightageAdjustmentForm } from './KpiWeightageAdjustmentForm';

// const AddGeneralKpi = ({ navigation, route }) => {
//     const [sessionList, setSessionList] = useState([]);
//     const [kpiName, setKpiName] = useState('');
//     const [kpiValue, setKpiValue] = useState('');
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const data = await CommonData.getSessions();
//                 setSessionList(data);
//                 setIsLoading(false);
//             } catch (error) {
//                 console.error(error);
//             }
//         };
//         fetchData();
//     }, []);

//     const handleSaveKpi = () => {
//       console.log('saved')
//     };

//     if (isLoading) {
//         return <Spinner />;
//     }

//     return (
//         <View>
//             <TextInput
//                 value={kpiName}
//                 onChangeText={text => setKpiName(text)}
//                 placeholder="Enter KPI Name"
//             />
//             <TextInput
//                 value={kpiValue}
//                 onChangeText={text => setKpiValue(text)}
//                 placeholder="Enter KPI Value"
//                 keyboardType="numeric"
//             />
//             <Button title="Save KPI" onPress={handleSaveKpi} />
//         </View>
//     );
// };

// export default AddGeneralKpi;
