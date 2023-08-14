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
  const {onChange, error, inputStyles, style, inputRef, onCodeFilled} = props;

  return (
    <View style={styles.container}>
      <OtpInputs
        handleChange={code => onChange(code)}
        numberOfInputs={4}
        ref={inputRef}
        // autofillFromClipboard={true}
        // inputContainerStyles={{}}
        inputStyles={[styles.inputStyles, {...inputStyles}]}
        style={[styles.containerStyle, {...style}]}
        focusStyles={styles.Focus}
        keyboardType="numeric"
        handleChange={num => onCodeFilled(num)}
      />
      <TextSmall textStyle={{marginTop: hp(3)}} color="red">
        {error && `*${error}`}
      </TextSmall>
    </View>
  );
};

export default CustomOTPInput;

const styles = StyleSheet.create({
  container: {
    height: hp(7),
    marginTop: hp(2),
    paddingHorizontal: wp(6),
  },
  inputStyles: {
    width: wp(18),
    height: hp(8),
    textAlign: 'center',
    borderRadius: 10,
    fontSize: wp(5),
    color: COLORS.lightgrey,
    backgroundColor: '#F6F6F6',
  },
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  Focus: {
    borderWidth: 1,
    borderColor: COLORS.blue,
    borderRadius: 10,
  },
});
