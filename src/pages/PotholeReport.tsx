import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

const PotholeReport = () => {
  const [location, setLocation] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>위치</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            placeholder="위치 입력"
            value={location}
            onChangeText={setLocation}
          />
          <TouchableOpacity style={styles.locationButton}>
            <Image
              source={{uri: 'location-icon-url'}}
              style={styles.locationIcon}
            />
            <Text style={styles.locationText}>현재 위치 불러오기</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>신고 내용</Text>
        <TextInput
          style={styles.textAreaInput}
          placeholder="신고 내용을 입력하세요"
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>

      <View style={styles.photoContainer}>
        <Text style={styles.label}>사진 첨부</Text>
        <View style={styles.photoRow}>
          <TouchableOpacity style={styles.photoBox}>
            <Image
              source={{uri: 'placeholder-image-url'}}
              style={styles.photoIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.photoBox}>
            <Image
              source={{uri: 'placeholder-image-url'}}
              style={styles.photoIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>다음</Text>
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
  backButton: {
    padding: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    width: 20,
    height: 20,
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  locationText: {
    color: '#007bff',
  },
  textAreaInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    height: 100,
    textAlignVertical: 'top',
  },
  photoContainer: {
    marginVertical: 20,
  },
  photoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photoBox: {
    width: '48%',
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  photoIcon: {
    width: 50,
    height: 50,
    tintColor: '#aaa',
  },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PotholeReport;
