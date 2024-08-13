import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Voice from 'react-native-voice';

function VoiceNotice() {
  const [result, setResult] = useState('');

  useEffect(() => {
    // 음성 인식 결과 콜백 설정
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // 음성 인식 결과 처리
  const onSpeechResults = (event) => {
    setResult(event.value[0]);
  };

  // 음성 인식 시작
  const startRecognizing = async () => {
    try {
      await Voice.start('ko-KR');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>음성 신고</Text>
      <Text style={styles.transcript}>인식된 텍스트: {result}</Text>
      <Button title="음성 인식 시작" onPress={startRecognizing} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333',
  },
  transcript: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
    fontSize: 18,
  },
});

export default VoiceNotice;
