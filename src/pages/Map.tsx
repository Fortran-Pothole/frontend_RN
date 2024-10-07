import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Dimensions,
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
import PotholeInfo from '../components/PotholeInfo';
import { usePotholeViewModel, fetchPotholes } from '../data/viewModels/PotholeViewModels';

function Map() {
  const navigation = useNavigation();
  const { potholes, loading, error, fetchPotholes, speed} = usePotholeViewModel();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ latitude: 0, longitude: 0 });
  const openVoiceNotice = () => {
    setCurrentLocation(myPosition); // 현재 위치를 저장
    setIsModalVisible(true);
  };
  const closeVoiceNotice = () => {
    setIsModalVisible(false);
    fetchPotholes(); // 모달이 닫힐 때 포트홀 데이터를 다시 가져옴
  };
  const [showSpeedFilter, setShowSpeedFilter] = useState(false);
  const screenWidth = Dimensions.get('window').width;
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
  const pauseTTS = () => {
    if (isSpeakingRef.current) {
      Tts.stop();
    }
    clearInterval(ttsIntervalRef.current);
  };

  const resumeTTS = () => {
    if (showPotholeInfo && selectedPothole) {
        const distance = Math.round(checkDistance(myPosition, selectedPothole));
        if (distance > 0) {
            Tts.speak(`포트홀이 ${distance}미터 앞에 있습니다. 속도를 줄여주세요`, {
                onDone: () => isSpeakingRef.current = false,
                onCancel: () => isSpeakingRef.current = false,
                onError: () => isSpeakingRef.current = false,
            });
            isSpeakingRef.current = true;
        }
    }
  };

  const enableLayerGroup = group => {
    if (mapRef.current) {
      mapRef.current.setLayerGroupEnabled(group, true);
    }
  };


  const start = { latitude: 35.24807444155034, longitude: 127.10349143909238 };
  const end = { latitude:  37.34518559022692, longitude: 127.10349143909238};
  
  useEffect(() => {
    enableLayerGroup(LayerGroup.LAYER_GROUP_TRAFFIC);
  }, []);
  useEffect(() => {
    if(potholes.length > 0) {
      moveIntervalRef.current = setInterval(() => {
        moveTowardsEnd(
          myPosition, 
          setMyPosition, 
          start, 
          end, 
          potholes,
          setSelectedPothole,
          setShowPotholeInfo, 
          moveIntervalRef,
          passedPotholes,
          setPassedPotholes,
          speed
        ); 
      }, 300);
    }
    return () => {
      clearInterval(moveIntervalRef.current);
      clearInterval(ttsIntervalRef.current);
    };
  }, [myPosition, potholes]);

  useEffect(() => {
    // TTS가 활성화되고, 속도가 90 이상일 경우 필터를 표시
    if (isSpeakingRef.current && speed >= 90) {
      setShowSpeedFilter(true);
    } else {
      setShowSpeedFilter(false);
    }
  }, [speed, isSpeakingRef.current]);

  useEffect(() => {
    Tts.getInitStatus()
      .then(() => {
        console.log('TTS 초기화 성공');
        Tts.setDefaultLanguage('ko-KR');
        Tts.setDefaultRate(0.5);
      })
      .catch((error) => {
        console.error('TTS 초기화 실패 또는 언어 설정 오류:', error);
      });
    Tts.addEventListener('tts-start', () => {
      isSpeakingRef.current = true;
    });
    Tts.addEventListener('tts-finish', () => {
      isSpeakingRef.current = false;
    });
    Tts.addEventListener('tts-cancel', () => {
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
    //평상시 주행 중일때 
    if (showPotholeInfo && !isModalVisible) {
      if (!isSpeakingRef.current || checkDistance(myPosition, selectedPothole) <= 0) {
        pauseTTS(); 
        resumeTTS(); 
      }
    } 
    //신고 모달이 켜져있을때
    if(isModalVisible) {
      pauseTTS();
    }
    else {
      clearInterval(ttsIntervalRef.current);
    }
    return () => {
      clearInterval(ttsIntervalRef.current);
    };
  }, [showPotholeInfo, myPosition, selectedPothole, isModalVisible]);

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
        scrollGesturesEnabled={true}
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
        {potholes.map(position => {
          const isDangerous = position.warning >= 4;
          const markerImage = isDangerous 
            ? require('../assets/pothole_warning.png') 
            : require('../assets/pothole.png');
          const markerSize = isDangerous ? 45 : 35;
          return (
            <Marker
              key={position.id}
              coordinate={{
                latitude: position.latitude,
                longitude: position.longitude,
              }}
              width={markerSize}
              height={markerSize}
              image={markerImage}
            />
          );
        })}
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

      <View style={styles.speedContainer}>
        <Text style={styles.speedText}>{speed} km/h</Text>
      </View>

      {showPotholeInfo && selectedPothole && (
        <PotholeInfo 
          position={selectedPothole} 
          myPosition={myPosition} 
        />
      )}
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
          <VoiceNotice 
            startRecognition={true} 
            currentLocation={currentLocation}
            onClose = {closeVoiceNotice}
          />
          <TouchableOpacity
            style={[styles.closeButton, { width: screenWidth }]}
            onPress={closeVoiceNotice}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {showSpeedFilter && (
        <View style={styles.speedFilter} />
      )}
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
  closeButton: {
    backgroundColor: '#003366',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  speedContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 8,
  },
  speedText: {
    fontSize: 60, 
    fontWeight: 'bold',
    color: '#000',
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
  speedFilter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F73939',
    opacity: 0.2, // 20% 투명도
    zIndex: 999, // 화면 맨 위에 표시
  },
});

export default Map;
