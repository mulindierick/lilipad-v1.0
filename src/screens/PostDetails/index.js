import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomImage from '../../components/common/CustomImage';
import {TextNormal} from '../../components/common/CustomText';
import CustomTextInput from '../../components/common/CustomTextInput';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import {COLORS, images} from '../../utils/constants/theme';
import usePost from '../../utils/hooks/usePost';
import PostFooter from '../Community/PostFooter';
import CommentItem from './CommentItem';
import PostDetailHeader from './PostDetailHeader';
import {KeyboardAvoidingView} from 'react-native';

const PostDetails = ({route}) => {
  const postId = route?.params?.postId;
  const spaceName = route?.params?.spaceName;
  const [loader, setLoader] = useState(true);
  const [postData, setPostData] = useState({});
  const [like, setLike] = useState(true);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const {handlePostLike} = usePost();

  const {fetchPostById} = usePost();

  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await fetchPostById(postId, spaceName);
      setPostData(res);
      setLike(res?.userLiked);
      setLikeCount(res?.data?.likesCount);
      setCommentCount(res?.data?.commentsCount);
      console.log({res});
    } catch (err) {
      console.log({err});
    }
    setLoader(false);
  };

  useEffect(() => {
    fetchPost();
  }, []);

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
    <CustomWrapper>
      <PostDetailHeader
        photo={postData?.user?._data?.photo}
        FullName={`${postData?.user?._data?.firstName} ${postData?.user?._data?.lastName}`}
        timeInSeconds={postData?.data?.createdAt?._seconds}
      />
      <FlatList
        data={[1, 2, 3]}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <CommentItem
            photo={postData?.user?._data?.photo}
            fullName={`${postData?.user?._data?.firstName} ${postData?.user?._data?.lastName}`}
            timeInSeconds={postData?.data?.createdAt?._seconds}
            text={'JUST CHECKING'}
          />
        )}
        ListHeaderComponent={() => (
          <View style={styles.borderLine}>
            <View style={styles.postText}>
              <TextNormal textStyle={styles.postTextStyle}>
                {postData?.data?.text}
              </TextNormal>
            </View>
            {postData?.data?.postPhoto && (
              <CustomImage
                source={{uri: postData?.data?.postPhoto}}
                height={hp(25)}
                width={'100%'}
                resizeMode="cover"
                containerStyle={{borderRadius: 10, marginTop: hp(1.5)}}
              />
            )}
            <PostFooter
              likeCount={likeCount}
              commentCount={commentCount}
              userLiked={like}
              onPressLike={() => handleLike()}
              loader={loader}
            />
          </View>
        )}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({
          ios: () => hp(1.5),
        })()}
        style={styles.footer}>
        <CustomImage
          source={images.plus}
          width={wp(8)}
          height={hp(4)}
          resizeMode="contain"
        />
        <View style={styles.footerTextInputContainer}>
          <CustomTextInput containerStyle={styles.textInput} />
          <CustomImage
            source={images.send}
            width={wp(7)}
            height={hp(3)}
            resizeMode="contain"
          />
        </View>
      </KeyboardAvoidingView>
    </CustomWrapper>
  );
};

export default PostDetails;

const styles = StyleSheet.create({
  postText: {
    marginTop: hp(1.5),
    marginRight: wp(12),
  },
  postTextStyle: {
    fontSize: hp(1.75),
    color: '#151313',
  },
  borderLine: {
    paddingBottom: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: '#DADADA',
    marginBottom: hp(2),
  },
  //   footer: {
  //     borderTopWidth: 1,
  //     borderColor: COLORS.grey,
  //     marginHorizontal: wp(-4),
  //     alignItems: 'center',
  //     paddingHorizontal: wp(4),
  //     flexDirection: 'row',
  //     paddingTop: hp(1),
  //     alignSelf: 'center',
  //   },
  footerTextInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(3),
    backgroundColor: '#F6F6F6',
    height: hp(5),
    width: wp(78),
    borderRadius: 100,
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
  },
  textInput: {width: wp(60), backgroundColor: 'transparent'},
  footer: {
    borderTopWidth: 1,
    borderColor: COLORS.grey,
    marginHorizontal: wp(-4),
    alignItems: 'center',
    paddingHorizontal: wp(4),
    flexDirection: 'row',
    paddingTop: hp(1),
    alignSelf: 'center',
    position: 'absolute',
    bottom: hp(4),
    backgroundColor: COLORS.backgroundColor,
  },
});
