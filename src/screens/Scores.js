import React, { useEffect, useState } from 'react';
import { View, Text, Spinner } from 'react-native';
import SessionServiceListner from './Services/SessionServiceListner'; // Assuming you have SessionService component

export default function Scores() {
  const [sessionList, setSessionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // const sessionService = new SessionService();
    SessionServiceListner.getSessions(
      (sessions) => {
        setSessionList(sessions);
        setLoading(false);
      },
      (error) => {
        setErrorMessage(error);
        setLoading(false);
      }
    );
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <Spinner />
      ) : errorMessage ? (
        <Text>{errorMessage}</Text>
      ) : (
        <View>
          <Text>Scores Fragment</Text>
          {/* Render your session list here */}
          <View>
            {sessionList.map((session) => (
              <Text key={session.id}>{session.title}</Text>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
