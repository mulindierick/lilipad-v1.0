import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomButton from '../../components/common/CustomButton';
import CustomRHFTextInput from '../../components/common/CustomReactHookFormTextInput';
import {TextBigger, TextNormal} from '../../components/common/CustomText';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import {COLORS} from '../../utils/constants/theme';
import auth from '@react-native-firebase/auth';

const EmailAuth = () => {
  const checking = async () => {
    try {
      let user = await auth().createUserWithEmailAndPassword(
        'mustafa@skidmore.edu',
        '1234567890',
      );
    } catch (err) {
      console.log({err});
    }
  };
  useEffect(() => {
    checking();
  }, []);

  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm();

  const onSendCode = data => {
    navigation.navigate('OTPverification', {email: data?.email});
  };

  return (
    <CustomWrapper requiresHeader>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.textContainer}>
          <TextBigger color={COLORS.black}>Begin By Sharing</TextBigger>
          <TextBigger color={COLORS.black} textStyle={{marginTop: hp(0.5)}}>
            Your School Email
          </TextBigger>
        </View>
        <View style={styles.innerContainer}>
          <CustomRHFTextInput
            rules={{
              required: {value: true},
              pattern: {
                value: /^[^\d]+@skidmore\.edu$/,
              },
            }}
            control={control}
            name="email"
            key="email"
            placeholder={'you@skidmore.edu'}
          />
          <View style={styles.middleNoteContainer}>
            <TextNormal
              italic
              textStyle={{textAlign: 'center'}}
              color={COLORS.grey}>
              As of
              <TextNormal color={COLORS.grey} bold>
                {' '}
                Fall 2023, LiliPad{' '}
              </TextNormal>
              is only active at{' '}
              <TextNormal color={COLORS.grey} bold>
                Skidmore College.
              </TextNormal>{' '}
              We are planning to scale to other schools in the coming weeks.
            </TextNormal>
          </View>
          <CustomButton
            title="Send Code"
            disabled={!isValid}
            onPress={handleSubmit(onSendCode)}
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
});
