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
        <View>
          <CustomButton
            title="Join"
            bigText
            onPress={() => navigation.navigate('EmailAuth')}
            textStyle={styles.buttonText}
            containerStyle={{height: hp(7), backgroundColor: COLORS.grey}}
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
              size={wp(6)}
            />
            <TextNormal
              textStyle={{width: wp(72)}}
              color={COLORS.textColorGrey}>
              Yes I understand and agree to the{' '}
              <TextNormal
                textStyle={{fontWeight: '500', textDecorationLine: 'underline'}}
                color={COLORS.blue}
                onPress={() => navigation.navigate('TermsAndConditions')}>
                LiliPad Terms of Service
              </TextNormal>
              , including the User Agreement and Privacy Policy.
            </TextNormal>
          </TouchableOpacity>
        </View>
        <TextNormal color={COLORS.grey} textStyle={styles.text1}>
          A Project By
          <TextNormal color={COLORS.grey} textStyle={styles.text2}>
            {' '}
            Lili
          </TextNormal>
        </TextNormal>
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
    marginTop: hp(1),
  },
});
