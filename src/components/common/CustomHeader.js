import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {images} from '../../utils/constants/theme';
import CustomImage from './CustomImage';
import {TextBig, TextBigger, TextNormal} from './CustomText';
import {BackButton} from './CustomSvgItems';

const CustomHeader = ({forInfoFurtherScreen = false, Activty = false}) => {
  const navigation = useNavigation();

  if (forInfoFurtherScreen) {
    return (
      <View style={styles.forInfoFurtherScreen}>
        <TextBigger textStyle={styles.headerText}>Tell Us A Bit</TextBigger>
        <TextBigger textStyle={styles.headerText}>About Yourself</TextBigger>
      </View>
    );
  }

  if (Activty) {
    return (
      <View style={styles.ActivityContainer}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={1}>
            <BackButton />
          </TouchableOpacity>
        </View>
        <TextNormal textStyle={styles.textStyle}>Activity</TextNormal>
        <View style={{flex: 1}} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
        <BackButton />
      </TouchableOpacity>
      <CustomImage source={images.headerIcon} height={wp(15)} width={wp(15)} />
      <View style={{width: wp(5)}} />
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: hp(2.5),
  },
  ActivityContainer: {
    alignItems: 'center',
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
  textStyle: {
    fontWeight: '600',
    fontSize: wp(7),
    flex: 5,
    textAlign: 'center',
  },
});
