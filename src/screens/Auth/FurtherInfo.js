import React, {useEffect, useState} from 'react';
import {set, useForm} from 'react-hook-form';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomButton from '../../components/common/CustomButton';
import CustomImage from '../../components/common/CustomImage';
import CustomImagePickerModal from '../../components/common/CustomImagePickerModal';
import CustomRHFTextInput from '../../components/common/CustomReactHookFormTextInput';
import {TextNormal} from '../../components/common/CustomText';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import {COLORS, FONTS, images} from '../../utils/constants/theme';
import useImagePicker from '../../utils/hooks/useImagePicker';
import ReasonForWhyWeAsk from './ReasonForWhyWeAsk';
import CustomSearchDropDown from '../../components/common/CustomSearchDropDown';
import firestore from '@react-native-firebase/firestore';

const FurtherInfo = () => {
  const [modal, setModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [majorsData, setMajorsData] = useState([]);
  const [classYearData, setClassYearData] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedClassYear, setSelectedClassYear] = useState('');

  const {accessCamera, accessGallery, localImageUriArray} = useImagePicker();
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm();

  const getData = async () => {
    try {
      let res = await firestore()
        .collection('Colleges')
        .where('collegeName', '==', 'Skidmore College')
        .get();
      setMajorsData(res?.docs[0]?.data()?.majorsOffered);
      setClassYearData(res?.docs[0]?.data()?.classYear);
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
      accessCamera();
    }, 500);
  };

  const galleryHandler = () => {
    setImageModal(false);
    setTimeout(() => {
      accessGallery();
    }, 500);
  };

  return (
    <CustomWrapper requiresHeader forInfoFurtherScreen={true}>
      <ScrollView
        nestedScrollEnabled={true}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="handled">
        <View style={styles.topContainer}>
          <TextNormal
            color={COLORS.grey}
            onPress={() => setModal(true)}
            textStyle={styles.WhyDoWeAsk}>
            Why Do We Ask?
          </TextNormal>
          <View style={styles.imageContainer}>
            <CustomImage
              source={{
                uri:
                  localImageUriArray.length > 0
                    ? localImageUriArray[0]?.image
                    : 'https://thecrimsonwhite.com/wp-content/uploads/2023/04/john-wick-4-cast-1647530231314-900x506.jpg',
              }}
              containerStyle={styles.innerImageContainer}
              resizeMode="cover"
            />
            <CustomImage
              source={images.cameraIcon}
              resizeMode="cover"
              containerStyle={styles.iconContainer}
              height={hp(4.5)}
              width={hp(4.5)}
              onPressImage={() => setImageModal(true)}
            />
          </View>
        </View>
        <View style={{marginTop: hp(2)}}>
          <TextNormal bold textStyle={{marginBottom: hp(1)}}>
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
          <TextNormal textStyle={styles.italicStyle}>
            You will not be able to change your first name
          </TextNormal>
        </View>
        <View style={styles.inputContainer}>
          <TextNormal bold textStyle={{marginBottom: hp(1)}}>
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
          <TextNormal textStyle={styles.italicStyle}>
            You will not be able to change your last name
          </TextNormal>
        </View>
        <ScrollView
          horizontal={true}
          scrollEnabled={false}
          nestedScrollEnabled={true}
          contentContainerStyle={{
            width: '100%',
            flexDirection: 'column',
          }}
          keyboardShouldPersistTaps="handled">
          <View style={styles.inputContainer}>
            <TextNormal bold textStyle={{marginBottom: hp(1)}}>
              Your Class Year
            </TextNormal>
            <CustomSearchDropDown
              data={classYearData}
              setSelected={setSelectedClassYear}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextNormal bold textStyle={{marginBottom: hp(1)}}>
              {`Your Major (Or Prospective Major)`}
            </TextNormal>
            <CustomSearchDropDown
              data={majorsData}
              setSelected={setSelectedMajor}
            />
          </View>
        </ScrollView>
        <CustomButton
          title="Create Account"
          onPress={() => console.log('HELLO')}
          containerStyle={styles.button}
          textStyle={styles.buttonText}
          boldTitle={true}
          disabled={!isValid || !localImageUriArray.length > 0}
        />
      </ScrollView>
      <ReasonForWhyWeAsk
        isVisible={modal}
        onBackButtonPress={() => setModal(false)}
        onBackdropPress={() => setModal(false)}
      />
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

export default FurtherInfo;

const styles = StyleSheet.create({
  topContainer: {
    alignItems: 'center',
    marginTop: hp(1),
  },
  imageContainer: {
    marginTop: hp(2),
    height: hp(16),
    aspectRatio: 1,
    borderRadius: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    elevation: 12,
  },
  innerImageContainer: {
    height: hp(13),
    aspectRatio: 1,
    borderRadius: hp(10),
  },
  inputContainer: {
    marginTop: hp(1),
  },
  button: {
    width: wp(87),
    marginVertical: hp(4),
    height: hp(6.4),
  },
  WhyDoWeAsk: {
    fontFamily: FONTS.Light,
    fontSize: wp(4.2),
    color: '#8F8F8F',
  },
  italicStyle: {
    fontFamily: FONTS.LightItalic,
    fontSize: wp(3.3),
    marginTop: hp(0.5),
  },
  buttonText: {
    fontSize: hp(2.7),
    fontWeight: '700',
  },
  iconContainer: {
    position: 'absolute',
    left: 25,
    bottom: 0,
    borderRadius: 100,
    zIndex: 1000,
  },
});
