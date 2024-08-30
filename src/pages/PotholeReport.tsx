import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import LocationIcon from '../assets/icon_location.svg';
import ImageIcon from '../assets/icon _image_gallery.svg';
import CancelIcon from '../assets/icon_cancel_img.svg';
import {launchImageLibrary} from 'react-native-image-picker';
import {PERMISSIONS, request, check, RESULTS} from 'react-native-permissions';

const PotholeReport = ({navigation}) => {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);

  const isNextButtonEnabled =
    location.trim().length > 0 && description.trim().length > 0;

  const handleNextPress = () => {
    navigation.navigate('PotholeReportDetail', {location, description, photos});
  };

  const handlePhotoUpload = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const selectedImage = response.assets[0].uri;
        setPhotos([...photos, selectedImage]);
      }
    });
  };

  const handleDeletePhoto = index => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
  };

  const checkLocationPermission = async () => {
    const result = await check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );

    switch (result) {
      case RESULTS.UNAVAILABLE:
        Alert.alert('오류', '이 기기에서 위치 서비스를 사용할 수 없습니다.');
        break;
      case RESULTS.DENIED:
        requestLocationPermission();
        break;
      case RESULTS.LIMITED:
        Alert.alert('알림', '위치 서비스가 제한적으로 설정되어 있습니다.');
        break;
      case RESULTS.GRANTED:
        handleGetCurrentLocation();
        break;
      case RESULTS.BLOCKED:
        Alert.alert(
          '권한 거부됨',
          '위치 서비스가 거부되었습니다. 설정에서 권한을 허용해주세요.',
          [{text: '확인'}],
        );
        break;
    }
  };

  const requestLocationPermission = async () => {
    const result = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );

    if (result === RESULTS.GRANTED) {
      handleGetCurrentLocation();
    } else {
      Alert.alert(
        '권한 필요',
        '위치 서비스를 사용하려면 위치 권한이 필요합니다.',
        [{text: '확인'}],
      );
    }
  };

  const handleGetCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation(`위도: ${latitude}, 경도: ${longitude}`);
      },
      error => {
        console.error(
          'Error Code: ',
          error.code,
          'Error Message: ',
          error.message,
        );
        if (error.code === 1) {
          Alert.alert('위치 접근 권한이 없습니다. 권한을 허용해주세요.');
        } else if (error.code === 2) {
          Alert.alert(
            '위치를 가져올 수 없습니다. 네트워크 상태를 확인해주세요.',
          );
        } else if (error.code === 3) {
          Alert.alert('위치 요청이 타임아웃되었습니다. 다시 시도해주세요.');
        } else {
          Alert.alert('알 수 없는 오류가 발생했습니다.');
        }
      },
      {
        enableHighAccuracy: false, // 네트워크 기반 위치 확인
        timeout: 30000, // 타임아웃 시간을 30초로 늘림
        maximumAge: 0, // 항상 최신 위치 정보 사용
      },
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>위치</Text>
            <TouchableOpacity
              style={styles.locationButton}
              onPress={checkLocationPermission}>
              <LocationIcon
                width={17}
                height={17}
                style={styles.locationIcon}
              />
              <Text style={styles.locationText}>현재 위치 불러오기</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={[styles.textInput, styles.locationTextInput]}
            value={location}
            onChangeText={setLocation}
            multiline
          />
        </View>

        <View>
          <Text style={styles.label}>신고 내용</Text>
          <TextInput
            style={[styles.textInput, styles.descriptionTextInput]}
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        <View style={styles.photoSection}>
          <Text style={styles.label}>사진 첨부</Text>
          <View style={styles.photoRow}>
            {photos.map((photoUri, index) => (
              <View key={index} style={styles.photoContainer}>
                <Image source={{uri: photoUri}} style={styles.uploadedPhoto} />
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeletePhoto(index)}>
                  <CancelIcon width={18} height={18} />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              style={styles.squarePhotoBox}
              onPress={handlePhotoUpload}>
              <ImageIcon width={30} height={30} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.nextButton,
            {backgroundColor: isNextButtonEnabled ? '#266DFC' : '#727783'},
          ]}
          onPress={handleNextPress}
          disabled={!isNextButtonEnabled}>
          <Text style={styles.nextButtonText}>다음</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 17,
    color: '#000',
    marginLeft: 18,
    marginBottom: 8,
    marginTop: 25,
    fontWeight: 'bold',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    color: '#000',
    marginLeft: 10,
    marginRight: 10,
  },
  locationTextInput: {
    height: 150,
  },
  descriptionTextInput: {
    height: 200,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 5,
    marginBottom: 5,
    marginTop: 25,
  },
  locationText: {
    color: '#000',
    fontSize: 15,
    marginRight: 13,
    marginBottom: 5,
    marginTop: 25,
  },
  photoSection: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
  photoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  photoContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
  },
  squarePhotoBox: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  uploadedPhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    borderRadius: 10,
    padding: 3,
    zIndex: 1,
  },
  nextButton: {
    padding: 14,
    borderRadius: 25,
    marginBottom: 15,
    marginTop: 5,
    width: 300,
    alignItems: 'center',
    alignSelf: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PotholeReport;
