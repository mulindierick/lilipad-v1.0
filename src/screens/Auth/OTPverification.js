import React, {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Keyboard, StyleSheet, View} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CustomOTPInput from '../../components/common/CustomOTPInput';
import {TextBigger, TextNormal} from '../../components/common/CustomText';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import {COLORS} from '../../utils/constants/theme';
import {useNavigation} from '@react-navigation/native';

const OTPverification = ({route}) => {
  const email = route?.params?.email;
  const navigation = useNavigation();
  const {control, handleSubmit} = useForm();
  useEffect(() => {
    Keyboard.dismiss();
    setTimeout(() => {
      inputRef.current.focus();
    }, 300);
  }, []);

  const onCodeFilled = num => {
    let str = num.toString();
    if (str.length == 4) {
      navigation.navigate('FurtherInfo');
    }
  };

  const inputRef = React.useRef();
  return (
    <CustomWrapper requiresHeader>
      <View style={styles.TextContainer}>
        <TextBigger>Enter The Code We Sent</TextBigger>
        <TextBigger>
          To <TextBigger color={COLORS.blue}>you@skidmore.edu</TextBigger>
        </TextBigger>
      </View>
      <Controller
        control={control}
        name="code"
        key="code"
        render={({
          field: {name, onBlur, onChange, value},
          fieldState: {error},
        }) => (
          <CustomOTPInput
            onChange={onChange}
            error={error?.message}
            showError={error ? true : false}
            inputRef={inputRef}
            onCodeFilled={onCodeFilled}
          />
        )}
      />
      <TextNormal
        textStyle={styles.bottomText}
        color={COLORS.grey}>{`Didn't Get The Code?`}</TextNormal>
    </CustomWrapper>
  );
};

export default OTPverification;

const styles = StyleSheet.create({
  TextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(3),
  },
  bottomText: {
    alignSelf: 'center',
    marginTop: hp(5),
  },
});
