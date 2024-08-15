import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from '../assets/icon_system_line.svg';
import {useNavigation} from '@react-navigation/native';

function Map() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <Icon
            name="settings-outline"
            size={25}
            color="#000"
            style={{marginRight: 15}}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Text>지도</Text>
    </View>
  );
}

export default Map;
