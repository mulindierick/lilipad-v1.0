import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  AppState,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import {PlusSVG} from '../../components/common/CustomSvgItems';
import {TextNormal} from '../../components/common/CustomText';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import {MyContext} from '../../context/Context';
import {COLORS, FONTS} from '../../utils/constants/theme';
import usePost from '../../utils/hooks/usePost';
import useUser from '../../utils/hooks/useUser';
import AddPostModal from './AddPostModal';
import BottomSheet from './BottomSheet';
import CommunityHeader from './CommunityHeader';
import PostItem from './PostItem';
import SpacesContainer from './SpacesContainer';
import WelcomeNoteModal from './WelcomeNoteModal';
import {filter} from 'lodash';

const headerHeight = hp(20);
let scrollValue = 0;
let headerVisible = true;
let focused = false;

const Community = () => {
  const dispatch = useDispatch();
  const {user, general, setFirstTimeLoginStatus} = useUser();
  const {
    fetchPostsOfAllSpaces,
    fetchPostsOfSpecificSpace,
    fetchFilteredPostsOfSpecificSpace,
    fetchMorePostsOfSpecificSpace,
  } = usePost();
  const {PostFlatListRef} = useContext(MyContext);

  const RBSheetRef = useRef();
  // useReducer
  const [loading, setLoading] = useState(true);
  const [bottomLoading, setBottomLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [upperBorderFlag, setUpperBorderFlag] = useState(false);
  const [selectedSpaces, setSlectedSpaces] = useState(user?.spaces[0]);
  const [addPostModal, setAddPostModal] = useState(false);
  const [noMoreFetchingPosts, setNoMoreFetchingPosts] = useState(false);
  const [newPostCount, setNewPostCount] = useState(() => {
    let obj = {};
    user?.spaces.forEach(space => {
      obj[space] = 0;
    });
    return obj;
  });

  // The below state is used to store the data of the selected space
  const [selectedSpaceData, setSelectedSpaceData] = useState(() => {
    let obj = {};
    user?.spaces.forEach(space => {
      obj[space] = {
        data: [],
        filter: 'Recent',
      };
    });
    return obj;
  });

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await fetchPostsOfAllSpaces(user?.spaces, user?.spaceId);
      setSelectedSpaceData(data.data);
      setNewPostCount(data.newPostsCount);
    } catch (e) {
      console.log({e});
    }
    setLoading(false);
  };

  const fetchParticularSpaceOnFilter = async filter => {
    PostFlatListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setRefreshing(true);
    try {
      setSelectedSpaceData({
        ...selectedSpaceData,
        [selectedSpaces]: {
          data: selectedSpaceData[selectedSpaces].data,
          filter: filter,
        },
      });
      const data = await fetchFilteredPostsOfSpecificSpace(
        selectedSpaces,
        filter,
        user?.spaceId,
      );
      //There was some issue due to which the i had to empty the data before populating it again
      // setSelectedSpaceData({
      //   ...selectedSpaceData,
      //   [selectedSpaces]: {
      //     data: [],
      //     filter: filter,
      //   },
      // });
      setSelectedSpaceData({
        ...selectedSpaceData,
        [selectedSpaces]: {
          data: data.data,
          filter: filter,
          lastVisible: data.lastVisible,
        },
      });
    } catch (e) {
      console.log({e});
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 200);
  };

  const AfterAddingNewPost = async filter => {
    try {
      setSelectedSpaceData({
        ...selectedSpaceData,
        [selectedSpaces]: {
          data: selectedSpaceData[selectedSpaces].data,
          filter: filter,
          lastVisible: selectedSpaceData[selectedSpaces]?.lastVisible || null,
        },
      });

      const data = await fetchFilteredPostsOfSpecificSpace(
        selectedSpaces,
        filter,
      );
      //There was some issue due to which the i had to empty the data before populating it again
      // setSelectedSpaceData({
      //   ...selectedSpaceData,
      //   [selectedSpaces]: {
      //     data: [],
      //     filter: filter,
      //     lastVisible: data.lastVisible,
      //   },
      // });
      setSelectedSpaceData({
        ...selectedSpaceData,
        [selectedSpaces]: {
          data: data.data,
          filter: filter,
          lastVisible: data.lastVisible,
        },
      });
    } catch (e) {
      console.log({e});
    }
  };

  const handleSelectingSpaces = async spaceName => {
    setSlectedSpaces(spaceName);
  };

  const fetchMorePosts = async () => {
    if (noMoreFetchingPosts) return;
    setBottomLoading(true);
    try {
      const data = await fetchMorePostsOfSpecificSpace(
        user?.spaceId[selectedSpaces],
        //lastVisible
        selectedSpaceData[selectedSpaces]?.lastVisible || null,
        selectedSpaceData[selectedSpaces]?.filter || 'Recent',
      );
      if (data.data.length === 0) {
        setNoMoreFetchingPosts(true);
        setBottomLoading(false);
        return;
      }
      setSelectedSpaceData({
        ...selectedSpaceData,
        [selectedSpaces]: {
          data: [...selectedSpaceData[selectedSpaces].data, ...data.data],
          filter: selectedSpaceData[selectedSpaces].filter,
          lastVisible: data.lastVisible,
        },
      });
    } catch (e) {
      console.log({e});
    }
    setBottomLoading(false);
  };

  //For when the app is opened from background
  const [appState, setAppState] = useState('active');

  useEffect(() => {
    const handleAppStateChange = nextAppState => {
      setAppState(nextAppState);
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.addEventListener('change', handleAppStateChange);
    };
  }, [appState]);

  // ENDS HERE
  useEffect(() => {
    // if (appState === 'active') {
    fetchPosts();
    // }
  }, [user?.spaces.length, appState]);

  useEffect(() => {
    if (general?.postId) {
      let findIndex = -1;
      if (general?.spaceName && selectedSpaceData[general?.spaceName]?.data) {
        findIndex = selectedSpaceData[general?.spaceName].data.findIndex(
          item => {
            return item?.postId === general?.postId;
          },
        );
      }
      if (findIndex >= 0) {
        let temp = [...selectedSpaceData[general?.spaceName].data];

        temp[findIndex].likesCount = general?.likeCount;
        temp[findIndex].commentsCount = general?.commentCount;
        temp[findIndex].userLiked = general?.userLiked;
        setSelectedSpaceData({
          ...selectedSpaceData,
          [general?.spaceName]: {
            ...selectedSpaceData[general?.spaceName],
            data: temp,
            filter: selectedSpaceData[selectedSpaces].filter,
          },
        });
      }
    }
  }, [general?.postId]);

  // For Animation
  const animation = useRef(new Animated.Value(1)).current;
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, headerHeight / 2 - 2],
  });
  const inputTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [headerHeight / 4, 0],
  });
  const opacity = animation;
  const onScroll = e => {
    if (focused) return;
    const y = e.nativeEvent.contentOffset.y;

    if (y > scrollValue && headerVisible && y > headerHeight / 2) {
      Animated.spring(animation, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
      headerVisible = false;
      setUpperBorderFlag(true);
    }
    if (y < scrollValue && !headerVisible) {
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
      headerVisible = true;
      setUpperBorderFlag(false);
    }
    scrollValue = y;
  };

  const fetchThePostAgainAfterTheOwnerHasPosted = async () => {
    PostFlatListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setRefreshing(true);
    await AfterAddingNewPost('Recent');
    setRefreshing(false);
  };

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

  return (
    <CustomWrapper
      containerStyle={{backgroundColor: '#F6F6F6', paddingHorizontal: wp(-4)}}>
      <CommunityHeader
        selected={selectedSpaceData[selectedSpaces]?.filter || 'Recent'}
        setSelected={fetchParticularSpaceOnFilter}
        upperBorderFlag={upperBorderFlag}
        RBSheetRef={RBSheetRef}
      />
      <Animated.View
        style={[styles.spaceContainer, {transform: [{translateY}]}]}>
        <Animated.View
          style={[
            styles.spaceNestedContainer,
            {opacity, transform: [{translateY: inputTranslateY}]},
          ]}>
          <SpacesContainer
            data={user?.spaces}
            selected={selectedSpaces}
            setSelected={handleSelectingSpaces}
            newPostCount={newPostCount}
            setNewPostCount={setNewPostCount}
            upperBorderFlag={upperBorderFlag}
            triggerToSort={loading}
            setNoMoreFetchingPosts={setNoMoreFetchingPosts}
            selectedFilter={
              selectedSpaceData[selectedSpaces]?.filter || 'Recent'
            }
            setSelectedFilter={fetchParticularSpaceOnFilter}
          />
        </Animated.View>
      </Animated.View>
      <FlatList
        ref={PostFlatListRef}
        persistentScrollbar={true}
        initialNumToRender={10}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        // keyExtractor={(item, index) => index.toString()}
        disableVirtualization={true}
        data={selectedSpaceData[selectedSpaces]?.data || []}
        extraData={selectedSpaceData[selectedSpaces]?.data || []}
        onEndReached={() => fetchMorePosts()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          return (
            <View style={{paddingBottom: hp(35)}}>
              {bottomLoading &&
              selectedSpaceData[selectedSpaces]?.data?.length > 0 ? (
                <ActivityIndicator
                  style={{paddingTop: hp(2)}}
                  size="large"
                  color={'grey'}
                  // color={COLORS.grey}
                />
              ) : null}
            </View>
          );
        }}
        onScroll={onScroll}
        refreshControl={
          <RefreshControl
            tintColor={COLORS.grey}
            refreshing={refreshing}
            onRefresh={() =>
              fetchParticularSpaceOnFilter(
                selectedSpaceData[selectedSpaces].filter,
              )
            }
            enabled={true}
            progressViewOffset={hp(10)}
          />
        }
        renderItem={({item, index}) => {
          return (
            <PostItem
              data={item}
              key={item?.postId}
              index={index}
              afterEditingPost={fetchThePostAgainAfterTheOwnerHasPosted}
              activeIndex={visibleIndex}
              setVisibleIndex={setVisibleIndex}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
        // make this JSX componenet
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: hp(50),
            }}>
            {loading ? (
              <ActivityIndicator color={COLORS.grey} size="large" />
            ) : (
              <TextNormal textStyle={styles.noDataFound}>
                Nothing, Yet.
              </TextNormal>
            )}
          </View>
        )}
        style={
          DeviceInfo.hasNotch() ? {paddingTop: hp(12)} : {paddingTop: hp(14)}
        }
        // make this JSX componenet
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setAddPostModal(true)}
        activeOpacity={0.8}>
        <PlusSVG />
      </TouchableOpacity>
      <BottomSheet
        RBSheetRef={RBSheetRef}
        setSelected={handleSelectingSpaces}
        selected={selectedSpaces}
      />
      <AddPostModal
        isVisible={addPostModal}
        onBackButtonPress={() => setAddPostModal(false)}
        onBackDropPress={() => setAddPostModal(false)}
        spaceName={selectedSpaces}
        afterAddingPost={fetchThePostAgainAfterTheOwnerHasPosted}
        spaceId={user?.spaceId[selectedSpaces]}
      />
      <WelcomeNoteModal
        isVisible={general?.firstTimeLogin}
        onBackButtonPress={() => setFirstTimeLoginStatus(false)}
        onBackDropPress={() => setFirstTimeLoginStatus(false)}
        user={user}
      />
    </CustomWrapper>
  );
};

export default Community;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    position: 'absolute',
    height: wp(18),
    width: wp(18),
    bottom: hp(15),
    right: wp(5),
  },
  noDataFound: {
    color: '#747474',
    fontFamily: FONTS.LightItalic,
    fontWeight: '400',
  },
  spaceContainer: {
    height: headerHeight / 2,
    // position: 'absolute',
    alignSelf: 'center',
    // top: 0,
    marginTop: hp(-10),
    zIndex: 10000,
  },
  spaceNestedContainer: {
    backgroundColor: COLORS.backgroundColor,
  },
});
