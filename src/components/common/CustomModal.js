import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {Children} from 'react';
import ReactNativeModal from 'react-native-modal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const CustomModal = ({
  onBackButtonPress,
  onBackdropPress,
  containerStyle,
  isVisible,
  children,
}) => {
  return (
    <ReactNativeModal
      onBackButtonPress={onBackButtonPress}
      onBackdropPress={onBackdropPress}
      style={styles.modalContainer}
      isVisible={isVisible}>
      {children}
    </ReactNativeModal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
