import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {TextNormal, TextSmall} from '../../components/common/CustomText';
import {COLORS, images} from '../../utils/constants/theme';
import SpacesRelatedActivity from '../../utils/hooks/SpacesRelatedActivity';
import useUser from '../../utils/hooks/useUser';
import PopUpMenuItem from './PopUpMenuItem';
const SpacesContainer = ({
  data = [],
  selected,
  setSelected,
  newPostCount,
  setNewPostCount,
  upperBorderFlag,
}) => {
  const navigation = useNavigation();
  const {user} = useUser();
  const {removeSpace, updateLastSpaceVisitTime} = SpacesRelatedActivity();

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
        <TextNormal
          bold
          color={COLORS.blue}
          textStyle={styles.normalText}
          onPress={() => navigation.navigate('ExploreSpaces')}
          disabled={upperBorderFlag}>
          Browse All
        </TextNormal>
      </View>
      <View style={{width: wp(100)}}>
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
              <Menu key={index} style={{activeOpacity: 1}}>
                <MenuTrigger
                  customStyles={{
                    triggerTouchable: {
                      underlayColor: 'rgba(0, 0, 0, 0)',
                    },
                  }}
                  triggerOnLongPress={true}
                  onAlternativeAction={
                    upperBorderFlag
                      ? null
                      : () => handleSpacesClick(item, index)
                  }
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
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={styles.filterPopMenu}>
                  <MenuOption
                    onSelect={() => console.log('HELLo')}
                    customStyles={{
                      optionTouchable: {
                        underlayColor: 'rgba(0, 0, 0, 0)',
                      },
                    }}
                    children={
                      <PopUpMenuItem
                        icon={images.viewMemberIcon}
                        text={'View Members'}
                        color={COLORS.blue}
                      />
                    }
                  />
                  {item != user?.major && item != 'Skidmore College' && (
                    <MenuOption
                      onSelect={() => removeAndUpdateSpaces(item)}
                      customStyles={{
                        optionTouchable: {
                          underlayColor: 'rgba(0, 0, 0, 0)',
                        },
                      }}
                      children={
                        <PopUpMenuItem
                          icon={images.leaveGroupIcon}
                          text={'Leave Space'}
                          color={COLORS.red}
                        />
                      }
                    />
                  )}
                </MenuOptions>
              </Menu>
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
    marginTop: hp(7),
    width: wp(40),
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
});
