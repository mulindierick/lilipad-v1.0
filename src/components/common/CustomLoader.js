import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import {COLORS} from '../../utils/constants/theme';

const CustomLoader = () => {
  return (
    <ReactNativeModal
      isVisible={true}
      style={styles.container}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      backdropOpacity={0.1}>
      <ActivityIndicator size={'large'} color={COLORS.grey} />
    </ReactNativeModal>
  );
};

export default CustomLoader;

const styles = StyleSheet.create({
  container: {
    margin: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
