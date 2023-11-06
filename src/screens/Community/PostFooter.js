import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  CommentSvg,
  LikeSvg,
  UnlikeSvg,
} from '../../components/common/CustomSvgItems';
import {TextNormal} from '../../components/common/CustomText';

const PostFooter = ({
  likeCount,
  commentCount,
  userLiked,
  onPressLike,
  onPressComment,
  loader,
  commentLoader,
}) => {
  return (
    <View style={styles.postFooter}>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={loader ? null : onPressLike}
        activeOpacity={1}>
        {userLiked ? <LikeSvg /> : <UnlikeSvg />}
        <TextNormal
          textStyle={{
            fontSize: wp(3.9),
            marginLeft: 5,
            fontWeight: '400',
            color: '#747474',
          }}>
          {likeCount} likes
        </TextNormal>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: wp(5),
        }}>
        <CommentSvg />
        <TextNormal
          textStyle={{
            fontSize: wp(3.9),
            marginLeft: 5,
            fontWeight: '400',
            color: '#747474',
          }}>
          {commentCount} replies
        </TextNormal>
      </View>
    </View>
  );
};

export default PostFooter;

const styles = StyleSheet.create({
  postFooter: {
    flexDirection: 'row',
    marginTop: hp(2),
  },
});
