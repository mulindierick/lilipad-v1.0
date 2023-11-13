import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useState} from 'react';
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
import usePost from '../../utils/hooks/usePost';
import {LikeSvg, UnlikeSvg} from '../../components/common/CustomSvgItems';

const CommentItem = ({
  photo,
  text,
  timeInSeconds,
  fullName,
  userOwnComment,
  uid,
  data, // for comment Like functionality
  userLiked,
}) => {
  const navigation = useNavigation();
  const {user} = useUser();
  const {commentLikes} = usePost();
  const [like, setLike] = useState(userLiked);
  const [commentLikesCount, setCommentLikesCount] = useState(
    data?.likesCount || 0,
  );

  console.log({data});

  const handleNavigation = () => {
    if (user?.firebaseUserId == uid) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('DifferentUserProfile', {uid});
    }
  };

  let lastPress = 0;
  const handlePress = () => {
    try {
      const currentTime = new Date().getTime();
      const delay = 300; // Adjust this value as needed

      if (currentTime - lastPress <= delay) {
        // Double press
        // Add your double press logic here
        const tempUserLike = like;
        setCommentLikesCount(
          tempUserLike ? commentLikesCount - 1 : commentLikesCount + 1,
        );
        setLike(!like);

        commentLikes(data, tempUserLike);
        console.log('Double press detected!');
      }

      lastPress = currentTime;
    } catch (err) {
      console.log({err});
    }
  };

  const onSingleClickOfLike = () => {
    try {
      const tempUserLike = like;
      setCommentLikesCount(
        tempUserLike ? commentLikesCount - 1 : commentLikesCount + 1,
      );
      setLike(!like);

      commentLikes(data, tempUserLike);
    } catch (err) {
      console.log({err});
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
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => handlePress()}
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
      </TouchableOpacity>
      {commentLikesCount > 0 ? (
        <TouchableOpacity
          activeOpacity={0}
          style={[
            userOwnComment ? styles.userOwnCommentLikes : styles.commentLikes,
          ]}
          onPress={() => onSingleClickOfLike()}>
          {like ? (
            <LikeSvg containerStyle={{height: wp(3.5), width: wp(3.5)}} />
          ) : (
            <UnlikeSvg containerStyle={{height: wp(3.5), width: wp(3.5)}} />
          )}
          <TextNormal textStyle={styles.likesText}>
            {commentLikesCount}
          </TextNormal>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default memo(CommentItem);

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
  commentLikes: {
    position: 'absolute',
    right: wp(5),
    bottom: -13,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    borderRadius: hp(50),
    borderWidth: 0.2,
    borderColor: '#CCCCCC',
  },
  likesText: {
    fontSize: wp(3.5),
    marginLeft: wp(1.5),
    color: '#9C9CA3',
  },
  userOwnCommentLikes: {
    position: 'absolute',
    left: wp(18),
    bottom: -13,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    borderRadius: hp(50),
    borderWidth: 0.2,
    borderColor: '#CCCCCC',
  },
});
