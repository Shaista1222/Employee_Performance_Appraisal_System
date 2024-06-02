import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

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

export const BarChartComponent = ({ data = [] }) => {
  console.log(data);
  const chartData = {
    labels: data.length > 0 ? data.map(item => item.kpi_title) : [],
    datasets: [
      {
        data: data.length > 0 ? data.map(item => item.score) : [],
      },
    ],
  };

  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <BarChart
          data={chartData}
          width={screenWidth}
          height={390}
          yAxisLabel=""
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        />
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    flexDirection: 'column',
    alignItems: 'center',
  },
});
