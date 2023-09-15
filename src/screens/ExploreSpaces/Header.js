import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomImage from '../../components/common/CustomImage';
import {TextBigger} from '../../components/common/CustomText';
import {images} from '../../utils/constants/theme';

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
