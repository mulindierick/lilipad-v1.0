import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
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
import useUser from '../../utils/hooks/useUser';

const EmailAuth = () => {
  const [emailSenderFunction] = useSendOTPemailMutation();
  const {getCollegeDomains} = useUser();
  const [loader, setLoader] = useState(false);
  const [regex, setRegex] = useState(/^[^\d]+@skidmore\.edu$/);
  const [collegeName, setCollegeName] = useState([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false); // State to track keyboard visibility
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm();

  const regexSetup = async () => {
    try {
      const domains = await getCollegeDomains();
      setCollegeName(domains);
      // Escape dots in domain names and join them with |
      const domainPattern = domains
        .map(domain => domain.domain.replace(/\./g, '\\.'))
        .join('|');

      // Construct the regular expression
      const regex = new RegExp(`^[^\\d]+(?:\\d+)?(?:${domainPattern})$`);

      // Set the regular expression state or use it as needed
      setRegex(regex);
    } catch (error) {
      console.error('Error fetching college domains:', error);
    }
  };

  // Effect to set keyboard visibility
  useEffect(() => {
    regexSetup();
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
      if (data?.email && data?.email.includes('@apple.edu')) {
        navigation.navigate('OTPverification', {
          email: data?.email,
        });
        return;
      }
      const emailRegex = data?.email.split('@')[1];
      const emailDomain = '@' + emailRegex;
      const selectedCollegeName = collegeName.filter(
        item => item.domain == emailDomain,
      );
      navigation.navigate('OTPverification', {
        email: data?.email,
        collegeId: selectedCollegeName[0]?.collegeId,
      });
      const res = await emailSenderFunction({
        email: data?.email,
        collegeId: selectedCollegeName[0]?.collegeId,
      });
      if (res?.data && !res?.data?.message == 'OTP sent successfully') {
        alert('Something went wrong. Please try again');
      }
    } catch (err) {
      console.log({err});
    }
  };

  return (
    <CustomWrapper
      requiresHeader
      containerStyle={{backgroundColor: COLORS.white}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}
        keyboardVerticalOffset={Platform.select({ios: hp(-7)})}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
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
                rules={{
                  required: {value: true},
                  pattern: {
                    value: regex,
                  },
                }}
                name="email"
                key="email"
                placeholder={'you@school.edu'}
                spellCheck={false}
                autoCorrect={true}
                containerStyle={{height: hp(6.5)}}
                textInputStyle={{fontSize: wp(4)}}
                keyboardType={'email-address'}
              />
              {!isKeyboardVisible && (
                <View style={styles.middleNoteContainer}>
                  <TextNormal
                    italic
                    textStyle={styles.italic}
                    color={COLORS.grey}>
                    As of
                    <TextNormal
                      color={COLORS.textColorGrey}
                      textStyle={styles.normal}>
                      {' '}
                      Spring 2024, LiliPad{' '}
                    </TextNormal>
                    is only active at{' '}
                    <TextNormal
                      color={COLORS.textColorGrey}
                      textStyle={styles.normal}>
                      Skidmore College.
                    </TextNormal>{' '}
                    We are planning to scale to other schools in the coming
                    weeks.
                  </TextNormal>
                </View>
              )}
              <CustomButton
                title="Send Code"
                onPress={handleSubmit(onSendCode)}
                loader={loader}
                textStyle={styles.buttonText}
                containerStyle={{
                  height: hp(6.2),
                  marginBottom: hp(7),
                  width: wp(90),
                }}
                disabled={!isValid}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
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
