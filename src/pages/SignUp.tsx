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
import {useNavigation} from '@react-navigation/native';

function SignUp({setLoggedIn}) {
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const [nicknameVerified, setNicknameVerified] = useState(false);
  const [phoneNumberVerified, setPhoneNumberVerified] = useState(false);

  const [nicknameError, setNicknameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState('');

  const navigation = useNavigation();

  const canGoNext = nicknameVerified && phoneNumberVerified && isVerified;

  const isNicknameValid = nickname.trim().length > 0;
  const isPhoneNumberValid = phoneNumber.length === 11;
  const isVerificationCodeValid = verificationCode.trim().length > 0;

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

  const handleNicknameChange = text => {
    setNicknameVerified(false);
    handleTextChange(
      text,
      setNickname,
      setNicknameError,
      '닉네임을 정확히 입력해 주세요.',
    );
  };

  const handlePhoneNumberChange = text => {
    setPhoneNumberVerified(false);
    const numericText = text.replace(/[^0-9]/g, '');
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
    const numericText = text.replace(/[^0-9]/g, '');
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

  const handleNicknameCheck = async () => {
    if (!nickname) {
      setNicknameError('닉네임을 입력해 주세요.');
      return;
    }

    const existingNicknames = [
      'existingUser1',
      'existingUser2',
      'existingUser3',
    ];

    if (existingNicknames.includes(nickname)) {
      setNicknameError('이미 다른 사용자가 사용 중 입니다.');
      setNicknameVerified(false);
    } else {
      setNicknameError('사용 가능한 닉네임입니다.');
      setNicknameVerified(true);
    }
  };

  const handlePhoneNumberVerification = () => {
    setPhoneNumberVerified(true);
  };

  const handleVerificationCodeCheck = () => {
    setIsVerified(true);
  };

  const handleSignUp = () => {
    if (canGoNext) {
      Alert.alert('알림', '회원가입이 완료되었습니다!');
      setLoggedIn(true); // 로그인 상태로 전환

      // 네비게이션을 지연시킨 후 이동
      setTimeout(() => {
        navigation.navigate('Map'); // 회원가입 완료 후 Map 화면으로 이동
      }, 100); // 100ms 지연
    } else {
      Alert.alert('알림', '모든 확인 절차를 완료해 주세요.');
    }
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
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: isNicknameValid ? '#003366' : '#727783'},
            ]}
            onPress={handleNicknameCheck}
            disabled={!isNicknameValid}>
            <Text style={styles.buttonText}>확인</Text>
          </TouchableOpacity>
        </View>
        {nicknameError ? (
          <Text
            style={[
              styles.errorText,
              nicknameError === '사용 가능한 닉네임입니다.' && {color: 'green'},
            ]}>
            {nicknameError}
          </Text>
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
            style={[
              styles.button,
              {backgroundColor: isPhoneNumberValid ? '#003366' : '#727783'},
            ]}
            onPress={handlePhoneNumberVerification}
            disabled={!isPhoneNumberValid}>
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
            style={[
              styles.button,
              {
                backgroundColor: isVerificationCodeValid
                  ? '#003366'
                  : '#727783',
              },
            ]}
            onPress={handleVerificationCodeCheck}
            disabled={!isVerificationCodeValid}>
            <Text style={styles.buttonText}>확인</Text>
          </TouchableOpacity>
        </View>
        {verificationCodeError || isVerified ? (
          <Text style={[styles.errorText, isVerified && {color: 'green'}]}>
            {isVerified ? '인증되었습니다!' : verificationCodeError}
          </Text>
        ) : null}
      </View>

      <TouchableOpacity
        style={[
          styles.signUpButton,
          {backgroundColor: canGoNext ? '#003366' : '#727783'},
        ]}
        onPress={handleSignUp}
        disabled={!canGoNext}>
        <Text style={styles.signUpButtonText}>가입하기</Text>
      </TouchableOpacity>
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
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signUpButton: {
    padding: 16,
    borderRadius: 25,
    marginBottom: 20,
    marginTop: 25,
    width: 230,
    alignItems: 'center',
    alignSelf: 'center',
  },
  signUpButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginLeft: 35,
    marginTop: 5,
  },
});

export default SignUp;
