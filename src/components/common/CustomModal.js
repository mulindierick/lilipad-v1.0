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
  backdropOpacity = null,
  animationIn = 'slideInUp',
  animationOut = 'slideOutDown',
}) => {
  return (
    <ReactNativeModal
      onBackButtonPress={onBackButtonPress}
      onBackdropPress={onBackdropPress}
      style={[styles.modalContainer, containerStyle]}
      isVisible={isVisible}
      backdropOpacity={backdropOpacity != null ? backdropOpacity : 0.5}
      animationIn={animationIn}
      animationOut={animationOut}>
      {children}
    </ReactNativeModal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 0,
  },
});
