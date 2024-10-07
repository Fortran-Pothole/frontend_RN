import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Voice from 'react-native-voice';
import LinearGradient from 'react-native-linear-gradient';
import Tts from 'react-native-tts';
import {useDispatch} from 'react-redux';
import {addAutoReport} from '../slices/autoPotholeSlice';
import PotholeModel from '../data/models/PotholeModel';

function VoiceNotice({startRecognition, currentLocation, onClose}) {
  const [result, setResult] = useState('');
  const [countdown, setCountdown] = useState(2);
  const [isRecording, setIsRecording] = useState(false);
  const [prompt, setPrompt] = useState('위치와 신고 내용을 말씀해주세요');
  const dispatch = useDispatch();

  const getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // YYYY-MM-DD 형식
  };

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = async event => {
    const speechResult = event.value[0];
    console.log('onSpeechResults:', speechResult);
    // setResult(speechResult);

    if (speechResult.includes('신고')) {
      Tts.speak('이 위치로 포트홀을 신고할게요');
      setPrompt(`지금 위치\n위도: ${currentLocation.latitude.toFixed(3)}, 경도: ${currentLocation.longitude.toFixed(3)}\n로 포트홀을 신고하겠습니다.`);
      await PotholeModel.reportPothole(currentLocation.latitude, currentLocation.longitude);
      onClose(); 

      // Redux 데이터 저장
      const newReport = {
        id: Date.now(),
        location: `위도: ${currentLocation.latitude}, 경도: ${currentLocation.longitude}`,
        description: speechResult,
        reportDate: getFormattedDate(),
      };

      // Redux 상태 업데이트
      dispatch(addAutoReport(newReport));

      await PotholeModel.reportPothole(
        currentLocation.latitude,
        currentLocation.longitude,
      );
      onClose();
    } else {
      setPrompt('다시 한번 신고 내용을 말씀해주세요');
      restartListening();
    }
  };

  const startRecognizing = async () => {
    try {
      await Voice.start('ko-KR');
    } catch (e) {
      console.error(e);
    }
  };

  const restartListening = async () => {
    try {
      await Voice.cancel();
      setTimeout(async () => {
        await Voice.start('ko-KR');
      }, 1000);
    } catch (e) {
      console.error(e);
    }
  };

  const onSpeechEnd = () => {
    if (!result.includes('신고')) {
      setPrompt('다시 한번 신고 내용을 말씀해주세요');
      restartListening();
    } else {
      setPrompt(`지금 위치\n위도: ${currentLocation.latitude.toFixed(5)}, 경도: ${currentLocation.longitude.toFixed(5)}\n로 포트홀을 신고하겠습니다.`)
    }
  };

  useEffect(() => {
    if (startRecognition) {
      const countdownInterval = setInterval(() => {
        setCountdown(prev => prev - 1);
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
      style={styles.container}>
      <Text style={styles.title}>
        {isRecording ? result || prompt : countdown}
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
