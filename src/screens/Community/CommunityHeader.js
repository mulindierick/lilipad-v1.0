import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
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
import {MyContext} from '../../context/Context';

const CommunityHeader = ({
  selected,
  setSelected,
  upperBorderFlag,
  RBSheetRef,
}) => {
  const navigation = useNavigation();
  const {PostFlatListRef} = useContext(MyContext);
  const useScrollToTop = () => {
    PostFlatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

  return (
    <>
      <View style={styles.container}>
        <TextBig
          textStyle={styles.textStyle}
          bold
          onPress={() => useScrollToTop()}>
          Community
        </TextBig>
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <SearchSvg />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => RBSheetRef.current.open()}>
            <ThreeDotsVertical />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={
          upperBorderFlag
            ? {
                borderBottomWidth: 1,
                paddingTop: hp(1.5),
                borderBottomColor: '#DADADA',
              }
            : {
                borderBottomWidth: 1,
                borderBottomColor: 'transparent',
                paddingTop: hp(1.5),
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
});
