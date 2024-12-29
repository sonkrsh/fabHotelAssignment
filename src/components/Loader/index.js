import React from 'react';
import {View, ActivityIndicator, StyleSheet, Modal} from 'react-native';

const LoadingScreen = ({loading = false}) => {
  return (
    <Modal
      transparent
      animationType="none"
      visible={loading}
      onRequestClose={() => {}} // Prevents dismissal via hardware back button
    >
      <View style={styles.container}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loaderContainer: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});

export default LoadingScreen;
