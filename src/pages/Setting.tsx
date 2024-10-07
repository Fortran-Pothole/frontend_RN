import * as React from 'react';
import WebView from 'react-native-webview';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';

function Setting({navigation}) {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.text}>푸시알림</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <TouchableOpacity 
          style={styles.item}
          onPress={() => {
            console.log('Navigating to PotholeReportList');
            navigation.navigate('PotholeReportList');
          }}
      >
        <Text style={styles.text}>내가 신고한 포트홀 조회</Text>
      </TouchableOpacity>
      <TouchableOpacity 
          style={styles.item}
          onPress={() => navigation.navigate('WebViewScreen', {url: 'https://forms.gle/yNa5G8GpV479xdRF7'})}
      >
        <Text style={styles.text}>문의하기</Text>
      </TouchableOpacity>
      <TouchableOpacity 
          style={styles.item}
          onPress={() => navigation.navigate('WebViewScreen', {url: 'https://fortrancapstone.notion.site/9782e8a5ddc24c1197310db0656b34b8'})}
      >
        <Text style={styles.text}>자주 하는 질문</Text>
      </TouchableOpacity>
      <TouchableOpacity 
          style={styles.item}
          onPress={() => navigation.navigate('OpenSourceLicenseScreen')}
      >
        <Text style={styles.text}>오픈 소스</Text>
      </TouchableOpacity>
      <TouchableOpacity 
          style={styles.item}
          onPress={() => navigation.navigate('Withdraw')}
      >
        <Text style={styles.text}>탈퇴하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const WebViewScreen = ({ route }) => {
  const { url } = route.params;

  return (
    <WebView
      source={{ uri: url }}
      onHttpError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.warn('WebView received error status code: ', nativeEvent.statusCode);
      }}
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.warn('WebView error: ', nativeEvent);
      }}
      onShouldStartLoadWithRequest={(request) => {
        return true; 
      }}
      startInLoadingState={true}
      javaScriptEnabled={true}
      domStorageEnabled={true}
    />
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3b82f6',
      padding: 16,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    text: {
      color: '#fff',
      fontSize: 18,
    },
  });
  
export {Setting, WebViewScreen };