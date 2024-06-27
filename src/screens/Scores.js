import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import EvaluatonScores from './Services/EvaluatonScores';

const Scores = ({route}) => {
  const {employeeID1, employeeID2, sessionID, evaluationTypeID, courseID} =
    route.params;
  const [evaluationScoreList, setEvaluationScoreList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestionsScore = async () => {
      try {
        const data = await EvaluatonScores.getQuestionsScores(
          employeeID1,
          employeeID2,
          sessionID,
          evaluationTypeID,
          courseID,
        );
        setEvaluationScoreList(data);
        console.log(data);
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionsScore();
  }, [employeeID1, employeeID2, sessionID, evaluationTypeID, courseID]);

  return (
    <>
      <View style={styles.title}>
        <Text style={styles.titleText}>Scores</Text>
      </View>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={evaluationScoreList}
            renderItem={({item}) => (
              <View style={styles.BoxDesign}>
                <Text style={{fontWeight: 'bold'}}>
                  {item.question.question}
                </Text>
                <Text>
                  {item.obtainedScore}/{item.totalScore}
                </Text>
              </View>
            )}
            keyExtractor={item => item.question.id.toString()}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f5f5f5',
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
  BoxDesign: {
    color: '#708090',
    fontSize: 18,
    borderColor: 'red',
    margin: 10,
    backgroundColor: '#d2b48c',
    padding: 10,
    borderRadius: 10,
  },
});

export default Scores;
