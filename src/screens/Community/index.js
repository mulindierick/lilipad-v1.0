import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {PlusSVG} from '../../components/common/CustomSvgItems';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import {MyContext} from '../../context/Context';
import {COLORS, FONTS} from '../../utils/constants/theme';
import usePost from '../../utils/hooks/usePost';
import useUser from '../../utils/hooks/useUser';
import AddPostModal from './AddPostModal';
import CommunityHeader from './CommunityHeader';
import PostItem from './PostItem';
import SpacesContainer from './SpacesContainer';
import WelcomeNoteModal from './WelcomeNoteModal';
import {setPostId} from '../../redux/reducers/generalSlice';
import {useDispatch} from 'react-redux';
import {TextNormal} from '../../components/common/CustomText';

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
  } = usePost();
  const {PostFlatListRef} = useContext(MyContext);
  // useReducer
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [upperBorderFlag, setUpperBorderFlag] = useState(false);
  const [selectedSpaces, setSlectedSpaces] = useState(user?.spaces[0]);
  const [selectedFilter, setSelectedFilter] = useState('Recent');
  const [addPostModal, setAddPostModal] = useState(false);
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
      console.log({space});
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
      const data = await fetchPostsOfAllSpaces(user?.spaces);
      console.log({data});
      setSelectedSpaceData(data.data);
      setNewPostCount(data.newPostsCount);
    } catch (e) {
      console.log({e});
    }
    setLoading(false);
  };

  const fetchParticularSpaceOnFilter = async filter => {
    console.log({filter});
    setRefreshing(true);
    try {
      const data = await fetchFilteredPostsOfSpecificSpace(
        selectedSpaces,
        filter,
      );
      //There was some issue due to which the i had to empty the data before populating it again
      setSelectedSpaceData({
        ...selectedSpaceData,
        [selectedSpaces]: {
          data: [],
          filter: filter,
        },
      });
      setSelectedSpaceData({
        ...selectedSpaceData,
        [selectedSpaces]: {
          data: data,
          filter: filter,
        },
      });
    } catch (e) {
      console.log({e});
    }
    setRefreshing(false);
  };

  const handleSelectingSpaces = async spaceName => {
    setSlectedSpaces(spaceName);
  };

  useEffect(() => {
    fetchPosts();
    console.log('YAHA DEKH ===> ', {user});
  }, [user?.spaces.length]);

  useEffect(() => {
    if (general?.postId) {
      const findIndex = selectedSpaceData[selectedSpaces].data.findIndex(
        item => {
          return item?.postId === general?.postId;
        },
      );
      if (findIndex >= 0) {
        let temp = [...selectedSpaceData[general?.spaceName].data];
        console.log({temp});
        temp[findIndex].likesCount = general?.likeCount;
        temp[findIndex].commentsCount = general?.commentCount;
        temp[findIndex].userLiked = general?.userLiked;
        setSelectedSpaceData({
          ...selectedSpaceData,
          [selectedSpaces]: {
            data: temp,
            filter: selectedSpaceData[selectedSpaces].filter,
          },
        });
      }
    }
    console.log({general});
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

  return (
    <CustomWrapper containerStyle={{backgroundColor: '#F6F6F6'}}>
      <CommunityHeader
        selected={selectedSpaceData[selectedSpaces]?.filter || 'Recent'}
        setSelected={fetchParticularSpaceOnFilter}
        upperBorderFlag={upperBorderFlag}
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
          />
        </Animated.View>
      </Animated.View>

      <FlatList
        ref={PostFlatListRef}
        persistentScrollbar={true}
        keyExtractor={(item, index) => index.toString()}
        data={selectedSpaceData[selectedSpaces]?.data || []}
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
        renderItem={({item}) => {
          return <PostItem data={item} key={item?.postId} />;
        }}
        ListFooterComponent={() => (
          <View style={{paddingBottom: hp(30)}}></View>
        )}
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
        style={{paddingTop: hp(11.5)}}
        // make this JSX componenet
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setAddPostModal(true)}
        activeOpacity={0.8}>
        <PlusSVG />
      </TouchableOpacity>
      <AddPostModal
        isVisible={addPostModal}
        onBackButtonPress={() => setAddPostModal(false)}
        onBackDropPress={() => setAddPostModal(false)}
        spaceName={selectedSpaces}
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
