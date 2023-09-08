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

const CommentItem = ({photo, text, timeInSeconds, fullName}) => {
  return (
    <View style={styles.specificCommentContainer}>
      <View style={styles.imageContainer}>
        <CustomImage
          source={{uri: photo}}
          containerStyle={styles.innerImageContainer}
          resizeMode="cover"
        />
      </View>
      <View style={styles.commentDataCoontainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextNormal bold textStyle={styles.name}>
            {fullName}
          </TextNormal>
          <TextNormal textStyle={styles.time}>
            {getAgoTimeFullString(timeInSeconds)}
          </TextNormal>
        </View>
        <TextNormal textStyle={styles.commentTextStyle}>{text}</TextNormal>
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
    height: hp(6.5),
    aspectRatio: 1,
    borderRadius: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentDataCoontainer: {
    backgroundColor: '#EEEEEE',
    flex: 1,
    paddingTop: hp(2),
    paddingBottom: hp(1.5),
    paddingHorizontal: wp(3),
    borderRadius: 10,
    marginLeft: wp(2),
  },
  name: {
    fontSize: wp(4.2),
  },
  time: {
    fontSize: wp(3.5),
    color: '#9C9CA3',
    fontWeight: '400',
  },
  commentTextStyle: {
    marginTop: hp(0.5),
    fontSize: hp(1.75),
    color: '#000000',
  },
});
