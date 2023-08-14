import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/constants/theme';
import {TextBig, TextNormal} from './CustomText';

const CustomButton = props => {
  const {
    title,
    containerStyle,
    onPress,
    disabled,
    bigText = false,
    boldTitle = false,
  } = props;

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, containerStyle, disabled && styles.disabled]}>
      {bigText ? (
        <TextBig color={COLORS.white} bold={boldTitle}>
          {title}
        </TextBig>
      ) : (
        <TextNormal color={COLORS.white} bold={boldTitle}>
          {title}
        </TextNormal>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    height: hp(6),
    width: wp(80),
    marginVertical: hp(1),
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 15,
  },
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  disabled: {
    backgroundColor: COLORS.grey,
  },
});
