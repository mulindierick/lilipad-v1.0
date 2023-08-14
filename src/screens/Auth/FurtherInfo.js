import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomButton from '../../components/common/CustomButton';
import CustomImage from '../../components/common/CustomImage';
import CustomRHFTextInput from '../../components/common/CustomReactHookFormTextInput';
import { TextNormal } from '../../components/common/CustomText';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import { COLORS } from '../../utils/constants/theme';
import ReasonForWhyWeAsk from './ReasonForWhyWeAsk';

const FurtherInfo = () => {
  const [modal, setModal] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm();

  return (
    <CustomWrapper requiresHeader forInfoFurtherScreen={true}>
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}>
        <View style={styles.topContainer}>
          <TextNormal color={COLORS.grey} onPress={() => setModal(true)}>
            Why do we ask?
          </TextNormal>
          <View style={styles.imageContainer}>
            <CustomImage
              source={{
                uri: 'https://thecrimsonwhite.com/wp-content/uploads/2023/04/john-wick-4-cast-1647530231314-900x506.jpg',
              }}
              containerStyle={styles.innerImageContainer}
              resizeMode="cover"
              editable
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextNormal bold textStyle={{marginBottom: hp(0.5)}}>
            Your First Name
          </TextNormal>
          <CustomRHFTextInput
            rules={{
              required: {value: true, message: 'First Name is Required'},
            }}
            control={control}
            name="firstName"
            key="firstName"
          />
          <TextNormal italic textStyle={{marginTop: hp(0.5)}}>
            You will not be able to change your first name
          </TextNormal>
        </View>
        <View style={styles.inputContainer}>
          <TextNormal bold textStyle={{marginBottom: hp(0.5)}}>
            Your Last Name
          </TextNormal>
          <CustomRHFTextInput
            rules={{
              required: {value: true, message: 'Last Name is Required'},
            }}
            control={control}
            name="lastName"
            key="lastName"
          />
          <TextNormal italic textStyle={{marginTop: hp(0.5)}}>
            You will not be able to change your last name
          </TextNormal>
        </View>
        <View style={styles.inputContainer}>
          <TextNormal bold textStyle={{marginBottom: hp(0.5)}}>
            Your Class Year
          </TextNormal>
          <CustomRHFTextInput
            rules={{
              required: {value: true, message: 'Name is Required'},
            }}
            control={control}
            name="name"
            key="name"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextNormal bold textStyle={{marginBottom: hp(0.5)}}>
            {`Your Major (Or Prospective Major)`}
          </TextNormal>
          <CustomRHFTextInput
            rules={{
              required: {value: true, message: 'Name is Required'},
            }}
            control={control}
            name="major"
            key="major"
            placeholder={'Search'}
          />
        </View>
        <CustomButton
          title="Create Account"
          onPress={() => console.log('HELLO')}
          containerStyle={styles.button}
          boldTitle={true}
        />
      </ScrollView>
      <ReasonForWhyWeAsk
        isVisible={modal}
        onBackButtonPress={() => setModal(false)}
        onBackdropPress={() => setModal(false)}
      />
    </CustomWrapper>
  );
};

export default FurtherInfo;

const styles = StyleSheet.create({
  topContainer: {
    alignItems: 'center',
    marginTop: hp(1),
  },
  imageContainer: {
    marginTop: hp(1),
    height: hp(13),
    aspectRatio: 1,
    borderRadius: hp(10),
    borderWidth: 2,
    borderColor: COLORS.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerImageContainer: {
    height: hp(13),
    aspectRatio: 1,
    borderRadius: hp(10),
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  inputContainer: {
    marginTop: hp(1.5),
  },
  button: {
    width: wp(92),
    marginVertical: hp(4),
  },
});
