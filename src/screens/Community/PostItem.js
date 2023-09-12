import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
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
import usePost from '../../utils/hooks/usePost';
import {set} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';

const PostItem = ({data}) => {
  const user = data?.user?._data;
  const [like, setLike] = useState(data?.userLiked);
  const [likeCount, setLikeCount] = useState(data?.likesCount);
  const [commentCount, setCommentCount] = useState(data?.commentsCount);
  const [loader, setLoader] = useState(false);
  const {handlePostLike} = usePost();
  const navigation = useNavigation();

  const handleLike = async () => {
    setLoader(true);
    try {
      const res = await handlePostLike(data?.spaceName, data?.postId, like);
    } catch (err) {
      console.log({err});
    }
    like ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
    setLike(!like);
    setLoader(false);
  };

  return (
    <TouchableOpacity
      style={styles.postContainer}
      onPress={() =>
        navigation.navigate('PostDetails', {
          postId: data?.postId,
          spaceName: data?.spaceName,
        })
      }>
      <PostHeader
        photo={user?.photo}
        name={user?.firstName + ' ' + user?.lastName}
        time={data?.createdAt}
      />
      {data?.text ? (
        <View style={styles.postText}>
          <TextNormal textStyle={styles.postTextStyle}>{data?.text}</TextNormal>
        </View>
      ) : null}
      {data?.postPhoto && (
        <CustomImage
          source={{uri: data?.postPhoto}}
          height={hp(25)}
          width={'100%'}
          resizeMode="cover"
          containerStyle={{borderRadius: 10, marginTop: hp(1.5)}}
        />
      )}
      <PostFooter
        likeCount={likeCount}
        commentCount={commentCount}
        userLiked={data?.userLiked}
        onPressLike={() => handleLike()}
        loader={loader}
      />
    </TouchableOpacity>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  postContainer: {
    marginHorizontal: wp(0.5),
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    marginBottom: hp(1),
    borderRadius: 10,
    backgroundColor: COLORS.white,
    shadowColor: '#000000',
    borderWidth: 0.1,
    borderColor: '#CCCCCC',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
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
    marginRight: wp(5),
  },
  postTextStyle: {
    fontSize: hp(1.75),
    color: '#151313',
  },
});
