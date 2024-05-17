import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {
  ShowPerformance,
  BarChartComponent,
  PieChartComponent,
} from './ShowPerformance';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import CourseServiceListener from '../Services/CourseServiceListener';
import SessionService from '../Services/SessionService';

const FirstRoute = () => {
  const [courseList, setCourseList] = useState([]);
  const [sessionList, setSessionList] = useState([]);
  const [selectedSession, setSelectedSession] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await CourseServiceListener.getCourses();
        setCourseList(data);
        // setFilteredEmployeeDetailsScoreList(data);
      } catch (error) {
        Alert.alert(error.message);
      }
    };
    const fetchSession = async () => {
      try {
        const data = await SessionService.getSessions();
        setSessionList(data);
      } catch (error) {
        Alert.alert(error.message);
      }
    };
    fetchSession();
    fetchCourse();
  }, []);
  return (
    <>
      <View style={{backgroundColor: 'gray', padding: 8}}>
        <Text style={styles.subtitle}>Naseer</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Course</Text>
        <Picker
              selectedValue={selectedCourse}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCourse(itemValue)
              }
              style={styles.picker}
              dropdownIconColor="black"
              dropdownIconComponent={() => (
                <FontAwesome5 name="caret-down" size={18} color="black" />
              )}
              mode="dropdown">
              {courseList.map((course, index) => (
                <Picker.Item
                  key={index}
                  label={course.title}
                  value={course.id}
                />
              ))}
            </Picker>
        {/* Show performance */}
        <Text style={styles.label}>Session</Text>
        <View style={styles.showPerformance}>
            <Picker
              selectedValue={selectedSession}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedSession(itemValue)
              }
              style={styles.picker}
              dropdownIconColor="black"
              dropdownIconComponent={() => (
                <FontAwesome5 name="caret-down" size={18} color="black" />
              )}
              mode="dropdown">
              {sessionList.map((session, index) => (
                <Picker.Item
                  key={index}
                  label={session.title}
                  value={session.id}
                />
              ))}
            </Picker>
          </View>

        <PieChartComponent />
      </View>
    </>
  );
};

const SecondRoute = () => {
  const [course, setCourse] = useState('');
  const [session, setSession] = useState('');

  return (
    <>
      <View style={{backgroundColor: 'gray', padding: 8}}>
        <Text style={styles.subtitle}>Naseer</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Course</Text>
        <Picker
          selectedValue={course}
          onValueChange={(itemValue, itemIndex) => setCourse(itemValue)}
          style={{color: 'black'}}
          dropdownIconColor="black"
          dropdownIconComponent={() => (
            <FontAwesome5 name="caret-down" size={18} color="black" />
          )}
          mode="dropdown">
          <Picker.Item label="Operating Systems" value="operatingSystems" />
        </Picker>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.label}>From:</Text>
          <Text style={{paddingRight: 180, fontSize: 16, color: 'black'}}>
            To:
          </Text>
        </View>
        <View style={styles.showPerformance}>
          <Picker
            selectedValue={session}
            setSession={(itemValue, itemIndex) => setSession(itemValue)}
            style={styles.pickerCompare}
            dropdownIconColor="black"
            dropdownIconComponent={() => (
              <FontAwesome5 name="caret-down" size={18} color="black" />
            )}
            mode="dropdown">
            <Picker.Item label="spring2024" value="spring2024" />
          </Picker>
          <Picker
            selectedValue={session}
            setSession={(itemValue, itemIndex) => setSession(itemValue)}
            style={styles.pickerCompare}
            dropdownIconColor="black"
            dropdownIconComponent={() => (
              <FontAwesome5 name="caret-down" size={18} color="black" />
            )}
            mode="dropdown">
            <Picker.Item label="spring2024" value="spring2024" />
          </Picker>
        </View>
        <BarChartComponent />
      </View>
    </>
  );
};
const ThirdRoute = () => <View style={{flex: 1, backgroundColor: '#ff4081'}} />;

const FourthRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
});
const Performance = () => {
  // {route}
  // const {employeeId} = route.params;
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Session'},
    {key: 'second', title: 'Multi-Session'},
    {key: 'third', title: 'Comparision'},
    {key: 'fourth', title: 'Multi-Session-Comparison'},
  ]);
  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>Report</Text>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        scrollEnabled={true}
        initialLayout={{width: layout.width}}
        renderTabBar={props => (
          <TabBar
            activeColor={'black'}
            inactiveColor={'gray'}
            {...props}
            scrollEnabled={true}
            style={styles.tabBar}
          />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f5f5f5',
  },
  showPerformance: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // borderWidth:1
  },
  title: {
    paddingTop: 10,
    backgroundColor: '#6360DC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  label: {
    fontSize: 16,
    color: 'black',
  },

  picker: {
    color: 'black',
    width: '100%',
  },
  pickerCompare: {
    color: 'black',
    width: '35%',
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
  },
});

export default Performance;
