import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomModal from '../../components/common/CustomModal';
import {TextBigger, TextNormal} from '../../components/common/CustomText';
import {COLORS, FONTS} from '../../utils/constants/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomIcon from '../../components/common/CustomIcon';

const ReasonForWhyWeAsk = ({isVisible, onBackDropPress, onBackButtonPress}) => {
  return (
    <CustomModal
      isVisible={isVisible}
      onBackButtonPress={onBackDropPress}
      onBackdropPress={onBackButtonPress}
      containerStyle={styles.containerStyle}>
      <View style={styles.container}>
        <TextNormal textStyle={styles.textStyle} color={COLORS.grey}>
          We kindly ask for your{' '}
          <TextNormal color={COLORS.textColorGrey}>Full name</TextNormal>,
          <TextNormal color={COLORS.textColorGrey}> Class year</TextNormal>, and
          <TextNormal color={COLORS.textColorGrey}> Major </TextNormal>
          to help us create connections that resonate with your experiences and
          interests. This way, your journey on the app becomes
          <TextNormal color={COLORS.textColorGrey}>
            {' '}
            uniquely your own.
          </TextNormal>
          <TextNormal textStyle={styles.textStyle} color={COLORS.grey}>
            {'\n\n'}Rest assured, your{' '}
            <TextNormal color={COLORS.textColorGrey}>
              data's security is our top concern.
            </TextNormal>
          </TextNormal>
        </TextNormal>
      </View>
    </CustomModal>
  );
};

export default ReasonForWhyWeAsk;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingVertical: hp(3),
    paddingHorizontal: wp(5),
    width: wp(80),
    alignSelf: 'center',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  textStyle: {
    fontFamily: FONTS.LightItalic,
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
