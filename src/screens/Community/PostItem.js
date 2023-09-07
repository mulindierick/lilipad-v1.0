import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomImage from '../../components/common/CustomImage';
import {TextNormal} from '../../components/common/CustomText';
import CustomIcon from '../../components/common/CustomIcon';
import {COLORS, images} from '../../utils/constants/theme';
import useUser from '../../utils/hooks/useUser';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';

const PostItem = ({data}) => {
  const user = data?.user?._data;
  return (
    <View style={styles.postContainer}>
      <PostHeader
        photo={user?.photo}
        name={user?.firstName + ' ' + user?.lastName}
        time={data?.createdAt}
      />
      <View style={styles.postText}>
        <TextNormal textStyle={styles.postTextStyle}>{data?.text}</TextNormal>
      </View>
      {data?.postPhoto && (
        <CustomImage
          source={{uri: data?.postPhoto}}
          height={hp(25)}
          width={'100%'}
          resizeMode="cover"
          containerStyle={{borderRadius: 10, marginTop: hp(1.5)}}
        />
      )}
      <PostFooter />
    </View>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  postContainer: {
    marginHorizontal: wp(0.5),
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    marginBottom: hp(1.5),
    borderRadius: 10,
    backgroundColor: COLORS.white,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 9,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textNormal: {
    fontSize: hp(1.9),
    fontWeight: 'bold',
  },
  textTimeAgo: {
    fontSize: hp(1.5),
    color: 'rgba(87, 87, 87, 0.83)',
    fontWeight: '400',
  },
  postText: {
    marginTop: hp(1.5),
    marginRight: wp(12),
  },
  postTextStyle: {
    fontSize: hp(1.75),
    color: '#151313',
  },
});
