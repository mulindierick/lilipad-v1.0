import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomDropDownPopupMenu from '../../components/common/CustomDropDownPopupMenu';
import {FilterSvg} from '../../components/common/CustomSvgItems';
import {TextNormal, TextSmall} from '../../components/common/CustomText';
import {COLORS} from '../../utils/constants/theme';
import SpacesRelatedActivity from '../../utils/hooks/SpacesRelatedActivity';
import useUser from '../../utils/hooks/useUser';
const SpacesContainer = ({
  data = [],
  selected,
  setSelected,
  newPostCount,
  setNewPostCount,
  upperBorderFlag,
  selectedFilter,
  setSelectedFilter,
  wholeScreenNotAccessibile = false,
}) => {
  const navigation = useNavigation();
  const {user} = useUser();
  const {removeSpace, updateLastSpaceVisitTime} = SpacesRelatedActivity();
  const [dropDown, setDropDown] = useState(false);

  useEffect(() => {}, [dropDown]);

  const removeAndUpdateSpaces = async item => {
    try {
      if (selected == item) {
        setSelected('Skidmore College');
      }
      let res = await removeSpace(item, user?.spaces);
    } catch (err) {
      console.log({err});
    }
  };

  const handleSpacesClick = (item, index) => {
    setSelected(item);
    if (newPostCount[item] != 0) {
      updateLastSpaceVisitTime(item);
      setNewPostCount({...newPostCount, [item]: 0});
    }
  };

  return (
    <>
      <View style={[styles.secondContainer]}>
        <TextNormal bold textStyle={styles.normalText}>
          My Spaces
        </TextNormal>

        <View>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => setDropDown(!dropDown)}>
            <TextNormal
              bold
              textStyle={[
                styles.normalText,
                {marginRight: wp(2), fontWeight: '500'},
              ]}
              color={COLORS.blue}>
              {selectedFilter}
            </TextNormal>
            <FilterSvg />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{width: wp(100)}}>
        <CustomDropDownPopupMenu
          focus={dropDown}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          setFocus={setDropDown}
        />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          persistentScrollbar={true}
          contentContainerStyle={{
            flexGrow: 1,
            // paddingHorizontal: wp(0.5),
            marginLeft: wp(5),
          }}>
          {data.map((item, index) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => handleSpacesClick(item)}
                style={[
                  selected == item ? styles.selected : styles.container,
                  index == data.length - 1 ? {marginRight: wp(10)} : {},
                ]}
                disabled={upperBorderFlag}>
                <TextNormal
                  textStyle={[
                    styles.textStyle,
                    selected == item && {fontWeight: '600'},
                  ]}
                  numberOfLines={item.split(' ').length > 1 ? 2 : 1}
                  color={selected == item ? COLORS.white : COLORS.black}>
                  {item}
                </TextNormal>
                {newPostCount[item] != 0 && (
                  <View style={styles.totalPostNumbers}>
                    <TextSmall
                      bold
                      color={COLORS.white}
                      textStyle={{fontSize: hp(1.4)}}>
                      {newPostCount[item] > 99 ? '99+' : newPostCount[item]}
                    </TextSmall>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
};

export default SpacesContainer;

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp(1),
    backgroundColor: COLORS.white,
    marginRight: wp(2),
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: wp(2),
    marginVertical: hp(1.5),
    justifyContent: 'center',
    // For Shadow
    borderWidth: 0.1,
    borderColor: '#CCCCCC',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 8,
  },
  selected: {
    paddingVertical: hp(1),
    backgroundColor: COLORS.blue,
    marginRight: wp(2),
    borderRadius: 10,

    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(2),
    marginVertical: hp(1.5),
  },
  textStyle: {
    fontWeight: '500',
    fontSize: wp(5),
    // lineHeight: hp(2.3),
  },
  totalPostNumbers: {
    position: 'absolute',
    top: -9,
    right: -7,
    height: wp(5),
    aspectRatio: 1,
    backgroundColor: COLORS.green,
    borderRadius: hp(2.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterPopMenu: {
    // marginTop: hp(7),
    width: wp(40),
    backgroundColor: COLORS.white,
    alignItems: 'flex-start',
    paddingVertical: hp(1.5),
    borderRadius: 12,
  },
  secondContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
    paddingHorizontal: wp(5),
  },
  normalText: {
    fontSize: wp(4.5),
    fontWeight: '600',
  },
  filterPopMenu: {
    marginTop: hp(3.8),
    width: wp(30),
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
