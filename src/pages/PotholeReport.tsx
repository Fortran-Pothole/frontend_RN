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
      <View style={styles.header}>
        <Text style={styles.headerText}>포트홀 신고</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Image source={{uri: 'menu-icon-url'}} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>위치</Text>
          <TouchableOpacity style={styles.locationButton}>
            <Image
              source={{uri: 'location-icon-url'}}
              style={styles.locationIcon}
            />
            <Text>현재 위치 불러오기</Text>
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
  header: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
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
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
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
  },
  photoIcon: {
    width: 50,
    height: 50,
    tintColor: '#ccc',
  },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PotholeReport;
