import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {memo, useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import CustomImage from '../../components/common/CustomImage';
import CustomLoader from '../../components/common/CustomLoader';
import {BackButton, SendSvg} from '../../components/common/CustomSvgItems';
import {TextNormal} from '../../components/common/CustomText';
import CustomTextInput from '../../components/common/CustomTextInput';
import CustomVideo from '../../components/common/CustomVideo';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import {useSentNotificationMutation} from '../../redux/apis';
import {setPostDetails} from '../../redux/reducers/generalSlice';
import {COLORS, FONTS, images} from '../../utils/constants/theme';
import usePost from '../../utils/hooks/usePost';
import useUser from '../../utils/hooks/useUser';
import PostFooter from '../Community/PostFooter';
import CommentItem from './CommentItem';
import PostDetailHeader from './PostDetailHeader';
import PostHeaderComponent from './PostHeaderComponent';

const PostDetails = ({route}) => {
  const {user} = useUser();
  const {general} = useUser();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const flatListRef = useRef(null);

  const postId = route?.params?.postId;
  const spaceName = route?.params?.spaceName;
  const spaceId = route?.params?.spaceId;

  const [loader, setLoader] = useState(true);
  const [myOwnComment, setMyOwnComment] = useState(false);
  const [postData, setPostData] = useState({});
  const [postComments, setPostComments] = useState([]);
  const [like, setLike] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [text, setText] = useState('');

  const memoizedPostData = useMemo(() => {
    return postData;
  }, [postData]);

  const {fetchPostById, handlePostLike, AddComment, fetchUpdatedComments} =
    usePost();
  const [sentNotification] = useSentNotificationMutation();

  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await fetchPostById(postId, spaceName, spaceId);
      if (!res) {
        Alert.alert('Post deleted by owner.');
        navigation.goBack();
      }
      setPostData(res);
      setPostComments(res?.comments);
      setLike(res?.userLiked);
      setLikeCount(res?.data?.likesCount);
      setCommentCount(res?.data?.commentsCount);
      dispatch(
        setPostDetails({
          postId: postId,
          likeCount: res?.data?.likesCount || 0,
          commentCount: res?.data?.commentsCount || 0,
          userLiked: res?.userLiked,
          spaceName: spaceName,
        }),
      );
    } catch (err) {
      console.log({err});
    }
    setLoader(false);
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const onCommentDocumentUpdate = async commentCount => {
    try {
      const res = await fetchUpdatedComments(spaceId, postId, commentCount);
      if (res.data.length > 0) {
        setCommentCount(res.data.length);
        if (
          res.data[res.data.length - 1]?.user?._data?.firebaseUserId ===
            user?.firebaseUserId &&
          res.refreshValue
        ) {
          try {
            flatListRef.current.scrollToIndex({
              animated: true,
              index: res.data.length - 1,
            });
          } catch (err) {
            console.log({err});
          }
        }
        setPostComments(res.data);
      }
    } catch (err) {
      console.log({err});
    }
  };

  useEffect(() => {
    const liveUpdates = firestore()
      .collection(
        `Colleges/${user.college}/spaces/${spaceId}/posts/${postId}/comments`,
      )
      .onSnapshot(querySnapshot => {
        onCommentDocumentUpdate(commentCount);
      });

    return () => liveUpdates();
  }, [commentCount]);

  const [likeLoader, setLikeLoader] = useState(false);
  const handleLike = async () => {
    setLikeLoader(true);
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
    try {
      const res = await handlePostLike(
        spaceName,
        postId,
        like,
        postData?.user?._data?.firebaseUserId,
        spaceId,
      );
    } catch (err) {
      console.log({err});
    }
  };

  const [commentLoader, setCommentLoader] = useState(false);

  const OnSendComment = async () => {
    try {
      if (text === '') return;
      const comment = text;
      setText('');
      setCommentLoader(true);
      const res = await AddComment(
        spaceName,
        postId,
        comment,
        postData?.user?._data?.firebaseUserId,
        spaceId,
      );
      sentNotification({
        userId: user?.firebaseUserId,
        postId: postId,
        spaceName: spaceName,
        type: 'comment',
        comment: comment,
        spaceId: spaceId,
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

  useEffect(() => {
    if (isKeyboardVisible) {
      setTimeout(() => {
        try {
          flatListRef.current.scrollToEnd({animated: true});
        } catch (err) {
          console.log({err});
        }
      }, 100);
    }
  }, [isKeyboardVisible]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const {top} = useSafeAreaInsets();

  //For Playing Video
  const [visibleIndex, setVisibleIndex] = useState(-1);

  // Viewability configuration
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 300, // Adjust this threshold as needed
  }).current;

  // Callback when items become viewable or unviewable
  const onViewableItemsChanged = useRef(({viewableItems}) => {
    try {
      if (viewableItems.length === 0) return;
      setVisibleIndex(viewableItems[0]?.index || 0);
    } catch (e) {
      console.log({e});
    }
  }).current;

  return loader ? (
    <CustomLoader />
  ) : (
    <CustomWrapper
      containerStyle={{
        backgroundColor: COLORS.white,
        paddingHorizontal: wp(0),
      }}>
      <TouchableOpacity
        style={[styles.backButton, {top: top}]}
        onPress={() => navigation.goBack()}
        activeOpacity={1}>
        <BackButton containerStyle={{marginLeft: wp(-0.8)}} />
      </TouchableOpacity>
      <FlatList
        ref={flatListRef}
        data={[{commentId: 'borderLine'}, ...postComments]}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View
            style={
              item?.commentId === 'borderLine'
                ? {
                    backgroundColor: COLORS.white,
                    marginBottom: hp(2),
                  }
                : {paddingHorizontal: wp(4)}
            }
            key={item?.commentId}>
            {item?.commentId === 'borderLine' ? (
              <View style={styles.borderLine} />
            ) : (
              <CommentItem
                photo={item?.user?._data?.photo}
                fullName={`${item?.user?._data?.firstName} ${item?.user?._data?.lastName}`}
                timeInSeconds={item.createdAt?._seconds}
                text={item?.text}
                userOwnComment={
                  item?.user?._data?.firebaseUserId === user?.firebaseUserId
                }
                uid={item?.user?._data?.firebaseUserId}
                data={item}
                userLiked={item?.userLiked}
              />
            )}
          </View>
        )}
        ListFooterComponent={() => (
          <View
            style={[
              isKeyboardVisible
                ? {marginBottom: hp(49)}
                : {marginBottom: hp(12)},
            ]}></View>
        )}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: hp(10),
            }}
            key={'header'}>
            {loader ? (
              <ActivityIndicator color={COLORS.grey} size="large" />
            ) : (
              <TextNormal textStyle={styles.noDataFound}>
                Nothing, Yet.
              </TextNormal>
            )}
          </View>
        )}
        ListHeaderComponent={
          <PostHeaderComponent
            key={postData?.data?.postId}
            postData={memoizedPostData}
            handleLike={handleLike}
            like={like}
            likeCount={likeCount}
            commentCount={commentCount}
            likeLoader={likeLoader}
            activeIndex={visibleIndex}
          />
        }
        stickyHeaderIndices={[1]}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({
          ios: () => hp(1.5),
        })()}
        style={styles.footer}>
        <View style={styles.footerTextInputContainer}>
          <CustomTextInput
            containerStyle={styles.textInput}
            textInputStyle={{paddingHorizontal: wp(2)}}
            onChange={txt => setText(txt)}
            value={text}
            autoCapitalize="sentences"
            autoCorrect={true}
            spellCheck={true}
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

export default memo(PostDetails);

const styles = StyleSheet.create({
  borderLine: {
    paddingBottom: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: '#DADADA',
    // marginBottom: hp(2),
    marginTop: hp(1),
    marginHorizontal: wp(4),
  },

  footerTextInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundColor,
    height: hp(5),
    width: wp(90),
    borderRadius: 100,
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
  },
  textInput: {width: wp(74), backgroundColor: 'transparent'},
  footer: {
    borderTopWidth: 1,
    borderColor: COLORS.grey,
    marginHorizontal: wp(-4),
    width: wp(100),
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
  backButton: {
    alignItems: 'center',
    borderColor: '#C9C9C9',
    borderWidth: 1,
    height: wp(14),
    aspectRatio: 1,
    borderRadius: hp(10),
    justifyContent: 'center',
    position: 'absolute',
    left: wp(4),
    backgroundColor: COLORS.white,
    zIndex: 111111,
  },
});
