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
import LoginSVG from '../assets/login_fortran.svg';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameVerified, setUsernameVerified] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigation = useNavigation();

  const isUsernameValid = username.trim().length > 0;
  const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
    password,
  );

  const canGoNext = usernameVerified && isPasswordValid;

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

  const handleUsernameChange = text => {
    setUsernameVerified(false);
    handleTextChange(
      text,
      setUsername,
      setUsernameError,
      '아이디를 정확히 입력해 주세요.',
    );
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

  const handleUsernameCheck = async () => {
    if (!username) {
      setUsernameError('아이디를 입력해 주세요.');
      return;
    }

    try {
      const existingUsernames = [
        'existingUser1',
        'existingUser2',
        'existingUser3',
      ];

      if (existingUsernames.includes(username)) {
        setUsernameError('이미 다른 사용자가 사용 중 입니다.');
        setUsernameVerified(false);
      } else {
        setUsernameError('사용 가능한 아이디입니다.');
        setUsernameVerified(true);
      }
    } catch (error) {
      console.error('Username check failed', error);
      setUsernameError('아이디 확인 중 오류가 발생했습니다.');
    }
  };

  const handleSignUp = () => {
    if (canGoNext) {
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
            style={styles.usernameInput}
            placeholder="아이디"
            value={username}
            onChangeText={handleUsernameChange}
          />
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: isUsernameValid ? '#003366' : '#727783'},
            ]}
            onPress={handleUsernameCheck}
            disabled={!isUsernameValid}>
            <Text style={styles.buttonText}>확인</Text>
          </TouchableOpacity>
        </View>
        {usernameError ? (
          <Text
            style={[
              styles.errorText,
              usernameError === '사용 가능한 아이디입니다.' && {color: 'green'},
            ]}>
            {usernameError}
          </Text>
        ) : null}
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
  usernameInput: {
    flex: 0.8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    padding: 12,
    marginLeft: 20,
    marginRight: 15,
  },
  passwordInput: {
    flex: 0.75,
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
