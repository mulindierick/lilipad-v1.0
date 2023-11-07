import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomImage from '../../components/common/CustomImage';
import {TextNormal} from '../../components/common/CustomText';
import {COLORS} from '../../utils/constants/theme';
import usePost from '../../utils/hooks/usePost';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';
import useUser from '../../utils/hooks/useUser';
import {useDispatch} from 'react-redux';
import {setPostDetails, setPostId} from '../../redux/reducers/generalSlice';
import Video from 'react-native-video';
import CustomVideo from '../../components/common/CustomVideo';

const PostItem = ({
  data,
  disabledProfileClick = false,
  index,
  afterEditingPost,
}) => {
  const {general} = useUser();
  const user = data?.user?._data;
  const [like, setLike] = useState(data?.userLiked);
  const [likeCount, setLikeCount] = useState(data?.likesCount);
  const [commentCount, setCommentCount] = useState(data?.commentsCount);
  const [showFullText, setShowFullText] = useState(false);
  const [loader, setLoader] = useState(false);
  const {handlePostLike} = usePost();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLike = async () => {
    setLoader(true);
    let userLike = general?.postId == data?.postId ? general?.userLiked : like;
    setCommentCount(
      general?.postId == data?.postId ? general?.commentCount : commentCount,
    );
    let count =
      general?.postId == data?.postId ? general?.likeCount : likeCount;
    dispatch(
      setPostDetails({
        postId: data?.postId,
        likeCount: userLike ? count - 1 : count + 1,
        userLiked: !userLike,
        commentCount: commentCount,
        spaceName: data?.spaceName,
      }),
    );
    userLike ? setLikeCount(count - 1) : setLikeCount(count + 1);
    setLike(!userLike);
    setLoader(false);
    try {
      const res = await handlePostLike(
        data?.spaceName,
        data?.postId,
        userLike,
        data?.createdBy,
        data?.spaceId,
      );
    } catch (err) {
      console.log({err});
    }
  };

  useEffect(() => {
    if (general?.postId == data?.postId) {
      setLike(general?.userLiked);
      setLikeCount(general?.likeCount);
      setCommentCount(general?.commentCount);
      dispatch(
        setPostDetails({
          postId: null,
          likeCount: null,
          userLiked: null,
          commentCount: null,
          spaceName: null,
        }),
      );
    }
  }, [general?.postId == data?.postId]);

  return (
    <TouchableOpacity
      style={[
        styles.postContainer,
        index != 0 && {borderTopWidth: 0.4, borderTopColor: '#CCCCCC'},
      ]}
      onPress={() =>
        navigation.navigate('PostDetails', {
          postId: data?.postId,
          spaceId: data?.spaceId,
          spaceName: data?.spaceName,
        })
      }
      activeOpacity={1}>
      <PostHeader
        photo={user?.photo}
        name={user?.firstName + ' ' + user?.lastName}
        time={data?.createdAt}
        uid={user?.firebaseUserId}
        disabledProfileClick={disabledProfileClick}
        userFirstName={user?.firstName}
        data={data}
        afterEditingPost={afterEditingPost}
      />
      {data?.text && (
        <View style={styles.postText}>
          <TextNormal textStyle={styles.postTextStyle}>
            {showFullText
              ? data?.text
              : data?.text.length > 300
              ? data?.text.slice(0, 300) + '...'
              : data?.text}
          </TextNormal>
          {data?.text.length > 300 && (
            <TouchableOpacity onPress={() => setShowFullText(!showFullText)}>
              <TextNormal textStyle={{color: COLORS.blue}}>
                {showFullText ? 'See Less' : 'See More'}
              </TextNormal>
            </TouchableOpacity>
          )}
        </View>
      )}
      {data?.postPhoto && (
        <CustomImage
          source={{uri: data?.postPhoto}}
          height={hp(35)}
          width={wp(101)}
          resizeMode="cover"
          containerStyle={{
            marginTop: hp(1.5),
            marginHorizontal: wp(-5),
          }}
          disabled
        />
      )}
      {data?.postVideo && (
        <TouchableOpacity activeOpacity={1}>
          <CustomVideo
            uri={data?.postVideo}
            containerStyle={{
              height: hp(30),
              width: wp(101),
              marginTop: hp(1.5),
              marginHorizontal: wp(-5),
            }}
          />
        </TouchableOpacity>
      )}
      <PostFooter
        likeCount={
          general?.postId == data?.postId ? general?.likeCount : likeCount
        }
        commentCount={
          general?.postId == data?.postId ? general?.commentCount : commentCount
        }
        userLiked={
          general?.postId == data?.postId
            ? general?.userLiked
            : data?.userLiked || like
        }
        onPressLike={() => handleLike()}
        loader={loader}
      />
    </TouchableOpacity>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  postContainer: {
    paddingHorizontal: wp(4.5),
    paddingVertical: wp(4.5),
    // borderRadius: 10,
    backgroundColor: COLORS.white,
    // shadowColor: '#000000',
    // borderWidth: 0.1,
    // borderColor: '#CCCCCC',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 1,
    // elevation: 9,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textTimeAgo: {
    fontSize: wp(3.5),
    color: 'rgba(87, 87, 87, 0.83)',
    fontWeight: '400',
  },
  postText: {
    marginTop: hp(1.5),
    marginRight: wp(5),
  },
  postTextStyle: {
    fontSize: wp(4.3),
    color: '#151313',
  },
});
