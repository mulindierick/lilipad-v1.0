import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomIcon from '../../components/common/CustomIcon';
import {TextNormal} from '../../components/common/CustomText';
import {COLORS, svg} from '../../utils/constants/theme';
import CustomImage from '../../components/common/CustomImage';
import {CommentSvg, LikeSvg} from '../../components/common/CustomSvgItems';

const PostFooter = ({
  likeCount,
  commentCount,
  userLiked,
  onPressLike,
  onPressComment,
  loader,
}) => {
  return (
    <View style={styles.postFooter}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={onPressLike}>
          <LikeSvg />
        </TouchableOpacity>
        <TextNormal
          textStyle={{
            fontSize: wp(3.9),
            marginLeft: 5,
            fontWeight: '400',
            color: 'rgba(87, 87, 87, 0.83)',
          }}>
          {likeCount} likes
        </TextNormal>
      </View>
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
            color: 'rgba(87, 87, 87, 0.83)',
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
