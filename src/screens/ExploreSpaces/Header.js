import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
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
import CustomExploreDropDownPopupMenu from '../../components/common/CustomExploreDropDownPopupMenu';
import {MyContext} from '../../context/Context';

const Header = ({selectedFilter, setSelectedFilter}) => {
  const [dropDown, setDropDown] = useState(false);
  const navigation = useNavigation();

  const {ExploreSpacesFlatListRef} = useContext(MyContext);
  const useScrollToTop = () => {
    ExploreSpacesFlatListRef.current.scrollToOffset({
      animated: true,
      offset: 0,
    });
  };

  return (
    <View style={styles.container}>
      {dropDown && (
        <TouchableWithoutFeedback onPress={() => setDropDown(false)}>
          <View style={styles.absoluteView}></View>
        </TouchableWithoutFeedback>
      )}
      <TextBigger textStyle={styles.text} onPress={() => useScrollToTop()}>
        Explore
      </TextBigger>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('CreateSpace')}>
          <ExplorePlusButton />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setDropDown(!dropDown)}>
          <ExploreMainSvg />
        </TouchableOpacity>
      </View>
      <CustomExploreDropDownPopupMenu
        focus={dropDown}
        setFocus={setDropDown}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
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
    paddingHorizontal: wp(4),
  },
  text: {
    fontSize: wp(9),
    fontWeight: 'bold',
  },
  absoluteView: {
    position: 'absolute',
    backgroundColor: 'transparent',
    height: hp(100),
    width: wp(100),
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
