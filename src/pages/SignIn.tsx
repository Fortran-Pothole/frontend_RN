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

function SignIn({setLoggedIn}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const isUsernameValid = username.trim().length > 0;
  const isPasswordValid = password.trim().length > 0;
  const canLogin = isUsernameValid && isPasswordValid;

  const handleUsernameChange = text => {
    setUsernameError('');
    setUsername(text);
  };

  const handleLogin = () => {
    if (canLogin) {
      Alert.alert('알림', '로그인에 성공했습니다!');
      setLoggedIn(true); // 로그인 상태를 true로 설정하여 LoggedInStack으로 전환
    } else {
      Alert.alert('알림', '아이디와 비밀번호를 확인해 주세요.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <LoginSVG width={136} height={31} />
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.usernameInput}
          placeholder="아이디"
          value={username}
          onChangeText={handleUsernameChange}
        />
        {usernameError ? (
          <Text style={styles.errorText}>{usernameError}</Text>
        ) : null}
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.passwordInput}
          placeholder="비밀번호"
          value={password}
          secureTextEntry
          onChangeText={setPassword} // Directly updating password state
        />
      </View>

      <TouchableOpacity
        style={[
          styles.signInButton,
          {backgroundColor: canLogin ? '#003366' : '#727783'},
        ]}
        onPress={handleLogin}
        disabled={!canLogin}>
        <Text style={styles.signInButtonText}>로그인</Text>
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
  usernameInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    padding: 12,
    marginLeft: 20,
    marginRight: 15,
  },
  passwordInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    padding: 12,
    marginLeft: 20,
    marginRight: 15,
  },
  signInButton: {
    padding: 16,
    borderRadius: 25,
    marginBottom: 20,
    marginTop: 25,
    width: 230,
    alignItems: 'center',
    alignSelf: 'center',
  },
  signInButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginLeft: 35,
    marginTop: 5,
  },
});

export default SignIn;
