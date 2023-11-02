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

const SpacesItem = ({item, AddSpaces}) => {
  const {user} = useUser();

  return (
    <View style={styles.spaceContainer}>
      <View>
        <TextBig numberOfLines={1} textStyle={styles.spaceContainerHeader}>
          {item?._data?.spaceName}
        </TextBig>
        <TextNormal color={'#696868'} textStyle={styles.peopleLengthText}>
          {item?._data?.members.length || 0} People
        </TextNormal>
      </View>
      <CustomImage
        source={
          user.spaces.includes(item?._data?.spaceName)
            ? images.alreadyInGroupIcon
            : images.joinGroupIcon
        }
        disabled={user.spaces.includes(item?._data?.spaceName)}
        onPressImage={() =>
          AddSpaces(item?._data?.spaceName, item?._data?.spaceId)
        }
        height={hp(5)}
        width={wp(8)}
      />
    </View>
  );
};

export default SpacesItem;

const styles = StyleSheet.create({
  spaceContainer: {
    marginHorizontal: wp(1),
    borderRadius: 15,
    marginBottom: hp(2),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    backgroundColor: COLORS.backgroundColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.2,
    borderColor: '#CCCCCC',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 12,
  },
  spaceContainerHeader: {
    width: wp(70),
    fontSize: wp(5.5),
  },
  peopleLengthText: {
    marginTop: hp(0.2),
    fontFamily: FONTS.Regular,
    fontWeight: '400',
  },
});
