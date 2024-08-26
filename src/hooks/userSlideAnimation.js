
import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export const useSlideAnimation = (visible, duration = 300, offset = 300) => {
    const slideAnim = useRef(new Animated.Value(visible ? 0 : offset)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: duration,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: offset,
        duration: duration,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, duration, offset]);

  return slideAnim;
};
