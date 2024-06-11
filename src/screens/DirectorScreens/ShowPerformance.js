import React,{useState,useEffect} from 'react';
import {View,ScrollView, StyleSheet, Dimensions, Text, Alert} from 'react-native';
import {BarChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

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
          renderBar={({index, ...rest}) => (
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
          renderBar={({index, ...rest}) => (
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
          renderBar={props => (
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
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        fromZero={true}
        showValuesOnTopOfBars={true}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        renderBar={({index, ...rest}) => (
          <View
            key={index}
            style={{
              backgroundColor: barColors[index],
              ...rest,
            }}
          />
        )}
      />
    </View>
  );
};
export const MultipleEmployeeCourseBarChartComponent = ({courses = []}) => {
  if (!courses || courses.length === 0) {
    return <Text style={{color: 'black'}}>No data available</Text>;
  }

  const chartData = {
    labels: courses.map(course => course.employee.name),
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
        height={350}
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        fromZero={true}
        showValuesOnTopOfBars={true}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        renderBar={({index, ...rest}) => (
          <View
            key={index}
            style={{
              backgroundColor: barColors[index],
              ...rest,
            }}
          />
        )}
      />
    </View>
  );
};
export const MultipleEmployeeKPIBarChartComponent = ({
  kpiPerformanceData = [],
}) => {
  if (!kpiPerformanceData || kpiPerformanceData.length === 0) {
    return <Text style={{color: 'black'}}>No data available</Text>;
  }

  const chartData = {
    labels: kpiPerformanceData.map(kpi => kpi.kpi_title),
    datasets: [
      {
        data: kpiPerformanceData.map(kpi => kpi.score),
      },
    ],
  };

  const barColors = kpiPerformanceData.map(() => getRandomColor());

  return (
    <View style={{flex: 1}}>
      <BarChart
        data={chartData}
        width={screenWidth - 16}
        height={350}
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        fromZero={true}
        showValuesOnTopOfBars={true}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        renderBar={({index, ...rest}) => (
          <View
            key={index}
            style={{
              backgroundColor: barColors[index],
              ...rest,
            }}
          />
        )}
      />
    </View>
  );
};

const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
 
const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

export const MultipleEmployeeQuestionPerformanceChart = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <Text>No data available</Text>;
  }

  const employeeNames = data.map(item => item.employee.name);
  const questionScores = data.map(item => item.questionScores || []);

  const labels = employeeNames;
  const datasets = [];

  const numQuestions = questionScores.reduce((max, scores) => Math.max(max, scores.length), 0);

  for (let i = 0; i < numQuestions; i++) {
    const questionData = {
      data: questionScores.map(scores => scores[i]?.average || 0),
      color: () => colors[i % colors.length],
    };
    datasets.push(questionData);
  }

  const unifiedData = {
    labels: labels,
    datasets: datasets,
  };

  return (
    <View style={styles.container}>
      <BarChart
        data={{
          labels: unifiedData.labels,
          datasets: [
            {
              data: datasets.flatMap(dataset => dataset.data),
            },
          ],
        }}
        width={screenWidth - 20}
        height={320}
        chartConfig={{
          ...chartConfig,
          barColors: colors,
        }}
        verticalLabelRotation={30}
        fromZero={true}
        showValuesOnTopOfBars={true}
        withCustomBarColorFromData={true}
        flatColor={true}
      />
      <View style={styles.legendContainer}>
        {datasets.map((dataset, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors[index % colors.length] }]} />
            <Text style={styles.legendText}>Q{index + 1}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 8
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5
  },
  legendColor: {
    width: 10,
    height: 10,
    marginRight: 5
  },
  legendText: {
    fontSize: 12,
    color: 'black'
  }
});