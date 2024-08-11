import React, {useState} from 'react';
import LoginSVG from '../assets/login_fortran.svg';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

function SignUp() {
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const canGoNext = nickname && phoneNumber && verificationCode;

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
          onChangeText={setNickname}
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
          onChangeText={setPhoneNumber}
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
          onChangeText={setVerificationCode}
          secureTextEntry
          autoComplete="sms-otp" // 추가: 자동완성에 SMS OTP 사용
          importantForAutofill="yes" // 추가: 자동완성에 중요
          textContentType="oneTimeCode" // 추가: 일회성 코드 입력을 위한 필드임을 지정
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
    alignSelf: 'center', // 추가: 버튼을 가로 방향으로 중앙에 배치
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
