import React, {useEffect, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Keyboard, StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomOTPInput from '../../components/common/CustomOTPInput';
import {TextBigger, TextNormal} from '../../components/common/CustomText';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import {COLORS} from '../../utils/constants/theme';
import {useNavigation} from '@react-navigation/native';
import {useSendOTPemailMutation, useVerifyOTPMutation} from '../../redux/apis';
import CustomLoader from '../../components/common/CustomLoader';
import UseFirebaseAuth from '../../utils/hooks/UseFirebaseAuth';
import {showToast} from '../../utils/constants/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTPverification = ({route}) => {
  const email = route?.params?.email;
  const navigation = useNavigation();
  const [emailSenderFunction] = useSendOTPemailMutation();
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

  const onSendCode = async data => {
    try {
      setLoader(true);
      const res = await emailSenderFunction({email: data?.email});
    } catch (err) {
      console.log({err});
    }
    setLoader(false);
    setRemainingTime(initialTime);
    setIsRunning(true);
  };

  //For Timer
  const initialTime = 60 * 1000; // 30 seconds in milliseconds
  const [remainingTime, setRemainingTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(true);

  const stopTimer = async () => {
    setIsRunning(false);
    const savedStartTime = await AsyncStorage.getItem('startTime');
    if (savedStartTime && isRunning) {
      const elapsed = Date.now() - parseInt(savedStartTime, 10);
      const newRemainingTime = Math.max(remainingTime - elapsed, 0);
      setRemainingTime(newRemainingTime);
      await AsyncStorage.removeItem('startTime');
    }
  };

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        if (remainingTime > 0) {
          setRemainingTime(prevTime => prevTime - 1000);
        } else {
          stopTimer();
          clearInterval(interval);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isRunning, remainingTime]);

  const onCodeFilled = async num => {
    setError(false);
    let otp = num.toString();
    if (otp.length == 4) {
      setLoader(true);
      try {
        let res = await firebaseAuth(email, otp);
        if (res !== 'Success') {
          setError(true);
          // showToast('error', res);
        } else {
          // showToast('success', 'Email Verified Scuccessfully');
        }
      } catch (err) {
        console.log({err});
      }
      setLoader(false);
    }
  };

  const inputRef = React.useRef();
  return (
    <CustomWrapper
      requiresHeader
      containerStyle={{backgroundColor: COLORS.white}}>
      <View style={styles.TextContainer}>
        <TextBigger textStyle={styles.textHeader}>
          Enter The Code We Sent
        </TextBigger>
        <TextBigger textStyle={styles.textHeader} numberOfLines={1}>
          To{' '}
          <TextBigger textStyle={[styles.textHeader, {color: COLORS.blue}]}>
            {email}
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
      <View style={styles.bottomTextContainer}>
        <TextNormal
          textStyle={styles.bottomText}
          color={remainingTime > 0 ? '#969696' : COLORS.blue}
          disabled={remainingTime > 0 ? true : false}
          onPress={() => onSendCode({email: email})}>
          Resend Code
        </TextNormal>
        {remainingTime > 0 && (
          <TextNormal
            textStyle={styles.bottomTextTimer}
            color={remainingTime > 0 ? COLORS.blue : '#969696'}>
            {remainingTime / 1000} Seconds
          </TextNormal>
        )}
      </View>
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
  bottomTextContainer: {
    marginTop: hp(7),
    alignItems: 'center',
  },
  textHeader: {
    fontSize: hp(3.3),
    fontWeight: '600',
    color: '#151313',
  },
  bottomText: {
    fontWeight: '400',
    fontSize: hp(2.05),
  },
  bottomTextTimer: {
    fontWeight: '400',
    fontSize: hp(2.05),
    marginTop: hp(1.5),
  },
});
