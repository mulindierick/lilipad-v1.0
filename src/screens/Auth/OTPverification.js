import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Keyboard, StyleSheet, View} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CustomOTPInput from '../../components/common/CustomOTPInput';
import {TextBigger, TextNormal} from '../../components/common/CustomText';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import {COLORS} from '../../utils/constants/theme';
import {useNavigation} from '@react-navigation/native';
import {useVerifyOTPMutation} from '../../redux/apis';
import CustomLoader from '../../components/common/CustomLoader';
import UseFirebaseAuth from '../../utils/hooks/UseFirebaseAuth';
import {showToast} from '../../utils/constants/helper';

const OTPverification = ({route}) => {
  const email = route?.params?.email;
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const {firebaseAuth} = UseFirebaseAuth();
  const [OTPerror, setError] = useState(false);

  const {control, handleSubmit} = useForm();
  useEffect(() => {
    Keyboard.dismiss();
    setTimeout(() => {
      inputRef.current.focus();
    }, 300);
  }, []);

  const onCodeFilled = async num => {
    setError(false);
    let otp = num.toString();
    if (otp.length == 4) {
      setLoader(true);
      try {
        let res = await firebaseAuth(email, otp);
        console.log({res});
        if (res !== 'Success') {
          setError(true);
          showToast('error', res);
        } else {
          showToast('success', 'Email Verified Scuccessfully');
        }
      } catch (err) {
        console.log({err});
      }
      setLoader(false);
    }
  };

  const inputRef = React.useRef();
  return (
    <CustomWrapper requiresHeader>
      <View style={styles.TextContainer}>
        <TextBigger textStyle={styles.textHeader}>
          Enter The Code We Sent
        </TextBigger>
        <TextBigger textStyle={styles.textHeader}>
          To{' '}
          <TextBigger textStyle={[styles.textHeader, {color: COLORS.blue}]}>
            you@skidmore.edu
          </TextBigger>
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
            showError={OTPerror}
            inputRef={inputRef}
            onCodeFilled={onCodeFilled}
          />
        )}
      />
      {loader && <CustomLoader />}
    </CustomWrapper>
  );
};

export default OTPverification;

const styles = StyleSheet.create({
  TextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(4),
    marginTop: hp(1),
  },
  bottomText: {
    alignSelf: 'center',
    marginTop: hp(5),
  },
  textHeader: {
    fontSize: hp(3.3),
    fontWeight: '600',
    color: '#151313',
  },
});
