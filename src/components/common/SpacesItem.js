import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextBig, TextNormal} from './CustomText';
import CustomImage from './CustomImage';
import {COLORS, FONTS, images} from '../../utils/constants/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import useUser from '../../utils/hooks/useUser';

const SpacesItem = ({item, AddSpaces, index}) => {
  const {user} = useUser();

  return (
    <View style={[styles.spaceContainer, index == 0 && {borderTopWidth: 0}]}>
      <View>
        <TextBig numberOfLines={1} textStyle={styles.spaceContainerHeader}>
          {item?._data?.spaceName}
        </TextBig>
        <TextNormal color={'#696868'} textStyle={styles.peopleLengthText}>
          {item?._data?.members.length || 0} People
        </TextNormal>
      </View>
      <TextNormal
        textStyle={{fontSize: wp(4.5), fontWeight: '500'}}
        color={
          user.spaces.includes(item?._data?.spaceName)
            ? COLORS.blue
            : COLORS.textColorGrey
        }
        disabled={user.spaces.includes(item?._data?.spaceName)}
        onPress={() => AddSpaces(item?._data?.spaceName, item?._data?.spaceId)}>
        {user.spaces.includes(item?._data?.spaceName) ? 'Joined' : 'Join'}
      </TextNormal>
    </View>
  );
};

export default SpacesItem;

const styles = StyleSheet.create({
  spaceContainer: {
    paddingLeft: wp(6),
    paddingRight: wp(9),
    paddingVertical: hp(1.2),
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 0.17,
    borderColor: '#CCCCCC',
  },
  spaceContainerHeader: {
    width: wp(70),
    fontSize: wp(5.8),
  },
  peopleLengthText: {
    fontFamily: FONTS.Regular,
    fontWeight: '400',
  },
});
