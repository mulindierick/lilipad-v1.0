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

const StudentsItem = ({item}) => {
  const {user} = useUser();
  const navigation = useNavigation();

  const handleNavigation = () => {
    console.log({user, item});
    if (user?.firebaseUserId == item?.firebaseUserId) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('DifferentUserProfile', {uid: item?.firebaseUserId});
    }
  };

  return (
    <TouchableOpacity
      style={[styles.spaceContainer]}
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
        <TextNormal color={'#595959'} textStyle={{fontSize: wp(3.6)}}>
          {item?.classYear + ' | ' + item?.major}
        </TextNormal>
      </View>
    </TouchableOpacity>
  );
};

export default StudentsItem;

const styles = StyleSheet.create({
  spaceContainer: {
    borderRadius: 10,
    paddingLeft: wp(6),
    paddingRight: wp(9),
    paddingVertical: hp(0.99),
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.15,
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
  imageContainer: {
    height: wp(13.8),
    aspectRatio: 1,
    borderRadius: wp(7),
  },
  Text: {
    fontSize: wp(5.8),
  },
});
