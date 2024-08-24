import React, { useRef,useState } from 'react';
import { View, PanResponder, StyleSheet } from 'react-native';

const CircleComponent = ({onDrag}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
  
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gestureState) => {
          // 8방향 스냅핑 계산
          const angle = Math.atan2(gestureState.dy, gestureState.dx);
          const snapAngle = Math.round(angle / (Math.PI / 4)) * (Math.PI / 4);
  
          const snapX = Math.cos(snapAngle) * Math.sqrt(gestureState.dx ** 2 + gestureState.dy ** 2);
          const snapY = Math.sin(snapAngle) * Math.sqrt(gestureState.dx ** 2 + gestureState.dy ** 2);
  
          setPosition({ x: snapX, y: snapY });
          //Drag 콜백 전달 
            // 드래그 방향과 스냅된 각도를 콘솔에 출력
            console.log(`Dragging at angle: ${snapAngle}`);
            onDrag(snapAngle);
        },
        
        onPanResponderRelease: () => {
          // 드래그가 끝난 후 원의 위치를 초기화
          setPosition({ x: 0, y: 0 });
        },
      })
    ).current;

  return (
    <View style={styles.outerCircle}>
      <View
        style={[
          styles.innerCircle,
          {
            transform: [{ translateX: position.x }, { translateY: position.y }],
          },
        ]}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outerCircle: {
    width: 100, 
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(212, 175, 255, 0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', 
    bottom: 20, 
    left: 20, 
    zIndex: 1000,
  },
  innerCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8e7cc3',
  },
});

export default CircleComponent;
