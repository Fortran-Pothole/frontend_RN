import React, {useState} from 'react';
import axios from 'axios';
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
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');

  const navigation = useNavigation();

  const isNameValid = name.trim().length > 0;
  const isPasswordValid = password.trim().length > 0;
  const canLogin = isNameValid && isPasswordValid;

  const handleNameChange = text => {
    setNameError('');
    setName(text);
  };

  const handleLogin = async () => {
    if (canLogin) {
      try {
        const response = await axios.post('http://15.164.23.163/user/login', {
          name: name,
          password: password,
        });

        if (response.status === 200) {
          Alert.alert('알림', '로그인에 성공했습니다!');
          setLoggedIn(true); // 로그인 상태를 true로 설정하여 LoggedInStack으로 전환
        } else {
          Alert.alert('오류', '로그인에 실패했습니다.');
        }
      } catch (error) {
        Alert.alert('오류', '서버와의 연결에 실패했습니다.');
      }
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
          style={styles.nameInput}
          placeholder="아이디"
          value={name}
          onChangeText={handleNameChange}
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.passwordInput}
          placeholder="비밀번호"
          value={password}
          secureTextEntry
          onChangeText={setPassword} // 비밀번호 상태를 직접 업데이트
        />
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpText}>회원가입</Text>
        </TouchableOpacity>
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
  nameInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    padding: 12,
    marginLeft: 40,
    marginRight: 40,
  },
  passwordInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    padding: 12,
    marginLeft: 40,
    marginRight: 40,
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
  signUpText: {
    color: '#003366',
    marginTop: 15,
    textAlign: 'right',
    marginRight: 50,
    textDecorationLine: 'underline',
  },
});

export default SignIn;
