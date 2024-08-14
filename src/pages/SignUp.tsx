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

  const [nicknameError, setNicknameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState('');

  const canGoNext = nickname && phoneNumber && verificationCode;

  //입력 필드에 공백이 입력된 경우 경고 메시지를 표시
  const handleTextChange = (
    text,
    setFunction,
    setErrorFunction,
    errorMessage,
  ) => {
    const trimmedText = text.trim();
    if (trimmedText !== text) {
      setErrorFunction(errorMessage);
    } else {
      setErrorFunction('');
      setFunction(trimmedText);
    }
  };

  const handleNicknameChange = text =>
    handleTextChange(
      text,
      setNickname,
      setNicknameError,
      '닉네임을 정확히 입력해 주세요.',
    );

  const handlePhoneNumberChange = text => {
    const numericText = text.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거
    if (numericText !== text) {
      setPhoneNumberError('전화번호를 정확히 입력해 주세요.');
    } else {
      setPhoneNumberError('');
      handleTextChange(
        numericText,
        setPhoneNumber,
        setPhoneNumberError,
        '전화번호를 정확히 입력해 주세요.',
      );
    }
  };

  const handleVerificationCodeChange = text => {
    const numericText = text.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거
    if (numericText !== text) {
      setVerificationCodeError('인증번호를 정확히 입력해 주세요.');
    } else {
      setVerificationCodeError('');
      handleTextChange(
        numericText,
        setVerificationCode,
        setVerificationCodeError,
        '인증번호를 정확히 입력해 주세요.',
      );
    }
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

      <View style={styles.inputWrapper}>
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
        {nicknameError ? (
          <Text style={styles.errorText}>{nicknameError}</Text>
        ) : null}
      </View>

      <View style={styles.inputWrapper}>
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
        {phoneNumberError ? (
          <Text style={styles.errorText}>{phoneNumberError}</Text>
        ) : null}
      </View>

      <View style={styles.inputWrapper}>
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
        {verificationCodeError ? (
          <Text style={styles.errorText}>{verificationCodeError}</Text>
        ) : null}
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
  inputWrapper: {
    marginBottom: 35, // 입력 필드 간의 간격을 늘리기 위해 설정
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  errorText: {
    color: 'red',
    marginLeft: 35,
    marginTop: 5,
  },
});

export default SignUp;
