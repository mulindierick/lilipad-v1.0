import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomButton from '../../components/common/CustomButton';
import CustomImage from '../../components/common/CustomImage';
import CustomImagePickerModal from '../../components/common/CustomImagePickerModal';
import CustomRHFTextInput from '../../components/common/CustomReactHookFormTextInput';
import {AddProfilePictureIcon} from '../../components/common/CustomSvgItems';
import {TextBig, TextNormal} from '../../components/common/CustomText';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import {COLORS, FONTS, images} from '../../utils/constants/theme';
import UseFirebaseAuth from '../../utils/hooks/UseFirebaseAuth';
import useImagePicker from '../../utils/hooks/useImagePicker';
import useUser from '../../utils/hooks/useUser';
import {useNavigation} from '@react-navigation/native';

const FurtherInfoPart1 = () => {
  const {user} = useUser();
  const [imageModal, setImageModal] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedClassYear, setSelectedClassYear] = useState(null);
  const [loader, setLoader] = useState(false);

  const navigation = useNavigation();

  const createAccountOfUser = async data => {
    try {
      navigation.navigate('FurtherInfoPart2', {
        ...data,
        image: localImageUriArray[0]?.image,
      });
    } catch (err) {
      console.log({err});
    }
  };

  const {accessCamera, accessGallery, localImageUriArray} = useImagePicker();
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm();

  const getData = async () => {
    try {
      console.log({user});
      let res = await firestore()
        .collection('Colleges')
        .doc(user?.college)
        .get();
      setMajorsData(res?.data()?.majorsOffered);
      setClassYearData(res?.data()?.classYear);
      console.log({res});
    } catch (err) {
      console.log({err});
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const cameraHandler = () => {
    setImageModal(false);
    setTimeout(() => {
      accessCamera(true, 'photo');
    }, 500);
  };

  const galleryHandler = () => {
    setImageModal(false);
    setTimeout(() => {
      accessGallery(true, 'photo');
    }, 500);
  };

  return (
    <CustomWrapper containerStyle={{backgroundColor: COLORS.white}}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets={true}
          contentInsetAdjustmentBehavior="automatic"
          scrollEnabled={false}>
          <View>
            <TextBig textStyle={styles.textStyle}>
              Tell Us About Yourself
            </TextBig>
            <View style={styles.topContainer}>
              <TouchableOpacity
                style={styles.imageContainer}
                activeOpacity={1}
                onPress={() => setImageModal(true)}>
                <CustomImage
                  source={
                    localImageUriArray.length > 0
                      ? {
                          uri: localImageUriArray[0]?.image,
                        }
                      : images.dummyProfilePic
                  }
                  containerStyle={styles.innerImageContainer}
                  resizeMode="cover"
                  disabled={true}
                />
                <View style={styles.iconContainer}>
                  <AddProfilePictureIcon />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: hp(3)}}>
              <TextNormal bold textStyle={{marginBottom: hp(1.3)}}>
                Your First Name
              </TextNormal>
              <CustomRHFTextInput
                rules={{
                  required: {value: true, message: 'First Name is Required'},
                }}
                control={control}
                name="firstName"
                key="firstName"
                autoCapitalize="sentences"
                placeholder={'first name'}
                containerStyle={{height: hp(6.5)}}
                textInputStyle={{fontSize: wp(4)}}
                autoCorrect={false}
                spellCheck={true}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextNormal bold textStyle={{marginBottom: hp(1.3)}}>
                Your Last Name
              </TextNormal>
              <CustomRHFTextInput
                rules={{
                  required: {value: true, message: 'Last Name is Required'},
                }}
                control={control}
                name="lastName"
                key="lastName"
                autoCapitalize="sentences"
                placeholder={'last name'}
                containerStyle={{height: hp(6.5)}}
                textInputStyle={{fontSize: wp(4)}}
                autoCorrect={false}
                spellCheck={true}
              />
            </View>
          </View>
        </ScrollView>
        <CustomButton
          title="Continue"
          onPress={handleSubmit(createAccountOfUser)}
          containerStyle={styles.button}
          textStyle={styles.buttonText}
          boldTitle={true}
          disabled={!isValid || !localImageUriArray.length > 0}
          loader={loader}
        />
      </View>
      <CustomImagePickerModal
        showModal={imageModal}
        onPressCamera={cameraHandler}
        onPressGallery={galleryHandler}
        onBackButtonPress={() => setImageModal(false)}
        onBackdropPress={() => setImageModal(false)}
      />
    </CustomWrapper>
  );
};

export default FurtherInfoPart1;

const styles = StyleSheet.create({
  topContainer: {
    alignSelf: 'center',
    // marginTop: hp(1),
  },
  imageContainer: {
    marginTop: hp(2),
    height: hp(22),
    aspectRatio: 1,
    borderRadius: hp(22),
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerImageContainer: {
    height: hp(13),
    aspectRatio: 1,
    borderRadius: hp(13),
  },
  inputContainer: {
    marginTop: hp(4),
  },
  button: {
    height: hp(6.7),
    marginBottom: hp(9.5),
    width: wp(90),
  },
  WhyDoWeAsk: {
    fontFamily: FONTS.Light,
    fontSize: wp(4.2),
    color: '#8F8F8F',
    fontWeight: '300',
    marginTop: hp(-4),
  },
  italicStyle: {
    fontFamily: FONTS.LightItalic,
    fontSize: wp(3.3),
    marginTop: hp(0.5),
    color: '#575757',
  },
  buttonText: {
    fontSize: hp(2.7),
    fontWeight: '700',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 15,
    borderRadius: 100,
    zIndex: 1000,
    right: 10,
  },
  textStyle: {
    marginVertical: hp(3.5),
    fontSize: wp(7),
    fontWeight: '600',
    color: COLORS.black,
    textAlign: 'center',
  },
});
