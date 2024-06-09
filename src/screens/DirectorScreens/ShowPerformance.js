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

// Function to generate a random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
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

  // Generate random colors for each bar
  const barColors = data.map(() => getRandomColor());

  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <BarChart
          data={chartData}
          width={screenWidth}
          height={390}
          yAxisLabel=""
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Default color for other elements
          }}
          verticalLabelRotation={30}
          fromZero={true}
          showValuesOnTopOfBars={true}
          renderBar={({ index, ...rest }) => (
            <View
              key={index}
              style={{
                backgroundColor: barColors[index],
                ...rest,
              }}
            />
          )}
        />
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
};

export const SessionBarChartComponent = ({ data = [] }) => {
  console.log(data);
  const chartData = {
    labels: data.length > 0 ? data.map(item => item.kpi_title) : [],
    datasets: [
      {
        data: data.length > 0 ? data.map(item => item.score) : [],
      },
    ],
  };

  const barColors = data.map(() => getRandomColor());

  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <BarChart
          data={chartData}
          width={screenWidth}
          height={390}
          yAxisLabel=""
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
          }}
          verticalLabelRotation={30}
          fromZero={true}
          showValuesOnTopOfBars={true}
          renderBar={({ index, ...rest }) => (
            <View
              key={index}
              style={{
                backgroundColor: barColors[index],
                ...rest,
              }}
            />
          )}
        />
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
};
export const QuestionScoreBarChartComponent = ({ data = [] }) => {
  console.log(data);

  const chartData = {
    labels: data.length > 0 ? data.map((item,index )=> `Q${index+1}`) : [],
    datasets: [
      {
        data: data.length > 0 ? data.map(item => parseFloat(item.average.toFixed(2))) : [],
     },
    ],
  };

  const barColors = data.map(() => getRandomColor());

  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <BarChart
          data={chartData}
          width={screenWidth}
          height={390}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          verticalLabelRotation={30}
          fromZero={true}
          showValuesOnTopOfBars={true}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          renderBar={(props) => (
            <View
              key={props.index}
              style={{
                backgroundColor: barColors[props.index],
                ...props,
              }}
            />
          )}
        />
      ) : (
        <Text style={{color:'black'}}>No data available</Text>
      )}
    </View>
  );
}
export const EmployeeCourseBarChartComponent = ({ course }) => {
  const chartData = {
    labels: [course.title],
    datasets: [
      {
        data: [course.obtainedScore],
      },
    ],
  };

  // Generate a random color for the bar
  const barColor = getRandomColor();

  return (
    <View style={styles.container}>
      <BarChart
        data={chartData}
        width={screenWidth}
        height={390}
        yAxisLabel=""
        chartConfig={{
          ...chartConfig,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Default color for other elements
        }}
        verticalLabelRotation={30}
        fromZero={true}
        showValuesOnTopOfBars={true}
        renderBar={({ index, ...rest }) => (
          <View
            key={index}
            style={{
              backgroundColor: barColor,
              ...rest,
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 8,
  },
});

export default { BarChartComponent, SessionBarChartComponent, EmployeeCourseBarChartComponent };
