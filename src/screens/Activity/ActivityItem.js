import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomImage from '../../components/common/CustomImage';
import {TextNormal} from '../../components/common/CustomText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/constants/theme';

const ActivityItem = ({item}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <CustomImage
        source={{uri: item?.lastUserDetail?._data?.photo}}
        containerStyle={styles.image}
        resizeMode="cover"
      />
      {item?.type == 'like' ? (
        item?.users?.length > 1 ? (
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
      ) : item?.users?.length > 1 ? (
        <TextNormal textStyle={styles.text}>
          <TextNormal bold textStyle={styles.text}>
            {item?.lastUserDetail?._data?.firstName +
              ' ' +
              item?.lastUserDetail?._data?.lastName}
          </TextNormal>{' '}
          and {item?.users?.length - 1} others replied your post.
        </TextNormal>
      ) : (
        <TextNormal textStyle={styles.text}>
          {' '}
          <TextNormal bold textStyle={styles.text}>
            {item?.lastUserDetail?._data?.firstName +
              ' ' +
              item?.lastUserDetail?._data?.lastName}
          </TextNormal>{' '}
          replied your post.
        </TextNormal>
      )}
    </TouchableOpacity>
  );
};

export default ActivityItem;

const styles = StyleSheet.create({
  text: {
    marginLeft: wp(2),
    fontSize: wp(5),
    width: wp(70),
    paddingLeft: wp(2),
  },
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.5),
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    backgroundColor: COLORS.white,
    borderWidth: 0,
    marginHorizontal: wp(0.5),
    marginVertical: hp(0.5),
  },
  image: {
    height: wp(5),
    aspectRatio: 1,
    borderRadius: wp(100),
  },
});
