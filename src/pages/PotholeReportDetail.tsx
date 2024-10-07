import React, {useState, useEffect} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchManualReportById,
  postManualReport,
} from '../slices/manualPotholeSlice';
import {fetchAutoReportById} from '../slices/autoPotholeSlice';

const getFormattedDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`; // YYYY-MM-DD 형식
};

const PotholeReportDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {report_id, readOnly, reportType} = route.params;

  // 수동 신고일 경우 수동 신고 데이터를 불러오고, 자동 신고일 경우 자동 신고 데이터를 불러옴
  const report =
    reportType === 'manual'
      ? useSelector(state =>
          state.manualPothole.manualReports.find(r => r.id === report_id),
        )
      : useSelector(state => state.autoPothole.selectedAutoReport);

  const user = useSelector(state => state.user);

  // Redux에서 저장된 전화번호 가져오기
  const phone = useSelector((state: any) => state.user.phone);

  const [location, setLocation] = useState(route.params?.location || '');
  const [description, setDescription] = useState(
    route.params?.description || '',
  );
  const [institution, setInstitution] = useState(
    route.params?.institution || '안전신문고',
  );
  const [contact, setContact] = useState(user.phone || '');
  const [reportDate, setReportDate] = useState(
    route.params?.reportDate || getFormattedDate(),
  );
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [photos, setPhotos] = useState(route.params?.photos || []); // PotholeReport에서 전달된 사진

  const isSubmitButtonEnabled =
    location.trim().length > 0 &&
    description.trim().length > 0 &&
    institution.trim().length > 0 &&
    contact.trim().length === 11 &&
    reportDate.trim().length > 0;

  useEffect(() => {
    // 수동 신고일 경우
    if (reportType === 'manual' && report_id && !report) {
      dispatch(fetchManualReportById(report_id)); // 수동 신고 데이터 가져오기
    } else if (reportType === 'auto' && report_id && !report) {
      dispatch(fetchAutoReportById(report_id)); // 자동 신고 데이터 가져오기
    }
  }, [dispatch, report_id, report, reportType]);

  // 신고 데이터를 불러오고 상태에 반영하는 useEffect
  useEffect(() => {
    if (report) {
      if (reportType === 'manual') {
        setLocation(report.location);
        setDescription(report.content);
        setReportDate(report.created_at.split('T')[0]);
        setPhotos(report.images ? report.images.split(',') : []);
      } else if (reportType === 'auto') {
        setLocation(`${report.lat}, ${report.lng}`);
        setReportDate(report.created_at.split('T')[0]);
        setPhotos(report.image ? [report.image] : []);
      }
    }
  }, [report, reportType]);

  const handleContactChange = text => {
    const cleanedText = text.replace(/[^0-9]/g, ''); // 숫자만 허용
    setContact(cleanedText);
    if (cleanedText.length !== 11) {
      setPhoneNumberError('전화번호를 정확히 입력해 주세요.');
    } else {
      setPhoneNumberError('');
    }
  };

  const handleSubmit = async () => {
    if (readOnly) {
      return; // 읽기 전용 모드에서는 저장을 막음
    }

    const newReport = {
      location: location.trim(),
      content: description.trim(),
      images: photos.join(','),
      user_id: user.id,
    };

    try {
      await dispatch(postManualReport(newReport)).unwrap();
      console.log('신고 성공');

      if (route.params?.fromReport) {
        navigation.pop(2);
      }
      navigation.navigate('PotholeReportTabs');
    } catch (error) {
      console.error('신고 실패:', error);
    }
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

        {reportType !== 'auto' && (
          <>
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
          </>
        )}

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
