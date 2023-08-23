import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Keyboard,
  Platform,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomButton from '../../components/common/CustomButton';
import CustomRHFTextInput from '../../components/common/CustomReactHookFormTextInput';
import {TextBigger, TextNormal} from '../../components/common/CustomText';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import {useSendOTPemailMutation} from '../../redux/apis';
import {COLORS, FONTS} from '../../utils/constants/theme';

const EmailAuth = () => {
  const [emailSenderFunction] = useSendOTPemailMutation();
  const [loader, setLoader] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false); // State to track keyboard visibility
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm();

  // Effect to set keyboard visibility
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const onSendCode = async data => {
    try {
      setLoader(true);
      const res = await emailSenderFunction({email: data?.email});
      console.log({res});
      if (res?.data?.message === 'OTP sent successfully') {
        navigation.navigate('OTPverification', {email: data?.email});
      } else {
        alert('Enter Valid Email');
      }
    } catch (err) {
      console.log({err});
    }
    setLoader(false);
  };

  return (
    <CustomWrapper requiresHeader>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}>
        <View style={styles.textContainer}>
          <TextBigger color={COLORS.black} textStyle={styles.heading}>
            Begin By Sharing
          </TextBigger>
          <TextBigger color={COLORS.black} textStyle={[styles.heading]}>
            Your School Email
          </TextBigger>
        </View>
        <View style={styles.innerContainer}>
          <CustomRHFTextInput
            control={control}
            // rules={{
            //   required: {value: true},
            //   pattern: {
            //     value: /^[^\d]+@skidmore\.edu$/,
            //   },
            // }}
            name="email"
            key="email"
            placeholder={'you@skidmore.edu'}
          />
          {!isKeyboardVisible && (
            <View style={styles.middleNoteContainer}>
              <TextNormal italic textStyle={styles.italic} color={COLORS.grey}>
                As of
                <TextNormal
                  color={COLORS.textColorGrey}
                  textStyle={styles.normal}>
                  {' '}
                  Fall 2023, LiliPad{' '}
                </TextNormal>
                is only active at{' '}
                <TextNormal
                  color={COLORS.textColorGrey}
                  textStyle={styles.normal}>
                  Skidmore College.
                </TextNormal>{' '}
                We are planning to scale to other schools in the coming weeks.
              </TextNormal>
            </View>
          )}
          <CustomButton
            title="Send Code"
            onPress={handleSubmit(onSendCode)}
            loader={loader}
            textStyle={styles.buttonText}
            containerStyle={{height: hp(6.2)}}
            // disabled={!isValid}
          />
        </View>
      </KeyboardAvoidingView>
    </CustomWrapper>
  );
};

export default EmailAuth;

const styles = StyleSheet.create({
  container: {flex: 1},
  textContainer: {
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    marginTop: hp(5),
    justifyContent: 'space-between',
    paddingBottom: hp(3),
  },
  middleNoteContainer: {
    paddingHorizontal: wp(4),
  },
  italic: {
    fontFamily: FONTS.LightItalic,
    textAlign: 'center',
  },
  normal: {
    fontFamily: FONTS.Regular,
  },
  heading: {
    fontFamily: FONTS.Regular,
    fontSize: wp(7.5),
    fontWeight: '600',
    color: '#151313',
  },
  buttonText: {
    fontSize: hp(2.7),
    fontWeight: '500',
  },
});
