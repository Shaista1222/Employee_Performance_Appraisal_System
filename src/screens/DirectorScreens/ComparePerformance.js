import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BarChart} from 'react-native-chart-kit';
import {rgba} from 'react-native-redash';
import {hexToRgb} from 'react-native-chart-kit';
import Color from 'color';

const chartConfig = {
  backgroundGradientFrom: 'blue',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: 'orange',
  backgroundGradientToOpacity: 0,
  // color: (opacity = 1) => rgba(0, 0, 0, {opacity}),
  // color: (opacity = 1) => hexToRgb('#000000', opacity),
  color: (opacity = 1) => Color('purple').alpha(opacity).rgb().string(),
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const data = {
  labels: ['Academic', 'Project', 'Punctuality'],
  datasets: [
    {
      data: [27, 30, 26],
    },
    {
      data: [32, 35, 28],
    },
    {
      data: [40, 35, 23],
    },
  ],
};
const CompareKPI = () => {
  return (
    <View style={styles.container}>
      <BarChart
        data={data}
        width={styles.chart.width}
        height={220}
        yAxisLabel=""
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {
    width: 300,
  },
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#f5f5f5',
  },
});
export default CompareKPI;
