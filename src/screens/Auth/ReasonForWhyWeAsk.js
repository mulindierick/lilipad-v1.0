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
      onBackdropPress={onBackButtonPress}>
      <View style={styles.container}>
        <TextNormal textStyle={styles.textStyle} color={COLORS.grey}>
          “We kindly ask for your full name, class year, and major to help us
          create connections that resonate with your experiences and interests.
          This way, your journey on our platform becomes uniquely yours. Rest
          assured, your data's security is our top concern.”
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
    borderRadius: hp(4),
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  textStyle: {
    fontFamily: FONTS.LightItalic,
    textAlign: 'center',
  },
});
