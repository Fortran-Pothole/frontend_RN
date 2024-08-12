import { Text, View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';

function Withdraw() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const isButtonDisabled = !(isChecked1 && isChecked2);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID</Text>
      <TextInput
        style={styles.input}
        onChangeText={setId}
        value={id}
        placeholder="Enter your ID"
        placeholderTextColor="#888"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter your Password"
        placeholderTextColor="#888"
        secureTextEntry
      />

      <Text style={styles.noticeText}>탈퇴를 위해 아래 내용을 확인 후, 체크해주세요</Text>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isChecked1}
          onValueChange={setIsChecked1}
          tintColors={{ true: '#102E6A', false: '#ffffff' }}
          boxType="square"
          onCheckColor="#102E6A" // 체크 표시 색상
          onFillColor="#ffffff" // 선택된 박스 배경색
          onTintColor="#102E6A" // 체크 표시 옆의 틴트 색상
          tintColor="#ffffff" // 선택되지 않은 박스 테두리 색상
          style={styles.checkbox}
        />
        <Text style={styles.checkboxText}>앱에서 신고한 데이터는 삭제되지 않습니다</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isChecked2}
          onValueChange={setIsChecked2}
          tintColors={{ true: '#102E6A', false: '#ffffff' }}
          boxType="square"
          onCheckColor="#102E6A" 
          onFillColor="#ffffff" 
          onTintColor="#102E6A" 
          tintColor="#ffffff" 
          style={styles.checkbox}
        />
        <Text style={styles.checkboxText}>회원 정보는 탈퇴 즉시 삭제 됩니다.</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
        disabled={isButtonDisabled}
      >
        <Text style={styles.buttonText}>탈퇴하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#266DFC',
    padding: 20,
  },
  label: {
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    color: 'black',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 20,
  },
  noticeText: {
    color: '#fff',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    color: '#fff',
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#266DFC',
    fontWeight: 'bold',
  },
});

export default Withdraw;
