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
        <View style={styles.labelContainer}>
          <Text style={styles.label}>위치</Text>
          <TouchableOpacity style={styles.locationButton}>
            <Image
              source={{uri: 'location-icon-url'}}
              style={styles.locationIcon}
            />
            <Text style={styles.locationText}>현재 위치 불러오기</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="위치 입력"
          value={location}
          onChangeText={setLocation}
        />
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

      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginVertical: 10,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    color: '#000',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#F5F5F5',
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
    backgroundColor: '#F5F5F5',
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
  signUpButton: {
    padding: 16,
    borderRadius: 25,
    marginBottom: 20,
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
