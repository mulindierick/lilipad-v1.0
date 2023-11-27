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
import CustomSearchDropDown from '../../components/common/CustomSearchDropDown';
import {TextBig, TextNormal} from '../../components/common/CustomText';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import {showToast} from '../../utils/constants/helper';
import {COLORS, FONTS, images} from '../../utils/constants/theme';
import UseFirebaseAuth from '../../utils/hooks/UseFirebaseAuth';
import useImagePicker from '../../utils/hooks/useImagePicker';
import ReasonForWhyWeAsk from './ReasonForWhyWeAsk';
import useUser from '../../utils/hooks/useUser';
import {BackButton} from '../../components/common/CustomSvgItems';
import {useNavigation} from '@react-navigation/native';

const FurtherInfoPart2 = ({route}) => {
  const {user} = useUser();
  const [modal, setModal] = useState(false);

  const [majorsData, setMajorsData] = useState([]);
  const [classYearData, setClassYearData] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedClassYear, setSelectedClassYear] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();

  const {createAccount} = UseFirebaseAuth();

  const createAccountOfUser = async () => {
    setLoader(true);
    try {
      let res = await createAccount({
        ...route?.params,
        major: selectedMajor,
        classYear: selectedClassYear,
      });

      // if (res == 'Success') {
      //   showToast('success', 'Account Created Successfully');
      // } else {
      //   showToast('error', 'Some error occured! try again later.');
      // }
    } catch (err) {
      console.log({err});
    }
    setLoader(false);
  };

  const getData = async () => {
    try {
      let res = await firestore()
        .collection('Colleges')
        .doc(user?.college)
        .get();
      setMajorsData(res?.data()?.majorsOffered);
      setClassYearData(res?.data()?.classYear);
    } catch (err) {
      console.log({err});
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <CustomWrapper containerStyle={{backgroundColor: COLORS.white}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{alignSelf: 'flex-start', marginTop: hp(4)}}>
        <BackButton />
      </TouchableOpacity>
      <ScrollView
        scrollEnabled={true}
        keyboardShouldPersistTaps={'always'}
        contentInsetAdjustmentBehavior="automatic"
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: hp(4),
        }}>
        <TextBig textStyle={styles.textStyle}>Tell Us A Bit More</TextBig>
        <TextNormal
          color={COLORS.grey}
          onPress={() => setModal(true)}
          textStyle={styles.WhyDoWeAsk}>
          Why Do We Ask For This?
        </TextNormal>
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
            <TextNormal bold textStyle={{marginBottom: hp(1.5)}}>
              Your Class Year
            </TextNormal>
            <CustomSearchDropDown
              data={classYearData}
              setSelected={setSelectedClassYear}
              selected={selectedClassYear}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextNormal bold textStyle={{marginBottom: hp(1.5)}}>
              {`Your Major (Or Prospective Major)`}
            </TextNormal>
            <CustomSearchDropDown
              data={majorsData}
              setSelected={setSelectedMajor}
              selected={selectedMajor}
            />
          </View>
        </ScrollView>
      </ScrollView>
      <CustomButton
        title="Create Account"
        onPress={() => createAccountOfUser()}
        containerStyle={styles.button}
        textStyle={styles.buttonText}
        boldTitle={true}
        disabled={!selectedMajor || !selectedClassYear}
        loader={loader}
      />
      <ReasonForWhyWeAsk
        isVisible={modal}
        onBackButtonPress={() => setModal(false)}
        onBackdropPress={() => setModal(false)}
      />
    </CustomWrapper>
  );
};

export default FurtherInfoPart2;

const styles = StyleSheet.create({
  topContainer: {
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: hp(3.5),
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
    textAlign: 'center',
    marginBottom: hp(5.5),
  },
  buttonText: {
    fontSize: hp(2.7),
    fontWeight: '700',
  },

  textStyle: {
    marginTop: hp(3.5),
    marginBottom: hp(3.5),
    fontSize: wp(7),
    fontWeight: '600',
    color: COLORS.black,
    textAlign: 'center',
  },
});
