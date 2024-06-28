import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  useWindowDimensions,TouchableOpacity
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
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



export const MultipleEmployeeSubKpiBarChartComponent = ({ subKPIPerformanceData }) => {
  if (!Array.isArray(subKPIPerformanceData) || subKPIPerformanceData.length === 0) {
    return <Text>No data available</Text>;
  }

  const kpis = Array.from(
    new Set(subKPIPerformanceData.flatMap(emp => (emp.subKpiPerformances || []).map(subKpi => subKpi.name)))
  );

  const kpiColors = kpis.reduce((acc, kpi) => {
    acc[kpi] = getRandomColor();
    return acc;
  }, {});

  const employeeNames = subKPIPerformanceData.map(empData => empData.employee.name);
  const kpiScores = subKPIPerformanceData.map(empData =>
    kpis.map(kpi => (empData.subKpiPerformances || []).find(data => data.name === kpi)?.score || 0)
  );

  const flattenedBarData = kpiScores.flat();
  const barColors = kpiScores.flatMap(scores =>
    scores.map((_, index) => kpiColors[kpis[index]])
  );

  const labels = employeeNames.map(name => name + '\n\n'); // Add new lines for spacing

  const { width: screenWidth } = useWindowDimensions();

  return (
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
        width={screenWidth}
        height={345}
        chartConfig={{
          ...chartConfig,
          barPercentage: 0.3,
          fillShadowGradient: '#000000',
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
  );
};
export const MultipleEmployeeKPIBarChartComponent = ({ kpiPerformanceData }) => {
  console.log("jui"+kpiPerformanceData);
  if (!Array.isArray(kpiPerformanceData) || kpiPerformanceData.length === 0) {
    return <Text>No data available</Text>;
  }

  const kpis = Array.from(
    new Set(kpiPerformanceData.flatMap(emp => emp.kpiScores.map(kpi => kpi.kpi_title)))
  );

  const kpiColors = kpis.reduce((acc, kpi) => {
    acc[kpi] = getRandomColor();
    return acc;
  }, {});

  const employeeNames = kpiPerformanceData.map(empData => empData.employee.name);
  const kpiScores = kpiPerformanceData.map(empData =>
    kpis.map(kpi => empData.kpiScores.find(data => data.kpi_title === kpi)?.score || 0)
  );

  const flattenedBarData = kpiScores.flat();
  const barColors = kpiScores.flatMap(scores =>
    scores.map((_, index) => kpiColors[kpis[index]])
  );

  const labels = employeeNames;

  const { width: screenWidth } = useWindowDimensions();

  return (
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
        width={screenWidth}
        height={345}
        chartConfig={{
          ...chartConfig,
          barPercentage: 0.4, // Adjust the width of the bars
          fillShadowGradient: '#000000', // Color of the bars
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
  );
};

export const MultipleEmployeeCourseBarChartComponent = ({ performanceData }) => {
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
  const colors = Array.from({ length: flattenedBarData.length }, () =>
    getRandomColor(),
  );

  const chartWidth = Math.max(screenWidth, labels.length * 50); // Adjust multiplier as needed

  return (
    <ScrollView horizontal>
      <ScrollView>
        <View style={[styles.container, { width: chartWidth }]}>
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
            width={chartWidth}
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
                    { backgroundColor: colors[index % colors.length] },
                  ]}
                />
                <Text style={styles.legendText}>{course}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export const MultipleEmployeeQuestionPerformanceChart = ({ data }) => {
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

  const chartWidth = Math.max(screenWidth, labels.length * 60); // Adjust multiplier as needed

  return (
    <ScrollView horizontal>
      <ScrollView>
        <View style={[styles.container, { width: chartWidth }]}>
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
            width={chartWidth}
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
                <View style={[styles.legendColor, { backgroundColor: color }]} />
                <Text style={styles.legendText}>Q{index + 1}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
};
export const MultipleEmployeeSingleSubKpi = ({ subKPIPerformanceData }) => {
  if (!Array.isArray(subKPIPerformanceData) || subKPIPerformanceData.length === 0) {
    return <Text>No data available</Text>;
  }

  const employeeNames = subKPIPerformanceData.map(empData => empData.employee.name);
  const scores = subKPIPerformanceData.map(empData =>
    empData.subKpiPerformances.length > 0 ? empData.subKpiPerformances[0].score : 0
  );

  const { width: screenWidth } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <BarChart
        data={{
          labels: employeeNames,
          datasets: [
            {
              data: scores,
              colors: scores.map(() => (opacity = 1) => '#007BFF'),
            },
          ],
        }}
        width={screenWidth}
        height={345}
        chartConfig={{
          backgroundColor: '#C5C6C7',
          backgroundGradientFrom: '#C5C6C7',
          backgroundGradientTo: '#C5C6C7',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          barPercentage: 0.5,
        }}
        verticalLabelRotation={15}
        fromZero={true}
        showValuesOnTopOfBars={true}
        withCustomBarColorFromData={true}
        flatColor={true}
      />
    </View>
  );
};

export const MultipleEmployeeYearlyPerformance = ({ performanceYearlyList }) => {
  if (!Array.isArray(performanceYearlyList) || performanceYearlyList.length === 0) {
    return <Text>No data available</Text>;
  }

  // Extract unique session titles
  const sessions = Array.from(
    new Set(performanceYearlyList.flatMap(emp => emp.kpiScores.map(kpi => kpi.session_title)))
  );

  // Create a color map for sessions
  const sessionColors = sessions.reduce((acc, session) => {
    acc[session] = getRandomColor();
    return acc;
  }, {});

  // Flatten the KPI scores and map them to sessions
  const flattenedBarData = performanceYearlyList.flatMap(emp =>
    emp.kpiScores.map(kpi => kpi.score)
  );

  // Generate colors based on sessions
  const barColors = performanceYearlyList.flatMap(emp =>
    emp.kpiScores.map(kpi => sessionColors[kpi.session_title])
  );

  const { width: screenWidth } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <BarChart
          data={{
            labels: sessions,
            datasets: [
              {
                data: flattenedBarData,
                colors: barColors.map(color => (opacity = 1) => color),
              },
            ],
          }}
          width={Math.max(screenWidth, sessions.length * 60)} // Adjust the width based on the number of sessions
          height={345}
          chartConfig={{
            ...chartConfig,
            barPercentage: 0.4,
            fillShadowGradient: '#000000',
          }}
          verticalLabelRotation={15}
          fromZero={true}
          showValuesOnTopOfBars={true}
          withCustomBarColorFromData={true}
          flatColor={true}
        />
      </ScrollView>
      <View style={styles.legendContainer}>
        {sessions.map((session, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: sessionColors[session] }]} />
            <Text style={styles.legendText}>{session}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
//////////////////////////
export const SingleEmployeeKpiPerformance = ({ singleEmployeePerformanceList }) => {
  console.log("jui"+singleEmployeePerformanceList);
  if (!Array.isArray(singleEmployeePerformanceList) || singleEmployeePerformanceList.length == 0) {
    return <Text>No data available</Text>;
  }
  
  const kpis = Array.from(
    new Set(singleEmployeePerformanceList.flatMap(emp => emp.kpiScores.map(kpi => kpi.kpi_title)))
  );

  const kpiColors = kpis.reduce((acc, kpi) => {
    acc[kpi] = getRandomColor();
    return acc;
  }, {});

  const employeeNames = singleEmployeePerformanceList.map(empData => empData.employee.name);
  const kpiScores = singleEmployeePerformanceList.map(empData =>
    kpis.map(kpi => empData.kpiScores.find(data => data.kpi_title === kpi)?.score || 0)
  );

  const flattenedBarData = kpiScores.flat();
  const barColors = kpiScores.flatMap(scores =>
    scores.map((_, index) => kpiColors[kpis[index]])
  );

  const labels = employeeNames;

  const { width: screenWidth } = useWindowDimensions();

  return (
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
        width={screenWidth}
        height={345}
        chartConfig={{
          ...chartConfig,
          barPercentage: 0.4, // Adjust the width of the bars
          fillShadowGradient: '#000000', // Color of the bars
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
  );
};
export const BarChartComponent = ({multiSessionEmployeePerformanceList = []}) => {
  console.log("Bar Chart",multiSessionEmployeePerformanceList);

  const chartData = {
    labels: multiSessionEmployeePerformanceList.length > 0 ? multiSessionEmployeePerformanceList.map(item => item.session_title) : [],
    datasets: [
      {
        data: multiSessionEmployeePerformanceList.length > 0 ? multiSessionEmployeePerformanceList.map(item => item.score) : [],
      },
    ],
  };

  const barColors = multiSessionEmployeePerformanceList.map(() => getRandomColor());

  return (
    <View style={styles.container}>
      
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
     
    </View>
  );
};
export const MultipleSessionEmployeeKPI = ({ multiSessionEmployeeKpiPerformanceList }) => {
  console.log("jui"+multiSessionEmployeeKpiPerformanceList);
  if (!Array.isArray(multiSessionEmployeeKpiPerformanceList) || multiSessionEmployeeKpiPerformanceList.length === 0) {
    return <Text>No data available</Text>;
  }

  const kpis = Array.from(
    new Set(multiSessionEmployeeKpiPerformanceList.flatMap(emp => emp.kpiScores.map(kpi => kpi.kpi_title)))
  );

  const kpiColors = kpis.reduce((acc, kpi) => {
    acc[kpi] = getRandomColor();
    return acc;
  }, {});

  const employeeNames = multiSessionEmployeeKpiPerformanceList.map(empData => empData.kpi_title);
  const kpiScores = multiSessionEmployeeKpiPerformanceList.map(empData=> empData.score || 0)

  const flattenedBarData = kpiScores.flat();
  const barColors = kpiScores.flatMap(scores =>
    scores.map((_, index) => kpiColors[kpis[index]])
  );

  const labels = employeeNames;

  const { width: screenWidth } = useWindowDimensions();

  return (
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
        width={screenWidth}
        height={345}
        chartConfig={{
          ...chartConfig,
          barPercentage: 0.4, // Adjust the width of the bars
          fillShadowGradient: '#000000', // Color of the bars
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
