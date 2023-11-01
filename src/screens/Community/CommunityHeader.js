import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {TextBig, TextNormal} from '../../components/common/CustomText';
import CustomImage from '../../components/common/CustomImage';
import {COLORS, FONTS, svg} from '../../utils/constants/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import Svg, {Path} from 'react-native-svg';
import {
  FilterSvg,
  SearchSvg,
  ThreeDotsVertical,
} from '../../components/common/CustomSvgItems';
import {useNavigation} from '@react-navigation/native';

const CommunityHeader = ({selected, setSelected, upperBorderFlag}) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <TextBig textStyle={styles.textStyle} bold>
          Community
        </TextBig>
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <SearchSvg />
          </TouchableOpacity>
          <ThreeDotsVertical />
        </View>
      </View>
      <View
        style={
          upperBorderFlag
            ? {
                borderWidth: 0.4,
                marginTop: hp(1.5),
                borderColor: '#DADADA',
                marginHorizontal: wp(-4),
              }
            : {
                borderWidth: 0.4,
                borderColor: 'transparent',
                marginTop: hp(1.5),
                marginHorizontal: wp(-4),
              }
        }
      />
    </>
  );
};

export default CommunityHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    position: 'relative',
    zIndex: 10000000,
    paddingHorizontal: wp(4),
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: FONTS.Bold,
    fontSize: wp(9),
    color: '#151313',
  },
  secondContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  filterPopMenu: {
    marginTop: hp(5),
    width: wp(50),
    borderRadius: 5,
    backgroundColor: COLORS.white,
    alignItems: 'flex-start',
    paddingVertical: hp(1.5),
    borderRadius: 12,
    shadowColor: '#000000',
    borderWidth: 0.1,
    borderColor: '#CCCCCC',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },
  filterPopMenuText: {
    fontSize: wp(4.3),
    fontWeight: 'bold',
    paddingHorizontal: wp(3),
    marginVertical: hp(0.4),
    width: wp(47),
  },
});
