import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomModal from './CustomModal';
import LottieView from 'lottie-react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/constants/theme';
import {BlurView} from '@react-native-community/blur';

const CustomNoInternetModal = ({isVisible}) => {
  return (
    <CustomModal isVisible={isVisible}>
      <BlurView
        style={{
          position: 'absolute',
          width: wp(101),
          height: hp(101),
          alignItems: 'center',
          justifyContent: 'center',
        }}
        blurType="light"
        blurAmount={15}>
        <View
          style={{
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
            padding: wp(5),
            borderRadius: wp(5),
            overflow: 'hidden',
          }}>
          <LottieView
            source={require('../../assets/NoInternetLottie.json')}
            autoPlay
            loop
            style={{height: hp(40), width: wp(80), borderRadius: wp(5)}}
          />
        </View>
      </BlurView>
    </CustomModal>
  );
};

export default CustomNoInternetModal;

const styles = StyleSheet.create({});
