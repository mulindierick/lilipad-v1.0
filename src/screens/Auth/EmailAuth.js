import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useForm} from 'react-hook-form';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CustomButton from '../../components/common/CustomButton';
import CustomRHFTextInput from '../../components/common/CustomReactHookFormTextInput';
import {TextBigger} from '../../components/common/CustomText';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import {COLORS} from '../../utils/constants/theme';

const EmailAuth = () => {
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
    paddingBottom: hp(5),
  },
});
