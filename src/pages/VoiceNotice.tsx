import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Voice from 'react-native-voice';
import LinearGradient from 'react-native-linear-gradient'; 
import Tts from 'react-native-tts';
import PotholeModel from '../data/models/PotholeModel';

function VoiceNotice({ startRecognition, currentLocation, onClose }) {
  const [result, setResult] = useState('');
  const [countdown, setCountdown] = useState(2);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = async (event) => {
    const speechResult = event.value[0];
    setResult(speechResult);

    if (speechResult.includes('신고')) {
      Tts.speak('이 위치로 포트홀을 신고할게요');
      await PotholeModel.reportPothole(currentLocation.latitude, currentLocation.longitude);
      onClose(); // 모달 닫기
    }
  };

  const startRecognizing = async () => {
    try {
      await Voice.start('ko-KR');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (startRecognition) {
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      if (countdown === 0) {
        clearInterval(countdownInterval);
        setIsRecording(true);
        startRecognizing();
      }

      return () => clearInterval(countdownInterval);
    }
  }, [startRecognition, countdown]);

  return (
    <LinearGradient
      colors={['#1E3C72', '#2A5298', '#A1C4FD']}
      style={styles.container}
    >
      <Text style={styles.title}>
        {isRecording ? (result || '위치와 신고 내용을 말씀해주세요') : countdown}
      </Text>
      <Image
        source={require('../assets/icon_mic_white.png')}
        style={styles.micIcon}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  },
  micIcon: {
    width: 60,
    height: 60,
  },
});

export default VoiceNotice;
