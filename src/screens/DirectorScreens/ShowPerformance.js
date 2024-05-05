import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {VictoryPie} from 'victory-native';
import Svg from 'react-native-svg';

const showPerformance = () => {
  // const { employeeDetailsList } = this.props;
  // Define the data for the pie chart
  const data = [
    {x: 'Project', y: 30},
    {x: 'Administrative', y: 20},
    {x: 'Academic', y: 25},
    {x: 'Punctuality', y: 25},
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>KPI</Text>
      {/* You can add dropdown or other UI elements here */}
      <Svg style={styles.chartContainer}>
        <VictoryPie
          data={data}
          colorScale={['green', 'orange', 'brown', 'purple']}
          innerRadius={70} // Adjust as needed for the cutout
          labelRadius={({innerRadius}) => innerRadius + 15} // Adjust label position
          style={{
            labels: {fill: 'white', fontSize: 16, fontWeight: 'bold'},
          }}
        />
      </Svg>
      <Text style={styles.label}>Description Label</Text>
      {/* Add buttons or other UI elements */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50, // Adjust to fit your design
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chartContainer: {
    height: 300, // Adjust based on your design
    width: 300, // Adjust based on your design
  },
  label: {
    fontSize: 18,
    margin: 10,
  },
});

export default showPerformance; // Exporting the PieChart component

// import React from 'react';
// import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import {PieChart} from 'react-native-chart-kit';
// import Color from 'color';
// const chartConfig = {
//   backgroundGradientFrom: '#1E2923',
//   backgroundGradientFromOpacity: 0,
//   backgroundGradientTo: '#08130D',
//   backgroundGradientToOpacity: 0.5,
//   color: (opacity = 1) => Color('purple').alpha(opacity).rgb().string(),
//   strokeWidth: 2,
//   barPercentage: 0.5,
//   useShadowColorFromDataset: false, // optional
// };

// const data = [
//   {
//     name: 'Punctuality',
//     population: 25,
//     color: 'purple',
//     legendFontColor: '#7F7F7F',
//     legendFontSize: 15,
//   },
//   {
//     name: 'Project',
//     population: 30,
//     color: 'green',
//     legendFontColor: '#7F7F7F',
//     legendFontSize: 15,
//   },
//   {
//     name: 'Administrative',
//     population: 20,
//     color: 'brown',
//     legendFontColor: '#7F7F7F',
//     legendFontSize: 15,
//   },
//   {
//     name: 'Academic',
//     population: 25,
//     color: 'orange',
//     legendFontColor: '#7F7F7F',
//     legendFontSize: 15,
//   },
// ];

// const ShowKPI = () => {
  
//   return (
//     <View style={styles.container}>
//       <PieChart
//         data={data}
//         width={350}
//         height={220}
//         chartConfig={chartConfig}
//         accessor={'population'}
//         backgroundColor={'transparent'}
//         paddingLeft={'15'}
//         center={[0, 0]}
//         innerRadius={70}
//         absolute
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     alignContent: 'center',
//     marginTop: 190,
//   },
  
// });

// export default ShowKPI;
