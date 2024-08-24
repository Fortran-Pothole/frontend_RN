import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux'; // react-redux에서 Provider import
import store from './src/store'; // Redux store import
import Map from './src/pages/Map';
import VoiceNotice from './src/pages/VoiceNotice';
import Withdraw from './src/pages/Withdraw';
import NoitcePothole from './src/pages/NoitcePothole';
import OpenSourceLicenseScreen from './src/pages/OpenSource';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import {Setting, WebViewScreen} from './src/pages/Setting';
import PotholeReport from './src/pages/PotholeReport';
import PotholeReportDetail from './src/pages/PotholeReportDetail';
import PotholeReportList from './src/pages/PotholeReportList';
import IconMenuBar from './src/assets/icon_menu_bar.svg';

export type LoggedInParamList = {
  Map: undefined;
  Setting: undefined;
  WebViewScreen: {url: string};
  OpenSourceLicenseScreen: undefined;
  NoitcePothole: undefined;
  Withdraw: undefined;
  VoiceNotice: undefined;
  PotholeReport: undefined;
  PotholeReportDetail: undefined;
  PotholeReportList: undefined;
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const LoggedInStack = createNativeStackNavigator<LoggedInParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const [isLoggedIn, setLoggedIn] = useState(true);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {isLoggedIn ? (
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
              name="NoitcePothole"
              component={NoitcePothole}
              options={{title: '신고한 포트홀 조회'}}
            />
            <LoggedInStack.Screen
              name="Withdraw"
              component={Withdraw}
              options={{title: '탈퇴하기'}}
            />
            <LoggedInStack.Screen
              name="PotholeReport"
              component={PotholeReport}
              options={{
                title: '포트홀 신고',
                headerStyle: {
                  backgroundColor: '#266DFC',
                },
                headerTintColor: '#fff',
                headerRight: () => <IconMenuBar width={30} height={30} />,
              }}
            />
            <LoggedInStack.Screen
              name="PotholeReportDetail"
              component={PotholeReportDetail}
              options={{
                title: '포트홀 신고',
                headerStyle: {
                  backgroundColor: '#266DFC',
                },
                headerTintColor: '#fff',
                headerRight: () => <IconMenuBar width={30} height={30} />,
              }}
            />
            <LoggedInStack.Screen
              name="PotholeReportList"
              component={PotholeReportList} // PotholeReportList 추가
              options={{
                title: '신고 목록',
                headerStyle: {
                  backgroundColor: '#266DFC',
                },
                headerTintColor: '#fff',
                headerRight: () => <IconMenuBar width={30} height={30} />,
              }}
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
    </Provider>
  );
}

export default App;
