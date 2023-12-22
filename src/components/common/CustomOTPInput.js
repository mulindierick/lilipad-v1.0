import React from 'react';
import {StyleSheet, View} from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {TextSmall} from './CustomText';
import {COLORS} from '../../utils/constants/theme';

const CustomOTPInput = props => {
  const {onChange, showError, inputStyles, style, inputRef, onCodeFilled} =
    props;
  return (
    <View style={styles.container}>
      <OtpInputs
        // handleChange={code => onChange(code)}
        numberOfInputs={4}
        ref={inputRef}
        // autofillFromClipboard={true}
        inputStyles={[styles.inputStyles, {...inputStyles}]}
        style={[styles.containerStyle, {...style}]}
        focusStyles={styles.Focus}
        keyboardType="numeric"
        handleChange={num => onCodeFilled(num)}
        filledInputContainerStyles={[styles.Focus, showError && styles.Error]}
        inputContainerStyles={{borderWidth: 2, borderColor: 'transparent'}}
      />
    </View>
  );
};

export default CustomOTPInput;

const styles = StyleSheet.create({
  container: {
    height: hp(7),
    paddingHorizontal: wp(6),
  },
  inputStyles: {
    width: wp(18),
    height: hp(8),
    textAlign: 'center',
    borderRadius: 10,
    fontSize: wp(6),
    color: COLORS.lightgrey,
    backgroundColor: '#E4E4E4',
    fontWeight: '600',
  },
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  Focus: {
    borderWidth: 2,
    borderColor: COLORS.blue,
    borderRadius: 12.5,
  },
  Error: {
    borderWidth: 2,
    borderColor: COLORS.error,
    borderRadius: 10,
  },
});
