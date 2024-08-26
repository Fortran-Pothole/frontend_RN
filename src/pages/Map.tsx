import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Button,
  Dimensions,
  PanResponder,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import IconSetting from '../assets/icon_system_line.svg';
import {useNavigation} from '@react-navigation/native';
import VoiceNotice from './VoiceNotice';
import NaverMapView, {Marker, Path, LayerGroup} from 'react-native-nmap';
import Geolocation from '@react-native-community/geolocation';
import checkDistance from '../../types/checkDistance';
import Tts from 'react-native-tts';
import { moveTowardsEnd } from '../../types/locationUtils';
import CircleComponent from '../components/CircleComponent';
import PotholeInfo from '../components/PotholeInfo';
import potholePositions from '../components/potholePositions';

function Map() {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const openVoiceNotice = () => {
    setIsModalVisible(true);
  };
  const closeVoiceNotice = () => {
    setIsModalVisible(false);
  };
  const [showPotholeInfo, setShowPotholeInfo] = useState(false);
  const [selectedPothole, setSelectedPothole] = useState(null);
  const [passedPotholes, setPassedPotholes] = useState(new Set());
  const moveIntervalRef = useRef(null);
  const mapRef = useRef(null);
  const ttsIntervalRef = useRef(null); 
  const isSpeakingRef = useRef(false);
  
  const [myPosition, setMyPosition] = useState({
    latitude: 37.322119339148045,
    longitude: 127.10352593988907,
  });

  const enableLayerGroup = group => {
    if (mapRef.current) {
      mapRef.current.setLayerGroupEnabled(group, true);
    }
  };

  // 고정된 포트홀 위치
  const start = { latitude: 37.30807444155034, longitude: 127.10349143909238 };
  const end = { latitude:  37.34518559022692, longitude: 127.10349143909238};

  useEffect(() => {
    enableLayerGroup(LayerGroup.LAYER_GROUP_TRAFFIC);
  }, []);


  useEffect(() => {
    moveIntervalRef.current = setInterval(() => {
      moveTowardsEnd(
        myPosition, 
        setMyPosition, 
        start, 
        end, 
        potholePositions, 
        setSelectedPothole,
        setShowPotholeInfo, 
        moveIntervalRef,
        passedPotholes,
        setPassedPotholes
      ); 
    }, 1000);
    return () => {
      clearInterval(moveIntervalRef.current);
      clearInterval(ttsIntervalRef.current);
    };
  }, [myPosition]);

  useEffect(() => {
    Tts.getInitStatus()
      .then(() => {
        console.log('TTS 초기화 성공');
        Tts.setDefaultLanguage('ko-KR');
        Tts.setDefaultRate(0.4);
      })
      .catch((error) => {
        console.error('TTS 초기화 실패 또는 언어 설정 오류:', error);
      });
    Tts.addEventListener('tts-start', () => {
      console.log('TTS 시작');
      isSpeakingRef.current = true;
    });
    Tts.addEventListener('tts-finish', () => {
      console.log('TTS 완료');
      isSpeakingRef.current = false;
    });
    Tts.addEventListener('tts-cancel', () => {
      console.log('TTS 취소');
      isSpeakingRef.current = false;
    });
    Tts.addEventListener('tts-error', () => {
      console.log('TTS 오류');
      isSpeakingRef.current = false;
    });

    return () => {
      Tts.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (showPotholeInfo) {
      if (!isSpeakingRef.current) {
        Tts.speak(`포트홀이 ${Math.round(checkDistance(myPosition, selectedPothole))}미터 앞에 있습니다. 속도를 줄여주세요`);
      }
      ttsIntervalRef.current = setInterval(() => {
        if (!isSpeakingRef.current && showPotholeInfo) {
          Tts.speak(`포트홀이 ${Math.round(checkDistance(myPosition, selectedPothole))}미터 앞에 있습니다. 속도를 줄여주세요`);
        }
      }, 6000);
      
    } else {
      clearInterval(ttsIntervalRef.current);
    }
    return () => {
      clearInterval(ttsIntervalRef.current);
    };
  }, [showPotholeInfo, myPosition, selectedPothole]);


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PotholeReport')}>
            <Text style={{color: '#000', fontSize: 16, marginRight: 20}}>
              수동 신고
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
            <IconSetting
              name="settings-outline"
              size={25}
              color="#000"
              style={{marginRight: 15}}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <NaverMapView
        ref={mapRef}
        style={styles.map}
        zoomControl={false}
        scrollGesturesEnabled={false}
        zoomGesturesEnabled={true}
        tiltGesturesEnabled={false}
        rotateGesturesEnabled={false}
        stopGesturesEnabled={false}
        center={{
          zoom: 18,
          tilt: 100,
          bearing: 0,
          latitude: myPosition?.latitude || start.latitude,
          longitude: myPosition?.longitude || start.longitude,
        }}>
        {potholePositions.map(position => (
          <Marker
            key={position.id}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
            width={35}
            height={35}
            caption={{ text:  `포트홀 ${position.id}` }}
            image={require('../assets/pothole.png')}
          />
        ))}
        <Path
          coordinates={[start, end]}
          width={3}
          color="#266DFC"
          outlineColor="#266DFC"
          passedColor="#FE6F7B"
          outlineWidth={3}
        />
        <Marker
          coordinate={myPosition}
          width={40}
          height={40}
          caption={{text: '나의 위치'}}
          image={require('../assets/icon_current_location.png')}
        />
      </NaverMapView>


      {showPotholeInfo && selectedPothole && (
        <PotholeInfo position={selectedPothole} myPosition={myPosition} />
      )}
      <CircleComponent />

      <TouchableOpacity style={styles.micButton} onPress={openVoiceNotice}>
        <Image
          source={require('../assets/microphone.png')}
          style={styles.micIcon}
        />
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={closeVoiceNotice}>
        <View style={styles.modalBackground}>
          <VoiceNotice startRecognition={true} />
          <Button title="닫기" onPress={closeVoiceNotice} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  micButton: {
    position: 'absolute',
    bottom: 50,
    left: '50%',
    transform: [{translateX: -30}],
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#003366',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  micIcon: {
    width: 80,
    height: 80,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  potholeInfoContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    zIndex: 1000,
    width: 200,
    height: 320,
    borderColor: '#ccc',
  },
  potholeInfoHeader: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  potholeInfoText: {
    color: 'black',
    fontSize: 16,
    marginBottom: 5,
  },
  imageContainer: {
    marginTop: 15,
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  potholeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  controlContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#003366',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  controlImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default Map;
