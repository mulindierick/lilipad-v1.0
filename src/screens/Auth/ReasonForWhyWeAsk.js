import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomModal from '../../components/common/CustomModal';
import {TextBigger, TextNormal} from '../../components/common/CustomText';
import {COLORS} from '../../utils/constants/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const ReasonForWhyWeAsk = ({isVisible, onBackDropPress, onBackButtonPress}) => {
  return (
    <CustomModal
      isVisible={isVisible}
      onBackButtonPress={onBackDropPress}
      onBackdropPress={onBackButtonPress}>
      <View style={styles.container}>
        <TextNormal bold italic>
          HERE WILL BE THE REASON WHY
        </TextNormal>
      </View>
    </CustomModal>
  );
};

export default ReasonForWhyWeAsk;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: hp(50),
    width: wp(80),
    alignSelf: 'center',
    borderRadius: hp(4),
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
});
