import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ImageIcon from '../assets/icon _image_gallery.svg';

const PotholeReportDetail = () => {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [institution, setInstitution] = useState('');
  const [contact, setContact] = useState('');
  const [reportDate, setReportDate] = useState('');

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
        style={styles.textInput}
        value={contact}
        onChangeText={setContact}
        keyboardType="phone-pad"
      />

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

      <TouchableOpacity style={styles.submitButton}>
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
  submitButton: {
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
    backgroundColor: '#153C8B',
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
