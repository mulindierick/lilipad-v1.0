import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomModal from '../../components/common/CustomModal';
import {TextBigger, TextNormal} from '../../components/common/CustomText';
import {COLORS, FONTS} from '../../utils/constants/theme';
import {BlurView} from '@react-native-community/blur';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomIcon from '../../components/common/CustomIcon';
import CustomButton from '../../components/common/CustomButton';

const WelcomeNoteModal = ({
  isVisible,
  onBackDropPress,
  onBackButtonPress,
  user,
}) => {
  return (
    <CustomModal
      isVisible={isVisible}
      onBackButtonPress={onBackDropPress}
      onBackdropPress={onBackButtonPress}
      containerStyle={styles.containerStyle}
      backdropOpacity={0}
      animationIn="zoomIn"
      animationOut="zoomOut">
      <BlurView style={styles.parentView} blurType="light" blurAmount={2.5}>
        <View style={styles.container}>
          <TextNormal textStyle={styles.boldText}>
            Dear {user?.firstName},{'\n'}
          </TextNormal>
          <TextNormal textStyle={styles.semiBold}>
            Welcome to LiliPad.{' '}
          </TextNormal>
          <TextNormal textStyle={styles.semiBold}>
            LiliPad is a community network.
          </TextNormal>
          <TextNormal textStyle={styles.semiBold}>
            A network that works to truly bring
          </TextNormal>
          <TextNormal textStyle={styles.semiBold}>us all together.</TextNormal>

          <TextNormal textStyle={[styles.semiBold, {marginTop: hp(1.2)}]}>
            You have been added to three spaces.
          </TextNormal>
          <TextNormal textStyle={styles.semiBold}>
            {' '}
            However, feel welcome to join any
          </TextNormal>
          <TextNormal textStyle={styles.semiBold}>
            and all others that resonate with you.
          </TextNormal>

          <TextNormal textStyle={[styles.semiBold, {marginTop: hp(1.2)}]}>
            Now, put yourself out there.
          </TextNormal>
          <TextNormal textStyle={styles.semiBold}>
            Explore your interests.
          </TextNormal>
          <TextNormal textStyle={styles.semiBold}>
            Discover all that your community
          </TextNormal>
          <TextNormal textStyle={styles.semiBold}>has to offer.</TextNormal>
          <TextNormal textStyle={[styles.semiBold, {marginTop: hp(2)}]}>
            Welcome.
          </TextNormal>
          <TextNormal textStyle={[styles.semiBold, {marginVertical: hp(2)}]}>
            - The LiliPad Team
          </TextNormal>
          <CustomButton
            title="Close"
            onPress={onBackButtonPress}
            textStyle={{fontWeight: 'bold', fontSize: wp(4.2)}}
            containerStyle={{height: hp(5.5)}}
          />
        </View>
      </BlurView>
    </CustomModal>
  );
};

export default WelcomeNoteModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingVertical: hp(3),
    width: wp(90),
    alignSelf: 'center',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    borderWidth: 0.6,
    borderColor: '#DADADA',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 12,
  },

  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldText: {
    fontFamily: FONTS.Bold,
    fontSize: wp(4.2),
    fontWeight: 'bold',
  },
  semiBold: {
    fontSize: wp(4.2),
    fontWeight: '600',
  },
  parentView: {
    height: hp(102),
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
