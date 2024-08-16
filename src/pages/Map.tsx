import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import IconSetting from '../assets/icon_system_line.svg';
import {useNavigation} from '@react-navigation/native';

function Map() {
  const navigation = useNavigation();

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
      <Text>지도</Text>
      <TouchableOpacity
        style={styles.micButton}
        onPress={() => console.log('마이크 버튼 pressed')}>
        <Image
          source={require('../assets/microphone.png')}
          style={styles.micIcon}
        />
      </TouchableOpacity>
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
    transform: [{translateX: -30}],
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
});

export default Map;
