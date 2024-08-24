import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import ImageIcon from '../assets/icon _image_gallery.svg';
import {useDispatch} from 'react-redux';
import {addReport} from '../slices/potholeSlice';

const PotholeReportDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [location, setLocation] = useState(route.params?.location || '');
  const [description, setDescription] = useState(
    route.params?.description || '',
  );
  const [institution, setInstitution] = useState('');
  const [contact, setContact] = useState('');
  const [reportDate, setReportDate] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const isSubmitButtonEnabled =
    location.trim().length > 0 &&
    description.trim().length > 0 &&
    institution.trim().length > 0 &&
    contact.trim().length === 11 && // 연락처가 정확히 11자리여야 함
    reportDate.trim().length > 0;

  const handleContactChange = text => {
    const cleanedText = text.replace(/[^0-9]/g, ''); // 숫자만 허용
    setContact(cleanedText);
    if (cleanedText.length !== 11) {
      setPhoneNumberError('전화번호를 정확히 입력해 주세요.');
    } else {
      setPhoneNumberError('');
    }
  };

  const handleSubmit = () => {
    if (contact.length !== 11) {
      setPhoneNumberError('전화번호를 정확히 입력해 주세요.');
      return;
    }

    const newReport = {
      id: Date.now(),
      location,
      description,
      institution,
      contact,
      reportDate,
    };

    dispatch(addReport(newReport));
    navigation.navigate('PotholeReportList');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>위치</Text>
      <TextInput
        style={[styles.textInput, styles.locationTextInput]}
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>신고 내용</Text>
      <TextInput
        style={styles.textArea}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>접수 기관</Text>
      <TextInput
        style={styles.textInput}
        value={institution}
        onChangeText={setInstitution}
      />

      <Text style={styles.label}>연락처</Text>
      <TextInput
        style={[styles.textInput, phoneNumberError ? styles.errorInput : null]}
        value={contact}
        onChangeText={handleContactChange}
        keyboardType="numeric"
        maxLength={11} // 최대 11자리로 제한
      />
      {phoneNumberError ? (
        <Text style={styles.errorText}>{phoneNumberError}</Text>
      ) : null}

      <Text style={styles.label}>신고 일자</Text>
      <TextInput
        style={styles.textInput}
        value={reportDate}
        onChangeText={setReportDate}
      />

      <Text style={styles.label}>사진 첨부</Text>
      <View style={styles.photoRow}>
        <TouchableOpacity style={styles.squarePhotoBox}>
          <ImageIcon width={40} height={40} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.squarePhotoBox}>
          <ImageIcon width={40} height={40} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.submitButton,
          {backgroundColor: isSubmitButtonEnabled ? '#153C8B' : '#727783'},
        ]}
        onPress={handleSubmit}
        disabled={!isSubmitButtonEnabled}>
        <Text style={styles.submitButtonText}>신고</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    height: 40,
    borderColor: '#F5F5F5',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  locationTextInput: {
    height: 70,
  },
  textArea: {
    height: 100,
    borderColor: '#F5F5F5',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    marginBottom: 15,
    textAlignVertical: 'top',
  },
  photoRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  squarePhotoBox: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    marginRight: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    marginLeft: 5,
  },
  errorInput: {
    borderColor: 'red',
  },
  submitButton: {
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center',
    width: 300,
  },
  submitButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PotholeReportDetail;
