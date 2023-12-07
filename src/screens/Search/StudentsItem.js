import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomImage from '../../components/common/CustomImage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS, images} from '../../utils/constants/theme';
import {TextBig, TextNormal} from '../../components/common/CustomText';
import useUser from '../../utils/hooks/useUser';
import {useNavigation} from '@react-navigation/native';

const StudentsItem = ({item, index}) => {
  const {user} = useUser();
  const navigation = useNavigation();

  const handleNavigation = () => {
    if (user?.firebaseUserId == item?.firebaseUserId) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('DifferentUserProfile', {uid: item?.firebaseUserId});
    }
  };

  return (
    <TouchableOpacity
      style={[styles.spaceContainer, index == 0 && {borderTopWidth: 0}]}
      activeOpacity={1}
      key={item?.firebaseUserId}
      onPress={() => handleNavigation(item)}>
      <View style={[styles.imageContainer]}>
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
      <View style={{alignItems: 'flex-start', marginLeft: wp(4)}}>
        <TextBig textStyle={styles.Text}>{item?.fullName}</TextBig>
        <TextNormal
          color={'#595959'}
          textStyle={{fontSize: wp(3.6), paddingRight: wp(10)}}
          numberOfLines={1}>
          {item?.classYear + ' | ' + item?.major}
        </TextNormal>
      </View>
    </TouchableOpacity>
  );
};

export default StudentsItem;

const styles = StyleSheet.create({
  spaceContainer: {
    paddingLeft: wp(6),
    paddingRight: wp(9),
    paddingVertical: hp(0.99),
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.17,
    borderColor: '#CCCCCC',
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
  imageContainer: {
    height: wp(13.8),
    aspectRatio: 1,
    borderRadius: wp(7),
  },
  Text: {
    fontSize: wp(5.8),
  },
});
