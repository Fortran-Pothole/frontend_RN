import React, {useState} from 'react';
import {
  Alert,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setUserInfo} from '../slices/userSlice';
import LoginSVG from '../assets/login_fortran.svg';

function SignUp() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const isNameValid = name.trim().length > 0;
  const isPhoneValid = /^\d{10,11}$/.test(phone);
  const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
    password,
  );

  const canGoNext = isNameValid && isPhoneValid && isPasswordValid;

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

  const handleNameChange = text => {
    handleTextChange(
      text,
      setName,
      setNameError,
      '아이디를 정확히 입력해 주세요.',
    );
  };

  const handlePhoneChange = text => {
    setPhone(text);

    const phoneRegex = /^\d{10,11}$/;
    if (!phoneRegex.test(text)) {
      setPhoneError('전화번호는 11자리 숫자로 입력해 주세요.');
    } else {
      setPhoneError('');
    }
  };

  const handlePasswordChange = text => {
    setPassword(text);

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(text)) {
      setPasswordError('영문자와 숫자를 포함한 8자리 이상이어야 합니다.');
    } else {
      setPasswordError('사용 가능한 비밀번호입니다.');
    }
  };

  const handleSignUp = () => {
    if (canGoNext) {
      dispatch(setUserInfo({name, phone}));
      Alert.alert('알림', '회원가입이 완료되었습니다!');
      navigation.navigate('SignIn'); // SignIn 화면으로 이동
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
            style={styles.nameInput}
            placeholder="아이디"
            value={name}
            onChangeText={handleNameChange}
          />
        </View>
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
      </View>

      <View style={styles.inputWrapper}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.phoneInput}
            placeholder="전화번호"
            value={phone}
            keyboardType="numeric"
            onChangeText={handlePhoneChange}
          />
        </View>
        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
      </View>

      <View style={styles.inputWrapper}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.passwordInput}
            placeholder="비밀번호"
            value={password}
            secureTextEntry
            onChangeText={handlePasswordChange}
          />
        </View>
        {passwordError ? (
          <Text
            style={[
              styles.errorText,
              passwordError === '사용 가능한 비밀번호입니다.' && {
                color: 'green',
              },
            ]}>
            {passwordError}
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
    marginBottom: 35,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameInput: {
    flex: 0.85,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    padding: 12,
    marginLeft: 40,
  },
  phoneInput: {
    flex: 0.85,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    padding: 12,
    marginLeft: 40,
  },
  passwordInput: {
    flex: 0.85,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    padding: 12,
    marginLeft: 40,
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
