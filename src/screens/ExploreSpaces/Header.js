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
import {TouchableOpacity} from 'react-native';
import {
  BackButton,
  ExploreMainSvg,
  ExplorePlusButton,
} from '../../components/common/CustomSvgItems';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TextBigger textStyle={styles.text}>Explore</TextBigger>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('CreateSpace')}>
          <ExplorePlusButton />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={1}>
          <ExploreMainSvg />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
  },
  text: {
    fontSize: wp(9),
    fontWeight: 'bold',
  },
});
