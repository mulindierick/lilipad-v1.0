import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomImage from '../../components/common/CustomImage';
import {TextNormal} from '../../components/common/CustomText';
import CustomTextInput from '../../components/common/CustomTextInput';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import {COLORS, FONTS, images} from '../../utils/constants/theme';
import usePost from '../../utils/hooks/usePost';
import PostFooter from '../Community/PostFooter';
import CommentItem from './CommentItem';
import PostDetailHeader from './PostDetailHeader';
import {KeyboardAvoidingView} from 'react-native';
import useUser from '../../utils/hooks/useUser';
import {SendSvg} from '../../components/common/CustomSvgItems';
import firestore from '@react-native-firebase/firestore';
import {set} from 'react-hook-form';
import CustomLoader from '../../components/common/CustomLoader';
import {useDispatch} from 'react-redux';
import {
  setLikeCountAnduserLiked,
  setPostCommentCount,
  setPostDetails,
} from '../../redux/reducers/generalSlice';
import {useNavigation} from '@react-navigation/native';
import {useSentNotificationMutation} from '../../redux/apis';
import CustomVideo from '../../components/common/CustomVideo';

const PostDetails = ({route}) => {
  const {user} = useUser();
  const {general} = useUser();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const postId = route?.params?.postId;
  const spaceName = route?.params?.spaceName;
  const [loader, setLoader] = useState(true);
  const [postData, setPostData] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [like, setLike] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [text, setText] = useState('');

  const {fetchPostById, handlePostLike, AddComment, fetchUpdatedComments} =
    usePost();
  const [sentNotification] = useSentNotificationMutation();

  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await fetchPostById(postId, spaceName);
      setPostData(res);
      setPostComments(res?.comments);
      setLike(res?.userLiked);
      setLikeCount(res?.data?.likesCount);
      setCommentCount(res?.data?.commentsCount);
      dispatch(
        setPostDetails({
          postId: postId,
          likeCount: res?.data?.likesCount,
          commentCount: res?.data?.commentsCount,
          userLiked: res?.userLiked,
          spaceName: spaceName,
        }),
      );
      console.log({res});
    } catch (err) {
      console.log({err});
    }
    setLoader(false);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const onCommentDocumentUpdate = async () => {
    try {
      const res = await fetchUpdatedComments(spaceName, postId);
      if (res.length > 0) {
        setCommentCount(res.length);
        setPostComments(res);
      }
    } catch (err) {
      console.log({err});
    }
  };

  useEffect(() => {
    const liveUpdates = firestore()
      .collection(`spaces/${spaceName}/posts/${postId}/comments`)
      .onSnapshot(querySnapshot => {
        onCommentDocumentUpdate();
      });
  }, []);

  const [likeLoader, setLikeLoader] = useState(false);
  const handleLike = async () => {
    setLikeLoader(true);
    try {
      const res = await handlePostLike(spaceName, postId, like);
    } catch (err) {
      console.log({err});
    }
    dispatch(
      setPostDetails({
        postId: postId,
        likeCount: like ? likeCount - 1 : likeCount + 1,
        commentCount: commentCount,
        userLiked: !like,
        spaceName: spaceName,
      }),
    );
    like ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1);
    setLike(!like);
    setLikeLoader(false);
  };

  const [commentLoader, setCommentLoader] = useState(false);
  console.log({commentLoader});
  const OnSendComment = async () => {
    try {
      if (text === '') return;
      const comment = text;
      setText('');
      setCommentLoader(true);
      const res = await AddComment(spaceName, postId, comment);
      sentNotification({
        userId: user?.firebaseUserId,
        postId: postId,
        spaceName: spaceName,
        type: 'comment',
        comment: comment,
      });
      dispatch(
        setPostDetails({
          postId: postId,
          likeCount: likeCount,
          commentCount: commentCount + 1,
          userLiked: like,
          spaceName: spaceName,
        }),
      );
      console.log('HELLO');
    } catch (err) {
      console.log({err});
    }
    setCommentLoader(false);
    console.log('HEREEEE ===> CHECK');
  };

  // FOr Handling Keyboard
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  return loader ? (
    <CustomLoader />
  ) : (
    <CustomWrapper containerStyle={{backgroundColor: COLORS.white}}>
      <PostDetailHeader
        photo={postData?.user?._data?.photo}
        FullName={`${postData?.user?._data?.firstName} ${postData?.user?._data?.lastName}`}
        timeInSeconds={postData?.data?.createdAt?._seconds}
        onBackPress={() => handleBackPress()}
        uid={postData?.user?._data?.firebaseUserId}
      />
      <FlatList
        data={postComments}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <CommentItem
            photo={item?.user?._data?.photo}
            fullName={`${item?.user?._data?.firstName} ${item?.user?._data?.lastName}`}
            timeInSeconds={item.createdAt?._seconds}
            text={item?.text}
            userOwnComment={
              item?.user?._data?.firebaseUserId === user?.firebaseUserId
            }
          />
        )}
        ListFooterComponent={() => (
          <View
            style={[
              isKeyboardVisible
                ? {marginBottom: hp(50)}
                : {marginBottom: hp(10)},
            ]}></View>
        )}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: hp(10),
            }}>
            {loader ? (
              <ActivityIndicator color={COLORS.grey} size="large" />
            ) : (
              <TextNormal textStyle={styles.noDataFound}>
                Nothing, Yet.
              </TextNormal>
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={styles.borderLine}>
            <View style={{paddingHorizontal: wp(5)}}>
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
                      borderRadius: 6,
                      marginTop: hp(1.5),
                    }}
                  />
                </TouchableOpacity>
              )}

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
                loader={likeLoader}
              />
            </View>
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
          <CustomTextInput
            containerStyle={styles.textInput}
            onChange={txt => setText(txt)}
            value={text}
            autoCapitalize="sentences"
            textInputStyle={{paddingHorizontal: wp(2)}}
          />
          <TouchableOpacity
            onPress={() => OnSendComment()}
            disabled={commentLoader}>
            <SendSvg />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.footerBack}></View>
    </CustomWrapper>
  );
};

export default PostDetails;

const styles = StyleSheet.create({
  postText: {
    marginTop: hp(2),
    marginRight: wp(12),
  },
  postTextStyle: {
    fontSize: wp(4.3),
    color: '#151313',
  },
  borderLine: {
    paddingBottom: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: '#DADADA',
    marginBottom: hp(2),
  },

  footerTextInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(3),
    backgroundColor: COLORS.backgroundColor,
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
    backgroundColor: COLORS.white,
    zIndex: 1,
  },
  noDataFound: {
    color: '#747474',
    fontFamily: FONTS.LightItalic,
    fontWeight: '400',
  },
  footerBack: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: hp(0),
    backgroundColor: COLORS.white,
    height: hp(5),
    width: wp(100),
  },
});
