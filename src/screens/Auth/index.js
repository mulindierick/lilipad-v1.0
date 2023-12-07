import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomButton from '../../components/common/CustomButton';
import CustomImage from '../../components/common/CustomImage';
import {TextNormal} from '../../components/common/CustomText';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import {COLORS, FONTS, images} from '../../utils/constants/theme';
import CustomIcon from '../../components/common/CustomIcon';

const Auth = ({navigation}) => {
  const [checkBox, setCheckBox] = useState(false);
  return (
    <CustomWrapper>
      <View style={styles.container}>
        <CustomImage
          source={images.bigAppIcon}
          height={hp(40)}
          width={wp(100)}
        />
        <View
          style={{
            height: hp(28),
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <CustomButton
            title="Join"
            bigText
            onPress={() => navigation.navigate('EmailAuth')}
            textStyle={styles.buttonText}
            containerStyle={[
              {height: hp(7), backgroundColor: COLORS.grey},
              checkBox && {backgroundColor: COLORS.blue},
            ]}
            disabled={!checkBox}
          />
          <TouchableOpacity
            onPress={() => setCheckBox(!checkBox)}
            activeOpacity={1}
            style={styles.termsAndConditionsContainer}>
            <CustomIcon
              type="materialCommunityIcons"
              icon={checkBox ? 'checkbox-outline' : 'checkbox-blank-outline'}
              color={COLORS.textColorGrey}
              disabled
              size={wp(5)}
            />
            <TextNormal
              textStyle={{width: wp(74), marginLeft: wp(1)}}
              color={COLORS.textColorGrey}>
              I understand and agree to LiliPad's{' '}
              <TextNormal
                textStyle={{fontWeight: '500'}}
                color={COLORS.blue}
                onPress={() => navigation.navigate('TermsAndConditions')}>
                Terms of Service
              </TextNormal>
              ,{' '}
              <TextNormal
                textStyle={{fontWeight: '500'}}
                color={COLORS.blue}
                onPress={() => navigation.navigate('TermsAndConditions')}>
                User Agreement
              </TextNormal>{' '}
              and{' '}
              <TextNormal
                textStyle={{fontWeight: '500'}}
                color={COLORS.blue}
                onPress={() => navigation.navigate('TermsAndConditions')}>
                Privacy Policy
              </TextNormal>
            </TextNormal>
          </TouchableOpacity>

          <TextNormal color={COLORS.grey} textStyle={styles.text1}>
            A Project By
            <TextNormal color={COLORS.grey} textStyle={styles.text2}>
              {' '}
              Lili
            </TextNormal>
          </TextNormal>
        </View>
      </View>
    </CustomWrapper>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp(10),
    justifyContent: 'space-between',
    marginBottom: hp(6),
  },
  buttonText: {
    fontSize: hp(3.5),
    fontWeight: '600',
  },
  text1: {
    fontFamily: FONTS.Light,
    fontWeight: '300',
  },
  text2: {
    fontFamily: FONTS.MediumItalic,
    fontWeight: '400',
  },
  termsAndConditionsContainer: {
    flexDirection: 'row',
    width: wp(80),
    justifyContent: 'space-between',
  },
});
