import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomButton from '../../components/common/CustomButton';
import CustomImage from '../../components/common/CustomImage';
import {TextNormal} from '../../components/common/CustomText';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import {COLORS, FONTS, images} from '../../utils/constants/theme';

const Auth = ({navigation}) => {
  return (
    <CustomWrapper>
      <View style={styles.container}>
        <CustomImage
          source={images.bigAppIcon}
          height={hp(40)}
          width={wp(100)}
        />
        <CustomButton
          title="Join"
          bigText
          onPress={() => navigation.navigate('EmailAuth')}
          textStyle={styles.buttonText}
          containerStyle={{height: hp(7), backgroundColor: COLORS.grey}}
        />
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
});
