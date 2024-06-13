import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  Alert,
} from 'react-native';
import {BarChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

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

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
export const MultipleEmployeeSubKpiBarChartComponent = ({ kpiPerformanceData }) => {
  if (!Array.isArray(kpiPerformanceData) || kpiPerformanceData.length === 0) {
    return <Text>No data available</Text>;
  }

  const kpis = Array.from(
    new Set(kpiPerformanceData.flatMap(emp => (emp.subKpiPerformances || []).map(subKpi => subKpi.name))),
  );

  const kpiColors = kpis.reduce((acc, kpi) => {
    acc[kpi] = getRandomColor();
    return acc;
  }, {});

  const employeeNames = kpiPerformanceData.map(empData => empData.employee.name);
  const kpiScores = kpiPerformanceData.map(empData =>
    kpis.map(kpi => (empData.subKpiPerformances || []).find(data => data.name === kpi)?.score || 0),
  );

  const flattenedBarData = kpiScores.flat();
  const barColors = kpiScores.flatMap(scores =>
    scores.map((_, index) => kpiColors[kpis[index]]),
  );

  const labels = employeeNames.flatMap(name => [name, '']).slice(0, -1);

  const { width: screenWidth } = useWindowDimensions();

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        <BarChart
          data={{
            labels: labels,
            datasets: [
              {
                data: flattenedBarData,
                colors: barColors.map(color => (opacity = 1) => color),
              },
            ],
          }}
          width={Math.max(screenWidth, flattenedBarData.length * 20)} // Adjust the width as needed
          height={345}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            barPercentage: 0.5, // Adjust bar width
            barThickness: 8, // Adjust thickness of the bars
            barSpacing: 2, // Adjust spacing between bars
          }}
          verticalLabelRotation={15}
          fromZero={true}
          showValuesOnTopOfBars={true}
          withCustomBarColorFromData={true}
          flatColor={true}
        />
        <View style={styles.legendContainer}>
          {kpis.map((kpi, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: kpiColors[kpi] }]} />
              <Text style={styles.legendText}>{kpi}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};


export const MultipleEmployeeKPIBarChartComponent = ({ kpiPerformanceData }) => {
  if (!Array.isArray(kpiPerformanceData) || kpiPerformanceData.length === 0) {
    return <Text>No data available</Text>;
  }

  // Extract unique KPI titles
  const kpis = Array.from(
    new Set(kpiPerformanceData.flatMap(emp => emp.kpiScores.map(kpi => kpi.kpi_title)))
  );

  // Generate a color for each KPI
  const kpiColors = kpis.reduce((acc, kpi) => {
    acc[kpi] = getRandomColor();
    return acc;
  }, {});

  // Extract employee names and KPI scores
  const employeeNames = kpiPerformanceData.map(empData => empData.employee.name);
  const kpiScores = kpiPerformanceData.map(empData =>
    kpis.map(kpi => empData.kpiScores.find(data => data.kpi_title === kpi)?.score || 0)
  );

  // Flatten the KPI scores for the bar chart data
  const flattenedBarData = kpiScores.flat();
  const barColors = kpiScores.flatMap(scores =>
    scores.map((_, index) => kpiColors[kpis[index]])
  );

  // Create labels for the bar chart
  const labels = employeeNames.flatMap(name => [name, '']).slice(0, -1);

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        <BarChart
          data={{
            labels: labels,
            datasets: [
              {
                data: flattenedBarData,
                colors: barColors.map(
                  color =>
                    (opacity = 1) =>
                      color,
                ),
              },
            ],
          }}
          width={Math.max(screenWidth, flattenedBarData.length * 20)} // Adjust bar width as needed
          height={345}
          chartConfig={{
            ...chartConfig,
            barPercentage: 0.5, // Adjust bar width
            barThickness: 8, // Adjust thickness of the bars
            barSpacing: 2, // Adjust spacing between bars
          }}
          verticalLabelRotation={15}
          fromZero={true}
          showValuesOnTopOfBars={true}
          withCustomBarColorFromData={true}
          flatColor={true}
        />
        <View style={styles.legendContainer}>
          {kpis.map((kpi, index) => (
            <View key={index} style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: kpiColors[kpi] }]}
              />
              <Text style={styles.legendText}>{kpi}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
export const MultipleEmployeeCourseBarChartComponent = ({performanceData}) => {
  if (!Array.isArray(performanceData) || performanceData.length === 0) {
    return <Text>No data available</Text>;
  }

  const employeeNames = performanceData.map(item => item.employee.name);
  const courses = Array.from(
    new Set(
      performanceData.flatMap(item =>
        item.performance.map(perf => perf.course.title),
      ),
    ),
  );

  const barData = [];
  const labels = [];

  performanceData.forEach((employeeData, employeeIndex) => {
    const employeeScores = [];

    courses.forEach(course => {
      const courseData = employeeData.performance.find(
        perf => perf.course.title === course,
      );
      if (courseData) {
        employeeScores.push(courseData.average);
      } else {
        employeeScores.push(0);
      }
    });

    labels.push(employeeData.employee.name);
    barData.push(employeeScores);
  });

  const flattenedBarData = barData.flat();
  const colors = Array.from({length: flattenedBarData.length}, () =>
    getRandomColor(),
  );

  console.log('Employee Names:', employeeNames);
  console.log('Courses:', courses);
  console.log('Bar Data:', barData);
  console.log('Flattened Bar Data:', flattenedBarData);
  console.log('Colors:', colors);

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        <BarChart
          data={{
            labels: labels,
            datasets: [
              {
                data: flattenedBarData,
                colors: colors.map(
                  color =>
                    (opacity = 1) =>
                      color,
                ),
              },
            ],
          }}
          width={screenWidth - 20}
          height={345}
          chartConfig={chartConfig}
          verticalLabelRotation={15}
          fromZero={true}
          showValuesOnTopOfBars={true}
          withCustomBarColorFromData={true}
          flatColor={true}
        />
        <View style={styles.legendContainer}>
          {courses.map((course, index) => (
            <View key={index} style={styles.legendItem}>
              <View
                style={[
                  styles.legendColor,
                  {backgroundColor: colors[index % colors.length]},
                ]}
              />
              <Text style={styles.legendText}>{course}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export const MultipleEmployeeQuestionPerformanceChart = ({data}) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <Text>No data available</Text>;
  }

  const employeeNames = data.map(item => item.employee.name);
  const questionScores = data.map(item => item.questionScores || []);

  const questionColors = [];
  const numQuestions = questionScores.reduce(
    (max, scores) => Math.max(max, scores.length),
    0,
  );

  for (let i = 0; i < numQuestions; i++) {
    questionColors.push(getRandomColor());
  }
  const barData = [];
  const labels = [];

  employeeNames.forEach((employee, index) => {
    const scores = questionScores[index];
    scores.forEach((score, questionIndex) => {
      barData.push({
        value: Math.round(score?.average || 0),
        color: questionColors[questionIndex],
      });
    });
    labels.push(employee);
    if (index < employeeNames.length - 1) {
      barData.push({
        value: 0,
        color: 'transparent',
      });
      labels.push('');
    }
  });

  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        <BarChart
          data={{
            labels: labels,
            datasets: [
              {
                data: barData.map(item => item.value),
                colors: barData.map(
                  item =>
                    (opacity = 1) =>
                      item.color,
                ),
              },
            ],
          }}
          width={screenWidth - 20}
          height={345}
          chartConfig={{
            ...chartConfig,
            barPercentage: 0.5,
          }}
          verticalLabelRotation={15}
          fromZero={true}
          showValuesOnTopOfBars={true}
          withCustomBarColorFromData={true}
          flatColor={true}
        />
        <View style={styles.legendContainer}>
          {questionColors.map((color, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendColor, {backgroundColor: color}]} />
              <Text style={styles.legendText}>Q{index + 1}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  legendColor: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
  },
});
