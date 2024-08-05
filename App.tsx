import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Map from './src/pages/Map';
import {useState} from 'react';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';

//로그인 후 보이는 화면
export type LoggedInParamList = {
  Map: undefined;
};

//로그인하지 않았을 때 보이는 화면
export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

//const Tab = createBottomTabNavigator();
const LoggedInStack = createNativeStackNavigator<LoggedInParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  //로그인하면 map화면만 보이고 로그인하지 않으면 로그인 화면만 보임
  const [isLoggedIn, setLoggedIn] = useState(true);
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <LoggedInStack.Navigator>
          <LoggedInStack.Screen
            name="Map"
            component={Map}
            options={{headerShown: false}}
          />
        </LoggedInStack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{title: '회원가입', headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
