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
import {useNavigation, useRoute} from '@react-navigation/native';
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
  const [institution, setInstitution] = useState(
    route.params?.institution || '',
  );
  const [contact, setContact] = useState(route.params?.contact || '');
  const [reportDate, setReportDate] = useState(route.params?.reportDate || '');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [photos, setPhotos] = useState(route.params?.photos || []); // PotholeReport에서 전달된 사진

  const readOnly = route.params?.readOnly || false;

  const isSubmitButtonEnabled =
    location.trim().length > 0 &&
    description.trim().length > 0 &&
    institution.trim().length > 0 &&
    contact.trim().length === 11 &&
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
    if (readOnly) {
      return; // 읽기 전용 모드에서는 저장을 막음
    }

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
      photos, // 사진 추가
    };

    dispatch(addReport(newReport));
    navigation.navigate('PotholeReportList');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.label}>위치</Text>
        <TextInput
          style={[styles.textInput, styles.locationTextInput]}
          value={location}
          onChangeText={setLocation}
          editable={!readOnly}
          selectTextOnFocus={!readOnly}
          color="#000" // 텍스트 색상 검정으로 설정
        />

        <Text style={styles.label}>신고 내용</Text>
        <TextInput
          style={styles.textArea}
          value={description}
          onChangeText={setDescription}
          editable={!readOnly}
          selectTextOnFocus={!readOnly}
          multiline
          color="#000" // 텍스트 색상 검정으로 설정
        />

        <Text style={styles.label}>접수 기관</Text>
        <TextInput
          style={styles.textInput}
          value={institution}
          onChangeText={setInstitution}
          editable={!readOnly}
          selectTextOnFocus={!readOnly}
          color="#000" // 텍스트 색상 검정으로 설정
        />

        <Text style={styles.label}>연락처</Text>
        <TextInput
          style={[
            styles.textInput,
            phoneNumberError ? styles.errorInput : null,
          ]}
          value={contact}
          onChangeText={handleContactChange}
          keyboardType="numeric"
          maxLength={11}
          editable={!readOnly}
          selectTextOnFocus={!readOnly}
          color="#000" // 텍스트 색상 검정으로 설정
        />
        {phoneNumberError && !readOnly ? (
          <Text style={styles.errorText}>{phoneNumberError}</Text>
        ) : null}

        <Text style={styles.label}>신고 일자</Text>
        <TextInput
          style={styles.textInput}
          value={reportDate}
          onChangeText={setReportDate}
          editable={!readOnly}
          selectTextOnFocus={!readOnly}
          color="#000" // 텍스트 색상 검정으로 설정
        />

        <Text style={styles.label}>사진 첨부</Text>
        <View style={styles.photoRow}>
          {photos.map((photoUri, index) => (
            <Image
              key={index}
              source={{uri: photoUri}}
              style={styles.uploadedPhoto}
            />
          ))}
        </View>

        {!readOnly && (
          <TouchableOpacity
            style={[
              styles.submitButton,
              {backgroundColor: isSubmitButtonEnabled ? '#153C8B' : '#727783'},
            ]}
            onPress={handleSubmit}
            disabled={!isSubmitButtonEnabled}>
            <Text style={styles.submitButtonText}>신고</Text>
          </TouchableOpacity>
        )}
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
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  uploadedPhoto: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 15,
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
    marginTop: 10,
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
