import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LocationIcon from '../assets/icon_location.svg';
import ImageIcon from '../assets/icon _image_gallery.svg';

const PotholeReport = ({navigation}) => {
  // navigation prop 추가
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>위치</Text>
          <TouchableOpacity style={styles.locationButton}>
            <LocationIcon width={17} height={17} style={styles.locationIcon} />
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
          style={[styles.textInput, styles.descriptionTextInput]} // 신고 내용 입력 필드 높이 설정
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>

      <View>
        <Text style={styles.label}>사진 첨부</Text>
        <View style={styles.photoRow}>
          <TouchableOpacity style={styles.squarePhotoBox}>
            <ImageIcon width={30} height={30} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.squarePhotoBox}>
            <ImageIcon width={30} height={30} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.navigate('PotholeReportDetail')} // PotholeReportDetail로 이동
      >
        <Text style={styles.signUpButtonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    height: 150, // 위치 입력 필드 높이 설정
  },
  descriptionTextInput: {
    height: 200, // 신고 내용 입력 필드 높이 설정
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
  photoRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  squarePhotoBox: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginLeft: 10,
    marginRight: 10,
  },
  signUpButton: {
    padding: 14,
    borderRadius: 25,
    marginBottom: 15,
    marginTop: 40,
    width: 300,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#266DFC',
  },
  signUpButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PotholeReport;
