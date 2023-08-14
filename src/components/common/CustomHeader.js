import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomIcon from './CustomIcon';
import {TextBig, TextBigger, TextNormal} from './CustomText';
import {COLORS, images} from '../../utils/constants/theme';
import CustomImage from './CustomImage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const CustomHeader = ({forInfoFurtherScreen = false}) => {
  const navigation = useNavigation();

  if (forInfoFurtherScreen) {
    return (
      <View style={styles.forInfoFurtherScreen}>
        <CustomImage
          source={images.backButton}
          height={hp(5)}
          width={wp(7)}
          onPressImage={() => navigation.goBack()}
        />
        <View style={{alignItems: 'center', marginLeft: wp(18.5)}}>
          <TextBigger>Tell Us A Bit</TextBigger>
          <TextBigger>About Yourself</TextBigger>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomImage
        source={images.backButton}
        height={hp(5)}
        width={wp(7)}
        onPressImage={() => navigation.goBack()}
      />
      <CustomImage source={images.headerIcon} height={hp(10)} width={wp(10)} />
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    width: wp(50),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  forInfoFurtherScreen: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: hp(1),
  },
});
