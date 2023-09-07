import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {images} from '../../utils/constants/theme';
import {TextBig, TextBigger} from '../../components/common/CustomText';
import CustomImage from '../../components/common/CustomImage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <CustomImage
        source={images.backButton}
        height={hp(5.5)}
        width={wp(8)}
        onPressImage={() => navigation.goBack()}
      />
      <TextBigger textStyle={styles.text}>Explore Spaces</TextBigger>
      <CustomImage
        source={images.exploreSpaceIcon}
        height={hp(5.5)}
        width={wp(8)}
        onPressImage={() => console.log('HELLO')}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: wp(7),
  },
});
