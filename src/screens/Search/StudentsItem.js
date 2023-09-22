import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomImage from '../../components/common/CustomImage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS, images} from '../../utils/constants/theme';
import {TextBig} from '../../components/common/CustomText';

const StudentsItem = ({item}) => {
  return (
    <View style={styles.spaceContainer}>
      <View style={styles.imageContainer}>
        <CustomImage
          resizeMode="cover"
          source={
            item?.photo
              ? {
                  uri: item.photo,
                }
              : images.dummyProfilePic
          }
          containerStyle={styles.image}
        />
      </View>
      <TextBig textStyle={styles.Text}>{item?.fullName}</TextBig>
    </View>
  );
};

export default StudentsItem;

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
  image: {
    height: hp(7),
    aspectRatio: 1,
    borderRadius: hp(10),
  },
  imageContainer: {height: hp(7), aspectRatio: 1, borderRadius: wp(7)},
  Text: {
    marginLeft: wp(4),
    fontSize: wp(7),
  },
});
