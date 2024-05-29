import React from 'react';
import {View, StyleSheet, Dimensions,Text} from 'react-native';
import {BarChart, PieChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;
const chartConfig = {
  backgroundColor: 'gray',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  decimalPlaces: 2,
  style: {
    borderRadius: 16,
  },
};

export const BarChartComponent = () => {
  const barChartData = {
    labels: ['Academic', 'Job Governance'],
    datasets: [
      {
        data: [20, 45,],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <BarChart
        data={barChartData}
        width={screenWidth}
        height={390}
        yAxisLabel="$"
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
    </View>
  );
};

export const PieChartComponent = () => {
  const pieChartData = [
    {
      name: 'Academic',
      population: 500,
      color: '#ffffff',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Job Governance',
      population: 550,
      color: 'rgb(0, 0, 255)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
     <PieChart
        data={pieChartData}
        width={screenWidth}
        height={230}
        chartConfig={chartConfig}
        accessor={'population'}
        backgroundColor={'transparent'}
        absolute
      />
      {/* <View style={styles.legendContainer}>
        {pieChartData.map((data, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, {backgroundColor: data.color}]} />
            <Text style={styles.legendText}>
              {data.name}: {data.population}
            </Text>
          </View>
        ))}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: 50,
    flexDirection: 'column',
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
    color:'black',
  },
});