import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import PostDetailHeader from './PostDetailHeader';
import {TextNormal} from '../../components/common/CustomText';
import CustomVideo from '../../components/common/CustomVideo';
import CustomImage from '../../components/common/CustomImage';
import PostFooter from '../Community/PostFooter';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS} from '../../utils/constants/theme';

const PostHeaderComponent = ({
  postData,
  handleLike,
  likeCount,
  commentCount,
  likeLoader,
  like,
}) => {
  return (
    <>
      <PostDetailHeader
        photo={postData?.user?._data?.photo}
        FullName={`${postData?.user?._data?.firstName} ${postData?.user?._data?.lastName}`}
        timeInSeconds={postData?.data?.createdAt?._seconds}
        onBackPress={() => handleBackPress()}
        uid={postData?.user?._data?.firebaseUserId}
      />
      <View style={{paddingHorizontal: wp(0)}}>
        <View style={styles.postText}>
          <TextNormal textStyle={styles.postTextStyle}>
            {postData?.data?.text}
          </TextNormal>
        </View>

        {postData?.data?.postVideo && (
          <TouchableOpacity activeOpacity={1}>
            <CustomVideo
              uri={postData?.data?.postVideo}
              containerStyle={{
                height: hp(30),
                width: '100%',
                marginTop: hp(1.5),
              }}
            />
          </TouchableOpacity>
        )}

        {postData?.data?.postPhoto && (
          <CustomImage
            source={{uri: postData?.data?.postPhoto}}
            height={hp(30)}
            width={'100%'}
            resizeMode="cover"
            containerStyle={{marginTop: hp(1.5)}}
          />
        )}
        <View style={{paddingHorizontal: wp(5)}}>
          <PostFooter
            likeCount={likeCount}
            commentCount={commentCount}
            userLiked={like}
            onPressLike={() => handleLike()}
            loader={likeLoader}
          />
        </View>
      </View>
    </>
  );
};

export default memo(PostHeaderComponent);

const styles = StyleSheet.create({
  postText: {
    marginTop: hp(2),
    paddingHorizontal: wp(5),
  },
  postTextStyle: {
    fontSize: wp(4.3),
    color: '#151313',
  },
});