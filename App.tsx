import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Map from './src/pages/Map';
import NoticePothole from './src/pages/NoitcePothole';
import OpenSourceLicenseScreen from './src/pages/OpenSource';
import {useState} from 'react';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import {Setting, WebViewScreen} from './src/pages/Setting';

// 로그인 후 보이는 화면
export type LoggedInParamList = {
  Map: undefined;
  Setting: undefined;
  WebViewScreen: {url: string};
  OpenSourceLicenseScreen: undefined;
  NoticePothole: undefined;
};

// 로그인하지 않았을 때 보이는 화면
export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const LoggedInStack = createNativeStackNavigator<LoggedInParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false); // 로그인 상태 관리

  return (
    <NavigationContainer>
      {isLoggedIn ? ( // 로그인 상태에 따라 다른 네비게이션 구조를 렌더링
        <LoggedInStack.Navigator>
          <LoggedInStack.Screen
            name="Map"
            component={Map}
            options={{title: '메인 화면'}}
          />
          <LoggedInStack.Screen
            name="Setting"
            component={Setting}
            options={{title: '설정'}}
          />
          <LoggedInStack.Screen
            name="WebViewScreen"
            component={WebViewScreen}
            options={{headerShown: false}}
          />
          <LoggedInStack.Screen
            name="OpenSourceLicenseScreen"
            component={OpenSourceLicenseScreen}
            options={{title: 'OpenSource'}}
          />
          <LoggedInStack.Screen
            name="NoticePothole"
            component={NoticePothole}
            options={{title: '신고한 포트홀 조회'}}
          />
        </LoggedInStack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignUp"
            options={{title: '회원가입', headerShown: false}}>
            {props => <SignUp {...props} setLoggedIn={setLoggedIn} />}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
