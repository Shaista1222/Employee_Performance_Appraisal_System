import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {BarChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const BarChartComponent = ({data = []}) => {
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
          renderBar={({index, x, y, width, height, ...rest}) => (
            <View
              key={index}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width,
                height,
                backgroundColor: barColors[index],
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

export const SessionBarChartComponent = ({data = []}) => {
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
          renderBar={({index, x, y, width, height, ...rest}) => (
            <View
              key={index}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width,
                height,
                backgroundColor: barColors[index],
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

export const QuestionScoreBarChartComponent = ({data = []}) => {
  console.log(data);

  const chartData = {
    labels: data.length > 0 ? data.map((item, index) => `Q${index + 1}`) : [],
    datasets: [
      {
        data:
          data.length > 0
            ? data.map(item => parseFloat(item.average.toFixed(2)))
            : [],
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
          height={490}
          yAxisLabel=""
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          verticalLabelRotation={30}
          fromZero={true}
          showValuesOnTopOfBars={true}
          renderBar={({index, x, y, width, height, ...rest}) => (
            <View
              key={index}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width,
                height,
                backgroundColor: barColors[index],
              }}
            />
          )}
        />
      ) : (
        <Text style={{color: 'black'}}>No data available</Text>
      )}
    </View>
  );
};

export const EmployeeCourseBarChartComponent = ({courses = []}) => {
  if (!courses || courses.length === 0) {
    return <Text style={{color: 'black'}}>No data available</Text>;
  }

  const chartData = {
    labels: courses.map(course => course.course.title),
    datasets: [
      {
        data: courses.map(course => course.average),
      },
    ],
  };

  const barColors = courses.map(() => getRandomColor());

  return (
    <View style={styles.container}>
      <BarChart
        data={chartData}
        width={screenWidth - 16}
        height={400}
        chartConfig={{
          ...chartConfig,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        verticalLabelRotation={30}
        fromZero={true}
        showValuesOnTopOfBars={true}
        renderBar={({index, x, y, width, height, ...rest}) => (
          <View
            key={index}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width,
              height,
              backgroundColor: barColors[index],
            }}
          />
        )}
      />
    </View>
  );
};
export const EmployeeSubKpiBarChartComponent = ({
  kpiPerformanceData = [],
}) => {
  console.log('Received kpiPerformanceData:', kpiPerformanceData);

  if (!kpiPerformanceData || kpiPerformanceData.length === 0) {
    return <Text style={{color: 'black'}}>No data available</Text>;
  }

  const chartData = {
    labels: kpiPerformanceData.map(kpi => kpi.name),
    datasets: [
      {
        data: kpiPerformanceData.map(kpi => kpi.score),
      },
    ],
  };

  const barColors = kpiPerformanceData.map(() => getRandomColor());

  return (
    <View style={styles.container}>
      <BarChart
        data={chartData}
        width={screenWidth - 16}
        height={300}
        chartConfig={{
          ...chartConfig,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        verticalLabelRotation={30}
        fromZero={true}
        showValuesOnTopOfBars={true}
        renderBar={({index, x, y, width, height, ...rest}) => (
          <View
            key={index}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width,
              height,
              backgroundColor: barColors[index],
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 57
  },
});
