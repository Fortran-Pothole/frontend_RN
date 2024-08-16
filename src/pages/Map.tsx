import { Text, View, TouchableOpacity, StyleSheet, Image, Modal, Button} from 'react-native';
import React, { useState } from 'react';
import IconSetting from '../assets/icon_system_line.svg';
import { useNavigation } from '@react-navigation/native';
import VoiceNotice from './VoiceNotice'; 

function Map() {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  return (
    <View style={styles.container}>
      <Text>지도</Text>

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
    justifyContent: 'center',
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
    position: 'absolute',
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
