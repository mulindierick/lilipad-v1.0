import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomButton from '../../components/common/CustomButton';
import CustomImage from '../../components/common/CustomImage';
import CustomImagePickerModal from '../../components/common/CustomImagePickerModal';
import CustomRHFTextInput from '../../components/common/CustomReactHookFormTextInput';
import CustomSearchDropDown from '../../components/common/CustomSearchDropDown';
import {TextNormal} from '../../components/common/CustomText';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import {showToast} from '../../utils/constants/helper';
import {COLORS, FONTS, images} from '../../utils/constants/theme';
import UseFirebaseAuth from '../../utils/hooks/UseFirebaseAuth';
import useImagePicker from '../../utils/hooks/useImagePicker';
import ReasonForWhyWeAsk from './ReasonForWhyWeAsk';

const FurtherInfo = () => {
  const [modal, setModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [majorsData, setMajorsData] = useState([]);
  const [classYearData, setClassYearData] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedClassYear, setSelectedClassYear] = useState(null);
  const [loader, setLoader] = useState(false);

  const {createAccount} = UseFirebaseAuth();

  console.log('heree ', selectedMajor, ' ', selectedClassYear);

  const createAccountOfUser = async data => {
    setLoader(true);
    try {
      let res = await createAccount({
        ...data,
        major: selectedMajor,
        classYear: selectedClassYear,
        image: localImageUriArray[0]?.image,
      });
      console.log({res});
      if (res == 'Success') {
        showToast('success', 'Account Created Successfully');
      } else {
        showToast('error', 'Some error occured! try again later.');
      }
    } catch (err) {
      console.log({err});
    }
    setLoader(false);
  };

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
    <CustomWrapper
      requiresHeader
      forInfoFurtherScreen={true}
      containerStyle={{backgroundColor: COLORS.white}}>
      <ScrollView
        nestedScrollEnabled={true}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic"
        automaticallyAdjustKeyboardInsets
        contentInset={{
          top: hp(5),
        }}
        automaticallyAdjustContentInsets={true}>
        <View style={styles.topContainer}>
          <TextNormal
            color={COLORS.grey}
            onPress={() => setModal(true)}
            textStyle={styles.WhyDoWeAsk}>
            Why Do We Ask?
          </TextNormal>
          <View style={styles.imageContainer}>
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
            autoCapitalize="sentences"
          />
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
            autoCapitalize="sentences"
          />
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
              selected={selectedClassYear}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextNormal bold textStyle={{marginBottom: hp(1)}}>
              {`Your Major (Or Prospective Major)`}
            </TextNormal>
            <CustomSearchDropDown
              data={majorsData}
              setSelected={setSelectedMajor}
              selected={selectedMajor}
            />
          </View>
        </ScrollView>
        <CustomButton
          title="Create Account"
          onPress={handleSubmit(createAccountOfUser)}
          containerStyle={styles.button}
          textStyle={styles.buttonText}
          boldTitle={true}
          disabled={
            !isValid ||
            !localImageUriArray.length > 0 ||
            !selectedMajor ||
            !selectedClassYear
          }
          loader={loader}
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
    // marginTop: hp(1),
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
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 12,
  },
  innerImageContainer: {
    height: hp(13),
    aspectRatio: 1,
    borderRadius: hp(10),
  },
  inputContainer: {
    marginTop: hp(1.5),
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
    left: 25,
    bottom: 0,
    borderRadius: 100,
    zIndex: 1000,
  },
});
