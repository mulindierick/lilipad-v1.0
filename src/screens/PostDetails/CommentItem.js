import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS} from '../../utils/constants/theme';
import CustomImage from '../../components/common/CustomImage';
import {TextNormal} from '../../components/common/CustomText';
import {getAgoTimeFullString} from '../../utils/constants/helper';
import {useNavigation} from '@react-navigation/native';
import useUser from '../../utils/hooks/useUser';

const CommentItem = ({
  photo,
  text,
  timeInSeconds,
  fullName,
  userOwnComment,
  uid,
}) => {
  const navigation = useNavigation();
  const {user} = useUser();

  const handleNavigation = () => {
    if (user?.firebaseUserId == uid) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('DifferentUserProfile', {uid});
    }
  };
  return (
    <View
      style={[
        styles.specificCommentContainer,
        userOwnComment && {flexDirection: 'row-reverse'},
      ]}>
      <View style={styles.imageContainer}>
        <CustomImage
          source={{uri: photo}}
          containerStyle={styles.innerImageContainer}
          resizeMode="cover"
          onPressImage={() => handleNavigation()}
        />
      </View>
      <View
        style={[
          styles.commentDataCoontainer,
          userOwnComment && {marginRight: wp(2), backgroundColor: COLORS.blue},
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextNormal
            bold
            textStyle={styles.name}
            numberOfLines={1}
            color={userOwnComment && COLORS.white}
            onPress={() => handleNavigation()}>
            {fullName}
          </TextNormal>
          <TextNormal
            textStyle={[styles.time, userOwnComment && {color: COLORS.white}]}>
            {getAgoTimeFullString(timeInSeconds) || 'just now'}
          </TextNormal>
        </View>
        <TextNormal
          textStyle={styles.commentTextStyle}
          color={userOwnComment && COLORS.white}>
          {text}
        </TextNormal>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  specificCommentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: hp(2),
  },
  innerImageContainer: {
    height: hp(10),
    aspectRatio: 1,
    borderRadius: hp(10),
  },
  imageContainer: {
    height: hp(5),
    aspectRatio: 1,
    borderRadius: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentDataCoontainer: {
    backgroundColor: '#EEEEEE',
    flex: 1,
    paddingTop: hp(1),
    paddingBottom: hp(1.5),
    paddingHorizontal: wp(3),
    borderRadius: 10,
    marginLeft: wp(2),
  },
  name: {
    fontSize: wp(4.2),
    width: wp(45),
  },
  time: {
    fontSize: wp(3.3),
    color: '#9C9CA3',
    fontWeight: '400',
    marginRight: wp(1.5),
  },
  commentTextStyle: {
    marginTop: hp(0.8),
    fontSize: wp(4.3),
  },
});
