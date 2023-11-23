import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import {BackButton} from '../../components/common/CustomSvgItems';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TextNormal} from '../../components/common/CustomText';
import CustomRHFTextInput from '../../components/common/CustomReactHookFormTextInput';
import {useForm} from 'react-hook-form';
import {COLORS, FONTS} from '../../utils/constants/theme';
import CustomButton from '../../components/common/CustomButton';
import SpacesRelatedActivity from '../../utils/hooks/SpacesRelatedActivity';
import {Keyboard} from 'react-native';

const CreateSpace = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm();

  const {addRequestToCreateSpace} = SpacesRelatedActivity();
  const [loading, setLoading] = useState(false);

  const requestToCreateSpace = async data => {
    setLoading(true);
    try {
      await addRequestToCreateSpace(data);
      navigation.goBack();
    } catch (err) {
      console.log({err});
    }
    setLoading(true);
  };

  return (
    <CustomWrapper>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1}}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{flex: 1}}>
              <BackButton />
            </TouchableOpacity>
            <Text style={styles.text}>Create a Space</Text>
            <View style={{flex: 1}} />
          </View>

          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View>
              <View style={{marginTop: hp(6.5)}}>
                <TextNormal bold textStyle={{marginBottom: hp(1.3)}}>
                  Give This Space A Name
                </TextNormal>
                <CustomRHFTextInput
                  rules={{
                    required: {value: true, message: 'Space Name is Required'},
                  }}
                  control={control}
                  name="spaceName"
                  key="spaceName"
                  autoCapitalize="sentences"
                  placeholder={'the name of your space'}
                  containerStyle={{height: hp(6.5), backgroundColor: '#E4E4E4'}}
                  textInputStyle={{fontSize: wp(4)}}
                  autoCorrect={false}
                  spellCheck={true}
                />
              </View>

              <View style={{marginTop: hp(6.5)}}>
                <TextNormal bold textStyle={{marginBottom: hp(1.3)}}>
                  Tell Us About This Space
                </TextNormal>
                <CustomRHFTextInput
                  rules={{
                    required: {value: true, message: 'Description is Required'},
                  }}
                  control={control}
                  name="description"
                  key="description"
                  autoCapitalize="sentences"
                  placeholder={'a bit about your space'}
                  containerStyle={{
                    height: hp(15),
                    backgroundColor: '#E4E4E4',
                  }}
                  textInputStyle={{
                    fontSize: wp(4),
                    height: hp(14),
                    marginTop: hp(1.5),
                    marginBottom: hp(1.3),
                  }}
                  autoCorrect={false}
                  spellCheck={true}
                  multiline={true}
                />
              </View>
            </View>
            <View style={styles.endNoteContainer}>
              <TextNormal
                italic
                textStyle={styles.italic}
                color={COLORS.textColorGrey}>
                It may take up to a
                <TextNormal
                  color={COLORS.textColorGrey}
                  textStyle={styles.normal}>
                  {' '}
                  few hours{' '}
                </TextNormal>
                for this space to be{' '}
                <TextNormal
                  color={COLORS.textColorGrey}
                  textStyle={styles.normal}>
                  reviewed.
                </TextNormal>{' '}
                We will communicate the pending status of this space over email.
              </TextNormal>
            </View>
            <CustomButton
              title="Create"
              onPress={handleSubmit(requestToCreateSpace)}
              containerStyle={styles.button}
              textStyle={styles.buttonText}
              boldTitle={true}
              disabled={!isValid}
              loader={loading}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </CustomWrapper>
  );
};

export default CreateSpace;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(0.5),
    marginTop: hp(1.5),
  },
  text: {
    fontSize: wp(7),
    fontWeight: '600',
    flex: 5,
    textAlign: 'center',
  },
  endNoteContainer: {
    paddingHorizontal: wp(4),
  },
  italic: {
    fontFamily: FONTS.LightItalic,
    // textAlign: 'center',
    fontWeight: '300',
  },
  normal: {
    fontFamily: FONTS.Regular,
  },
  button: {
    height: hp(6.7),
    marginBottom: hp(9.5),
    width: wp(90),
  },
  buttonText: {
    fontSize: hp(2.7),
    fontWeight: '700',
  },
});
