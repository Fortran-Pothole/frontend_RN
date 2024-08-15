import React from 'react';
import {
  TouchableWithoutFeedback, // 터치 이벤트를 처리할 수 있는 컴포넌트로, 사용자의 터치에 반응
  Keyboard, // 키보드를 제어할 수 있는 기능을 제공하는 객체
  StyleProp, // 스타일 속성의 타입을 정의
  ViewStyle, // View 스타일 속성을 정의
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
// 키보드가 열려 있을 때, 화면을 스크롤할 수 있는 기능을 제공하는 컴포넌트

const DismissKeyboardView = ({children, ...props}) => (
  // 화면을 터치하면 키보드를 숨기도록 하는 뷰를 정의하는 컴포넌트
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    {/* 터치 이벤트가 발생할 때 키보드를 숨김 accessible 속성을 false로 설정하여 
    이 뷰가 접근성 트리에서 제외 */}
    <KeyboardAwareScrollView {...props} style={props.style}>
      {/* 키보드가 열려 있을 때에도 가려지지 않도록 스크롤 가능한 뷰를 제공
      전달된 props와 style 속성을 적용 */}
      {children} {/* 전달된 자식 컴포넌트들을 렌더링*/}
    </KeyboardAwareScrollView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;
// DismissKeyboardView 컴포넌트를 외부에서 사용할 수 있도록 내보냄
