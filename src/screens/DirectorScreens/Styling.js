import {StyleSheet} from 'react-native';
import React from 'react';

const Styling = () => {
  return <></>;
};
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pastel',
  },
  header: {
    paddingTop: 10,
    backgroundColor: '#6360DC',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    marginLeft: 24,
    borderColor: 'purple',
    color: Colors.dark,
  },
  scrollView: {
    backgroundColor: '#f3f3f3',
  },
  listItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#02367B',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  name: {
    fontSize: 16,
    color: Colors.dark,
  },
  average: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark,
  },
});
export default Styling;