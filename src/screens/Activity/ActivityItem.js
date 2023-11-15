import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomImage from '../../components/common/CustomImage';
import {TextNormal} from '../../components/common/CustomText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/constants/theme';
import {getAgoTimeFullString} from '../../utils/constants/helper';
import {useNavigation} from '@react-navigation/native';

const ActivityItem = ({item}) => {
  const navigation = useNavigation();
  const [height, setHeight] = useState(0);

  return (
    <TouchableOpacity
      onLayout={event => {
        var {x, y, width, height} = event.nativeEvent.layout;
        setHeight(height);
      }}
      style={[styles.container, height > 80 && {alignItems: 'flex-start'}]}
      onPress={() =>
        navigation.navigate('PostDetails', {
          postId: item?.postId,
          spaceId: item?.spaceId,
          spaceName: item?.spaceName,
        })
      }>
      <View style={styles.imageContainer}>
        <CustomImage
          source={{uri: item?.lastUserDetail?._data?.photo}}
          containerStyle={styles.image}
          resizeMode="cover"
        />
      </View>
      {item?.type == 'like' ? (
        item?.users?.length == 2 ? (
          <TextNormal textStyle={[styles.text]}>
            <TextNormal bold textStyle={styles.text}>
              {item?.lastUserDetail?._data?.firstName +
                ' ' +
                item?.lastUserDetail?._data?.lastName}
            </TextNormal>{' '}
            and {item?.users?.length - 1} other liked your post.
          </TextNormal>
        ) : item?.users?.length > 2 ? (
          <TextNormal textStyle={styles.text}>
            <TextNormal bold textStyle={styles.text}>
              {item?.lastUserDetail?._data?.firstName +
                ' ' +
                item?.lastUserDetail?._data?.lastName}
            </TextNormal>{' '}
            and {item.users.length - 1} others liked your post.
          </TextNormal>
        ) : (
          <TextNormal textStyle={styles.text}>
            <TextNormal bold textStyle={styles.text}>
              {item?.lastUserDetail?._data?.firstName +
                ' ' +
                item?.lastUserDetail?._data?.lastName}
            </TextNormal>{' '}
            liked your post.
          </TextNormal>
        )
      ) : item?.type == 'commentLike' ? (
        item?.users?.length == 2 ? (
          <TextNormal textStyle={[styles.text]}>
            <TextNormal bold textStyle={styles.text}>
              {item?.lastUserDetail?._data?.firstName +
                ' ' +
                item?.lastUserDetail?._data?.lastName}
            </TextNormal>{' '}
            and {item?.users?.length - 1} other liked your reply:{' '}
            {`"${item.commentText}"`}.
          </TextNormal>
        ) : item?.users?.length > 2 ? (
          <TextNormal textStyle={styles.text}>
            <TextNormal bold textStyle={styles.text}>
              {item?.lastUserDetail?._data?.firstName +
                ' ' +
                item?.lastUserDetail?._data?.lastName}
            </TextNormal>{' '}
            and {item.users.length - 1} others liked your reply:{' '}
            {`"${item.commentText}"`}.
          </TextNormal>
        ) : (
          <TextNormal textStyle={styles.text}>
            <TextNormal bold textStyle={styles.text}>
              {item?.lastUserDetail?._data?.firstName +
                ' ' +
                item?.lastUserDetail?._data?.lastName}
            </TextNormal>{' '}
            liked your reply: {`"${item.commentText}"`}.
          </TextNormal>
        )
      ) : item?.users?.length == 2 ? (
        <TextNormal textStyle={styles.text}>
          <TextNormal bold textStyle={styles.text}>
            {item?.lastUserDetail?._data?.firstName +
              ' ' +
              item?.lastUserDetail?._data?.lastName}
          </TextNormal>{' '}
          and {item?.users?.length - 1} other replied to your post.
        </TextNormal>
      ) : item?.users?.length > 2 ? (
        <TextNormal textStyle={styles.text}>
          <TextNormal bold textStyle={styles.text}>
            {item?.lastUserDetail?._data?.firstName +
              ' ' +
              item?.lastUserDetail?._data?.lastName}
          </TextNormal>{' '}
          and {item?.users?.length - 1} others replied to your post.
        </TextNormal>
      ) : (
        <TextNormal textStyle={styles.text}>
          <TextNormal bold textStyle={styles.text}>
            {item?.lastUserDetail?._data?.firstName +
              ' ' +
              item?.lastUserDetail?._data?.lastName}
          </TextNormal>{' '}
          replied to your post.
        </TextNormal>
      )}
      {item?.newActivity && <View style={styles.blueDot} />}
    </TouchableOpacity>
  );
};

export default ActivityItem;

const styles = StyleSheet.create({
  text: {
    marginLeft: wp(1.5),
    fontSize: wp(4.5),
    width: wp(65),
    paddingLeft: wp(2),
  },
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.5),
    borderRadius: 7,
    borderColor: '#CACACA',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 0.05,
    shadowRadius: 0.05,
    backgroundColor: COLORS.white,
    borderWidth: 0.15,
  },
  image: {
    height: wp(5),
    aspectRatio: 1,
    borderRadius: wp(100),
  },
  imageContainer: {
    height: wp(13),
    aspectRatio: 1,
    borderRadius: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  blueDot: {
    position: 'absolute',
    width: wp(2.5),
    aspectRatio: 1,
    backgroundColor: COLORS.blue,
    borderRadius: wp(100),
    right: wp(2.5),
    alignSelf: 'center',
  },
  time: {
    position: 'absolute',
    right: wp(2.5),
    fontSize: wp(2.5),
    color: COLORS.grey,
    bottom: hp(0.2),
    fontWeight: '500',
  },
});
