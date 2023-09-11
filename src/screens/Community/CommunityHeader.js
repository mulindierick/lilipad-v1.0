import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextBig, TextNormal} from '../../components/common/CustomText';
import CustomImage from '../../components/common/CustomImage';
import {COLORS, FONTS, images} from '../../utils/constants/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

const CommunityHeader = ({selected, setSelected, upperBorderFlag}) => {
  return (
    <>
      <View style={styles.container}>
        <TextBig textStyle={styles.textStyle} bold>
          Community
        </TextBig>
        <View style={styles.innerContainer}>
          <CustomImage
            source={images.search}
            height={wp(8)}
            width={wp(8)}
            resizeMode="cover"
            containerStyle={{marginRight: wp(7)}}
          />
          <Menu>
            <MenuTrigger
              customStyles={{
                triggerTouchable: {
                  underlayColor: 'rgba(0, 0, 0, 0)',
                },
              }}>
              <CustomImage
                source={images.filter}
                height={wp(9)}
                width={wp(9)}
                resizeMode="cover"
                disabled
              />
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={styles.filterPopMenu}>
              <MenuOption
                onSelect={() => setSelected('Recent')}
                customStyles={{
                  optionTouchable: {
                    underlayColor: 'rgba(0, 0, 0, 0)',
                  },
                }}
                children={
                  <TextNormal
                    textStyle={[
                      styles.filterPopMenuText,
                      selected == 'Recent' && {color: COLORS.blue},
                    ]}>
                    Recent
                  </TextNormal>
                }
              />
              <MenuOption
                onSelect={() => setSelected('Popular')}
                customStyles={{
                  optionTouchable: {
                    underlayColor: 'rgba(0, 0, 0, 0)',
                  },
                }}
                children={
                  <TextNormal
                    textStyle={[
                      styles.filterPopMenuText,
                      selected == 'Popular' && {color: COLORS.blue},
                    ]}>
                    Popular
                  </TextNormal>
                }
              />
              <MenuOption
                onSelect={() => setSelected('My Posts')}
                customStyles={{
                  optionTouchable: {
                    underlayColor: 'rgba(0, 0, 0, 0)',
                  },
                }}
                children={
                  <TextNormal
                    textStyle={[
                      styles.filterPopMenuText,
                      selected == 'My Posts' && {color: COLORS.blue},
                    ]}>
                    My Posts
                  </TextNormal>
                }
              />
            </MenuOptions>
          </Menu>
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
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textStyle: {
    fontFamily: FONTS.Bold,
    fontSize: hp(4),
    color: '#151313',
  },
  secondContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  normalText: {
    fontSize: hp(1.9),
    fontWeight: '600',
  },
  filterPopMenu: {
    marginTop: hp(5),
    width: wp(50),
    borderRadius: 5,
    backgroundColor: COLORS.white,
    alignItems: 'flex-start',
    paddingVertical: hp(1.5),
    borderRadius: 12,
  },
  filterPopMenuText: {
    fontSize: hp(1.8),
    fontWeight: 'bold',
    paddingHorizontal: wp(3),
    marginVertical: hp(0.4),
    width: wp(47),
  },
});
