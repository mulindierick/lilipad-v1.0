import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {images} from '../../utils/constants/theme';
import CustomImage from './CustomImage';
import {TextBigger} from './CustomText';

const CustomHeader = ({forInfoFurtherScreen = false}) => {
  const navigation = useNavigation();

  if (forInfoFurtherScreen) {
    return (
      <View style={styles.forInfoFurtherScreen}>
        <TextBigger textStyle={styles.headerText}>Tell Us A Bit</TextBigger>
        <TextBigger textStyle={styles.headerText}>About Yourself</TextBigger>
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
    // flexDirection: 'row',
    marginTop: hp(1),
  },
  headerText: {
    fontWeight: '600',
    fontSize: wp(6.5),
  },
});
