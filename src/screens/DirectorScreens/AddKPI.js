import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import { Text } from 'react-native-paper';
import AddGeneralKpi from './AddGeneralKpi';

const GeneralRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]}><Text>Group Content</Text></View>

);

const GroupRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]}><Text>Group Content</Text></View>
);

const EmployeeRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#2196f3' }]}><Text>Employee Content</Text></View>
);

const renderScene = ({ route }) => {
  switch (route.key) {
    case 'general':
      return <GeneralRoute />;
    case 'group':
      return <GroupRoute />;
    case 'employee':
      return <EmployeeRoute />;
    default:
      return null;
  }
};

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicator}
    style={styles.tabBar}
    renderLabel={({ route, focused, color }) => (
      <Text style={[styles.label, { color }]}>{route.title}</Text>
    )}
  />
);

const AddKpi = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'general', title: 'General' },
    { key: 'group', title: 'Group' },
    { key: 'employee', title: 'Employee' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  tabBar: {
    backgroundColor: 'gray',
    color:'black'
  },
  indicator: {
    backgroundColor: '#6360DC',
    color:'black'
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color:'black'
  },
});

export default AddKpi;
