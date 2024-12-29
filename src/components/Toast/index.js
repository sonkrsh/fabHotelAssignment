import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

const Toast = ({
  message = 'This is a toast message',
  duration = 3000,
  position = 'bottom', // 'top', 'center', 'bottom'
  onClose,
  style,
  textStyle,
}) => {
  const [visible, setVisible] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (message) {
      showToast();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  const showToast = () => {
    setVisible(true);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => hideToast(), duration);
    });
  };

  const hideToast = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      if (onClose) onClose();
    });
  };

  if (!visible) return null;

  const getPositionStyle = () => {
    switch (position) {
      case 'top':
        return {top: 50};
      case 'center':
        return {top: '50%', transform: [{translateY: -50}]};
      case 'bottom':
      default:
        return {bottom: 50};
    }
  };

  return (
    <TouchableWithoutFeedback onPress={hideToast}>
      <Animated.View
        style={[styles.toastContainer, getPositionStyle(), style, {opacity}]}>
        <Text style={[styles.toastText, textStyle]}>{message}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 10,
    alignItems: 'center',
  },
  toastText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Toast;
