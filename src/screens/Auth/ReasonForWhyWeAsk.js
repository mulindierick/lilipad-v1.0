import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import CustomModal from '../../components/common/CustomModal';
import {TextBigger, TextNormal} from '../../components/common/CustomText';
import {COLORS, FONTS} from '../../utils/constants/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomIcon from '../../components/common/CustomIcon';
import {BlurView} from '@react-native-community/blur';

const ReasonForWhyWeAsk = ({isVisible, onBackDropPress, onBackButtonPress}) => {
  return (
    <CustomModal
      isVisible={isVisible}
      onBackButtonPress={onBackDropPress}
      onBackdropPress={onBackButtonPress}
      containerStyle={styles.containerStyle}
      backdropOpacity={0}>
      <TouchableWithoutFeedback onPress={onBackButtonPress}>
        <BlurView style={styles.parentView} blurType="light" blurAmount={1.5}>
          <TouchableOpacity style={styles.container} activeOpacity={1}>
            <TextNormal textStyle={styles.textStyle}>
              We ask for your{' '}
              <TextNormal textStyle={styles.lightBoldItalic}>
                Class year
              </TextNormal>{' '}
              and
              <TextNormal textStyle={styles.lightBoldItalic}>
                {' '}
                Major{' '}
              </TextNormal>
              to help us connect you with others who share similar interests and
              experiences.
              {'\n\n'}This way, your journey on the app becomes uniquely your
              own.
              <TextNormal textStyle={styles.textStyle}>
                {'\n\n'}Rest assured, your{' '}
                <TextNormal textStyle={styles.lightBoldItalic}>
                  data's security is our top concern.
                </TextNormal>
              </TextNormal>
            </TextNormal>
          </TouchableOpacity>
        </BlurView>
      </TouchableWithoutFeedback>
    </CustomModal>
  );
};

export default ReasonForWhyWeAsk;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingVertical: hp(3),
    paddingHorizontal: wp(3),
    width: wp(60),
    alignSelf: 'center',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    borderWidth: 0.4,
    borderColor: '#B5B5B5',
  },
  textStyle: {
    fontFamily: FONTS.LightItalic,
    fontSize: wp(3.8),
    fontWeight: '400',
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  parentView: {
    height: hp(102),
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightBoldItalic: {
    fontFamily: FONTS.LightItalic,
    fontSize: wp(3.8),
    fontWeight: '500',
  },
});
