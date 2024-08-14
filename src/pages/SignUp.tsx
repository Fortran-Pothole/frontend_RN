import React, {useState} from 'react';
import LoginSVG from '../assets/login_fortran.svg';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

function SignUp() {
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const canGoNext = nickname && phoneNumber && verificationCode;

  //입력 필드에 공백이 입력된 경우 경고 메시지를 표시
  const handleTextChange = (text, setFunction, fieldName) => {
    const trimmedText = text.trim();
    if (trimmedText !== text) {
      Alert.alert('알림', `${fieldName}을(를) 정확히 입력해 주세요.`);
    } else {
      setFunction(trimmedText);
    }
  };

  const handleNicknameChange = text =>
    handleTextChange(text, setNickname, '닉네임');

  const handlePhoneNumberChange = text => {
    const numericText = text.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거
    if (numericText !== text) {
      Alert.alert('알림', '전화번호를 정확히 입력해 주세요.');
    }
    handleTextChange(numericText, setPhoneNumber, '전화번호');
  };

  const handleVerificationCodeChange = text => {
    const numericText = text.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거
    if (numericText !== text) {
      Alert.alert('알림', '인증번호를 정확히 입력해 주세요.');
    }
    handleTextChange(numericText, setVerificationCode, '인증번호');
  };

  const handleNicknameCheck = () => {
    // 닉네임 중복 확인 로직
  };

  const handlePhoneNumberVerification = () => {
    // 전화번호 인증 로직
  };

  const handleVerificationCodeCheck = () => {
    // 인증번호 확인 로직
    setIsVerified(true); // 임시로 인증 완료로 설정
  };

  const handleSignUp = () => {
    // 회원가입 로직
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <LoginSVG width={136} height={31} />
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="닉네임"
          value={nickname}
          onChangeText={handleNicknameChange}
        />
        <TouchableOpacity style={styles.button} onPress={handleNicknameCheck}>
          <Text style={styles.buttonText}>확인</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="전화번호"
          value={phoneNumber}
          keyboardType="phone-pad"
          onChangeText={handlePhoneNumberChange}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handlePhoneNumberVerification}>
          <Text style={styles.buttonText}>인증</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="전화번호 인증"
          value={verificationCode}
          keyboardType="numeric"
          onChangeText={handleVerificationCodeChange}
          secureTextEntry
          autoComplete="sms-otp"
          importantForAutofill="yes"
          textContentType="oneTimeCode"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleVerificationCodeCheck}>
          <Text style={styles.buttonText}>확인</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={
          !canGoNext
            ? styles.signUpButton
            : [styles.signUpButton, styles.signUpButtonActive]
        }
        onPress={handleSignUp}
        disabled={!canGoNext}>
        <Text style={styles.signUpButtonText}>가입하기</Text>
      </TouchableOpacity>

      {isVerified && (
        <Text style={styles.verificationText}>인증되었습니다!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 100,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 35,
  },
  input: {
    flex: 0.8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    padding: 12,
    marginLeft: 20,
    marginRight: 15,
  },
  button: {
    flex: 0.17,
    backgroundColor: '#003366',
    padding: 12,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signUpButton: {
    backgroundColor: '#727783',
    padding: 16,
    borderRadius: 25,
    marginBottom: 20,
    marginTop: 25,
    width: 230,
    alignItems: 'center',
    alignSelf: 'center',
  },
  signUpButtonActive: {
    backgroundColor: '#003366',
  },
  signUpButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  verificationText: {
    textAlign: 'center',
    color: 'green',
    marginTop: 16,
  },
});

export default SignUp;
