import { Text, View, TouchableOpacity, StyleSheet, Image, Modal, Button, Dimensions, PanResponder} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import IconSetting from '../assets/icon_system_line.svg';
import { useNavigation } from '@react-navigation/native';
import VoiceNotice from './VoiceNotice'; 
import NaverMapView, { Marker, Path } from 'react-native-nmap';
import Geolocation from '@react-native-community/geolocation';
import checkDistance from '../../types/checkDistance';
import { movePosition, getDirection } from '../../types/locationUtils';

function Map() {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const openVoiceNotice = () => { setIsModalVisible(true);};
  const closeVoiceNotice = () => { setIsModalVisible(false);};
  const [showPotholeInfo, setShowPotholeInfo] = useState(false);
  const moveIntervalRef = useRef(null);
  
  const [myPosition, setMyPosition] = useState<{
    latitude: number;
    longitude: Number;
  } | null>(null);

    // 드래그 감지
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        const direction = getDirection(gestureState.dx, gestureState.dy);
        moveIntervalRef.current = setInterval(() => {
          setMyPosition(prevPosition => movePosition(prevPosition, direction));
        }, 100);
      },
      onPanResponderRelease: () => {
        clearInterval(moveIntervalRef.current);
      },
    })
  ).current;

  // 고정된 포트홀 위치
  const potholePosition = { latitude: 37.6538695717525, longitude: 127.01634111399655 };
  // 고정된 위도 및 경도 값
  const start = { latitude: 41.405, longitude: 2.17311 };

  useEffect(() => {
    // 현재 위치 가져오기
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setMyPosition({ latitude, longitude });

        const distance = checkDistance({ latitude, longitude }, potholePosition);
        if (distance <= 500) {
          setShowPotholeInfo(true);
        } else {
          setShowPotholeInfo(false);
        }
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

    // 위치 변경 감지
    const watchId = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setMyPosition({ latitude, longitude });

        const distance = checkDistance({ latitude, longitude }, potholePosition);
        if (distance <= 1000) {
          setShowPotholeInfo(true);
        } else {
          setShowPotholeInfo(false);
        }
      },
      error => console.log(error),
      { enableHighAccuracy: true, distanceFilter: 10 }
    );

    return () => {
      // 컴포넌트 언마운트 시 위치 감지를 중지
      Geolocation.clearWatch(watchId);
    };
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => console.log('수동 신고 pressed')}>
            <Text style={{ color: '#000', fontSize: 16, marginRight: 20 }}>
              수동 신고
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
            <IconSetting name="settings-outline" size={25} color="#000" style={{ marginRight: 15 }} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);


  return (
    <View style={styles.container}>
      <NaverMapView
        style={styles.map}
        zoomControl={false}
        center={{
          zoom: 17,
          tilt: 50,
          latitude: myPosition?.latitude || start.latitude,
          longitude: myPosition?.longitude || start.longitude,
        }}>
        <Marker
          coordinate={{
            latitude: potholePosition.latitude,
            longitude: potholePosition.longitude,
          }}
          width={35}
          height={35}
          anchor={{x: 0.5, y:0.5}}
          caption={{text: '포트홀'}}
          image={require('../assets/pothole.png')}
        />
        <Marker
          coordinate={{ 
            latitude: myPosition?.latitude || start.latitude,
            longitude: myPosition?.longitude || start.longitude,
          }}
          width={40}
          height={40}
          anchor={{x: 0.5, y:0.5}}
          caption={{text: '나의 위치'}}
          image={require('../assets/icon_current_location.png')}
        />
      </NaverMapView>

      {showPotholeInfo && (
        <View style={styles.potholeInfoContainer}>
          <Text style={styles.potholeInfoHeader}>포트홀 정보</Text>
          <Text style={styles.potholeInfoText}>전방 300m</Text>
          <Text style={styles.potholeInfoText}>포트홀 위험도: 주의</Text>
          <Text style={styles.potholeInfoText}>신고 수: 2</Text>
          <Text style={styles.potholeInfoText}>위도: {potholePosition.latitude.toFixed(5)}</Text>
          <Text style={styles.potholeInfoText}>경도: {potholePosition.longitude.toFixed(5)}</Text>

          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/blue-dot.png')}
              style={styles.potholeImage}
            />
          </View>
        </View>
)}

      <TouchableOpacity
        style={styles.micButton}
        onPress={openVoiceNotice}>
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
    transform: [{ translateX: -30 }],
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
    bottom: 20,
    left: 20,
    width: 100,
    height: 100,
  },
  controlImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default Map;
