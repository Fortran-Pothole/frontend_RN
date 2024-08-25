import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import LocationIcon from '../assets/icon_location.svg';
import ImageIcon from '../assets/icon _image_gallery.svg';
import CancelIcon from '../assets/icon_cancel_img.svg'; // 삭제 아이콘 추가
import {launchImageLibrary} from 'react-native-image-picker';

const PotholeReport = ({navigation}) => {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]); // 업로드된 이미지들을 저장할 상태

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
        setPhotos([...photos, selectedImage]); // 선택한 이미지를 상태에 추가
      }
    });
  };

  const handleDeletePhoto = index => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos); // 이미지 삭제 후 상태 업데이트
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>위치</Text>
            <TouchableOpacity style={styles.locationButton}>
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
    marginLeft: 10, // 신고 내용과 동일한 간격을 맞추기 위해 추가
    marginRight: 10,
    marginTop: 20, // 신고 내용과 사진 첨부 사이 간격을 맞추기 위해 추가
  },
  photoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // 사진들이 동일한 간격으로 배치되도록 조정
    marginBottom: 20,
  },
  photoContainer: {
    position: 'relative',
    width: 100, // 사진 크기에 맞춰 일정한 넓이 설정
    height: 100, // 사진 크기에 맞춰 일정한 높이 설정
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
    marginBottom: 10, // 추가된 박스가 기존 박스들과 동일한 간격을 유지하도록 설정
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
