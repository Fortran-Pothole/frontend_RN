import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import store from './src/store';
import Map from './src/pages/Map';
import VoiceNotice from './src/pages/VoiceNotice';
import Withdraw from './src/pages/Withdraw';
import OpenSourceLicenseScreen from './src/pages/OpenSource';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import {Setting, WebViewScreen} from './src/pages/Setting';
import PotholeReport from './src/pages/PotholeReport';
import PotholeReportDetail from './src/pages/PotholeReportDetail';
import PotholeReportTabs from './src/pages/PotholeReportTabs';
import IconMenuBar from './src/assets/icon_menu_bar.svg';
import IconHome from './src/assets/icon_home.svg';

export type LoggedInParamList = {
  Map: undefined;
  Setting: undefined;
  WebViewScreen: {url: string};
  OpenSourceLicenseScreen: undefined;
  PotholeReportTabs: undefined;
  Withdraw: undefined;
  VoiceNotice: undefined;
  PotholeReport: undefined;
  PotholeReportDetail: undefined;
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
              name="Withdraw"
              component={Withdraw}
              options={{title: '탈퇴하기'}}
            />
            <LoggedInStack.Screen
              name="PotholeReport"
              component={PotholeReport}
              options={({navigation}) => ({
                title: '포트홀 신고',
                headerStyle: {
                  backgroundColor: '#266DFC',
                },
                headerTintColor: '#fff',
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('PotholeReportTabs')}>
                    <IconMenuBar width={30} height={30} />
                  </TouchableOpacity>
                ),
              })}
            />
            <LoggedInStack.Screen
              name="PotholeReportDetail"
              component={PotholeReportDetail}
              options={({navigation}) => ({
                title: '포트홀 신고 Detail',
                headerStyle: {
                  backgroundColor: '#266DFC',
                },
                headerTintColor: '#fff',
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('PotholeReportTabs')}>
                    <IconMenuBar width={30} height={30} />
                  </TouchableOpacity>
                ),
              })}
            />
            <LoggedInStack.Screen
              name="PotholeReportTabs"
              component={PotholeReportTabs}
              options={({navigation}) => ({
                title: '신고 목록',
                headerStyle: {
                  backgroundColor: '#266DFC',
                },
                headerTintColor: '#fff',
                headerLeft: () => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Map')
                    }></TouchableOpacity>
                ),
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                    <IconHome width={25} height={25} />
                  </TouchableOpacity>
                ),
              })}
            />
          </LoggedInStack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="SignIn"
              options={{title: '로그인', headerShown: false}}>
              {props => <SignIn {...props} setLoggedIn={setLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen
              name="SignUp"
              options={{title: '회원가입', headerShown: false}}>
              {props => <SignUp {...props} />}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Provider>
  );
}

export default App;
