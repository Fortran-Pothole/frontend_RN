import { Text, View, TouchableOpacity, StyleSheet, Image, Modal, Button, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import IconSetting from '../assets/icon_system_line.svg';
import { useNavigation } from '@react-navigation/native';
import VoiceNotice from './VoiceNotice'; 
import NaverMapView, { Marker, Path } from 'react-native-nmap';
import Geolocation from '@react-native-community/geolocation';

function Map() {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // 현재 위치 가져오기
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setMyPosition({ latitude, longitude });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

    // 위치 변경 감지
    const watchId = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setMyPosition({ latitude, longitude });
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

  const openVoiceNotice = () => {
    setIsModalVisible(true);
  };

  const closeVoiceNotice = () => {
    setIsModalVisible(false);
  };

  const [myPosition, setMyPosition] = useState<{
    latitude: number;
    longitude: Number;
  } | null>(null);

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
            latitude: 37.65295948806934,
            longitude: 127.01698684530261,
          }}
          width={35}
          height={35}
          anchor={{x: 0.5, y:0.5}}
          caption={{text: '도착'}}
          image={require('../assets/pothole.png')}
        />
        <Path
          coordinates={[
            {
              latitude: start.latitude,
              longitude: start.longitude,
            },
            { latitude: end.latitude, longitude: end.longitude },
          ]}
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

// 고정된 위도 및 경도 값
const start = { latitude: 41.405, longitude: 2.17311 };
const end = { latitude: 41.405, longitude: 2.17311 };


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
    width: 60,
    height: 60,
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
});

export default Map;
