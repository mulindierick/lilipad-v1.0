import React, {useState, useRef, useEffect, useCallback} from 'react';
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
import useUser from '../../utils/hooks/useUser';
import PopUpMenuItem from './PopUpMenuItem';
import SpacesRelatedActivity from '../../utils/hooks/SpacesRelatedActivity';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
const SpacesContainer = ({data = [], selected, setSelected}) => {
  const navigation = useNavigation();
  const {user} = useUser();
  const [toggleMenu, setToggleMenu] = useState(false);
  const {removeSpace} = SpacesRelatedActivity();
  const removeAndUpdateSpaces = useCallback(async item => {
    try {
      if (selected == item) {
        setSelected('Skidmore College');
      }
      let res = await removeSpace(item);
    } catch (err) {
      console.log({err});
    }
  }, []);

  const handleSpacesClick = (item, index) => {
    setSelected(item);
  };

  return (
    <>
      <View style={styles.secondContainer}>
        <TextNormal bold textStyle={styles.normalText}>
          My Spaces
        </TextNormal>
        <TextNormal
          bold
          color={COLORS.blue}
          textStyle={styles.normalText}
          onPress={() => navigation.navigate('ExploreSpaces')}>
          Browse All
        </TextNormal>
      </View>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        persistentScrollbar={true}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: wp(0.5),
          marginVertical: hp(0.5),
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
                onAlternativeAction={() => handleSpacesClick(item, index)}
                style={
                  selected == item
                    ? [
                        styles.selected,
                        item.split(' ').length == 1 && styles.selected2,
                      ]
                    : [
                        styles.container,
                        item.split(' ').length == 1 && styles.container2,
                      ]
                }>
                <TextNormal
                  textStyle={styles.textStyle}
                  numberOfLines={item.split(' ').length > 1 ? 2 : 1}
                  color={selected == item ? COLORS.white : COLORS.black}>
                  {item}
                </TextNormal>
                <View style={styles.totalPostNumbers}>
                  <TextSmall
                    bold
                    color={COLORS.white}
                    textStyle={{fontSize: hp(1.4)}}>
                    0
                  </TextSmall>
                </View>
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
    </>
  );
};

export default SpacesContainer;

const styles = StyleSheet.create({
  container: {
    width: wp(28),
    height: hp(6),
    backgroundColor: COLORS.white,
    marginRight: wp(2),
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: wp(2),
    marginVertical: hp(1.5),
    justifyContent: 'flex-end',
    paddingBottom: hp(0.2),
    // For Shadow
    borderWidth: 0.1,
    borderColor: '#CCCCCC',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.14,
    shadowRadius: 1,
    elevation: 8,
  },
  selected: {
    width: wp(29),
    height: hp(6.2),
    backgroundColor: COLORS.blue,
    marginRight: wp(2),
    borderRadius: 10,
    paddingBottom: hp(0.2),

    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: wp(2),
    marginVertical: hp(1.5),
  },
  selected2: {
    paddingBottom: 0,
    justifyContent: 'center',
  },
  container2: {
    paddingBottom: 0,
    justifyContent: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: wp(5),
    lineHeight: hp(2.3),
  },
  totalPostNumbers: {
    position: 'absolute',
    top: -9,
    right: -7,
    height: hp(2.5),
    aspectRatio: 1,
    backgroundColor: COLORS.green,
    borderRadius: hp(2.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterPopMenu: {
    marginTop: hp(8.5),
    width: wp(40),
    borderRadius: 5,
    backgroundColor: COLORS.white,
    alignItems: 'flex-start',
    paddingVertical: hp(1.5),
    borderRadius: 12,
  },
  secondContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
  },
  normalText: {
    fontSize: hp(1.9),
    fontWeight: '600',
  },
});
